/**
 * Gallery entries. Each one points at a picture slot in src/data/images.ts
 * (a file in public/images/). Replace the file to change the picture.
 */
import type { ImageName } from "./images";

export type GalleryCategory = "pizza" | "pasta" | "desserts" | "mains" | "ambience" | "drinks";

export interface GalleryEntry {
  id: string;
  category: GalleryCategory;
  /** Only state what is known. Leave out the specifics rather than guess. */
  caption: string;
  image: ImageName;
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
  { id: "g-pizza", category: "pizza", caption: "Wood-fired pizza", image: "pizza" },
  { id: "g-exterior", category: "ambience", caption: "An evening in Fort Kochi", image: "exterior" },
  { id: "g-pasta", category: "pasta", caption: "Pasta, freshly prepared", image: "pasta" },
  { id: "g-tiramisu", category: "desserts", caption: "Tiramisu", image: "tiramisu" },
  { id: "g-pizza-2", category: "pizza", caption: "Pizza with melted cheese", image: "pizza-2" },
  { id: "g-steak", category: "mains", caption: "Beef steak", image: "mains" },
  { id: "g-interior", category: "ambience", caption: "Dining room", image: "interior" },
  { id: "g-interior-2", category: "ambience", caption: "Tables and seating", image: "interior-2" },
  { id: "g-panna-cotta", category: "desserts", caption: "Panna cotta", image: "panna-cotta" },
  { id: "g-exterior-2", category: "ambience", caption: "The lane outside", image: "exterior-2" },
  { id: "g-pasta-2", category: "pasta", caption: "Gnocchi", image: "pasta-2" },
  { id: "g-coffee", category: "drinks", caption: "Cappuccino", image: "coffee" },
  { id: "g-seafood", category: "mains", caption: "Seafood from the pan", image: "seafood" },
  { id: "g-mousse", category: "desserts", caption: "Chocolate mousse", image: "mousse" },
  { id: "g-interior-3", category: "ambience", caption: "Inside Canvas", image: "interior-3" },
  { id: "g-outdoor", category: "ambience", caption: "Outdoor seating", image: "outdoor" },
  { id: "g-exterior-3", category: "ambience", caption: "The entrance", image: "exterior-3" },
  { id: "g-pizza-3", category: "pizza", caption: "Pizza Manzo", image: "pizza-3" },
  { id: "g-interior-4", category: "ambience", caption: "Another corner", image: "interior-4" },
  { id: "g-cold-coffee", category: "drinks", caption: "Cold coffee", image: "cold-coffee" },
  { id: "g-lasagne", category: "pasta", caption: "Veg lasagne", image: "lasagne" },
];
