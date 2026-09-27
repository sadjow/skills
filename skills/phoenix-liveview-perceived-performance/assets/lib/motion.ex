defmodule MyAppWeb.Motion do
  @moduledoc """
  Entrance motion for elements that appear because of something the person
  just did.

  LiveView runs `phx-mounted` again for everything on the page whenever a view
  joins or rejoins, so a class transition there replays on content that was
  already visible. The `app:enter` listener in `entrance_motion.js` owns the
  keyframes and animates only inside a connected view, outside state
  restoration, and when the person allows motion.

      <li id={"item-\#{@item.id}"} phx-mounted={Motion.enter(:pop)}>
  """

  alias Phoenix.LiveView.JS

  @type entrance :: :pop | :rise

  @spec enter(entrance()) :: JS.t()
  def enter(entrance) when entrance in [:pop, :rise],
    do: JS.dispatch("app:enter", detail: %{motion: entrance})
end
