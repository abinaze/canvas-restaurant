import { Link } from "react-router-dom";
import { categories, menuItems } from "../data/menu";
import { Photo } from "../components/Photo";

// Mobile: pizza spans the row, then pairs. Desktop: pizza is a 2x2 lead, desserts and coffee span two columns.
const layout: Record<string, string> = {
  pizza: "col-span-2 md:row-span-2",
  desserts: "md:col-span-2",
  coffee: "md:col-span-2",
};

export function Categories() {
  return (
    <section className="section" aria-labelledby="categories-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="categories-title" className="h-section">The menu</h2>
          <Link to="/menu" className="link-underline font-semibold">See every dish</Link>
        </div>
        <ul className="mt-10 grid auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[13.5rem] md:grid-cols-4">
          {categories.map((c) => {
            const count = menuItems.filter((i) => i.category === c.id).length;
            return (
              <li key={c.id} className={layout[c.id] ?? ""}>
                <Link to={`/menu?category=${c.id}`} className="group relative block h-full overflow-hidden rounded-[3px] text-paper">
                  <Photo name={c.image} decorative className="!absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span aria-hidden className="absolute inset-0 bg-[linear-gradient(0deg,rgb(23_21_15/0.82),transparent_60%)]" />
                  <span className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
                    <span className="h-sub text-[clamp(1.5rem,2.6vw,2.2rem)]">{c.name}</span>
                    <span className="shrink-0 whitespace-nowrap pb-1 text-sm text-[#e6e0d0]">{count} {count === 1 ? "dish" : "dishes"}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
