---
name: flutter-text-scaling-accessibility
description: Implement or test Flutter interfaces with large and platform-driven text scaling. Use for TextScaler behavior, clipping, wrapping, and accessible layout under enlarged text.
---

# Flutter Text Scaling Accessibility

Make Flutter interfaces remain understandable and operable under the text-size settings they claim to support. Keep synthetic widget-test coverage distinct from evidence about real platform behavior.

## Keep the scope precise

- Use this skill for Flutter text scaling and the layout behavior it affects.
- Use broader Flutter accessibility guidance for semantics, focus, contrast, screen readers, and target sizes.
- Preserve the project's declared platform and accessibility support. Do not invent a universal numeric scale requirement.

## Model scaling faithfully

- Prefer Flutter's current `TextScaler` and `MediaQuery.textScalerOf(context)` APIs when production behavior depends on the platform scaler.
- Treat a numeric value such as `TextScaler.linear(2)` as a synthetic test input unless the test harness replays the target platform's actual scaler.
- Do not equate an Android or iOS text-size category with a fixed numeric multiplier without verifying the current platform and Flutter mapping from authoritative sources.
- Account for nonlinear scaling and font-dependent metrics. A single multiplier can produce different effective sizes across text styles and platforms.
- Avoid fixed-height text containers, avoid scaling text down merely to prevent overflow, and preserve reflow, reading order, and access to actions.

## Build useful automated coverage

- Exercise representative small, medium, and large text styles through the same layout path used in production.
- Cover wrapping, truncation, scrolling, flexible constraints, translated copy, and actions adjacent to text.
- Prefer behavioral assertions about visibility and operability over screenshot-only evidence.
- When using a synthetic scaler, state what it proves and what platform behavior it does not reproduce.
- Keep automated coverage separate from a claim that an OS accessibility setting or category is supported.

## Preserve design while allowing reflow

- Inspect the relevant design states and actual bundled font files before changing typography. A declared weight does not establish the asset's real weight. Report missing licensed assets; do not claim an exact match from a substitute.
- Preserve the default composition and meaningful visual relationships. When text outgrows a decorative enclosure, first allow the enclosure to grow within available width and let surrounding content scroll. Omit decoration only when it still cannot contain the content or the design explicitly calls for another layout.
- Make the fallback depend on measured content and finite layout constraints, not an arbitrary text-scale threshold. Use the same scaler, font, weight, line height, locale, and wrapping constraints as the rendered text. Do not shrink essential text to preserve a shape.
- Check glyph and line bounds as well as widget boxes. A tighter design line height can cause overlap with a different font even when Flutter reports no overflow. Keep status headings, captions, and timers separate; preserve centered headings when asymmetric content sits beneath them.
- Add a regression for preserving the intended composition where it fits, alongside tests for safe reflow where it does not. A test that only checks absence of overflow can silently permit unnecessary removal of design elements.

## Cover the matrix and describe the evidence

- Read the project's support targets and golden workflow first. When asked to test every font setting, enumerate the platform settings rather than treating three golden checkpoints as exhaustive coverage.
- Cross relevant states, text settings, and viewport constraints: include narrow phones, constrained height or landscape, and wider layouts when supported. Exercise realistic long titles, populated optional sections, multiple items, and translated content where relevant.
- For a reproducible defect, make a focused regression fail for the actual defect before fixing it. Assert complete text bounds, separation, and primary-action operation after scrolling; merely calling `ensureVisible` does not prove navigation works.
- Keep production caps and uncapped diagnostic fixtures separately labeled. A fixture bypassing a cap probes layout resilience; it does not describe current production behavior.
- Generate baselines in the project's reproducible environment, which may differ from the capture host. Review every changed image and avoid accepting unrelated differences. Rerun comparison tests against the committed baselines.
- Report separately what widget tests, goldens, native rendering, native interaction, and assistive-technology checks established. A scrolling simulator recording does not prove physical-device or screen-reader task completion.

## Validate platform behavior

- Verify the maximum text-size setting within the declared support boundary through the operating system settings on a supported device.
- Use an emulator or simulator as platform evidence only when it faithfully reproduces the relevant scaler and font metrics; otherwise verify on real hardware.
- Recheck platform-category mappings against current official documentation when support claims, regression tests, or acceptance criteria depend on them.
- Test the complete task at large text, not only isolated text rendering. Confirm that content remains perceivable and controls remain reachable and operable.

## Authoritative references

- [Flutter accessibility UI design and large-font guidance](https://docs.flutter.dev/ui/accessibility/ui-design-and-styling)
- [Flutter migration guidance for nonlinear Android text scaling](https://docs.flutter.dev/release/breaking-changes/android-14-nonlinear-text-scaling-migration)
- [Flutter migration from `textScaleFactor` to `TextScaler`](https://docs.flutter.dev/release/breaking-changes/deprecate-textscalefactor)
