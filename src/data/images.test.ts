import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { IMAGES, imageUrl, type ImageName } from "./images";
import { allGalleryEntries as gallery } from "./gallery";
import { categories, menuItems } from "./menu";

const dir = resolve(__dirname, "../assets/images");
const EXT = /\.(png|jpe?g|webp|avif)$/i;

describe("image slots", () => {
  it("reports slots that have no picture yet (a warning only: the site copes with a missing picture)", () => {
    const missing = Object.keys(IMAGES).filter((name) => !imageUrl(name as ImageName));
    if (missing.length) console.warn(`No picture yet for: ${missing.join(", ")}. Add src/assets/images/<name>.jpg to show one.`);
    expect(missing.length).toBeLessThan(Object.keys(IMAGES).length);
  });

  it("has exactly one file per slot and no unknown files", () => {
    const files = readdirSync(dir).filter((f) => EXT.test(f));
    const names = files.map((f) => f.replace(EXT, ""));
    expect(new Set(names).size, "two files share a name, e.g. pizza.png and pizza.jpg").toBe(names.length);
    for (const n of names) expect(n in IMAGES, `${n} is not a slot in src/data/images.ts`).toBe(true);
  });

  it("gallery and menu categories only point at existing slots", () => {
    for (const g of gallery) expect(IMAGES[g.image], g.id).toBeDefined();
    for (const c of categories) expect(IMAGES[c.image], c.id).toBeDefined();
    for (const i of menuItems) if (i.image) expect(IMAGES[i.image], i.id).toBeDefined();
  });

  it("every slot has alt text", () => {
    for (const [name, slot] of Object.entries(IMAGES)) expect(slot.alt.length, name).toBeGreaterThan(5);
  });
});
