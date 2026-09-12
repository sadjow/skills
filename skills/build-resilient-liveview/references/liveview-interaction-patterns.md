# LiveView interaction patterns

## Contents

- [Ownership](#ownership)
- [Loading classes](#loading-classes)
- [Phoenix.LiveView.JS](#phoenixliveviewjs)
- [Hooks](#hooks)
- [Immediate overlays](#immediate-overlays)
- [Single-flight events](#single-flight-events)
- [Stable geometry](#stable-geometry)
- [Stale responses and cancellation](#stale-responses-and-cancellation)
- [After-commit side effects](#after-commit-side-effects)

## Ownership

Keep these browser-owned:

- pressed, opening, closing, and focus state;
- temporary inert background state;
- transient scrollspy and reader position;
- locally selected files and unsent authored input;
- request generation used to reject late UI responses;
- reduced-motion adaptation.

Keep these server-owned:

- authentication and authorization;
- validation and domain rules;
- price, availability, quotas, and final outcomes;
- durable operation identity and attempt ownership;
- persistence and transaction boundaries.

LiveView does not require every transient state to take a round trip. Focused
JavaScript does not require duplicating the domain model.

## Loading classes

LiveView applies event-specific loading classes until acknowledgement, including
`phx-click-loading`, `phx-change-loading`, and `phx-submit-loading`. Use them for
simple immediate feedback and stable content swaps.

The current LiveView guide describes these optimistic UI primitives at:
<https://phoenix-live-view.hexdocs.pm/syncing-changes.html>.

Keep the loading and ready content in one stable shell. Avoid replacing an icon
or label with different geometry. Use a meaningful `aria-busy` owner when the
visible task is pending.

LiveView ignores additional clicks from an element awaiting acknowledgement,
but an authoritative duplicate guard is still required when retries, multiple
controls, multiple tabs, or background workers can produce the same mutation.

## Phoenix.LiveView.JS

Use JS commands for patch-aware local operations:

- show or hide an overlay;
- add or remove classes and attributes;
- push and restore focus;
- set a targeted loading selector for a control group;
- compose a local transition with a server push.

`JS.push` supports a `loading` selector so the pending owner can be a stable
row, form, or shell rather than only the clicked element:
<https://phoenix-live-view.hexdocs.pm/Phoenix.LiveView.JS.html>.

Prefer JS commands over a custom hook when the behavior is expressible as a
short patch-aware command sequence.

## Hooks

Use a focused hook when behavior needs:

- browser APIs such as geolocation or media;
- state across animation frames;
- request-generation or cancellation ownership;
- coordinated focus, inertness, and scroll;
- third-party widgets with their own DOM lifecycle.

Give one hook or server patch ownership of each visual state. Do not combine
competing scroll observers or repeatedly reset client-owned state from server
assigns.

When the hook completely owns a DOM subtree, use the host project's supported
ignored-DOM boundary and stable ID. Do not ignore a subtree merely because a
hook is attached; doing so can suppress legitimate server updates.

The current JavaScript interop guide is
<https://phoenix-live-view.hexdocs.pm/js-interop.html>.

## Immediate overlays

Opening and closing are local:

1. keep a persistent shell in the DOM;
2. reveal it immediately with JS commands or a hook;
3. set focus and background inertness;
4. show a loading region inside the shell;
5. push the enrichment or content event;
6. patch content into the shell;
7. invalidate the request generation on close.

Do not wait for geocoding, suggestions, database lookup, or external services
before showing the surface. A response arriving after Escape or close must not
reopen it.

## Single-flight events

For one control, LiveView's loading lifecycle may provide the local lock. For a
related group:

- target one stable loading shell;
- use a synchronous browser guard if two events can occur before loading state
  is applied;
- keep the serialized form payload intact;
- reject duplicate or stale intent in the context or database;
- unlock on the terminal server result, not on an unrelated intermediate patch.

Avoid native `disabled` on a whole field group when those values must be
serialized; disabled form controls are omitted from submission. Use the
project's established inert or read-only pattern and prove the received payload
under latency.

## Stable geometry

- Keep one shell through loading, ready, error, and closing.
- Reserve action slots and remove outgoing interactivity immediately.
- Animate only opacity and transform for routine feedback.
- Keep persistent navigation and action bars from covering the last control.
- Make stateful hook roots and forms stable by ID.
- Preserve focus and authored input across DOM patches.

Use frame capture to find one-paint disappearances and duplicated controls that
a final screenshot misses.

## Stale responses and cancellation

LiveView event ordering does not replace explicit interaction ownership.

- Attach a client request generation when an overlay or search can be replaced.
- Track the authoritative attempt for durable work.
- Ignore or discard results whose generation or attempt no longer owns the UI.
- Prevent a server patch from resurrecting locally cancelled content.
- On reconnect, query the durable lifecycle rather than inferring failure from
  socket loss.

## After-commit side effects

When a context mutation is wrapped by an outer transaction:

1. suppress a nested PubSub or external effect if it would fire before the
   outer commit;
2. return the data required to publish the equivalent event;
3. emit only after the outer transaction succeeds.

Test rollback to prove subscribers never observe uncommitted data.
