---
name: ui-comparison-evidence
description: Produce reproducible before-and-after screenshots and scrolling videos for UI changes, then refresh authorized review evidence. Use when reviewers need visual comparisons across content, states, or text sizes.
---

# UI Comparison Evidence

Make visual changes reviewable with comparable inputs and traceable revisions.
This skill owns capture, comparison, and evidence maintenance. It does not
replace framework-specific layout testing or authorize publishing.

## Establish the comparison

Identify the defect baseline and the corrected revision. Distinguish the original
bug from the previous iteration: each answers a different review question.
Record source revisions, fixture identity, device or emulator, OS, viewport,
font setting, locale, and any behavior overridden by the fixture.

Use matching content and settings on both sides. Freeze time and data where
feasible so live, future, and completed states are deterministic. Populate long
titles, descriptions, optional sections, multiple actors or items, and the final
action when they exercise the affected layout. Label synthetic content and
placeholder imagery; do not imply that reconstructed fixtures are live records.

Inspect the actual design state and font assets when judging design fidelity.
Record unavailable assets or intentional deviations rather than presenting an
approximation as an exact match. If the task is review-only, report findings
without changing implementation.

## Capture the whole task

1. Verify that each build contains the intended revision and fixture. Keep
   temporary capture entrypoints and build side effects out of the product diff.
2. Capture a readable initial frame showing the defect or corrected composition.
3. Scroll each relevant state through the populated content to the final action.
   Hold the start and end long enough to inspect them. Test action behavior
   separately when navigation is part of the acceptance criteria.
4. Restore temporary OS font settings, viewport overrides, and fixture changes.
5. Record which behavior was automated and which was manually verified. A video
   of scrolling proves rendering and reachability only to the extent shown.

For Flutter scaling work, use `flutter-text-scaling-accessibility` if available.
Otherwise distinguish synthetic numeric scales from actual OS settings, test
text bounds and action reachability, and label capped versus uncapped captures.
Do not claim all font settings were tested from a few representative images.

## Compose comparisons honestly

Use side-by-side video when simultaneous comparison improves review. Keep both
panels at the same displayed scale, with readable before/after labels. Crop only
irrelevant chrome, never the defect or action being assessed.

Align chapters by state and meaningful scroll milestones rather than assuming
identical elapsed times across builds. Layout changes can change scroll extent.
If holding frames or changing playback speed, preserve the actual sequence and
disclose timing changes when they affect the behavior under review.

Inspect the first, middle, and last frame of every chapter after encoding. Check
that no state transition leaks into the wrong chapter, labels match the content,
text is readable, and the final action remains visible at the end. Extract still
comparisons from verified frames. A successful encoder exit is not visual QA.

A previous before recording can be reused if its revision, fixture, and capture
conditions still match the intended comparison. Identify that reuse. Record a
fresh after capture whenever a visible change invalidates the previous one.

## Publish and keep one current review target

Publish only to destinations covered by the user's authorization. Prepare the
complete text and media first. Describe the change, revisions, tested matrix,
chapter timestamps, known limitations, and scope of evidence in the user's voice.
Use inline media when requested and supported; a link alone is not an attachment.

For GitHub uploads, use `github-media-attachments` if available. Otherwise inspect
the installed CLI's attachment support or use an authorized browser upload flow.
For issue trackers, use their supported uploader and verify the saved comment.
Do not assume a remote embed loaded because its URL was accepted.

When an iteration supersedes earlier evidence:

- Prefer editing the existing current evidence comment so review links remain
  stable. Refresh the PR description and issue comment to the same revision.
- Mark older evidence as superseded and link to the current comment. Collapse it
  where supported. Resolve only obsolete evidence threads, not open substantive
  reviewer feedback. Do not delete other people's comments.
- Preserve review requests and real mentions unless instructed otherwise. Avoid
  duplicate notifications merely to replace attachments.
- Verify the published body contains no local paths and that every image and
  video loads. Check video duration and a representative frame. Successful upload
  submission alone does not establish that the media is playable.

Report completed checks separately from pending CI or design dependencies.
Updating goldens establishes a visual baseline, not accessibility conformance.
Keep project identifiers, recordings, private content, and local paths out of
the reusable skill package.
