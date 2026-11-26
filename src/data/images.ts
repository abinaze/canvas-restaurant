/**
 * Every picture on the website, in one place.
 *
 * Each slot below is a file in src/assets/images/ with the same name as the slot:
 * "pizza" is src/assets/images/pizza.jpg. To use your own photo, save it over that
 * file (a .png, .jpg or .webp all work) and commit it. Nothing else needs editing.
 * The quickest way is `python scripts/import-images.py <folder>`, which matches file
 * names to slots, shrinks the pictures and copies them in.
 *
 * A slot with no file simply shows an empty frame (and is left out of the gallery), so
 * a missing picture never breaks the site or the build.
 *
 * Tips: photos about 1200 to 1600 px wide, under about 400 KB, subject near the
 * centre (photos are cropped to fit). Update the alt text below if the photo shows
 * something different. Keep only ONE file per name.
 */
export interface ImageSlot {
  /** Describes the picture for screen readers. Update it when you replace the photo. */
  alt: string;
}

const slot = (alt: string): ImageSlot => ({ alt });

export const IMAGES = {
  // Page headers and story
  hero: slot("The Canvas building on Vadathazha Lane, Fort Kochi"),
  exterior: slot("The front of Canvas Restaurant & Pizzeria"),
  interior: slot("Inside Canvas Restaurant & Pizzeria"),
  outdoor: slot("Outdoor seating at Canvas on Vadathazha Lane"),
  "interior-2": slot("Tables and seating inside Canvas"),
  "interior-3": slot("Inside Canvas Restaurant & Pizzeria"),
  "interior-4": slot("Another corner inside Canvas"),
  "exterior-2": slot("Vadathazha Lane outside Canvas in the evening"),
  "exterior-3": slot("The entrance to Canvas Restaurant & Pizzeria"),
  "outdoor-1": slot("Outdoor tables at Canvas"),
  "outdoor-2": slot("Another view of the outdoor seating at Canvas"),
  "patio-evening": slot("Patio tables in the warm evening light"),
  oven: slot("The wood-fired oven at Canvas"),
  "oven-1": slot("Another view of the wood-fired oven"),

  // Menu categories
  pizza: slot("A pizza from the wood-fired oven"),
  pasta: slot("A plate of pasta"),
  salads: slot("A fresh salad"),
  mains: slot("Beef steak with grilled vegetables"),
  seafood: slot("Seafood from the pan"),
  desserts: slot("A platter of desserts"),
  coffee: slot("A cup of coffee"),

  // Gallery extras (the gallery also reuses the slots above)
  "pizza-2": slot("Pizza with melted cheese"),
  "pizza-3": slot("Pizza Manzo"),
  "pizza-4": slot("Pizza with onion and basil"),
  "pasta-2": slot("Gnocchi"),
  lasagne: slot("Veg lasagne"),
  "lasagne-maison": slot("Lasagne with bubbling cheese and marinara sauce"),
  tiramisu: slot("Tiramisu"),
  "panna-cotta": slot("Panna cotta"),
  mousse: slot("Chocolate mousse"),
  semifreddo: slot("Semifreddo"),
  "trio-dessert": slot("A platter of three desserts"),
  "cold-coffee": slot("Cold coffee"),
  cappuccino: slot("Cappuccino"),
  drinks: slot("Drinks"),

  // Dishes
  "spaghetti-pomodoro": slot("Spaghetti pomodoro"),
  arrabbiata: slot("Pasta arrabbiata"),
  fusilli: slot("Fusilli pasta"),
  "gorgonzola-pasta": slot("Gorgonzola pasta"),
  "veggie-pasta": slot("Vegetable pasta"),
  "creamy-shrimp-pasta": slot("Creamy shrimp pasta"),
  gambas: slot("Prawn pasta"),
  "trio-di-pasta": slot("Trio di pasta"),
  "gnocchi-manzo": slot("Gnocchi Manzo with sauce"),
  "gnocchi-trio": slot("Three gnocchi dishes"),
  "mushroom-risotto": slot("Mushroom risotto"),
  risotto: slot("Risotto"),
  "sea-bass": slot("Plated fish fillet with a creamy sauce"),
  calamari: slot("Calamari"),
  "chicken-peppercorn": slot("Chicken in a creamy peppercorn sauce"),
  "french-fries": slot("French fries"),
  burrata: slot("Burrata"),
  "burrata-caprese": slot("Burrata caprese"),
  "greek-salad": slot("Greek salad"),
  "insalata-di-mare": slot("Insalata di mare, a seafood salad"),
} as const satisfies Record<string, ImageSlot>;

export type ImageName = keyof typeof IMAGES;

const files = import.meta.glob<string>("../assets/images/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

const byName = new Map<string, string>();
for (const [path, url] of Object.entries(files)) {
  const name = path.split("/").pop()!.replace(/\.[^.]+$/, "");
  byName.set(name, url);
}

/** URL of the picture for a slot, or undefined if its file is missing. */
export const imageUrl = (name: ImageName): string | undefined => byName.get(name);

/** true when the slot has a picture file. */
export const hasImage = (name: ImageName): boolean => byName.has(name);
