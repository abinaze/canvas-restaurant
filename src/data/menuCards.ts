/**
 * The restaurant's printed menu pages, shown as pictures on the menu page.
 * Each is a file in src/assets/menu/ with the id below as its name (menu-desserts.jpg and so on).
 * Replace a file to update a page. A page with no file is left out.
 */
const files = import.meta.glob<string>("../assets/menu/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

export const menuCardDefs = [
  { id: "menu-antipasti-salads", title: "Antipasti and salads" },
  { id: "menu-pizza-veg", title: "Vegetarian pizzas" },
  { id: "menu-pizza-nonveg", title: "Non-vegetarian pizzas" },
  { id: "menu-al-forno", title: "Al forno, risottos and carni" },
  { id: "menu-seafood", title: "Gambas, sea bass and calamari" },
  { id: "menu-desserts", title: "Desserts" },
  { id: "menu-drinks", title: "Drinks" },
] as const;

export type MenuCardId = (typeof menuCardDefs)[number]["id"];

export interface MenuCard {
  id: MenuCardId;
  title: string;
  url: string;
}

const byName = new Map<string, string>();
for (const [path, url] of Object.entries(files)) byName.set(path.split("/").pop()!.replace(/\.[^.]+$/, ""), url);

export const menuCards: MenuCard[] = menuCardDefs.flatMap((d) => {
  const url = byName.get(d.id);
  return url ? [{ ...d, url }] : [];
});

/** Names of the files found in src/assets/menu (used by tests). */
export const menuCardFileNames = [...byName.keys()];
