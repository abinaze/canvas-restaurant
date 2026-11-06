import { Link } from "react-router-dom";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { Instagram, Facebook } from "./BrandIcons";
import { Logo } from "./Logo";
import { restaurant, fullAddress, hoursLines, telHref } from "../data/restaurant";
import { routes } from "../data/routes";

export function Footer() {
  const year = new Date().getFullYear();
  const link = "inline-flex min-h-9 items-center gap-2 hover:text-ochre";
  return (
    <footer className="on-ink bg-ink text-paper">
      <div className="tricolor" aria-hidden />
      <div className="wrap grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div>
          <Logo tone="paper" />
          <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-[#cfc8b6]">{restaurant.description}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-sans text-sm font-semibold text-ochre">Explore</h2>
          <ul className="mt-3 grid gap-0.5">
            {routes.filter((r) => r.inNav || r.path === "reserve").map((r) => (
              <li key={r.path}><Link to={`/${r.path}`} className={link}>{r.navLabel}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold text-ochre">Visit</h2>
          <address className="mt-3 grid gap-3 not-italic text-[0.95rem] text-[#e6e0d0]">
            <span className="flex gap-2"><MapPin size={18} className="mt-1 shrink-0" aria-hidden /> {fullAddress()}</span>
            <a href={telHref} className={link}><Phone size={18} aria-hidden /> {restaurant.phone.display}</a>
            <ul>
              {hoursLines().map((h) => <li key={h.label}>{h.label}: {h.value}</li>)}
              <li className="mt-1 text-xs text-[#a8a190]">Subject to confirmation</li>
            </ul>
          </address>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold text-ochre">Find us online</h2>
          <ul className="mt-3 grid gap-0.5">
            <li><a href={restaurant.links.instagram} target="_blank" rel="noopener noreferrer" className={link}><Instagram size={18} aria-hidden /> Instagram<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a href={restaurant.links.facebook} target="_blank" rel="noopener noreferrer" className={link}><Facebook size={18} aria-hidden /> Facebook<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a href={restaurant.links.zomato} target="_blank" rel="noopener noreferrer" className={link}><ExternalLink size={18} aria-hidden /> Zomato<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li><a href={restaurant.links.googleMaps} target="_blank" rel="noopener noreferrer" className={link}><MapPin size={18} aria-hidden /> Google Maps<span className="sr-only"> (opens in a new tab)</span></a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-2 py-6 text-[0.82rem] text-[#a8a190] md:flex-row md:justify-between">
          <p>© {year} {restaurant.name}. All rights reserved.</p>
          <p className="max-w-xl md:text-right">
            This site does not take payments or confirm orders or tables. Enquiries are sent by WhatsApp and are confirmed only when the restaurant replies.
          </p>
        </div>
      </div>
    </footer>
  );
}
