---
name: github-media-attachments
description: Attach screenshots or videos to GitHub pull requests and issues when an authorized comment or description needs visual evidence. Use descriptive alt text and verify the uploaded result.
---

# GitHub Media Attachments

Prepare visual evidence before posting. Confirm that the user has authorized the
external write and the target, inspect images for private data, and include only
media that helps the reader assess the change.

Check `gh pr comment --help` for attachment support. With a compatible GitHub CLI,
write the complete comment to a file and attach the media in the same operation:

```bash
gh pr comment <number> --repo <owner/repo> \
  --body-file /path/to/comment.md \
  --attach '/path/to/screenshot.png#Description of the visible result'
```

Repeat `--attach` for additional media. Videos do not take alt text. Existing
image references in the body can be rewritten to the uploaded asset by the CLI.
Verify the returned comment and media links before reporting completion.

When attachment support is unavailable, use an authorized browser workflow or
prepare the files for the user to upload. Do not post an incomplete placeholder
comment just to prepare an upload. On macOS, `open /path/to/screenshot.png` can
help the user inspect a prepared image.

See the [GitHub CLI manual](https://cli.github.com/manual/gh_pr_comment) for the
current flags. Match available capability instead of assuming a minimum version.
