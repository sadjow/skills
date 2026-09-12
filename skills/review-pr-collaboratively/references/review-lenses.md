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
