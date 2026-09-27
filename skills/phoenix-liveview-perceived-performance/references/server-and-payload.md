# Server and payload cost

## Contents

- [Mount paths](#mount-paths)
- [Queries](#queries)
- [Collections, attrs, and change tracking](#collections-attrs-and-change-tracking)
- [Inspect diffs and timing](#inspect-diffs-and-timing)
- [Dependencies and preloading](#dependencies-and-preloading)

## Mount paths

A person experiences the server as the delay before the first useful paint and
between an action and its settled result.

- A cold request mounts twice: once for the HTTP render and again when the
  socket connects. Both mounts must produce the same first paint.
- Live navigation mounts once over the existing socket, where `connected?/1`
  is already true. Work gated only on `connected?/1` runs synchronously in
  that mount and delays the navigation.
- Put subscriptions and analytics behind `connected?/1`. Put enrichment the
  first paint does not need in `assign_async` or `start_async` inside a stable
  shell, so neither mount path waits for it.
- Keep `handle_params` proportional to what changed. A patch that switches a
  tab should not reload data the other tabs already share.

## Queries

- Load what a template renders in one context call with preloads, and keep
  queries out of function components.
- When a hot path has regressed or its query count is part of the contract,
  pin it with a telemetry-based assertion: attach a handler to the repository's
  query event, count events while the operation runs, and assert the count.
  Such a test fails when someone adds an N+1 query even when timing looks fine.
- Avoid loading a default dataset in mount that `handle_params` immediately
  replaces with a filtered one.

## Collections, attrs, and change tracking

- Render long or growing collections with streams, so inserting, updating, or
  deleting one item sends only that item and the server does not hold the
  whole list.
- Pass explicit attrs to function components. Forwarding the parent's whole
  assigns map disables change tracking for that subtree and resends markup the
  person already has.
- Do not rebuild large derived assigns on unrelated events. A new map or list
  with equal contents still counts as changed.
- Use a LiveComponent only for a real state or event boundary; it does not
  make rendering cheaper by itself.

## Inspect diffs and timing

- Call `liveSocket.enableDebug()` in the browser console, or read the
  WebSocket frames in developer tools, and compare the diff size of a
  suspicious event before and after a change.
- Call `liveSocket.enableLatencySim(ms)` to see which feedback depends on the
  round trip. Disable it afterward; it persists for the session.
- Time mount and events with LiveView telemetry:
  `[:phoenix, :live_view, :mount, :stop]`,
  `[:phoenix, :live_view, :handle_params, :stop]`,
  `[:phoenix, :live_view, :handle_event, :stop]`, and the matching
  `:live_component` events. Time queries with the repository's query
  telemetry.

## Dependencies and preloading

- Weigh a new JavaScript or CSS dependency by its transferred size and its
  first-load parse cost. Every page pays for the shared bundle.
- Speculative preloading, mounting hidden views, or caching rendered content
  adds server memory, transfer, and stale state. Add one only with a
  measurement showing the journey improves.
