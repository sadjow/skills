#!/usr/bin/env python3
import ast
from pathlib import Path
import subprocess

root = Path(__file__).resolve().parent.parent
count = 0
for directory in (root / "skills", root / "scripts"):
    for path in sorted(directory.rglob("*")):
        if not path.is_file() or "__pycache__" in path.parts:
            continue
        if path.suffix == ".py":
            ast.parse(path.read_text(), filename=str(path.relative_to(root)))
            count += 1
        elif path.suffix == ".sh" or (
            path.suffix == "" and path.read_bytes().startswith(b"#!/usr/bin/env bash")
        ):
            subprocess.run(["bash", "-n", str(path)], check=True)
            count += 1
print(f"Validated syntax for {count} Python and shell scripts.")
