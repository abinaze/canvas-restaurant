import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { IMAGES, imageUrl, type ImageName } from "./images";
import { gallery } from "./gallery";
import { categories } from "./menu";

const dir = resolve(__dirname, "../assets/images");
const EXT = /\.(png|jpe?g|webp|avif)$/i;

describe("image slots", () => {
  it("every slot has a picture file in src/assets/images", () => {
    for (const name of Object.keys(IMAGES)) expect(imageUrl(name as ImageName), `missing src/assets/images/${name}.png (or .jpg/.webp)`).toBeTruthy();
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
  });

  it("every slot has alt text", () => {
    for (const [name, slot] of Object.entries(IMAGES)) expect(slot.alt.length, name).toBeGreaterThan(5);
  });
});
