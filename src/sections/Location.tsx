import { ContactPanel } from "../components/ContactPanel";
import { MapEmbed } from "../components/MapEmbed";

export function Location() {
  return (
    <section className="section" aria-labelledby="location-title">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="location-title" className="h-section">Find us on Vadathazha Lane</h2>
          <div className="mt-8"><ContactPanel /></div>
        </div>
        <MapEmbed className="min-h-[22rem] lg:min-h-0" />
      </div>
    </section>
  );
}
