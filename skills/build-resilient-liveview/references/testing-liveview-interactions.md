# Testing LiveView interactions

## Server tests

Use context and LiveView tests to prove:

- authorization and validation;
- visible actionable errors;
- duplicate and stale-attempt guards;
- recovery field whitelisting and step prerequisites;
- outer transaction rollback without PubSub;
- one durable result for one submission identity.

Reference stable DOM IDs in LiveView tests and assert outcomes rather than raw
HTML strings.

## Playwright latency

Wait for `window.liveSocket`, then enable application-level latency:

```ts
await page.evaluate(() => window.liveSocket.enableLatencySim(750));
```

Disable it in cleanup:

```ts
await page.evaluate(() => window.liveSocket.disableLatencySim());
```

Use a `try`/`finally` helper so an ad hoc test cannot leak latency into later
steps.

While the response is delayed, assert:

- immediate local pressed, opening, selected, or pending state;
- one `aria-busy` or documented pending owner;
- related controls are single-flight;
- stable geometry and preserved draft;
- no duplicate event or durable mutation.

## Real reconnect

Copy or adapt
[`../assets/e2e/support/liveview.ts`](../assets/e2e/support/liveview.ts). Reach a
noninitial state, enter representative data, call `reconnectLiveView(page)`,
then assert:

- the LiveView disconnects and rejoins;
- one truthful connection status appears and clears;
- the same step and authored fields remain;
- derived selections are rebuilt;
- durable work resumes or shows its terminal outcome;
- no mutation or side effect is duplicated.

Do not substitute reload, latency simulation, or a final screenshot for this
probe.

## Required browser dimensions

At minimum test:

- 320 px touch;
- 390 px touch;
- 390 px mouse and keyboard when width-sensitive behavior exists;
- 1280 × 720 desktop.

Repeat the critical path with reduced motion. Check target size, focus return,
horizontal overflow, persistent-chrome overlap, and rapid input. Use
`$test-responsive-ui` for the full matrix and frame-review workflow.
