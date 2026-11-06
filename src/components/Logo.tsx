import { restaurant } from "../data/restaurant";

/** The Fort Kochi gable from the Canvas wordmark, simplified. */
export function GableMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 44 36" className={className} aria-hidden="true" fill="currentColor">
      <path d="M2 36V17q0-2 2-2h6v-5l4-1.5Q15 1 22 1t8 8.5l4 1.500v4h6q2 0 2 2v19z" fillRule="evenodd" />
      <path d="M17 36V26q0-6 5-6t5 6v10z" fill="var(--gable-cut, #17150f)" />
      <path d="M19 11q0-4 3-4t3 4z" fill="var(--gable-cut, #17150f)" />
    </svg>
  );
}

export function Logo({ tone = "ink", className = "" }: { tone?: "ink" | "paper"; className?: string }) {
  const paper = tone === "paper";
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${paper ? "text-paper" : "text-ink"} ${className}`}
      style={{ ["--gable-cut" as string]: paper ? "#17150f" : "#faf8f3" }}
    >
      <GableMark className="h-7 w-auto" />
      <span className="flex flex-col leading-none">
        <span className="wordmark text-[1.55rem]">{restaurant.shortName}</span>{" "}
        <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] opacity-80">Restaurant &amp; Pizzeria</span>
      </span>
    </span>
  );
}
