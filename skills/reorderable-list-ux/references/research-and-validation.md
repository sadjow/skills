# Research and validation

Researched 2026-09-23. Community skills served as leads; each rule kept here was
checked against a standard, a design system, or published research. Values from
one design system are examples, not universal requirements.

## Standards

- [WCAG 2.5.7 Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html) (AA) requires a single-pointer way to do anything done by dragging. Up and Down buttons or a move menu meet it.
- [WCAG 2.5.8 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) (AA) sets the 24 by 24 CSS pixel floor used for handles and move buttons.
- [WCAG 1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) (AA) applies 3:1 to the grip, focus indicator, and state cues that people need to perceive.

## Design systems and research

- [Atlassian drag and drop design guidelines](https://atlassian.design/components/pragmatic-drag-and-drop/design-guidelines): an always visible handle when dragging is primary, handle-only dragging when rows hold other controls, a 24 px handle target, an unrotated preview, a dimmed original, a 2 px drop indicator, an optimistic update, and a 700 ms flash on the moved item.
- [Atlassian drag and drop accessibility guidelines](https://atlassian.design/components/pragmatic-drag-and-drop/accessibility-guidelines): visible controls for every outcome, one action trigger per item, names that include the item, announcements with the item and its positions, and focus returned to the trigger, restored by hand when it remounts. It advises against arrow-key movement.
- [Primer drag and drop pattern](https://primer.style/accessibility/patterns/drag-and-drop/): several ways to move an item, the six-dot grab icon, keyboard drag keys, `role="application"` scoped to the active handle, 100 ms announcement debouncing, specific success messages, instant scrolling under reduced motion, and visual cues for what moved, from where, and to where.
- [Nielsen Norman Group on drag and drop](https://www.nngroup.com/articles/drag-drop/): handle icons are not universal and resemble menu icons, displaced items move over about 100 ms with easing, reshuffling triggers when the dragged item's center reaches a neighbor's edge, and touch dragging needs room, a delay to tell grabs from scrolls, and often a menu alternative.
- [Apple Human Interface Guidelines, drag and drop](https://developer.apple.com/design/human-interface-guidelines/drag-and-drop): a drag image after about three points of movement, autoscroll in the destination, a placeholder while a slow transfer finishes, undo, and menu alternatives.
- [Smart Interface Design Patterns on drag and drop](https://smart-interface-design-patterns.com/articles/drag-and-drop-ux/): resting, lifted, moving, dropped, failed, and successful states; undo; and a move-to action on mobile.
- [Material 3 list tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/latest/sass/_md-comp-list.scss) lift a dragged list item to elevation level 4, and the [reorder tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/latest/sass/_md-comp-list-reorder.scss) color its shadow with the system shadow color. [Material 3 motion tokens](https://github.com/material-components/material-web/blob/main/tokens/versions/latest/sass/_md-sys-motion.scss) put short durations at 50 to 200 ms.
- [Fluent light](https://github.com/microsoft/fluentui/blob/master/packages/tokens/src/alias/lightColor.ts) and [dark](https://github.com/microsoft/fluentui/blob/master/packages/tokens/src/alias/darkColor.ts) color tokens keep shadows black in both themes and roughly double their opacity in the dark theme.

## Community leads

- [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines): optimistic updates with rollback or undo, a delayed and minimum-duration pending indicator, clean drags without text selection, and gesture alternatives. Its preference for APCA contrast conflicts with the WCAG 2.2 AA contract and was not adopted.
- [Emil Kowalski's skills](https://github.com/emilkowalski/skills): no animation for very frequent keyboard actions, ease-in-out for movement on screen, UI motion under 300 ms, transitions over keyframes for rapidly repeated changes, pointer capture, and ignoring extra touches during a drag.
- [make-interfaces-feel-better](https://github.com/jakubkrehel/make-interfaces-feel-better): a faint light ring for depth on dark surfaces, where layered shadows disappear.

## Resolved conflicts

- Primer describes keyboard dragging with arrow keys; Atlassian advises against arrow-key movement. Buttons or a move menu are required here, and a keyboard drag mode is optional on top of them.
- Atlassian asks for the old and new position in every message; Primer favors brevity in long lists. A one-step move implies its old position, so messages add it only for jumps.
- Community guidance to prefer APCA does not change the WCAG 2.2 AA requirement.
- The roughly 20-item threshold for move to top or a position dialog, flipping focus to the other button at the ends, and sending relative commands with their drawn position and, when the view can switch lists, the list's identity come from review reasoning, not a cited source. Revisit them when evidence contradicts them.
- One focus owner for the press and the reply comes from a browser reproduction, not a cited source: a framework focus command retried two animation frames after the press and undid the focus a faster reply had returned to the moved item.

## Promotion decision

A review of a production admin reorder feature found that immediate saves had
no visible confirmation, a quick second press could move the neighboring item,
the lifted row glowed in the dark theme, and the handle resembled a menu icon.
A later flow review found that a move drawn for one list could reorder another
list that the same view switched to, when a shared item held the same position
in both. The skills collection had no owner for reordering; its only examples
used deprecated ARIA drag attributes. The portable method belongs in this
on-demand skill.

Canonical owner: this skill in the personal skills repository. General timing,
single-flight, and reconciliation rules stay in Web Interaction Resilience;
LiveView patch and focus mechanics stay in Phoenix LiveView Interaction
Resilience. Projects may keep an adapted snapshot that records this skill's
revision, the project owner, and the sync direction. Refresh this source from
public research and abstracted project findings; never copy private project
details into it.

## Maintainer replay cases

These are reasoned replays in the current agent, not a user study or independent
forward evaluation. Do not load them for ordinary UI work.

| Case | Expected decision | Assessment |
| --- | --- | --- |
| Admin list of display categories that saves each move at once | Buttons plus handle, visible and announced confirmation, compare and set, moves carry the drawn position | Covers the original findings |
| Image order inside an edit form, saved with the form | Same controls; the message says the order is saved with the form; no per-move request | Transfers to deferred saves |
| Per-group order where a menu switches the group in place | Moves carry the group they were drawn for; a drag keeps the group it was grabbed under; a move drawn for the previous group is ignored | Transfers to a list redrawn for another collection |
| Board with cards moving between columns | Move menu or dialog naming the destination; drag as an accelerator | Marked as an extension, not forced into one-list rules |
| Priority list of 200 items | Move to top and bottom or a position dialog; announcements include the old position for jumps | Covers long lists |
| Mobile-first list | Move menu or buttons first; handle-only touch drag with press and hold | Keeps touch scrolling intact |
| Table sorted by clicking a column header | Out of scope; use table sorting guidance | Stays outside the trigger |

Also inspect links, metadata, discovery registration, and unintended disclosure.
Prose review cannot establish downstream task success.
