import { describe, expect, it } from "vitest";
import { categories, menuItems } from "./menu";

describe("menu data", () => {
  it("has unique ids and valid categories", () => {
    const ids = menuItems.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    const cats = new Set(categories.map((c) => c.id));
    for (const i of menuItems) expect(cats.has(i.category), i.id).toBe(true);
  });

  it("does not invent prices", () => {
    for (const i of menuItems) expect(i.price, i.id).toBeUndefined();
  });

  it("every category has dishes", () => {
    for (const c of categories) expect(menuItems.some((i) => i.category === c.id), c.id).toBe(true);
  });
});
