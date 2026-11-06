import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { NOT_FOUND_TITLE } from "../data/routes";
import { Art } from "../components/Art";

export default function NotFound() {
  usePageMeta(NOT_FOUND_TITLE, "That page doesn’t exist. Head back to the menu or the home page.", { noindex: true });
  return (
    <section className="wrap grid min-h-[80dvh] items-center gap-10 pb-20 pt-32 md:grid-cols-2">
      <div>
        <h1 className="h-display">This page isn’t on the menu</h1>
        <p className="lede mt-4">The link may be old, or the address mistyped. Try one of these instead.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">Back to home</Link>
          <Link to="/menu" className="btn btn-outline">See the menu</Link>
        </div>
      </div>
      <div className="arch mx-auto aspect-[3/4] w-full max-w-xs"><Art kind="facade" seed="404" className="h-full w-full" /></div>
    </section>
  );
}
