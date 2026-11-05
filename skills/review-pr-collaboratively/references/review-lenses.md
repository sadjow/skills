# Review Lenses

Use only the lenses relevant to the PR. Convert them into concrete evidence, not slogans.

## Pragmatic Programmer lenses

- **Easy to Change:** Prefer contracts and boundaries that can evolve without rewriting unrelated areas.
- **DRY:** Keep each business rule in one authoritative place. Watch for status or permission checks duplicated inconsistently across UI, domain, and authentication paths.
- **Orthogonality:** Separate concerns that change for different reasons, while avoiding artificial splits that make one user workflow incomplete.
- **Reversibility:** Preserve extension points around uncertain future choices. Do not hardcode a future role model before it is designed.
- **Tracer Bullets:** Favor a thin, working end-to-end slice that proves the architecture and user workflow.
- **Design by Contract:** State preconditions, transitions, outcomes, and failure behavior explicitly.
- **Shared state requires coordination:** A transaction makes one operation atomic; it does not automatically serialize competing operations. Identify the row, token, or resource on which contenders coordinate.
- **Avoid programming by coincidence:** Challenge assumptions such as “this existing login path will probably respect the new status” or “validation inside a transaction prevents the race.”
- **Test to the contract:** Ask for tests that prove observable guarantees, especially negative paths and meaningful interleavings.
- **Delight users:** Ensure the feature has an entry point and a usable management path, not only correct backend functions.

## Design and clean-code lenses

Report each as evidence: the two places a rule lives, the name that misleads, the test that passes for the wrong reason.

- **Single responsibility:** A helper that formats a URL should not also decide which page is canonical. When a policy and its formatting live in one function, callers cannot reuse one without the other.
- **One home per rule:** When two call sites restate the same business rule, such as "a detail page canonicalizes to its parent", ask for one exported definition next to the code it depends on. Treat a helper that hardcodes a value the project already declares in configuration as a second source of truth.
- **Minimal surface:** Check where a new export is visible. A build-time helper placed in an auto-imported directory becomes runtime API for every consumer. Put it where only its callers see it.
- **Names reveal intent:** Parameter names should match what callers pass, and test names should state the behavior under test, not the implementation the test used to describe.
- **Tests fail for the stated reason:** Confirm a new test fails on the old code because of the behavior it names. A mock missing a field the old code read makes the test pass for an unrelated reason.
- **Typed files stay typed:** Untyped helper parameters in a TypeScript file are implicit `any` under strict checking even when no typecheck step runs today.
- **Comments explain why:** A comment that restates history must be true. An invisible character placed to keep a pattern from closing a comment block is a smell worth naming.
- **Adjacent pre-existing defects:** When a file the PR opens already drops data it is given, tell the user the observable consequence and offer a follow-up card. Post it on the PR only when the user chooses to, marked non-blocking, and never block the PR on it.

## Best-practice sourcing

- Prefer primary sources: the official documentation for the installed major version, the installed package's own source and tests, and standards or platform guidance such as search-engine documentation.
- Confirm the installed version before citing a document. Read `node_modules`, lock files, or release manifests instead of assuming the latest release.
- Replay the documented behavior locally when the claim is cheap to test, for example by calling the installed helper with the PR's inputs. A hand-built subset proves only the cases it includes.
- Cite one URL per claim inside the comment. Distinguish a documented recommendation from a requirement, and say which one the comment relies on.
- Do not cite a source to dress up a preference. A naming or formatting taste stays a nitpick without a citation.

## Verification before posting

Run this list for every candidate, including findings returned by a delegated specialist, before showing it to the user as a draft and again before posting:

1. The PR head is unchanged since the finding was anchored.
2. The anchor line sits inside a diff hunk: the right side for an added or context line, the left side for a removed line.
3. Any claim about previous behavior was checked against the base branch or the live deployment.
4. Any claim about a dependency was checked against the installed version.
5. Any claim about rendered output was checked against the preview or a local run.
6. Remaining uses of a pattern the PR removes were searched for in the touched area.
7. The requested change is stated as observable behavior, with the mechanism offered as an example.
8. Code the comment proposes, such as a suggested test or snippet, was run against the PR head. A suggested test passes on the head and fails on a mutation that removes the behavior it claims to protect; reading the code is not enough, because test-local mocks and helpers change what an assertion sees.
9. The request stays within the PR's stated purpose and its linked work item. Work the item does not ask for, and pre-existing issues the PR did not introduce, go to the user as possible follow-ups rather than into PR comments. Correctness, tests, and safety of the behavior the PR changes are in scope, not scope creep.

