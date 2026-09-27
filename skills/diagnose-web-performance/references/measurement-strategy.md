# Web performance measurement strategy

## Contents

- [Define the claim](#define-the-claim)
- [Field and lab evidence](#field-and-lab-evidence)
- [Core Web Vitals](#core-web-vitals)
- [Journey marks](#journey-marks)
- [Frame-level evidence](#frame-level-evidence)
- [Controlled comparisons](#controlled-comparisons)
- [Evidence hierarchy](#evidence-hierarchy)

## Define the claim

Use a statement that can be replayed:

```text
For [journey] on [device/network/data condition], the user waits [measured
interval] before [observable feedback or outcome]. The target is [budget or
behavior], while preserving [correctness and accessibility invariants].
```

Initial load, next-paint feedback, request completion, and durable completion
are different intervals. Name the one being improved.

## Field and lab evidence

Field evidence answers how real users experience the product. Lab evidence
helps reproduce and attribute a problem under controlled conditions.

Prefer:

- field percentiles segmented by mobile and desktop;
- browser performance traces;
- server spans and query timings joined by privacy-safe correlation;
- resource timing and selected asset evidence;
- Playwright traces and videos for temporal UI behavior;
- representative low-end hardware and constrained networks.

Do not present desktop emulation on a fast development machine as a real mobile
performance result.

## Core Web Vitals

The current Core Web Vitals cover:

- Largest Contentful Paint (LCP) for loading;
- Interaction to Next Paint (INP) for responsiveness;
- Cumulative Layout Shift (CLS) for visual stability.

The published “good” thresholds are LCP at or below 2.5 seconds, INP at or below
200 milliseconds, and CLS at or below 0.1, evaluated at the 75th percentile and
segmented across mobile and desktop. Verify current definitions before turning
them into a long-lived gate:

<https://web.dev/articles/vitals>

Core Web Vitals do not replace journey-specific marks. A save, search, upload,
or reconnect flow needs start, local-feedback, accepted, and terminal marks
that correspond to user intent.

## Journey marks

Record marks such as:

- input received;
- first local visual acknowledgement;
- request sent;
- first response bytes or socket acknowledgement;
- authoritative UI reconciled;
- durable background work completed;
- focus restored.

Use the same mark definitions before and after a change. Never move a mark to
make a comparison look better.

## Frame-level evidence

Flicker, late state, and stutter live inside individual frames. A final
assertion can pass after a visible flash.

- Observe `long-animation-frame` entries registered before the interaction to
  separate script from style, layout, and rendering time.
- Record `requestAnimationFrame` deltas through the interaction to see every
  frame and its longest interval.
- Split a long frame with a browser performance trace into script, style and
  layout, paint, and raster.
- Capture a video or frame sequence when the claim is about what the person
  sees between the first and settled paint.

Headless browsers often rasterize in software. Its raster time can be many
times larger than a real device's and varies with machine load, so use it for
before-and-after comparison on one machine only. Attribute a long frame to a
paint cause after it reproduces with a hardware GPU, and confirm the renderer
from the WebGL unmasked renderer string. Emulate the target width and device
pixel ratio, since raster cost follows pixel count.

Isolate a suspected cause by injecting a style or script at document start.
Request interception that rewrites responses delays the document and changes
the timing under test. Confirm the suspect was active in the baseline before
attributing the difference to it.

## Controlled comparisons

Hold stable where practical:

- route and user task;
- synthetic data volume;
- authentication state;
- browser version and engine;
- viewport and input mode;
- device or CPU throttle;
- renderer, hardware GPU or software, and device pixel ratio;
- latency, bandwidth, and packet loss;
- cold or warm cache;
- build mode and observability overhead.

Run enough samples to see variability. Report the distribution or at least
median and tail behavior, not only the best run.

For a framework or architecture comparison, include implementation,
localization, authentication, error, SEO, deployment, observability, and
maintenance costs. A faster isolated component is not automatically a faster
or simpler product.

## Evidence hierarchy

Use the strongest available evidence:

1. representative field data tied to the journey;
2. controlled reproduction on representative hardware/network;
3. trace with server and resource correlation;
4. local emulation;
5. code inspection and reasoned inference;
6. framework reputation or anecdote.

Lower levels can form a hypothesis but should not support a sweeping
architecture claim alone.
