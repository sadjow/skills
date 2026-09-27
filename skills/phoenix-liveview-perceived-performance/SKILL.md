---
name: phoenix-liveview-perceived-performance
description: Diagnose, fix, and guard how fast and smooth a Phoenix LiveView app feels. Use when a page flickers, changes color after it appears, activates a tab or chip late, fades between two choices, replays an entrance after navigation or reconnect, stutters while an overlay opens or the page scrolls, mounts or navigates slowly, or sends heavy diffs or queries; before adding motion, blur, backdrop filters, view transitions, preloading, or a client dependency; and when someone proposes React, Vue, or another frontend for speed.
---

# Phoenix LiveView Perceived Performance

Treat small visual faults as defects. A tab that lights up after the page
appears, a color that fades between two choices, or a sheet that stutters while
it opens makes a product feel unreliable even when every value is right. Most
of these faults come from state ownership and paint cost rather than from
LiveView itself, so find the layer before changing code or the stack.

Inspect the pinned Phoenix, LiveView, and Tailwind versions and the local
client source before relying on version-specific behavior.

## Classify the layer first

Describe the symptom per frame and reproduce it on first entry, live
navigation, full reload, and reconnect, at phone width and desktop. Then name
the layer:

| Layer | Typical cause |
| --- | --- |
| Connection and server | slow mount, repeated queries, blocking work in the connected mount |
| Payload | large diffs, lists rendered without streams, forwarded assigns, heavy bundle or media |
| State ownership | client code first sets a visible state, the join changes the first paint, or two owners fight over one attribute |
| Paint and compositing | color or opacity transitions on state, nested fading layers, `backdrop-filter`, large blurs, view transitions, animated layout |
| Feedback | no local acknowledgement, pending state that moves geometry, an entrance on content already visible |

Fix at the owning boundary by removing work. Do not hide a late or expensive
change behind a delay, fade, skeleton, or spinner.

## Render the real state in the first paint

Render current, selected, and active state on the server from the request, and
style it with static attribute variants. Give each client-owned attribute one
owner: render a correct server default and protect the client value with
`JS.ignore_attributes/1`. Never let a client binding paint a state class after
the script runs.

Read [first paint and state](references/first-paint-and-state.md) before
touching navigation, tabs, chips, selection, or client-owned attributes.

## Switch state instantly and keep motion cheap

Current, selected, pressed, and checked styles change in one frame; press
feedback moves only transforms. In Tailwind v4, plain `transition` also
animates colors, opacity, and shadow. Entrances run once, for what the person
just caused, and never from a `JS.transition` in `phx-mounted`, which replays
on every join. Overlays fade through one opacity layer, and scrims and sticky
bars carry no backdrop filter.

Read [motion and paint](references/motion-and-paint.md) before adding or
reviewing a transition, entrance, overlay, filter, or view transition. Adapt
the packaged [state motion contract test](assets/test/state_indication_motion_contract_test.exs)
and [connected-only entrance helper](assets/js/entrance_motion.js) with its
[Elixir counterpart](assets/lib/motion.ex) when the project lacks equivalents.

## Keep mount and diffs proportional

A cold request mounts twice and live navigation mounts once over the socket.
Both paths must paint the same state quickly. Defer enrichment with
`assign_async` or `start_async`, stream growing collections, pass explicit
attrs, and pin a hot path's query count.

Read [server and payload](references/server-and-payload.md) when changing
mount, `handle_params`, queries, collections, or component attrs.

## Measure before claiming smoothness

Record long animation frames and frame deltas around the interaction, and
confirm any long-frame attribution on a real GPU; headless software rendering
inflates raster time. Isolate a suspected cause without changing timing.

Read [measuring smoothness](references/measuring-smoothness.md) and use the
packaged [frame probe](assets/e2e/support/frames.ts) for Playwright. Report
the viewport, device pixel ratio, renderer, network condition, and longest
frame before and after.

## Guard the fix

Prefer the cheapest deterministic guard, added red-first: a render test that
asserts the server-rendered state, a template contract test, or a query-count
assertion. Use a browser test only for timing, real paint, gestures, or
reconnect that server tests cannot observe. When a fix reveals a new rule,
record it in the project's owning contract with its guard.

## When a framework change is proposed for speed

Answer with measurements. Late state from client code, fades on selection,
nested opacity, backdrop filters, and replayed entrances reproduce in any
server-rendered, hydrated framework, so they are not evidence against LiveView.
Fix the measured layers, compare again, and consider a rewrite only through a
representative side-by-side prototype with total-system cost and revisit
criteria.

## Companion skills

These skills are optional; this one stands alone.

- `$diagnose-web-performance` for framework-neutral measurement strategy.
- `$phoenix-liveview-interaction-resilience` when the fault is lost or
  duplicated input, latency handling, reconnect recovery, or focus.
- `$phoenix-ui-architecture` for component boundaries and Tailwind structure.
- `$playwright-reactive-ux-testing` for temporal browser regressions.
- `$accessible-web-interactions` when motion, focus, or state semantics change.
