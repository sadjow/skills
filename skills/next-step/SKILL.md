---
name: next-step
description: Tell the user where the current work session stands and the one recommended next step, including whether it needs them or the agent can continue. Use when they ask what's next or what to do now, or come back to a session they lost track of.
---

# Next Step

The person asking is running several agent sessions at once and has just come
back to this one. They no longer hold its details in mind. Answer so that ten
seconds of reading tells them what this session is doing, whether it needs
them, and what to do or say next.

The question is not a go-ahead. Answer it and stop. Start the step only when
they say so.

Text after the command narrows the question, for example to one part of the
work.

## Check the state before answering

A long session's picture of itself goes stale. Earlier turns get summarized,
background work finishes, and other sessions or people change the same
repository. Recommend from what is true now, not from what you remember doing.

- Reread the original request and any later change of scope. The work is
  measured against that, not against the last thing you did.
- Run the cheap, read-only checks this work depends on: uncommitted and
  unpushed changes, the tests or build you last reported, the state of the pull
  request, pipeline, or deploy, and any background task or delegated agent.
- Look back for anything still waiting: a question you asked that got no
  answer, an approval you need, a step you said you would do later, a failure
  you set aside.

Change nothing while checking. State what you checked as fact and mark the
rest as unverified.

## Choose the step

Answer two questions separately, because the person is deciding whether this
session needs their attention now.

**What waits on them?** An unanswered question, an approval, or a step only
they can do, such as a login, a review, or a merge. Give the question again
with your recommended answer, or the exact command or link. When nothing waits
on them, say "nothing".

**What happens next?** The first of these that applies:

1. **Something they were told is done is not.** A failing check, or a result
   reported earlier that no longer holds.
2. **Part of the request is unfinished.**
3. **The work is finished but not delivered.** Whatever this project's flow
   still calls for: verify, commit, push, open or update the pull request,
   deploy, clean up.
4. **Nothing is left.** Say that the work is finished and the session can be
   closed.

Recommend one step and say who does it. Say whether it can start now or
depends on their answer. When two paths are open, pick one and give the
trade-off in a clause. Do not invent work to have something to offer: an
optional improvement is not a next step, so mention at most one, labeled
optional, and only when it is worth their time.

## Answer in this shape

```markdown
**<the work, in a few words>:** <where it stands, in one sentence>

**Needs you:** <the question and your recommended answer, the command, or the link; or "nothing">
**Next:** <the step, who does it, and whether it waits on their answer>
**Then:** <at most two later steps, in order, each saying who acts>
**Loose ends:** <unverified, uncommitted, unpushed, or still-running items not covered above>

<the shortest reply that moves the work forward, such as: Say "go" and I'll fix the test.>
```

- Leave out `Then` and `Loose ends` when they would be empty. An item already
  named on a line above is not a loose end.
- Use the words the user used for the work. Link pull requests, issues, and
  runs on a phrase that says what they are.
- Keep it to about ten lines. Do not retell the session; the first line is the
  only recap.
