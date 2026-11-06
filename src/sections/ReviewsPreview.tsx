import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { restaurant } from "../data/restaurant";
import { positiveThemes } from "../data/reviews";

export function ReviewsPreview() {
  const s = restaurant.ratingSnapshot;
  return (
    <section className="section bg-ink text-paper on-ink" aria-labelledby="reviews-preview-title">
      <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h2 id="reviews-preview-title" className="h-section">What guests like</h2>
          <p className="mt-8 font-display text-[6.5rem] leading-none">{s.score}<span className="text-4xl text-[#b9b2a0]"> / {s.outOf}</span></p>
          <p className="mt-3 max-w-xs text-[#cfc8b6]">
            {s.source} rating from about {s.reviewCount.toLocaleString("en-IN")} reviews.
          </p>
          <p className="mt-1 max-w-xs text-sm text-[#a8a190]">A snapshot supplied to us, not a live rating.</p>
        </div>
        <div>
          <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {positiveThemes.slice(0, 6).map((t) => (
              <li key={t.id} className="border-t border-white/20 pt-3">
                <p className="font-display text-2xl">{t.title}</p>
                <p className="mt-1 text-sm text-[#b9b2a0]">{t.summary}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/reviews" className="btn btn-primary">Read the full picture</Link>
            <a href={restaurant.links.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Reviews on Google Maps <ExternalLink size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
