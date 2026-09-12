# Skills contributor instructions

This repository is the canonical source for the public skills in `skills/`.
Home Manager and skill installers consume published revisions; edit this source,
not installed copies. Private skills belong in their separate private repository.

- Keep skills portable and free of private operational details, credentials,
  customer data, and author-specific filesystem paths.
- Preserve each skill's name, supporting resources, and optional agent metadata.
  Each skill must remain useful when installed on its own; document prerequisites
  and provide a fallback when an optional companion skill is unavailable.
- Keep framework-specific behavior with its framework skill. Put substantial
  conditional guidance in references and reusable tools in scripts or assets.
- Record third-party provenance in `UPSTREAMS.md` and preserve upstream licenses.
  Unmodified dependencies belong in the upstream catalog, not in this collection.
- Read the complete file before editing. Preserve unrelated work. Do not delegate
  without the user's explicit authorization.
- Do not publish or send external communications without matching authorization.

## Validation

Run `npm ci` and `npm run check`. Exercise changed executable tools with relevant
inputs. The content check validates all skill folders, frontmatter, local links,
optional metadata, and publication boundaries; the script check validates Python
and shell syntax, and TypeScript assets are typechecked.

When available, also run the Codex skill-creator `quick_validate.py` against
changed skills. For material behavior changes, replay a realistic task and report
what was actually verified. Do not invent a runtime requirement from the CI matrix.
