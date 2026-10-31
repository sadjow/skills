# Cold-reader test

The test shows whether a name works when it is all a reader sees, as in a
skill listing whose descriptions were shortened or dropped.

## Prepare

- **The reader.** Someone who has not seen the skill, its description, or this
  conversation: a fresh subagent, a separate session, or a person.
- **The names.** Every name that will be loaded together: installed skills,
  plugin skills, and the client's built-in commands, one per line, without
  descriptions. Include the candidate without marking it.
- **The requests.** Three to six requests in the users' own words: at least two
  the skill should handle, one near-miss that belongs to its nearest neighbor,
  and one that no skill covers.

Test one candidate per run, so the reader judges each name on its own instead
of comparing candidates side by side.

## Prompt

```text
You are choosing which skill to load for each request. You can see only these
skill names:

<names, one per line>

For each request, answer with the one name you would load, or "none" when no
name fits, and one sentence on why. Then list any names whose purpose you
could not guess.

1. <request>
2. <request>
3. <request>
```

## Read the result

The candidate passes when the reader picks it for its own requests, picks the
neighbor for the near-miss, answers "none" for the uncovered request, and does
not list it as unclear.

When it fails, look at the reader's reason. A reason that misreads a word
points to the name: try another candidate. A reason that confuses the skill
with a neighbor's job points to the scope: return to "When no name fits,
refine the skill".
