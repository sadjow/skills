# Temporal interaction contract

## Contents

- [State model](#state-model)
- [Ownership](#ownership)
- [Levels of optimism](#levels-of-optimism)
- [Single-flight and concurrency](#single-flight-and-concurrency)
- [Immediate overlays](#immediate-overlays)
- [Stable geometry and motion](#stable-geometry-and-motion)
- [Cancellation and stale responses](#cancellation-and-stale-responses)
- [Forms and authored state](#forms-and-authored-state)
- [Failure, recovery, and focus](#failure-recovery-and-focus)
- [Acceptance checklist](#acceptance-checklist)

## State model

Model a critical interaction before choosing markup or framework APIs.

| State | User-visible obligation | Correctness obligation |
| --- | --- | --- |
| Idle | The available action is understandable | Current authoritative state is represented |
| Local acknowledgement | The next paint reflects the input | No trusted outcome is invented |
| In flight | One stable pending state explains the wait | Competing work is blocked or ordered |
| Accepted | The response feels causally connected | Authoritative data replaces projections |
| Rejected or timed out | The failure is visible and actionable | Local projection is rolled back or corrected |
| Disconnected or stale | Draft and connection status remain truthful | Late work cannot resurrect cancelled state |
| Restored | Focus and controls are usable again | Retry semantics and durable outcome are clear |

The next-paint obligation concerns feedback, not server completion. A pressed
state, opening shell, locally selected file, or pending label can be immediate
without claiming that a mutation succeeded.

## Ownership

Prefer one owner for every visual state.

Browser-owned state commonly includes:

- pressed, opening, closing, and temporary selected feedback;
- focus, inert background state, and scroll position;
- current unsent input and local file-selection acknowledgement;
- animation progress and reduced-motion adaptation;
- cancellation generation or request token.

Authoritative application state commonly includes:

- authentication, authorization, and validation;
- price, availability, quotas, and business rules;
- persisted records and terminal lifecycle outcomes;
- conflict resolution, idempotency, and retry ownership.

Server-rendered applications still need browser-owned transient state. Client
applications still need an authoritative mutation boundary. Framework choice
does not erase the ownership distinction.

## Levels of optimism

### Immediate acknowledgement

Use by default. Change only transient presentation:

- depress or highlight the initiating control;
- reveal a stable shell;
- show `aria-busy`, a pending label, skeleton, or local preview;
- remove duplicate affordances while preserving their space.

### Optimistic projection

Use when the projected outcome is cheap to reverse and users benefit from
seeing it early. Keep the projection distinguishable in the state model even
if it looks identical in the happy path.

Define:

- the authoritative response that confirms it;
- the rollback or correction;
- how related projections are ordered;
- what happens after navigation or reconnect;
- whether assistive status text should say pending rather than complete.

### Durable offline or replay queue

Use only with explicit product intent. It requires durable operation identity,
retry policy, conflict semantics, storage lifecycle, user-visible queued state,
and a way to inspect or cancel queued work.

## Single-flight and concurrency

Single-flight has two layers:

1. locally prevent the same control or related group from emitting conflicting
   work while one request owns the state;
2. enforce duplicate, stale, or conflict protection at the authoritative
   boundary.

The local guard provides responsiveness. The server or durable-store guard
provides correctness. Use both when double input, queued events, retries, or
multiple tabs can create the same effect.

Give a related control group one pending owner. A form may use one stable
pending fieldset or shell instead of independent disabled flags that patches
can replace. Be careful with native disabled form controls: disabled controls
are omitted from form submission. Prefer a pattern that preserves the intended
payload while preventing interaction, and verify the serialized values under
latency.

## Immediate overlays

Opening a modal, sheet, drawer, menu, or composer is a local interaction.

1. Reveal the persistent shell immediately.
2. Set focus and background inertness locally.
3. Show a truthful loading region inside the shell.
4. Fetch geocoding, suggestions, permissions, or other enrichment
   asynchronously.
5. Reconcile the content without replacing the shell or moving the close
   control.
6. Allow cancellation while enrichment is pending.

A late response must not reopen a surface the user already closed.

## Stable geometry and motion

- Keep one shell across loading, success, and failure.
- Reserve the slot occupied by a changing label, icon, count, or action.
- Remove old interactivity before new interactivity enters.
- Animate ordinary feedback with `opacity` and `transform`.
- Avoid animating width, height, padding, top, or other layout dimensions.
- Use short motion, commonly 160–240 ms, as an explanation of state change.
- Remove nonessential translation, scale, smooth scrolling, and repeated
  effects for `prefers-reduced-motion: reduce`.

Inspect adjacent frames. A correct final screenshot does not reveal a one-frame
disappearance, double control, or moving tap target.

## Cancellation and stale responses

Track the interaction generation or request identity when a response can arrive
after cancellation or replacement.

- Closing an overlay invalidates its pending open or enrichment generation.
- A newer search or filter intent supersedes an older response.
- A retry must not allow the earlier worker to persist after ownership changes.
- Reconnection must query or recover the durable outcome instead of assuming
  that a missing socket means failure.

Never let a late response resurrect locally cancelled UI.

## Forms and authored state

Authored fields belong to the browser until the user submits or the application
explicitly synchronizes them.

Any auxiliary action that can cause a patch or rerender must carry the current
relevant draft or preserve those controls outside the replaced region. Examples
include address lookup, geolocation, preview, suggestion selection, and step
navigation.

Do not send mount-time defaults that may arrive after typing and overwrite
newer input. Write browser-derived defaults locally and include them in the
next intentional request.

## Failure, recovery, and focus

- Keep the failure near the action and explain what can be done.
- Preserve valid authored work.
- Re-enable the correct control group exactly once.
- Restore focus to the initiating control, first invalid field, or new result
  according to the journey.
- Use one calm connection-status owner during reconnect; do not stack several
  alerts for the same loss.
- Announce meaningful changes with an appropriate live region without narrating
  every intermediate patch.

## Acceptance checklist

- Input is acknowledged before the delayed response.
- Only one pending owner is visible.
- Rapid repeated input creates the intended number of operations.
- A rejected outcome is correctable without losing unrelated draft state.
- Cancellation prevents a late response from reopening or replacing the UI.
- Loading, ready, and error states use stable geometry.
- Keyboard focus remains visible and returns logically.
- Reduced-motion behavior preserves the same state model.
- The narrowest viewport has no unintended horizontal overflow.
- Stateful or durable work recovers after a real reconnect.
