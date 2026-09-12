---
name: phoenix-liveview-interaction-resilience
description: Design or debug Phoenix LiveView interactions under latency, DOM patches, rapid input, and reconnects. Use for lost drafts, duplicate actions, gesture errors, uploads, and recovery.
---

# Phoenix LiveView Interaction Resilience

Treat perceived speed, browser/server state ownership, accessibility, and
recovery as one interaction contract. Inspect the pinned Phoenix and LiveView
versions and local client source before relying on version-specific behavior.

## Map the complete lifecycle

Reproduce at normal latency and a deliberately slow round trip. Distinguish
input-to-paint, push-to-reply, patch application, and layout/paint. Map input,
local acknowledgement, push, reply/patch, rejection, timeout, disconnect,
reconnect, broadcast, close, cleanup, and focus return.

Keep trusted data and accepted mutations on the server. Keep pressed/opening/
closing state, browser drafts, focus, gesture classification, request tokens,
and transient feedback in the browser. Give each visible attribute one owner.

Read [interaction architecture](references/interaction-architecture.md) before
changing hooks, event handlers, overlays, selection cards, tabs, or forms.

Choose loading classes or `Phoenix.LiveView.JS` for simple patch-aware feedback;
use a focused hook only when the lifecycle needs browser APIs or ownership
across frames. Read [LiveView mechanisms](references/liveview-interaction-patterns.md)
for loading selectors, hooks, serialized form payloads, and after-commit effects.
Publish external effects only after the outermost transaction commits.

## Design recovery explicitly

A socket reconnect, LiveView remount, full reload, browser restart, and replayed
mutation are different failure boundaries. Choose the minimum persistence that
matches the value and sensitivity of the work. Async enrichment and uploads
need bounded deadlines, stale-reply rejection, cleanup, and durable recovery
when they can outlive a socket.

Read [recovery and async work](references/recovery-and-async-work.md) for cold
join, reconnect/reload, drafts, uploads, and background work.

Read [forms and uploads](references/forms-uploads-and-recovery.md) when changing
auxiliary form events, wizard recovery, upload preflight, or durable processing.
Preserve stable form IDs, validate recovered prerequisites, and carry one
submission identity through processing and recovery.

## Prove temporal behavior

Server-rendered tests prove validation, state transitions, authorization, and
idempotency. Browser tests prove local paint, event order, gesture cancellation,
DOM restoration, focus, geometry, reconnect/reload, and motion. A final
screenshot cannot prove there was no flash or duplicate interactive frame.

Read [diagnostics and validation](references/diagnostics-and-validation.md)
before profiling or writing the browser matrix.

For executable latency and reconnect probes, use
[testing LiveView interactions](references/testing-liveview-interactions.md)
and the packaged [LiveView helper](assets/e2e/support/liveview.ts). They work
without installing a companion skill. When available, use
`$playwright-reactive-ux-testing` for a focused temporal regression and
`$playwright-responsive-ui-testing` for broader viewport coverage.

Use native semantics, meaningful status, deliberate focus, practical touch
targets, and reduced motion. Load a dedicated accessibility workflow for a new
widget or high-risk journey.
