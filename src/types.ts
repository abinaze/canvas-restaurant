export type CategoryId = "pizza" | "pasta" | "salads" | "mains" | "seafood" | "desserts" | "coffee";

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  /** Leave undefined when the restaurant has not supplied a description. Never invent one. */
  description?: string;
  /** Rupees. Leave undefined unless the restaurant has confirmed the price. Shown only when set. */
  price?: number;
  /** true only when confirmed vegetarian. Undefined means "not confirmed", not "non-vegetarian". */
  vegetarian?: boolean;
}

export interface MenuCategory {
  id: CategoryId;
  name: string;
  blurb: string;
  /** Key into src/data/images.ts */
  image: import("./data/images").ImageName;
}
