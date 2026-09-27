# Performance boundaries and patterns

## Contents

- [Interaction feedback](#interaction-feedback)
- [Network](#network)
- [Server and external work](#server-and-external-work)
- [Assets and media](#assets-and-media)
- [Rendering and main thread](#rendering-and-main-thread)
- [State indication and paint cost](#state-indication-and-paint-cost)
- [Real-time and reconnect](#real-time-and-reconnect)
- [Caching, prefetching, and preloading](#caching-prefetching-and-preloading)
- [Architecture changes](#architecture-changes)

## Interaction feedback

Symptom: the interface feels frozen even though the eventual response time is
acceptable.

Probe:

- capture the first paint after input;
- delay the response and inspect the pending interval;
- check whether a local pressed, opening, selected, or busy state exists;
- check whether the control remains available for duplicate input.

Remedy:

- acknowledge input locally;
- render overlay shells before enrichment;
- keep one stable pending owner;
- preserve authored input and geometry;
- reconcile authoritative success or failure later.

This improves perceived responsiveness without pretending the server completed
earlier.

## Network

Separate:

- DNS, connection, and TLS setup;
- round-trip latency;
- bandwidth and payload size;
- packet loss and reconnect;
- serial versus parallel dependencies;
- cache misses and redirects.

Avoid adding a round trip for browser-known defaults that can travel with the
next user action. Batch only when it does not delay useful partial results.

## Server and external work

Measure:

- queue time;
- application handler time;
- database query count and duration;
- lock contention;
- external provider time;
- serialization and response size;
- worker saturation and retry.

Keep interactive work bounded. Move work to a durable queue only when it can
complete asynchronously and the UI has a lifecycle and recovery model.
Parallelize independent work with backpressure; do not create unbounded tasks.

Stream or paginate large collections. Fetch only the data required by the
current task. Avoid loading a default dataset immediately before replacing it
with a filtered one.

## Assets and media

- Decode and validate uploaded media with explicit memory and dimension limits.
- Generate reusable width-based variants without upscaling.
- Provide intrinsic dimensions or an aspect ratio.
- Use truthful `srcset` and `sizes`.
- Lazy-load below-fold media.
- Give eager loading and high priority only to a measured above-fold candidate.
- Confirm the browser-selected asset in network evidence.
- Keep processing bounded and outside connection-sensitive callbacks when it
  can outlive them.

Do not transfer an original asset merely to shrink it with CSS.

## Rendering and main thread

Inspect:

- long tasks and input delay;
- repeated component or DOM work;
- hydration or patch volume;
- layout invalidation and forced synchronous layout;
- memory growth from unbounded collections;
- animation of layout dimensions;
- third-party script cost.

Prefer stable shells and transform/opacity motion. Virtualize only measured
large-list bottlenecks; virtualization adds focus, accessibility, and scroll
complexity.

## State indication and paint cost

Symptom: the page looks right in a final screenshot, but a tab lights up late,
a selection fades between two choices, content animates in again after
navigation, or an overlay stutters while it opens.

Probe:

- compare the server-rendered HTML with the first painted frame and the
  settled frame;
- look for visible state set by client code after load, such as a class
  binding or an attribute computed from the URL;
- list the transitions on elements that carry current, selected, pressed, or
  checked styles, including shorthand utilities that include color;
- check whether entrance motion runs again on hydration, reconnect, or a
  return navigation;
- look for nested fading layers, `backdrop-filter`, large blur filters, and
  view transitions on the affected surface.

Remedy:

- render the real state in the first HTML and style it through static
  attribute selectors; client code may keep the attribute in sync but never
  sets it first;
- give each client-owned attribute one owner and protect it from later
  server updates;
- switch state styles in one frame and keep press feedback on transforms;
- run an entrance once, for content the person just caused, and never on
  content already painted;
- fade an overlay through a single opacity layer and move its panel with a
  transform;
- replace `backdrop-filter` on scrims and sticky bars with an opaque or plain
  translucent surface;
- keep a view transition only when it explains a spatial change and a
  real-GPU measurement shows an acceptable first frame.

Late state from client code, fades on selection, nested opacity, and backdrop
filters reproduce in any server-rendered, hydrated framework. They are not
evidence for changing frameworks.

## Real-time and reconnect

Measure duplicate subscriptions, redundant broadcasts, retry storms, stale
responses, and remount work. Reconnection should recover one lifecycle rather
than replaying an unidentified mutation.

Publish real-time side effects only after the transaction commits. A rollback
followed by correction wastes work and temporarily exposes false state.

## Caching, prefetching, and preloading

Use these mechanisms only with:

- a measured critical dependency;
- a bounded key space and lifetime;
- invalidation or staleness semantics;
- memory and bandwidth cost;
- a comparison showing the journey improves.

Speculative mounting or preloading can increase server memory, client work,
transfer, and stale state. “Likely needed” is a hypothesis, not evidence.

## Architecture changes

Before adding a second frontend or rewriting:

1. apply the interaction contract to the measured journey;
2. remove unnecessary serial work and oversized assets;
3. reproduce on representative devices and networks;
4. build a bounded side-by-side prototype;
5. compare user-visible metrics and total operational cost;
6. document evidence, consequences, and revisit criteria.

Do not infer the root cause of a poor-network session from the framework name.
Do not count a state-ownership or paint defect as evidence against a framework
until it has been fixed at its layer and measured again.
