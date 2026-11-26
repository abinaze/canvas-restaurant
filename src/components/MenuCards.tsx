import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, X } from "lucide-react";
import { Modal } from "./Modal";
import { menuCards } from "../data/menuCards";

/** The printed menu pages as pictures: a grid of thumbnails that open in a viewer. */
export function MenuCards() {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const go = (d: number) => setIndex((i) => (i === null ? i : (i + d + menuCards.length) % menuCards.length));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (menuCards.length === 0) return null;
  const card = index === null ? null : menuCards[index];
  const nav = "absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/95 text-ink shadow hover:bg-white";

  return (
    <section id="menu-cards" className="section bg-linen" aria-labelledby="menu-cards-title">
      <div className="wrap">
        <h2 id="menu-cards-title" className="h-section">The printed menu</h2>
        <p className="mt-3 max-w-2xl text-muted">The restaurant’s own menu pages, exactly as printed. Open one to read it larger.</p>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {menuCards.map((c, i) => (
            <li key={c.id}>
              <button type="button" onClick={() => setIndex(i)} className="group block w-full text-left" aria-label={`${c.title}. Open larger view`}>
                <span className="block overflow-hidden rounded-[3px] bg-paper shadow-sm">
                  <img src={c.url} alt={`Printed menu page: ${c.title}`} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </span>
                <span className="mt-2 block text-sm font-semibold">{c.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal open={index !== null} onClose={() => setIndex(null)} label="Printed menu viewer" bare className="max-w-5xl !bg-ink text-paper">
        {card && (
          <figure className="relative">
            <button type="button" onClick={() => setIndex(null)} aria-label="Close viewer" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper/95 text-ink shadow hover:bg-white"><X size={20} aria-hidden /></button>
            <img src={card.url} alt={`Printed menu page: ${card.title}`} className="block max-h-[78dvh] w-full bg-paper object-contain" />
            <button type="button" className={`${nav} left-3`} onClick={() => go(-1)} aria-label="Previous page"><ChevronLeft aria-hidden /></button>
            <button type="button" className={`${nav} right-3`} onClick={() => go(1)} aria-label="Next page"><ChevronRight aria-hidden /></button>
            <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <span className="h-sub">{card.title}</span>
              <span className="flex items-center gap-4 text-sm text-[#b9b2a0]">
                <a href={card.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline">
                  Open full size<ExternalLink size={14} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
                </a>
                {index! + 1} of {menuCards.length}
              </span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  );
}
