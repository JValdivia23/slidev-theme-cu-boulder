<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'

interface ClickController {
  host: HTMLElement
  abort: AbortController
  settleThrough: number
  step: number
  pending: unknown[]
  playing: boolean
  scene: { dispose: () => void, add: (...mobjects: unknown[]) => unknown, render: () => void } | null
  clicks: () => number
}

const controllers = new WeakMap<HTMLElement, ClickController>()
const sceneControllers = new WeakMap<object, ClickController>()
const containerStack: HTMLElement[] = []
let patching: Promise<void> | null = null
let lookupInstalled = false
let originalAdd: ((this: unknown, ...mobjects: unknown[]) => unknown) | null = null

const props = withDefaults(defineProps<{
  /**
   * Official example body. Call `new Scene(document.getElementById('container'), ...)`
   * inside it. A function that accepts a scene is still supported.
   */
  construct: (scene?: unknown) => void | Promise<void>
  /** Number of `scene.play()` calls. `wait()` does not count. */
  steps: number
  /** Display cap. The pasted scene may ask for a larger canvas. */
  width?: number
  height?: number
}>(), {
  width: 800,
  height: 360,
})

const frame = ref<HTMLElement | null>(null)
const host = ref<HTMLElement | null>(null)
const error = ref('')
const { clicks } = useNav()

let generation = 0
let activeController: ClickController | null = null
let observer: MutationObserver | null = null

function installLookup() {
  if (lookupInstalled)
    return
  lookupInstalled = true
  const previous = document.getElementById.bind(document)
  document.getElementById = (id: string) => {
    if (id === 'container' && containerStack.length)
      return containerStack[containerStack.length - 1]
    return previous(id)
  }
}

function installPatches() {
  if (patching)
    return patching
  patching = (async () => {
    const { Scene } = await import('manim-web')
    const originalPlay = Scene.prototype.play
    const originalWait = Scene.prototype.wait
    originalAdd = Scene.prototype.add

    function controllerFor(scene: { _container?: HTMLElement | null }) {
      // A disposed scene must never adopt a new run's controller on the same host.
      const existing = sceneControllers.get(scene)
      if (existing) {
        existing.abort.signal.throwIfAborted()
        return existing
      }
      const container = scene._container
      if (!container)
        return null
      const controller = controllers.get(container)
      if (controller) {
        controller.abort.signal.throwIfAborted()
        controller.scene = scene as ClickController['scene']
        sceneControllers.set(scene, controller)
      }
      return controller
    }

    Scene.prototype.add = function (...mobjects: unknown[]) {
      const controller = controllerFor(this)
      if (!controller || controller.playing)
        return originalAdd.apply(this, mobjects)
      controller.pending.push(...mobjects)
      return this
    }

    Scene.prototype.wait = function (duration?: number) {
      if (!controllerFor(this))
        return originalWait.call(this, duration)
      // The Slidev click is the pause.
    }

    Scene.prototype.play = async function (...animations: Array<{ duration?: number }>) {
      const controller = controllerFor(this)
      if (!controller)
        return originalPlay.apply(this, animations)
      const mine = ++controller.step
      if (controller.clicks() < mine)
        await waitForClick(controller, mine)
      controller.abort.signal.throwIfAborted()
      if (controller.pending.length)
        originalAdd.apply(this, controller.pending.splice(0))
      controller.playing = true
      const instant = mine <= controller.settleThrough
      if (instant) {
        for (const animation of animations) {
          try {
            Object.defineProperty(animation, 'duration', {
              value: 0.001,
              writable: true,
              configurable: true,
            })
          }
          catch {
            // Keep the authored duration if the library seals it.
          }
        }
      }
      try {
        const result = await originalPlay.apply(this, animations)
        // dispose() resolves an in-flight play; stop the old construct here.
        controller.abort.signal.throwIfAborted()
        return result
      }
      finally {
        controller.playing = false
      }
    }
  })()
  return patching
}

