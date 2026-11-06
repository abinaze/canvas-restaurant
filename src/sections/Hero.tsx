import { Link } from "react-router-dom";
import { LazyMotion, m } from "framer-motion";
import { restaurant, hoursLines } from "../data/restaurant";

const loadFeatures = () => import("../utils/motionFeatures").then((mod) => mod.default);
const order = (i: number) => ({ "--i": i }) as React.CSSProperties;

/** The Fort Kochi gable from the Canvas wordmark, with a wood-fired "sun" behind it. */
function GableScene() {
  return (
    <LazyMotion features={loadFeatures} strict>
    <svg viewBox="0 0 480 400" className="h-full w-full" role="img" aria-label="Illustration of the Fort Kochi building gable with a glowing wood-fire sun behind it">
      <m.circle
        cx="240" cy="205" r="188" fill="#c8321f"
        initial={{ cy: 330, opacity: 0 }} animate={{ cy: 205, opacity: 1 }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      />
      <m.g initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}>
        <path fill="#faf8f3" fillRule="evenodd" d="M70 400V196q0-12 12-12h46v-34l34-12q10-62 78-62t78 62l34 12v34h46q12 0 12 12v204z" />
        <path fill="#17150f" d="M200 400v-92q0-52 40-52t40 52v92z" />
        <rect x="96" y="226" width="40" height="64" rx="20" fill="#17150f" />
        <rect x="344" y="226" width="40" height="64" rx="20" fill="#17150f" />
        <path fill="#17150f" d="M214 156q0-36 26-36t26 36z" />
        <path fill="none" stroke="#faf8f3" strokeWidth="2.5" opacity=".6" d="M240 256v144M200 330h80" />
      </m.g>
    </svg>
    </LazyMotion>
  );
}

export function Hero() {
  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      <div className="wrap grid items-end gap-6 pt-28 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pt-32">
        <div className="pb-4 lg:pb-14">
          <h1 id="hero-title" style={order(0)} className="rise h-display text-[clamp(2.7rem,6.4vw,5.4rem)]">
            An Italian experience in the heart of Fort&nbsp;Kochi
          </h1>
          <p style={order(1)} className="rise lede mt-5 max-w-xl">
            Wood-fired pizzas, handcrafted pasta, and Italian favourites made for good food and memorable moments.
          </p>
          <div style={order(2)} className="rise mt-8 flex flex-wrap gap-3">
            <Link to="/menu" className="btn btn-primary">Explore our menu</Link>
            <Link to="/contact" className="btn btn-outline">Find us</Link>
          </div>
          <p style={order(3)} className="rise mt-6 text-sm text-[#b9b2a0]">
            {restaurant.shortName} is on {restaurant.address.street}. Open {hoursLines()[0].label.toLowerCase()}, {hoursLines()[0].value} (subject to confirmation).
          </p>
        </div>

        <div className="mx-auto -mb-px -mt-6 w-full max-w-[30rem] lg:mt-0 lg:max-w-none">
          <GableScene />
        </div>
      </div>

      <div aria-hidden className="select-none overflow-hidden border-t border-white/10">
        <p className="wordmark -mb-[0.06em] text-center text-[clamp(6.5rem,26vw,25rem)] leading-[0.78] tracking-[0.005em] [height:0.62em]">
          Canvas
        </p>
      </div>
    </section>
  );
}
