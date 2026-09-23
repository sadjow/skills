# Review and evidence

## Frame the review

Name the qualities the person wants judged, such as intuitive, easy to use,
visually polished, and accessible, and give each a verdict backed by evidence.
A request for analysis leaves the code unchanged until the person asks for
changes. Scale the depth to the question; a quick check does not need the full
report.

## Review in impact order

1. Can the person find, understand, and complete the primary task?
2. Is system status visible and is failure recovery actionable?
3. Are semantics, keyboard/touch, focus, contrast, reflow, and reduced motion
   correct?
4. Is the information hierarchy clear and free of competing actions?
5. Does the layout use space well across narrow and wide viewports?
6. Are component states and patterns consistent with the existing system?
7. Does motion clarify state without instability or delay?
8. Do decorative choices strengthen the product rather than imitate a trend?

Classify findings as task blocker, accessibility/conformance defect, business
risk, responsive defect, consistency debt, performance concern, or aesthetic
preference. Do not inflate polish into a release blocker.

## Gather evidence

- Inspect the actual rendered surface at 320 CSS pixels, the WCAG reflow
  width, at a common phone width, and at desktop width.
- Capture every supported color scheme. Dark-theme defects, such as shadows
  that glow or bright empty panels, do not appear in light screenshots.
- Exercise the real pointer, touch, and keyboard journey.
- Simulate meaningful latency for network-backed state.
- Check long content, translation, empty/error/loading states, and reduced
  motion.
- Use screenshots for composition and traces/video/frames for temporal bugs.
- Check analytics, support evidence, or observed attempts before redesigning a
  funnel around intuition.
- List the WCAG 2.2 success criteria the pattern touches and mark each as
  passing, failing, or not verified, with its evidence.
- Check best-practice claims against a primary source, such as a standard, a
  design system's guidance or token files, or published research, before
  citing them. Community skills and articles are leads. Record where they
  conflict with the product's accessibility contract.

Automated audits and screenshots support accessibility and UX review but do not
prove task completion, announcement quality, gesture cancellation, or mental
model fit.

## Hand off decisions

Lead with the expected user outcome and highest-impact changes. Distinguish
evidence from inference, record trade-offs and deferred scope, and define a
concrete validation action for remaining assumptions.

For a full review, report in this order:

1. a verdict for each requested quality;
2. strengths to keep, so later fixes do not regress them;
3. recommendations ranked by impact and effort, each with its evidence, source,
   and file and line;
4. changes that are not needed now, with the reason;
5. observations outside the requested scope.
