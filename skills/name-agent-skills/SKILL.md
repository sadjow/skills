---
name: name-agent-skills
description: Choose, check, or change an agent skill's name so it reveals the skill's intent and is specific enough to pick from a large catalog. Use when creating, splitting, merging, or renaming skills, or when no clear name fits, which means the skill's scope needs refining.
---

# Name Agent Skills

An agent often chooses a skill by its name alone. Clients shorten or drop
descriptions when a catalog outgrows its listing budget, people type the name
as a command, and other skills refer to it by name. So the name has to say what
the skill does, specifically enough to choose it over its neighbors.

When no clear name fits, treat that as a finding about the skill, not about
the vocabulary: refine the skill's scope, then name it.

For the sources behind each rule, and which rules are requirements rather
than recommendations, read [references/sources.md](references/sources.md).

## State the job first

Write one sentence, about 25 words, saying what the skill produces, in what
situation, and with which domain or tool. If the sentence needs "and", "or",
"if", or "but" to join separate jobs, the skill has more than one
responsibility.

- Separate jobs, such as writing commit messages and resolving merge
  conflicts, belong in separate skills, or the skill narrows to the job people
  actually ask for.
- Stages of one outcome are one job. The name may list them when people ask
  for each stage in those words and the skill can stop at each, as in
  `commit-push-and-open-pr`.

## Gather the words and the neighbors

- **Their words.** Collect how people ask for this job: their requests, command
  names, and issue titles. Prefer their problem-domain words over internal
  terms or the mechanism.
- **The neighbors.** List every skill, plugin skill, and built-in command that
  will be loaded beside this one, including private and third-party ones. A
  skill name shares the command namespace, so a clash can hide a built-in
  command or another skill. Name the nearest neighbor and say what separates
  them. When the separation is unclear, settle ownership before naming.
- **The collection's conventions.** Note the grammatical form it uses for this
  kind of skill and its one word for each concept, such as `pr` or
  `pull-request`, `review` or `audit`.

## Draft and check candidates

Work through the name in stages:

1. **Honest.** Write a long name that says everything the skill does, with
   every "and" left in.
2. **One job.** For each clause, ask whether it is unrelated to the others, or
   a concern worth its own skill. Split those out or drop them.
3. **Intent.** Name what people want from the skill, not how it works. When
   people ask for the job by its steps, as in "commit and push", name the
   steps they say.

Draft a few candidates this way and keep one only when it passes every check:

| Check | Passes when |
| --- | --- |
| Reveals intent | Someone who sees only the name can say what the skill does and when to use it. It names a job or outcome, not a persona (`expert`, `helper`, `specialist`) or a vague word (`tools`, `utils`, `manager`, `processor`). |
| Specific enough | No neighbor could be mistaken for it. Add the domain, framework, or tool (`phoenix-`, `playwright-`, `github-`) when the same job exists elsewhere or the skill depends on it. Add the side of a relationship, such as author or reviewer, when both sides have skills. A broad name stays accurate for a skill that really is broad. |
| No excess detail | It leaves out versions, model names, dates, temporary project names, speculative categories, and mechanics people do not choose by. Add no more context than separates it from everything loaded beside it, not only its own collection. A plugin's name inside that plugin adds nothing, because the plugin already namespaces its commands. An organization prefix helps when the skill only applies there. |
| Meaningful distinction | Neighbors differ by what people choose between, not by noise words such as `-pro`, `-v2`, `-new`, or `-advanced`. |
| Consistent | It uses the collection's form and words, and reads as part of one vocabulary when listed with its neighbors. Gerunds, verb-led phrases, and noun phrases are all accepted forms; consistency matters more than the choice. |
| Reads naturally | `Use $name to …` and `/name` read as plain language, without private abbreviations. |
| Valid | Lowercase letters, digits, and single hyphens, 64 characters at most, no leading or trailing hyphen, and the same as its folder name. Claude also rejects XML tags and the words `anthropic` and `claude`. |

## When no name fits, refine the skill

| Signal | Usually means | Refine by |
| --- | --- | --- |
| Only a generic word fits | No single job | Narrowing to the job people request; move pure reference material into the skill that applies it |
| "And" or "or" joins separate jobs | Several responsibilities | Splitting the skill |
| Several qualifiers are needed to differ from a neighbor | Overlapping ownership | Moving the boundary, or merging with the neighbor |
| The name describes the mechanism | Named from the inside | Naming the outcome people ask for |
| The honest name runs long | Scope too broad | Splitting, or naming the outcome the steps serve |
| The name covers one step that is useless alone | Scope too narrow | Merging it into the skill that owns the outcome |

A scope change is a change to the skill, so it needs the same authorization as
any other edit.

## Test with a cold reader

Give an independent reader, such as a fresh agent with no context, only the
names in the catalog and a few realistic requests, including a near-miss that
belongs to a neighbor. The name passes when the reader picks it for its own
requests and picks the neighbor for the near-miss. This reproduces a listing
whose descriptions were dropped. Use the prompt in
[references/cold-reader-test.md](references/cold-reader-test.md).

## Apply the name

- Use the name as the folder name and the frontmatter `name`, and update the
  title, client metadata such as display names and default prompts, references
  in companion skills, catalogs, settings that list skills by name, and tests.
- An adopted name has callers: other skills, settings, and people's habits.
  Rename one only when authorized and the clarity gained outweighs that churn.
  Record the old and new names in the collection's rename registry when it
  keeps one, and leave only one discoverable package.
- Write the description afterwards with the skill-authoring workflow. The name
  must work without it.

Report the chosen name, the candidates rejected and why, and the result of the
cold-reader test.
