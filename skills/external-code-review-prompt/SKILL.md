---
name: external-code-review-prompt
description: Prepare a self-contained code-review prompt and context for an external reviewer without repository access. Use when exporting code and evidence for review in another model or tool.
---

# External Code Review Prompt

## Goal

Produce a single prompt that lets an external reviewer evaluate a branch without access to the repo. Include the diff, changed-file contents, relevant non-diff context, tests run, environment assumptions, and clear review instructions.

Default to an independent review pack: include neutral context and raw artifacts, not your own suspected bugs. If the user asks to include prior findings, label them as prior review notes.

## Workflow

1. Identify the review target.
   - Prefer explicit PR/branch/base from the user.
   - For GitHub PRs, get `baseRefName`, `headRefName`, title, and commit list with `gh pr view`.
   - If no base is provided, infer it from PR metadata, upstream tracking, or `git merge-base` with the default branch.

2. Collect raw artifacts.
   - Run `scripts/collect_review_context.py` from this skill to gather metadata, diffstat, full diff, changed-file contents, and reference-search hits.
   - Add `--extra` files for important context not touched by the diff: config schema, callers, domain docs, fixtures, tests, build files, or runtime entry points.
   - If the output is too large, keep the diff and the smallest complete source excerpts needed to reason about behavior. Summarize omitted bulky generated files.

3. Add human context.
   - Explain the branch goal in 3-8 neutral bullets.
   - State base/head commits and whether the worktree was clean.
   - Include test commands and exact pass/fail results.
   - Include reproduction commands, logs, or observed behavior when they are relevant.
   - Include constraints the reviewer should honor, such as “find bugs first,” “do not suggest broad refactors,” or “focus on runtime regressions.”

4. Build the paste-ready prompt.
   - Put instructions first, then repository context, then artifacts.
   - Tell the external reviewer they cannot ask for missing files unless something truly essential is absent.
   - Ask for findings ordered by severity with file/line references, then open questions, then test gaps.
   - Use fenced code blocks for long diffs and source excerpts.

5. Verify before handing off.
   - Check that every changed file is represented by either full content, a diff, or an explicit omission note.
   - Check that non-diff dependencies needed to understand the changed code are included.
   - Check that line references use current HEAD line numbers where possible.
   - Check that the prompt does not include secrets, tokens, private credentials, or irrelevant local noise.

## Helper Script

Run from the repository root:

```bash
python3 /path/to/installed/skill/scripts/collect_review_context.py \
  --base origin/main \
  --out /tmp/review-context.md \
  --extra path/to/important_context.clj \
  --extra docs/relevant.md
```

Useful options:

- `--pr 294`: include GitHub PR metadata when `gh` is available.
- `--base <rev>`: compare against a specific base ref.
- `--head <rev>`: compare a specific head, default `HEAD`.
- `--extra <path-or-glob>`: include additional non-diff files.
- `--max-file-bytes <n>`: cap individual full-file excerpts.
- `--max-rg-matches <n>`: cap reference-search output.

The script is a collector, not the final answer. Read its output and add judgment: architecture notes, missing but relevant files, test interpretation, and final instructions.

## Prompt Shape

Use this structure:

```markdown
You are reviewing a code change without repository access. Treat the context below as the complete source of truth.

Review goal:
- Find correctness bugs, regressions, edge cases, and missing tests.
- Prioritize actionable findings over style comments.
- Report findings first, ordered by severity, with file/line references.

Branch summary:
- ...

Repository and PR metadata:
- ...

Verification already run:
- ...

Important review context:
- ...

Raw artifacts follow.

<paste collected context>
```

## Context Selection Rules

Include non-diff code when it is needed to answer at least one of these:

- What calls the changed function?
- What invariants does the changed code depend on?
- How is user input parsed into this path?
- What tests already cover this behavior?
- What configuration, fixture data, or runtime process changes behavior?
- What docs or presets encode user-facing contracts affected by the change?

Avoid dumping the entire repo. Prefer complete files for small, central modules and targeted excerpts for large peripheral files.