## Human awareness brief and approval envelope

Automated and delegated passes own line-level findings. The human who grants approval authority still owns intent, user-visible behavior, risk, and accountability, so every review that may end in an approval produces a brief for them before or with the approval:

- the PR link and a one-sentence statement of what the change is for;
- Before / After behavior as a visitor, admin user, search engine, or operator would notice it;
- the risk tier and why, reversibility, and any product decision the PR makes or leaves open;
- what was verified, how, and on which commit SHA;
- a link to every posted comment.

Tier the approval decision from the diff and the live artifact, not from the title or labels:

1. **Routine:** refactors, tests, docs, chores, and internal code shape with no behavior change and no high-risk path. Standing authority may approve in the same pass as the brief.
2. **Behavior change:** anything a user or operator will see differently, including URLs, defaults, output, messages, jobs, and configuration. Send the brief and hold approval until the human says go.
3. **High-risk path:** authentication, authorization, billing, secrets, schema or data migrations, infrastructure, CI configuration, shared or public contracts, external integrations, and data deletion. Never approve under standing authority, whatever the comment labels say.

Approve against the pinned head SHA and say so in the review body. If the head moves afterwards, report it and re-review instead of letting the approval carry over. Published guidance behind this split: Google's reviewer guide ranks design and "is this good for the users" above everything else; GitHub documents AI review as a supplement to, not a replacement for, human review; agent-approval guardrail guidance blocks auto-approval on the high-risk paths above regardless of confidence; and a 2026 study of 11,429 reviews found approval of agent-authored code rising while inline scrutiny fell, which is why the brief shows the verification instead of assuming it.

## AI-assisted pace

AI lowers the cost of producing code and documentation, but ambiguity, integration mistakes, security gaps, and review load remain expensive.

- Split by conceptual cohesion and independent acceptance, not developer hours alone.
- Include a basic supporting surface when it completes the user journey and remains coherent with the change.
- Defer richer polish when it is independently valuable: advanced filtering, pagination, permissions, or design-system work may be follow-ups.
- Do not call correctness scope creep. Authentication coverage, data persistence, idempotency, and race handling belong with the behavior they protect.

## Specification-review checklist

For OpenSpec, ADR, RFC, or design-document PRs, compare the proposal with current code and ask:

1. What user-visible entry point starts the workflow?
2. Are all states and allowed transitions defined?
3. Do existing password, token, session, API, and background-job paths honor the new state?
4. Are submitted fields validated and actually persisted?
5. Do web responsibilities and domain responsibilities remain separated?
6. Can concurrent operations both report success when only one should win?
7. Are failure, retry, delivery, and stale-link outcomes defined?
8. Do tasks and tests cover every normative requirement?
9. Is a stated open question actually a blocking product decision?
10. Can the first release be used without manually constructing URLs or editing data?

## Severity calibration

- **P0:** Immediate catastrophic impact across production or critical data.
- **P1:** Approval blocker involving security, authorization, data integrity, or a core promised flow that can fail.
- **P2:** Important correctness, maintainability, or usability gap that should be addressed before implementation or merge.
- **P3:** Optional improvement, polish, or preference; do not frame it as a blocker.

State severity in the review summary when useful. Keep inline comment bodies centered on scenario, consequence, and requested outcome.

## Concurrency explanation pattern

Use a minimal interleaving:

```text
Operation A reads valid state.
Operation B changes that state and commits.
Operation A writes based on its earlier read and commits.
Both report success, violating the contract.
```

Then define the serial outcome:

- B first means A fails.
- A first means B fails or observes the new state.
- Both must never report success.

Mention row locking, conditional updates with checked row counts, or atomic consumption only as candidate mechanisms unless the design must mandate one.
