---
name: write-standup
description: Write the user's stand-up (Done, In progress, Next) from their own pull requests, reviews, and tracker issues since the last stand-up, with each status checked at its source. Use for daily stand-ups and "what did I do since yesterday"; use draft-and-post-team-updates to post it and github-team-delivery-review for whole-team delivery.
---

# Write Standup

Turn the user's recent activity into a stand-up that busy readers absorb in
under a minute. Gather first, check each status claim at its source, then
write.

## Find the project's sources

Read the project instructions for a stand-up section. It names the code host
organization, the tracker workspace, how to confirm a production deploy or
release, and any data the update must not contain. When there is no such
section, use the code host and tracker the user works in, and ask one question
only when the organization or workspace is ambiguous.

## Set the window

Default to the time since the last stand-up: the last 24 hours, or since the
previous working day's stand-up after a weekend. Use the user's window when
they name one. Leave the window out of the heading.

## Gather

Collect these in parallel, filtered to the window:

- Pull requests the user authored, with state and merge time. With the GitHub
  CLI: `gh search prs --owner <org> --author @me --updated ">=<since>"`.
- Pull requests the user reviewed or commented on (`--reviewed-by @me`,
  `--commenter @me`).
- Tracker issues assigned to the user that changed in the window, with status
  and priority, and issues the user created in the window.
- The newest one or two comments on each of those issues. Outcomes, evidence,
  and next steps often live there rather than in the status field.

When the user names something as in progress, such as QA, look for its latest
written result before you report it.

## Check each claim at its source

- "Merged", "deployed", and "released" are separate claims. Confirm a deploy
  with the project's method, for example by checking that the merge commit is
  an ancestor of the production branch. Confirm a store or package release
  where it is published. Tags can lag behind.
- A status field shows what someone set, not what happened. When it disagrees
  with the newest comment or the system, report what the source shows.
- When a claim cannot be checked, keep it and mark it unverified in a short
  clause. Never upgrade an assumption to done.

## Write

```markdown
## Stand-up

**Done**
- <outcome, with the link on its key phrase>

**In progress**
- <what remains, and who or what it waits on>

**Next**
1. <the most important action first>
```

- **Links on meaning, not IDs.** Link every issue and pull request on a short
  phrase that says what the work is, inside a normal sentence:
  "[Moved the gateways into Terraform](<url>)". Readers do not remember IDs,
  and link text should state its purpose (WCAG 2.2 success criterion 2.4.4).
  Add an ID only when readers must search for it. Usually one link per item is
  enough.
- **Outcomes, briefly.** One line per item where possible. State the result
  and, when it explains the item, the cause in one clause. Group the pull
  requests of one piece of work under one item.
- **Order.** In each section, put urgent and customer-facing items first.
- **Privacy.** Leave out customer names, contact details, and personal
  identifiers. Link to the record instead.
- End with at most one line that offers a check you did not run.

## Hand off

Show the draft to the user. To post it to a channel or tracker, use
`draft-and-post-team-updates`, which owns approval and posting. When it is not
available, post nothing until the user approves the exact text and target.
