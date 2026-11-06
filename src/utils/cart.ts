import type { CartLine, MenuItem } from "../types";

export type CartAction =
  | { type: "add"; itemId: string; quantity: number; optionChoice?: string }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

export const MAX_QUANTITY = 20;

export const lineKey = (itemId: string, optionChoice?: string): string =>
  optionChoice ? `${itemId}::${optionChoice}` : itemId;

const clamp = (n: number): number => Math.max(0, Math.min(MAX_QUANTITY, Math.floor(n)));

export function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case "add": {
      const key = lineKey(action.itemId, action.optionChoice);
      const existing = state.find((l) => l.key === key);
      const add = clamp(action.quantity);
      if (add === 0) return state;
      if (existing) {
        return state.map((l) => (l.key === key ? { ...l, quantity: clamp(l.quantity + add) } : l));
      }
      return [...state, { key, itemId: action.itemId, quantity: add, optionChoice: action.optionChoice }];
    }
    case "setQuantity": {
      const q = clamp(action.quantity);
      return q === 0 ? state.filter((l) => l.key !== action.key) : state.map((l) => (l.key === action.key ? { ...l, quantity: q } : l));
    }
    case "remove":
      return state.filter((l) => l.key !== action.key);
    case "clear":
      return [];
    case "hydrate":
      return action.lines;
  }
}

/** Accept only well-formed lines for items that still exist on the menu. */
export function sanitizeStoredCart(raw: unknown, items: MenuItem[]): CartLine[] {
  if (!Array.isArray(raw)) return [];
  const out: CartLine[] = [];
  for (const entry of raw) {
    if (!entry || typeof entry !== "object") continue;
    const { itemId, quantity, optionChoice } = entry as Partial<CartLine>;
    if (typeof itemId !== "string" || typeof quantity !== "number") continue;
    const item = items.find((i) => i.id === itemId);
    if (!item) continue;
    const choice = typeof optionChoice === "string" && item.option?.choices.includes(optionChoice) ? optionChoice : undefined;
    const q = clamp(quantity);
    if (q === 0) continue;
    const key = lineKey(itemId, choice);
    if (out.some((l) => l.key === key)) continue;
    out.push({ key, itemId, quantity: q, optionChoice: choice });
  }
  return out;
}

export interface Totals {
  itemCount: number;
  /** Sum of the lines that have a verified price. */
  pricedSubtotal: number;
  /** Lines without a verified price. */
  unpricedLines: number;
  /** The full total is only known when every line has a price. */
  total: number | null;
}

export function computeTotals(lines: CartLine[], items: MenuItem[]): Totals {
  let itemCount = 0;
  let pricedSubtotal = 0;
  let unpricedLines = 0;
  for (const l of lines) {
    itemCount += l.quantity;
    const price = items.find((i) => i.id === l.itemId)?.price;
    if (typeof price === "number") pricedSubtotal += price * l.quantity;
    else unpricedLines += 1;
  }
  return { itemCount, pricedSubtotal, unpricedLines, total: lines.length > 0 && unpricedLines === 0 ? pricedSubtotal : null };
}
