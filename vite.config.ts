import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { writeFileSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { restaurant, fullAddress } from "./src/data/restaurant.ts";
import { routes, sitemapPaths } from "./src/data/routes.ts";

const normaliseBase = (b: string): string => (b.startsWith("/") ? b : `/${b}`).replace(/\/?$/, "/");

/**
 * Writes SEO files from the central data: canonical, Open Graph, structured data,
 * sitemap.xml, robots.txt, and a 404.html copy so GitHub Pages serves the SPA on deep links.
 * Only verified facts go into structured data: no ratings, prices or hours.
 */
function seoPlugin(siteUrl: string): Plugin {
  const home = routes[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.description,
    url: `${siteUrl}/`,
    telephone: `+${restaurant.phone.e164Digits}`,
    servesCuisine: restaurant.cuisine,
    hasMenu: `${siteUrl}/menu`,
    hasMap: restaurant.links.googleMaps,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.street,
      addressLocality: restaurant.address.locality,
      addressRegion: restaurant.address.region,
      postalCode: restaurant.address.postalCode,
      addressCountry: restaurant.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: restaurant.geo.lat, longitude: restaurant.geo.lng },
    sameAs: [restaurant.links.instagram, restaurant.links.facebook, restaurant.links.zomato],
  };
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  let outDir = "dist";

  return {
    name: "canvas-seo",
    configResolved(c) {
      outDir = resolve(c.root, c.build.outDir);
    },
    transformIndexHtml(html) {
      const image = `${siteUrl}/og-image.png`;
      return {
        html: html
          .replaceAll("%PAGE_TITLE%", esc(home.title))
          .replaceAll("%PAGE_DESCRIPTION%", esc(home.description))
          .replaceAll("%SITE_URL%", siteUrl)
          .replaceAll("%OG_IMAGE%", image)
          .replaceAll("%SITE_NAME%", esc(restaurant.name))
          .replaceAll("%ADDRESS%", esc(fullAddress())),
        tags: [{ tag: "script", attrs: { type: "application/ld+json" }, children: JSON.stringify(jsonLd), injectTo: "head" }],
      };
    },
    writeBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = sitemapPaths
        .map((p) => `  <url><loc>${siteUrl}/${p}</loc><lastmod>${today}</lastmod></url>`)
        .join("\n");
      writeFileSync(join(outDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
      writeFileSync(join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
      // GitHub Pages serves 404.html for unknown paths; the SPA then renders the right route.
      writeFileSync(join(outDir, "404.html"), readFileSync(join(outDir, "index.html")));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normaliseBase(process.env.VITE_BASE ?? env.VITE_BASE ?? "/");
  const origin = (process.env.SITE_URL ?? env.SITE_URL ?? "https://example.github.io/canvas-restaurant").replace(/\/$/, "");
  // SITE_URL is the full public address of the site root, including any sub-path.
  const siteUrl = origin;
  return {
    base,
    define: { __SITE_URL__: JSON.stringify(siteUrl) },
    plugins: [react(), tailwindcss(), seoPlugin(siteUrl)],
    build: {
      target: "es2022",
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return undefined;
            if (/node_modules\/(react|react-dom|react-router|react-router-dom|scheduler)\//.test(id)) return "react";
            return undefined;
          },
        },
      },
    },
  };
});
