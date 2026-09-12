# Official guidance research

Open these sources again for every audit. Follow relevant official links and check for newer guidance; this directory is a research starting point, not a version pin.

| Source | What to verify |
| --- | --- |
| [Agent Skills specification](https://agentskills.io/specification) | Names, descriptions, optional frontmatter, resource structure, progressive disclosure |
| [Agent Skills creation practices](https://agentskills.io/skill-creation/best-practices) | Coherent scope, useful detail, realistic evaluation |
| [OpenAI skill authoring](https://learn.chatgpt.com/docs/build-skills) | Current client discovery, invocation metadata, validation |
| [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) | Relevant model behavior and migration advice; verify the requested model tab |
| [OpenAI on Astra skills](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) | Description precision, conditional references, proportional instructions |
| [Anthropic skill authoring](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) | Names, descriptions, testing, and client-specific recommendations |
| [Anthropic skill creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | Current upstream creator and evaluation resources; resolve an exact revision |
| [Fable 5.1 prompting](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) | Fable-specific changes; do not generalize them to other models |
| [Skills CLI](https://github.com/vercel-labs/skills) | Current discovery, installation destinations, and update behavior |

For another provider or client, use its official documentation and source repository. Search the user's exact model name before reformulating it. Do not substitute a familiar model for an unfamiliar requested one.

Keep the research record with the audit's owning repository or review artifact. Include the access date, document URL, source revision when applicable, observed recommendation, and resulting decision. Private audit evidence stays private. A public method may explain the general rule without naming private examples.

Separate stable skill contracts from model tuning. A model-specific workaround belongs in shared instructions only when it is useful across the supported use cases and does not conflict with another model or the user's choices. Otherwise keep it conditional. Test the actual target model and client before claiming a behavioral improvement.
