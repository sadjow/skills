# Motion and paint cost

## Contents

- [Switch state instantly](#switch-state-instantly)
- [Enforce it with a contract test](#enforce-it-with-a-contract-test)
- [Run entrances once](#run-entrances-once)
- [Fade overlays through one layer](#fade-overlays-through-one-layer)
- [Avoid expensive filters](#avoid-expensive-filters)
- [Treat view transitions as a measured exception](#treat-view-transitions-as-a-measured-exception)

## Switch state instantly

Current, selected, pressed, and checked styles change in one frame. A color,
opacity, or shadow transition on them shows the old and new choice active at
the same time, which reads as the interface catching up late.

- In Tailwind v4, plain `transition` animates colors, opacity, box shadow,
  transforms, the individual `translate`, `scale`, and `rotate` properties,
  and filters. It is not a transform-only shorthand. Check the generated CSS
  for the pinned version before assuming its property list.
- Keep press feedback on transforms: `transition-transform` or
  `transition-[translate,scale]` with `active:scale-*` or `active:translate-*`.
- Hover may keep a color transition only on elements that carry no state
  variant.
- Remove the transition rather than shortening it. A 100 ms fade on a tab still
  shows two active tabs in several frames.

## Enforce it with a contract test

Scan every template for a class string that combines a state variant with a
color, opacity, or shadow transition, and fail with the file and line. The
packaged [state motion contract test](../assets/test/state_indication_motion_contract_test.exs)
is a starting point; adjust the template globs and variant list to the
project. Add it red-first against the offending markup. Fix the class instead
of widening exemptions when it fails.

## Run entrances once

- LiveView executes `phx-mounted` again for every element on the page when a
  view joins or rejoins. A `JS.transition` there replays the entrance on
  content that was already visible after a reconnect, a live navigation back,
  or the initial join. Confirm the behavior in the pinned client.
- Do not give first-paint content an entrance.
- For content that appears because of what the person just did, dispatch a
  custom event from `phx-mounted` and animate in a listener that runs only
  when the view root already has `phx-connected`, when reduced motion is not
  requested, and when no restoration is in progress. The Web Animations API
  leaves no classes behind for a later patch to fight. Adapt the packaged
  [entrance listener](../assets/js/entrance_motion.js) and
  [Elixir helper](../assets/lib/motion.ex).
- Guard it with a render test that the element uses the helper's dispatch and
  no `phx-mounted` transition.

## Fade overlays through one layer

- Fade the scrim container with `JS.show` or `JS.transition`, and have the
  dialog or sheet inside only translate or scale over the same duration.
  Nested opacity composes two translucent layers, so the page shows through
  the sheet mid-animation.
- Render the overlay shell immediately and fill enrichment inside it. Keep one
  backdrop, trap focus, and make the background inert during opening, loading,
  and closing.
- Guard the class strings in a render test: the dialog carries no opacity
  classes and the scrim carries the fade.

## Avoid expensive filters

- `backdrop-filter`, such as Tailwind `backdrop-blur-*`, forces the browser to
  blur everything beneath the element on every scroll and animation frame. Do
  not put it on scrims, sticky headers, or sticky tab bars. Use an opaque
  surface or a plain translucent color.
- Large decorative `blur-*` filters on above-the-fold content raise raster cost
  on every navigation into the page. Prefer a gradient with the same intent.
- Removing a filter is a compositing improvement. Claim a long-frame fix only
  when a real-GPU measurement shows it.

## Treat view transitions as a measured exception

A cross-document `@view-transition` or a same-document
`document.startViewTransition` snapshots the old and new pages and rasters
them. On a phone that can double the first frame of a navigation. Use one only
when it explains a spatial change that stable geometry cannot, and keep it only
after a real-GPU measurement shows an acceptable first frame. Detect whether a
cross-document transition actually ran by reading `event.viewTransition` in a
`pageswap` listener.
