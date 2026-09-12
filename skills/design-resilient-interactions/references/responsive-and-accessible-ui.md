# Responsive and accessible UI

## Contents

- [Test dimensions, not device labels](#test-dimensions-not-device-labels)
- [Baseline matrix](#baseline-matrix)
- [Touch and pointer behavior](#touch-and-pointer-behavior)
- [Layout and persistent chrome](#layout-and-persistent-chrome)
- [Overlays](#overlays)
- [Focus and status](#focus-and-status)
- [Motion](#motion)
- [Responsive media](#responsive-media)
- [Browser evidence](#browser-evidence)

## Test dimensions, not device labels

A device preset combines a browser engine, user agent, viewport, screen,
device scale, and input capabilities. Test the dimensions that matter to the
interaction:

- viewport width and height;
- touch versus precise pointer;
- keyboard availability;
- browser engine;
- motion preference;
- connection and server latency;
- safe-area and persistent-chrome geometry.

A narrow desktop browser is not a touch phone. A tablet may have touch and a
keyboard. Never infer input mode solely from width.

Playwright documents the properties covered by its browser emulation at
<https://playwright.dev/docs/emulation>. Emulation is not a real-device
performance measurement.

## Baseline matrix

Use the host product's supported devices when they are known. Otherwise start
with:

| Mode | Viewport | Input |
| --- | --- | --- |
| Small mobile | 320 CSS px wide | Touch emulation |
| Mobile | 390 CSS px wide | Touch emulation |
| Narrow desktop | 390 CSS px wide | Mouse and keyboard |
| Tablet | 768 CSS px wide | Touch, then optional keyboard |
| Desktop | 1280 × 720 CSS px | Mouse and keyboard |

Test progressively from the smallest viewport. Add larger desktop widths only
when the layout materially changes.

## Touch and pointer behavior

- Never make hover the only path to an action or explanation.
- Use semantic buttons and links before adding pointer handlers to generic
  elements.
- Keep important custom targets at least 44 by 44 CSS pixels by default.
  WCAG 2.2 AA defines a 24-by-24 minimum with exceptions, while 44 by 44 is the
  enhanced target. See
  <https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum> and
  <https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced>.
- Preserve visible focus; do not let transformed focus rings or selected
  shadows clip inside horizontal rails.
- Test rapid taps and the same action with keyboard activation.

## Layout and persistent chrome

- Prefer flexible layout, intrinsic sizing, `minmax`, wrapping, and bounded
  maximum widths over fixed page widths.
- Reserve space for fixed or sticky navigation, action bars, safe areas, and
  virtual keyboards.
- Do not stack unrelated global and journey-specific action bars on constrained
  screens.
- Ensure the final field, error, review control, and primary action can scroll
  fully above persistent chrome.
- Treat presence in the DOM or partial viewport intersection as insufficient.
  Use geometry and actionability checks.
- Inspect `document.documentElement.scrollWidth` against `clientWidth` after
  each critical state, not only initial load.

## Overlays

- Use a full-screen or bottom-sheet treatment when the narrow viewport needs
  it; use a bounded dialog where space allows.
- Keep the title, close action, and primary action stable.
- Make only the intended body region scroll.
- Set background content inert while the modal surface is active.
- Support Escape and return focus to the trigger.
- Keep the surface inside the visual viewport and account for safe-area insets.
- Open locally before network enrichment.

## Focus and status

- Keep one main landmark and a logical heading order.
- Give every input an accessible label and associate errors programmatically.
- Move focus only when the journey requires it; do not steal focus after an
  unrelated patch.
- Restore focus after closing an overlay or completing a temporary action.
- Use a polite live region for pending and nonurgent results; reserve alerting
  behavior for urgent failures.
- Keep connection feedback and mutation feedback distinct but avoid duplicate
  announcements for the same event.
- Check that persistent content does not obscure focused elements. WCAG 2.2
  includes Focus Not Obscured at
  <https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum>.

## Motion

Motion should explain causality:

- short fade or slight translation for entry;
- a slightly faster exit;
- no simultaneous clickable outgoing and incoming control;
- no repeated pulse without a nonmotion status;
- no animation required to understand or complete the action.

Under reduced motion, remove translations, scale, smooth scrolling, and
repeated effects while preserving visibility, ordering, and focus behavior.

## Responsive media

- Include intrinsic width and height or an explicit aspect ratio.
- Provide truthful `srcset` and `sizes` when variants exist.
- Use `object-cover` only for intentional crops and `object-contain` when the
  whole image carries meaning.
- Lazy-load and asynchronously decode below-fold media.
- Give eager loading and high fetch priority only to a measured above-fold
  candidate.
- Verify the browser-selected asset in network evidence; CSS resizing does not
  reduce transfer cost.
- Keep meaningful alternative text, using an empty value only for decoration.

## Browser evidence

For each critical state, check:

- no horizontal overflow;
- target dimensions and spacing;
- focused element visibility;
- persistent-chrome overlap;
- one active control per action slot;
- stable overlay and loader geometry;
- reduced-motion equivalence;
- keyboard and touch paths;
- responsive image selection and layout stability.

Use `$test-responsive-ui` for the Playwright workflow when it is installed.
