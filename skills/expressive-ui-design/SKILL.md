---
name: expressive-ui-design
description: Design distinctive web interfaces through typography, composition, color, and visual detail. Use when visual direction or interface craft is the main task.
---

# Expressive UI Design

Turn aesthetic direction into a coherent component system that people can use.
Honor visual ambition. Establish composition and interaction language before
adding isolated effects to the existing boxes.

## Establish the design contract

Inspect the actual page, implementation, references, and tokens. Capture a
baseline when comparing an existing design. Name the actor, task, information
scope, critical decision, and recovery path. Separate observed behavior from
a stakeholder preference or usability hypothesis.

Write a compact direction connecting form to use. For example, precise type
and layered surfaces can separate decisions from reference evidence, while a
luminous edge emphasizes selected controls. Choose a recognizable signature
in composition, type, surface, or motion, then coordinate the other choices.
A gradient on every panel is insufficient when hierarchy is the problem.
Do not require a fixed theme, palette, font, card layout, or number of effects.

## Make information architecture intuitive

Map the ordinary path from orientation to finding an object, understanding its
state, and opening evidence or taking action. Position controls in that order.
Keep a stable route to reference data and advanced controls.

For each prominent component, name its question, scope, and useful next action.
Decorative counts do not earn priority just because they make attractive cards.
For actionable counts, decide whether they describe all records, search matches,
or active results; preserve the intended filters and expose selected state.

Keep absence of evidence, measured failure, connection state, and historical
observations distinct when the domain distinguishes them. An idle shimmer must
not resemble a live signal, pending operation, or health assessment.
Use role-aware product UX when actors or information priorities compete.

When numbers take effort to compare, use a small, directly labelled chart tied
to the reader's question. State units, denominator, time, and filter scope.
Use a shared scale for compared values; a total count is not evidence that the
expected identities matched. Keep missing measurements distinct from zero and
retain readable values without color, hover, animation, or scripting. Add a
trend only when comparable historical observations support it.

After the user accepts a visual direction, refine density without reopening the
theme. Inspect how much viewport space precedes the first useful evidence and
how many objects can be compared. Reclaim oversized headings, repeated labels,
empty-state panels, and stacked metadata before reducing text or hit targets.
Use wider screens for related information side by side; preserve the reading
order when it stacks. Retain whitespace that separates tasks or supports the
explicitly requested reading pace. Compactness is not a universal objective.

## Make typography part of the design

Inspect the rendered font, loaded weight, width, size, line height, and contrast.
Diagnose narrow faces, tight tracking, light weights, small secondary labels,
and fallback rendering before changing families. Increasing size alone may
not repair a cramped typeface.

Give frequent reading and decision text the strongest legibility. Reserve
display treatments for short headings that survive real content. Check long
names, identifiers, timestamps, similar glyphs, and localized labels. Use
tabular figures for comparisons when supported. Consequential metadata must
remain readable even when it has less emphasis.

Check contrast in all relevant states. Gradient endpoints are useful evidence,
not proof of the worst rendered contrast with interpolation, transparency,
imagery, or moving light. Do not prescribe a universal font-size minimum in
place of reviewing the actual reading conditions and accessibility contract.

## Design components across time

Specify each touched component's trigger, visual response, duration, end state,
interruption behavior, and reduced-motion equivalent. Read
[component states and motion](references/component-states.md) for animated
borders, buttons, tabs, cards, and transitions.

Coordinate light direction, border strength, corner scale, shadow softness,
and elevation. Separate attractive containers from clickable controls. A whole
card must not suggest an action if only an internal link works.

Give inputs and selects the same deliberate visual treatment as buttons and
navigation. Keep labels visible, text editing predictable, and validation near
the field. Choose a styled native control or progressive custom presentation
from the interaction contract, rather than accepting an unstyled browser default
or rebuilding every widget. A custom popup must own focus, keyboard and touch
selection, dismissal, and viewport positioning while preserving submitted
values and the applicable native fallback. Reuse accessible-interaction and
semantic-input guidance for those behavior contracts.
For operational dates, keep displayed time zones and calendar-filter boundaries
consistent with the domain context, including daylight-saving changes.

Keep acknowledgement immediate. Motion must not delay navigation, validation,
state updates, or access to content. Distinguish focus, press, selection,
pending, and disabled states. A glow cannot replace stable focus or truthful
progress. Use CSS where it expresses the effect clearly; add a motion library
only when choreography or interruption needs justify it.

## Prove the result in use

Exercise the dominant task, recovery, keyboard and touch paths, narrow layout,
long content, text enlargement, reduced motion, and forced colors as relevant.
Check no-JavaScript, reload, and reconnect against the product contract, without
inventing requirements for a client application that never supported them.

Verify interruption and the settled state. Check that decoration stops or has
the required control, and focus remains visible after motion ends. Inspect
painting and dropped frames on dense screens before claiming performance.

Retain focused behavior regressions for defects found during refinement. Avoid
brittle assertions for every radius or gradient stop. Capture useful before
and after screenshots and a short interaction recording; attach them when
external delivery is already authorized.

Report actual visual decisions, information changes, typography findings,
state behavior, and verification limits. Read
[research and validation cases](references/research-and-validation.md) when
maintaining this skill or resolving a disputed recommendation. General layout,
role-aware information selection, and accessibility retain their existing
workflow owners. Attractive screenshots do not prove improved task success.
