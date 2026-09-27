defmodule MyAppWeb.StateIndicationMotionContractTest do
  use ExUnit.Case, async: true

  @project_root Path.expand("../..", __DIR__)
  @templates ["lib/my_app_web/**/*.ex", "lib/my_app_web/**/*.heex"]

  @state_variant ~r/aria-current|aria-\[current|aria-selected:|aria-\[selected|aria-pressed:|aria-checked:|data-\[(?:current|active|selected)|has-\[:checked\]|peer-checked:|(?<![-\w])checked:/
  @state_fade ~r/(?<![-\w])transition(?:-all|-colors|-opacity|-shadow|-\[[^\]]*(?:color|opacity|shadow)[^\]]*\])?(?![-\w\[])/

  # Fading a current, selected, pressed, or checked style shows the old and new
  # choice active together, which reads as the interface catching up late.
  # Tailwind v4's plain `transition` includes colors, opacity, and shadow.
  test "state indication switches instantly and keeps motion on transforms" do
    offenders =
      for path <- templates(),
          {line, number} <- path |> File.read!() |> String.split("\n") |> Enum.with_index(1),
          class_string <- Regex.scan(~r/"[^"]*"/, line) |> List.flatten(),
          Regex.match?(@state_variant, class_string),
          Regex.match?(@state_fade, class_string),
          do: "#{Path.relative_to(path, @project_root)}:#{number}"

    assert offenders == [],
           "Class strings that style a state must not transition color, opacity, or shadow; keep press feedback on transform utilities: #{inspect(offenders)}"
  end

  defp templates do
    Enum.flat_map(@templates, &Path.wildcard(Path.join(@project_root, &1)))
  end
end
