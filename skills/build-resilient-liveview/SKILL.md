---
name: build-resilient-liveview
description: Design, implement, debug, or test responsive Phoenix LiveView interactions that feel immediate and remain correct under latency, rapid input, DOM patches, disconnects, uploads, and asynchronous work. Use when working with LiveView templates, Phoenix.LiveView.JS, phx loading classes, JavaScript hooks, forms, phx-auto-recover, live_file_input, optimistic UI, overlays, PubSub, idempotency, supervised media or background work, or Playwright latency and reconnect regressions.
---

# Build Resilient LiveView

Keep Phoenix authoritative for trusted state while giving browser-owned
interaction state the local behavior it needs. Apply the host repository's
Phoenix version, component conventions, authentication boundaries, and domain
rules before this skill.

## Follow the workflow

### 1. Inspect the LiveView boundary

Read the relevant LiveView, HEEx template, hook or colocated JavaScript, context
command, transaction, PubSub path, LiveView tests, and Playwright journey.

Identify:

- which event starts the intent;
- which DOM region a patch can replace;
- which state must be local before the round trip;
- which state must remain authoritative;
- whether work can outlive the socket;
- how duplicate or stale events are prevented;
- how the form or lifecycle recovers after remount.

Do not add a hook or client store until the existing LiveView contract is
understood.

### 2. Choose the narrowest LiveView mechanism

Prefer:

1. CSS driven by LiveView loading classes for simple pending feedback;
2. `Phoenix.LiveView.JS` commands for patch-aware local attributes, classes,
   focus, show/hide, and targeted loading state;
3. a focused hook for device APIs, request generations, client-owned scrolling,
   complex overlay lifecycles, or state spanning animation frames;
4. LiveView events and context commands for validation and durable mutations;
5. bounded supervised or durable queued work only when the operation can
   outlive the event callback or socket.

Read
[`references/liveview-interaction-patterns.md`](references/liveview-interaction-patterns.md)
before implementing a network-backed control, overlay, hook, or optimistic
projection.

### 3. Keep the interaction single-flight

Give the initiating control or related control group one pending owner. Use the
appropriate loading selector or local synchronous guard, and add an equivalent
context, database, idempotency, or stale-attempt guard when duplicate events
could create conflicting durable work.

Do not rely only on a disabled-looking control or socket assign for durable
correctness.

### 4. Preserve forms, uploads, and recovery

For stateful forms, auxiliary events, auto-upload, or work that can outlive the
socket, read
[`references/forms-uploads-and-recovery.md`](references/forms-uploads-and-recovery.md).

Keep a stable form ID. Use specialized `phx-auto-recover` for stateful
multi-step forms. Keep current and prerequisite draft fields inside the form,
validate the recovered step on the server, and never move private draft data
into the URL merely to survive a remount.

### 5. Commit before broadcasting

Keep database changes and external side effects at distinct boundaries.
Broadcast PubSub, notifications, webhooks, or similar effects only after the
outermost transaction commits. When a nested context suppresses its broadcast,
the outer caller must emit the equivalent event after successful commit.

### 6. Validate the real failure modes

Use focused context and LiveView tests for authorization, validation,
idempotency, and transaction behavior. Then read
[`references/testing-liveview-interactions.md`](references/testing-liveview-interactions.md)
and exercise the browser journey with:

- 320 px touch and desktop;
- at least 750 ms LiveView latency simulation;
- rapid repeated input;
- rejection and stale response;
- reduced motion, focus, and overflow;
- `reconnectLiveView(page)` for remount recovery;
- captured adjacent-frame review for temporal defects.

Use `$test-responsive-ui` for the broader viewport and evidence workflow when
it is available.

## Report the result

State the browser/server ownership split, local feedback mechanism, server
guard, patch boundary, remount behavior, durable-work ownership, after-commit
side effects, and focused validation evidence.
