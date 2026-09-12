#!/usr/bin/env python3
"""Collect repository context for an external LLM code review prompt."""

from __future__ import annotations

import argparse
import fnmatch
import os
import re
import subprocess
import sys
from pathlib import Path


TEXT_EXTENSIONS = {
    ".clj", ".cljs", ".cljc", ".edn", ".md", ".txt", ".json", ".yaml", ".yml",
    ".py", ".rb", ".js", ".jsx", ".ts", ".tsx", ".java", ".kt", ".go", ".rs",
    ".c", ".h", ".cpp", ".hpp", ".css", ".scss", ".html", ".xml", ".sh",
    ".sql", ".toml", ".ini", ".env.example",
}


def run(cmd: list[str], check: bool = False) -> str:
    proc = subprocess.run(cmd, text=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
    if check and proc.returncode != 0:
        raise SystemExit(f"Command failed ({proc.returncode}): {' '.join(cmd)}\n{proc.stdout}")
    return proc.stdout.rstrip()


def in_git_repo() -> bool:
    return subprocess.run(["git", "rev-parse", "--is-inside-work-tree"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode == 0


def repo_root() -> Path:
    return Path(run(["git", "rev-parse", "--show-toplevel"], check=True))


def is_probably_text(path: Path) -> bool:
    if path.suffix in TEXT_EXTENSIONS or path.name in {"Dockerfile", "Makefile", "Gemfile", "Rakefile", "project.clj"}:
        return True
    try:
        data = path.read_bytes()[:4096]
    except OSError:
        return False
    return b"\0" not in data


def line_numbered(text: str) -> str:
    return "\n".join(f"{idx:5d}  {line}" for idx, line in enumerate(text.splitlines(), 1))


def read_worktree_file(root: Path, rel: str, max_bytes: int) -> tuple[str, bool]:
    path = root / rel
    if not path.exists() or not path.is_file():
        return f"[not present in working tree: {rel}]", False
    if not is_probably_text(path):
        return f"[binary or unsupported text file omitted: {rel}]", False
    data = path.read_bytes()
    truncated = len(data) > max_bytes
    text = data[:max_bytes].decode("utf-8", errors="replace")
    if truncated:
        text += f"\n\n[truncated at {max_bytes} bytes]"
    return line_numbered(text), truncated


def expand_extra_paths(root: Path, patterns: list[str]) -> list[str]:
    all_files = [str(p.relative_to(root)) for p in root.rglob("*") if p.is_file() and ".git" not in p.parts]
    selected: set[str] = set()
    for pattern in patterns:
        direct = root / pattern
        if direct.is_file():
            selected.add(str(direct.relative_to(root)))
            continue
        if direct.is_dir():
            for p in direct.rglob("*"):
                if p.is_file() and ".git" not in p.parts:
                    selected.add(str(p.relative_to(root)))
            continue
        selected.update(f for f in all_files if fnmatch.fnmatch(f, pattern))
    return sorted(selected)


def extract_candidate_symbols(diff_text: str) -> list[str]:
    symbols: set[str] = set()
    patterns = [
        r"^\+?\s*\(defn-?\s+([A-Za-z0-9_\-?!/*+<>=.]+)",
        r"^\+?\s*\(def\s+(?:\^\{[^}]+\}\s+)?([A-Za-z0-9_\-?!/*+<>=.]+)",
        r"^\+?\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z0-9_$]+)",
        r"^\+?\s*(?:export\s+)?class\s+([A-Za-z0-9_$]+)",
    ]
    for line in diff_text.splitlines():
        if not line.startswith(("+", " ")):
            continue
        for pat in patterns:
            match = re.search(pat, line)
            if match:
                symbols.add(match.group(1))
    return sorted(symbols)


def rg_available() -> bool:
    return subprocess.run(["sh", "-c", "command -v rg"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode == 0


def reference_hits(symbols: list[str], changed_files: set[str], max_matches: int) -> str:
    if not symbols:
        return "[no candidate symbols extracted]"
    if not rg_available():
        return "[ripgrep not available; reference search skipped]"

    chunks: list[str] = []
    for symbol in symbols[:30]:
        output = run(["rg", "-n", "-C", "2", "--fixed-strings", symbol, "."])
        lines = []
        for line in output.splitlines():
            path = line.split(":", 1)[0]
            if path in changed_files or path.startswith("./.git/"):
                continue
            lines.append(line)
            if len(lines) >= max_matches:
                break
        if lines:
            chunks.append(f"### `{symbol}`\n\n```text\n" + "\n".join(lines) + "\n```")
    return "\n\n".join(chunks) if chunks else "[no non-diff reference hits found]"


def maybe_pr_metadata(pr: str | None) -> str:
    if not pr:
        return "[not requested]"
    if subprocess.run(["sh", "-c", "command -v gh"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL).returncode != 0:
        return "[gh not available]"
    return run([
        "gh", "pr", "view", pr,
        "--json", "number,title,url,state,isDraft,baseRefName,headRefName,author,additions,deletions,changedFiles,commits",
    ])


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base", help="Base ref/revision to diff against. Defaults to upstream merge-base or origin/main.")
    parser.add_argument("--head", default="HEAD", help="Head ref/revision. Default: HEAD.")
    parser.add_argument("--pr", help="GitHub PR number or URL for metadata.")
    parser.add_argument("--out", help="Output markdown path. Defaults to stdout.")
    parser.add_argument("--extra", action="append", default=[], help="Extra file, directory, or glob to include. Repeatable.")
    parser.add_argument("--max-file-bytes", type=int, default=120_000, help="Max bytes per full file excerpt.")
    parser.add_argument("--max-rg-matches", type=int, default=80, help="Max non-diff rg hits per symbol.")
    args = parser.parse_args()

    if not in_git_repo():
        raise SystemExit("Run this script inside a git repository.")

    root = repo_root()
    os.chdir(root)

    base = args.base
    if not base:
        upstream = run(["git", "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{upstream}"])
        base = upstream if upstream else "origin/main"

    merge_base = run(["git", "merge-base", base, args.head], check=True)
    head_sha = run(["git", "rev-parse", args.head], check=True)
    branch = run(["git", "branch", "--show-current"])
    status = run(["git", "status", "--short", "--branch"])
    diff_stat = run(["git", "diff", "--stat", f"{merge_base}...{args.head}"])
    name_status = run(["git", "diff", "--name-status", f"{merge_base}...{args.head}"])
    diff_text = run(["git", "diff", "--find-renames", "--unified=80", f"{merge_base}...{args.head}"])
    diff_check = run(["git", "diff", "--check", f"{merge_base}...{args.head}"])
    changed_files = [
        line.split("\t")[-1]
        for line in name_status.splitlines()
        if line.strip()
    ]
    changed_set = set(changed_files)
    extra_files = [p for p in expand_extra_paths(root, args.extra) if p not in changed_set]
    symbols = extract_candidate_symbols(diff_text)

    parts: list[str] = []
    parts.append("# External Review Context Pack\n")
    parts.append("## Repository Metadata\n")
    parts.append(f"- Repo root: `{root}`")
    parts.append(f"- Branch: `{branch or '[detached]'}`")
    parts.append(f"- Base input: `{base}`")
    parts.append(f"- Merge base: `{merge_base}`")
    parts.append(f"- Head input: `{args.head}`")
    parts.append(f"- Head SHA: `{head_sha}`")
    parts.append("\n## Git Status\n\n```text\n" + status + "\n```")
    parts.append("\n## PR Metadata\n\n```json\n" + maybe_pr_metadata(args.pr) + "\n```")
    parts.append("\n## Diff Stat\n\n```text\n" + diff_stat + "\n```")
    parts.append("\n## Changed Files\n\n```text\n" + name_status + "\n```")
    parts.append("\n## Diff Check\n\n```text\n" + (diff_check or "[clean]") + "\n```")
    parts.append("\n## Candidate Changed Symbols\n\n```text\n" + ("\n".join(symbols) if symbols else "[none]") + "\n```")
    parts.append("\n## Non-Diff Reference Search Hits\n\n" + reference_hits(symbols, changed_set, args.max_rg_matches))
    parts.append("\n## Full Diff\n\n```diff\n" + diff_text + "\n```")

    parts.append("\n## Current Contents of Changed Text Files\n")
    for rel in changed_files:
        text, _ = read_worktree_file(root, rel, args.max_file_bytes)
        parts.append(f"\n### `{rel}`\n\n```text\n{text}\n```")

    if extra_files:
        parts.append("\n## Extra Context Files\n")
        for rel in extra_files:
            text, _ = read_worktree_file(root, rel, args.max_file_bytes)
            parts.append(f"\n### `{rel}`\n\n```text\n{text}\n```")
    else:
        parts.append("\n## Extra Context Files\n\n[none requested]\n")

    output = "\n".join(parts).rstrip() + "\n"
    if args.out:
        Path(args.out).write_text(output)
    else:
        sys.stdout.write(output)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
