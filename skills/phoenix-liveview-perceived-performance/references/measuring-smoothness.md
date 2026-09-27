# Measuring smoothness

## Contents

- [Record frames around the interaction](#record-frames-around-the-interaction)
- [Separate software from real GPU rendering](#separate-software-from-real-gpu-rendering)
- [Isolate a cause without changing timing](#isolate-a-cause-without-changing-timing)
- [Budgets and reporting](#budgets-and-reporting)

## Record frames around the interaction

- Observe `long-animation-frame` entries with a `PerformanceObserver`
  registered before the interaction. Each entry reports duration, blocking
  duration, style and layout time, and the scripts involved, which separates
  script cost from rendering cost.
- Record `requestAnimationFrame` deltas through the interaction to see every
  frame, not only the long ones.
- Capture a Chromium performance trace when you need to split a long frame
  into script, style and layout, paint, and GPU raster.
- Record the same journey on first entry, live navigation, reload, and
  reconnect; they exercise different mount and paint paths.

The packaged [frame probe](../assets/e2e/support/frames.ts) installs both
observers through an init script and returns the longest frame and animation
frame entries for a Playwright action.

## Separate software from real GPU rendering

- Headless Chromium usually renders with SwiftShader, a software GPU. Raster
  time there can be many times larger than on a real device and changes with
  machine load. Use it only for before-and-after comparison on the same
  machine and run.
- Attribute a long frame to a paint cause only after it reproduces with a real
  GPU. Launch a Chromium build that supports GPU acceleration in headless mode
  with the GPU enabled and the blocklist ignored, using the platform's graphics
  backend, for example ANGLE on Metal on macOS. Confirm the renderer by reading
  the WebGL unmasked renderer string: a hardware GPU name confirms it, while
  SwiftShader or llvmpipe means software.
- Emulate phone width and device pixel ratio, since raster cost scales with
  pixel count. A desktop-width result does not describe a phone.

## Isolate a cause without changing timing

- Inject a style override or listener with `page.addStyleTag` or
  `page.addInitScript` to disable one suspect, such as a filter, transition,
  or view transition, and compare.
- Do not rewrite responses with request interception to remove a suspect.
  Interception delays the document and changes the timing you are measuring.
- Confirm that the suspect was active in the baseline, for example by reading
  `event.viewTransition` in a `pageswap` listener or the computed style of the
  element. A confounded baseline produces a false attribution.

## Budgets and reporting

Use the project's budgets when it has them. Reasonable defaults:

- local acknowledgement of input in the next frame;
- on a real GPU at phone size, no frame over 50 ms during navigation, an
  overlay opening, or a state change;
- interaction to next paint within the 200 ms "good" threshold.

Report the viewport, device pixel ratio, renderer, network or latency
condition, sample count, and the longest frame before and after. When a budget
is still exceeded, say so with the number rather than calling the interaction
smooth. Keep traces, recordings, and throwaway measurement scripts out of the
project's version control.
