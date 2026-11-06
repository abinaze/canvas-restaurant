import { ExternalLink, MapPin } from "lucide-react";
import { Facebook, Instagram } from "../components/BrandIcons";
import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { restaurant } from "../data/restaurant";
import { ContactPanel } from "../components/ContactPanel";
import { MapEmbed } from "../components/MapEmbed";

const meta = routes.find((r) => r.path === "contact")!;

export default function Contact() {
  usePageMeta(meta.title, meta.description);
  const social = [
    { label: "Instagram", sub: restaurant.links.instagramHandle, href: restaurant.links.instagram, icon: Instagram },
    { label: "Facebook", sub: "Canvas Restaurant & Pizzeria", href: restaurant.links.facebook, icon: Facebook },
    { label: "Zomato", sub: "Menu and delivery listing", href: restaurant.links.zomato, icon: ExternalLink },
    { label: "Google Maps", sub: "Reviews and directions", href: restaurant.links.googleMaps, icon: MapPin },
  ];
  return (
    <div className="wrap pb-24 pt-32">
      <h1 className="h-display">Contact and directions</h1>
      <p className="lede mt-4">Call or message us, or come and find us in Fort Kochi.</p>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <ContactPanel headingLevel={2} />
        <MapEmbed className="min-h-[24rem]" />
      </div>

      <section className="mt-20" aria-labelledby="online">
        <h2 id="online" className="h-section">Find us online</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {social.map(({ label, sub, href, icon: Icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-full min-h-20 items-start gap-3 rounded-[3px] border-[1.5px] border-line p-4 transition-colors hover:border-ink">
                <Icon size={22} className="mt-0.5 shrink-0" aria-hidden />
                <span><span className="block font-semibold">{label}<span className="sr-only"> (opens in a new tab)</span></span><span className="text-sm text-muted">{sub}</span></span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          Coordinates {restaurant.geo.lat}, {restaurant.geo.lng} · Plus Code {restaurant.plusCode}. Hours can change on holidays and special occasions, so please call before travelling.
        </p>
      </section>
    </div>
  );
}
