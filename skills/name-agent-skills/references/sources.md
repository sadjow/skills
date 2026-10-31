# Research basis

Checked 2026-10-31. Open the sources again when a client or the specification
changes; this record explains the rules, it does not pin them.

## Requirements

| Rule | Source |
| --- | --- |
| 1 to 64 characters; lowercase letters, digits, and hyphens; no leading, trailing, or consecutive hyphens; matches the folder | [Agent Skills specification](https://agentskills.io/specification) |
| No XML tags; `anthropic` and `claude` are reserved | [Anthropic skill authoring](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) |
| A skill name shares the command namespace; listings keep every name but shorten or drop descriptions past the budget, and `name-only` overrides list the name alone | [Claude Code skills](https://code.claude.com/docs/en/skills) |
| Skills with the same name are not merged | [Codex skills](https://developers.openai.com/codex/skills) |

## Recommendations

| Recommendation | Source |
| --- | --- |
| Someone should understand what a skill does from its name; avoid vague names (`helper`, `utils`, `tools`), generic ones (`documents`, `data`), and inconsistent patterns. Gerunds are suggested; noun phrases and action-oriented names are acceptable | [Anthropic skill authoring](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) |
| Prefer short, verb-led phrases; namespace by tool when it improves clarity or triggering, as in `gh-address-comments`; keep each skill to one job | [Codex skill-creator](https://github.com/openai/skills/blob/main/skills/.system/skill-creator/SKILL.md) |
| Scope a skill as a coherent unit of work; too narrow and too broad both cause problems | [Agent Skills creation practices](https://agentskills.io/skill-creation/best-practices) |
| Overlapping or vague purposes confuse agents; namespacing choices measurably change selection; one tool for a whole job beats a chain of steps | [Writing effective tools for agents](https://www.anthropic.com/engineering/writing-tools-for-agents) |
| Intention-revealing names, no disinformation, meaningful distinctions instead of noise words, one word per concept, problem-domain words, no gratuitous context | Robert C. Martin, *Clean Code*, chapter 2, "Meaningful Names" |
| A name that cannot be concise, or needs `Manager`, `Processor`, or `Super`, signals too many responsibilities; describe the unit in about 25 words without "if", "and", "or", or "but" | Robert C. Martin, *Clean Code*, chapter 10, "Classes" |
| Name in stages: honest, completely honest, does the right thing (split clauses that do not belong), intent revealing, then judge names together as a domain | [Arlo Belshee, Naming as a Process](https://digdeeproots.com/articles/naming-process/naming-as-a-process/) and its [completely honest](https://digdeeproots.com/articles/naming-process/get-to-completely-honest/), [does the right thing](https://digdeeproots.com/articles/naming-process/get-to-does-the-right-thing/), [intent revealing](https://digdeeproots.com/articles/naming-process/get-to-intent-revealing/), and [domain abstraction](https://digdeeproots.com/articles/naming-process/get-to-domain-abstraction/) articles |

## Inferences

- Clean Code and Belshee write about classes and methods. Applying "no clear
  name means the scope is wrong" to skills is an inference, supported by the
  vendors' one-job and coherent-unit guidance.
- No study isolates skill-name quality from description quality. The
  cold-reader test is the local substitute: it reproduces a listing without
  descriptions.
- Names that list stages, such as Anthropic's own `commit-push-pr` command,
  are not discouraged by any source. The skill accepts them when people ask
  for the job in those steps and the stages serve one outcome.
