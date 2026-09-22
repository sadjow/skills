---
name: github-media-attachments
description: Attach and organize screenshots or videos in GitHub pull requests and issues when an authorized comment or description needs visual evidence. Use descriptive alt text and verify every upload.
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

## Organize many images

When a description carries more than a few images, keep it scannable and the
images readable:

- Show the current version of each changed state. Add a before version only
  when the comparison is what the reviewer must judge.
- Group images under a heading for each audience or surface. Put each set of
  related states in a collapsible `<details>` block whose summary names the set
  and its count, with a blank line after `</summary>` and before `</details>`.
- Give every image a heading that names the state, plus descriptive alt text.
- Keep interface screenshots full width instead of in table columns, and
  capture them at twice the device scale so the full-size image stays sharp.

## Verify uploads

Reference each file in the body with the same path passed to `--attach` so the
CLI rewrites it in place. After posting, fetch the published body and confirm
that no local path remains; in a large batch one upload can fail while the
command still succeeds. Re-run the edit with the published body and attach only
the failed file.

When attachment support is unavailable, use an authorized browser workflow or
prepare the files for the user to upload. Do not post an incomplete placeholder
comment just to prepare an upload. On macOS, `open /path/to/screenshot.png` can
help the user inspect a prepared image.

See the [GitHub CLI manual](https://cli.github.com/manual/gh_pr_comment) for the
current flags. Match available capability instead of assuming a minimum version.
