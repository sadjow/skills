# Upstream skill sources

Keep vendor and update notes here, outside each skill directory. This keeps the
local skill package easy to compare with its upstream source.

## `browser-harness`

| Field | Value |
|---|---|
| Local path | `skills/browser-harness/` |
| Upstream | <https://github.com/browser-use/browser-harness> |
| Release | [`v0.1.10`](https://github.com/browser-use/browser-harness/releases/tag/v0.1.10) |
| Imported commit | [`6bb1c847fd62638554618e8d1e03247b935ff9cf`](https://github.com/browser-use/browser-harness/commit/6bb1c847fd62638554618e8d1e03247b935ff9cf) |
| Imported on | 2026-09-03 |
| License | MIT |
| Import scope | Root `SKILL.md` and `LICENSE` |
| Runtime owner | `home/browser-harness.nix` pins the matching PyPI CLI |
| Local adaptation | Discovery description, `Tool selection` section, and [local Codex routing adapter](skills/browser-harness/references/codex-computer-use.md), maintained in this repository |

### Refresh procedure

1. Resolve the latest stable release and its commit from GitHub and PyPI.
2. Download that exact commit into a temporary review directory:

   ```sh
   review_root="$(mktemp -d)"
   python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
     --repo browser-use/browser-harness \
     --path . \
     --ref <commit> \
     --dest "$review_root" \
     --name browser-harness
   ```

3. Compare its root `SKILL.md` and `LICENSE` with `skills/browser-harness/`.
4. Merge reviewed upstream changes into the local copy, preserving the local
   adaptation above. Do not replace it wholesale with upstream `SKILL.md` or
   `browser-harness skill` output. Update the release, imported commit, import
   date, and `browserHarnessVersion` in the downstream Home Manager `home/browser-harness.nix`.
5. Run `npm run check` here, then validate the consuming Home Manager configuration after updating its skill pin.

## `playwright-best-practices`

| Field | Value |
|---|---|
| Installed name | `playwright-best-practices` |
| Upstream | <https://github.com/currents-dev/playwright-best-practices-skill> |
| Imported commit | [`ef329e7e65149918e1ff0eed2cf7d2e6e6f9eb5b`](https://github.com/currents-dev/playwright-best-practices-skill/commit/ef329e7e65149918e1ff0eed2cf7d2e6e6f9eb5b) |
| Installed on | 2026-04-25 |
| Ownership | External general-purpose dependency managed by `home/claude-code.nix` |

Keep this package intact. `playwright-reactive-ux-testing` is an authored,
narrow specialization for temporal and recovery boundaries in reactive UIs;
it does not replace or vendor the upstream package.

## `skill-creator`

| Field | Value |
| --- | --- |
| Local path | `skills/skill-creator/` |
| Upstream | [Anthropic skill-creator](https://github.com/anthropics/skills/tree/34040c9c568585f6929bedeaad110ad08f079624/skills/skill-creator) |
| Reviewed revision | `34040c9c568585f6929bedeaad110ad08f079624` |
| Adapted on | 2026-09-12 |
| License | Apache-2.0, preserved in `skills/skill-creator/LICENSE.txt` |
| Import scope | Adapted authoring and evaluation instructions; original license. Upstream CLI, benchmark runner, viewer, and packaging tools are not bundled. |
| Local owner | This repository owns the portable adaptation; Home Manager consumes its published revision. |
| Adaptation | Precise discovery, optional resources and packaging, supported frontmatter, proportional evaluation, provider references, and environment-owned permissions. |
| Refresh direction | Review current upstream against this adaptation; selectively adopt relevant changes without overwriting local boundaries or licenses. |

This replaces the formerly unmodified external creator in consuming
configurations. The Codex system creator remains owned by Codex; do not edit or
vendor its installed copy. Use one applicable creator for a task rather than
loading both definitions merely because they share a name.

## Installed upstream catalog

These unmodified skills are installed from their upstream repositories. They are
not redistributed here. The sources below come from the local installer lock
metadata; folder hashes are installer fingerprints, not necessarily Git commits.
Use the upstream license and documentation when adopting them.

| Skill | Upstream | Installation |
| --- | --- | --- |
| `find-skills` | [vercel-labs/skills](https://github.com/vercel-labs/skills) | `npx skills add vercel-labs/skills --skill find-skills` |
| `flutter-adding-home-screen-widgets` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-adding-home-screen-widgets` |
| `flutter-animating-apps` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-animating-apps` |
| `flutter-architecting-apps` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-architecting-apps` |
| `flutter-building-forms` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-building-forms` |
| `flutter-building-layouts` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-building-layouts` |
| `flutter-building-plugins` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-building-plugins` |
| `flutter-caching-data` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-caching-data` |
| `flutter-embedding-native-views` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-embedding-native-views` |
| `flutter-handling-concurrency` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-handling-concurrency` |
| `flutter-handling-http-and-json` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-handling-http-and-json` |
| `flutter-implementing-navigation-and-routing` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-implementing-navigation-and-routing` |
| `flutter-improving-accessibility` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-improving-accessibility` |
| `flutter-interoperating-with-native-apis` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-interoperating-with-native-apis` |
| `flutter-localizing-apps` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-localizing-apps` |
| `flutter-managing-state` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-managing-state` |
| `flutter-reducing-app-size` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-reducing-app-size` |
| `flutter-setting-up-on-linux` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-setting-up-on-linux` |
| `flutter-setting-up-on-macos` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-setting-up-on-macos` |
| `flutter-setting-up-on-windows` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-setting-up-on-windows` |
| `flutter-testing-apps` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-testing-apps` |
| `flutter-theming-apps` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-theming-apps` |
| `flutter-working-with-databases` | [flutter/skills](https://github.com/flutter/skills) | `npx skills add flutter/skills --skill flutter-working-with-databases` |
| `graphql-schema` | [apollographql/skills](https://github.com/apollographql/skills) | `npx skills add apollographql/skills --skill graphql-schema` |
| `playwright-best-practices` | [currents-dev/playwright-best-practices-skill](https://github.com/currents-dev/playwright-best-practices-skill) | `npx skills add currents-dev/playwright-best-practices-skill --skill playwright-best-practices` |
| `postgresql-table-design` | [wshobson/agents](https://github.com/wshobson/agents) | `npx skills add wshobson/agents --skill postgresql-table-design` |
| `rails-expert` | [jeffallan/claude-skills](https://github.com/jeffallan/claude-skills) | `npx skills add jeffallan/claude-skills --skill rails-expert` |
| `redis-development` | [redis/agent-skills](https://github.com/redis/agent-skills) | `npx skills add redis/agent-skills --skill redis-development` |
| `vue` | [antfu/skills](https://github.com/antfu/skills) | `npx skills add antfu/skills --skill vue` |

Plugin-bundled skills remain managed by their plugins and are not copied here.

## Original collection provenance

The initial consolidated snapshot includes authored skills from
`sadjow/home-manager` at commit `e4a0029441263ace0b13b656c538ae7d5b31e1bd`, including
pending UI improvements; previously standalone review and complexity skills; and
four earlier unversioned UI skills with their validation tools. This repository
now owns those public sources. Home Manager consumes reviewed, pinned revisions.
There is no synchronization back to the removed Home Manager skill copies.
