#!/usr/bin/env python3
"""R63 image optimizer — uses Pillow to resize/recompress three
hero images PageSpeed flagged on the home page.

This script writes to a temp dir first, then uses the `Write` tool
pattern (or shutil.move) to atomically replace the originals.
"""
import os
import shutil
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(r"C:\Users\Administrator\.trae-cn\work\6a9d25e18218ab0836ada44c\sublimapparel-src")

TASKS = [
    {
        "file": "public/factory-floor.webp",
        "width": 600,
        "quality": 70,
        "desc": "factory-floor 800x449 -> 600x338 @q70 (LCP poster)",
    },
    {
        "file": "public/heat-press-v3.webp",
        "width": 480,
        "quality": 68,
        "desc": "heat-press-v3 480x300 @q68 (factory-floor equipment)",
    },
    {
        "file": "public/sublimapparel-logo-v2.webp",
        "width": 220,
        "quality": 65,
        "desc": "navbar logo 220x88 @q65",
    },
]

EXTRAS = [
    {
        "out": "public/sublimapparel-logo-1x.webp",
        "src": "public/sublimapparel-logo-v2.webp",
        "width": 110,
        "quality": 80,
        "desc": "navbar logo 1x 110x44 @q80 (non-retina fallback)",
    },
]


def process(src_rel: str, out_rel: str, max_width: int, quality: int) -> tuple[int, int, int, int]:
    src_abs = ROOT / src_rel
    out_abs = ROOT / out_rel
    before = src_abs.stat().st_size

    img = Image.open(src_abs)
    if img.width > max_width:
        ratio = max_width / img.width
        new_h = int(round(img.height * ratio))
        img = img.resize((max_width, new_h), Image.LANCZOS)

    # Re-encode as WebP via the temp file (so we don't accidentally
    # truncate the source on a write error).
    fd, tmp_path = tempfile.mkstemp(suffix=".webp", dir=os.environ.get("TEMP", "/tmp"))
    os.close(fd)
    try:
        img.save(tmp_path, format="WEBP", quality=quality, method=6)
        after = os.path.getsize(tmp_path)
        with Image.open(tmp_path) as m:
            w, h = m.size

        # Write via the same pattern the Node script uses:
        # temp file next to destination, unlink original, rename.
        sibling = str(out_abs) + ".r63tmp"
        shutil.copy2(tmp_path, sibling)
        try:
            out_abs.unlink()
        except FileNotFoundError:
            pass
        os.replace(sibling, out_abs)
    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)

    return before, after, w, h


total_before = 0
total_after = 0
print("== R63 image optimizer ==")
for t in TASKS:
    before, after, w, h = process(t["file"], t["file"], t["width"], t["quality"])
    total_before += before
    total_after += after
    saved = (before - after) / 1024
    print(f"  {t['desc']}")
    print(f"    {before} -> {after} bytes ({w}x{h})  saved {saved:.1f} KiB -> {t['file']}")

for t in EXTRAS:
    before, after, w, h = process(t["src"], t["out"], t["width"], t["quality"])
    total_before += before
    total_after += after
    saved = (before - after) / 1024
    print(f"  {t['desc']}")
    print(f"    src {before} -> new {after} bytes ({w}x{h})  saved {saved:.1f} KiB -> {t['out']}")

print()
print(
    f"=== TOTAL: {total_before} -> {total_after} bytes, saved {(total_before - total_after) / 1024:.1f} KiB ==="
)
