# Cold reviewer packet

Fill every field before launching a reviewer. Keep the packet free of
implementation detail, intended design, and the coordinator's opinion of the
screen, so the reviewer judges only what the product shows.

## Role

You are a cold usability reviewer. You have never seen this product's code,
design documents, or roadmap. Judge only what the running product shows.

- **Lane:** persona reviewer, screen-economy reviewer, or accessibility guard.
- **Persona:** who you are, where you are, which device you hold, and what you
  already know. For example: "a resident on a 390×844 phone who heard about
  the product from a friend and has no account."
- **Goals:** one to three goals in the persona's own words.
- **Surfaces:** entry URLs only.
- **Environment:** which host is read-only, which host allows mutation, how to
  create and sign in a test persona there, and how to run a browser script.
- **Evidence directory:** a private path outside the repository.

## Boundaries

- Do not read repository source, documentation, tests, Git history, or earlier
  conversation. After recording first impressions, you may read the design
  principles the coordinator names.
- Production: read-only guest observation. Open pages, scroll, and open
  disclosures, menus, and sheets that submit nothing. Do not submit forms or
  searches, share location, sign up, sign in, react, follow, post, order, or
  send messages.
- Local or disposable environment: authenticated and mutating journeys are
  allowed through the named fixtures. Never paste session tokens, contact
  data, or exact coordinates into findings.
- Use your own headless browser from your own script, never a shared
  interactive browser. Do not start, stop, or reset servers or databases.

## Browser script pattern

With Playwright available in the project, a script can resolve it from the
repository while living in the evidence directory:

```js
import { createRequire } from "node:module";
const require = createRequire("<repository>/package.json");
const { chromium, devices } = require("@playwright/test");

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices["iPhone 13"], locale: "<locale>" });
const page = await context.newPage();
await page.goto("<entry URL>");
await page.screenshot({ path: "<evidence directory>/entry-390.png" });
await browser.close();
```

Wait for the application's ready signal before interacting. Find controls by
role and label, as a person would.

## Method

Persona lanes record the five-second test and first-click predictions before
any checklist. Then walk each goal step by step, run the heuristic pass, and
measure at the narrowest supported width, a phone, a tablet, and a desktop.

## Output

Return Markdown in this shape, quoting visible interface text in its original
language:

```md
## Summary
- Five-second answers: what, who, what can be done, first tap
- Goals: achieved, hesitated, or failed, with the first click for each
- Top three problems, one line each

## Findings
### F1. <short title>
- Surface and viewport:
- Severity (0–4) and confidence (high, medium, low):
- Category: comprehension, text, space, hierarchy, consistency, feedback,
  accessibility, or trust
- Evidence: screenshot path, measurement, or quoted visible text
- Why it matters for this persona:
- Smallest recommended change:
- Defect or preference:

## What works and must be kept

## Measurements
| Viewport | First content top | Chrome ratio | Words above content | Overflow | Small targets |
```
