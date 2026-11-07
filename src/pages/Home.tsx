import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { Hero } from "../sections/Hero";
import { Categories } from "../sections/Categories";
import { DeliveryBand } from "../sections/DeliveryBand";
import { Story } from "../sections/Story";
import { GalleryPreview } from "../sections/GalleryPreview";
import { ReviewsPreview } from "../sections/ReviewsPreview";
import { ReserveBand } from "../sections/ReserveBand";
import { Location } from "../sections/Location";

const meta = routes[0];

export default function Home() {
  usePageMeta(meta.title, meta.description);
  return (
    <>
      <Hero />
      <Categories />
      <DeliveryBand />
      <Story />
      <GalleryPreview />
      <ReviewsPreview />
      <ReserveBand />
      <Location />
    </>
  );
}
