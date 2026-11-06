import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const setMeta = (selector: string, attr: string, value: string, create?: () => HTMLElement) => {
  let el = document.head.querySelector<HTMLElement>(selector);
  if (!el && create) { el = create(); document.head.appendChild(el); }
  el?.setAttribute(attr, value);
};

/** Per-page title, description, canonical and Open Graph tags. */
export function usePageMeta(title: string, description: string, opts: { noindex?: boolean } = {}) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    const path = pathname.replace(/^\/+/, "");
    const url = `${__SITE_URL__}/${path}`;
    setMeta('link[rel="canonical"]', "href", url, () => Object.assign(document.createElement("link"), { rel: "canonical" }));
    setMeta('meta[property="og:url"]', "content", url);
    const robots = document.head.querySelector('meta[name="robots"]');
    if (opts.noindex) {
      setMeta('meta[name="robots"]', "content", "noindex", () => Object.assign(document.createElement("meta"), { name: "robots" }));
    } else robots?.remove();
  }, [title, description, pathname, opts.noindex]);
}
