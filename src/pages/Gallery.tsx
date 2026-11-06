import { useMemo, useState } from "react";
import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { gallery, galleryCategories, type GalleryCategory } from "../data/gallery";
import { Picture } from "../components/Picture";
import { Lightbox } from "../components/Lightbox";

const meta = routes.find((r) => r.path === "gallery")!;
const aspects = ["aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[4/3]", "aspect-[4/5]", "aspect-[3/2]"];

export default function Gallery() {
  usePageMeta(meta.title, meta.description);
  const [cat, setCat] = useState<GalleryCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);
  const entries = useMemo(() => (cat === "all" ? gallery : gallery.filter((g) => g.category === cat)), [cat]);

  return (
    <>
      <section className="on-ink bg-ink pb-12 pt-32 text-paper">
        <div className="wrap">
          <h1 className="h-display">Gallery</h1>
          <p className="lede mt-4">Pizza, pasta, desserts and the room they’re served in. These are illustrations for now; official restaurant photographs will replace them as they’re added.</p>
        </div>
      </section>

      <div className="sticky top-[4.25rem] z-30 border-b border-line bg-paper/95 backdrop-blur">
        <div role="group" aria-label="Gallery categories" className="wrap no-scrollbar flex gap-2 overflow-x-auto py-3">
          {galleryCategories.map((c) => (
            <button key={c.id} type="button" className="chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.label}</button>
          ))}
        </div>
      </div>

      <div className="wrap section !pt-10">
        <p className="mb-6 text-sm text-muted" role="status" aria-live="polite">{entries.length} {entries.length === 1 ? "image" : "images"}</p>
        {entries.length === 0 ? (
          <p className="py-16 text-center text-muted">Nothing in this category yet.</p>
        ) : (
          <ul className="columns-2 gap-3 md:columns-3 lg:gap-4 [&>li]:mb-3 lg:[&>li]:mb-4">
            {entries.map((g, i) => (
              <li key={g.id} className="break-inside-avoid">
                <button type="button" onClick={() => setIndex(i)} className="group block w-full overflow-hidden rounded-[3px] text-left" aria-label={`${g.caption}. Open larger view`}>
                  <Picture id={g.id} kind={g.art} seed={g.seed} alt={g.caption} className={`${aspects[i % aspects.length]} w-full transition-transform duration-500 group-hover:scale-[1.03]`} />
                </button>
                <p className="mt-1.5 text-sm text-muted">{g.caption}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Lightbox entries={entries} index={index} onIndex={setIndex} />
    </>
  );
}
