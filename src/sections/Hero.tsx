import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Photo } from "../components/Photo";
import { GableMark } from "../components/Logo";
import { restaurant, fullAddress, hoursLines, telHref } from "../data/restaurant";

const order = (i: number) => ({ "--i": i }) as React.CSSProperties;

export function Hero() {
  const hours = hoursLines()[0];
  return (
    <section className="on-ink relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      <Photo name="hero" decorative eager className="!absolute inset-0 -z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/30 bg-[linear-gradient(90deg,rgb(23_21_15/0.92)_0%,rgb(23_21_15/0.7)_45%,rgb(23_21_15/0.25)_100%),linear-gradient(0deg,rgb(23_21_15/0.9)_0%,transparent_45%)]" />

      <div className="wrap flex flex-1 flex-col justify-end pb-10 pt-32 lg:pb-14">
        <GableMark className="rise mb-6 h-10 w-auto text-paper sm:h-12" />
        <h1 id="hero-title" style={order(0)} className="rise h-display max-w-4xl text-[clamp(3.4rem,10.5vw,9rem)]">
          Italian, in the heart of Fort&nbsp;Kochi
        </h1>
        <p style={order(1)} className="rise lede mt-6 max-w-xl">
          Wood-fired pizzas, handcrafted pasta and Italian favourites, made for good food and memorable moments.
        </p>
        <div style={order(2)} className="rise mt-8 flex flex-wrap gap-3">
          <a href={restaurant.links.zomato} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Order delivery on Zomato<ExternalLink size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link to="/menu" className="btn btn-outline">See the menu</Link>
          <Link to="/reserve" className="btn btn-outline">Reserve a table</Link>
        </div>
      </div>

      <div className="border-t border-white/15">
        <dl className="wrap grid gap-x-10 gap-y-3 py-5 text-[0.92rem] sm:grid-cols-3">
          <div><dt className="text-[#b9b2a0]">Find us</dt><dd>{fullAddress().replace(", India", "")}</dd></div>
          <div><dt className="text-[#b9b2a0]">Open {hours.label.toLowerCase()}</dt><dd>{hours.value} <span className="text-[#b9b2a0]">(subject to confirmation)</span></dd></div>
          <div><dt className="text-[#b9b2a0]">Call</dt><dd><a href={telHref} className="link-underline">{restaurant.phone.display}</a></dd></div>
        </dl>
      </div>
    </section>
  );
}
