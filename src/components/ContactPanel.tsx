import { Copy, MapPin, MessageCircle, Navigation, Phone, Share2 } from "lucide-react";
import { restaurant, fullAddress, hoursLines, telHref, directionsUrl } from "../data/restaurant";
import { waLink } from "../utils/whatsapp";
import { useToast } from "../context/ToastContext";

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function ContactPanel({ showEnquiry = true, headingLevel = 3 }: { showEnquiry?: boolean; headingLevel?: 2 | 3 }) {
  const { toast } = useToast();
  const H = headingLevel === 2 ? "h2" : "h3";

  const copyAddress = async () => {
    const ok = await copyText(`${restaurant.name}, ${fullAddress()}`);
    toast(ok ? "Address copied" : "Couldn’t copy. Select the address and copy it manually.");
  };

  const share = async () => {
    const url = window.location.origin + import.meta.env.BASE_URL;
    const data = { title: restaurant.name, text: restaurant.tagline, url };
    try {
      if (navigator.share) { await navigator.share(data); return; }
    } catch (e) {
      if ((e as DOMException).name === "AbortError") return;
    }
    const ok = await copyText(url);
    toast(ok ? "Link copied" : "Couldn’t copy the link.");
  };

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <H className="font-display text-2xl">Address</H>
          <address className="mt-2 not-italic leading-relaxed">
            {restaurant.name}<br />{restaurant.address.street},<br />{restaurant.address.locality}, {restaurant.address.region} {restaurant.address.postalCode}<br />{restaurant.address.country}
          </address>
          <p className="mt-2 text-sm text-muted">Plus Code {restaurant.plusCode}</p>
        </div>
        <div>
          <H className="font-display text-2xl">Opening hours</H>
          <ul className="mt-2">
            {hoursLines().map((h) => <li key={h.label}><span className="font-semibold">{h.label}:</span> {h.value}</li>)}
          </ul>
          <p className="mt-2 text-sm text-muted">{restaurant.hoursNote}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <Navigation size={18} aria-hidden /> Get directions<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href={telHref} className="btn btn-ink"><Phone size={18} aria-hidden /> Call {restaurant.phone.display}</a>
        {showEnquiry && (
          <a href={waLink(`Hello ${restaurant.name}, I have a question.`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <MessageCircle size={18} aria-hidden /> WhatsApp enquiry<span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
        <a href={restaurant.links.googleMaps} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-9 items-center gap-1.5">
          <MapPin size={16} aria-hidden /> Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <button type="button" onClick={copyAddress} className="link-underline inline-flex min-h-9 items-center gap-1.5"><Copy size={16} aria-hidden /> Copy address</button>
        <button type="button" onClick={share} className="link-underline inline-flex min-h-9 items-center gap-1.5"><Share2 size={16} aria-hidden /> Share this website</button>
      </div>
    </div>
  );
}
