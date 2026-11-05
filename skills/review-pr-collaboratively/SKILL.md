---
name: review-pr-collaboratively
description: Review a GitHub pull request locally with a human, building evidence-backed findings and explaining their impact. Use for PR assessment; post comments only with authorization.
---

# Review PR Collaboratively

Review the change deeply, update conclusions when product context changes, and keep the user in control of every external write.

## Required companion skill

Before taking any review action, load and read `$explain-and-present` completely from the available skills catalog. Announce that both skills are being used. Apply `$explain-and-present` throughout the entire review, not only when presenting the final findings.

Use it to:

- understand the PR from its user-visible purpose before inspecting implementation trivia;
- reconstruct the previous behavior, intended behavior, mechanism, risks, and tests;
- investigate every suspected issue through a concrete request, input, state transition, or interleaving;
- explain findings to the user in small pieces and incorporate their product context;
- write comments that another reviewer can understand without the surrounding chat;
- prepare concise review summaries and team handoffs.

Follow its workflow as appropriate: fix the audience, goal, and message; lead with what matters to the reader; introduce new ideas in small pieces, concrete before general; remove presentation cost; and check understanding. If `$explain-and-present` is unavailable, say so briefly and apply this workflow manually.

## Non-negotiable safeguards

- Treat a review request as read-only except for an explicitly requested local checkout.
- Never infer permission to post from permission to review. Respect requests such as “do not leave comments.”
- Never post an inline comment, review, reaction, approval, or change request without explicit approval for that exact action and wording.
- When the user requests one-at-a-time review, present exactly one draft, wait for `post`, `revise`, or `skip`, then continue.
- Treat any wording revision as invalidating prior approval.
- Clarify ambiguous external-action phrases such as “leave it” when they could mean either post or skip.
- Preserve tracked and untracked local work. Inspect status before checkout and avoid overwriting unrelated changes.
- Do not modify the PR branch while reviewing unless the user separately asks for implementation.

## Track comment state explicitly

Maintain each candidate as one of:

1. `draft` — discussed but not approved
2. `approved` — exact wording approved but not yet confirmed posted
3. `posted` — the GitHub response returned a comment ID or URL
4. `skipped` — user chose not to post it

Never describe an approved comment as posted. If a posting command is interrupted or returns an uncertain result, inspect existing PR comments before retrying so a duplicate is not created.

## Review workflow

### 1. Establish scope and authority

- Capture the requested behavior: local review only, draft comments, one-by-one approval, batch review, or team summary.
- Record explicit prohibitions and later changes to them.
- Default to review-only when posting authority is unclear.
- When the user grants standing authority for a class of comments, such as "post the valid findings on each new PR", treat it as scoped to that session and that class. Validation before posting still applies. Reconfirm it in a new session.
- When the user also grants standing approval authority, such as "approve when every comment is non-blocking", apply the approval envelope in [references/review-lenses.md](references/review-lenses.md): approve routine changes with the brief, brief and hold on behavior changes, and never approve high-risk paths under standing authority. Change requests always need an explicit ask.

### 2. Prepare the local review

- Read repository instructions and applicable language, framework, testing, security, or schema skills.
- Inspect `git status`, current branch, remotes, and PR metadata before checkout.
- Fetch the current base and head. Check out the PR branch only when requested or clearly authorized.
- State the user-visible purpose in one sentence, then build a `Before / After / Mechanism / Risks / Tests` mental model as evidence is gathered.
- Inspect the complete diff plus existing code that the change depends on. For documentation-only or specification PRs, verify claims against runtime code rather than reviewing prose in isolation.
- Run focused validation proportional to risk. Report CI state separately from local checks.

### 3. Build evidence-backed findings

- Reproduce a concrete failure path or inconsistency before labeling it a defect.
- Start each candidate from a realistic example or timeline, then name the general problem.
- Distinguish among:
  - correctness, security, data-loss, or concurrency defects;
  - unresolved product decisions;
  - missing but necessary workflow pieces;
  - optional enhancements or preferences.
- Reassess findings when the user supplies product context. Downgrade, rewrite, or remove a finding that a clear product decision resolves.
- Verify the PR description's claims about previous behavior against the base branch or the live site, not only against the new code. A wrong claim in the description or in a test comment is a finding.
- When the PR replaces a pattern, search the touched area for remaining instances of the old pattern. When it adds a helper, check whether an installed dependency or configuration already owns that behavior.
- Review with the lenses in [references/review-lenses.md](references/review-lenses.md). Read that reference for specification reviews, stateful workflows, authentication, concurrency, scope discussions, design and clean-code lenses, and best-practice sourcing.

