import { ExternalLink } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { restaurant } from "../data/restaurant";
import { positiveThemes, mixedThemes, quotes } from "../data/reviews";

const meta = routes.find((r) => r.path === "reviews")!;

export default function Reviews() {
  usePageMeta(meta.title, meta.description);
  return (
    <>
      <section className="on-ink bg-ink pb-16 pt-32 text-paper">
        <div className="wrap">
          <div>
            <h1 className="h-display">What guests say</h1>
            <p className="lede mt-4">A summary of what guests tend to praise, and what some mention, so you know what to expect.</p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="liked">
        <div className="wrap">
          <h2 id="liked" className="h-section">Often praised</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {positiveThemes.map((t) => (
              <li key={t.id} className="border-t-2 border-basil pt-3">
                <p className="h-sub text-[1.6rem]">{t.title}</p>
                <p className="mt-1 text-muted">{t.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-linen" aria-labelledby="mixed">
        <div className="wrap">
          <h2 id="mixed" className="h-section">Worth knowing</h2>
          <p className="lede mt-3">No restaurant suits everyone. These are the things some guests have mentioned.</p>
          <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {mixedThemes.map((t) => (
              <li key={t.id} className="border-t-2 border-ochre pt-3">
                <p className="h-sub text-[1.6rem]">{t.title}</p>
                <p className="mt-1 text-muted">{t.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {quotes.length > 0 && (
        <section className="section">
          <div className="wrap grid gap-8 md:grid-cols-2">
            {quotes.map((q, i) => (
              <figure key={i}>
                <blockquote className="font-display text-3xl">“{q.text}”</blockquote>
                <figcaption className="mt-2 text-sm text-muted">{q.author ? `${q.author}, ` : ""}{q.url ? <a href={q.url} className="link-underline">{q.source}</a> : q.source}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="h-section">Read the reviews in full</h2>
            <p className="mt-3 text-muted">We don’t reprint individual reviews. Read them, with dates and photos, on Google Maps.</p>
          </div>
          <a href={restaurant.links.googleMaps} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
            Reviews on Google Maps <ExternalLink size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </section>
    </>
  );
}
