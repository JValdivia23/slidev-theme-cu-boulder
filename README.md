# slidev-theme-cu-boulder

[![License: MIT](https://img.shields.io/badge/License-MIT-0A3758.svg)](./LICENSE)
[![Slidev](https://img.shields.io/badge/Slidev-theme-CFB87C)](https://sli.dev)

A [Slidev](https://sli.dev) presentation theme following the official [University of Colorado Boulder brand guidelines](https://www.colorado.edu/imc/brand/visual-identity). Built for ATOC and A&O Sciences presentations, but usable across CU departments.

---

## Demo

- **Live example:** [jvaldivia23.github.io/slidev-theme-cu-boulder](https://jvaldivia23.github.io/slidev-theme-cu-boulder/)
- **Source:** [example.md](./example.md) — "CU Boulder Theme Demo"

---

## Screenshots

<!-- Add screenshots here once the example is ready -->
<!-- Suggested: export the example deck with `npm run screenshot` -->
<!-- and place images in a `screenshots/` folder, then link them below -->

| Cover | Content | Section |
|---|---|---|
| _(screenshot coming soon)_ | _(screenshot coming soon)_ | _(screenshot coming soon)_ |

---

## Brand Colors

Supports **light and dark mode** (`colorSchema: both`). Colors follow the official [CU Boulder primary palette](https://www.colorado.edu/imc/brand/visual-identity).

| Name | Hex | Role |
|---|---|---|
| CU Gold | `#CFB87C` | Primary accent, heading rules, footer text |
| CU Black | `#000000` | Body text (light mode), cover/section bg |
| CU Dark Gray | `#565A5C` | Muted text, h3 |
| CU Light Gray | `#A2A4A3` | Borders, muted text (dark mode) |
| CU Dark Blue | `#0A3758` | Auxiliary accent (secondary palette) |
| Accessible CU Gold | `#8D7334` | Text on white backgrounds |
| CUB Sky Blue | `#096FAE` | Links (light mode) |
| CUB Light Gold | `#F3F0E9` | Code background surface (light mode) |

Typography: **Noto Sans** (body), **Noto Serif** (display), **Noto Sans Mono** (code) — freely available via Google Fonts, loaded automatically.

---

## Install

Use Node.js 22.12+ (Node.js 24 LTS recommended).

### Quick Start (Recommended)

Create a new presentation folder with everything set up:

```bash
# Create folder and initialize
mkdir my-talk && cd my-talk

# Create package.json with theme dependency
cat > package.json << 'EOF'
{
  "name": "my-talk",
  "devDependencies": {
    "@slidev/cli": "^53.0.0"
  },
  "dependencies": {
    "slidev-theme-cu-boulder": "github:JValdivia23/slidev-theme-cu-boulder"
  },
  "overrides": {
    "floating-vue": "5.2.2"
  }
}
EOF

# Install theme (one-time setup)
npm install

# Create your slides
cat > slides.md << 'EOF'
---
theme: cu-boulder
title: My Presentation
---

# Welcome

Start your presentation here.
EOF

# Run
npx slidev slides.md --open
```

### One-liner Setup

For a minimal setup without copying files manually:

```bash
mkdir my-talk && cd my-talk && \
echo '{"devDependencies":{"@slidev/cli":"^53.0.0"},"dependencies":{"slidev-theme-cu-boulder":"github:JValdivia23/slidev-theme-cu-boulder"},"overrides":{"floating-vue":"5.2.2"}}' > package.json && \
npm install && \
echo -e '---\ntheme: cu-boulder\ntitle: My Talk\n---\n\n# Hello CU Boulder' > slides.md && \
npx slidev slides.md --open
```

### Slidev 53 compatibility

The tested setup uses Slidev 53.0.0 with FloatingVue 5.2.2. FloatingVue 5.4.0 changes component internals that Twoslash 4.4.3 still accesses, causing `Failed to patch FloatingVue` at startup. Keep the `overrides` entry above in your presentation's root `package.json` until that integration is fixed upstream. npm does not apply overrides from an installed theme dependency.

The declared minimum Slidev version is 0.48; the full supported range has not been tested.

### Using a Local Theme

If you have the theme cloned locally, point your presentation at it (the Slidev CLI is still required):

```yaml
---
theme: ./path/to/slidev-theme-cu-boulder
---
```

---

## Usage

```yaml
---
theme: cu-boulder
title: "My Talk Title"
coverAuthor: "Your Name"
coverDate: "Spring 2026"
themeConfig:
  showLogo: true                                    # default: true
  department: "Department of Atmospheric & Oceanic Sciences"
---

# My Talk Title

## Subtitle
```

### Available Layouts

| Layout | Description |
|---|---|
| `cover` | Title slide — always dark bg, CU Gold heading, author/date, logo in footer |
| `default` | Standard content slide — white bg (light) / near-black bg (dark), black/white heading with gold rule |
| `section` | Section divider — always dark bg, CU Gold heading |
| `two-cols` | Two-column layout — use `::right::` to split content |
| `image-right` | Text left, image right — set `image:` in slide frontmatter |

Set `coverAuthor` and `coverDate` in the cover slide frontmatter to display the styled author/date row.

### `two-cols` example

```markdown
---
layout: two-cols
---

# Side by Side

Left column content here.

::right::

Right column content here.
```

### `image-right` example

```yaml
---
layout: image-right
image: ./figures/result.png
imageCaption: "Figure 1: Potential temperature anomaly"
imageAlt: "Contour plot of theta"
imageBackground: white # optional backing for transparent figures or logos
---

# Results

- Finding A
- Finding B
```

The optional `imageBackground` accepts a CSS color and defaults to transparent. Use `white` for transparent artwork with dark lettering. It does not change the caption background or the `::right::` fallback slot.

### `themeConfig` options

| Key | Type | Default | Description |
|---|---|---|---|
| `showLogo` | `boolean` | `true` | Show CU Boulder logo in footer |
| `department` | `string` | `'Department of Atmospheric & Oceanic Sciences'` | Department name shown in footer center |
| `footerNav` | `object` | Unset | Optional section tracker in place of the department name; see below |
| `logoRevUrl` | `string` | Bundled reversed logo | Preferred footer logo; use artwork suitable for a dark background |
| `logoUrl` | `string` | Unset | Custom footer logo fallback when `logoRevUrl` is not supplied |

For a presentation with named sections, supply inclusive, 1-based slide ranges. The current section is highlighted, completed sections are marked, and clicking or keyboard-activating a section label goes to its first slide. Slides outside the ranges show `outsideLabel` (or the department name if omitted). `pageNumberOnly` shows the current slide number instead of `current / total`, including on the cover. Set `hideOnCover: true` to leave only the logo in the cover footer; slide 1 can still belong to the first section. Without `footerNav`, the original footer is unchanged.

```yaml
themeConfig:
  footerNav:
    sections:
      - { label: Introduction, start: 1, end: 6 }
      - { label: Methods, start: 7, end: 10 }
      - { label: Results, start: 11, end: 20 }
    outsideLabel: Backup
    pageNumberOnly: true
    hideOnCover: true
```

> **Logos are bundled with the theme.** You do not need to copy any logo files into your own project — footer logos are imported and bundled by Vite, including when deployed under a subpath. All footers stay dark in both modes, so the default is the full-color reversed left-aligned logo. Custom footer logos should also have light lettering.
>
> To hide the logo entirely (e.g. for personal use without CU branding):
> ```yaml
> themeConfig:
>   showLogo: false
> ```

### Dark mode

This theme supports both light and dark mode. Toggle it in the Slidev toolbar (press `D`) or set it in frontmatter:

```yaml
---
theme: cu-boulder
colorSchema: dark   # or 'light' or 'auto'
---
```

Cover and section slides always use a dark background with CU Gold headings regardless of mode. Default, two-cols, and image-right slides flip between white (light) and near-black (dark) backgrounds.

---

## Develop

Use Node.js 22.12+ (Node.js 24 LTS recommended). The Slidev CLI is installed locally with the development dependencies.

```bash
# Clone and preview the example deck
git clone https://github.com/JValdivia23/slidev-theme-cu-boulder
cd slidev-theme-cu-boulder
npm ci
npm run dev
```

To export PNG screenshots of all slides:

```bash
npm install playwright-chromium
npm run screenshot
```

---

## License

[MIT](./LICENSE) — © Jairo M. Valdivia

CU Boulder and ATOC logos are property of the Regents of the University of Colorado and are used in accordance with [CU's trademark policy](https://www.colorado.edu/about/legal-trademarks). This theme is not an official product of the University of Colorado.
