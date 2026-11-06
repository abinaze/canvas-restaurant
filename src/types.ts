export type CategoryId = "pizza" | "pasta" | "salads" | "mains" | "seafood" | "desserts" | "coffee";

export interface MenuOption {
  id: string;
  label: string;
  choices: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  /** Leave undefined when the restaurant has not supplied a description. Never invent one. */
  description?: string;
  /** Rupees. Leave undefined unless the restaurant has confirmed the price. */
  price?: number;
  /** true only when confirmed vegetarian. Undefined means "not confirmed", not "non-vegetarian". */
  vegetarian?: boolean;
  featured?: boolean;
  /** A customer-selectable choice, shown in the item dialog and carried into the order message. */
  option?: MenuOption;
}

export interface MenuCategory {
  id: CategoryId;
  name: string;
  blurb: string;
}

export interface CartLine {
  /** itemId plus selected option, so the same dish with a different side is its own line. */
  key: string;
  itemId: string;
  quantity: number;
  optionChoice?: string;
}

export type OrderType = "dine-in" | "takeaway" | "delivery";
