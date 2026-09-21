import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'

// Exercise the actual SFC with Vue's lifecycle and a deterministic Scene/RAF.
// These compilers and Vue are supplied by the existing Slidev development tools.
const require = createRequire(import.meta.url)
const slidevRequire = createRequire(require.resolve('@slidev/cli/package.json'))
const vue = slidevRequire('vue')
const { parse, compileScript } = require('@vue/compiler-sfc')
const ts = slidevRequire('typescript')
const { descriptor } = parse(readFileSync(new URL('../components/CuManim.vue', import.meta.url), 'utf8'))
const compiled = compileScript(descriptor, { id: 'cu-manim-test' })
const code = ts.transpileModule(compiled.content, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText

async function mountScene({ hold = false, initialClicks = 0, construct } = {}) {
  const clicks = vue.ref(initialClicks)
  const scenes = []
  const frames = new Map()
  const errors = []
  let nextFrame = 0
  class Scene {
    constructor(container) {
      assert.ok(container)
      this._container = container
      this.plays = []
      this.disposals = 0
      scenes.push(this)
    }

    add() { return this }
    render() {}
    wait() {}
    async play(animation) {
      assert.equal(this.disposals, 0, 'disposed scene must never play again')
      this.plays.push(animation.duration)
      if (hold && animation.duration !== 0.001)
        await new Promise(resolve => this.finish = resolve)
    }

    dispose() {
      this.disposals++
      this.finish?.()
    }
  }
  const document = { getElementById: () => null }
  const exports = {}
  const evaluate = new Function('require', 'exports', 'document', 'requestAnimationFrame', 'cancelAnimationFrame', 'MutationObserver', 'console', code)
  evaluate(
    name => name === '@slidev/client' ? { useNav: () => ({ clicks }) } : name === 'manim-web' ? { Scene } : require(name),
    exports,
    document,
    callback => { frames.set(++nextFrame, callback); return nextFrame },
    id => frames.delete(id),
    class { observe() {} disconnect() {} },
    { warn() {}, error: (...args) => errors.push(args) },
  )
  const component = exports.default
  const setup = component.setup
  component.setup = (props, context) => {
    const bindings = setup(props, context)
    return () => vue.h('div', { ref: bindings.host })
  }
  const renderer = vue.createRenderer({
    createElement: () => ({ replaceChildren() {} }),
    insert() {}, remove() {}, patchProp() {},
    createText: () => ({}), createComment: () => ({}),
    setText() {}, setElementText() {}, parentNode: () => null, nextSibling: () => null,
  })
  const app = renderer.createApp(component, {
    steps: 3,
    construct: construct ? () => construct(Scene, document) : async () => {
      const scene = new Scene(document.getElementById('container'))
      await scene.play({ duration: 2 })
      await scene.play({ duration: 3 })
      await scene.play({ duration: 4 })
      scene.completed = true
    },
  })
  const flush = async () => {
    await vue.nextTick()
    for (let i = 0; i < 30; i++)
      await Promise.resolve()
  }
  const advanceFrame = async () => {
    const batch = [...frames.values()]
    frames.clear()
    batch.forEach(callback => callback())
    await flush()
  }
  app.mount({})
  await flush()
  await advanceFrame()
  return {
    scenes, frames, errors, flush, advanceFrame,
    async click(value) { clicks.value = value; await flush(); await advanceFrame() },
    async unmount() { app.unmount(); await flush() },
  }
}

test('rewinding cancels waiting constructs without consuming replacement steps', async () => {
  const harness = await mountScene()
  await harness.click(1)
  await harness.click(0)
  assert.equal(harness.scenes[0].disposals, 1)
  for (const click of [1, 2, 3])
    await harness.click(click)
  assert.deepEqual(harness.scenes[0].plays, [2])
  assert.equal(harness.scenes[0].completed, undefined)
  assert.deepEqual(harness.scenes[1].plays, [2, 3, 4])
  assert.equal(harness.scenes[1].completed, true)
  assert.equal(harness.frames.size, 0)
  assert.deepEqual(harness.errors, [])
  await harness.unmount()
})

test('rewinding during playback stops the old construct after disposal resolves play', async () => {
  const harness = await mountScene({ hold: true })
  await harness.click(1)
  await harness.click(0)
  await harness.click(1)
  assert.deepEqual(harness.scenes[0].plays, [2])
  assert.equal(harness.scenes[0].completed, undefined)
  assert.deepEqual(harness.scenes[1].plays, [2])
  assert.deepEqual(harness.errors, [])
  await harness.unmount()
})

test('only plays up to the rewind destination are fast-forwarded', async () => {
  const harness = await mountScene()
  await harness.click(1)
  await harness.click(2)
  await harness.click(1)
  assert.deepEqual(harness.scenes[1].plays, [0.001])
  await harness.click(2)
  assert.deepEqual(harness.scenes[1].plays, [0.001, 3])
  await harness.unmount()
})

for (const playing of [false, true]) {
  test(`unmount disposes the scene and cancels ${playing ? 'active playback' : 'click waits'}`, async () => {
    const harness = await mountScene({ hold: playing })
    if (playing)
      await harness.click(1)
    await harness.unmount()
    assert.equal(harness.scenes[0].disposals, 1)
    assert.equal(harness.scenes[0].completed, undefined)
    assert.equal(harness.frames.size, 0)
    assert.deepEqual(harness.errors, [])
  })
}

test('a stale scene cannot attach to the replacement controller', async () => {
  let resume
  const harness = await mountScene({ construct: async (Scene, document) => {
    const scene = new Scene(document.getElementById('container'))
    scene.add({})
    if (!resume)
      await new Promise(resolve => resume = resolve)
    await scene.play({ duration: 2 })
  } })
  await harness.click(1)
  await harness.click(0)
  resume()
  await harness.flush()
  await harness.click(1)
  assert.deepEqual(harness.scenes[0].plays, [])
  assert.deepEqual(harness.scenes[1].plays, [2])
  assert.deepEqual(harness.errors, [])
  await harness.unmount()
})
