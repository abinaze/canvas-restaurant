import { restaurant } from "../data/restaurant";
import { GABLE_PATH, GABLE_VIEWBOX } from "./gablePath";

/** The Fort Kochi gable from the Canvas logo, traced from the supplied artwork. Colour follows the text colour. */
export function GableMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={GABLE_VIEWBOX} className={className} aria-hidden="true" focusable="false" fill="currentColor">
      <path d={GABLE_PATH} fillRule="evenodd" />
    </svg>
  );
}

export function Logo({ tone = "ink", className = "" }: { tone?: "ink" | "paper"; className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center ${tone === "paper" ? "text-paper" : "text-ink"} ${className}`}>
      <GableMark className="h-[1.05rem] w-auto" />
      <span className="wordmark mt-[0.2rem] text-[1.7rem]">{restaurant.shortName}</span>
    </span>
  );
}
