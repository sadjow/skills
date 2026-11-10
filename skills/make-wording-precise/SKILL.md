---
name: make-wording-precise
description: Rewrite or check text that other people will read, such as a message, announcement, interface copy, release note, or documentation, so that each sentence has one possible reading in plain words. Use when asked to make wording more precise, more exact, or less ambiguous, including a request for "C2-level" precision, when a reader misread a draft or called it unclear, or when shortening text that must stay exact.
---

# Make Wording Precise

Edit a draft until each sentence has one possible reading, in words its
readers already know. This pass works on wording. It starts after the content
and its order are settled, and it keeps the meaning, the voice, and the
language of the text.

For the sources behind each check, and which checks are this skill's own
practice, read [references/sources.md](references/sources.md).

## Settle the readers and the facts first

- **Readers.** Name who reads the text and collect the words they already use
  for each thing in it: the label on the button, the heading on the screen,
  the term in their documents.
- **Facts.** A loose phrase often stands for a fact nobody checked. "The
  setting works after you save" stays loose until someone knows when the
  setting takes effect. Find the fact at its owner: the screen, the code, the
  document, or a person who observes it. When the fact cannot be found, ask
  the user, or put a placeholder in square brackets where the fact goes, such
  as "[button label]", and list the fact as an open question. When the fact
  is still unknown at sending time, the text says what is unknown and who
  will find it out. Never choose one reading and state it as a fact.

## Find the second reading

Read each sentence as someone who has only this text, and look for a second
reading. A second reading counts when one of the readers could take it and
would then act or expect something different. Second readings come from the
places below. Rewrite the sentence until one reading remains.

- **Names.** A clipped or internal name can name two things: "the push" is a
  push notification to one reader and a `git push` to another. Use the name
  the readers see, and for a control use its label exactly. Keep one name per
  thing through the whole text. A shorter name is fine after the full name
  introduced it, as long as it stays the same.
- **Verbs.** "Works", "handles", "supports", "processes", "is gone", and
  "reaches the server" name no outcome. Write what the reader will see or what
  the system does: "is stored", "is discarded", "stays disabled".
- **Actor and trigger.** "The notification is sent when you click" leaves out
  who sends it and which click. Name who or what acts and the exact event:
  "The app sends the notification after you select Save."
- **Limits.** "Notifications are now saved" covers every case by default.
  State the case the claim covers and when it holds. For a change, state what
  stays the same.
- **References.** "The trucks treat the roads before they freeze" has two
  candidates for "they". Give each pronoun one candidate or repeat the noun.
  Put a noun after "this" or "which" when it points at a whole idea: "this
  change", "this delay".
- **Scope.** Put "only", "also", and "even" next to the words they limit:
  "you must send only the form", not "you only must send the form". Replace
  "all … not" with "no" or "not every". Move a "because" clause in front of a
  negated clause, or split the sentence. When "and" and "or" share a
  sentence, use a list or two sentences. Write "A or B, or both" when both
  can hold. Repeat a modifier that covers two nouns: "new users and new
  admins".
- **Time and quantity.** Replace "next Friday", "soon", and "recently" with
  the date. Say whether the end of a range counts: "up to and including 12".
  Give a deadline its time: "by 11:59pm on Tuesday". Add the time zone only
  when the readers are in more than one. "Biweekly" becomes "every two
  weeks" or "twice a week", whichever is meant.
- **Connectives.** "Since", "as", "while", and "once" carry a time sense and
  a reason sense. Use "because" for a reason and "after" or "during" for time.
- **Obligation and possibility.** Use "must" for a requirement, "can" for
  ability or permission, and "might" for possibility. "Should" and "may"
  leave the reader to guess which one is meant.
- **Comparisons.** "Faster", "fewer", and "more" need the other side: faster
  than what, measured how.

## Keep the words plain

Precision comes from the exact name, verb, and limit. A formal or rare word
adds none, so prefer "use" to "utilize" and "after" to "subsequent to". A
request for "C2-level" wording asks for a proficient writer's precision; it
does not ask for rare vocabulary.

Explain how something works inside only when the reader needs that to act.
To make a sentence more precise, sharpen its name, verb, and limit first.

A precise sentence can be longer than a loose one, because it keeps a "that",
an article, or a repeated noun. Accept those words.

## Shorten without losing exactness

Shorten by removing whole statements the readers do not need. Keep the names
and limits of the statements that stay. "Organization admins can export
reports from the Billing page" must not become "You can export reports".

## Check the whole text

After the sentence pass, read the text once more from the top:

- Each thing has one name everywhere, including headings and link text.
- No sentence claims more than the draft or its source did. A fact you did
  not have is a placeholder and an open question.
- The text has no statement the draft lacked. A statement the readers need
  that the draft does not make is a content gap: report it under the text,
  and add it only after the user confirms the fact.
- The voice, the language, and the format of the draft are the same. Apply
  the checks in the text's own language; the examples here are English.

A draft that already has one reading per sentence needs no change. Say so and
return it as it is.

## Stay inside the job

- **Content and order.** What to say, to whom, and in what order belongs to
  `$explain-and-present` when it is available. Otherwise keep the draft's
  structure and tell the user about a structural problem you see.
- **Posting.** Choosing the channel, getting approval, and sending belong to
  `$draft-and-post-team-updates` when it is available. Otherwise show the
  text and send nothing without the user's approval.
- **Defined terms.** When a contract, a standard, or the product gives a word
  a fixed meaning, such as "MUST" in capitals in a specification, keep that
  word and that meaning.
- **Intended ambiguity.** Fiction, poetry, humor, and wording a writer left
  open on purpose are out of scope. Point out the open wording and leave it.

## Report

Give the rewritten text first, with a placeholder in square brackets for each
fact you could not find. Under it, list only the open questions: each
placeholder with the two readings it leaves, and each content gap. List every
edit only when asked.

When asked to check without rewriting, list each sentence that has a second
reading, both readings, and a proposed sentence. The same rules hold for a
proposed sentence: a placeholder for an unknown fact, and no new statement.
