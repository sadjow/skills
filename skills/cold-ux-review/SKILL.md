---
name: cold-ux-review
description: Plan, run, or consolidate context-free ("cold") usability reviews by agents or people who have not seen the implementation. Use to test whether screens explain themselves, to run parallel persona, screen-economy, or accessibility reviewers, or to turn their findings into verified, prioritized changes.
---

# Cold UX Review

A cold review asks whether someone who arrives with only a goal understands a
screen. Reviewers use the running product. They do not read source code,
design documents, tests, commit history, or the conversation that produced the
screen. Their verdicts are heuristic evidence that finds likely problems
quickly; they do not replace observing real people.

Delegating to reviewer agents requires explicit authorization from the person
who owns the work. Keep each reviewer bounded and independent.

## Plan

1. Choose the surfaces and the ways people arrive at them: a shared link, a
   search result, a returning visit, a notification, or an operational check.
2. Give each persona reviewer one to three goals phrased the way that person
   would say them, such as "find somewhere nearby to order lunch", never as
   interface steps such as "open the filter menu".
3. Choose lanes that do not overlap. A useful set combines persona lanes for
   the main audiences (a first-time visitor, a buyer or task performer, a
   returning member, an operator or merchant) with two specialist lanes: a
   screen-economy lane that measures chrome versus content across viewports,
   and an accessibility guard that checks that reducing text does not remove
   names, labels, instructions, or state.
4. Choose an environment for every state, following the rules below.
5. Fill a [reviewer packet](references/reviewer-packet.md) for each lane and
   launch independent reviewers in parallel. Relayed final messages can arrive
   truncated, so when a messaging channel exists, ask for long reports in
   numbered parts that end with an explicit closing marker, and confirm the
   marker arrived before consolidating.

## Environment rules

- **Production** is for read-only guest observation: open pages, scroll, and
  open disclosures, menus, and sheets that submit nothing. Do not submit forms
  or searches, share location, sign up, sign in, react, follow, post, order, or
  send messages. Agents never create production accounts, authenticate to
  production, or read verification codes from any production system, even
  when asked. When an authenticated production view is necessary, a person
  creates and signs in to the test account.
- **A local or disposable environment** covers authenticated and mutating
  journeys. Seed realistic data, create personas through the project's test
  fixtures, and sign them in through its test-only login path. Stop any shared
  review server before running a test suite that resets its database.
- Each reviewer drives its own headless browser from its own script, never a
  shared interactive browser. Screenshots and traces are private diagnostics
  kept outside the repository. Findings quote visible interface text, never
  session tokens, contact data, or exact coordinates.
- Redact before any output or saved evidence; redacting afterward has already
  exposed the value. Give every reviewer the same tested helper,
  [`scripts/safe-url.mjs`](scripts/safe-url.mjs), never a hand-written rule
  per agent: redirects nest secrets inside parameters such as `return_to`, and
  the helper recurses into them. Name the project's short route-specific
  secrets through its options, and keep bearer values out of URLs entirely
  when signing personas in, because tools print request URLs in error logs.

## Review method

Persona lanes record first impressions before applying any checklist, so the
checklist does not shape what they notice.

1. **Five-second test** on a common phone viewport: look at the first
   viewport, then answer what this is, who it is for, what can be done here,
   and what to tap first.
2. **First click** for each goal: predict the target before interacting, then
   try it and record success, hesitation, or a wrong path.
3. **Walkthrough** of each step with four questions: will the person try to
   achieve the right effect, notice that the correct action is available,
   associate it with that effect, and see progress after acting?
4. **Heuristic pass** against the product's principles: removable words,
   chrome versus content, the position of the first content item, ambiguity,
   consistency, dead ends, and use of wide screens.
5. **Measurements** at the narrowest supported width, a common phone, a
   tablet, and a desktop width: the first content top, the share of the first
   viewport taken by chrome, the words above the first content, horizontal
   overflow, and targets smaller than 24×24 CSS pixels.

Rate findings on Nielsen's severity scale: 0 not a problem, 1 cosmetic,
2 minor, 3 major, 4 blocks the task. Keep preferences separate from defects.

When `web-ui-design` is installed, use its information hierarchy and review
references for the heuristic pass. Otherwise judge each visible text by
whether it prevents a likely error or explains a non-obvious consequence,
format, scope, recovery path, or safety, legal, or trust context; treat other
explanation, intro cards, and repeated identity as candidates for removal.

## Consolidate

1. Merge duplicates and count how many independent reviewers reported each
   issue. Agreement raises confidence, not severity.
2. Reproduce every finding in the running interface before acting. Drop stale,
   invented, or environment-caused claims. Before recording a regression of an
   earlier fix, read that fix's regression test or acceptance record:
   reviewers can read a designed state, such as a deliberate partial glimpse,
   as breakage.
3. Reject recommendations that break accessibility, privacy, security, or
   domain rules, and keep what reviewers said works. Before adding a label,
   tooltip, or explanation a reviewer asks for, check whether the element is
   already a recognized convention: model reviewers over-apply labelling
   advice.
4. Prioritize by severity, how many arriving people meet the issue, and cost.
5. When verified findings outlast one change, record them in a durable backlog
   that collaborators can see, such as a dated project document or the issue
   tracker, with a stable ID, surface, severity, agreement, and status. Update
   each status in the change that resolves it. Session scratch files and
   private agent memory are not a backlog.
6. Implement through the owning design and domain capabilities. Update the
   canonical documentation, behavioral tests, and measurements, then run a
   cold review of the changed surface.
7. Report agent reviews as heuristic evidence, not user research. Record
   observations of real people wherever the project keeps field learning.

## Sources

- [Five-second and first-click tests](https://www.nngroup.com/articles/testing-visual-design/)
  and [cognitive walkthroughs](https://www.nngroup.com/articles/cognitive-walkthroughs/).
- [Heuristic evaluation](https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/)
  with independent evaluators, and
  [severity ratings](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/).
- Limits of model reviewers:
  [AI-simulated studies](https://www.nngroup.com/articles/ai-simulations-studies/),
  [GPT-4 heuristic evaluation](https://arxiv.org/abs/2403.13139), and the
  simulated first-click preprint [2605.18302](https://arxiv.org/abs/2605.18302).
