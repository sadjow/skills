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
npx skills add sadjow/skills --skill ui-ux-design
npx skills add sadjow/skills --skill ui-ux-design -g -a codex
```

The installer uses npm to run the existing CLI. This collection does not require
a separately published npm package. You can also copy an individual skill folder
into your agent's skill directory. Reload the agent if needed for discovery.

## Collection

### UI and product design

- [ui-ux-design](skills/ui-ux-design/SKILL.md)
- [expressive-ui-design](skills/expressive-ui-design/SKILL.md)
- [enterprise-ui-ux](skills/enterprise-ui-ux/SKILL.md)
- [accessible-web-interactions](skills/accessible-web-interactions/SKILL.md)
- [semantic-web-inputs](skills/semantic-web-inputs/SKILL.md)
- [role-aware-product-ux](skills/role-aware-product-ux/SKILL.md)
- [adapt-business-ux](skills/adapt-business-ux/SKILL.md)
- [design-resilient-interactions](skills/design-resilient-interactions/SKILL.md)
- [flutter-text-scaling-accessibility](skills/flutter-text-scaling-accessibility/SKILL.md)

### Frameworks, testing, and performance

- [elixir-otp-engineering](skills/elixir-otp-engineering/SKILL.md)
- [clojure-specialist](skills/clojure-specialist/SKILL.md)
- [phoenix-ui-architect](skills/phoenix-ui-architect/SKILL.md)
- [phoenix-liveview-resilient-ux](skills/phoenix-liveview-resilient-ux/SKILL.md)
- [build-resilient-liveview](skills/build-resilient-liveview/SKILL.md)
- [playwright-reactive-ux-testing](skills/playwright-reactive-ux-testing/SKILL.md)
- [test-responsive-ui](skills/test-responsive-ui/SKILL.md)
- [diagnose-web-performance](skills/diagnose-web-performance/SKILL.md)
- [complexity-optimizer](skills/complexity-optimizer/SKILL.md)

### Reviews and communication

- [review-pr-collaboratively](skills/review-pr-collaboratively/SKILL.md)
- [leave-code-review-comments-collaboratively](skills/leave-code-review-comments-collaboratively/SKILL.md)
- [external-review-prompt](skills/external-review-prompt/SKILL.md)
- [explain-clearly](skills/explain-clearly/SKILL.md)
- [github-team-review](skills/github-team-review/SKILL.md)
- [pr-screenshots](skills/pr-screenshots/SKILL.md)

### Agent workflows and operations

- [evolve-agent-harness](skills/evolve-agent-harness/SKILL.md)
- [improve-project-harness](skills/improve-project-harness/SKILL.md)
- [skill-researcher](skills/skill-researcher/SKILL.md)
- [browser-harness](skills/browser-harness/SKILL.md)
- [tmux-project-services](skills/tmux-project-services/SKILL.md)

The focused interaction and LiveView skills can be installed separately from the
broader design and framework skills. Choose the narrowest workflow that fits the
task; installing every overlapping skill is optional.

## Choosing a skill

| Task | Start with | Add when needed |
| --- | --- | --- |
| General web interface work | `ui-ux-design` | `expressive-ui-design` for visual craft; `accessible-web-interactions` for interaction accessibility |
| LiveView UI implementation | `phoenix-ui-architect` | `phoenix-liveview-resilient-ux` for timing and recovery; `build-resilient-liveview` for its focused patterns and test helper |
| Reactive UI testing | `playwright-reactive-ux-testing` | `test-responsive-ui` for the bundled viewport and capture starter kit |
| Pull-request review | `review-pr-collaboratively` | `leave-code-review-comments-collaboratively` when turning findings into approved comments |
| Agent harness maintenance | `improve-project-harness` | `evolve-agent-harness` when retaining a lesson from concrete feedback |

The [organization notes](docs/organization.md) explain the layout and link to the
current specification and installer documentation.

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
`home.file.".agents/skills/ui-ux-design".source = "${skills}/skills/ui-ux-design";`.
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
