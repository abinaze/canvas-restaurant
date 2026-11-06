import { Link } from "react-router-dom";
import { Picture } from "../components/Picture";
import { restaurant } from "../data/restaurant";

export function Story() {
  return (
    <section className="section bg-linen" aria-labelledby="story-title">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Picture id="story" kind="facade" seed="story" alt="The Fort Kochi gable" tag className="arch mx-auto aspect-[3/4] w-full max-w-md" />
        <div>
          <h2 id="story-title" className="h-section">Italian cooking, Fort Kochi’s way of spending an evening</h2>
          <div className="mt-6 grid max-w-2xl gap-4 text-[1.05rem] leading-relaxed">
            <p>
              {restaurant.name} is an Italian-inspired restaurant on {restaurant.address.street} in {restaurant.address.locality}. The kitchen is known for wood-fired pizzas and pasta prepared fresh, alongside Italian classics, seafood, salads, desserts and coffee.
            </p>
            <p>
              The setting is relaxed but a little special: good food made with care, a warm welcome, and the unhurried feel of Fort Kochi around it.
            </p>
          </div>
          <Link to="/about" className="btn btn-ink mt-8">More about Canvas</Link>
        </div>
      </div>
    </section>
  );
}
