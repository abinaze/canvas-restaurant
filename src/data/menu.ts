/**
 * The whole menu lives here. To update it:
 *  - add, rename or remove an entry in `items`
 *  - `price` is in rupees; use `options` when a dish has several sizes
 *  - `description` is the text printed on the restaurant's menu card
 *  - `image` names a picture slot from src/data/images.ts, only when the picture really shows that dish
 *
 * Dishes, descriptions and prices below are copied from the restaurant's printed menu cards
 * (pizzas, antipasti, salads, al forno, risottos, seafood, desserts and drinks; all prices are
 * printed as inclusive of taxes). Pasta has no price yet because that card has not been supplied.
 * Nothing is invented. The site only displays the menu; orders are placed on Zomato.
 */
import type { CategoryId, MenuCategory, MenuItem, PriceOption } from "../types";
import type { ImageName } from "./images";

export const MENU_NOTE =
  "Prices are in rupees and inclusive of taxes, as printed on the restaurant’s menu cards. Dishes, availability and prices can change, and Zomato prices may differ. Please tell your server about any allergies.";

export const categories: MenuCategory[] = [
  { id: "pizza", name: "Pizza", blurb: "From the wood-fired oven", image: "pizza" },
  { id: "antipasti", name: "Antipasti", blurb: "To start and to share", image: "calamari" },
  { id: "salads", name: "Salads", blurb: "Light plates for the table", image: "salads" },
  { id: "pasta", name: "Pasta", blurb: "Freshly prepared, made in house", image: "pasta" },
  { id: "forno", name: "Al forno", blurb: "Baked in the wood-fire oven", image: "lasagne-maison" },
  { id: "risotto", name: "Risotto", blurb: "Creamy and slow-cooked", image: "mushroom-risotto" },
  { id: "mains", name: "Main courses", blurb: "Meat and Italian classics", image: "mains" },
  { id: "seafood", name: "Seafood", blurb: "From the grill and the pan", image: "seafood" },
  { id: "desserts", name: "Desserts", blurb: "To finish", image: "desserts" },
  { id: "drinks", name: "Coffee and drinks", blurb: "Espresso, juices and more", image: "drinks" },
];

const slug = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

interface Extra {
  description?: string;
  vegetarian?: boolean;
  veganOption?: boolean;
  image?: ImageName;
  options?: PriceOption[];
}

/** One menu entry. */
const dish = (category: CategoryId, name: string, price?: number, extra: Extra = {}): MenuItem => ({
  id: `${category}-${slug(name)}`,
  name,
  category,
  ...(price !== undefined ? { price } : {}),
  ...extra,
});

const veg = (name: string, price: number, description: string, extra: Extra = {}) =>
  dish("pizza", name, price, { description, vegetarian: true, ...extra });
const nonveg = (name: string, price: number, description: string, extra: Extra = {}) =>
  dish("pizza", name, price, { description, ...extra });