When the diff spans more than one specialty, such as a framework, its tests, and a domain concern like SEO or infrastructure, delegate read-only specialist passes chosen from what the diff touches. Require each pass to research current best practices in primary sources for the installed versions, cite one source per claim, and return file, line, severity, evidence, and a draft comment. Validate every returned finding against the code, the installed dependency, or the live artifact before it becomes a candidate; drop what does not reproduce. The lead stays the only writer.

Keep the passes independent: each reports only to the lead and does not message other reviewers or the implementing agents, because one reviewer's early guess can steer the rest, and their agreement then stops being independent evidence. Answer a reviewer's question about a shared contract, such as an exact log line, metric, or interface, from a verified source rather than from another reviewer's view. Require each finding to carry `[independent]`, or `[from peer, verified]` when it started from another reviewer, a prior review note, or an existing comment and the reviewer reproduced it. Count only independent reports as agreement, and settle disagreements against documentation and the repository's established patterns.

### 4. Explain every finding before drafting

Use `$explain-and-present` for every candidate finding in this order:

1. desired outcome;
2. concrete sequence or example;
3. why current behavior can violate it;
4. smallest useful contract or implementation change;
5. test that proves the outcome.

Use a small Mermaid diagram when timing, state transitions, ownership, or multiple actors are materially clearer visually. Keep diagrams compact enough for a PR comment.

### 5. Draft a professional inline comment

Anchor the comment to the narrowest relevant changed line. GitHub only accepts lines inside a diff hunk, so for a concern just outside the diff anchor on the nearest changed line in the same file and say where the code lives; put concerns with no changed file in the review body. Use Conventional Comments labels such as `issue (non-blocking):`, `suggestion:`, `question:`, and `nitpick (non-blocking):` unless the repository uses another convention. Use this shape:

```text
Observation or concrete scenario.
Why it matters to the user or system.
Polite, actionable request.
Optional test or acceptance rule.
```

- Prefer plain, professional language such as “It would be helpful to…” or “Could we make this explicit…”.
- Make the comment self-contained: include enough of the concrete scenario for the author to understand the concern without reading the review conversation.
- Avoid accusation, canned praise, excessive hedging, severity labels in the body, and references to AI unless the user requests them.
- Request observable behavior before prescribing an implementation. Offer locking, atomic consumption, or similar mechanisms as examples when useful.
- Before showing a draft, run the verification list in [references/review-lenses.md](references/review-lenses.md), including executing any code the comment proposes and checking the request against the PR's scope. Present only drafts that pass, and say what was run.
- Show the file and line, the exact proposed text, and `post / revise / skip` choices.
- Do not present the next comment until the current one is posted or skipped when working one at a time.

### 6. Post only the approved draft

- Re-fetch the PR head immediately before posting.
- Confirm the target path and line still belong to the current diff. Re-anchor or ask before posting if the PR changed.
- Use an available GitHub connector or `gh` CLI. Post the exact approved body; do not silently polish it during submission.
- When several comments are approved together, submit them as one review with event `COMMENT`, inline comments on `path`, `line`, and `side`, and a body that lists what was verified and the unanchored items. The author gets one notification and one place to read the context.
- Treat a returned comment ID or URL as confirmation, share the link, then present the next draft.
- Never submit an overall approval or change-request review unless the user explicitly asks for that separate action or has granted standing approval authority inside the envelope above. Pin the approval to the head SHA you reviewed and name it in the body.

### 7. Close the review

Summarize:

- posted comment links;
- skipped or unresolved candidates;
- validation performed and its outcome;
- checked-out branch and working-tree state;
- remaining blockers versus optional follow-ups.

When asked for a Slack or team message, produce a concise paste-ready note that states the review outcome, major themes, and whether AI assisted the review only if the user wants that disclosed.

## AI-assisted delivery principle

Treat AI as reducing implementation cost, not correctness cost. Do not split work merely to minimize typing or estimated coding time. Prefer a complete vertical slice when the concepts belong together and can be accepted independently. Keep genuinely different decisions—such as a future authorization model—decoupled when combining them would increase ambiguity or risk.
