# Contributing

Edit the canonical files in `skills/<name>/`. Describe the task or observed
failure, the intended behavior, and the evidence that supports the change.
Keep changes focused and preserve existing names and invocation policy unless
the authorized change includes their migration. Record approved identifier
changes in `skill-renames.json` and update callers and client metadata together.

Use `SKILL.md` for the workflow, `references/` for conditional detail, `scripts/`
for executable helpers, and `assets/` for copyable project resources. Agent
metadata is optional. Avoid a new sibling skill when an existing one owns the
same behavior.

Name the capability, adding a domain or tool when it prevents ambiguity. Keep
the folder and frontmatter name aligned. Descriptions should state the job and
its selection boundary without an exhaustive feature list. Keep topic groups
in the README so catalog changes do not alter installation paths.

Every skill audit must research current official skill recommendations and
record the sources and review date. Use `upgrade-agent-skills` for the audit
workflow and `skill-creator` for individual authoring. Compare actual behavior
when testing improvements; a shorter description is not proof of better routing.

Run `npm ci` followed by `npm run check`. Node.js 22 and Python 3 are tested in CI;
these are validation tools, not requirements for installing Markdown skills.
Run changed helpers with representative input as well as syntax checks.

Keep recordings, traces, credentials, private identifiers, and customer data out
of commits. Use synthetic examples. Preserve upstream notices and describe local
adaptations in `UPSTREAMS.md`. Original contributions use the repository's MIT
license; third-party content retains its own license.
