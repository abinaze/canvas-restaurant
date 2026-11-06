import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X, Leaf, Info } from "lucide-react";
import { categories, menuItems, MENU_NOTE, pastaShapes, getItem } from "../data/menu";
import { routes } from "../data/routes";
import { usePageMeta } from "../hooks/usePageMeta";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { MenuCard } from "../components/MenuCard";
import { ItemDialog } from "../components/ItemDialog";
import type { CategoryId, MenuItem } from "../types";

const meta = routes.find((r) => r.path === "menu")!;
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Menu() {
  usePageMeta(meta.title, meta.description);
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") as CategoryId | null) ?? "all";
  const query = params.get("q") ?? "";
  const veg = params.get("veg") === "1";
  const openId = params.get("item");
  const { ids: recentIds, record, clear } = useRecentlyViewed();
  const [lastOpened, setLastOpened] = useState<MenuItem | null>(null);

  const setParam = (key: string, value: string | null) =>
    setParams((p) => {
      const next = new URLSearchParams(p);
      if (value) next.set(key, value); else next.delete(key);
      return next;
    }, { replace: true });

  const openItem = (item: MenuItem) => { record(item.id); setLastOpened(item); setParam("item", item.id); };
  const closeItem = () => setParam("item", null);
  const dialogItem = openId ? (getItem(openId) ?? lastOpened) : null;

  const groups = useMemo(() => {
    const q = fold(query.trim());
    return categories
      .filter((c) => category === "all" || c.id === category)
      .map((c) => ({
        category: c,
        items: menuItems.filter((i) => i.category === c.id && (!q || fold(i.name).includes(q)) && (!veg || i.vegetarian)),
      }))
      .filter((g) => g.items.length > 0);
  }, [category, query, veg]);

  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const recent = recentIds.map((id) => getItem(id)).filter((i): i is MenuItem => Boolean(i));
  const vegCount = menuItems.filter((i) => i.vegetarian).length;

  return (
    <>
      <section className="bg-ink pb-12 pt-32 text-paper on-ink">
        <div className="wrap">
          <h1 className="h-display max-w-3xl">The menu</h1>
          <p className="lede mt-4">Wood-fired pizza, pasta, salads, mains, seafood, desserts and coffee. Pick what you like and send us an enquiry on WhatsApp.</p>
          <p className="mt-6 flex max-w-2xl items-start gap-2 rounded-[3px] border border-white/20 px-4 py-3 text-[0.92rem] text-[#e6e0d0]" role="note">
            <Info size={18} className="mt-0.5 shrink-0 text-ochre" aria-hidden /> {MENU_NOTE}
          </p>
        </div>
      </section>

      <div className="sticky top-[4.25rem] z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="wrap flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Menu categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
            <button type="button" className="chip" aria-pressed={category === "all"} onClick={() => setParam("category", null)}>All</button>
            {categories.map((c) => (
              <button key={c.id} type="button" className="chip" aria-pressed={category === c.id} onClick={() => setParam("category", c.id)}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 lg:w-64 lg:flex-none">
              <label htmlFor="menu-search" className="sr-only">Search the menu by dish name</label>
              <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden />
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(e) => setParam("q", e.target.value || null)}
                placeholder="Search dishes"
                className="input pl-10"
                autoComplete="off"
              />
            </div>
            <button type="button" className="chip" aria-pressed={veg} onClick={() => setParam("veg", veg ? null : "1")} title="Shows only dishes the restaurant has confirmed as vegetarian">
              <Leaf size={15} aria-hidden /> Vegetarian
            </button>
          </div>
        </div>
      </div>

      <div className="wrap section !pt-10">
        <p className="mb-8 text-sm text-muted" role="status" aria-live="polite">
          {total} {total === 1 ? "dish" : "dishes"}
          {veg && ` marked vegetarian. Only ${vegCount} ${vegCount === 1 ? "dish is" : "dishes are"} confirmed so far; ask the restaurant about others.`}
        </p>

        {groups.length === 0 ? (
          <div className="mx-auto max-w-md py-16 text-center">
            <h2 className="font-display text-4xl">Nothing matches that</h2>
            <p className="mt-3 text-muted">
              {query ? `We couldn’t find “${query}”.` : "No dishes match these filters."} Try a different spelling or clear the filters.
            </p>
            <button type="button" className="btn btn-ink mt-6" onClick={() => setParams({}, { replace: true })}>
              <X size={16} aria-hidden /> Clear search and filters
            </button>
          </div>
        ) : (
          <div className="grid gap-16">
            {groups.map(({ category: c, items }) => (
              <section key={c.id} aria-labelledby={`cat-${c.id}`}>
                <div className="mb-6 flex items-baseline gap-4">
                  <h2 id={`cat-${c.id}`} className="h-section">{c.name}</h2>
                  <span className="leader" aria-hidden />
                  <p className="text-sm text-muted">{c.blurb}</p>
                </div>
                {c.id === "pasta" && (
                  <p className="mb-6 max-w-2xl rounded-[3px] bg-linen px-4 py-3 text-[0.92rem]">
                    <strong>Pasta shapes:</strong> {pastaShapes.join(", ")}. Which shapes come with which sauce is not confirmed here, so please ask the restaurant.
                  </p>
                )}
                <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => <MenuCard key={item.id} item={item} onOpen={openItem} />)}
                </div>
              </section>
            ))}
          </div>
        )}

        {recent.length > 0 && (
          <section className="mt-20 border-t border-line pt-8" aria-labelledby="recent">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="recent" className="font-display text-3xl">Recently viewed</h2>
              <button type="button" onClick={clear} className="link-underline text-sm text-muted">Clear</button>
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {recent.map((i) => (
                <li key={i.id}><button type="button" className="chip" onClick={() => openItem(i)}>{i.name}</button></li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <ItemDialog item={dialogItem} onClose={closeItem} />
    </>
  );
}
