import { Minus, Plus } from "lucide-react";
import { MAX_QUANTITY } from "../utils/cart";

interface Props {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  label: string;
}

export function QuantityStepper({ value, onChange, min = 1, label }: Props) {
  const btn = "grid h-11 w-11 place-items-center transition-colors hover:bg-linen disabled:opacity-40 disabled:hover:bg-transparent";
  return (
    <div role="group" aria-label={label} className="inline-flex items-center rounded-[3px] border-[1.5px] border-ink bg-white">
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`Decrease quantity of ${label}`}>
        <Minus size={18} aria-hidden />
      </button>
      <output aria-live="polite" className="w-10 text-center text-base font-semibold tabular-nums">{value}</output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= MAX_QUANTITY} aria-label={`Increase quantity of ${label}`}>
        <Plus size={18} aria-hidden />
      </button>
    </div>
  );
}
