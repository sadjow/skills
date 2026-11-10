# Research basis

Checked 2026-11-10. Each quotation below was read on the linked page on that
date. Open the sources again when a style guide changes; this record explains
the checks, it does not pin them.

No source here is a requirement for ordinary prose. RFC 8174 is a requirement
only inside documents that adopt it.

## Recommendations

| Check | Source says | Source |
| --- | --- | --- |
| Names | "Use one word for a concept, and use it consistently." | [Microsoft Writing Style Guide, writing tips](https://learn.microsoft.com/en-us/style-guide/global-communications/writing-tips) |
| Names | "You will confuse your audience if you use different terms for the same concept or object." | [plainlanguage.gov archive, use the same terms consistently](https://raw.githubusercontent.com/GSA/plainlanguage.gov/main/_pages/guidelines/words/use-the-same-terms-consistently.md) |
| Names | A simplified name ("nickname") is better than an abbreviation, so a short name is acceptable when it stays the same | [plainlanguage.gov archive, minimize abbreviations](https://raw.githubusercontent.com/GSA/plainlanguage.gov/main/_pages/guidelines/words/minimize-abbreviations.md) |
| Verbs | "Also verbs and nouns can be vague; support, handle, process, reject, use, etc." | Ambiguity Handbook, section 5.1 |
| Facts | "If a fact is unknown or uncertain at writing time, the need for further investigation must be stated explicitly, so that the reader knows of the uncertainty, its degree, and the intent to remove it." | Ambiguity Handbook, section 5.1 |
| References | "The simplest way to avoid confusion is to replace the pronoun with an unclear reference by the noun that the sayer intends to be the pronoun's referent." | Ambiguity Handbook, section 5.4.2 |
| References | A stand-alone "this" that refers to a whole idea, not to a noun, causes ambiguity | Ambiguity Handbook, section 5.4.3 |
| References | "Avoid vague and confusing references between a pronoun and its antecedent." | [Google developer documentation style guide, pronouns](https://developers.google.com/style/pronouns) |
| Scope | "Put conditionals such as 'only' or 'always' and other modifiers next to the words they modify." | [plainlanguage.gov archive, place words carefully](https://raw.githubusercontent.com/GSA/plainlanguage.gov/main/_pages/guidelines/words/place-words-carefully.md) |
| Scope | A quantifier beside a negation, as in "Any electrical appliance is not allowed in the pool area", and a "because" after a negated clause each have more than one scope; restructure the sentence | Ambiguity Handbook, sections 5.2.2 and 5.4.6 |
| Scope | "Natural language has no such precedence and associativity rules." "Or" can be exclusive or inclusive; write "either ... or ... or both" for the inclusive sense | Ambiguity Handbook, sections 5.4.7 and 5.1 |
| Time and quantity | "For up to 12 aircraft" can include or exclude 12; "minimum" and "maximum" leave the interval open or closed | Ambiguity Handbook, section 5.1 |
| Time and quantity | "after, before, next, previous, etc.: Each of these indexical words has a fixed meaning but a variable reference." | Ambiguity Handbook, section 5.1 |
| Time and quantity | "use 'to' in time ranges, not hyphens, en rules or em dashes"; "Midnight is the first minute of the day, not the last. You should consider using '11:59pm' to avoid confusion about a single, specific time." | [GOV.UK A to Z style guide, Times](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/) |
| Time and quantity | Avoid a time zone unless it is necessary; when one is needed, spell out the region and add the UTC offset | [Google developer documentation style guide, dates and times](https://developers.google.com/style/dates-times) |
| Connectives | "Since is ambiguous; it can refer to the passage of time. Because refers to causation or the reason for something." The same entry exists for "as" | [Google developer documentation style guide, word list](https://developers.google.com/style/word-list) |
| Obligation and possibility | "'must' for an obligation", "'may' for a discretionary action", "'should' for a recommendation" | [plainlanguage.gov archive, use "must" to indicate requirements](https://raw.githubusercontent.com/GSA/plainlanguage.gov/main/_pages/guidelines/conversational/use-must-to-indicate-requirements.md) |
| Obligation and possibility | Reserve "may" for official policy or legal considerations; use "can" for permission and "can" or "might" for possibility | [Google developer documentation style guide, word list](https://developers.google.com/style/word-list) |
| Defined terms | "The words have the meanings specified herein only when they are in all capitals." | [RFC 8174](https://www.rfc-editor.org/rfc/rfc8174) |
| Plain words | "Use simple words with precise meanings, and remove words that don't add substance." | [Microsoft Writing Style Guide, use simple words and concise sentences](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences) |

The Ambiguity Handbook is Daniel M. Berry, Erik Kamsties, and Michael M.
Krieger, [From Contract Drafting to Software Specification: Linguistic
Sources of Ambiguity](https://cs.uwaterloo.ca/~dberry/handbook/ambiguityHandbook.pdf),
version 1.0, November 2003. The trucks example in the skill is its example
E11. It also classifies ambiguity as lexical, syntactic, semantic, and
pragmatic in sections 3.3.1 to 3.3.4.

## Where the sources disagree or stop

- **Short names.** The sources ask for one consistent name. Using a control's
  label exactly is this skill's practice for interface text.
- **Pronouns.** plainlanguage.gov recommends pronouns such as "you" to speak
  directly to the reader
  ([address the user](https://raw.githubusercontent.com/GSA/plainlanguage.gov/main/_pages/guidelines/audience/address-the-user.md)).
  The skill repeats a noun only where a pronoun has two candidates.
- **"May".** plainlanguage.gov assigns "may" to a discretionary action; Google
  reserves it for policy and legal text. The skill avoids "may" where either
  sense could be read, and keeps it as a defined term.
- **Time zones.** Google advises against a time zone unless it is necessary.
  The skill adds one only for readers in more than one zone.
- **"Only".** The handbook says that most native English speakers put "only"
  before the verb whatever it limits (section 5.3.1). Readers used to that
  form can miss a careful placement, so restructuring the sentence is
  sometimes safer than moving the word. That last step is an inference.
- **Generality.** The handbook leaves generality out "because its apparent
  ambiguity is relative to the expectations of the writer and reader"
  (section 3.3.5). An unstated detail is a defect only when readers need it
  to act.

## This skill's own practice

No source read for this record states these; they come from correcting real
drafts.

- Choose the verb by what the reader will see happen.
- For a change, state what stays the same.
- Name the actor and the exact event of a "when" clause.
- Give a comparison its other side and its measure. The handbook covers
  ambiguous "than" constructions in section 5.5.2, which is a narrower claim.
- Shorten by removing whole statements while keeping the names and limits of
  the statements that stay.
- Mark an unknown fact with a placeholder in square brackets, and report a
  statement the draft lacks without writing it. Both rules come from test
  runs of this skill in which a proposed text stated a fact nobody had
  checked.
- Count a second reading only when a reader could take it and would then act
  or expect something different. The handbook's remark on generality
  (section 3.3.5) supports this threshold by inference.
- "Next Friday" and "biweekly" as examples: no style-guide entry was found
  for either. The handbook's indexical-word entry supports the first by
  inference.

## Not read at the source

- ISO 24495-1:2023, Plain language: only the abstract is public.
- The CEFR Companion Volume: the page refused the request. "C2-level" appears
  in the skill only as a phrase people use when they ask for precision. This
  record makes no claim about what the C2 descriptors say.
- ISO/IEC/IEEE 29148, the INCOSE Guide to Writing Requirements, and the
  ASD-STE100 specification.
- plainlanguage.gov pages were read from the GSA GitHub archive of the site.
