import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ExternalLink, Menu as MenuIcon, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { routes } from "../data/routes";
import { useScrolled } from "../hooks/useScrolled";
import { restaurant, telHref } from "../data/restaurant";

const navRoutes = routes.filter((r) => r.inNav && r.path !== "");

export function Navbar() {
  const { pathname } = useLocation();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" && !scrolled && !open;

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-2 text-[0.95rem] font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:bg-tomato after:transition-transform ${
      isActive ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
    }`;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300 ${
          open ? "on-ink bg-ink text-paper" : overHero ? "on-ink bg-transparent text-paper" : "border-b border-line bg-paper/95 text-ink backdrop-blur"
        }`}
      >
        <div className="wrap flex h-[4.25rem] items-center justify-between gap-4">
          <Link to="/" aria-label={`${restaurant.name}, home`} className="shrink-0">
            <Logo tone={overHero || open ? "paper" : "ink"} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {navRoutes.map((r) => (
              <NavLink key={r.path} to={`/${r.path}`} className={linkClass}>{r.navLabel}</NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={restaurant.links.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Order on Zomato<ExternalLink size={15} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-black/5 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} aria-hidden /> : <MenuIcon size={24} aria-hidden />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-nav" className="on-ink fixed inset-x-0 bottom-0 top-[4.25rem] z-40 overflow-auto bg-ink text-paper lg:hidden">
          <nav aria-label="Mobile" className="wrap flex flex-col py-6">
            {routes.filter((r) => r.inNav).map((r) => (
              <NavLink
                key={r.path}
                to={`/${r.path}`}
                end={r.path === ""}
                className={({ isActive }) =>
                  `border-b border-white/10 py-3 font-display text-[2.2rem] uppercase leading-none tracking-wide ${isActive ? "text-ochre" : ""}`
                }
              >
                {r.navLabel}
              </NavLink>
            ))}
            <div className="mt-8 grid gap-3">
              <a href={telHref} className="btn btn-outline"><Phone size={18} aria-hidden /> {restaurant.phone.display}</a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
