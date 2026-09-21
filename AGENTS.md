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

## Gallery preparation

Before proposing gallery inclusion, verify installation from the distributable
package, a working public demo, README screenshots, and accurate documentation.
Slidev's gallery entries are maintained upstream in
`docs/.vitepress/themes.ts` in `slidevjs/slidev`.
