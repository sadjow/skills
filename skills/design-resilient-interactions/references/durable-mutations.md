# Durable mutations

Read this reference when a user-visible operation is replay-prone, can outlive
the current browser connection, performs expensive processing, or creates
partial durable resources.

## Give the operation one identity

Carry one canonical operation or submission identifier through:

1. browser submission;
2. staging;
3. queued or supervised work;
4. persistence;
5. reconnect recovery;
6. terminal success or failure;
7. cleanup.

Persist the identifier in the browser when the same non-idempotent intent may
be replayed after reconnect or retry. Validate it at the server boundary. Do
not derive it from mutable authored content.

## Separate lifecycle from resource state

Use a bounded lifecycle vocabulary such as:

- `started`;
- `progress`;
- `success`;
- `failure`.

Store domain resource state, retry state, recovery state, and cleanup state in
separate fields. A durable lifecycle record is appropriate when the user must
recover progress or a terminal outcome after the original connection vanishes.

## Own the work explicitly

- Use a durable queue when work must survive process or host termination,
  retry later, or apply backpressure.
- Use a bounded supervised task only for short interactive work whose durable
  ownership and recovery are already defined.
- Never fall back from a saturated bounded worker pool to unbounded process
  creation.
- Re-check the current attempt or ownership under the same lock used for final
  persistence. An older slow worker must not win after a retry takes ownership.

## Handle partial resources

Carry every created durable resource into returned errors, exceptions, and
exit handling so cleanup can discover it.

- Plan object identities before external writes when practical.
- Make cleanup idempotent and retryable.
- Keep the database inventory until external deletion succeeds.
- Use conservative, bounded reconciliation for abandoned claims.
- Do not describe best-effort compensation as durable recovery.

## Commit before external side effects

Defer broadcasts, notifications, webhooks, and similar external effects until
the outermost transaction commits. If a nested operation suppresses its normal
broadcast, the outer caller must emit the equivalent effect immediately after
successful commit.

A rolled-back mutation must never appear to subscribers as accepted.

## Recover honestly

On reconnect:

1. query the durable lifecycle by the canonical operation identifier;
2. resume showing current progress or the terminal outcome;
3. preserve single-flight ownership;
4. allow retry only when the lifecycle says the prior attempt no longer owns
   the operation;
5. avoid creating a second durable result.

Define a conservative stale-work policy based on durable progress, not merely
socket disappearance.

## Keep observability privacy-safe

Record only operational fields needed to diagnose the lifecycle:

- correlation or operation ID;
- lifecycle record and attempt;
- stage;
- bounded item counts;
- duration;
- safe outcome or reason code.

Do not log authored content, filenames, contact details, raw addresses, exact
coordinates, private storage keys, request bodies, or exception messages that
may contain user data. Capture a safe exception class and application-owned
code location where appropriate.

## Validate the boundary

Test:

- rapid duplicate submission;
- disconnect during processing;
- reconnect with the same operation identifier;
- retry after a bounded failure;
- an earlier worker completing after a newer attempt;
- partial external-resource failure and cleanup retry;
- transaction rollback without broadcast;
- one durable result or one actionable error, never a blank state or duplicate
  resource.
