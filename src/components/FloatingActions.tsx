import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { waChatLink } from "../utils/whatsapp";

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circle = "grid h-12 w-12 place-items-center rounded-full shadow-lg transition-transform hover:scale-105";

  return (
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
  );
}
