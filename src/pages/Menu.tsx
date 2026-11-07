import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ExternalLink, Info, Leaf, Search, X } from "lucide-react";
import { categories, menuItems, MENU_NOTE, pastaShapes } from "../data/menu";
import { routes } from "../data/routes";
import { restaurant } from "../data/restaurant";
import { usePageMeta } from "../hooks/usePageMeta";
import { Photo } from "../components/Photo";
import { formatRupees } from "../utils/format";
import type { CategoryId } from "../types";

const meta = routes.find((r) => r.path === "menu")!;
const fold = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

export default function Menu() {
  usePageMeta(meta.title, meta.description);
  const [params, setParams] = useSearchParams();
  const category = (params.get("category") as CategoryId | null) ?? "all";
  const query = params.get("q") ?? "";
  const veg = params.get("veg") === "1";

  const setParam = (key: string, value: string | null) =>
    setParams((p) => {
      const next = new URLSearchParams(p);
      if (value) next.set(key, value); else next.delete(key);
      return next;
    }, { replace: true });

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
  const vegCount = menuItems.filter((i) => i.vegetarian).length;

  return (
    <>
      <section className="bg-ink pb-12 pt-32 text-paper on-ink">
        <div className="wrap grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h1 className="h-display">The menu</h1>
            <p className="lede mt-4">Wood-fired pizza, pasta, salads, mains, seafood, desserts and coffee.</p>
            <p className="mt-6 flex max-w-2xl items-start gap-2 rounded-[3px] border border-white/20 px-4 py-3 text-[0.92rem] text-[#e6e0d0]" role="note">
              <Info size={18} className="mt-0.5 shrink-0 text-ochre" aria-hidden /> {MENU_NOTE}
            </p>
          </div>
          <div className="lg:justify-self-end">
            <a href={restaurant.links.zomato} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Order delivery on Zomato<ExternalLink size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <div className="sticky top-[4.25rem] z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div className="wrap flex flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Menu categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0">
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
            <h2 className="h-section">Nothing matches that</h2>
            <p className="mt-3 text-muted">
              {query ? `We couldn’t find “${query}”.` : "No dishes match these filters."} Try a different spelling or clear the filters.
            </p>
            <button type="button" className="btn btn-ink mt-6" onClick={() => setParams({}, { replace: true })}>
              <X size={16} aria-hidden /> Clear search and filters
            </button>
          </div>
        ) : (
          <div className="grid gap-16">
            {groups.map(({ category: c, items }, gi) => (
              <section key={c.id} aria-labelledby={`cat-${c.id}`}>
                <div className="relative mb-6 flex h-40 items-end overflow-hidden rounded-[3px] text-paper sm:h-48">
                  <Photo name={c.image} decorative eager={gi === 0} className="!absolute inset-0" />
                  <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(23_21_15/0.85),rgb(23_21_15/0.1)_75%)]" />
                  <div className="relative flex w-full flex-wrap items-end justify-between gap-x-6 gap-y-1 p-4 sm:p-5">
                    <h2 id={`cat-${c.id}`} className="h-section">{c.name}</h2>
                    <p className="pb-1 text-[#e6e0d0]">{c.blurb}</p>
                  </div>
                </div>
                {c.id === "pasta" && (
                  <p className="mb-6 max-w-2xl rounded-[3px] bg-linen px-4 py-3 text-[0.92rem]">
                    <strong>Pasta shapes:</strong> {pastaShapes.join(", ")}. Which shapes come with which sauce is not confirmed here, so please ask the restaurant.
                  </p>
                )}
                <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <li key={item.id} className="border-b border-line py-3.5">
                      <p className="flex items-baseline justify-between gap-3">
                        <span className="text-[1.05rem] font-semibold">
                          {item.name}
                          {item.vegetarian && (
                            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-basil/10 px-2 py-0.5 align-middle text-xs font-semibold text-basil">
                              <Leaf size={12} aria-hidden /> Veg
                            </span>
                          )}
                        </span>
                        {typeof item.price === "number" && <span className="shrink-0 text-sm">{formatRupees(item.price)}</span>}
                      </p>
                      {item.description && <p className="mt-1 text-[0.92rem] leading-snug text-muted">{item.description}</p>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
