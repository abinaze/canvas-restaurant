import { useState } from "react";
import { MapPin } from "lucide-react";
import { restaurant } from "../data/restaurant";
import { Art } from "./Art";

/**
 * Click-to-load map: no third-party request (and no cookies) until the visitor asks for it.
 * Uses Google's keyless embed, so no API key is needed.
 */
export function MapEmbed({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const { lat, lng } = restaurant.geo;
  return (
    <div className={`relative overflow-hidden rounded-[3px] bg-linen ${className}`}>
      {loaded ? (
        <iframe
          title={`Map showing ${restaurant.name}`}
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=17&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <>
          <Art kind="lane" seed="map" className="absolute inset-0 h-full w-full opacity-60" />
          <div className="absolute inset-0 grid place-items-center p-6 text-center">
            <div className="max-w-xs rounded-[3px] bg-paper/95 p-5 shadow">
              <MapPin className="mx-auto text-tomato" aria-hidden />
              <p className="mt-2 text-sm text-muted">The interactive map loads from Google only when you ask for it.</p>
              <button type="button" onClick={() => setLoaded(true)} className="btn btn-ink btn-sm mt-3">Load map</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
