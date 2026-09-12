---
name: skill-creator
description: Create or refine an individual agent skill with clear scope, precise discovery, useful resources, and realistic validation. Use when turning a workflow into a skill or improving its instructions.
license: Apache-2.0. See LICENSE.txt.
metadata:
  upstream: https://github.com/anthropics/skills/tree/34040c9c568585f6929bedeaad110ad08f079624/skills/skill-creator
---

# Skill Creator

Adapted by sadjow from Anthropic's skill-creator for portable authoring, selective
evaluation, and repository distribution. This package contains modified
instructions; the upstream license is preserved in `LICENSE.txt`. It retains
authoring and evaluation guidance; runners, review viewers, and CLI integration
remain separate host capabilities.

Create the smallest independently useful skill that changes the agent's
decisions or improves its output. Assume a capable model. Preserve non-obvious
domain constraints and fragile operational steps; omit general tutorials and
instructions already owned by the surrounding environment.

## Establish the capability

Infer the intended task, output, user, and authority from the conversation and
canonical source. Ask only for missing information that materially changes the
work. Reuse an existing skill when it already owns the capability.

Check the nearest alternative skill. State what makes this task different
before choosing a name. Explicit audits of upstream or model freshness, and
collection-wide naming or overlap reviews, belong to `$upgrade-agent-skills`
when available. Otherwise perform the relevant research and ownership review
directly within the requested scope. Keep ordinary authoring and focused
instruction edits here, including updates to an existing skill.

Read current official authoring recommendations when creating or materially
revising a skill. For model-specific behavior, consult
[provider guidance](references/provider-guidance.md) and fetch the linked
official sources again. Do not encode a workaround for an old model as a
universal rule.

## Name and describe the job

Use a stable capability name, qualified by domain or tool when it prevents a
likely collision. Use lowercase letters, digits, and single hyphens, with the
same name in the folder and frontmatter and at most 64 characters. Prefer clear
intent over a persona such as expert or helper. Do not include model versions
or hypothetical future categories.

Keep the description short enough to remain useful in a large catalog. State
what the skill does and the concrete context in which it applies. Add a
near-miss exclusion only when it prevents likely confusion. Avoid broad keyword
lists or instructions to activate whenever the surrounding domain appears.

Preserve an existing name and invocation policy unless the authorized change
includes their migration. A prose audit or proposed rename is not permission
to implement it.

## Write the skill

The required artifact is `skills/<name>/SKILL.md` or the equivalent location
declared by the owner. Never edit an installed copy or package store when a
canonical source exists.

Use YAML frontmatter with `name` and `description`; retain supported optional
fields such as `license`, `compatibility`, and `metadata`. Check provider-specific
fields against the target client. Do not turn optional compatibility notes or
experimental tool declarations into cross-client requirements.

Keep the outcome, decision criteria, necessary constraints, and reference routes
in the entrypoint. Use directly linked `references/` for substantial conditional
guidance, `scripts/` for worthwhile deterministic work, and `assets/` for reusable
output resources. A short skill needs none of these directories.

Explain why a constraint matters when that improves judgment. Use a fixed
sequence only where order is needed for correctness or safety. Preserve native
behavior, authority boundaries, and task completion criteria relevant to the
actual workflow without copying the environment's entire instruction set.

Optional companion skills must have an availability check and a useful fallback.
Required resources belong inside the package. Client metadata such as
`agents/openai.yaml` is an optional adapter; preserve existing policies and tool
dependencies when changing its display name or default prompt.

## Validate and improve

Use an available initializer or validator when it helps; neither a particular
script nor a `.skill` archive is universally required. Check frontmatter,
resource links, dependency documentation, and isolated installation. Run changed
executables with representative input. Syntax checks alone do not establish
better model behavior.

For substantive behavior changes, read [evaluation guidance](references/evaluation.md).
Start with a few realistic tasks and meaningful boundary cases. Compare against
the old version or a no-skill baseline where available, inspect the outputs, and
revise only where evidence supports it. Keep manual inspection distinct from
independent execution and measured results.

Respect user scope, tool availability, authorization, and evaluation cost.
Neither a creator nor an evaluation recipe authorizes outbound actions.
Choose independent agents when useful for the evaluation. Reuse authority
already granted; do not add approval stops for routine
source edits or checks within the request.

Deliver through the requested channel. A Git repository can distribute the
skill directory directly; create an archive only when the destination needs
one. Exclude secrets, personal paths, recordings, and evaluation outputs from
the distributable package. Report what was validated and what remains untested.
