# Skills

Reusable agent skills for engineering, interface design, code reviews, and agent
workflows. Each folder in `skills/` is independently installable and includes its
supporting references, scripts, and assets.

## Install

Use the [Skills CLI](https://github.com/vercel-labs/skills) to choose skills and agents:

```sh
npx skills add sadjow/skills
```

List available skills, install one in a project, or install globally:

```sh
npx skills add sadjow/skills --list
npx skills add sadjow/skills --skill web-ui-design
npx skills add sadjow/skills --skill web-ui-design -g -a codex
```

The installer uses npm to run the existing CLI. This collection does not require
a separately published npm package. You can also copy an individual skill folder
into your agent's skill directory. Reload the agent if needed for discovery.

## Collection

### UI and product design

- [web-ui-design](skills/web-ui-design/SKILL.md)
- [expressive-ui-design](skills/expressive-ui-design/SKILL.md)
- [enterprise-backoffice-ux](skills/enterprise-backoffice-ux/SKILL.md)
- [accessible-web-interactions](skills/accessible-web-interactions/SKILL.md)
- [reorderable-list-ux](skills/reorderable-list-ux/SKILL.md)
- [locale-aware-web-inputs](skills/locale-aware-web-inputs/SKILL.md)
- [role-aware-product-ux](skills/role-aware-product-ux/SKILL.md)
- [business-workflow-ux](skills/business-workflow-ux/SKILL.md)
- [web-interaction-resilience](skills/web-interaction-resilience/SKILL.md)
- [flutter-text-scaling-accessibility](skills/flutter-text-scaling-accessibility/SKILL.md)

### Frameworks, testing, and performance

- [elixir-otp-engineering](skills/elixir-otp-engineering/SKILL.md)
- [clojure-development](skills/clojure-development/SKILL.md)
- [phoenix-ui-architecture](skills/phoenix-ui-architecture/SKILL.md)
- [phoenix-liveview-interaction-resilience](skills/phoenix-liveview-interaction-resilience/SKILL.md)
- [playwright-reactive-ux-testing](skills/playwright-reactive-ux-testing/SKILL.md)
- [playwright-responsive-ui-testing](skills/playwright-responsive-ui-testing/SKILL.md)
- [diagnose-web-performance](skills/diagnose-web-performance/SKILL.md)
- [algorithmic-complexity-optimization](skills/algorithmic-complexity-optimization/SKILL.md)

### Reviews and communication

- [review-pr-collaboratively](skills/review-pr-collaboratively/SKILL.md)
- [leave-code-review-comments-collaboratively](skills/leave-code-review-comments-collaboratively/SKILL.md)
- [external-code-review-prompt](skills/external-code-review-prompt/SKILL.md)
- [explain-clearly](skills/explain-clearly/SKILL.md)
- [github-team-delivery-review](skills/github-team-delivery-review/SKILL.md)
- [github-media-attachments](skills/github-media-attachments/SKILL.md)

### Agent workflows and operations

- [evolve-agent-harness](skills/evolve-agent-harness/SKILL.md)
- [improve-project-agent-harness](skills/improve-project-agent-harness/SKILL.md)
- [agent-skill-content-research](skills/agent-skill-content-research/SKILL.md)
- [skill-creator](skills/skill-creator/SKILL.md)
- [upgrade-agent-skills](skills/upgrade-agent-skills/SKILL.md)
- [browser-harness](skills/browser-harness/SKILL.md)
- [tmux-project-services](skills/tmux-project-services/SKILL.md)

The focused interaction and LiveView skills can be installed separately from the
broader design and framework skills. Choose the narrowest workflow that fits the
task; installing every overlapping skill is optional.

## Choosing a skill

| Task | Start with | Add when needed |
| --- | --- | --- |
| General web interface work | `web-ui-design` | `expressive-ui-design` for visual craft; `accessible-web-interactions` for interaction accessibility |
| Manual list ordering or drag and drop | `reorderable-list-ux` | `web-interaction-resilience` for save timing and conflicts; `phoenix-liveview-interaction-resilience` for LiveView patches and focus |
| LiveView UI implementation | `phoenix-ui-architecture` | `phoenix-liveview-interaction-resilience` for timing, forms, uploads, recovery, and its reconnect helper |
| Reactive UI testing | `playwright-reactive-ux-testing` | `playwright-responsive-ui-testing` for the bundled viewport and capture starter kit |
| Responsive layout testing | `playwright-responsive-ui-testing` | `playwright-reactive-ux-testing` when a failure depends on event ordering or recovery |
| Pull-request review | `review-pr-collaboratively` | `leave-code-review-comments-collaboratively` when turning findings into approved comments |
| Agent harness maintenance | `improve-project-agent-harness` | `evolve-agent-harness` when retaining a lesson from concrete feedback |
| Create or refine one skill | `skill-creator` | `agent-skill-content-research` for domain knowledge gaps |
| Audit or upgrade a collection | `upgrade-agent-skills` | Fresh official research is part of every audit |

The [organization notes](docs/organization.md) explain the layout and link to the
current specification and installer documentation.

The [rename map](skill-renames.json) records retired identifiers and their
current replacements. See the [upgrade review](docs/skill-upgrade-review.md)
for scope changes, research, and migration guidance. Install the replacement
before removing an old installation; preserve any local customizations.

## Prerequisites

Markdown-only skills need no runtime. Executable helpers describe their own
requirements: Python 3 for review and complexity tools, Git and GitHub CLI for
GitHub operations, tmux for service management, and ffmpeg/ffprobe for frame
extraction. Browser and API workflows need the relevant configured
tools and user-provided authentication. Installing a skill does not install those
tools or authorize an external action.

[Upstream skills and customized dependencies](UPSTREAMS.md) retain their own
sources and licenses. Plugin-bundled skills remain installed through their plugins.

## Home Manager

Consume a pinned repository revision without running npm during activation:

```nix
inputs.skills = {
  url = "github:sadjow/skills";
  flake = false;
};
```

Pass the input to your Home Manager module and use
`home.file.".agents/skills/web-ui-design".source = "${skills}/skills/web-ui-design";`.
Other agents can consume the same source. Update the `skills` input in the
consumer's lockfile when adopting changes. Edit this repository, not read-only
installed files in the Nix store.

## Contributing

See [contribution instructions](CONTRIBUTING.md). Run `npm ci` and `npm run check`
for metadata, packaged resources, syntax, validator tests, and TypeScript assets.
Node.js 22 and Python 3 are tested in CI. The package manifest is private to prevent
accidental npm publication; GitHub is the distribution source.

The [resilient UI instruction block](agent-instructions/resilient-ui.md) can be
adapted into a project's own instructions. Keep project-specific details there.

## License

Original content is [MIT licensed](LICENSE). Customized third-party content keeps
its upstream license and notices; see [provenance](UPSTREAMS.md).
