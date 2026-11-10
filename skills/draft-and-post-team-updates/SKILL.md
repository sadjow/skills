---
name: draft-and-post-team-updates
description: Draft a status update, pull-request announcement, review request, or summary for a team chat or tracker such as Slack, Teams, Linear, or Jira, and post it once the user approves. Use when the user asks to tell, update, or notify people about work.
---

# Draft and Post Team Updates

Write the message the team needs, in the user's voice, and post it only where
and when the user approves.

## Fix the target before writing

Settle these from the request, the project instructions, or one question:

- **Where**: the platform, the channel or item, and whether this is a new
  message or a reply. Prefer a reply in the thread where the work was already
  discussed, and read its recent messages so the draft builds on what the
  readers already said.
- **Who reads it**: a technical team can take technical terms; executives,
  clients, and other non-technical readers need the outcome and its effect
  without jargon.
- **What they should do**: review, approve, test, decide, or only know.
- **Who to mention**: only the people who must act. Resolve each mention to the
  platform's user ID, and ask when a name matches more than one person.

Before posting in a channel the user did not name, read its topic or
description and confirm that it is the right place.

## Check the facts at the source

Right before drafting, list the claims the message makes and confirm each from
the source that owns it: pull-request state, review status, CI, merge,
deployment, tracker status, or the live system a finding describes. "Merged"
and "deployed" are different claims; make each only with evidence.
Configuration speaks for a live system only when that system loads it and
nothing overrides it; diagrams, old reports, and your own notes only describe
it, so cite them as the source or ask someone who can check. When the
conclusion depends on an interpretation, such as which device a setting
controls, confirm that premise too. Link every pull request, issue, or task on a
short phrase that says what the work is; add its identifier only when readers
need it to search.

When the readers are closer to the system than you, such as the people
operating it, ask what they have seen or tried before proposing a step, and
frame a disagreement as a question unless the owning source settles it.

## Write for chat, not email

- Lead with the point: the outcome, the request, or the change in status. Leave
  out greetings, sign-offs, and a restated subject line.
- Keep routine updates to a few lines, and move detail into a thread reply or a
  link.
- Keep the tone friendly and collaborative. State facts plainly without
  inflating certainty or urgency, keep each caveat in the message itself rather
  than only in your note to the user, and ask rather than demand.
- Make one request per message, placed where it will be seen.
- Write for readers who see only this message. Before showing the draft,
  reread it cold and remove every reference to, or contrast with, something
  they never saw: an earlier draft, a question you decided not to ask, or an
  instruction from the user. "A heads-up rather than a question" becomes "A
  heads-up". Contrasts with what the readers did see, such as the previous
  update or their own replies, stay. Do this before posting, because some
  connectors cannot edit a sent message.
- Write in the first person as the user, and commit them only to actions they
  have stated. Mention AI assistance only when the user wants it disclosed.
- For structure, use the status-update or change-report outline from
  `$explain-and-present` when it is available. Otherwise use: state compared
  with the plan, what you need from the reader, progress, risks, and the next
  step.

Use the syntax of the path the message will take. A connector or API takes the
platform's markup, so check what it expects instead of assuming Markdown.
Slack's `mrkdwn`, for example, uses `*bold*`, `<https://example.com|link text>`,
and `<@USERID>` mentions, and has no headings or tables; some connectors convert
standard Markdown for you. A draft the user pastes into the app needs what its
message box accepts instead, such as plain URLs, because API link and mention
syntax shows up there as literal text.

## Approve, then post

1. Show the exact draft with its target: platform, channel or item, thread, and
   mentions. When the message reports findings, list each claim beneath it
   with its source, and mark any you did not check at its owner.
2. Post only after the user approves that text and target, or when they
   explicitly asked you to post without review. Any edit needs a new approval.
   When the connector can save a draft in the target app, offer that so the
   user can send it themselves, and call it a saved draft, not a sent message,
   until the channel shows it.
3. Post through the available connector or CLI. If posting fails, report the
   failure instead of switching to another channel, account, or tool.
4. Confirm with the returned permalink or ID and share it. When the result is
   uncertain, read the channel or item before retrying so the message does not
   appear twice.
5. If a posted claim later proves wrong, draft a correction for the same
   thread and ask before posting it.

Changing a tracker item's status, assignee, or fields is a separate action from
commenting on it and needs its own approval.

## Recurring updates

For a recurring update, such as a daily or weekly status, read the previous one
first, keep its structure, and report only what changed since then.
