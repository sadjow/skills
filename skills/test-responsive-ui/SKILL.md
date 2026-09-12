---
name: test-responsive-ui
description: Design, implement, run, or review Playwright tests for responsive and temporal web-interface quality across viewport sizes, touch and pointer modes, latency, rapid input, reduced motion, failure, and reconnects. Use when adding browser QA, reproducing mobile or desktop UI defects, checking optimistic or pending states, verifying overlays and persistent chrome, preventing horizontal overflow or duplicate mutations, capturing traces or videos, or reviewing interaction frame sheets.
---

# Test Responsive UI

Use Playwright to prove behavior over time, not only final markup. Preserve the
host application's test architecture and merge the supplied starter assets
instead of overwriting an established configuration.

## Follow the workflow

### 1. Inventory the journey

Identify:

- the user intent and critical controls;
- all local, pending, accepted, rejected, and reconnect states;
- supported viewport and input modes;
- existing Playwright fixtures, authenticated scenarios, and cleanup paths;
- stable roles, labels, and test IDs;
- how the application can simulate latency and connection loss.

Write a short QA inventory before editing. Map every listed state to at least
one assertion.

### 2. Select the matrix

Start with the minimum matrix in
[`references/playwright-qa.md`](references/playwright-qa.md). Keep 320 px touch,
390 px touch, 390 px mouse and keyboard, tablet touch when relevant, and 1280 ×
720 desktop unless the host product defines stronger representative targets.

Treat width and input capability as separate dimensions. Do not infer touch
behavior from a narrow viewport.

### 3. Build deterministic setup

Prefer a server-side scenario, API fixture, or direct test fixture for
preconditions. Exercise login through the UI only when login is the journey
under test. Give each test isolated data and an explicit cleanup boundary.

Use roles and labels for user-visible outcomes. Use stable test IDs for
application-owned shells or state boundaries that lack a suitable accessible
locator. Avoid selectors coupled to styling.

### 4. Assert the timeline

For a network-backed critical action, prove:

1. the next-paint acknowledgement exists while the response is still delayed;
2. one pending owner locks the related action surface;
3. the stable shell and action geometry remain usable;
4. the authoritative success or rejection reconciles the UI;
5. rapid input creates the intended number of mutations;
6. cancellation or newer intent defeats stale responses;
7. focus and controls recover.

Use web-first assertions and bounded polling. Do not make a test pass by adding
arbitrary sleeps or increasing timeouts.

### 5. Exercise adverse states

- Apply at least 750 ms of application-level or route-level latency.
- Send rapid repeated input.
- Emulate reduced motion.
- Check rejection or provider failure.
- Check horizontal overflow and important target dimensions.
- Perform a real connection cycle for stateful forms or durable work.
- Test the same narrow width with touch and with mouse/keyboard.

Route delay does not slow WebSocket frames. Use a framework adapter for
socket-driven applications. For Phoenix LiveView, use
`$build-resilient-liveview` and its reconnect helper when available.

### 6. Capture temporal evidence

For motion, overlays, media, upload progress, or a defect visible between
assertion points, read
[`references/frame-review.md`](references/frame-review.md). Capture the focused
journey, run `scripts/extract-playwright-frames`, and inspect adjacent frames.

### 7. Report evidence

Report the journey, viewport, input mode, latency mechanism, rapid-input and
reconnect result, reduced-motion result, overflow and focus result, and artifact
paths. Distinguish browser-emulation evidence from real-device measurements.

## Reuse the bundled tooling

The [`assets/playwright-kit`](assets/playwright-kit) directory contains:

- a configurable multi-project `playwright.config.ts`;
- a shared quality profile;
- assertions for overflow, target size, viewport containment, persistent
  chrome, and geometry;
- route-delay, next-paint, and offline helpers;
- optional screenshot capture;
- a skipped-by-default example critical journey.

Copy or merge only the files the host repository needs. Preserve its package
manager, module convention, reporter, authentication, web server, and CI
settings.
