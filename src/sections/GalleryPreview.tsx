import { Link } from "react-router-dom";
import { gallery } from "../data/gallery";
import { Picture } from "../components/Picture";

// Eight tiles that fill a 4-column grid exactly: a 2x2 lead, four singles, a wide tile, two singles.
const spans = ["col-span-2 row-span-2", "", "", "", "", "col-span-2", "", ""];

export function GalleryPreview() {
  const tiles = gallery.slice(0, 8);
  return (
    <section className="section pt-0 lg:pt-0" aria-labelledby="gallery-preview-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="gallery-preview-title" className="h-section">A look around</h2>
          <Link to="/gallery" className="link-underline font-semibold">Open the gallery</Link>
        </div>
        <ul className="mt-10 grid auto-rows-[10rem] grid-cols-2 gap-3 md:auto-rows-[11rem] md:grid-cols-4">
          {tiles.map((g, i) => (
            <li key={g.id} className={spans[i]}>
              <Link to="/gallery" className="block h-full" aria-label={`${g.caption}. Open the gallery`}>
                <Picture id={g.id} kind={g.art} seed={g.seed} alt={g.caption} className="h-full w-full rounded-[3px]" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">Illustrations for now. Official restaurant photographs will replace them.</p>
      </div>
    </section>
  );
}
