/**
 * Photo configuration. Until real photographs are added the site shows
 * clearly-labelled illustrations, never stock photos passed off as the restaurant's.
 *
 * To use a real photo: put the file in public/images/<folder>/ and add an entry
 * below, keyed by the menu item id (see src/data/menu.ts) or a gallery id
 * (see src/data/gallery.ts). No component needs editing.
 *
 *   "pizza-pizza-manzo": { src: "images/pizzas/manzo.jpg", alt: "Pizza Manzo fresh from the oven" },
 *
 * Paths are relative to the site root; the base path is applied automatically.
 * Only set `official: true` for photos taken at, or supplied by, the restaurant.
 */
export interface Photo {
  src: string;
  alt: string;
  caption?: string;
  /** true = taken at or supplied by Canvas. Anything else is labelled as a representative image. */
  official?: boolean;
  /** Optional smaller version for grids. */
  thumb?: string;
  width?: number;
  height?: number;
}

export const photos: Record<string, Photo> = {
  // "hero": { src: "images/restaurant/hero.jpg", alt: "...", official: true },
};
