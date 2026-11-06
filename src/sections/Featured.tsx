import { Link } from "react-router-dom";
import { featuredItems, getCategory } from "../data/menu";
import { Picture } from "../components/Picture";
import { itemArt } from "../components/MenuCard";

export function Featured() {
  const [lead, ...rest] = featuredItems;
  return (
    <section className="section" aria-labelledby="featured-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="featured-title" className="h-section max-w-xl">From the oven, the pan and the pastry counter</h2>
          <Link to="/menu" className="link-underline font-semibold">See the full menu</Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <Link to={`/menu?item=${lead.id}`} className="group block">
            <Picture id={lead.id} kind={itemArt(lead)} seed={lead.id} alt={lead.name} decorative className="arch aspect-[4/5] w-full" />
            <h3 className="mt-5 font-display text-4xl">{lead.name}</h3>
            <p className="text-sm text-muted">{getCategory(lead.category).name}</p>
          </Link>

          <ul className="border-t border-line">
            {rest.map((item) => (
              <li key={item.id} className="border-b border-line">
                <Link to={`/menu?item=${item.id}`} className="group flex items-center gap-5 py-4 sm:gap-7">
                  <Picture id={item.id} kind={itemArt(item)} seed={item.id} alt={item.name} decorative className="aspect-[4/3] w-28 shrink-0 rounded-[3px] sm:w-44" />
                  <span className="min-w-0">
                    <span className="block font-display text-[clamp(1.7rem,3vw,2.4rem)] leading-none transition-colors group-hover:text-tomato">{item.name}</span>
                    <span className="mt-1 block text-sm text-muted">{getCategory(item.category).name}</span>
                    {item.description && <span className="mt-2 hidden text-[0.92rem] leading-snug text-muted sm:block">{item.description}</span>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
