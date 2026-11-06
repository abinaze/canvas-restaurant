import { Plus, Leaf } from "lucide-react";
import type { MenuItem } from "../types";
import { Picture } from "./Picture";
import { artForItem } from "./Art";
import { getCategory } from "../data/menu";
import { formatRupees } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export const itemArt = (item: MenuItem) => artForItem(item.id, item.category);

export function PriceTag({ item, className = "" }: { item: MenuItem; className?: string }) {
  return (
    <span className={className}>
      {typeof item.price === "number" ? formatRupees(item.price) : "Price on request"}
    </span>
  );
}

interface Props {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
}

export function MenuCard({ item, onOpen }: Props) {
  const { add } = useCart();
  const { toast } = useToast();
  const needsChoice = Boolean(item.option);

  const quickAdd = () => {
    if (needsChoice) { onOpen(item); return; }
    add(item.id, 1);
    toast(`${item.name} added to your order`, { label: "View order", to: "/cart" });
  };

  return (
    <article className="group flex flex-col border-b border-line pb-4">
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="flex flex-1 flex-col text-left"
      >
        <Picture
          id={item.id}
          kind={itemArt(item)}
          seed={item.id}
          alt={item.name}
          decorative
          className="aspect-[4/3] w-full rounded-[3px] transition-transform duration-300 group-hover:scale-[1.01]"
        />
        <span className="mt-3 flex items-start justify-between gap-3">
          <span className="font-display text-[1.65rem] leading-[1.05]">{item.name}</span>
          {item.vegetarian && (
            <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-basil/10 px-2 py-0.5 text-xs font-semibold text-basil">
              <Leaf size={12} aria-hidden /> Veg
            </span>
          )}
        </span>
        {item.description && <span className="mt-1.5 line-clamp-3 text-[0.92rem] leading-snug text-muted">{item.description}</span>}
        <span className="sr-only">. {getCategory(item.category).name}. View details</span>
      </button>
      <div className="mt-3 flex items-center justify-between gap-3">
        <PriceTag item={item} className="text-sm text-muted" />
        <button type="button" onClick={quickAdd} className="btn btn-outline btn-sm" aria-label={needsChoice ? `Choose options for ${item.name}` : `Add ${item.name} to order`}>
          <Plus size={16} aria-hidden /> {needsChoice ? "Choose" : "Add"}
        </button>
      </div>
    </article>
  );
}
