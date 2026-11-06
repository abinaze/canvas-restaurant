import { describe, expect, it } from "vitest";
import { cartReducer, computeTotals, lineKey, sanitizeStoredCart } from "./cart";
import { menuItems } from "../data/menu";
import type { CartLine, MenuItem } from "../types";

describe("cartReducer", () => {
  it("adds a new line and merges repeats", () => {
    let s: CartLine[] = [];
    s = cartReducer(s, { type: "add", itemId: "pizza-pizzaiolo", quantity: 1 });
    s = cartReducer(s, { type: "add", itemId: "pizza-pizzaiolo", quantity: 2 });
    expect(s).toHaveLength(1);
    expect(s[0].quantity).toBe(3);
  });

  it("keeps different options as separate lines", () => {
    let s: CartLine[] = [];
    s = cartReducer(s, { type: "add", itemId: "mains-beef-steak", quantity: 1, optionChoice: "Fries" });
    s = cartReducer(s, { type: "add", itemId: "mains-beef-steak", quantity: 1, optionChoice: "Wedges" });
    expect(s.map((l) => l.key)).toEqual([lineKey("mains-beef-steak", "Fries"), lineKey("mains-beef-steak", "Wedges")]);
  });

  it("removes a line when quantity drops to zero and caps the maximum", () => {
    let s = cartReducer([], { type: "add", itemId: "desserts-tiramisu", quantity: 2 });
    s = cartReducer(s, { type: "setQuantity", key: "desserts-tiramisu", quantity: 99 });
    expect(s[0].quantity).toBe(20);
    s = cartReducer(s, { type: "setQuantity", key: "desserts-tiramisu", quantity: 0 });
    expect(s).toEqual([]);
  });

  it("ignores adds of zero or negative quantity", () => {
    expect(cartReducer([], { type: "add", itemId: "x", quantity: 0 })).toEqual([]);
    expect(cartReducer([], { type: "add", itemId: "x", quantity: -3 })).toEqual([]);
  });
});

describe("sanitizeStoredCart", () => {
  it("drops unknown items, bad shapes and invalid options", () => {
    const raw = [
      { itemId: "pizza-pizzaiolo", quantity: 2 },
      { itemId: "ghost-item", quantity: 1 },
      { itemId: "mains-beef-steak", quantity: 1, optionChoice: "Caviar" },
      "nonsense",
      null,
      { itemId: "pizza-calzone", quantity: "3" },
    ];
    const out = sanitizeStoredCart(raw, menuItems);
    expect(out.map((l) => l.itemId)).toEqual(["pizza-pizzaiolo", "mains-beef-steak"]);
    expect(out[1].optionChoice).toBeUndefined();
  });

  it("returns an empty cart for non-arrays", () => {
    expect(sanitizeStoredCart({ a: 1 }, menuItems)).toEqual([]);
  });
});

describe("computeTotals", () => {
  const items: MenuItem[] = [
    { id: "a", name: "A", category: "pizza", price: 100 },
    { id: "b", name: "B", category: "pizza", price: 250 },
    { id: "c", name: "C", category: "pizza" },
  ];
  const line = (itemId: string, quantity: number): CartLine => ({ key: itemId, itemId, quantity });

  it("gives a total only when every line has a verified price", () => {
    expect(computeTotals([line("a", 2), line("b", 1)], items).total).toBe(450);
    expect(computeTotals([line("a", 2), line("c", 1)], items).total).toBeNull();
  });

  it("reports the priced part and how many lines are unpriced", () => {
    const t = computeTotals([line("a", 2), line("c", 3)], items);
    expect(t).toMatchObject({ itemCount: 5, pricedSubtotal: 200, unpricedLines: 1, total: null });
  });

  it("has no total for an empty cart", () => {
    expect(computeTotals([], items).total).toBeNull();
  });

  it("never invents prices for the shipped menu", () => {
    expect(menuItems.every((i) => i.price === undefined)).toBe(true);
  });
});
