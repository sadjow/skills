# Collection organization

## Chosen layout

Keep one independently installable package at `skills/<name>/`. Topic groups live
in the README, so reorganizing the catalog does not rename installed skills or
change their URLs. The Skills CLI also supports nested category directories;
the flat layout here is a maintenance choice, not a format requirement.

```text
skills/<name>/
  SKILL.md
  references/          optional, detailed guidance
  scripts/             optional, executable helpers
  assets/              optional, copyable resources
  agents/openai.yaml   optional, client-specific metadata
```

Keep a coherent task in each skill. Broad framework guidance and a focused
interaction workflow can coexist when their descriptions distinguish the task.
Choose one relevant entrypoint before loading overlapping instructions. Keep
names stable once adopted; reviewed migrations use `skill-renames.json` to
record replacements without retaining duplicate discoverable packages.

Put the workflow needed on every invocation in `SKILL.md`, with explicit triggers
for loading detailed references. The specification recommends fewer than 500
lines and about 5,000 tokens in the entrypoint; those are guidance, not an arbitrary
installation blocker. Package required local resources inside the same skill.
An optional companion skill should be discoverable separately, with a fallback
when unavailable. No skill should depend on the author's checkout paths.

The flat structure remains suitable for a large catalog. Group topics in human
navigation, select the skills useful to each environment, and keep descriptions
concise. Directory categories alone do not reduce loaded discovery metadata or
resolve overlapping capability boundaries.

## Ownership and discovery

The skill folder is the content source of truth. The README is a human navigation
catalog, not another copy of skill instructions. Root contributor instructions
apply to maintaining this repository, not to projects installing one skill.

Unmodified upstream skills are linked from `UPSTREAMS.md`. Customized upstream
skills retain their original licenses and provenance. Client plugin bundles stay
with their plugins. Private content stays in a separate repository: an internal
metadata flag in a public repository is not a privacy boundary.

Home Manager pins this repository as a non-flake input. Non-Nix users install
individual skills with the Skills CLI. A custom npm installer, marketplace
manifest, or cross-skill symlink is unnecessary for these distribution paths.

## Research basis

Checked against primary documentation during the repository migration:

- [Agent Skills specification](https://agentskills.io/specification): required
  metadata, optional resources, relative paths, and progressive disclosure.
- [Skill creator best practices](https://agentskills.io/skill-creation/best-practices):
  coherent task boundaries, calibrated detail, and refinement through real use.
- [Skills CLI discovery](https://github.com/vercel-labs/skills#skill-discovery):
  supported collection layouts, per-skill selection, and agent destinations.
- [Agent integration guidance](https://agentskills.io/client-implementation/adding-skills-support):
  shared `.agents/skills` discovery alongside client-specific directories.

Validation checks metadata, resources, syntax, and isolated installation. It does
not certify that every inherited recommendation is current or that every workflow
has been behaviorally evaluated on every supported agent.
