# LiveView forms, uploads, and recovery

## Contents

- [Stable forms](#stable-forms)
- [Auxiliary events and draft ownership](#auxiliary-events-and-draft-ownership)
- [Stateful wizard recovery](#stateful-wizard-recovery)
- [Auto-upload event isolation](#auto-upload-event-isolation)
- [Upload feedback](#upload-feedback)
- [Staging and durable processing](#staging-and-durable-processing)
- [Idempotency and reconnect](#idempotency-and-reconnect)

## Stable forms

- Drive templates from a `to_form` assign and the host project's form
  components.
- Give every form a stable, unique ID.
- Keep independently valid tasks in separate forms and context commands.
- Report errors only for fields the current task exposes, with programmatic
  association to the visible input.
- Keep success or failure near the initiating action.

LiveView's current form guide is
<https://phoenix-live-view.hexdocs.pm/form-bindings.html>.

## Auxiliary events and draft ownership

If authored fields remain browser-owned until submit, every auxiliary event
that can patch the form must carry the relevant current draft. Examples:

- geolocation;
- address or postal lookup;
- suggestion selection;
- preview;
- category or step choice;
- browser-derived locale or time zone.

Prefer a native form submitter intent where it fits. For a browser-only API,
serialize the relevant form immediately before pushing the event. Otherwise a
patch based on stale server assigns can silently restore old values.

Do not send mount-time browser defaults that can arrive after the user starts
typing. Write them to hidden controls locally and submit them with the next
intentional action.

## Stateful wizard recovery

LiveView automatically recovers forms with `phx-change` and a stable ID after
reconnect or remount. Stateful multi-step forms need a specialized recovery
event:

```heex
<.form
  for={@form}
  id="setup-wizard"
  phx-change="validate_step"
  phx-auto-recover="recover_wizard"
  phx-submit="save"
>
```

Keep the current step and every prior value required to rebuild the draft
inside the form. In the recovery handler:

- whitelist accepted fields;
- rebuild the changeset or form;
- validate that prerequisites allow the requested step;
- fall back to the earliest valid step;
- avoid triggering durable side effects.

Never put private draft data in query parameters merely to preserve it.

Test a real socket reconnect from a noninitial step. A reload or latency-only
test does not prove remount recovery.

## Auto-upload event isolation

LiveView normally recommends form-level `phx-change`, which sends the form's
fields together. An auto-upload form can require a narrower boundary when a
delayed form-wide change reply morphs the form before upload preflight and
discards the browser's native `File` objects.

In that failure mode:

- keep authored textarea and select state browser-owned until final submit;
- put the upload-specific `phx-change` on `<.live_file_input>` itself;
- keep the input within a form;
- handle the narrower upload payload separately;
- preserve one stable pending owner for the complete action.

The current form guide documents input-level `phx-change`, and the uploads guide
documents reactive entries:

- <https://phoenix-live-view.hexdocs.pm/form-bindings.html>
- <https://phoenix-live-view.hexdocs.pm/uploads.html>

Exercise the problematic ordering: edit an authored field and immediately call
`setInputFiles()` while latency is enabled. Do not test only after every prior
patch settles.

## Upload feedback

- Acknowledge local file selection immediately.
- Treat transfer progress as bytes actually sent, not merely a selected file.
- Keep submit unavailable until required entries complete.
- Distinguish transfer, processing, persistence, recovery, and terminal states.
- Keep the form shell stable through all stages.
- Consume and reset failed entries so a user can select a replacement.

LiveView may clear the native file input after accepting the selection. Capture
the expected local selection count in the browser input event, then relinquish
it when server-rendered entry counts acknowledge the selection. Do not treat a
later read of `input.files` as durable upload readiness.

## Staging and durable processing

Keep the `consume_uploaded_entries` callback bounded. Stage or copy the
completed temporary file and return. Perform decoding, transforms, object
storage, and long database work afterward through a bounded pipeline.

If accepted work must survive the originating socket:

- let the worker own processing and the final context mutation;
- use bounded supervision for short work with defined recovery;
- use a durable queue when host restart, delayed retry, or bulk backpressure is
  part of the guarantee;
- keep progress and terminal outcome in a durable lifecycle when the user must
  recover it.

## Idempotency and reconnect

Carry one canonical submission UUID through staging, processing, persistence,
recovery, and cleanup. Persist it in the browser for replay-prone
non-idempotent work and validate it before accepting the mutation.

On reconnect:

1. recover the lifecycle by that UUID;
2. restore progress or the terminal outcome;
3. keep the initiating action single-flight;
4. ensure retry cannot race an earlier attempt;
5. assert one durable result.

Do not log authored fields, filenames, addresses, contact data, exact
coordinates, or private object keys while diagnosing the lifecycle.
