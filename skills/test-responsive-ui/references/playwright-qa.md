# Playwright responsive QA

## Contents

- [Minimum project matrix](#minimum-project-matrix)
- [Journey structure](#journey-structure)
- [Immediate feedback under latency](#immediate-feedback-under-latency)
- [Rapid input and duplicate protection](#rapid-input-and-duplicate-protection)
- [Geometry and actionability](#geometry-and-actionability)
- [Reduced motion and focus](#reduced-motion-and-focus)
- [Failure and reconnect](#failure-and-reconnect)
- [Selectors and assertions](#selectors-and-assertions)
- [CI and real-device limits](#ci-and-real-device-limits)

## Minimum project matrix

| Project | Viewport | Input | Purpose |
| --- | --- | --- | --- |
| Small mobile touch | 320 × 568 | Touch | Tight wrapping, overflow, obscured controls |
| Mobile touch | 390 × 844 | Touch | Representative phone journey |
| Narrow desktop | 390 × 844 | Mouse and keyboard | Width/input assumptions |
| Tablet touch | 768 × 1024 | Touch | Intermediate layout and optional keyboard |
| Desktop | 1280 × 720 | Mouse and keyboard | Desktop layout, hover, keyboard |

Add WebKit, Chromium, or Firefox coverage according to the host product's
support policy. A device descriptor emulates browser context properties; it is
not a native-app test or a real-device performance result. See
<https://playwright.dev/docs/emulation>.

## Journey structure

Keep tests outcome-oriented:

1. create isolated preconditions;
2. navigate directly to the focused journey;
3. wait for the application's explicit ready boundary;
4. enable the relevant latency or connection condition;
5. perform one user intent;
6. assert the local state before the authoritative response;
7. assert the terminal state and durable outcome;
8. clean up or rely on isolated fixture teardown.

Do not traverse unrelated setup screens to create data. A scenario endpoint or
fixture should be restricted to test and development environments.

## Immediate feedback under latency

Delay the response long enough to inspect the state between input and
acknowledgement. Then assert synchronously or within that bounded window:

- the initiating control is pressed, busy, or unavailable;
- the correct control group is single-flight;
- a stable loading shell is visible;
- the old and new actions are not both active;
- the user's draft or local selection remains visible.

Playwright request routing can delay HTTP requests; see
<https://playwright.dev/docs/network>. It does not delay WebSocket frames.
Socket-driven frameworks require an application-specific latency adapter.

Use timeouts to bound a real state transition, not to stand in for an
assertion. Avoid `waitForTimeout` except when intentionally holding a simulated
condition or sampling time-based evidence.

## Rapid input and duplicate protection

Exercise the mechanism that could duplicate work:

- dispatch or tap twice before the first response;
- activate two controls that replace the same result;
- retry with the same operation identity;
- run concurrent workers when the defect depends on shared backend state.

Assert both:

- the UI exposes one pending owner;
- the authoritative store contains the intended number of results.

A disabled-looking button is not proof of idempotency.

## Geometry and actionability

At each critical state:

- compare `scrollWidth` with `clientWidth`;
- check important custom control dimensions;
- verify overlays fit the visual viewport;
- verify the final actionable control can scroll above fixed chrome;
- use trial actions or hit testing to prove the control is not covered;
- sample stable shell rectangles before and during loading;
- reserve room for translated controls and focus rings inside rails.

Allow only a deliberate small rounding tolerance. A selector being present or
intersecting the viewport does not prove that a person can activate it.

## Reduced motion and focus

Use:

```ts
await page.emulateMedia({ reducedMotion: "reduce" });
```

Repeat the actual interaction. Assert the same states and outcomes, not a CSS
implementation detail.

Verify:

- initial focus for dialogs or task surfaces;
- visible keyboard focus;
- Escape behavior;
- focus return to the trigger;
- focus after validation or terminal success;
- no focused target hidden by sticky content.

## Failure and reconnect

Test an actionable rejection and preserve unrelated authored input. For
stateful forms and durable work, a page reload is not equivalent to connection
loss. Use the framework's actual disconnect and reconnect mechanism or
temporarily take the browser context offline.

After reconnect, assert:

- one connection-status owner;
- the same draft or valid recovered step;
- the same operation identity;
- current progress or terminal outcome;
- no duplicate mutation or side effect.

## Selectors and assertions

Prefer:

1. `getByRole`;
2. `getByLabel`;
3. `getByPlaceholder`, `getByAltText`, or other user-facing contracts;
4. a stable application-owned test ID for persistent shells and state
   boundaries.

Use Playwright's web-first assertions. Keep raw HTML and CSS snapshots out of
behavior tests. For temporal state, explicit attributes such as `aria-busy`,
`aria-expanded`, `inert`, and a documented `data-state` are useful contracts.

The official best-practices guide is
<https://playwright.dev/docs/best-practices>.

## CI and real-device limits

Keep a focused deterministic path in pull-request CI and retain traces for
failed or retried tests. Run broader browser/device matrices according to
project risk and CI capacity.

Viewport emulation does not reproduce:

- physical reach and grip;
- OS browser chrome;
- thermal and memory pressure;
- real radio latency, packet loss, or bandwidth variability;
- native application UI;
- assistive technology on physical hardware.

Use representative real devices and networks for high-risk production
performance and accessibility claims.
