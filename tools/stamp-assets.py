#!/usr/bin/env python3
"""Stamp a content hash onto the CSS/JS links in every HTML file.

Why this exists: _headers caches /*.css and /*.js for a week. Without a
versioned URL, a stylesheet edit takes up to seven days to reach anyone who
has already visited, and they see new markup styled by old CSS.

Appending ?v=<hash of the file> means the URL changes whenever the file
changes, so caches miss and fetch the new copy immediately, while unchanged
files stay cached for the full week.

Run this after editing styles.css, main.js or project-script.js, before
committing:

    python tools/stamp-assets.py
"""
from __future__ import annotations

import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ("styles.css", "main.js", "project-script.js", "projets/project-styles.css")


def short_hash(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:8]


def main() -> int:
    hashes = {}
    for rel in ASSETS:
        f = ROOT / rel
        if not f.exists():
            print(f"  skip {rel} (not found)")
            continue
        # match on the basename: pages reference it as "project-styles.css"
        hashes[pathlib.PurePosixPath(rel).name] = short_hash(f)

    html_files = [ROOT / "index.html", ROOT / "404.html"]
    html_files += sorted((ROOT / "projets").glob("*.html"))

    changed = 0
    for page in html_files:
        if not page.exists():
            continue
        text = original = page.read_text(encoding="utf-8")
        for name, digest in hashes.items():
            # matches href="styles.css", href="../styles.css?v=abc123", etc.
            # allows "styles.css", "../styles.css" and "/styles.css"
            pattern = rf'((?:href|src)=")((?:\.\./|/)?{re.escape(name)})(?:\?v=[0-9a-f]+)?(")'
            text = re.sub(pattern, rf'\1\2?v={digest}\3', text)
        if text != original:
            page.write_text(text, encoding="utf-8")
            changed += 1

    for name, digest in hashes.items():
        print(f"  {name:20} -> ?v={digest}")
    print(f"  stamped {changed} HTML file(s)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
