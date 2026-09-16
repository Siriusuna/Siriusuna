#!/usr/bin/env python3
"""
Step 1 of `npm run build:fonts`: turn the desktop CJK font sources in .fonts-src/
into trimmed .ttf files that cn-font-split can slice.

Two things happen here that cn-font-split cannot do itself:

  1. GenRyuMin2 ships as a .ttc collection holding four faces (TW / TC / JP / PJP).
     Only the TC face (丹版, traditional letterpress style) is wanted, so it has to be
     pulled out of the collection first.

  2. The sources cover far more than this site needs — GenRyuMin2 TC alone has 35,348
     codepoints, which slices to ~11 MB per weight. Subsetting to the BMP ideograph
     block first brings that to ~4.5 MB. Rare characters outside this range are not
     lost: they fall through to Jigmo, loaded from a CDN (see sirius-site-assets).

Requires fontTools: `pip install 'fonttools[woff]'`.

Usage: python3 scripts/prepare-cjk-sources.py [src-dir] [out-dir]
"""

import subprocess
import sys
from pathlib import Path

from fontTools.ttLib import TTCollection

# What the self-hosted CJK faces carry. Deliberately excludes CJK Ext A/B+ (the notes
# use zero of those today) and the Nerd Font private use area (icons come from
# Monaspace, which is the code font). Changing this changes the size numbers recorded
# in .siriusuna/customizations.md — update them together.
UNICODES = ",".join(
    [
        "U+0000-2FFF",  # latin, punctuation, symbols
        "U+3000-30FF",  # CJK punctuation, hiragana, katakana
        "U+31F0-31FF",  # katakana phonetic extensions
        "U+4E00-9FFF",  # CJK Unified Ideographs
        "U+FE10-FE1F",  # vertical forms
        "U+FF00-FFEF",  # halfwidth and fullwidth forms
    ]
)

# role -> (source filename, ttc face index or None)
# The TC face sits at index 1 in every GenRyuMin2 collection; the script asserts this
# rather than trusting it, because a font update could reorder them.
SOURCES = {
    "genryumin-r": ("GenRyuMin2-R.ttc", 1, "GenRyuMin2 TC R"),
    "genryumin-b": ("GenRyuMin2-B.ttc", 1, "GenRyuMin2 TC B"),
    "lxgw-wenkai-mono": ("LXGWWenKaiMonoNerdFont-Regular.ttf", None, None),
    "yozai-b": ("Yozai-Bold.ttf", None, None),
    # Jigmo ships as three files: Jigmo.ttf (BMP), Jigmo2.ttf (Ext B), Jigmo3.ttf
    # (Ext C-I). Only Jigmo.ttf is used — the notes contain zero Ext B+ codepoints, and
    # Jigmo2 alone would add ~36 MB of source for glyphs nothing references.
    "jigmo": ("Jigmo.ttf", None, None),
}


def extract_face(ttc_path: Path, index: int, expected_name: str, dest: Path) -> None:
    collection = TTCollection(str(ttc_path))
    if index >= len(collection.fonts):
        raise SystemExit(f"✗ {ttc_path.name} has {len(collection.fonts)} faces, need index {index}")
    face = collection.fonts[index]
    actual = face["name"].getDebugName(4)
    if actual != expected_name:
        names = [f["name"].getDebugName(4) for f in collection.fonts]
        raise SystemExit(
            f"✗ {ttc_path.name} face[{index}] is {actual!r}, expected {expected_name!r}.\n"
            f"  Faces present: {names}\n"
            f"  The collection was reordered upstream — fix the index in SOURCES."
        )
    face.save(str(dest))


def main() -> None:
    src_dir = Path(sys.argv[1] if len(sys.argv) > 1 else ".fonts-src")
    out_dir = Path(sys.argv[2] if len(sys.argv) > 2 else "build/cjk-sources")

    if not src_dir.is_dir():
        raise SystemExit(
            f"✗ {src_dir}/ not found.\n"
            f"  It holds the desktop font sources and is gitignored (they are ~100 MB).\n"
            f"  See .siriusuna/customizations.md for where to download them."
        )

    out_dir.mkdir(parents=True, exist_ok=True)

    for role, (filename, face_index, expected_name) in SOURCES.items():
        source = src_dir / filename
        if not source.exists():
            raise SystemExit(f"✗ missing source: {source}")

        staged = source
        if face_index is not None:
            staged = out_dir / f"{role}-face.ttf"
            print(f"  extracting {expected_name} from {filename}")
            extract_face(source, face_index, expected_name, staged)

        target = out_dir / f"{role}.ttf"
        print(f"  subsetting {role}")
        subprocess.run(
            [
                "pyftsubset",
                str(staged),
                f"--unicodes={UNICODES}",
                "--layout-features=*",
                "--notdef-outline",
                f"--output-file={target}",
            ],
            check=True,
        )
        if staged != source:
            staged.unlink()
        print(f"    {target.name}  {target.stat().st_size / 1e6:.2f} MB")

    print(f"✓ prepared {len(SOURCES)} CJK sources in {out_dir}/")


if __name__ == "__main__":
    main()
