# Canvas Restaurant & Pizzeria: website

The website for **Canvas Restaurant & Pizzeria**, Vadathazha Lane, Fort Kochi, Kerala 682001.
It is a fast, static, frontend-only site (React, Vite, TypeScript, Tailwind CSS) that can be hosted free on GitHub Pages.

There is no backend, database, login or payment system. Orders and table requests are written as WhatsApp messages for the customer to send, and nothing is confirmed until the restaurant replies. The site says so wherever it matters.

## Contents

1. [Features](#features)
2. [Technology](#technology)
3. [Run it locally](#run-it-locally)
4. [Production build](#production-build)
5. [Deploy to GitHub Pages](#deploy-to-github-pages)
6. [Update restaurant details](#update-restaurant-details)
7. [Update the menu](#update-the-menu)
8. [Replace the food photographs](#replace-the-food-photographs)
9. [Update phone and social links](#update-phone-and-social-links)
10. [What needs a backend later](#what-needs-a-backend-later)
11. [Owner checklist: things to verify](#owner-checklist-things-to-verify)
12. [Project layout](#project-layout)

## Features

- **Home**: hero, favourites, story, menu preview, gallery preview, guest feedback, table-request band, location.
- **Menu** (58 dishes, 7 categories): category tabs, accent-insensitive search, vegetarian filter, dish dialog, quantity, optional side for Beef Steak, recently viewed dishes, shareable links such as `/menu?item=mains-beef-steak`.
- **Order enquiry**: cart with quantity editing and removal, saved in the browser's local storage, then a WhatsApp enquiry with name, phone, dine-in/takeaway/delivery, items, and notes. A total appears only if every dish has a verified price. There is also a Zomato link and a "copy the enquiry text" fallback.
- **Table request**: form with validation against opening hours, then a prepared WhatsApp message plus click-to-call.
- **Gallery**: category filter, lightbox with next/previous, keyboard arrows, Escape to close, lazy loading.
- **About, Reviews, Contact, custom 404.**
- Floating WhatsApp button, mobile "View order" button, scroll-to-top, toasts, copy address, share link, click-to-call.
- Click-to-load map (nothing is requested from Google until the visitor asks), so no cookies or API key.
- SEO: per-page titles and descriptions, canonical URLs, Open Graph/Twitter tags, Schema.org `Restaurant` data, sitemap, robots.txt.
- Accessibility: skip link, visible focus, native dialogs (focus trap, Escape), labelled forms with error messages, reduced-motion support, WCAG AA colour contrast. No analytics or tracking.

## Technology

React 19, Vite, TypeScript (strict), Tailwind CSS 4, React Router, Framer Motion (lazy-loaded, used for the hero illustration), Lucide icons, Vitest. Fonts (Archivo and Instrument Serif) are self-hosted through Fontsource, so there is no Google Fonts request.

## Run it locally

You need Node.js 20.19 or newer (22 recommended).

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command             | What it does                                      |
| ------------------- | ------------------------------------------------- |
| `npm run dev`       | Start the development server                      |
| `npm run typecheck` | TypeScript check                                  |
| `npm test`          | Unit tests (cart logic, WhatsApp messages, hours) |
| `npm run build`     | Typecheck, then production build into `dist/`     |
| `npm run preview`   | Serve the production build locally                |

## Production build

```bash
npm run build
npm run preview
```

Two optional environment variables control where the site lives (see `.env.example`):

| Variable    | Meaning                                                  | Default                                        |
| ----------- | -------------------------------------------------------- | ---------------------------------------------- |
| `VITE_BASE` | Path the site is served from. `/` or `/repo-name/`.      | `/`                                            |
| `SITE_URL`  | Full public address, no trailing slash (SEO and sitemap) | `https://example.github.io/canvas-restaurant`  |

Build output also contains `sitemap.xml`, `robots.txt` and a `404.html` copy so deep links work on GitHub Pages.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main`. It sets `VITE_BASE` and `SITE_URL` from your repository name automatically.

1. Create a GitHub repository (for example `canvas-restaurant`) and push this project.
2. In the repository open **Settings, then Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or open **Actions** and run **Deploy to GitHub Pages**).
4. When the run finishes, the address appears in the workflow summary and under Settings, Pages. It will look like `https://<your-username>.github.io/<repo-name>/`.

```bash
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

**Custom domain:** add the domain under Settings, Pages, then create two repository variables (Settings, Secrets and variables, Actions, Variables): `VITE_BASE` = `/` and `SITE_URL` = `https://your-domain`.

**Netlify or Vercel (optional):** import the repository, build command `npm run build`, output directory `dist`. Set `SITE_URL` to the final address and leave `VITE_BASE` unset. For deep links, add a rewrite of `/*` to `/index.html` (status 200).

## Update restaurant details

Everything about the business lives in **`src/data/restaurant.ts`**: name, description, address, phone, WhatsApp number, map location, social links, opening hours, price range, and the Google rating snapshot. Edit it once and the header, footer, contact page, SEO data and WhatsApp messages all follow.

- **Opening hours** are the `hours` list. Days are 0 (Sunday) to 6 (Saturday); times are 24-hour, and `"24:00"` means midnight. Split into several entries for different weekday/weekend hours.
- **Page titles and descriptions** are in `src/data/routes.ts`.
- **Colours and fonts** are the tokens at the top of `src/styles/index.css`.

## Update the menu

Everything is in **`src/data/menu.ts`**.

- Add or remove a dish by editing the lists passed to `make(...)`, or add a full object to `items` if it needs a description, price or option.
- **Prices:** add `price: 450` (rupees) to a dish only once the restaurant has confirmed it. Dishes without a price show "Price on request". The order total appears automatically when every dish in an order has a price.
- **Descriptions:** add `description` only with text the restaurant has supplied.
- **Vegetarian:** add the dish id to `CONFIRMED_VEGETARIAN`. Only confirmed dishes appear under the Vegetarian filter.
- **Favourites** on the home page: the `FEATURED` set.
- **Pasta shapes** are general information (`pastaShapes`). Items listed as popular but not verified (`unverifiedPopularItems`: Calamari Rings, Trio Di Pasta, Bruschetta, French Fries) are deliberately hidden until availability is confirmed. Move one into `items` to show it.

## Replace the food photographs

Until real photographs are supplied the site shows original, clearly labelled illustrations. It never presents stock photos as pictures of the restaurant.

1. Put the photo in `public/images/<folder>/` (`pizzas`, `pasta`, `desserts`, `drinks`, `mains`, `restaurant`). JPG or WebP, ideally under 300 KB, about 1200 px wide.
2. Open **`src/data/images.ts`** and add one line keyed by the dish id (from `menu.ts`) or gallery id (from `gallery.ts`):

   ```ts
   "pizza-pizza-manzo": { src: "images/pizzas/manzo.jpg", alt: "Pizza Manzo fresh from the oven", official: true },
   ```

3. Set `official: true` only for photos taken at, or supplied by, the restaurant. Other images are labelled "Representative image".

Useful keys: `story` (home page story), `about-hero`, `about-pizza`, `about-pasta`, `about-dessert`, and every `gallery-*` id. If a photo fails to load, the illustration is shown instead. No component needs editing.

To change gallery captions or add gallery entries, edit `src/data/gallery.ts`.

## Update phone and social links

All in `src/data/restaurant.ts`:

- `phone.display` (shown) and `phone.e164Digits` (digits with country code, used for `tel:` and WhatsApp links).
- `links.instagram`, `links.facebook`, `links.zomato`, `links.googleMaps`.
- `whatsappOrdersConfirmed`: set to `true` only after the restaurant confirms it takes orders on WhatsApp. The button then reads "Order on WhatsApp" instead of "Send order enquiry on WhatsApp".

Guest feedback is in `src/data/reviews.ts`. It is shown as themes, not quotes, because no verified reviewer names or wording were supplied. Add real quotes to `quotes` only with permission.

## What needs a backend later

This site can browse the menu, search and filter, manage a cart, write order and reservation messages, open WhatsApp and Zomato, and show the gallery, contact details and map. It **cannot** do these without restaurant-side systems:

- Confirmed reservations or live table availability
- Receiving and managing orders, or order status updates
- Payments
- Live menu, price or stock sync with Zomato or a POS
- Customer accounts

The cart, message builders and data files are isolated (`src/utils/cart.ts`, `src/utils/whatsapp.ts`, `src/data/`), so a future API can replace the WhatsApp step without redesigning the site.

## Owner checklist: things to verify

- [ ] **Phone number.** The brief gave +91 73561 14909; the public District listing shows +91 94478 80111. Confirm which one is answered and which one is on WhatsApp.
- [ ] **Map location.** The coordinates in the original brief (9.964153, 76.237003) are about 500 m from the place on your Google Maps link and Plus Code. The site uses the Maps link location (9.9630543, 76.2411871). Confirm it is right.
- [ ] **Opening hours** (shown as 12 noon to 12 midnight daily).
- [ ] **Prices** for every dish, and **descriptions**, vegetarian status, and which dishes are served.
- [ ] **WhatsApp orders:** does the restaurant accept orders and table requests there?
- [ ] **Delivery:** does the restaurant deliver itself, or only through Zomato? The site offers delivery only as a preference to be confirmed.
- [ ] **Photographs** (see above) and a high-resolution **logo**. The supplied logo is a small cropped image that also spells "Restaurent", so the site uses a recreated wordmark and the correct spelling.
- [ ] **Google rating** (4.7 from about 2,520 reviews) is a supplied snapshot and is labelled as such.
- [ ] **Price range** (₹400–₹800 per person) is indicative and is not used in structured data.
- [ ] **Tripadvisor:** no verified link was available, so none is shown.

## Project layout

```
src/
  data/          restaurant.ts, menu.ts, reviews.ts, gallery.ts, images.ts, routes.ts
  components/    navigation, footer, menu card, dish dialog, lightbox, map, illustrations
  sections/      home page sections
  pages/         Home, Menu, About, Gallery, Reviews, Contact, Reserve, Cart, NotFound
  context/       cart and toast state
  hooks/         page meta, recently viewed, scroll
  utils/         cart logic, WhatsApp messages, formatting, storage (with tests)
  styles/        design tokens and global styles
public/          favicon, Open Graph image, brand/ (supplied logo), images/ (photos go here)
vite.config.ts   build, base path, SEO files (structured data, sitemap, robots, 404.html)
```
