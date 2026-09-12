---
name: design-resilient-interactions
description: Design, implement, review, or repair responsive network-backed web interactions that acknowledge input immediately and remain correct under latency, failure, rapid input, and reconnects. Use when working on optimistic UI, pending or loading states, forms, search, overlays, drawers, modals, action bars, state transitions, focus recovery, reduced motion, idempotent mutations, or stale-response bugs in any web framework.
---

# Design Resilient Interactions

Treat time, ownership, failure, and recovery as part of interface design. Make
the browser feel immediate without moving trusted domain rules out of the
authoritative application boundary.

## Follow the workflow

### 1. Inspect the existing contract

Identify:

- the user intent and visible initiating control;
- the browser event and network boundary;
- the authoritative mutation or query;
- every UI surface that the response can replace;
- existing pending, error, reconnect, and focus behavior;
- nearby tests, reusable components, hooks, and design tokens.

Preserve project architecture and product rules. Do not create a second state
system merely to make one interaction feel fast.

### 2. Model the temporal states

Write the journey as:

1. idle;
2. local acknowledgement;
3. request in flight;
4. accepted response;
5. rejection, timeout, or cancellation;
6. disconnect, reconnect, or stale response;
7. restored usable state and focus.

For network-backed work, read
[`references/temporal-interaction-contract.md`](references/temporal-interaction-contract.md)
before implementation.

Assign one owner to each state. Keep pressed/opening feedback, focus, transient
scroll, and local selection in the browser. Keep authorization, validation,
prices, availability, durable data, and terminal outcomes authoritative in the
trusted application layer.

### 3. Choose the minimum safe optimism

Prefer, in order:

1. immediate acknowledgement without projecting a domain outcome;
2. an optimistic projection that is reversible and clearly reconciled;
3. a durable offline or replay queue only when the product explicitly requires
   it and the mutation has stable identity and conflict rules.

Do not call a spinner optimistic UI. Do not show success before the system has
accepted the outcome unless rollback and correction are designed.

### 4. Implement one coherent transition

- Acknowledge input on the next paint.
- Make the initiating control or related control group single-flight.
- Guard duplicate, conflicting, and stale work at the authoritative boundary.
- Keep one stable shell while loading and ready content change.
- Render overlays immediately and load enrichment afterward.
- Remove outgoing interactivity immediately while reserving its geometry.
- Preserve authored input across auxiliary actions and server patches.
- Restore focus and expose a meaningful, non-duplicated status.
- Provide equivalent behavior when motion is reduced.

For viewport, input-mode, overlay, persistent-chrome, image, or motion work,
read
[`references/responsive-and-accessible-ui.md`](references/responsive-and-accessible-ui.md).

For replay-prone mutations, uploads, background work, or actions that can
outlive the page connection, read
[`references/durable-mutations.md`](references/durable-mutations.md).

### 5. Prove the behavior

Use the host project's focused component or server tests, then exercise the
critical browser journey with `$test-responsive-ui` when available.

At minimum verify:

- local acknowledgement before the delayed response;
- only one pending owner and one resulting mutation;
- rejection and retry;
- late or stale response handling;
- geometry and actionability at the narrowest supported width;
- keyboard focus and reduced motion;
- reconnect recovery when the journey retains draft or durable work.

## Report the result

State the ownership model, optimism level, duplicate/stale guard, recovery
behavior, viewports and latency checked, and any behavior that still requires a
real-device or production measurement.