function waitForClick(controller: ClickController, step: number) {
  const { signal } = controller.abort
  return new Promise<void>((resolve, reject) => {
    let frameId: number | null = null
    const cancel = () => {
      if (frameId !== null)
        cancelAnimationFrame(frameId)
      reject(signal.reason)
    }
    if (signal.aborted) {
      cancel()
      return
    }
    signal.addEventListener('abort', cancel, { once: true })
    const check = () => {
      if (controller.clicks() >= step) {
        signal.removeEventListener('abort', cancel)
        resolve()
        return
      }
      frameId = requestAnimationFrame(check)
    }
    check()
  })
}

function fit() {
  const box = frame.value
  const slide = box?.closest('.slidev-layout')
  const footer = slide?.querySelector('.cu-footer')
  if (!box)
    return
  const width = Math.min(props.width, box.parentElement?.clientWidth || props.width)
  let height = props.height
  if (footer) {
    const available = footer.getBoundingClientRect().top - box.getBoundingClientRect().top - 8
    if (available > 80)
      height = Math.min(height, available)
  }
  box.style.width = `${width}px`
  box.style.height = `${height}px`
}

function stopRun() {
  const controller = activeController
  if (!controller)
    return
  activeController = null
  controller.abort.abort()
  controller.scene?.dispose()
  controllers.delete(controller.host)
}

async function run(settleThrough = clicks.value) {
  if (!host.value)
    return
  const gen = ++generation
  stopRun()
  host.value.replaceChildren()
  error.value = ''
  const controller: ClickController = {
    host: host.value,
    abort: new AbortController(),
    settleThrough,
    step: 0,
    pending: [],
    playing: false,
    scene: null,
    clicks: () => clicks.value,
  }
  activeController = controller
  controllers.set(host.value, controller)
  try {
    await installPatches()
    if (gen !== generation || !host.value)
      return
    installLookup()
    containerStack.push(host.value)
    const source = props.construct.toString()
    const plays = source.match(/\.play\s*\(/g)?.length ?? 0
    if (plays && plays !== props.steps) {
      console.warn(
        `[CuManim] found ${plays} scene.play() calls, but steps is ${props.steps}.`,
      )
    }
    // construct() runs synchronously until its first await, which is when
    // official examples call getElementById('container') and new Scene().
    const result = props.construct()
    containerStack.pop()
    fit()
    await result
    if (gen !== generation || controller.abort.signal.aborted)
      return
    if (controller.pending.length && controller.scene && originalAdd) {
      originalAdd.apply(controller.scene, controller.pending.splice(0))
      controller.scene.render()
    }
  }
  catch (err) {
    if (gen !== generation)
      return
    error.value = err instanceof Error ? err.message : String(err)
    console.error('[CuManim]', err)
  }
  finally {
    const index = containerStack.lastIndexOf(host.value!)
    if (index >= 0)
      containerStack.splice(index, 1)
  }
}

onMounted(() => {
  if (host.value)
    host.value.tabIndex = -1
  observer = new MutationObserver(() => fit())
  if (host.value)
    observer.observe(host.value, { childList: true, subtree: true })
  void run()
  requestAnimationFrame(fit)
})

watch(clicks, (count, previous) => {
  if (previous == null || count >= previous)
    return
  void run(count)
})

onBeforeUnmount(() => {
  generation++
  stopRun()
  if (host.value) {
    const index = containerStack.lastIndexOf(host.value)
    if (index >= 0)
      containerStack.splice(index, 1)
  }
  observer?.disconnect()
})
</script>

<template>
  <div class="cu-manim">
    <span
      v-for="step in steps"
      :key="step"
      v-click
      class="cu-manim-step"
      aria-hidden="true"
    />
    <p v-if="error" class="cu-manim-error">
      {{ error }}
    </p>
    <div ref="frame" class="cu-manim-frame">
      <div ref="host" class="cu-manim-host" />
    </div>
  </div>
</template>

<style scoped>
.cu-manim {
  position: relative;
  max-width: 100%;
}

.cu-manim-step {
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  pointer-events: none;
}

.cu-manim-frame {
  max-width: 100%;
  overflow: hidden;
  background: #000;
}

.cu-manim-host {
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.cu-manim-host :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
  object-fit: contain;
}

.cu-manim-error {
  color: var(--cu-gold-accessible, #8D7334);
  font-size: 0.85rem;
}
</style>
