# First paint and state ownership

## Contents

- [Why late state is visible](#why-late-state-is-visible)
- [Render current state on the server](#render-current-state-on-the-server)
- [Give each attribute one owner](#give-each-attribute-one-owner)
- [Make the join a no-op](#make-the-join-a-no-op)
- [Guard it](#guard-it)

## Why late state is visible

The HTML from the first request paints before any script runs. Anything that
client code sets afterward, such as a class from a reactive binding, an
`aria-current` computed from `location`, or a tab chosen by a scroll observer,
appears one or more frames later. People see that as a tab lighting up late or
a color changing after the page appears. The same fault reproduces in any
server-rendered framework that hydrates, so it is a state-ownership problem
rather than a LiveView limitation.

## Render current state on the server

- Derive the current page, tab, filter, category, or selection from the
  request path, params, or assigns, and render `aria-current`,
  `aria-selected`, or a `data-*` state attribute in the first HTML.
- Style the state with static attribute variants such as
  `data-[current=true]:text-…` or `aria-[current=page]:…`. The class string never
  changes; only the attribute does, so every paint that has the attribute
  already has the style.
- Do not bind state classes through a client expression such as Alpine
  `x-bind:class` or a hook that toggles classes on mount. Those paint only
  after the script runs.
- Navigation in a root layout sits outside the LiveView container, so live
  navigation does not patch it. Pass the request path into the layout for the
  first paint. After live navigation, a small listener may update only the
  state attribute; the static variants restyle it in the same frame. Client
  code keeps the attribute in sync but is never the first to set it.
- Pair color with a second cue, such as weight, an indicator bar, or an icon,
  so the current item never depends on color alone.

## Give each attribute one owner

When the browser legitimately owns a value after mount, such as the category
that a scroll observer marks while the person scrolls:

1. Render a correct server default in the first HTML.
2. Protect the client value from later patches with
   `JS.ignore_attributes/1`, applied from `phx-mounted`, for exactly the
   attributes the client owns. Confirm the function exists in the pinned
   LiveView version.
3. Keep the visual style on static attribute variants so the client changes
   only the attribute.

Do not let a server assign and a hook alternate over one attribute, and do not
reach for `phx-update="ignore"` unless the client owns the complete subtree.

## Make the join a no-op

A cold request renders once over HTTP and again when the socket connects. The
connected render must not change anything the person already sees: the same
selected tab, the same list, the same counts. When the connected mount loads
extra data, render it inside a stable shell with reserved geometry through
`assign_async` or `start_async`, not by swapping content that was already
painted.

Browser-only facts, such as device storage or viewport-dependent choices,
cannot be known on the first render. Render a neutral default that does not
claim a state, reserve its space, and reveal the device-specific value without
an entrance animation.

## Guard it

- Render the component or page in a server test with a representative path and
  assert the state attribute is present on the right item and absent on the
  others. Cover every navigation surface that shares the rule, such as the
  bottom bar, desktop bar, and compact menu.
- Assert that the markup contains no client class binding for that state.
- Add the test red-first against the current markup before changing it.
