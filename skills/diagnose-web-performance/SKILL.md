---
name: diagnose-web-performance
description: Measure, explain, and improve real or perceived web performance without guessing from framework reputation. Use when a page or interaction feels slow, Core Web Vitals regress, mobile users report poor responsiveness, media or rendering is expensive, a team considers preloading, caching, client-state duplication, or a frontend rewrite for speed, or an agent needs an evidence-backed performance plan and validation path.
---

# Diagnose Web Performance

Find the slow boundary before prescribing an optimization. Separate immediate
interaction feedback from network, server, asset, rendering, and device costs.

## Choose the authorized mode

- **Diagnose:** reproduce, measure, explain, and recommend without editing.
- **Improve:** implement the smallest authorized optimization and validate it.
- **Compare:** hold the journey and measurement method stable across two
  implementations.

Do not turn a diagnosis request into a framework migration or broad rewrite.

## Follow the workflow

### 1. Define the observed journey

Record:

- the exact user intent and start/end marks;
- affected routes, devices, browsers, and account/data conditions;
- whether the complaint concerns initial load, input response, visual
  stability, transfer progress, or completion;
- field evidence, trace, recording, server timing, and reproduction rate;
- the product's current budget or success criterion.

Replace “the app is slow” with an observable claim.

### 2. Establish a baseline

Prefer field data for user impact and controlled lab evidence for diagnosis.
Read
[`references/measurement-strategy.md`](references/measurement-strategy.md)
before collecting or interpreting Core Web Vitals.

Hold the task, data, browser, viewport, connection condition, hardware class,
and cache state stable where practical. Record warm and cold behavior
separately.

### 3. Attribute the delay

Classify the dominant boundary:

1. missing next-paint acknowledgement;
2. connection setup, latency, bandwidth, or packet loss;
3. server queueing, database, external service, or serialization;
4. HTML, JavaScript, CSS, font, or media transfer;
5. main-thread work, hydration, DOM patching, layout, paint, or memory;
6. retry, reconnect, or duplicated work;
7. measurement artifact or environment drift.

Read
[`references/performance-patterns.md`](references/performance-patterns.md) for
boundary-specific probes and remedies.

Do not use a final load time to infer which boundary dominates.

### 4. Select the smallest evidence-backed change

Examples:

- add immediate local feedback while retaining server authority;
- remove a serial dependency or unnecessary round trip;
- make expensive overlay enrichment asynchronous;
- bound a query, worker pool, or payload;
- serve an appropriately sized image and reserve its dimensions;
- remove duplicated client work or a layout-thrashing transition;
- cache or prefetch one measured critical dependency;
- reject a speculative preload that increases work without improving the
  journey.

Treat an architecture rewrite as a hypothesis requiring a representative
side-by-side prototype, total-system cost, and explicit revisit criteria.

### 5. Validate the outcome

Replay the same journey and compare:

- field or lab metric relevant to the original claim;
- next-paint feedback and interaction correctness;
- server, transfer, and render subparts;
- retries, duplicate work, and resource usage;
- narrow viewport, reduced motion, and reconnect behavior;
- regressions in authorization, accessibility, SEO, or operations.

Use `$test-responsive-ui` for temporal browser evidence and
`$design-resilient-interactions` when the measured gap is interaction feedback.

## Report clearly

Lead with the dominant boundary and evidence. Distinguish measured facts from
inference. State the baseline, proposed or implemented change, comparison,
remaining uncertainty, and whether a real-device or field-data checkpoint is
still required.
