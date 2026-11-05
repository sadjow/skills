---
name: describe-pr-in-one-paragraph
description: Write or rewrite a pull request description as the tracking link plus one short plain paragraph about the diff, and publish it to the pull request. Use only when invoked by name; for structured descriptions or for committing and opening the pull request, use the other pull-request skills.
disable-model-invocation: true
---

# Describe a PR in One Paragraph

Reviewers skim a sectioned template and often skip it. A short paragraph that
opens with what the change lets them do gets read. This skill writes that
paragraph and puts it on the pull request.

## Gather the facts

1. Find the pull request: the number or URL the user gave, or the current
   branch's with `gh pr view --json number,url,title,body,baseRefName`. When
   none exists, return the paragraph instead of publishing it. Open the pull
   request only when the user asked for that, with `commit-push-and-open-pr`
   when it is installed or `gh pr create --body-file <file>` otherwise.
2. Read the whole branch against its base, `git log <base>..HEAD` and
   `git diff <base>...HEAD`, and describe the branch as a whole, not its
   latest commit.
3. Collect the evidence that the change works: tests or checks that ran in this
   task and what they showed. Claim only verification that happened.
4. Find the tracking item from the branch name, commits, title, or current
   body. Keep the link format the repository's template or tracker integration
   recognizes, and keep any machine-read line such as `Closes #123`.

## Write the paragraph

The body is the tracking link on its own line when one exists, a blank line,
then one paragraph of three to six sentences in this order:

1. What the change does and what it lets the reader or the users do. Start
   with the verb: "Adds", "Fixes", "Removes".
2. What is wrong or missing today, when the first sentence does not already
   make it clear.
3. How it works, only as deep as a reviewer needs to judge it.
4. Its scope or risk, only when the change itself does not make that obvious:
   what it leaves untouched, or the one thing a reviewer must check.
5. How it was verified, stated as results rather than steps.

Leave out:

- requests every pull request implies, such as "please review and merge";
- how the commits were made: skipped hooks, rebases, retries, earlier drafts,
  and conversation history;
- what the reader can infer from the first sentence or the diff;
- headings, bullet lists, checklists, and file-by-file changelogs.

Use the reader's words, plain verbs, and one name for each thing. When
`explain-and-present` is installed, apply it to the wording; this skill fixes
the shape. Invoking this skill chooses this shape over a repository's sectioned
template, except for lines the template marks as required by tooling.

Report problems found along the way that are not part of the diff, such as a
check that fails on the base branch, to the user instead of putting them in the
description.

## Example

```markdown
[Issue OPS-142](https://tracker.example.com/issue/OPS-142)

Adds an SSH entry for the `edge-01` server so you can reach it from your laptop
with `ssh -F .ssh/config edge-01`. Today only the deploy controller can. It
goes through the production bastion as the deploy user, like the other
servers, and includes the server's host key so the first connection doesn't
prompt. Tested: login and passwordless sudo work.
```

## Publish

1. Write the body to a temporary file.
2. Read the current body again just before editing. When someone changed it
   after you first read it, merge their edits or ask before replacing them.
3. Run `gh pr edit <number> --body-file <file>`. Change the title only when
   asked.
4. Read the body back with `gh pr view <number> --json body` to confirm it
   published.

## Report

Lead with the pull request as a link showing its number and title, then the
paragraph as published, then anything left out that the user may want to track
elsewhere.
