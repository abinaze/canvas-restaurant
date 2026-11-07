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

Every picture is a file in **`src/assets/images/`**, named after its slot:

| File name | Where it appears |
| --- | --- |
| `hero.png` | Home page header (darkened on the left so the text stays readable) |
| `exterior.png`, `exterior-2.png`, `exterior-3.png`, `interior.png`, `interior-2.png`, `interior-3.png`, `interior-4.png`, `outdoor.png` | Story section, About, Reserve, Gallery |
| `pizza.png`, `pasta.png`, `salads.png`, `mains.png`, `seafood.png`, `desserts.png`, `coffee.png` | Menu category tiles and menu section banners, Gallery |
| `pizza-2.png`, `pizza-3.png`, `pasta-2.png`, `lasagne.png`, `tiramisu.png`, `panna-cotta.png`, `mousse.png`, `cold-coffee.png` | Gallery and About |

**To use your own photo:** save it over the file with the same name and commit it. That is all.

```bash
cp ~/Pictures/my-pizza.jpg src/assets/images/pizza.jpg   # a .jpg, .webp or .png all work
rm src/assets/images/pizza.png                            # keep ONE file per name
git add -A && git commit -m "Add pizza photo" && git push
```

- Use landscape photos about 1600 px wide and under about 400 KB; they are cropped to fit, so keep the subject near the centre.
- The files that ship in the repo are simple **placeholder pictures** so the layout is never empty. Replace them.
- Picture descriptions (for screen readers) and the list of slots are in `src/data/images.ts`. Update the description if your photo shows something different.
- To change gallery captions or the gallery order, edit `src/data/gallery.ts`.
- `npm test` fails if a slot has no file, if two files share a name, or if a file is not in the list, so mistakes are caught before deploying.

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

All in **`src/data/menu.ts`**. Add or remove a dish, set `price` (rupees) only when the restaurant has confirmed it (it then appears next to the dish), add `description` only with text the restaurant supplied, and add the dish id to `CONFIRMED_VEGETARIAN` only when confirmed. Calamari Rings, Trio Di Pasta, Bruschetta and French Fries (`unverifiedPopularItems`) are hidden until availability is confirmed.

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
- [ ] **Prices, descriptions, vegetarian status** and which dishes are served.
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
