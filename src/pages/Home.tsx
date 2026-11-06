import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { Hero } from "../sections/Hero";

const meta = routes[0];

export default function Home() {
  usePageMeta(meta.title, meta.description);
  return (
    <>
      <Hero />
    </>
  );
}
