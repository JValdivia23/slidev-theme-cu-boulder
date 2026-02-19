---
theme: ./
title: "CU Boulder Theme Demo"
themeConfig:
  showLogo: true
  department: "Department of Atmospheric & Oceanic Sciences"
---

# University of Colorado Boulder

## slidev-theme-cu-boulder

<coverAuthor>Jairo M. Valdivia</coverAuthor>

<coverDate>Spring 2026</coverDate>

---
layout: default
---

# Default Content Slide

This is how a standard content slide looks using the CU Boulder theme.

- **CU Gold** `#CFB87C` — primary brand color
- **CU Dark Blue** `#0A3758` — headings, footer, cover background
- **CU Sky Blue** `#096FAE` — links and call-to-action accents
- **Noto Sans** — primary body typeface (freely available via Google Fonts)

> The gold rule under each heading and the dark blue footer with the ATOC logo
> are applied automatically to every content slide.

---
layout: section
---

# Section Divider

Used to introduce major sections of a talk

---
layout: two-cols
---

# Two-Column Layout

Left column content goes here.

- Observation A
- Observation B
- Result C

::right::

Right column content goes here.

$$
\frac{\partial \theta}{\partial t} = -u \frac{\partial \theta}{\partial x} + \kappa \nabla^2 \theta
$$

---
layout: image-right
image: /cu-logo-center.png
imageCaption: "This is an image caption."
---

# Image-Right Layout

Place a figure, diagram, or photo on the right while your text fills the left.

- Useful for results figures
- Works with local `./figures/` paths
- Caption is optional

---
layout: default
---

# Code Example

```python
import numpy as np
import matplotlib.pyplot as plt

# CU Boulder colors
cu_gold = '#CFB87C'
cu_dark_blue = '#0A3758'

t = np.linspace(0, 2 * np.pi, 300)
plt.plot(t, np.sin(t), color=cu_gold, linewidth=2)
plt.plot(t, np.cos(t), color=cu_dark_blue, linewidth=2)
plt.title('CU Boulder Theme Preview')
plt.tight_layout()
plt.show()
```

---
layout: default
---

# Thank You

Questions?

**Jairo M. Valdivia**  
Department of Atmospheric & Oceanic Sciences  
University of Colorado Boulder

<!-- Presenter notes: End of demo deck -->