const items: MenuItem[] = [
  // Vegetarian pizzas ("Veg-Pizzas" card; vegan options are available on the marked ones)
  veg("Margherita", 460, "Tomato sauce, mozzarella cheese, fresh basil leaves."),
  veg("Cosa Nostra", 520, "Tomato sauce, mozzarella cheese, fresh tomato, red onion rings, black olives.", { veganOption: true }),
  veg("Pesto", 540, "Tomato sauce, mozzarella cheese, pesto sauce."),
  veg("Al Funghi", 660, "Tomato sauce, mozzarella cheese, freshly grilled mushrooms, tri-color capsicum, black olives.", { veganOption: true }),
  veg("Pizza Alle Verdure", 660, "Tomato sauce, mozzarella cheese, black olives, tri-color capsicum, aubergine, zucchini.", { veganOption: true }),
  veg("Caprese", 660, "Tomato sauce, tomato, mozzarella bulbs, homegrown rucola."),
  veg("Pizza Feta", 660, "Tomato sauce, mozzarella cheese, feta cheese, black olives, fresh basil leaves."),
  veg("Pizza Gorgonzola", 690, "Tomato sauce, mozzarella cheese, gorgonzola cheese, red onion rings, fresh basil leaves."),
  veg("Primavera", 720, "Tomato sauce, mozzarella cheese, zucchini, oregano, cherry tomatoes, parmesan cheese, homegrown rucola."),
  veg("Sapore Verde", 720, "Tomato sauce, mozzarella cheese, broccoli florets, red onion and feta cheese."),
  veg("4 Cheese", 790, "Tomato sauce, mozzarella, parmesan, feta and gorgonzola cheese. Gorgonzola as per availability."),
  veg("Pizza Burrata", 950, "Burrata cheese, tomato sauce, rocket lettuce, pesto and balsamic vinegar."),

  // Non-vegetarian pizzas
  nonveg("Al Pollo", 640, "Tomato sauce, mozzarella cheese, chicken chunks sauteed in Italian herbs, tri-color capsicum, black olives."),
  nonveg("Pizzaiolo", 640, "Tomato sauce, mozzarella cheese, chicken salami, black olives, egg, fresh basil leaves."),
  nonveg("Pizza Napoli", 690, "Tomato sauce, mozzarella cheese, capers, anchovies."),
  nonveg("4 Seasons", 720, "Tomato sauce, mozzarella cheese, chicken pepperoni, tuna chunks, fresh mushrooms, black olives."),
  nonveg("Rustica", 720, "Tomato sauce, mozzarella cheese, chicken pepperoni, black olives, fresh mushrooms, homegrown basil."),
  nonveg("Pizza Tonno", 720, "Tomato sauce, mozzarella cheese, tuna chunks and red onion rings."),
  nonveg("Pizza Aux Crevettes", 720, "Tomato sauce, mozzarella cheese, shrimps sauteed in garlic and parsley."),
  nonveg("Calzone", 750, "Folded pizza with tomato sauce, mozzarella cheese, mushrooms, egg and chicken salami."),
  nonveg("Pizza Manzo", 780, "Tomato sauce, mozzarella cheese, beef tenderloin chunks sauteed in garlic, jalapenos and red onion.", { image: "pizza-3" }),
  nonveg("Pizza Alla Salsiccia", 790, "Tomato sauce, mozzarella cheese, spicy buffalo sausage, onion, black olives and capsicum."),
  nonveg("Pizza Frutti Di Mare", 790, "Tomato sauce, mozzarella cheese, prawns, squid or octopus, as per availability."),

  // Antipasti
  dish("antipasti", "French Fries", 210, { image: "french-fries" }),
  dish("antipasti", "Potato Wedges", 230),
  dish("antipasti", "Calamari Rings", 320, { description: "Squid rings deep fried, served with tartar sauce.", image: "calamari" }),
  dish("antipasti", "Focaccia Romarin", 250, { description: "Thin crust focaccia bread with rosemary, herbs and extra virgin olive oil." }),
  dish("antipasti", "Cheese Garlic Focaccia", 390, { description: "Thin crust focaccia bread with cheese and garlic, served with pesto mayo." }),
  dish("antipasti", "Pizza Marinara", 320, { description: "Pizza with tomato sauce, garlic, olive oil and oregano." }),
  dish("antipasti", "Bruschetta", undefined, {
    description: "Toasted bread, tomatoes, extra virgin olive oil, basil leaves, olives, mozzarella cheese.",
    options: [{ label: "1 pc", price: 110 }, { label: "2 pcs", price: 190 }, { label: "4 pcs", price: 350 }],
  }),
  dish("antipasti", "Soup Of The Day", 230),

  // Salads
  dish("salads", "Salade Tomate", 220, { description: "Tomatoes, lettuce, parmesan shavings, extra virgin olive oil, basil leaves, olives." }),
  dish("salads", "Salade Tomate Et Mozzarella", 320, { description: "Thin slices of tomatoes, fresh bocconcini balls, extra virgin olive oil." }),
  dish("salads", "Salade Feta", 320, { description: "Feta cheese, red onion, tomatoes, capsicum, black olives, lettuce and olive oil dressing.", image: "greek-salad" }),
  dish("salads", "Salade Burrata", 690, { description: "Burrata cheese, tomatoes, cucumber, basil leaves, olives, pesto and balsamic vinegar.", image: "burrata" }),
  dish("salads", "Salade Quinoa", 370, { description: "Quinoa, onion, tomato, cucumber and herbs with lemon olive oil dressing, topped with pesto marinated chicken." }),
  dish("salads", "Canvas Special", 370, { description: "Mozzarella cheese, grilled chicken, iceberg lettuce, boiled egg, tomatoes." }),
  dish("salads", "Salade Oceanica", 480, { description: "Prawns, squid or octopus (as per availability) with iceberg lettuce and tomato slices.", image: "insalata-di-mare" }),

  // Pasta (no price yet: that menu card has not been supplied)
  dish("pasta", "Pomodoro", undefined, { image: "spaghetti-pomodoro" }),
  dish("pasta", "Aglio Olio"),
  dish("pasta", "Arrabiata", undefined, { image: "arrabbiata" }),
  dish("pasta", "Norma"),
  dish("pasta", "Alle Verdure", undefined, { image: "veggie-pasta" }),
  dish("pasta", "Pesto"),
  dish("pasta", "Gorgonzola", undefined, { image: "gorgonzola-pasta" }),
  dish("pasta", "Pollo"),
  dish("pasta", "Puttanesca"),
  dish("pasta", "Bolognese"),
  dish("pasta", "Gamberi", undefined, { image: "creamy-shrimp-pasta" }),
  dish("pasta", "Frutti Di Mare"),

  // Al forno
  dish("forno", "Lasagne Maison", 650, { description: "Beef bolognese, sauce marinara, parmesan cheese, mozzarella cheese, baked in the wood-fire oven.", image: "lasagne-maison" }),
  dish("forno", "Gnocchi Alla Sorrentina", 510, { description: "Homemade gnocchi, tomato sauce, garlic, parmesan cheese, basil leaves, mozzarella cheese, baked in the wood-fire oven.", image: "pasta-2" }),
  dish("forno", "Veg Lasagne", undefined, { vegetarian: true, image: "lasagne" }),

  // Risotto
  dish("risotto", "Risotto Saffron", 470, { description: "Saffron and mushroom.", image: "mushroom-risotto" }),
  dish("risotto", "Risotto Alle Verdure", 510, { description: "Creamy white sauce with zucchini, mushroom, aubergine, capsicum. As per availability." }),
  dish("risotto", "Pollo", 540, { description: "Sauteed chicken in cream sauce." }),
  dish("risotto", "Frutti Di Mare", 640, { description: "Prawns, squid or octopus, as per availability." }),

  // Main courses (Carni)
  dish("mains", "Scaloppine Di Pollo", 650, { description: "Thin slice of chicken breast, grilled vegetables with lemon garlic cream sauce, served with mashed potato, french fries or potato wedges." }),
  dish("mains", "Beef Steak", undefined, {
    description: "200g tenderloin served with grilled vegetables, pepper mushroom sauce, and a choice of mashed potato, fries, or wedges.",
    image: "mains",
  }),

  // Seafood
  dish("seafood", "Gambas À L'ail", 620, { description: "Tiger prawns, fragrant garlic butter and aromatic herbs, served with spaghetti.", image: "gambas" }),
  dish("seafood", "Sea Bass Alla Caponata", 750, { description: "Pan-seared sea bass, paired with a savory caponata, creamy mashed potato and lemon parmesan sauce.", image: "sea-bass" }),
  dish("seafood", "Calamari Al Limone", 620, { description: "Tender whole calamari, pan grilled and sauteed in a lemon garlic sauce with a tint of parsley, served with crispy fries.", image: "seafood" }),

  // Desserts
  dish("desserts", "Panna Cotta", 240, { image: "panna-cotta" }),
  dish("desserts", "Chocolate Mousse", 270, { image: "mousse" }),
  dish("desserts", "Semi Freddo", 300, { image: "semifreddo" }),
  dish("desserts", "Tiramisu", 400, { image: "tiramisu" }),
  dish("desserts", "Trio Di Dessert", 530, { description: "Choose any three of Panna Cotta, Chocolate Mousse, Semi Freddo and Tiramisu.", image: "trio-dessert" }),
  dish("desserts", "Berry Bavarese", 320),
  dish("desserts", "Pizza Nutella", 450),

  // Drinks: cold
  dish("drinks", "Fresh Lime", 90),
  dish("drinks", "Mint Lime", 120),
  dish("drinks", "Ginger Lime", 120),
  dish("drinks", "Soda Lime", 120),
  dish("drinks", "Fresh Juices", undefined, {
    description: "Watermelon, orange or pineapple, as per availability.",
    options: [{ label: "Glass", price: 160 }, { label: "½ litre carafe", price: 220 }],
  }),
  dish("drinks", "Ice Tea", 170),
  dish("drinks", "Cold Coffee", 210),
  dish("drinks", "Mineral Water", 20, { description: "1 litre." }),
  // Drinks: soft drinks
  dish("drinks", "Pepsi", 80),
  dish("drinks", "Pepsi Zero", 80),
  dish("drinks", "7up", 80),
  dish("drinks", "Mountain Dew", 80),
  // Drinks: hot
  dish("drinks", "Ristretto", 120),
  dish("drinks", "Espresso", undefined, { options: [{ label: "Single", price: 120 }, { label: "Double", price: 180 }] }),
  dish("drinks", "Americano", 160),
  dish("drinks", "Caffè Latte", 220),
  dish("drinks", "Cappuccino", 220, { image: "cappuccino" }),
  dish("drinks", "Hot Chocolate", 270),
  dish("drinks", "Tea Infusions", 90, { description: "Peppermint, lemon, ginger, chamomile or green tea." }),
];

export const menuItems: MenuItem[] = items;

/**
 * Pasta choices are general information only. We have not verified that every
 * sauce is available with every shape, so these are never selectable per dish.
 */
export const pastaShapes = ["Gnocchi", "Tagliatelle", "Spaghetti", "Penne", "Fusilli"];

/**
 * Mentioned as popular, but not on the menu cards we have, so deliberately NOT shown on the
 * menu. Move one into `items` once the restaurant confirms it.
 */
export const unverifiedPopularItems = ["Trio Di Pasta"];

export const getItem = (id: string): MenuItem | undefined => menuItems.find((i) => i.id === id);
export const getCategory = (id: CategoryId): MenuCategory => categories.find((c) => c.id === id)!;
