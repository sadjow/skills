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

LiveView ignores additional clicks on a bound element that is itself awaiting
acknowledgement. A `JS.push` `loading` selector marks the elements it matches
the same way, so a selector that matches sibling buttons also suppresses their
clicks until the reply; one that matches only their container does not. Treat
either as responsiveness and confirm it in a browser for the pinned version. An
authoritative duplicate guard is still required when retries, multiple
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
- key reorderable rows by position and keep every row's element structure
  identical across patches: render each row's controls, disabling those that do
  not apply, and toggle optional content inside a stable wrapper rather than
  adding or swapping sibling elements;
- direct any post-action focus command at a control that exists both before and
  after the patch.

Position keying has a cost for relative commands such as move up. `JS.focus`
runs before the reply, so after a move it lands on the control that rendered
the neighbor at that position, which keeps the neighbor's `phx-value-*` or
`JS.push` payload until the patch arrives. A quick second press then sends the
neighbor's command. Send the item's drawn position or the order version with
the item, and have the handler ignore the event when the item is no longer
there. Test it by replaying the pre-reply payload after a first move.

`JS.focus` and `JS.focus_first` also focus again two animation frames later, on
the element they found when the command ran, so a `JS.show` earlier in the
chain can finish first. LiveView 1.2 does this; confirm it in the pinned
client's `exec_focus`. When the server can also set focus in its reply, such as
returning focus to an item after rejecting a stale move, that retry undoes the
reply's focus whenever the reply arrives first. Route both requests through one
hook instead: chain `JS.dispatch` of a custom event from the control for the
press-time focus, receive the server's `push_event` with `handleEvent`, and
focus at once in both. Keep `JS.focus` where no reply sets focus.

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
