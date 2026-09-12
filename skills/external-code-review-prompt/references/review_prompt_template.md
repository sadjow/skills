# Review Prompt Template

Use this template when assembling the final external-review prompt.

```markdown
You are reviewing a code change without repository, GitHub, terminal, or file-system access. Treat the context below as the complete source of truth. Do not assume files not shown behave in any particular way.

Review goal:
- Find correctness bugs, behavioral regressions, edge cases, race conditions, and missing tests.
- Prioritize actionable findings. Avoid broad style feedback unless it hides a bug.
- Present findings first, ordered by severity.
- For each finding, include file path, line number, why it matters, and a concrete fix direction.
- Then list open questions, test gaps, and a short change summary.

Branch summary:
- ...

Base/head:
- Base: ...
- Head: ...
- Merge base: ...

Verification already run:
- ...

Important context included:
- ...

Important context omitted:
- ...

Raw artifacts:

...
```
