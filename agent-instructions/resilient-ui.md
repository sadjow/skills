# Resilient UI engineering

Apply these instructions when building or changing responsive, network-backed
web interfaces.

## Skill routing

- Use `$web-interaction-resilience` for interaction state, optimistic
  feedback, overlays, forms, pending behavior, recovery, and motion.
- Use `$playwright-responsive-ui-testing` for Playwright journeys and responsive QA.
- Use `$diagnose-web-performance` before making a performance-motivated
  architecture change or broad optimization.
- In Phoenix LiveView projects, also use `$phoenix-liveview-interaction-resilience`.

## Interaction contract

- Map idle, local acknowledgement, request in flight, accepted response,
  rejection or timeout, disconnect or stale response, and focus restoration
  before implementation.
- Acknowledge input on the next paint. Do not wait for a network round trip to
  show pressed, opening, selected, busy, skeleton, or progress feedback.
- Keep authorization, prices, availability, validation, and durable outcomes
  authoritative on the server. Browser-owned feedback may be immediate without
  inventing trusted domain state.
- Make every network-backed control or related control group single-flight.
  Add server-side idempotency, duplicate protection, or stale-response guards
  when queued work could conflict.
- Render modal, sheet, drawer, and overlay shells immediately. Load expensive
  enrichment asynchronously after the surface is visible and show a truthful
  loading state inside the stable shell.
- Preserve geometry while state changes. Remove outgoing interactivity
  immediately, reserve its slot, and avoid leaving old and new controls active
  together.
- Animate routine feedback with `opacity` and `transform`, normally within
  160–240 ms. Do not animate layout dimensions for ordinary state feedback.
- Preserve or restore focus, provide equivalent reduced-motion behavior, and
  keep dynamic status announcements meaningful.
- For replay-prone mutations, carry one idempotency key through submission,
  processing, persistence, reconnect recovery, and the terminal outcome.
- Publish external side effects only after the authoritative transaction
  commits.

## Responsive contract

- Start at 320 CSS pixels, then test a representative mobile touch viewport,
  the same narrow width with mouse and keyboard, a tablet touch viewport, and a
  desktop viewport.
- Treat viewport and input mode as separate dimensions. Never make hover the
  only way to reveal or perform an action.
- Use 44 by 44 CSS pixels as the default project target size for important
  custom controls, while accounting for standards-based exceptions and project
  accessibility requirements.
- Keep persistent chrome from covering the final actionable control. Verify
  actionability with browser geometry, not presence in the DOM alone.
- Check horizontal overflow, transformed focus rings, safe-area spacing,
  keyboard order, focus return, and reduced motion.
- Reserve image dimensions, use responsive sources, and avoid transferring a
  large asset only to shrink it with CSS.

## Completion evidence

For each changed critical journey, record:

- viewport and input mode;
- at least 750 ms of application-level or network latency where applicable;
- rapid repeated input and single-flight behavior;
- rejection and recovery behavior;
- reconnect behavior for stateful or durable flows;
- reduced-motion, keyboard focus, target size, and horizontal overflow;
- a Playwright trace or captured video with adjacent-frame review for temporal
  behavior.

Viewport emulation is a deterministic development check, not proof of
real-device performance. Validate high-risk journeys on representative
hardware and networks before making production performance claims.
