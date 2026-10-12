import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'

// Exercise the actual footer setup with Vue's mounted refs. The compiler and
// renderer come from the existing Slidev development dependencies.
const require = createRequire(import.meta.url)
const slidevRequire = createRequire(require.resolve('@slidev/cli/package.json'))
const vue = slidevRequire('vue')
const { parse, compileScript } = require('@vue/compiler-sfc')
const ts = slidevRequire('typescript')
const { descriptor } = parse(readFileSync(new URL('../components/CuFooter.vue', import.meta.url), 'utf8'))
const compiled = compileScript(descriptor, { id: 'cu-footer-test' })
const code = ts.transpileModule(compiled.content, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText

function mountFooter({ canvasHeight = 552, displayedHeight = 1104, hasContent = true, hasContainer = true } = {}) {
  const styles = new Map()
  const container = { style: { setProperty: (name, value) => styles.set(name, value) } }
  const content = {
    offsetHeight: canvasHeight,
    getBoundingClientRect: () => ({ height: displayedHeight }),
    closest: selector => {
      assert.equal(selector, '.slidev-slide-container')
      return hasContainer ? container : null
    },
  }
  const host = {
    closest: selector => {
      assert.equal(selector, '.slidev-slide-content')
      return hasContent ? content : null
    },
  }
  const exports = {}
  new Function('require', 'exports', code)(
    name => name === '../setup/logos' ? { cuLogoRev: 'cu-logo.svg' } : require(name),
    exports,
  )
  const component = exports.default
  const setup = component.setup
  component.setup = (props, context) => {
    const bindings = setup(props, context)
    return () => vue.h('div', { ref: bindings.footer })
  }
  const renderer = vue.createRenderer({
    createElement: () => host,
    insert() {}, remove() {}, patchProp() {},
    createText: () => ({}), createComment: () => ({}),
    setText() {}, setElementText() {}, parentNode: () => null, nextSibling: () => null,
  })
  const app = renderer.createApp(component, { config: {}, page: 2, total: 10, goTo() {} })
  app.mount({})
  return { styles, unmount: () => app.unmount() }
}

test('toolbar clearance uses unscaled canvas height and follows Slidev resize scaling', () => {
  const footer = mountFooter()
  assert.equal(footer.styles.get('--cu-rendered-slide-height'), 'calc(552px * var(--slidev-slide-scale, 1))')
  footer.unmount()
})

test('canvas height is scoped to its own container without assuming a fixed aspect ratio', () => {
  const first = mountFooter({ canvasHeight: 735 })
  const second = mountFooter({ canvasHeight: 600 })
  assert.equal(first.styles.get('--cu-rendered-slide-height'), 'calc(735px * var(--slidev-slide-scale, 1))')
  assert.equal(second.styles.get('--cu-rendered-slide-height'), 'calc(600px * var(--slidev-slide-scale, 1))')
  first.unmount()
  second.unmount()
})

for (const options of [{ hasContent: false }, { hasContainer: false }]) {
  test(`footer tolerates a missing ${options.hasContent === false ? 'canvas' : 'container'}`, () => {
    const footer = mountFooter(options)
    assert.equal(footer.styles.size, 0)
    footer.unmount()
  })
}
