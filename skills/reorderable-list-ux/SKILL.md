---
name: reorderable-list-ux
description: Design, build, or review manual ordering of items in a list by dragging and by accessible alternatives. Use for reorderable lists, drag handles, and move controls; not for sorting by a field, file drop zones, or free placement on a canvas.
---

# Reorderable List UX

Let people put items in the order they mean with a pointer, touch, keyboard,
voice, or screen reader, and keep that order correct when saves are slow, fail,
or race another editor. Dragging is an accelerator. Every move must also work
without it.

## Settle the contract

Before building or reviewing, establish:

- what the order controls, such as display order, priority, or a sequence, and
  who sees the result;
- whether a move saves at once or with an enclosing form;
- how long the list can get. Past roughly 20 items, add move to top and bottom
  or a position dialog so nobody presses a button dozens of times;
- whether other people or other tabs can change the same order;
- whether items only move within one list. Moves between lists, columns, or
  tree levels need a menu or dialog that names the destination; treat them as
  an extension of this contract.

## Give every row complete controls

- Give each row Up and Down buttons whose names include the item, such as
  `Move "Pay invoice" up`. Single-pointer buttons satisfy WCAG 2.5.7 Dragging
  Movements and work for keyboard, voice, and switch users without a drag mode.
- When rows already have a More menu, put the move outcomes in it instead of
  adding a second menu trigger to the row.
- At the ends, keep the unavailable button present and disabled rather than
  removing it, so the row layout and the Tab order stay stable.
- Keep the drag handle visible whenever reordering is a primary task. Use a
  six-dot grip, two columns of three. Three lines read as a menu.
- Drag only from the handle when the row has other controls or text people may
  select. Make the handle at least 24 by 24 CSS pixels (WCAG 2.5.8) and put
  `cursor: grab` and a hover background on the handle, not the whole row.
- A handle that only starts a pointer drag duplicates the buttons for
  assistive technology. Render it as a non-focusable element hidden with
  `aria-hidden`. A focusable handle must work on its own, such as by opening a
  move menu or entering a keyboard drag mode.
- Add a keyboard drag mode only on top of the buttons. Arrow-key modes clash
  with some screen reader modes, take many presses in long lists, and do not
  help touch or voice users.

## Keep focus on the moved item

- After a button move, keep focus on the same button of the moved item so
  repeated presses keep moving it.
- When the item reaches an end and that button becomes disabled, move focus to
  the item's other move button. A focused button that becomes disabled loses
  focus, and the browser falls back to the page body.
- When a render replaces the row's element, restore focus deliberately instead
  of relying on the browser or framework to keep it.
- When the reply can also move focus, such as after reloading a list that
  changed elsewhere, give focus one owner that applies both the press's request
  and the reply's at once. A framework focus helper that retries a frame later
  can undo the reply's focus.
- Scroll the moved item into view, instantly when reduced motion is requested.
- Highlight the moved row briefly so people who look away and back can see
  where it went.

## Report each result

- Announce through one status region that is already in the page before the
  first move. Name the item and its new position, such as
  `"Pay invoice" moved to position 2 of 6`. Add the old position when a move
  can jump, such as a drop or a move to top. When moves come faster than
  announcements, debounce by about 100 ms so only the latest is read.
- For saves that happen at once, show a visible confirmation near the list.
  A visible status line that is also the status region serves sighted and
  screen reader users with one message.
- For saves that happen with a form, say the order is saved with the form and
  mark the form as having unsaved changes.
- On failure, restore the last saved order, show an error-styled message with
  `role="alert"`, and offer a retry. Never leave an unsaved order on screen as
  if it were saved.
- Offer undo when a mistaken move is tedious to reverse.

## Move smoothly without delaying anyone

- Apply a drop or button move to the list at once and reconcile with the
  reply. Do not wait for the round trip to reorder rows.
- Slide displaced rows with a transform transition of about 100 to 200 ms,
  easing in and out. Transitions retarget when moves come quickly; keyframe
  animations restart.
- Never make a press wait for an animation. Where the same person reorders many
  times a day, shorten or drop the slide.
- Delay any pending indicator by about 150 to 300 ms, and once shown keep it
  for about 300 to 500 ms so it does not flicker.
- With reduced motion, drop the slide and the lift animation but keep the
  placeholder, the drop indicator, and the highlight as a color change.

Read [drag mechanics](references/drag-mechanics.md) before implementing or
reviewing pointer or touch dragging, the lifted row, the grip, or a keyboard
drag mode.

## Protect the saved order

- Save a move with a compare and set on the complete order the client last
  saw, or on an order version. Checking only which items are present lets an
  outdated view silently revert another editor's move. On a mismatch, reload
  the list and tell the person their move was not applied.
- Send a relative command, such as move up, with the item and the position or
  version it was drawn with. A control can receive focus or a click before the
  reply re-renders it, while it still carries the previous render's payload.
  The authoritative boundary ignores or rejects the command when the item is
  no longer there, so a fast second press never moves a neighbor.
- When a view can switch the list it shows in place, such as by choosing a
  parent record from a menu, the list is part of the drawn state. Send its
  identity with each move and ignore a move drawn for another list. An item in
  both lists can hold the same position in each, so the position check alone
  would pass. A drag keeps the identity it was grabbed under.
- Browser guards, such as disabling the buttons while a save is pending,
  improve responsiveness but do not replace the server check.

For network timing, duplicate submission, and reconciliation in general, use
[Web Interaction Resilience](https://github.com/sadjow/skills/tree/main/skills/web-interaction-resilience)
when installed. For LiveView patches, hooks, and focus, use
[Phoenix LiveView Interaction Resilience](https://github.com/sadjow/skills/tree/main/skills/phoenix-liveview-interaction-resilience).

## Verify

- Every move is possible without dragging, and every control's name includes
  its item.
- Repeated presses keep moving the same item. At the ends, focus moves to the
  other button and never lands on the page body.
- Two presses sent before the first reply never move a neighbor.
- A move sent just before the view switches lists never changes the newly
  shown list.
- With two views open, a move from the older view is rejected and its list
  reloads with an explanation. Focus lands on the moved item's control and
  stays there through the next frames.
- A failed save restores the order and raises an alert.
- Each move produces one announcement naming the item and its position.
- A click on the handle does not reorder anything. Escape and a drop outside
  the list restore the order. The list scrolls near its edges during a drag,
  and touch scrolling still works from the rest of the row.
- In every supported theme, the grip, focus ring, lifted row, highlight, and
  disabled buttons stay distinguishable, with 3:1 contrast where WCAG 1.4.11
  applies.
- The list reflows at 320 CSS pixels and works with reduced motion.

Reproduce the in-flight cases by capturing the payload a control carries before
the reply and sending it afterward. A hand-built payload can be refused by an
earlier check, so the test passes without reaching the check it names. Confirm
that each such test fails with its check removed.

Read [research and validation](references/research-and-validation.md) when
maintaining this skill or resolving a disputed recommendation.
