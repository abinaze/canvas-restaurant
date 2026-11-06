import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { Hero } from "../sections/Hero";
import { Featured } from "../sections/Featured";
import { Story } from "../sections/Story";
import { MenuPreview } from "../sections/MenuPreview";
import { GalleryPreview } from "../sections/GalleryPreview";
import { ReserveBand } from "../sections/ReserveBand";
import { Location } from "../sections/Location";

const meta = routes[0];

export default function Home() {
  usePageMeta(meta.title, meta.description);
  return (
    <>
      <Hero />
      <Featured />
      <Story />
      <MenuPreview />
      <GalleryPreview />
      <ReserveBand />
      <Location />
    </>
  );
}
