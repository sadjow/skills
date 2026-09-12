---
name: playwright-responsive-ui-testing
description: Test web layouts with Playwright across viewport sizes and input modes. Use for overflow, obscured controls, touch targets, responsive geometry, and viewport QA configuration.
---

# Playwright Responsive UI Testing

Prove that a web journey remains readable and actionable across relevant widths
and input modes. Preserve the host application's test architecture and merge
only the useful starter assets into its existing configuration.

## Select representative coverage

Inspect the journey, existing Playwright projects, supported browsers, input
methods, and fixture setup. Treat width and input capability as separate
dimensions; a narrow viewport does not prove touch behavior.

Use [responsive QA](references/playwright-qa.md) to choose coverage. Its viewport
matrix is a starting point, not a mandatory gate for every change. A localized
wrapping regression may need one failing width and a nearby boundary; a layout
redesign may justify the full matrix. Keep authentication and unrelated data
setup in fixtures unless those flows are themselves under test.

## Assert layout and actionability

At the relevant idle, expanded, pending, error, and completed states, check:

- horizontal overflow and wrapping, including long labels;
- target dimensions and room for focus indicators;
- overlays and controls within the usable viewport;
- the final action remaining reachable above persistent chrome;
- stable geometry as content arrives or changes;
- keyboard order, focus visibility and return, and equivalent touch actions;
- reduced-motion behavior when the journey uses animation.

Use semantic locators, web-first assertions, trial actions, or hit testing.
Presence in the DOM or viewport intersection alone does not prove actionability.
Do not hide failures behind arbitrary sleeps or increased timeouts.

## Keep temporal regressions focused

For a defect caused by event ordering, gesture cancellation, stale replies,
DOM replacement, or reconnect recovery, prefer
`$playwright-reactive-ux-testing` when available. If absent, use the relevant
latency and failure sections in [responsive QA](references/playwright-qa.md)
to preserve the actual timing mechanism in a focused test. This package remains
usable independently.

HTTP route delay does not slow WebSocket frames. Use the application's own
socket controls when its state depends on a persistent connection; latency,
disconnect, reconnect, and reload are distinct conditions.

Read [capture and frame review](references/frame-review.md) only when a final
assertion cannot reveal a transient geometry or visual defect. The packaged
`scripts/extract-playwright-frames` helper requires ffmpeg and ffprobe.

## Reuse tools and report evidence

The [Playwright starter kit](assets/playwright-kit) provides optional projects,
geometry assertions, delay helpers, capture support, and an example journey.
Copy only what is needed. Preserve the project's package manager, module
conventions, authentication, reporters, web server, and CI policy.

Report the tested journey, viewports, input modes, layout and focus outcomes,
and relevant artifacts. Distinguish emulation from physical-device evidence;
do not claim real-device performance from a viewport test.
