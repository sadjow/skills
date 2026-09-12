# Research and validation

Researched 2026-09-11. Refresh browser capability claims before prescribing a
dependency or excluding a browser. Individual brand conventions below are not
universal requirements.

## Foundations

- [Carbon motion](https://carbondesignsystem.com/elements/motion/overview/) distinguishes routine task motion from expressive moments. Coordinate rhythm and reserve stronger movement for selected moments; its exact curves belong to its own system.
- [Carbon type sets](https://carbondesignsystem.com/elements/typography/type-sets/) separates productive and expressive typography. Examine reading roles without requiring Carbon fonts or tokens.
- [Carbon simple charts](https://carbondesignsystem.com/data-visualization/simple-charts/) explains bar comparisons; [direct labels](https://carbondesignsystem.com/data-visualization/legends/) reduce the need to decode a separate legend. Choose the chart from the reader's question and the actual data contract.
- [WCAG contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) explains the 4.5:1 normal-text and 3:1 qualifying large-text criteria and exceptions. Check relevant rendered states.
- [WCAG pause, stop, hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) is Level A. Its moving-content conditions differ from auto-update conditions. The five-second condition is not permission for distracting or flashing effects.
- [WCAG animation from interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) is Level AAA. Honor applicable reduced-motion product requirements while accurately stating this criterion's conformance level.
- [web.dev animation performance](https://web.dev/articles/animations-guide) explains rendering costs and inspection. Prefer transform and opacity for routine motion; measure paint-heavy treatments.
- [MDN typed custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@property) documents registration. Treat animated gradients as progressive enhancement with a static border and visible focus.

## Promotion decision

Repeated visual coaching exposed a gap between general usability guidance and
an expressive component system. The reusable decision is to establish visual
direction, reading hierarchy, and component states together before adding
effects. This conditional workflow belongs in an on-demand skill.

Canonical owner: personal Home Manager skill source. General UI layout,
role-aware information selection, and accessibility retain their existing
owners. Project findings stay in repository design evidence; this skill keeps
only the portable method. No project runtime dependency or vendored copy is
required. Refresh this source deliberately from public research and abstracted
feedback; never copy private project details into it.

## Maintainer replay cases

These are reasoned replays in the current agent, not a user study or independent
forward evaluation. Do not load them for ordinary UI work.

| Case | Expected decision | Assessment |
| --- | --- | --- |
| Operations page requests expressive cards, clearer type, and animated states | Review tasks and text; create a coherent component/state language; retain truthful status and static access | Covers the original decision gap without prescribing its theme |
| Light scheduling app requests refined controls and appointment transitions | Preserve its theme; focus on selection, interruption, and stable reading | Transfers without copying palette or entity layout |
| Billing calculation bug with no design request | Fix calculation behavior without an aesthetic redesign | Stays outside the trigger |
| User requires an existing plain design kit | Improve readable states within that direction | Explicit design direction overrides stylistic examples |
| User requests persistent idle border motion | Evaluate duration, distraction, pause controls, and reduced motion | Avoids a universal ban or a false compliance claim |
| User accepts the appearance but finds too little useful content visible | Preserve the visual direction; reclaim redundant structure before shrinking type or controls | Extends the original refinement loop without turning taste into a fixed density rule |
| A planning board has attractive cards with repeated metadata and tall empty states | Group metadata and simplify empty cards, then verify reading order on a phone | Transfers the density decision across domains |
| An editorial page deliberately uses generous pacing | Keep its reading rhythm unless the user asks to change it | Density guidance remains conditional |

Also inspect links, metadata, discovery registration, and unintended disclosure.
Prose review cannot establish downstream aesthetic quality or task efficiency.
