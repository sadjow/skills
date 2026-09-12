# Contributing

Edit the canonical files in `skills/<name>/`. Describe the task or observed
failure, the intended behavior, and the evidence that supports the change.
Keep changes focused and preserve existing names and invocation policy.

Use `SKILL.md` for the workflow, `references/` for conditional detail, `scripts/`
for executable helpers, and `assets/` for copyable project resources. Agent
metadata is optional. Avoid a new sibling skill when an existing one owns the
same behavior.

Run `npm ci` followed by `npm run check`. Node.js 22 and Python 3 are tested in CI;
these are validation tools, not requirements for installing Markdown skills.
Run changed helpers with representative input as well as syntax checks.

Keep recordings, traces, credentials, private identifiers, and customer data out
of commits. Use synthetic examples. Preserve upstream notices and describe local
adaptations in `UPSTREAMS.md`. Original contributions use the repository's MIT
license; third-party content retains its own license.
