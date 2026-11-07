/**
 * Every picture on the website, in one place.
 *
 * Each slot below is a file in src/assets/images/ with the same name as the slot:
 * "pizza" is src/assets/images/pizza.png. To use your own photo, save it over that
 * file (or add pizza.jpg / pizza.webp and delete pizza.png) and commit it. Nothing
 * else needs editing. Until then the file holds a simple placeholder picture.
 *
 * Tips: landscape photos about 1600 px wide, under about 400 KB, subject near the
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

  // Menu categories
  pizza: slot("A pizza from the wood-fired oven"),
  pasta: slot("A plate of pasta"),
  salads: slot("A fresh salad"),
  mains: slot("Beef steak with grilled vegetables"),
  seafood: slot("Seafood from the pan"),
  desserts: slot("Desserts"),
  coffee: slot("A cup of coffee"),

  // Gallery extras (the gallery also reuses the slots above)
  "pizza-2": slot("Pizza with melted cheese"),
  "pizza-3": slot("Another pizza from the menu"),
  "pasta-2": slot("Gnocchi"),
  lasagne: slot("Lasagne"),
  tiramisu: slot("Tiramisu"),
  "panna-cotta": slot("Panna cotta"),
  mousse: slot("Chocolate mousse"),
  "cold-coffee": slot("Cold coffee"),
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
