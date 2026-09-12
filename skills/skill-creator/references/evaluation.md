# Evaluate a skill

Adapted by sadjow from Anthropic's skill-creator evaluation workflow. Mechanics
are conditional on the available client and user authorization.

## Choose useful cases

For task execution, start with a few realistic prompts, synthetic input
artifacts, expected outcomes, and observable criteria. Prefer checks on the
actual artifact, state, or user outcome over matching the skill's wording.
Include a transfer case and any material authorization or privacy boundary.

For discovery, include both requests that should use the skill and difficult
near-misses that share its terminology but belong elsewhere. Evaluate against
the surrounding catalog, including the nearest competing skill. Simple cases
the model can complete directly may not need a skill invocation.

Use a task-appropriate structure such as:

```json
{
  "id": "locale-preserving-edit",
  "prompt": "Update this input without changing its stored value or caret behavior.",
  "inputs": ["synthetic-form.html"],
  "expected_outcome": "The requested edit works and preserves authored intent.",
  "checks": ["The input retains its value during editing", "Keyboard editing remains usable"]
}
```

This is an example schema, not a required API. Existing evaluation tools may
need a different structure. Keep private examples and raw traces outside public
packages.

## Establish comparisons

For a new skill, compare with no skill when the runner can isolate that
condition. For an update, retain the original version as the baseline. Hold
the prompt, inputs, client, model, effort, and tool permissions constant.
Separate authoring examples from held-out evaluation cases when tuning a
description repeatedly. Repeat uncertain runs before drawing conclusions from
small differences.

Use independent model runs or blind output comparison within the available
execution and cost boundaries. If those conditions are unavailable,
perform the useful deterministic and manual checks and disclose the limit.
Do not claim that an author's walkthrough is an independent benchmark.

## Judge results

Inspect actual outputs and the work required to produce them. Deterministic
assertions fit structured or executable results; subjective design and writing
also need human judgment. Identify tests that both versions always pass,
unstable outcomes, regressions, and unintended scope expansion.

Record the model, effort, client, source revision, case, observed outcome, and
evidence. Record time and tokens only if the runner actually reports them.
Compare quality first, then the cost of reaching that quality, including
retries and user interventions. Reduced description length alone is not a
quality result.

Share enough output for the user to review, then generalize the feedback rather
than adding a special rule for every test case. Package repeated deterministic
work as a helper only when it reduces real duplication. Retain meaningful
regressions; do not keep scratch outputs as permanent skill resources.
