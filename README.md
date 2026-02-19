# slidev-theme-cu-boulder

[![npm](https://img.shields.io/npm/v/slidev-theme-cu-boulder?color=CFB87C&label=npm)](https://www.npmjs.com/package/slidev-theme-cu-boulder)
[![license](https://img.shields.io/npm/l/slidev-theme-cu-boulder)](./LICENSE)

A [Slidev](https://sli.dev) theme following the official [University of Colorado Boulder brand guidelines](https://www.colorado.edu/imc/brand/visual-identity). Built for ATOC and A&O Sciences presentations, but usable across CU departments.

---

## Preview

| Slide type | Description |
|---|---|
| **Cover** | Dark blue background, CU Gold title, ATOC logo in footer |
| **Default** | White background, CU Dark Blue heading with gold rule, branded footer |
| **Section** | Dark blue divider slide with CU Gold heading |
| **Two-cols** | Two-column content layout |
| **Image-right** | Text left, figure right |

---

## Brand Colors

| Name | Hex | Role |
|---|---|---|
| CU Gold | `#CFB87C` | Primary accent, heading rules, footer text |
| CU Black | `#000000` | Body text |
| CU Dark Blue | `#0A3758` | Headings, cover/section background, footer background |
| CU Dark Gray | `#565A5C` | Muted text |
| CU Light Gray | `#A2A4A3` | Borders, subtle elements |
| Accessible CU Gold | `#8D7334` | Text on white backgrounds |
| CUB Sky Blue | `#096FAE` | Links, call-to-action |
| CUB Light Gold | `#F3F0E9` | Surface/code background |

Typography: **Noto Sans** (body), **Noto Serif** (display), **Noto Sans Mono** (code) — all freely available via Google Fonts and loaded automatically.

---

## Install

```bash
npm install slidev-theme-cu-boulder
```

Or use it locally (no install needed):

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

<coverAuthor>Jairo M. Valdivia</coverAuthor>
<coverDate>Spring 2026</coverDate>
```

### Available Layouts

| Layout | Description |
|---|---|
| `cover` | Title slide (dark blue, gold heading, author/date) |
| `default` | Standard content slide |
| `section` | Section divider (dark blue) |
| `two-cols` | Two-column layout — use `::right::` to split |
| `image-right` | Text left, image right — set `image:` in frontmatter |

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

### `two-cols` example

```markdown
---
layout: two-cols
---

# Side by Side

Left side content here.

::right::

Right side content here.
```

### `themeConfig` options

| Key | Type | Default | Description |
|---|---|---|---|
| `showLogo` | `boolean` | `true` | Show ATOC logo in footer |
| `department` | `string` | `''` | Department name shown in footer |

---

## Develop

```bash
# Clone and preview the example deck
git clone https://github.com/JValdivia23/slidev-theme-cu-boulder
cd slidev-theme-cu-boulder
npm install
npm run dev
```

---

## Publishing

This theme follows the [Slidev theme publishing conventions](https://sli.dev/guide/write-theme#publishing):

- Package name starts with `slidev-theme-`
- Keywords include `slidev-theme` and `slidev`
- No compilation required — `.vue` and `.ts` files are published directly

```bash
npm publish --access public
```

---

## License

MIT — © Jairo M. Valdivia

CU Boulder and ATOC logos are property of the Regents of the University of Colorado and are used here in accordance with [CU's trademark policy](https://www.colorado.edu/about/legal-trademarks). This theme is not an official product of the University of Colorado.
