# Agent Guide

## Project

`slidev-theme-cu-boulder` is a community Slidev theme inspired by CU Boulder
branding. The goal is a reliable, reusable theme suitable for submission to the
Slidev Community Themes gallery. It is not an official university product.

Preserve the CU visual identity and the existing public configuration options
when fixing bugs. Keep changes focused and follow the surrounding code style.

## Repository structure

- `layouts/`: Vue single-file components for `cover`, `default`, `section`,
  `two-cols`, and `image-right`.
- `styles/vars.css`: brand colors and light/dark semantic tokens.
- `styles/layout.css`: typography, layout, and footer styling.
- `styles/index.ts`: imports Slidev's base layout styles before theme overrides.
- `setup/logos.ts`: shared static imports for bundled footer logos.
- `setup/shiki.ts`: syntax-highlighting configuration.
- `assets/`: logos imported by the theme and processed by Vite.
- `public/`: static assets available to presentations.
- `example.md`: local preview covering all five layouts, math, and code.
- `package.json`: package contents, scripts, theme defaults, and compatibility.
- `README.md`: installation instructions and the public theme API.

## Development

Use npm and keep `package-lock.json` in sync with dependency changes.
Node.js 22.12+ is required; Node.js 24 LTS is recommended.

```bash
npm ci
npm run dev
npm run build
npm pack --dry-run
```

`npm run dev` previews `example.md` and opens a browser. For a preview without
automatically opening a browser, use `npx slidev example.md --port 3030`.
The example uses `theme: ./` to load this checkout.

`npm run screenshot` exports PNGs and `npm run export` exports a PDF. These
commands require the optional `playwright-chromium` package and its browser.

## Theme conventions

- Use the semantic CSS variables in `styles/vars.css` for mode-dependent colors.
- Cover and section layouts use dark backgrounds in both color modes. Footers
  also stay dark; choose logo variants for the actual background.
- Preserve support for hiding logos, overriding logo URLs, and customizing the
  department text through `themeConfig`.
- Keep footer space available so content does not overlap branding or numbering.
- Preserve the `::right::` named slot in the two-column layout and the image,
  caption, alt-text, and fallback-slot behavior of `image-right`.
- Bundle imported logos through Vite so they work under deployment subpaths.
  Ensure all imported files are included in the package's `files` list.
- Keep example usage and README documentation aligned with implemented props
  and defaults. Theme source files are published directly without compilation.

## Validation

- Run `npm run build` after source or dependency changes.
- For visual changes, review affected layouts in light and dark mode. Check
  headings, long content, footer spacing, logo visibility, code, math, and images.
- For asset or packaging changes, inspect `npm pack --dry-run` and verify use
  from a separate presentation consuming the packed theme. Check a non-root
  deployment base path when changing asset URLs.
- A successful build does not establish visual correctness. Report checks that
  could not be performed rather than treating them as passed.
- There are currently no dedicated test or lint scripts. Add regression tests
  when they meaningfully exercise a bug, rather than mirroring implementation.
- Run `git diff --check` before committing. Keep generated builds, dependencies,
  and package archives out of version control.

Development currently uses Slidev 53. The declared minimum Slidev version is
0.48; do not assume the full range has been tested. Revisit compatibility when
introducing APIs that require newer Slidev versions.

## Beta: click-stepped manim-web

This experiment lives only on `beta/cu-manim`. Do not merge it to `main`, and do
not mention it in gallery materials, until it is explicitly promoted.

It is a local convenience for presentations that already use this theme. It is
not part of the CU brand, and it is not a Slidev core feature. Slidev expects
separable behavior to be an addon. If this is shared beyond local talks, move
it to `slidev-addon-manim` instead of growing the theme.

Keep the brand surface unchanged:

- Do not modify `layouts/`, `styles/`, `setup/logos.ts`, `setup/shiki.ts`,
  `assets/`, `public/`, `example.md`, or the public README install and usage
  sections for this experiment.
- Do not add `manim-web` as a required dependency. A deck that never uses the
  component must still install and build without it. Prefer an optional peer
  dependency and a dynamic import inside the component.
- Do not add the component to the default preview or to `npm run build`.
- Keep a separate demo, such as `examples/manim.md`, if a preview is needed.

The intended component is `<CuManim>`. It records a manim-web `Player` sequence
once, then seeks to the segment matching the current Slidev click. Each
`scene.play()` or `scene.wait()` is one click, and seeking must work backward
as well as forward.

- Require a `steps` prop. Slidev counts clicks before the scene finishes
  recording, so the component cannot discover the count in time. Render that
  many hidden `v-click` markers so Space stays on the slide.
- Warn when the recorded segment count does not match `steps`.
- Keep the player canvas unfocused and block its pointer events. manim-web's
  player listens for Space, arrows, and canvas clicks; those must not compete
  with Slidev navigation.
- Hide the player's own control bar. Click steps are the interface.
- PDF or PNG export can follow clicks only after the seek has rendered that
  frame. Editable PowerPoint will still rasterize the canvas. Do not claim
  those exports are verified unless they have been checked.

## Gallery preparation

Before proposing gallery inclusion, verify installation from the distributable
package, a working public demo, README screenshots, and accurate documentation.
Slidev's gallery entries are maintained upstream in
`docs/.vitepress/themes.ts` in `slidevjs/slidev`.
