import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUp, MessageCircle, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { waChatLink } from "../utils/whatsapp";

export function FloatingActions() {
  const { pathname } = useLocation();
  const { totals } = useCart();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onCart = pathname.endsWith("/cart");
  const circle = "grid h-12 w-12 place-items-center rounded-full shadow-lg transition-transform hover:scale-105";

  return (
    <>
      {totals.itemCount > 0 && !onCart && (
        <Link
          to="/cart"
          className="fixed bottom-4 left-4 z-40 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-5 font-semibold text-paper shadow-lg md:hidden"
        >
          <ShoppingBag size={18} aria-hidden /> View order
          <span className="grid h-6 min-w-6 place-items-center rounded-full bg-tomato px-1.5 text-xs">{totals.itemCount}</span>
        </Link>
      )}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
        {showTop && (
          <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className={`${circle} bg-paper text-ink ring-1 ring-line`}>
            <ArrowUp size={20} aria-hidden />
          </button>
        )}
        <a
          href={waChatLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message the restaurant on WhatsApp (opens in a new tab)"
          className={`${circle} h-14 w-14 bg-basil text-white`}
        >
          <MessageCircle size={26} aria-hidden />
        </a>
      </div>
    </>
  );
}
