/**
 * Gallery entries. Each one points at a picture slot in src/data/images.ts
 * (a file in src/assets/images/). Replace the file to change the picture.
 */
import { hasImage, type ImageName } from "./images";

export type GalleryCategory = "pizza" | "pasta" | "starters" | "mains" | "desserts" | "ambience" | "drinks";

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
  { id: "pasta", label: "Pasta and risotto" },
  { id: "starters", label: "Starters and salads" },
  { id: "mains", label: "Mains and seafood" },
  { id: "desserts", label: "Desserts" },
  { id: "ambience", label: "Ambience" },
  { id: "drinks", label: "Coffee and drinks" },
];

/** Every entry whose picture file exists. Entries without a file are skipped, so no empty tiles. */
const all: GalleryEntry[] = [
  { id: "g-pizza", category: "pizza", caption: "Wood-fired pizza", image: "pizza" },
  { id: "g-pasta", category: "pasta", caption: "Pasta, freshly prepared", image: "pasta" },
  { id: "g-panna-cotta", category: "desserts", caption: "Panna cotta", image: "panna-cotta" },
  { id: "g-steak", category: "mains", caption: "Beef steak", image: "mains" },
  { id: "g-seafood", category: "mains", caption: "Calamari al limone with fries", image: "seafood" },
  { id: "g-patio-evening", category: "ambience", caption: "Patio tables in the evening", image: "patio-evening" },
  { id: "g-oven", category: "ambience", caption: "The wood-fired oven", image: "oven" },
  { id: "g-tiramisu", category: "desserts", caption: "Tiramisu", image: "tiramisu" },
  { id: "g-pizza-2", category: "pizza", caption: "A slice of pizza", image: "pizza-2" },
  { id: "g-pizza-3", category: "pizza", caption: "Pizza Manzo", image: "pizza-3" },
  { id: "g-pizza-4", category: "pizza", caption: "Pizza with onion and basil", image: "pizza-4" },
  { id: "g-pasta-2", category: "pasta", caption: "Gnocchi", image: "pasta-2" },
  { id: "g-gnocchi-trio", category: "pasta", caption: "Three gnocchi dishes", image: "gnocchi-trio" },
  { id: "g-gnocchi-manzo", category: "pasta", caption: "Gnocchi Manzo", image: "gnocchi-manzo" },
  { id: "g-spaghetti-pomodoro", category: "pasta", caption: "Spaghetti pomodoro", image: "spaghetti-pomodoro" },
  { id: "g-arrabbiata", category: "pasta", caption: "Pasta arrabbiata", image: "arrabbiata" },
  { id: "g-fusilli", category: "pasta", caption: "Fusilli", image: "fusilli" },
  { id: "g-gorgonzola-pasta", category: "pasta", caption: "Gorgonzola pasta", image: "gorgonzola-pasta" },
  { id: "g-veggie-pasta", category: "pasta", caption: "Vegetable pasta", image: "veggie-pasta" },
  { id: "g-creamy-shrimp-pasta", category: "pasta", caption: "Creamy shrimp pasta", image: "creamy-shrimp-pasta" },
  { id: "g-gambas", category: "pasta", caption: "Prawn pasta", image: "gambas" },
  { id: "g-trio-di-pasta", category: "pasta", caption: "Trio di pasta", image: "trio-di-pasta" },
  { id: "g-lasagne", category: "pasta", caption: "Veg lasagne", image: "lasagne" },
  { id: "g-lasagne-maison", category: "pasta", caption: "Lasagne", image: "lasagne-maison" },
  { id: "g-mushroom-risotto", category: "pasta", caption: "Mushroom risotto", image: "mushroom-risotto" },
  { id: "g-risotto", category: "pasta", caption: "Risotto", image: "risotto" },
  { id: "g-french-fries", category: "starters", caption: "French fries", image: "french-fries" },
  { id: "g-calamari", category: "starters", caption: "Calamari", image: "calamari" },
  { id: "g-greek-salad", category: "starters", caption: "Greek salad", image: "greek-salad" },
  { id: "g-salads", category: "starters", caption: "Italian-style salad", image: "salads" },
  { id: "g-burrata", category: "starters", caption: "Burrata", image: "burrata" },
  { id: "g-burrata-caprese", category: "starters", caption: "Burrata caprese", image: "burrata-caprese" },
  { id: "g-insalata-di-mare", category: "starters", caption: "Insalata di mare", image: "insalata-di-mare" },
  { id: "g-sea-bass", category: "mains", caption: "Fish fillet with creamy sauce", image: "sea-bass" },
  { id: "g-chicken-peppercorn", category: "mains", caption: "Chicken in a creamy peppercorn sauce", image: "chicken-peppercorn" },
  { id: "g-mousse", category: "desserts", caption: "Chocolate mousse", image: "mousse" },
  { id: "g-semifreddo", category: "desserts", caption: "Semifreddo", image: "semifreddo" },
  { id: "g-trio-dessert", category: "desserts", caption: "A platter of three desserts", image: "trio-dessert" },
  { id: "g-exterior", category: "ambience", caption: "An evening in Fort Kochi", image: "exterior" },
  { id: "g-exterior-2", category: "ambience", caption: "The lane outside", image: "exterior-2" },
  { id: "g-exterior-3", category: "ambience", caption: "The entrance", image: "exterior-3" },
  { id: "g-interior", category: "ambience", caption: "Dining room", image: "interior" },
  { id: "g-interior-2", category: "ambience", caption: "Tables and seating", image: "interior-2" },
  { id: "g-interior-3", category: "ambience", caption: "Inside Canvas", image: "interior-3" },
  { id: "g-interior-4", category: "ambience", caption: "Another corner", image: "interior-4" },
  { id: "g-outdoor", category: "ambience", caption: "Outdoor seating", image: "outdoor" },
  { id: "g-outdoor-1", category: "ambience", caption: "Outdoor tables", image: "outdoor-1" },
  { id: "g-outdoor-2", category: "ambience", caption: "On the patio", image: "outdoor-2" },
  { id: "g-oven-1", category: "ambience", caption: "Another view of the oven", image: "oven-1" },
  { id: "g-cappuccino", category: "drinks", caption: "Cappuccino", image: "cappuccino" },
  { id: "g-coffee", category: "drinks", caption: "Coffee", image: "coffee" },
  { id: "g-drinks", category: "drinks", caption: "Drinks", image: "drinks" },
  { id: "g-cold-coffee", category: "drinks", caption: "Cold coffee", image: "cold-coffee" },
];

export const gallery: GalleryEntry[] = all.filter((g) => hasImage(g.image));

/** Every entry, including ones whose picture is missing (used by tests). */
export const allGalleryEntries = all;
