# LiveView mechanisms and transaction boundaries

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

## Patch identity and focus

A patch that moves a node blurs the focused element inside it. Reordering keyed
siblings, inserting a keyed sibling before it, or removing a keyed sibling that
precedes it can each move the node. When an interaction can reorder a
collection or add and remove controls beside the focused one:

- keep choosable items in a stable order and show the changing order separately,
  so choosing an item never moves its control;
- key reorderable rows by position and render every row's controls on each
  patch, disabling those that do not apply;
- direct any post-action focus command at a control that exists both before and
  after the patch.

Collections whose order and controls never change while focused need none of
this.

Patches also reset attributes the browser toggles, such as `open` on `details`
or `dialog`, to the server-rendered value. Where the pinned version provides
`JS.ignore_attributes/1`, apply it from `phx-mounted` and render only the
initial value; keep the open state on the server when the server must close the
element itself.

Server-rendered test harnesses do not patch a live DOM, so prove focus
retention and toggled attributes in a real browser.

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

## After-commit side effects

When a context mutation is wrapped by an outer transaction:

1. suppress a nested PubSub or external effect if it would fire before the
   outer commit;
2. return the data required to publish the equivalent event;
3. emit only after the outer transaction succeeds.

Test rollback to prove subscribers never observe uncommitted data.
