/**
 * Gallery entries. `art` picks the illustration shown until a real photo is
 * added for the same `id` in src/data/images.ts.
 */
import type { ArtKind } from "../components/Art";

export type GalleryCategory = "pizza" | "pasta" | "desserts" | "mains" | "ambience" | "drinks";

export interface GalleryEntry {
  id: string;
  category: GalleryCategory;
  /** Only state what is known. Leave out the specifics rather than guess. */
  caption: string;
  art: ArtKind;
  seed: string;
}

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pizza", label: "Pizza" },
  { id: "pasta", label: "Pasta" },
  { id: "desserts", label: "Desserts" },
  { id: "mains", label: "Main courses" },
  { id: "ambience", label: "Ambience" },
  { id: "drinks", label: "Coffee and drinks" },
];

export const gallery: GalleryEntry[] = [
  { id: "gallery-pizza-1", category: "pizza", caption: "Wood-fired pizza", art: "pizza", seed: "pizza-margarita" },
  { id: "gallery-ambience-1", category: "ambience", caption: "An evening in Fort Kochi", art: "facade", seed: "facade" },
  { id: "gallery-pasta-1", category: "pasta", caption: "Pasta, freshly prepared", art: "pasta", seed: "pasta-pomodoro" },
  { id: "gallery-dessert-1", category: "desserts", caption: "Tiramisu", art: "tiramisu", seed: "tiramisu" },
  { id: "gallery-pizza-2", category: "pizza", caption: "Pizza with melted cheese", art: "pizza", seed: "pizza-4-cheese" },
  { id: "gallery-main-1", category: "mains", caption: "Beef steak", art: "steak", seed: "steak" },
  { id: "gallery-ambience-2", category: "ambience", caption: "Dining room", art: "interior", seed: "interior" },
  { id: "gallery-dessert-2", category: "desserts", caption: "Panna cotta", art: "pannacotta", seed: "pannacotta" },
  { id: "gallery-pasta-2", category: "pasta", caption: "Gnocchi", art: "pasta", seed: "pasta-gorgonzola" },
  { id: "gallery-drinks-1", category: "drinks", caption: "Cappuccino", art: "coffee", seed: "cappuccino" },
  { id: "gallery-main-2", category: "mains", caption: "Seafood from the pan", art: "seafood", seed: "seafood-gambas" },
  { id: "gallery-dessert-3", category: "desserts", caption: "Chocolate mousse", art: "mousse", seed: "mousse" },
  { id: "gallery-ambience-3", category: "ambience", caption: "Outdoor seating", art: "lane", seed: "lane" },
  { id: "gallery-pizza-3", category: "pizza", caption: "Pizza Manzo", art: "pizza", seed: "pizza-pizza-manzo" },
  { id: "gallery-drinks-2", category: "drinks", caption: "Cold coffee", art: "coldcoffee", seed: "coldcoffee" },
  { id: "gallery-pasta-3", category: "pasta", caption: "Veg lasagne", art: "lasagne", seed: "lasagne" },
];
