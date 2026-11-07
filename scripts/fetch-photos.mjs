#!/usr/bin/env node
/**
 * Downloads stock food photos from Pexels (free licence) into src/assets/images/.
 *
 *   PEXELS_API_KEY=xxxx node scripts/fetch-photos.mjs            # all dish slots
 *   PEXELS_API_KEY=xxxx node scripts/fetch-photos.mjs pizza pasta # only these slots
 *
 * Get a free key at https://www.pexels.com/api/ . Needs Node 20+, no packages.
 *
 * IMPORTANT: these are generic stock photos, NOT pictures of Canvas's own dishes.
 * Use them as stand-ins and replace them with the restaurant's real photographs.
 * The venue pictures (hero, exterior, interior, outdoor) are never fetched, because a
 * stock photo of "a restaurant" would misrepresent the real place.
 */
import { mkdir, readdir, rm, writeFile, appendFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), "../src/assets/images");
const API = process.env.PEXELS_API_BASE ?? "https://api.pexels.com/v1";
const KEY = process.env.PEXELS_API_KEY;

/** slot name -> search query */
const QUERIES = {
  pizza: "wood fired pizza",
  "pizza-2": "margherita pizza",
  "pizza-3": "pizza cheese slice",
  pasta: "spaghetti pasta plate",
  "pasta-2": "gnocchi",
  lasagne: "lasagna",
  salads: "fresh salad bowl",
  mains: "grilled beef steak",
  seafood: "seafood prawns pan",
  desserts: "italian dessert",
  tiramisu: "tiramisu",
  "panna-cotta": "panna cotta",
  mousse: "chocolate mousse",
  coffee: "cappuccino cup",
  "cold-coffee": "iced coffee",
};

if (!KEY) {
  console.error("Set PEXELS_API_KEY first (free at https://www.pexels.com/api/).");
  process.exit(1);
}

const wanted = process.argv.slice(2);
const slots = wanted.length ? wanted : Object.keys(QUERIES);
for (const s of slots) {
  if (!QUERIES[s]) {
    console.error(`Unknown or venue slot "${s}". Allowed: ${Object.keys(QUERIES).join(", ")}`);
    process.exit(1);
  }
}

await mkdir(OUT, { recursive: true });
const used = new Set();
const credits = [];
let failed = 0;

for (const slot of slots) {
  try {
    const url = `${API}/search?query=${encodeURIComponent(QUERIES[slot])}&orientation=landscape&size=large&per_page=20`;
    const res = await fetch(url, { headers: { Authorization: KEY } });
    if (!res.ok) throw new Error(`search failed: HTTP ${res.status}`);
    const { photos = [] } = await res.json();
    const pick = photos.find((p) => !used.has(p.id) && p.width >= 1600 && p.width > p.height);
    if (!pick) throw new Error("no suitable landscape photo found");
    used.add(pick.id);
    const img = await fetch(pick.src.large2x ?? pick.src.large);
    if (!img.ok) throw new Error(`download failed: HTTP ${img.status}`);
    const buf = Buffer.from(await img.arrayBuffer());
    // Replace the placeholder (any extension) with the new .jpg
    for (const f of await readdir(OUT)) if (f.replace(/\.[^.]+$/, "") === slot) await rm(resolve(OUT, f));
    await writeFile(resolve(OUT, `${slot}.jpg`), buf);
    credits.push(`- ${slot}.jpg: "${pick.alt || QUERIES[slot]}" by ${pick.photographer} (${pick.photographer_url}), via Pexels: ${pick.url}`);
    console.log(`ok   ${slot}  ${(buf.length / 1024).toFixed(0)} KB  ${pick.photographer}`);
  } catch (e) {
    failed++;
    console.error(`FAIL ${slot}: ${e.message}`);
  }
}

if (credits.length) {
  await appendFile(
    resolve(OUT, "CREDITS.md"),
    `\n## Stock photos fetched ${new Date().toISOString().slice(0, 10)}\n\nGeneric stock images from Pexels (https://www.pexels.com/license/). They are not photos of Canvas's own dishes.\n\n${credits.join("\n")}\n`,
  );
}
console.log(`\n${credits.length} downloaded, ${failed} failed.`);
process.exit(failed && !credits.length ? 1 : 0);
