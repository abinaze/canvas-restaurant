import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { restaurant } from "../data/restaurant";
import { positiveThemes } from "../data/reviews";

export function ReviewsPreview() {
  return (
    <section className="section bg-ink text-paper on-ink" aria-labelledby="reviews-preview-title">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="reviews-preview-title" className="h-section">What guests like</h2>
          <p className="mt-5 max-w-sm text-[#cfc8b6]">The things guests mention most often. Read the reviews themselves, with dates and photos, on Google Maps.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/reviews" className="btn btn-primary">Read the full picture</Link>
            <a href={restaurant.links.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Reviews on Google Maps <ExternalLink size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {positiveThemes.map((t) => (
            <li key={t.id} className="border-t border-white/20 pt-3">
              <p className="h-sub">{t.title}</p>
              <p className="mt-1 text-sm text-[#b9b2a0]">{t.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
