# slidev-theme-cu-boulder

[![License: MIT](https://img.shields.io/badge/License-MIT-0A3758.svg)](./LICENSE)
[![Slidev](https://img.shields.io/badge/Slidev-theme-CFB87C)](https://sli.dev)

A [Slidev](https://sli.dev) presentation theme following the official [University of Colorado Boulder brand guidelines](https://www.colorado.edu/imc/brand/visual-identity). Built for ATOC and A&O Sciences presentations, but usable across CU departments.

---

## Demo

- **Live example:** [jvaldivia23.github.io/slidev-theme-cu-boulder](https://jvaldivia23.github.io/slidev-theme-cu-boulder/)
- **Source:** [example.md](./example.md) — "Top Reasons to Join ATOC for Graduate School"

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

Install directly from GitHub (no npm account needed):

```bash
npm install github:JValdivia23/slidev-theme-cu-boulder
```

Then set it in your slides frontmatter:

```yaml
---
theme: cu-boulder
---
```

> Slidev will prompt you to install the theme automatically if it is not already installed.

Or reference it locally (no install needed):

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
themeConfig:
  showLogo: true                                    # default: true
  department: "Department of Atmospheric & Oceanic Sciences"
---

# My Talk Title

## Subtitle

<coverAuthor>Your Name</coverAuthor>
<coverDate>Spring 2026</coverDate>
```

### Available Layouts

| Layout | Description |
|---|---|
| `cover` | Title slide — always dark bg, CU Gold heading, author/date, logo in footer |
| `default` | Standard content slide — white bg (light) / near-black bg (dark), black/white heading with gold rule |
| `section` | Section divider — always dark bg, CU Gold heading |
| `two-cols` | Two-column layout — use `::right::` to split content |
| `image-right` | Text left, image right — set `image:` in slide frontmatter |

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
---

# Results

- Finding A
- Finding B
```

### `themeConfig` options

| Key | Type | Default | Description |
|---|---|---|---|
| `showLogo` | `boolean` | `true` | Show CU Boulder logo in footer |
| `department` | `string` | `''` | Department name shown in footer center |

> **Logos are bundled with the theme.** You do not need to copy any logo files into your own project — Slidev automatically serves the theme's `public/` directory.
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

```bash
# Clone and preview the example deck
git clone https://github.com/JValdivia23/slidev-theme-cu-boulder
cd slidev-theme-cu-boulder
npm install
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
