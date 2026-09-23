# Component states and motion

Use this reference to specify expressive components. Timing examples are
starting points for evaluation, not required tokens or accessibility limits.

| State | Visual purpose | Behavior and boundary |
| --- | --- | --- |
| Idle | Establish material and affordance | Stable surface; an optional finite shimmer settles without competing with reading |
| Hover | Show the pointer target | Local edge, surface, or small lift; never reveal the only action on hover |
| Keyboard focus | Preserve orientation | Persistent contrasting outline; a border sweep may supplement it |
| Press | Acknowledge input | Immediate compression or surface change; action never waits for the effect |
| Selected | Show the current view or value | Persistent shape, border, fill, or label plus semantic state; distinct from focus |
| Pending | Explain real work | Stable geometry, meaningful label, truthful progress; prevent duplicates where required |
| Success or error | Explain outcome and next step | Communicate in text; animate only when it improves recognition |
| Disabled | Explain unavailable action | No hover or press affordance; expose a useful reason when needed |
| Reduced motion | Preserve meaning without movement | Immediate state change and persistent focus; lifecycle remains complete |

## Compose a motion vocabulary

Use a short response for small controls, a longer transition for structural
change, and a finite treatment for a featured moment. Evaluate roughly
100–200ms for control feedback and 180–400ms for a small reveal, then adjust
for distance, frequency, and context. These are design starting points. A
decorative perimeter sweep can be slower while the control responds at once.

For idle animation, define an end condition. On reading-heavy pages, prefer a
short entrance or settle effect followed by a quiet state. When automatically
moving content falls under WCAG 2.2.2 and exceeds five seconds, provide a usable
pause, stop, or hide mechanism unless essential. Reduced-motion handling alone
does not automatically satisfy that criterion.

Do not couple navigation or removal to `animationend`: disabling animation,
interruption, or a background tab must not strand the operation. On rapid input,
retarget from the current presentation or complete immediately instead of
queuing every decorative transition. CSS transitions retarget; keyframe
animations restart from their first frame.

Skip movement for actions a person repeats many times a day, such as keyboard
shortcuts and repeated list moves, and change the state at once. Ease out for
elements that enter or leave, ease in and out for elements that move on screen,
and avoid ease-in, which delays the first visible response.

## Border, button, and tab patterns

For an animated border, retain a static border and focus outline. Place
decoration on a pseudo-element with `pointer-events: none`, inherited corners,
and no layout effect. Check masked gradients and transformed highlights in the
actual browser and fallback. Typed custom properties can animate a gradient
angle; that does not guarantee compositor-only work.

Keep button press feedback local. Avoid moving the hit target away from the
pointer or changing its dimensions when its label becomes pending.

For navigation styled as tabs, retain native links and `aria-current`. Use an
ARIA tab widget only when it owns associated panels and implements the widget's
keyboard model. A selection marker follows the real selected state and wraps
correctly; it must not become a second source of truth.

Minimal press pattern to adapt to the product's tokens:

```css
.action {
  position: relative;
  border: 1px solid var(--control-border);
  color: var(--control-text);
  background: var(--control-surface);
}
.action:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 4px;
}
@media (prefers-reduced-motion: no-preference) {
  .action { transition: transform 120ms ease-out; }
  .action:not(:disabled):active { transform: scale(0.985); }
}
@media (forced-colors: active) {
  .action::before { display: none; }
  .action:focus-visible { outline-color: Highlight; }
}
```

This example does not imply loading, require dark mode, or certify contrast
for unknown token values.

## Surfaces, depth, and media

- Build shadows from black in every theme. A dark surface needs a more opaque
  shadow to show depth, and a faint light ring can define the edge where the
  shadow disappears. A shadow mixed from the text color turns light in a dark
  theme and makes the element glow.
- Put a fixed or white backdrop only behind media that needs it, such as a
  logo drawn for light backgrounds. Show an empty media slot on the base
  surface with a dashed border, an icon, and text, so it reads as empty rather
  than as a blank image.
- Outline color swatches and images with a neutral, low-opacity ring, such as
  black at 10% in light themes and white at 10% in dark themes, so pale colors
  and light images keep an edge. Do not tint the ring with the palette. Pair a
  swatch with its name or value in text.
- Review each treatment in every supported theme. A screenshot in one theme
  hides defects in the other.

## Verification traps

For custom form controls, keep the native value and form contract authoritative
when enhancing server-rendered forms. A styled dropdown owns presentation,
keyboard navigation, focus, selection, and dismissal; the original input owns
submission and reset. Hide the fallback only after enhancement succeeds.
Check typeahead, Escape cancellation, Tab selection, outside dismissal,
disabled options, viewport boundaries, touch scrolling, and history restore.
Do not replace native date semantics or text editing merely to unify decoration.
Read the [select-only combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)
when implementing that widget. Its example is informative, and browser tests
do not replace assistive-technology validation.

- Hover lightens a button and reduces text contrast: test hover and idle.
- A failed border mask covers text: inspect the fallback, not only detection.
- A soft glow has a hard ellipse or rectangle edge: inspect the rendered fade at container boundaries. Reach transparency before clipping, and keep the proving pixel region away from text and controls; a palette-specific tolerance is not a universal standard.
- A status pulse implies live data: keep decoration separate from data meaning.
- Repeated row effects create a moving field: reduce area and concurrency.
- No-script or background-tab tests stall: reproduce against the real contract, inspect lifecycle and visibility, and avoid forced clicks that hide the cause.
- A test waits for no animations while real progress is pending: scope it to decorative effects and the expected completed state.
- A popup closes before an option click commits: inspect pointer and focus event order, including focusable ancestors. Preserve the widget focus model without blocking touch scrolling.
