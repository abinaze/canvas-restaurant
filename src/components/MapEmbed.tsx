import { restaurant } from "../data/restaurant";

/**
 * The map loads by itself. The browser fetches it only as the visitor scrolls close to it
 * (loading="lazy"), so it does not slow down the top of the page.
 * Uses Google's keyless embed, so no API key is needed.
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const { lat, lng } = restaurant.geo;
  return (
    <div className={`relative overflow-hidden rounded-[3px] bg-linen ${className}`}>
      <iframe
        title={`Map showing ${restaurant.name}`}
        src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
