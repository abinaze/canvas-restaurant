import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { Loading } from "./Loading";

export function Layout() {
  const { pathname, hash } = useLocation();
  const main = useRef<HTMLElement>(null);
  const first = useRef(true);

  // New page: start at the top and move keyboard/screen-reader focus to the content.
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (first.current) { first.current = false; return; }
    main.current?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main" ref={main} tabIndex={-1} className="outline-none">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
