# Provider guidance

Research starting points, checked on 2026-09-12. Fetch current official pages
again when applying model-specific advice; model behavior and client support
can change independently of the skill format.

| Source | Implication for authoring |
| --- | --- |
| [Agent Skills specification](https://agentskills.io/specification) | Keep folder and metadata names aligned; preserve supported optional fields and independently packaged resources. |
| [OpenAI skill authoring](https://learn.chatgpt.com/docs/build-skills) | Keep one focused job, clear inputs and outputs, and test discovery. UI metadata and invocation controls are client-specific. Plugins are the recommended reusable distribution route for OpenAI clients, not a cross-client packaging requirement. |
| [Astra skill guidance](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) | Short, discriminating descriptions and conditional references reduce irrelevant context. Reconsider detailed recipes instead of automatically carrying them forward. |
| [Astra model guidance](https://developers.openai.com/api/docs/guides/latest-model) | Audit conflicting instructions and define completion within the authorized scope. Calibrate verification to the actual change. |
| [Fable 5.1 prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) | Existing prompts generally remain useful. Test observed issues such as stopping early, extra changes, progress visibility, and searching at low effort before adding a workaround. |
| [Anthropic authoring guidance](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Name the capability consistently, provide what/when descriptions, and evaluate the actual models intended to use the skill. |

These are source-backed considerations, not claims that a particular skill has
passed model evaluations. Do not transfer API integration mechanics, tool
batching controls, or thinking settings into every skill body. Put those in the
client or model adapter that owns them. Do not relax privacy, production, or
external-action boundaries because a model is more capable.

## Adapted upstream scope

The upstream revision declared in this package's metadata was also the current
[Anthropic skill creator](https://github.com/anthropics/skills/tree/34040c9c568585f6929bedeaad110ad08f079624/skills/skill-creator)
when checked on 2026-09-12. This repository maintains an instruction adaptation:
intent capture, realistic task evaluation, baseline comparisons, output review,
and refinement are retained. Broad activation wording and mandatory parallel
runs or review viewers are adapted to precise discovery and available host
capabilities. Upstream scripts, agent contracts, schemas, and viewer assets are
outside this package's import scope. The bundled Apache license is preserved.

Refresh through a deliberate review of later upstream revisions into this
adaptation; preserve destination behavior instead of replacing the package
wholesale. This source comparison establishes provenance and design choices,
not equivalent behavior to the upstream tooling or measured model improvement.
