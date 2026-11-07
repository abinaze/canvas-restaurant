/**
 * The whole menu lives here. To update it:
 *  - add, rename or remove an object in `items`
 *  - set `price` (in rupees) only once the restaurant has confirmed it; it then appears on the menu
 *  - add `description` only with text the restaurant has supplied
 *  - set `vegetarian: true` only when confirmed
 *
 * Nothing here is invented. The site only displays the menu; orders are placed on Zomato.
 */
import type { CategoryId, MenuCategory, MenuItem } from "../types";

export const MENU_NOTE =
  "Dishes and availability can change. Please check with the restaurant, or on Zomato, for current availability and prices.";

export const categories: MenuCategory[] = [
  { id: "pizza", name: "Pizza", blurb: "From the wood-fired oven", image: "pizza" },
  { id: "pasta", name: "Pasta", blurb: "Freshly prepared, made in house", image: "pasta" },
  { id: "salads", name: "Salads", blurb: "Light plates for the table", image: "salads" },
  { id: "mains", name: "Main courses", blurb: "Meat and Italian classics", image: "mains" },
  { id: "seafood", name: "Seafood", blurb: "From the grill and the pan", image: "seafood" },
  { id: "desserts", name: "Desserts", blurb: "To finish", image: "desserts" },
  { id: "coffee", name: "Coffee and drinks", blurb: "Espresso and more", image: "coffee" },
];

const slug = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const make = (category: CategoryId, names: string[]): MenuItem[] =>
  names.map((name) => ({ id: `${category}-${slug(name)}`, name, category }));

const items: MenuItem[] = [
  ...make("pizza", [
    "Margarita", "Cosa Nostra", "Pesto Pizza", "Al Funghi", "Pizza Alle Verdure", "Caprese",
    "Pizza Feta", "Pizza Gorgonzola", "Primavera", "4 Cheese", "Al Pollo", "Pizzaiolo",
    "Pizza Napoli", "4 Seasons", "Rustica", "Pizza Tonno", "Calzone", "Pizza Manzo",
    "Aux Crevettes", "Frutti Di Mare",
  ]),
  ...make("pasta", [
    "Pomodoro", "Aglio Olio", "Arrabiata", "Norma", "Alle Verdure", "Pesto", "Gorgonzola",
    "Pollo", "Puttanesca", "Bolognese", "Gamberi", "Frutti Di Mare", "Veg Lasagne", "Lasagne Maison",
  ]),
  ...make("salads", [
    "Salad Verte", "Salade Tomate", "Salade Tomate Et Mozzarella", "Salade Feta",
    "Canvas Special", "Salade Oceanica",
  ]),
  { id: "mains-scallopine-di-pollo", name: "Scallopine Di Pollo", category: "mains" },
  {
    id: "mains-beef-steak",
    name: "Beef Steak",
    category: "mains",
    description:
      "200g tenderloin served with grilled vegetables, pepper mushroom sauce, and a choice of mashed potato, fries, or wedges.",
  },
  ...make("seafood", ["Gambas À L'ail", "Calamari Al Limone"]),
  ...make("desserts", [
    "Panna Cotta", "Chocolate Mousse", "Tiramisu", "Semi Freddo", "Trio Di Dessert", "Pizza Nutella",
  ]),
  ...make("coffee", [
    "Ristretto", "Espresso", "Double Espresso", "Caffè", "Caffè Latte", "Americano",
    "Cappuccino", "Cold Coffee",
  ]),
];

// Confirmed vegetarian by name on the menu ("Veg Lasagne"). Add more only once confirmed.
const CONFIRMED_VEGETARIAN = new Set(["pasta-veg-lasagne"]);

export const menuItems: MenuItem[] = items.map((i) => ({
  ...i,
  vegetarian: CONFIRMED_VEGETARIAN.has(i.id) ? true : i.vegetarian,
}));

/**
 * Pasta choices are general information only. We have not verified that every
 * sauce is available with every shape, so these are never selectable per dish.
 */
export const pastaShapes = ["Gnocchi", "Tagliatelle", "Spaghetti", "Penne", "Fusilli"];

/**
 * Mentioned as popular, but current availability is not verified, so these are
 * deliberately NOT shown on the menu. Move one into `items` once confirmed.
 */
export const unverifiedPopularItems = ["Calamari Rings", "Trio Di Pasta", "Bruschetta", "French Fries"];

export const getItem = (id: string): MenuItem | undefined => menuItems.find((i) => i.id === id);
export const getCategory = (id: CategoryId): MenuCategory => categories.find((c) => c.id === id)!;
