/** Page titles and descriptions, used for per-page meta tags and the sitemap. */
export interface RouteMeta {
  path: string; // "" is the home page
  title: string;
  description: string;
  inNav?: boolean;
  navLabel?: string;
}

export const routes: RouteMeta[] = [
  {
    path: "",
    navLabel: "Home",
    inNav: true,
    title: "Canvas Restaurant & Pizzeria | Italian restaurant in Fort Kochi",
    description:
      "Wood-fired pizza, homemade pasta and Italian classics in Fort Kochi. Browse the menu, order delivery on Zomato or request a table at Canvas Restaurant & Pizzeria.",
  },
  {
    path: "menu",
    navLabel: "Menu",
    inNav: true,
    title: "Menu | Pizza, pasta, seafood and desserts | Canvas Restaurant Fort Kochi",
    description:
      "The full menu at Canvas Restaurant & Pizzeria, Fort Kochi: wood-fired pizza, pasta, salads, main courses, seafood, desserts and coffee. Search and filter, then order delivery on Zomato or visit us.",
  },
  {
    path: "about",
    navLabel: "About",
    inNav: true,
    title: "About | Canvas Restaurant & Pizzeria, Fort Kochi",
    description:
      "An Italian-inspired restaurant in Fort Kochi serving wood-fired pizza, pasta, seafood and desserts in a relaxed dining atmosphere.",
  },
  {
    path: "gallery",
    navLabel: "Gallery",
    inNav: true,
    title: "Gallery | Canvas Restaurant & Pizzeria, Fort Kochi",
    description: "Pizza, pasta, desserts, main courses and the setting at Canvas Restaurant & Pizzeria in Fort Kochi.",
  },
  {
    path: "reviews",
    navLabel: "Reviews",
    inNav: true,
    title: "Reviews | What guests say about Canvas Restaurant, Fort Kochi",
    description: "What guests often praise about Canvas Restaurant & Pizzeria in Fort Kochi.",
  },
  {
    path: "contact",
    navLabel: "Contact",
    inNav: true,
    title: "Contact and directions | Canvas Restaurant & Pizzeria, Fort Kochi",
    description:
      "Address, opening hours, phone and directions for Canvas Restaurant & Pizzeria on Vadathazha Lane, Fort Kochi.",
  },
  {
    path: "reserve",
    navLabel: "Reserve",
    inNav: true,
    title: "Request a table | Canvas Restaurant & Pizzeria, Fort Kochi",
    description:
      "Send a table request to Canvas Restaurant & Pizzeria on WhatsApp, or call the restaurant. The restaurant confirms availability.",
  },
];

export const sitemapPaths = routes.map((r) => r.path);

export const NOT_FOUND_TITLE = "Page not found | Canvas Restaurant & Pizzeria";
