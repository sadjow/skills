# Drag mechanics

The move buttons remain the complete, accessible path. Dragging is the faster
path for pointer and touch users, so it must never be the only way to move an
item or leave the list in an unclear state.

## Start a drag deliberately

- Drag from the handle when the row has other controls or text people may
  select. Making the whole row draggable blocks text selection inside it.
- Lift the row only after the pointer moves a few pixels, about 3, so a click
  or tap on the handle reorders nothing. Apple shows a drag image after about
  three points.
- Capture the pointer once the drag starts so tracking continues outside the
  row, and ignore extra pointers so a second finger cannot make the row jump.
- Set `touch-action: none` on the handle only, so people can still scroll the
  list from the rest of the row. If the whole row must drag on touch, require a
  press and hold before lifting so a scroll never grabs a row.
- Give touch handles room: at least 24 by 24 CSS pixels, and closer to 44 on
  touch-first screens. On phones, a move menu is often less error prone than
  dragging.
- Suppress text selection for the duration of the drag. If the dragged row is
  made `inert` to stop hover and selection, it can no longer hold focus; decide
  where focus goes after the drop.
- Close open menus and popovers in the list when a drag starts.

## Show the drag in progress

- Lift the moved row with a shadow. Keep it under the pointer at the point
  where it was grabbed, and do not rotate it.
- Keep the row's space with a placeholder, or leave the original row in place,
  dimmed (Atlassian uses 40% opacity), while a separate preview moves.
- Reshuffle the other rows live, or draw a drop indicator line between rows,
  such as a 2 px line with a small circle at its start.
- Reshuffle when the center of the dragged row crosses the edge of a
  neighbor. Reacting to the pointer position or the dragged row's edge feels
  sluggish or twitchy.
- Scroll the list or page when the pointer nears its edge.
- Escape, a cancelled pointer, and a drop outside the list restore the original
  order and save nothing.
- Show `cursor: grab` on the handle and `cursor: grabbing` on the document
  during the drag, so the cursor does not flicker as it crosses other rows.

## Drop

- Apply the new order immediately, then save it. A drop at the starting
  position sends nothing.
- Send one move per drop: the item, its destination, and the order or version
  the list was drawn from. Read the list's identity when the drag starts,
  because the view can switch to another list before the drop.
- Animate displaced rows from their old positions to their new ones with a
  transform (measure first, then invert and play), about 100 to 200 ms, easing
  in and out.
- Flash the moved row's background once with a selection color that fades back.
  Atlassian uses 700 ms.
- On failure, animate back to the saved order or restore it at once, and
  report the error as the main workflow describes.

## Draw the grip and the lift

Use a six-dot grip drawn in the text color so it follows every theme:

```html
<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
  <circle cx="6" cy="4" r="1.25" /><circle cx="10" cy="4" r="1.25" />
  <circle cx="6" cy="8" r="1.25" /><circle cx="10" cy="8" r="1.25" />
  <circle cx="6" cy="12" r="1.25" /><circle cx="10" cy="12" r="1.25" />
</svg>
```

Lift with a black shadow in every theme. A dark surface needs a darker, more
opaque shadow to show any depth, plus a faint light ring to separate the row's
edge. Never derive the shadow from the text color: in a dark theme the text
color is light, so the row glows instead of lifting.

```css
[data-dragging] {
  box-shadow: 0 0 2px rgb(0 0 0 / 0.12), 0 8px 16px rgb(0 0 0 / 0.14);
}

.dark [data-dragging] {
  box-shadow: 0 0 0 1px rgb(255 255 255 / 0.08), 0 0 2px rgb(0 0 0 / 0.24),
    0 8px 16px rgb(0 0 0 / 0.28);
}
```

Replace `.dark` with the product's theme mechanism, such as a data attribute or
`prefers-color-scheme`, and use its theme tokens when it has them. Color the
moved-row highlight with a theme surface or selection token, and check its
contrast against the row text in each theme.

## Respect reduced motion

When reduced motion is requested:

- skip the lift animation and the slide; rows jump to their new places;
- keep the placeholder, the drop indicator, and the highlight as a color change
  without movement;
- scroll with `behavior: "instant"`.

## Add a keyboard drag mode only when needed

The move buttons already satisfy keyboard and assistive technology users. Add a
keyboard drag mode only when evidence shows people need to move items many
places at once from the keyboard, and keep the buttons.

- Enter the mode from the handle with Enter or Space. Arrow keys move the item,
  Enter or Space places it, and Escape cancels.
- Apply `role="application"` only to the handle, and only while the mode is
  active, so the screen reader passes arrow keys to the page.
- Announce entering the mode, each position, the drop, and a cancel. Positional
  updates may use an assertive live region; debounce them by about 100 ms.
- NVDA can deliver Enter and Space as mouse events. Test with it before
  assuming a key event distinguishes keyboard users from pointer users.
- Explain the mode the first time someone enters it, with a way to dismiss the
  explanation permanently.
