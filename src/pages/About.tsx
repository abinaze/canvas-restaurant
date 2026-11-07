import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { restaurant } from "../data/restaurant";
import { Photo } from "../components/Photo";

const meta = routes.find((r) => r.path === "about")!;

export default function About() {
  usePageMeta(meta.title, meta.description);
  return (
    <>
      <section className="on-ink bg-ink pb-16 pt-32 text-paper">
        <div className="wrap grid items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h1 className="h-display max-w-3xl">Italian food, made for lingering over</h1>
            <p className="lede mt-5">{restaurant.description}</p>
          </div>
          <Photo name="exterior" className="arch mx-auto aspect-[3/4] w-full max-w-xs lg:mx-0 lg:ml-auto" />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-16">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Photo name="pizza" className="aspect-[4/3] w-full rounded-[3px]" />
            <div>
              <h2 className="h-section">Pizza from the wood fire</h2>
              <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed">Pizza is at the heart of Canvas. The menu runs from a classic Margarita and 4 Cheese to Pizzaiolo, Calzone and seafood pizzas, all made in the wood-fired oven the restaurant is known for.</p>
            </div>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="md:order-2"><Photo name="pasta" className="aspect-[4/3] w-full rounded-[3px]" /></div>
            <div>
              <h2 className="h-section">Pasta, prepared fresh</h2>
              <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed">From Pomodoro and Aglio Olio to Bolognese, Gamberi and lasagne, the pasta side of the menu covers the Italian favourites, with gnocchi, tagliatelle, spaghetti, penne and fusilli among the shapes.</p>
            </div>
          </div>

          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <Photo name="tiramisu" className="aspect-[4/3] w-full rounded-[3px]" />
            <div>
              <h2 className="h-section">Seafood, desserts and coffee</h2>
              <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed">Calamari Al Limone and Gambas À L’ail lead the seafood. Tiramisu, Panna Cotta, Chocolate Mousse and Semi Freddo close the meal, and there’s espresso, cappuccino and cold coffee to go with them.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-linen">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="h-section">Warm hospitality, unhurried setting</h2>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed">Guests often mention the friendly service and the atmosphere. It’s a relaxed place that still feels like an occasion, set on Vadathazha Lane in Fort Kochi.</p>
            <Link to="/reviews" className="link-underline mt-5 inline-block font-semibold">What guests say</Link>
          </div>
          <dl className="grid gap-5 text-[1rem]">
            <div><dt className="font-semibold">Where</dt><dd className="text-muted">{restaurant.address.street}, {restaurant.address.locality}, {restaurant.address.region} {restaurant.address.postalCode}</dd></div>
            <div><dt className="font-semibold">Typical spend</dt><dd className="text-muted">{restaurant.priceRange} (indicative, not a menu price)</dd></div>
            <div><dt className="font-semibold">Cuisine</dt><dd className="text-muted">Italian-inspired</dd></div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <h2 className="h-section max-w-xl">Come hungry</h2>
          <div className="flex flex-wrap gap-3">
            <Link to="/menu" className="btn btn-primary">See the menu</Link>
            <Link to="/reserve" className="btn btn-outline">Request a table</Link>
          </div>
        </div>
      </section>
    </>
  );
}
