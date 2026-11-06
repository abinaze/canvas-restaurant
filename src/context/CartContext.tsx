import { createContext, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import type { CartLine, MenuItem } from "../types";
import { cartReducer, computeTotals, sanitizeStoredCart, type Totals } from "../utils/cart";
import { menuItems } from "../data/menu";
import { readJSON, writeJSON } from "../utils/storage";

const STORAGE_KEY = "canvas.cart.v1";

export interface DetailedLine extends CartLine {
  item: MenuItem;
}

interface CartApi {
  lines: DetailedLine[];
  totals: Totals;
  add: (itemId: string, quantity: number, optionChoice?: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, [], () => sanitizeStoredCart(readJSON<unknown>(STORAGE_KEY, []), menuItems));
  const first = useRef(true);

  // Persist the cart only (never customer details).
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    writeJSON(STORAGE_KEY, lines);
  }, [lines]);

  // Keep several open tabs in step.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) dispatch({ type: "hydrate", lines: sanitizeStoredCart(readJSON<unknown>(STORAGE_KEY, []), menuItems) });
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const api = useMemo<CartApi>(() => {
    const detailed = lines.flatMap((l) => {
      const item = menuItems.find((i) => i.id === l.itemId);
      return item ? [{ ...l, item }] : [];
    });
    return {
      lines: detailed,
      totals: computeTotals(lines, menuItems),
      add: (itemId, quantity, optionChoice) => dispatch({ type: "add", itemId, quantity, optionChoice }),
      setQuantity: (key, quantity) => dispatch({ type: "setQuantity", key, quantity }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [lines]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
