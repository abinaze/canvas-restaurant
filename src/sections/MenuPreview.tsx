import { useState } from "react";
import { Link } from "react-router-dom";
import { categories, menuItems } from "../data/menu";
import { Art, type ArtKind } from "../components/Art";

const previewArt: Record<string, { kind: ArtKind; seed: string }> = {
  pizza: { kind: "pizza", seed: "pizza-margarita" },
  pasta: { kind: "pasta", seed: "pasta-pomodoro" },
  salads: { kind: "salad", seed: "salad" },
  mains: { kind: "steak", seed: "steak" },
  seafood: { kind: "seafood", seed: "seafood-gambas" },
  desserts: { kind: "tiramisu", seed: "tiramisu" },
  coffee: { kind: "coffee", seed: "cappuccino" },
};

export function MenuPreview() {
  const [active, setActive] = useState(categories[0].id);
  const art = previewArt[active];
  return (
    <section className="section" aria-labelledby="menu-preview-title">
      <div className="wrap grid items-start gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <h2 id="menu-preview-title" className="h-section">What’s on the menu</h2>
          <ul className="mt-10 border-t border-line">
            {categories.map((c) => {
              const count = menuItems.filter((i) => i.category === c.id).length;
              return (
                <li key={c.id} className="border-b border-line">
                  <Link
                    to={`/menu?category=${c.id}`}
                    onMouseEnter={() => setActive(c.id)}
                    onFocus={() => setActive(c.id)}
                    className="group flex items-baseline gap-4 py-4 transition-colors hover:text-tomato"
                  >
                    <span className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-none">{c.name}</span>
                    <span className="leader" aria-hidden />
                    <span className="text-sm text-muted">{count} {count === 1 ? "dish" : "dishes"}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link to="/menu" className="btn btn-primary mt-10">Explore the full menu</Link>
        </div>

        <div aria-hidden className="sticky top-28 hidden lg:block">
          <div className="arch aspect-[3/4] w-full bg-linen">
            <Art key={active} kind={art.kind} seed={art.seed} className="h-full w-full [&_rect:first-child]:opacity-100" />
          </div>
        </div>
      </div>
    </section>
  );
}
