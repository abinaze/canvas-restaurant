export type CategoryId =
  | "pizza"
  | "antipasti"
  | "salads"
  | "pasta"
  | "forno"
  | "risotto"
  | "mains"
  | "seafood"
  | "desserts"
  | "drinks";

export interface PriceOption {
  /** For example "Glass" or "1 pc". */
  label: string;
  /** Rupees. */
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  /** Leave undefined when the restaurant has not supplied a description. Never invent one. */
  description?: string;
  /** Rupees. Set only from the restaurant's own menu. Shown only when set. */
  price?: number;
  /** Several sizes or portions (glass or carafe, 1 or 2 pieces). Used instead of `price`. */
  options?: PriceOption[];
  /** true only when the restaurant's menu says so. Undefined means "not confirmed", not "non-vegetarian". */
  vegetarian?: boolean;
  /** The menu card marks this dish as having a vegan option. */
  veganOption?: boolean;
  /** A picture slot (src/data/images.ts) that shows this dish. Leave out when there is no matching picture. */
  image?: import("./data/images").ImageName;
}

export interface MenuCategory {
  id: CategoryId;
  name: string;
  blurb: string;
  /** Key into src/data/images.ts */
  image: import("./data/images").ImageName;
}
