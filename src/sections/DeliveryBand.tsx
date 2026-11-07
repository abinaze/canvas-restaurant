import { ExternalLink } from "lucide-react";
import { restaurant } from "../data/restaurant";

export function DeliveryBand() {
  return (
    <section className="on-ink bg-basil py-12 text-white" aria-labelledby="delivery-title">
      <div className="wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <h2 id="delivery-title" className="h-section">Hungry at home?</h2>
          <p className="mt-3 text-lg text-white/90">Order delivery from Canvas on Zomato. Availability and delivery area are shown there for your address.</p>
        </div>
        <a href={restaurant.links.zomato} target="_blank" rel="noopener noreferrer" className="btn bg-white text-basil-deep hover:bg-linen">
          Order on Zomato<ExternalLink size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </section>
  );
}
