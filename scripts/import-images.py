#!/usr/bin/env python3
"""
Copy a folder of pictures into the website.

    python scripts/import-images.py "/path/to/folder"          # do it
    python scripts/import-images.py "/path/to/folder" --dry-run  # only show what would happen

What it does
  * Matches each file to a picture slot by its NAME (see ALIASES below and src/data/images.ts).
    A file already named after a slot (e.g. oven.png, interior-4.png) goes to that slot.
  * Files starting with "Menu-" are the printed menu pages and go to src/assets/menu/.
  * Shrinks and converts each picture to a .jpg of sensible size (a 1.5 MB png becomes ~150 KB),
    writes it as src/assets/images/<slot>.jpg and removes any older file for that slot.
  * Never touches the slots listed in PROTECTED (pictures you have already fixed by hand).
  * Prints anything it could not match, so you can rename the file and run it again.

Needs Python 3 and Pillow (pip install pillow). Without Pillow it copies the files as they are.
"""
import re
import shutil
import sys
import unicodedata
from pathlib import Path

try:
    from PIL import Image
except ImportError:  # copy as-is
    Image = None

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "src" / "assets" / "images"
MENU = ROOT / "src" / "assets" / "menu"
EXTS = {".png", ".jpg", ".jpeg", ".webp"}

# Slots whose pictures are already final in the repo. They are never written or removed.
PROTECTED = {"pizza", "interior", "exterior-3"}

# Longest side in pixels, and jpg quality.
MAX_SIDE = 1600
MENU_MAX_SIDE = 1600
QUALITY = 84
MENU_QUALITY = 88

# file name (letters and digits only, joined by "-") -> slot
ALIASES = {
    "3-dessert-platter-1": "desserts",
    "3-dessert-platter": "trio-dessert",
    "arrabbiata-pasta": "arrabbiata",
    "beefsteak": "mains",
    "burrata-caprese": "burrata-caprese",
    "burrata": "burrata",
    "calamari-al-limone-and-fries": "seafood",
    "calamari": "calamari",
    "choclate-mousse": "mousse",
    "chocolate-mousse": "mousse",
    "creamy-peppercorn-chicken": "chicken-peppercorn",
    "gnocchi-manzo-with-sause": "gnocchi-manzo",
    "gnocchi-manzo-with-sauce": "gnocchi-manzo",
    "greek-salad": "greek-salad",
    "italian-style-salad": "salads",
    "pannacotta": "panna-cotta",
    "spaghetti-pomodoro": "spaghetti-pomodoro",
    "veg-lasagne": "lasagne",
    "warm-evening-patio-tables": "patio-evening",
    "cappuccino": "cappuccino",
    "coffee": "coffee",
    "creamy-shrimp-pasta": "creamy-shrimp-pasta",
    "drinks": "drinks",
    "french-fries": "french-fries",
    "fusilli-pasta": "fusilli",
    "gnocchi": "pasta-2",
    "gorgonzola-pasta": "gorgonzola-pasta",
    "insalata-di-mare": "insalata-di-mare",
    "lasagna-with-bubbling-cheese-and-marinara-sauce": "lasagne-maison",
    "mushroom-risotto": "mushroom-risotto",
    "outdoor-patio": "outdoor",
    "oven": "oven",
    "pizza-slize": "pizza-2",
    "pizza-slice": "pizza-2",
    "pizza-with-onion-and-basil": "pizza-4",
    "pizzamanzo": "pizza-3",
    "plated-fish-fillet-with-creamy-sauce": "sea-bass",
    "prawn-pasta": "gambas",
    "risotto": "risotto",
    "semifreddo": "semifreddo",
    "tender-pasta": "pasta",
    "three-gnocchi-dishes": "gnocchi-trio",
    "tiramisu": "tiramisu",
    "trio-di-pasta": "trio-di-pasta",
    "veggie-pasta": "veggie-pasta",
}

# "Menu-..." files: first matching keyword wins. (key, page id)
MENU_PAGES = [
    ("non-veg", "menu-pizza-nonveg"),
    ("veg-pizza", "menu-pizza-veg"),
    ("antipasti", "menu-antipasti-salads"),
    ("al-forno", "menu-al-forno"),
    ("gambas", "menu-seafood"),
    ("sea-bass", "menu-seafood"),
    ("dessert", "menu-desserts"),
    ("drink", "menu-drinks"),
]


