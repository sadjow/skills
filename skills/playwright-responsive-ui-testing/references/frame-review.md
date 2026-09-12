# Capture and frame review

Use frame review when the quality question happens between normal assertion
points: local acknowledgement, animation continuity, loader geometry, media
arrival, progress truthfulness, or a transient duplicate control.

## Capture

Configure Playwright Test to record video and traces when `E2E_CAPTURE=1`.
Run one focused journey at one representative project:

```sh
E2E_CAPTURE=1 npx playwright test e2e/path/to/journey.spec.ts \
  --project="mobile-touch"
```

Use slow motion only for human inspection. Never use it to make assertions
pass.

Playwright recommends configuring traces through Playwright Test so assertions
are included. See <https://playwright.dev/docs/trace-viewer>.

## Extract

From the host repository, call the installed skill script with the Playwright
results directory and desired artifact root:

```sh
path/to/playwright-responsive-ui-testing/scripts/extract-playwright-frames \
  test-results artifacts/motion-review
```

The script requires `ffmpeg` and `ffprobe`. It:

- copies each source video;
- derives a safe duration from container metadata or packet timestamps;
- creates a 20-frame contact sheet;
- creates a bounded detailed frame sequence;
- uses collision-resistant destinations;
- marks sources invalid when duration cannot be determined;
- replaces a destination only after the new extraction completes.

Keep the generated artifacts outside Git.

## Review adjacent frames

Ask:

- Does the first frame after input acknowledge it?
- Are old and new controls active together?
- Does a label, icon, quantity, or draft disappear during a patch?
- Does loading content change the shell geometry?
- Does an image move a control the user was about to activate?
- Does visible progress correspond to actual transfer or processing?
- Does cancellation remain cancelled after a late response?
- Does completion restore a usable control and logical focus?
- Does reduced motion preserve the same causal ordering?

Do not approve temporal behavior from the final screenshot alone.

## Evidence note

Record:

```text
Journey:
Project / viewport:
Input mode:
Latency or network condition:
Rapid-input result:
Reconnect result:
Reduced-motion result:
Overflow / target / focus result:
Observed temporal defect or confirmed behavior:
Trace, video, contact sheet, and frame paths:
Real-device follow-up:
```
