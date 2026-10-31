---
name: address-pr-review-comments
description: Address review comments on a pull request you are responsible for. Verify each human or bot comment against the code, fix the valid ones, and reply to and resolve threads as authorized. For reviewing someone else's pull request, use review-pr-collaboratively.
---

# Address PR Review Comments

Turn review feedback into verified changes and clear replies. Human and bot
reviewers are both sometimes wrong, so check every comment against the code
before changing anything.

## Set the scope

Find the furthest step the request covers:

1. **Analyze**: collect and triage the feedback, then stop with a plan. This is
   the default when the request only asks to check or look at the comments.
2. **Fix**: change the code for valid items and verify it locally.
3. **Publish**: commit and push the fixes, with `$commit-push-and-open-pr`
   when it is available.
4. **Respond**: reply in each handled thread and resolve the settled ones.
5. **Follow up**: re-request review, tell the team with
   `$draft-and-post-team-updates` when it is available, and keep watching for
   new feedback.

Replies, resolutions, review requests, notifications, and merges are external
actions. Take each only when the request or a standing project instruction
covers it. A "go ahead" after a triage covers the actions in the plan you
showed, nothing more. Merge only on an explicit request, and only when the
required checks pass, the required approvals are present, and no blocking
thread is open.

## Collect the feedback

Identify the pull request from the argument or the current branch, then collect
it with the commands in
[references/github-review-threads.md](references/github-review-threads.md):

- unresolved review threads, including outdated ones, because a comment on
  lines that moved can still apply;
- reviews that request changes, and their summary text;
- top-level comments that ask for something, including bot summaries;
- failing checks, because a red CI run is feedback too.

The REST review-comments endpoint does not say whether a thread is resolved.
Use the GraphQL `reviewThreads` query so that settled threads are not reworked.
Skip a thread whose latest comment is your own reply when no reviewer has
answered since.

## Verify every comment

Check each claim against the current head before deciding:

- Read the code at the comment's location and the code it calls. When the claim
  is about behavior, reproduce it with a test, a command, or a concrete input.
- When the claim is about a library, framework, or API, check the documentation
  or source for the installed version.
- Check whether a later commit already handled it.

Give each item one verdict:

| Verdict | Meaning | Action |
| --- | --- | --- |
| Valid | The problem reproduces, or the request clearly improves the change | Fix it |
| Partly valid | The concern is real but the suggested fix is wrong or too broad | Fix the real concern and explain the difference |
| Already handled | The current head no longer has the problem | Point to the commit that handled it |
| Not valid | The evidence contradicts the claim | Reply with the evidence |
| Needs a decision | A product, scope, or design choice that the user or team owns | Ask the user instead of deciding |
| Out of scope | Real, but unrelated to this pull request | Propose a follow-up issue |

Hold bots and humans to the same standard. Automated reviewers often produce
plausible findings that do not reproduce, so agreeing without evidence is a
mistake. A reviewer's request that matches the project's conventions is valid
even when it is a preference.

Show the triage before changing code when the scope is analyze, or when any
item needs a decision. Use one table row per thread with a link to it, the
reviewer, the verdict, one line of evidence, and the planned action.

## Fix the valid items

- Make the smallest change that resolves the verified concern. For a
  reproducible bug, add a focused regression test and confirm it fails before
  the fix.
- Group fixes by root cause, with one commit per root cause, so each reply can
  point at its own commit. Follow the project's commit conventions.
- Run the checks that cover the changed code, and the CI job that failed.
- Keep cleanups that no reviewer asked for out of this pull request.

## Respond in the threads

Push before replying, so every commit a reply mentions exists on the remote.

Reply once in each handled thread, in the pull-request author's voice:

- Lead with the outcome, such as "Fixed in abc1234: …", "Kept as is because …",
  or "Moved to #456".
- Add one or two sentences of evidence: the test that covers it, the reproduced
  case, or a documentation link.
- Leave out stock praise and apologies, and mention AI assistance only when the
  user wants it disclosed.

Re-read the thread right before replying, and skip it when an equivalent reply
already exists. Resolve a thread only when it is settled: fixed, already
handled, or declined with the user's agreement. Leave it open when the reviewer
needs to confirm or a decision is pending, and follow the project's convention
when reviewers resolve their own threads.

## Follow up

- Re-request review from the reviewers whose feedback you addressed when asked.
  Bots often need a project-specific trigger, such as a comment or a label; take
  it from the project instructions.
- To keep watching, use the client's scheduler, such as a recurring loop or a
  scheduled task, to repeat collect, verify, fix, and respond for new feedback
  within the same authorized scope. Stop when the pull request merges or
  closes, or when an item needs the user.

## Report

Lead with the state: how many threads were fixed, declined, waiting on a
decision, and still open, each with a link. Then list the commits pushed, the
checks run and their results, the CI state, and the decisions the user needs to
make.