def key_of(name: str) -> str:
    s = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def slot_names() -> set:
    """Slot names, read from src/data/images.ts (the entries between IMAGES = { and } as const)."""
    text = (ROOT / "src" / "data" / "images.ts").read_text(encoding="utf-8")
    block = text[text.index("export const IMAGES"):text.index("} as const")]
    return set(re.findall(r'^\s*"?([a-z0-9-]+)"?:\s*slot\(', block, re.M))


def save(src: Path, dest: Path, max_side: int, quality: int) -> str:
    dest.parent.mkdir(parents=True, exist_ok=True)
    if Image is None:
        out = dest.with_suffix(src.suffix.lower())
        shutil.copyfile(src, out)
        return f"copied ({src.stat().st_size // 1024} KB)"
    with Image.open(src) as im:
        im.load()
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA")
            bg = Image.new("RGB", im.size, (255, 255, 255))
            bg.paste(im, mask=im.getchannel("A"))
            im = bg
        else:
            im = im.convert("RGB")
        w, h = im.size
        if max(w, h) > max_side:
            scale = max_side / max(w, h)
            im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
        out = dest.with_suffix(".jpg")
        im.save(out, "JPEG", quality=quality, optimize=True, progressive=True, subsampling=0 if quality >= 88 else 2)
        note = f"{w}x{h} -> {im.size[0]}x{im.size[1]}, {src.stat().st_size // 1024} KB -> {out.stat().st_size // 1024} KB"
        if w < 800:
            note += "  (low resolution: will look soft when enlarged)"
        return note


def remove_other_files(folder: Path, name: str, keep_suffix: str) -> None:
    for f in folder.glob(f"{name}.*"):
        if f.suffix.lower() in EXTS and f.suffix.lower() != keep_suffix:
            f.unlink()


def main() -> int:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry-run" in sys.argv
    if not args:
        print(__doc__)
        return 2
    src_dir = Path(args[0]).expanduser()
    if not src_dir.is_dir():
        print(f"Folder not found: {src_dir}")
        return 1

    slots = slot_names()
    pages = {p for _, p in MENU_PAGES}
    used, unmatched, skipped = {}, [], []

    files = sorted(f for f in src_dir.iterdir() if f.is_file() and f.suffix.lower() in EXTS)
    for f in files:
        k = key_of(f.stem)
        if k.startswith("menu"):
            page = next((p for kw, p in MENU_PAGES if kw in k), None)
            if page is None:
                unmatched.append(f.name)
            elif page in used:
                skipped.append(f"{f.name} (menu page {page} already taken by {used[page].name})")
            else:
                used[page] = f
            continue
        slot = k if k in slots else ALIASES.get(k)
        if slot is None or slot not in slots:
            unmatched.append(f.name)
        elif slot in PROTECTED:
            skipped.append(f"{f.name} (slot '{slot}' is protected: left as it is in the repo)")
        elif slot in used:
            skipped.append(f"{f.name} (slot '{slot}' already taken by {used[slot].name})")
        else:
            used[slot] = f

    print(f"{'Slot / page':24} {'File':58} Result")
    print("-" * 110)
    for name, f in sorted(used.items()):
        is_page = name in pages
        folder, mx, q = (MENU, MENU_MAX_SIDE, MENU_QUALITY) if is_page else (IMAGES, MAX_SIDE, QUALITY)
        if dry:
            note = "would import"
        else:
            note = save(f, folder / name, mx, q)
            remove_other_files(folder, name, ".jpg" if Image is not None else f.suffix.lower())
        print(f"{name:24} {f.name[:56]:58} {note}")

    if skipped:
        print("\nSkipped:")
        for s in skipped:
            print("  -", s)
    if unmatched:
        print("\nNo matching slot (rename the file after a slot in src/data/images.ts, or add it to ALIASES):")
        for u in unmatched:
            print("  -", u)
    missing_pages = sorted(pages - set(used))
    if missing_pages:
        print("\nMenu pages with no file yet:", ", ".join(missing_pages))
    print(f"\n{len(used)} imported, {len(skipped)} skipped, {len(unmatched)} unmatched." + ("  (dry run: nothing written)" if dry else ""))
    return 0


if __name__ == "__main__":
    sys.exit(main())
