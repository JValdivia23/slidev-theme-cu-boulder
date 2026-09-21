---
theme: ../
title: Manim click demo
layout: default
---

# Square to circle

Paste the official `new Scene(document.getElementById('container'))` call inside the function. `:width` and `:height` only cap the display.

<CuManim :steps="2" :width="800" :height="320" :construct="squareToCircle" />

<script setup>
import { BLACK, Circle, Create, Scene, Square, Transform } from 'manim-web'

async function squareToCircle() {
  const scene = new Scene(document.getElementById('container'), {
    width: 800,
    height: 450,
    backgroundColor: BLACK,
  })
  const square = new Square({ sideLength: 2 })
  await scene.play(new Create(square))
  await scene.play(new Transform(square, new Circle({ radius: 1.2 })))
}
</script>

---
layout: default
---

# Opening Manim

Official scene from the animations gallery. Each `scene.play()` is one click.

<CuManim :steps="5" :width="800" :height="320" :construct="openingManim" />

<script setup>
import {
  ApplyPointwiseFunction,
  BLACK,
  Create,
  DOWN,
  FadeIn,
  FadeOut,
  MathTex,
  NumberPlane,
  Scene,
  Text,
  Transform,
  UL,
  UP,
  VGroup,
  WHITE,
} from 'manim-web'

const FONT_URL = 'https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/fonts/KaTeX_Main-Regular.ttf'

async function openingManim() {
  const scene = new Scene(document.getElementById('container'), {
    width: 800,
    height: 450,
    backgroundColor: BLACK,
  })
  const title = new Text({
    text: 'This is some LaTeX',
    fontSize: 48,
    color: WHITE,
    fontUrl: FONT_URL,
  })
  const basel = new MathTex({ latex: '\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}' })
  await basel.waitForRender?.()

  new VGroup(title, basel).arrange(DOWN)
  scene.add(title, basel)
  await scene.play(new FadeIn(title), new FadeIn(basel, { shift: DOWN }))
  await scene.wait(1)

  const transformTitle = new Text({
    text: 'That was a transform',
    fontSize: 48,
    color: WHITE,
    fontUrl: FONT_URL,
  })
  await transformTitle.loadGlyphs()
  transformTitle.toCorner(UL)
  await scene.play(new Transform(title, transformTitle), new FadeOut(basel, { shift: DOWN }))
  await scene.wait(1)

  const grid = new NumberPlane()
  const gridTitle = new Text({
    text: 'This is a grid',
    fontSize: 72,
    color: WHITE,
    fontUrl: FONT_URL,
  })
  await gridTitle.loadGlyphs()
  gridTitle.moveTo(transformTitle)
  await scene.play(
    new FadeOut(title),
    new FadeIn(gridTitle, { shift: UP }),
    new Create(grid, { duration: 3, lagRatio: 0.1 }),
  )
  await scene.wait(1)

  const gridTransformTitle = new Text({
    text: 'That was a non-linear function\napplied to the grid',
    fontSize: 48,
    color: WHITE,
    fontUrl: FONT_URL,
  })
  await gridTransformTitle.loadGlyphs()
  gridTransformTitle.moveTo(gridTitle, UL)
  grid.prepareForNonlinearTransform()
  await scene.play(
    new ApplyPointwiseFunction(
      grid,
      (p) => {
        return [p[0] + Math.sin(p[1]), p[1] + Math.sin(p[0]), p[2]]
      },
      { duration: 3 },
    ),
  )
  await scene.wait(1)

  await scene.play(new Transform(gridTitle, gridTransformTitle))
  await scene.wait(1)
}
</script>

---
layout: default
---

# Moving Around

From the animations gallery. Four clicks: shift, recolor, scale, rotate.

<CuManim :steps="4" :width="800" :height="320" :construct="movingAround" />

<script setup>
import { BLACK, BLUE, LEFT, MoveToTarget, ORANGE, Rotate, Scale, Scene, Shift, Square } from 'manim-web'

async function movingAround() {
  const scene = new Scene(document.getElementById('container'), {
    width: 800,
    height: 450,
    backgroundColor: BLACK,
  })

  const square = new Square({ color: BLUE, fillOpacity: 1 })

  await scene.play(new Shift(square, { direction: LEFT }))

  square.generateTarget()
  square.targetCopy.setFill(ORANGE)
  await scene.play(new MoveToTarget(square))

  await scene.play(new Scale(square, { scaleFactor: 0.3 }))

  await scene.play(new Rotate(square, { angle: 0.4 }))
}
</script>

---
layout: default
---

# Point moving on shapes

From the animations gallery. The dot grows a circle, then moves along it.

<CuManim :steps="4" :width="800" :height="320" :construct="pointMoving" />

<script setup>
import {
  BLACK,
  BLUE,
  Circle,
  Dot,
  GrowFromCenter,
  Line,
  MoveAlongPath,
  RIGHT,
  Rotating,
  Scene,
  Transform,
  linear,
} from 'manim-web'

async function pointMoving() {
  const scene = new Scene(document.getElementById('container'), {
    width: 800,
    height: 450,
    backgroundColor: BLACK,
  })

  const circle = new Circle({ radius: 1, color: BLUE })
  const dot = new Dot()
  const dot2 = dot.copy().shift(RIGHT)
  scene.add(dot)

  const line = new Line({ start: [3, 0, 0], end: [5, 0, 0] })
  scene.add(line)

  await scene.play(new GrowFromCenter(circle))
  await scene.play(new Transform(dot, dot2))
  await scene.play(new MoveAlongPath(dot, { path: circle, duration: 2, rateFunc: linear }))
  await scene.play(new Rotating(dot, { aboutPoint: [2, 0, 0], duration: 1.5 }))
  await scene.wait()
}
</script>
