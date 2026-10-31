# GitHub review threads

Commands for the GitHub CLI (`gh`). Replace `OWNER`, `REPO`, and `NUMBER`, or
let `gh` fill `{owner}` and `{repo}` from the current repository where noted.

## Read

Unresolved review threads, with every comment in each thread. `--paginate`
follows the `$endCursor` variable through all threads:

```bash
gh api graphql --paginate \
  -F owner=OWNER -F repo=REPO -F number=NUMBER \
  -f query='
query($owner: String!, $repo: String!, $number: Int!, $endCursor: String) {
  repository(owner: $owner, name: $repo) {
    pullRequest(number: $number) {
      reviewThreads(first: 100, after: $endCursor) {
        pageInfo { hasNextPage endCursor }
        nodes {
          id
          isResolved
          isOutdated
          path
          line
          originalLine
          comments(first: 100) {
            nodes { databaseId author { login } body url createdAt }
          }
        }
      }
    }
  }
}' \
  --jq '.data.repository.pullRequest.reviewThreads.nodes[] | select(.isResolved | not)'
```

`line` is null for an outdated thread; `originalLine` keeps the line the
comment was written against. Keep the thread `id` for replying and resolving.

Reviews, top-level comments, the head commit, and the review decision:

```bash
gh pr view NUMBER --json headRefOid,reviewDecision,reviews,comments
```

Check results, including the failing jobs:

```bash
gh pr checks NUMBER
```

## Write

Each of these is an external action. Run it only within the authorized scope.

Reply in a thread, with the body saved in a file first:

```bash
gh api graphql \
  -F threadId=THREAD_ID -F body=@reply.md \
  -f query='
mutation($threadId: ID!, $body: String!) {
  addPullRequestReviewThreadReply(input: {pullRequestReviewThreadId: $threadId, body: $body}) {
    comment { url }
  }
}'
```

Resolve a settled thread:

```bash
gh api graphql -F threadId=THREAD_ID -f query='
mutation($threadId: ID!) {
  resolveReviewThread(input: {threadId: $threadId}) { thread { isResolved } }
}'
```

Re-request review from people who already reviewed:

```bash
gh pr edit NUMBER --add-reviewer LOGIN
```

Treat a reply as posted only when GitHub returns its URL. After an interrupted
write, re-run the read query and check the thread before retrying.
