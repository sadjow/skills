# Skill collection upgrade

Reviewed on 2026-09-12 against the official sources below. This record describes
the public collection; private migrations and operational evidence belong to
their private owner.

## Decisions

- Keep the flat `skills/<name>/` layout and category navigation in the README.
- Apply the capability-focused identifier changes in
  [skill-renames.json](../skill-renames.json). That file is the migration source
  of truth; retired names are not additional discoverable skill packages.
- Consolidate LiveView interaction resilience in
  [one skill](../skills/phoenix-liveview-interaction-resilience/SKILL.md), retaining
  the distinctive architecture, recovery, form/upload, transaction, and testing
  guidance plus the executable reconnect helper.
- Give [responsive Playwright testing](../skills/playwright-responsive-ui-testing/SKILL.md)
  ownership of viewport and input-mode coverage, geometry, and actionability.
  [Reactive UX testing](../skills/playwright-reactive-ux-testing/SKILL.md) owns
  focused regressions for timing, gesture, patch, and recovery boundaries.
  Both remain usable without installing the other.
- Shorten descriptions around the actual capability and selection boundary.
  Preserve operational bodies and resources except where the reviewed overlap,
  obsolete authoring process, or unnecessary procedure needs correction.
- Introduce [upgrade-agent-skills](../skills/upgrade-agent-skills/SKILL.md) before
  applying the collection upgrade. It requires fresh official research on every
  audit, including a review of an individual outdated creator.
- Maintain [skill-creator](../skills/skill-creator/SKILL.md) as a portable,
  selectively adapted authoring workflow. Its provenance and refresh direction
  are recorded in [UPSTREAMS.md](../UPSTREAMS.md). Keep provider tuning in
  optional references and evaluate real outputs rather than requiring a
  particular initializer, archive, or agent runtime.
- Let the model choose useful subagents. Preserve task scope, confidential
  information, and permissions for external actions across delegated work.

## Research and application

| Official source | What it supports | Decision |
| --- | --- | --- |
| [Agent Skills specification](https://agentskills.io/specification) | Folder/name identity, concise descriptions, optional fields and resources | Validate identifiers and supported metadata; keep packages independently installable. |
| [OpenAI Astra skills article](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) | Precise discovery, reduced irrelevant context, conditional references | Tighten descriptions and resolve competing entrypoints; avoid turning every workflow into a fixed itinerary. |
| [OpenAI skill authoring](https://learn.chatgpt.com/docs/build-skills) | Focused jobs, clear inputs/outputs, trigger checks, optional invocation metadata | Check default prompts against the current identifier and preserve invocation policy. |
| [Astra model guidance](https://developers.openai.com/api/docs/guides/latest-model) | Sensitivity to instruction files, completion and verification calibration | Define outcomes and preserve scope without unnecessary approval or testing loops. |
| [Fable 5.1 prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) | Existing prompts generally remain useful; behavior and effort need task-specific evaluation | Keep model notes conditional and distinguish recommendations from measured outcomes. |
| [Anthropic authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Specific capability names, coherent discovery, model-specific evaluation | Use consistent intent-revealing names without requiring one grammatical form. |
| [Anthropic creator source](https://github.com/anthropics/skills/tree/34040c9c568585f6929bedeaad110ad08f079624/skills/skill-creator) | Draft/test/review iteration, baseline comparisons, difficult non-triggering cases | Adapt the methodology while preserving the license and making execution tools optional. |

## Consumer migration

For a Skills CLI installation, install the replacement package and verify it
before removing the retired installation. Preserve local modifications in a
separate backup. Use the client's own removal workflow, then reload discovery.
Do not keep a renamed directory whose frontmatter still identifies the old skill.

Home Manager consumers should publish or adopt a reviewed repository revision,
update their pinned input, build, and then activate the configuration within
their normal authority boundary. A local source override can validate unpublished
changes without replacing a reproducible GitHub pin with a machine-specific path.

The adapted creator replaces the previously external `skill-creator`. Preserve
an existing mutable installation before handing ownership to the declarative
consumer. Leave the Codex system creator under Codex management.

## Validation scope

Repository checks cover syntax, packaged references, current identifiers,
default prompts, description limits, and retired-name replacement validity.
TypeScript assets are typechecked; Python and shell helpers receive syntax
checks. The rename regressions were observed failing against the previous
validator before its implementation was updated.

The completed checks passed: the repository check suite, all 11 validator tests,
and Codex structural validation for all 30 public skills. Comparing the source
backup with the migration map found no missing packaged files. A Home Manager
flake check and build against the unpublished source also passed. The generated
configuration contains all 30 public skills for each of its four configured
clients, uses the adapted creator, and excludes retired names.

An independent forward exercise selected the intended workflow for five tasks:
a collection audit, a focused creator edit, an unrelated workbook calculation,
an individual creator freshness audit, and a new CSV conversion skill. It also
researched official sources and drafted the CSV skill, preserving string values,
CSV quoting rules, malformed-row diagnostics, and the requested action boundaries.
This was not a blind comparison against the previous collection or a benchmark
of specific model versions; token use and latency were not measured.

Independent scenario checks and forward execution are useful evidence, but do
not establish aggregate selection accuracy, cost reduction, or compatibility
with every client and model. Record only measurements actually obtained. The
official research is not a substitute for exercising a deployment's own tasks.
