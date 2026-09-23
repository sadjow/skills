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

A relative command, such as move up, next, or increment, only has meaning
against the state its control was drawn from. When focus or a click reaches a
control before the reply re-renders it, that control still carries the previous
render's payload, and the boundary would apply the command to a different item
or value. Send the item with the position, value, or version the control was
drawn with, and have the boundary ignore or reject a mismatch. A local guard on
the initiating control does not protect another control that just received
focus.

That state includes the collection when a view can redraw the same controls for
another one, such as after choosing a different parent record. An item in both
collections can hold the same position in each, so also send the identity of
the collection the control was drawn for. A gesture that spans the switch, such
as a drag, keeps the identity it started with.

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
- Delay a pending indicator by about 150–300 ms and, once shown, keep it for
  about 300–500 ms so fast responses do not flicker. The control's own
  acknowledgement stays immediate.
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

A draft restored after a reconnect or reload was written against the version
of the record it was drawn from, not the version the page reloads. Keep that
version with the draft and have the save check it, so a save someone else made
in between is reported as a conflict instead of overwritten. When the reply to
the user's own save is lost to the disconnect, the check reports a false
conflict; prefer that to a silent overwrite.

A restored or submitted form can be partial. Browsers omit disabled controls,
so a read-only form restores only whatever enabled control it still contains,
such as a stray hidden field. Treat a field missing from the payload as unknown
rather than cleared, send an explicit empty value for a list the user emptied,
and keep every control of a read-only form disabled, hidden fields included.

## Failure, recovery, and focus

- Keep the failure near the action and explain what can be done.
- Preserve valid authored work.
- Re-enable the correct control group exactly once.
- Restore focus to the initiating control, first invalid field, or new result
  according to the journey.
- When the press and the reply can both set focus, such as a move whose reply
  may reject it and reload the list, route both requests through one owner that
  applies each at once. A framework focus helper can retry later, such as after
  animation frames, on the element it found at the press; when the reply lands
  first, the retry undoes the reply's focus. Background tabs pause animation
  frames, so the retry can come long after the reply, which also makes the race
  reproducible.
- Use one calm connection-status owner during reconnect; do not stack several
  alerts for the same loss.
- Announce meaningful changes with an appropriate live region without narrating
  every intermediate patch.

## Acceptance checklist

- Input is acknowledged before the delayed response.
- Only one pending owner is visible.
- Rapid repeated input creates the intended number of operations.
- A relative command repeated before the first reply applies to the item it was
  drawn for or is rejected; it never acts on a neighbor.
- A command drawn for one collection and received after the view switched to
  another never changes the new collection.
- A rejected outcome is correctable without losing unrelated draft state.
- A draft restored after a reconnect saves against the version it was drawn
  from, and a partial restore never clears fields it did not carry.
- Cancellation prevents a late response from reopening or replacing the UI.
- Loading, ready, and error states use stable geometry.
- Keyboard focus remains visible and returns logically.
- When the press and the reply both set focus, focus ends where the reply put
  it, even when the reply arrives before the next frame.
- Reduced-motion behavior preserves the same state model.
- The narrowest viewport has no unintended horizontal overflow.
- Stateful or durable work recovers after a real reconnect.
