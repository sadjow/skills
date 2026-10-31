---
name: commit-push-and-open-pr
description: Commit, push, and open or update a GitHub pull request for the current work, stopping at the step the request covers. Use for requests such as "commit and push", "open a PR", or "update the PR description"; not for deployments.
---

# Commit, Push, and Open PR

Carry the current change from the working tree to a reviewable pull request.
Each step publishes more than the one before it, so do exactly the steps the
request covers and report where you stopped.

## Set the stop point

Find the furthest step the request names:

| Request | Do | Stop before |
| --- | --- | --- |
| "leave it for me to review", "don't commit" | stage the change, show the diff summary and proposed message | committing |
| "commit" | verify and commit | pushing |
| "commit and push", "push" | verify, commit, and push | opening a pull request |
| "open a PR", or this skill invoked with no narrower request | everything above, then create or update the pull request | anything outside the pull request |
| "update the PR", "refresh the description" | rewrite the title or body of the existing pull request | other changes |

Request reviewers, add labels, mark a draft ready, or notify the team only when
the request or the project instructions name them. When a step fails, stop
there and report it rather than continuing to the next one.

## Read the project's conventions

Before the first write, read the repository instructions (such as `AGENTS.md`,
`CLAUDE.md`, and `CONTRIBUTING.md`) and recent `git log` output for:

- the branch policy: some repositories publish straight to the default branch;
  otherwise create a branch before committing on the default branch;
- the commit message style; without one, write a one-line Conventional Commit
  that describes the code change;
- the checks required before a commit or push;
- the tracker key format, labels, reviewers, and draft conventions for pull
  requests.

User-level instructions about commit and pull-request wording still apply.

## Commit only this task's change

1. Inspect `git status`, the staged and unstaged diff, and untracked files.
2. Stage the files that belong to this task by path. Avoid `git add -A` and
   `git commit -a` when the tree holds unrelated work; leave that work unstaged
   and mention it in the report.
3. Read the staged diff for secrets, personal paths, debugging output, and
   generated files the repository does not track.
4. Run the checks that cover the change, such as tests, type checks, linters, or
   a build, through the project's declared environment. A failing check stops
   the commit unless the user decides otherwise; show its output.
5. Make one commit per independent logical change when a reviewer would want to
   read them separately; otherwise make a single commit.
6. Do not amend, rebase, or force-push history that is already pushed unless the
   user asks.

## Push

- Set the upstream on the first push: `git push -u origin <branch>`.
- When the remote rejects the push because it moved, fetch and report the
  divergence. Integrate it the way the project prefers once the user agrees.
  Push rewritten history only with `--force-with-lease` and only when
  force-pushing is authorized.
- If a push is interrupted, compare `git ls-remote origin <branch>` with the
  local head before retrying.

## Open or update the pull request

1. Look for an existing pull request for the branch with
   `gh pr view --json number,url,title,body,isDraft,baseRefName`. Update it
   instead of opening a second one.
2. Take the base branch from the project instructions or the repository
   default, then read the whole branch: `git log <base>..HEAD` and
   `git diff <base>...HEAD`. Describe the branch as a whole, not only its latest
   commit.
3. Find the template in `.github/`, `docs/`, or the repository root
   (`pull_request_template.md`, or one of several in a `PULL_REQUEST_TEMPLATE/`
   folder). Keep its headings and checklists, answer each section, and tick
   only the items you verified.
4. Link the tracking item from the branch name, commits, or conversation in the
   form its integration recognizes, such as `Closes #123` or the tracker key.
   Ask when the template requires one and none is known.
5. Write the title and body with `$explain-and-present` when it is available.
   Otherwise lead with what changes for users or the system and why, then how it
   works, how it was verified, and its risks. Keep it short, and describe the
   final change rather than the session that produced it.
6. Add only what helps a reviewer judge the change:
   - a before and after table when behavior changes;
   - a small Mermaid diagram when a flow, state machine, or ownership changes;
   - screenshots or video for visible interface changes, attached with
     `$github-media-attachments` when it is available, or prepared for the user
     to upload;
   - a changelog grouped by area for a large branch.
7. Write the body to a file and run `gh pr create --title <title> --body-file
   <file>`, adding `--draft` when asked or when the project opens drafts by
   default. For an update, re-read the current body immediately before
   `gh pr edit --body-file <file>`. If someone changed it after you read it,
   merge their edits instead of overwriting them.
8. If creation is interrupted, check `gh pr list --head <branch>` before
   retrying so you do not open a duplicate.

## Report

Lead with the result: the pull request as a link that shows its number and
title, or the pushed branch and commit when you stopped earlier. Then give the
checks you ran and their outcome, the CI state from `gh pr checks`, any work
left unstaged, and the next step. Report CI as pending until it finishes.
