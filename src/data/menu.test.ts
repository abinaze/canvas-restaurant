import { describe, expect, it } from "vitest";
import { categories, menuItems } from "./menu";

describe("menu data", () => {
  it("has unique ids and valid categories", () => {
    const ids = menuItems.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
    const cats = new Set(categories.map((c) => c.id));
    for (const i of menuItems) expect(cats.has(i.category), i.id).toBe(true);
  });

  it("prices are whole positive rupees, and a dish uses either one price or several options", () => {
    for (const i of menuItems) {
      if (i.price !== undefined) {
        expect(Number.isInteger(i.price) && i.price > 0, `${i.id} price`).toBe(true);
        expect(i.options, `${i.id} has both price and options`).toBeUndefined();
      }
      for (const o of i.options ?? []) expect(Number.isInteger(o.price) && o.price > 0 && o.label.length > 0, `${i.id} option`).toBe(true);
    }
  });

  it("every category has dishes", () => {
    for (const c of categories) expect(menuItems.some((i) => i.category === c.id), c.id).toBe(true);
  });

  it("only vegetarian pizzas and confirmed dishes are marked vegetarian", () => {
    for (const i of menuItems.filter((m) => m.vegetarian)) {
      expect(i.category === "pizza" || i.id === "forno-veg-lasagne", i.id).toBe(true);
    }
  });
});
