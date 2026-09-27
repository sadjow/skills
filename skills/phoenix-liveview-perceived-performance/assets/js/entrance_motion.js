// LiveView runs phx-mounted again for everything on the page while a view
// joins or rejoins, before its root becomes phx-connected. Animating only
// inside a connected view keeps entrances for what the person just caused
// and never replays them on content that was already visible. Set
// data-entrances-paused="true" on <html> while the page restores state from
// device storage, so restored content appears in place.
const ENTRANCES = {
  pop: {
    keyframes: [
      { opacity: 0, scale: "0.96" },
      { opacity: 1, scale: "1" },
    ],
    duration: 200,
  },
  rise: {
    keyframes: [
      { opacity: 0, translate: "0 1rem" },
      { opacity: 1, translate: "0 0" },
    ],
    duration: 240,
  },
};

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function canEnter(element) {
  return (
    !reducedMotion.matches &&
    document.documentElement.dataset.entrancesPaused !== "true" &&
    element
      .closest("[data-phx-session]")
      ?.classList.contains("phx-connected") === true
  );
}

window.addEventListener("app:enter", ({ target, detail }) => {
  const entrance = ENTRANCES[detail?.motion];
  if (!(target instanceof HTMLElement) || !entrance || !canEnter(target)) {
    return;
  }

  target.animate(entrance.keyframes, {
    duration: entrance.duration,
    easing: "cubic-bezier(0, 0, 0.2, 1)",
  });
});
