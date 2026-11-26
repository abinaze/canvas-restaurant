# Canvas Restaurant & Pizzeria: website

The website for **Canvas Restaurant & Pizzeria**, Vadathazha Lane, Fort Kochi, Kerala 682001.
A fast, static, frontend-only site (React, Vite, TypeScript, Tailwind CSS) hosted free on GitHub Pages.

The site does **not** take orders or payments. Delivery orders are placed on Zomato (every "Order on Zomato" button opens the restaurant's Zomato page). Table requests are written as a WhatsApp message for the guest to send, and a table is reserved only when the restaurant confirms it.

## Contents

1. [Pages](#pages)
2. [Change the pictures](#change-the-pictures)
3. [Run it locally](#run-it-locally)
4. [Deploy to GitHub Pages](#deploy-to-github-pages)
5. [Update restaurant details](#update-restaurant-details)
6. [Update the menu](#update-the-menu)
7. [Logo files](#logo-files)
8. [Owner checklist: things to verify](#owner-checklist-things-to-verify)
9. [Project layout](#project-layout)

## Pages

- **Home**: full-screen hero, menu categories as photo tiles, Zomato delivery band, story, gallery preview, what guests like, table-request band, location.
- **Menu** (58 dishes, 7 categories): category tabs, accent-insensitive search, vegetarian filter, shareable links such as `/menu?category=pizza`. Browse only; no cart.
- **Reserve**: form with validation against opening hours, then a prepared WhatsApp message plus click-to-call.
- **Gallery** (lightbox with arrow keys), **About**, **Reviews** (themes only, with a link to Google Maps), **Contact** (click-to-load map, directions), custom **404**.
- SEO: per-page titles and descriptions, canonical URLs, Open Graph tags, Schema.org `Restaurant` data, sitemap, robots.txt. Accessibility: skip link, visible focus, native dialogs, labelled forms, reduced-motion support, AA colour contrast. No analytics or tracking.

There are no star ratings, review scores or invented claims anywhere on the site.

## Change the pictures

Every picture is a file in **`src/assets/images/`**, named after its slot. The full list of slots, with their descriptions, is in `src/data/images.ts`.

| Slot names | Where they appear |
| --- | --- |
| `hero` | Home page header (darkened on the left so the text stays readable) |
| `exterior`, `exterior-2`, `exterior-3`, `interior`, `interior-2`, `interior-3`, `interior-4`, `outdoor`, `outdoor-1`, `outdoor-2`, `patio-evening`, `oven`, `oven-1` | Story section, About, Reserve, Gallery |
| `pizza`, `pasta`, `salads`, `mains`, `seafood`, `desserts`, `drinks`, `calamari`, `lasagne-maison`, `mushroom-risotto` | Menu category tiles and banners, Gallery |
| Dish pictures such as `pizza-3`, `pasta-2`, `lasagne`, `gambas`, `sea-bass`, `french-fries`, `greek-salad`, `burrata`, `panna-cotta`, `mousse`, `tiramisu`, `semifreddo`, `cappuccino` | Beside the dish on the menu page (where `image` is set in `src/data/menu.ts`) and in the Gallery |
| Everything else in `images.ts` | Gallery only |

The printed menu pages are separate: **`src/assets/menu/`** holds `menu-pizza-veg`, `menu-pizza-nonveg`, `menu-antipasti-salads`, `menu-al-forno`, `menu-seafood`, `menu-desserts` and `menu-drinks`. They appear at the bottom of the menu page and open in a viewer.

### Easiest way: import a folder

Put your pictures in one folder and run (needs Python 3 and `pip install pillow`):

```bash
python scripts/import-images.py "$HOME/Downloads/New folder"            # copies, shrinks and names them
python scripts/import-images.py "$HOME/Downloads/New folder" --dry-run  # only shows what it would do
```

It matches each file to a slot **by its name** (`oven.png` goes to `oven`, `Greek salad.png` to `greek-salad`, any file starting `Menu-` to a menu page), converts it to a smaller `.jpg`, replaces any older file for that slot and lists anything it could not match. To teach it a new file name, add a line to `ALIASES` at the top of the script. Slots in `PROTECTED` (`pizza`, `interior`, `exterior-3`) are never touched, because those pictures are already final.

### By hand

```bash
cp ~/Pictures/my-pizza.jpg src/assets/images/pizza.jpg   # a .jpg, .webp or .png all work
rm src/assets/images/pizza.png                            # keep ONE file per name
git add -A && git commit -m "Add pizza photo" && git push
```

- Use photos about 1200 to 1600 px wide and under about 400 KB; they are cropped to fit, so keep the subject near the centre.
- A slot with no file just shows an empty frame (and is left out of the gallery). It never breaks the build.
- Update the picture description in `src/data/images.ts` if your photo shows something different.
- To change gallery captions or the gallery order, edit `src/data/gallery.ts`.
- `npm test` fails if two files share a name or if a file is not in the list, so mistakes are caught before deploying.

### Optional: download stock photos automatically

If you want stand-in photos quickly, there is a manual GitHub Action that fetches free **Pexels** photos for the dish slots and opens a pull request for you to review. These are generic stock photos, **not pictures of Canvas's food**, so treat them as stand-ins and replace them with real photos. Venue pictures (`hero`, `exterior`, `interior`, `outdoor`) are never fetched, because a stock photo would misrepresent the real place.

1. Get a free API key at <https://www.pexels.com/api/>.
2. In the repository: **Settings, Secrets and variables, Actions, New repository secret**. Name `PEXELS_API_KEY`, paste the key.
3. Open **Actions, Fetch stock photos, Run workflow**. A branch `stock-photos` and a pull request appear. Credits are written to `src/assets/images/CREDITS.md`.

Or run it on your own computer: `PEXELS_API_KEY=your-key node scripts/fetch-photos.mjs` (add slot names to fetch only some, e.g. `pizza pasta`).

The best pictures are the restaurant's own: ask the owner for photos, or save the best ones from the restaurant's Instagram/Facebook with permission.

## Run it locally

You need Node.js 20.19 or newer (22 recommended), from <https://nodejs.org>.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run typecheck` | TypeScript check |
| `npm test` | Unit tests (picture slots, menu data, table-request messages, opening hours) |
| `npm run build` | Typecheck, then production build into `dist/` |
| `npm run preview` | Serve the production build |

Two optional environment variables (see `.env.example`): `VITE_BASE` (path the site is served from, `/` or `/repo-name/`) and `SITE_URL` (full public address, used for SEO and the sitemap).

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` typechecks, tests, builds and deploys on every push to `main`, and sets `VITE_BASE` and `SITE_URL` from the repository name. In **Settings, Pages**, the Source must be **GitHub Actions**. Watch a deployment from a terminal with `gh run watch`.

For a custom domain, add it under Settings, Pages, then set repository variables `VITE_BASE` = `/` and `SITE_URL` = `https://your-domain`.

## Update restaurant details

Everything about the business is in **`src/data/restaurant.ts`**: name, description, address, phone, map location, social links, Zomato link, opening hours. Edit it once and the header, footer, contact page, SEO data and WhatsApp messages follow. Page titles and descriptions are in `src/data/routes.ts`; colours and fonts are at the top of `src/styles/index.css`.

## Update the menu

All in **`src/data/menu.ts`**. Dishes, descriptions and prices are copied from the restaurant's printed menu cards (prices are printed as inclusive of taxes). Add or remove a dish, set `price` (rupees) or `options` (several sizes), set `image` to a picture slot only when that picture really shows the dish, and `vegetarian: true` only where the menu says so. Pasta has no prices yet because that menu card has not been supplied. Trio Di Pasta (`unverifiedPopularItems`) is hidden until it is confirmed.

## Logo files

`public/brand/` holds the logo as clean vector artwork, rebuilt from the supplied low-resolution image:

- `canvas-logo-black.svg` / `canvas-logo-white.svg` and 2000 px PNG versions (transparent background)
- `canvas-gable.svg` (the gable mark alone)
- `logo-supplied.png` (the original image you supplied)

The gable was traced from your logo; the lettering is re-typeset in a matching heavy condensed typeface with the spelling corrected to **"Restaurant & Pizzeria"** (the supplied image reads "Restaurent"). If you have the original vector logo from the designer, use that instead.

## Owner checklist: things to verify

- [ ] **Phone number.** The brief gave +91 73561 14909; a public listing shows +91 94478 80111. Confirm which is answered and which is on WhatsApp.
- [ ] **Map location.** The site uses the location of your Google Maps link (9.9630543, 76.2411871). The coordinates in the original brief were about 500 m away. Confirm.
- [ ] **Opening hours** (shown as 12 noon to 12 midnight daily).
- [ ] **Prices and dishes.** Everything except pasta comes from the printed menu cards; check it is still current. Send the pasta card to add its prices. The pizza card prints *Caprese* twice (the first copy has the aubergine and zucchini description of *Alle Verdure*); only the mozzarella-and-rocket one is shown, so confirm that. Zomato prices may differ from the in-restaurant prices.
- [ ] **Dish pictures.** They are matched to dishes by file name only; check each one really shows that dish.
- [ ] **Delivery:** the site only links to Zomato. Confirm that is how delivery works.
- [ ] **Photographs:** replace the placeholders (see above).
- [ ] **Table requests by WhatsApp:** does the restaurant want them there?
- [ ] **Tripadvisor:** no verified link was available, so none is shown.

## Project layout

```
src/
  assets/images/ picture files, one per slot (replace these)
  data/          restaurant.ts, menu.ts, reviews.ts, gallery.ts, images.ts, routes.ts
  components/    navigation, footer, photo, logo, lightbox, map
  sections/      home page sections
  pages/         Home, Menu, About, Gallery, Reviews, Contact, Reserve, NotFound
  styles/        design tokens and global styles
scripts/         fetch-photos.mjs (optional stock photo download)
public/          favicon, Open Graph image, brand/ (logo files)
vite.config.ts   build, base path, SEO files (structured data, sitemap, robots, 404.html)
```
