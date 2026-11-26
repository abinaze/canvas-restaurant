import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { menuCardDefs } from "./menuCards";

const dir = resolve(__dirname, "../assets/menu");
const EXT = /\.(png|jpe?g|webp|avif)$/i;

describe("menu card pictures", () => {
  it("has one file per page and no unknown files", () => {
    const names = readdirSync(dir).filter((f) => EXT.test(f)).map((f) => f.replace(EXT, ""));
    expect(new Set(names).size, "two files share a name").toBe(names.length);
    const ids = new Set<string>(menuCardDefs.map((d) => d.id));
    for (const n of names) expect(ids.has(n), `${n} is not a menu page in src/data/menuCards.ts`).toBe(true);
  });
});
