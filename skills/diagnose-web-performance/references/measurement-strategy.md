# Web performance measurement strategy

## Contents

- [Define the claim](#define-the-claim)
- [Field and lab evidence](#field-and-lab-evidence)
- [Core Web Vitals](#core-web-vitals)
- [Journey marks](#journey-marks)
- [Controlled comparisons](#controlled-comparisons)
- [Evidence hierarchy](#evidence-hierarchy)

## Define the claim

Use a statement that can be replayed:

```text
For [journey] on [device/network/data condition], the user waits [measured
interval] before [observable feedback or outcome]. The target is [budget or
behavior], while preserving [correctness and accessibility invariants].
```

Initial load, next-paint feedback, request completion, and durable completion
are different intervals. Name the one being improved.

## Field and lab evidence

Field evidence answers how real users experience the product. Lab evidence
helps reproduce and attribute a problem under controlled conditions.

Prefer:

- field percentiles segmented by mobile and desktop;
- browser performance traces;
- server spans and query timings joined by privacy-safe correlation;
- resource timing and selected asset evidence;
- Playwright traces and videos for temporal UI behavior;
- representative low-end hardware and constrained networks.

Do not present desktop emulation on a fast development machine as a real mobile
performance result.

## Core Web Vitals

The current Core Web Vitals cover:

- Largest Contentful Paint (LCP) for loading;
- Interaction to Next Paint (INP) for responsiveness;
- Cumulative Layout Shift (CLS) for visual stability.

The published “good” thresholds are LCP at or below 2.5 seconds, INP at or below
200 milliseconds, and CLS at or below 0.1, evaluated at the 75th percentile and
segmented across mobile and desktop. Verify current definitions before turning
them into a long-lived gate:

<https://web.dev/articles/vitals>

Core Web Vitals do not replace journey-specific marks. A save, search, upload,
or reconnect flow needs start, local-feedback, accepted, and terminal marks
that correspond to user intent.

## Journey marks

Record marks such as:

- input received;
- first local visual acknowledgement;
- request sent;
- first response bytes or socket acknowledgement;
- authoritative UI reconciled;
- durable background work completed;
- focus restored.

Use the same mark definitions before and after a change. Never move a mark to
make a comparison look better.

## Controlled comparisons

Hold stable where practical:

- route and user task;
- synthetic data volume;
- authentication state;
- browser version and engine;
- viewport and input mode;
- device or CPU throttle;
- latency, bandwidth, and packet loss;
- cold or warm cache;
- build mode and observability overhead.

Run enough samples to see variability. Report the distribution or at least
median and tail behavior, not only the best run.

For a framework or architecture comparison, include implementation,
localization, authentication, error, SEO, deployment, observability, and
maintenance costs. A faster isolated component is not automatically a faster
or simpler product.

## Evidence hierarchy

Use the strongest available evidence:

1. representative field data tied to the journey;
2. controlled reproduction on representative hardware/network;
3. trace with server and resource correlation;
4. local emulation;
5. code inspection and reasoned inference;
6. framework reputation or anecdote.

Lower levels can form a hypothesis but should not support a sweeping
architecture claim alone.
