import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { restaurant, telHref } from "../data/restaurant";

export function ReserveBand() {
  return (
    <section className="section bg-tomato text-white" aria-labelledby="reserve-band-title">
      <div className="wrap flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 id="reserve-band-title" className="h-section">Planning an evening with us?</h2>
          <p className="mt-3 text-lg text-white/90">Send a table request on WhatsApp or give us a call. The table is yours once we confirm it.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/reserve" className="btn bg-white text-tomato-deep hover:bg-linen">Request a table</Link>
          <a href={telHref} className="btn btn-outline"><Phone size={18} aria-hidden /> {restaurant.phone.display}</a>
        </div>
      </div>
    </section>
  );
}
