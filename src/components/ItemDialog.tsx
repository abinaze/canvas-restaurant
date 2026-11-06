import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import type { MenuItem } from "../types";
import { Modal } from "./Modal";
import { Picture } from "./Picture";
import { QuantityStepper } from "./QuantityStepper";
import { PriceTag, itemArt } from "./MenuCard";
import { getCategory } from "../data/menu";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { MENU_NOTE } from "../data/menu";

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export function ItemDialog({ item, onClose }: Props) {
  const { add } = useCart();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);
  const [choice, setChoice] = useState<string | undefined>();

  // Reset the form each time a different dish opens.
  useEffect(() => {
    setQty(1);
    setChoice(item?.option?.choices[0]);
  }, [item]);

  const handleAdd = () => {
    if (!item) return;
    add(item.id, qty, choice);
    toast(`${qty} × ${item.name}${choice ? ` (${choice})` : ""} added`, { label: "View order", to: "/cart" });
    onClose();
  };

  return (
    <Modal open={Boolean(item)} onClose={onClose} label={item ? `${item.name} details` : "Dish details"} className="max-w-3xl">
      {item && (
        <div className="grid md:grid-cols-[1.05fr_1fr]">
          <Picture id={item.id} kind={itemArt(item)} seed={item.id} alt={item.name} tag className="aspect-[4/3] md:aspect-auto md:min-h-[26rem]" />
          <div className="flex flex-col gap-5 p-6 pr-6 md:p-8">
            <div>
              <p className="text-sm font-semibold text-muted">{getCategory(item.category).name}</p>
              <h2 className="mt-1 pr-10 font-display text-[2.4rem] leading-none md:pr-0">{item.name}</h2>
              {item.vegetarian && (
                <p className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-basil"><Leaf size={14} aria-hidden /> Vegetarian</p>
              )}
            </div>

            {item.description ? <p className="text-[0.98rem] leading-relaxed">{item.description}</p> : (
              <p className="text-[0.95rem] text-muted">Ask the restaurant for the ingredients and preparation of this dish.</p>
            )}

            <PriceTag item={item} className="text-lg font-semibold" />

            {item.option && (
              <fieldset className="grid gap-2">
                <legend className="mb-1 text-sm font-semibold">{item.option.label}</legend>
                {item.option.choices.map((c) => (
                  <label key={c} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[3px] border-[1.5px] border-line px-3 has-[:checked]:border-ink has-[:checked]:bg-linen">
                    <input type="radio" name="option" value={c} checked={choice === c} onChange={() => setChoice(c)} className="h-4 w-4 accent-tomato" />
                    {c}
                  </label>
                ))}
              </fieldset>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <QuantityStepper value={qty} onChange={setQty} label={item.name} />
              <button type="button" onClick={handleAdd} className="btn btn-primary flex-1">Add to order</button>
            </div>

            <p className="text-xs leading-relaxed text-muted">
              {MENU_NOTE} Adding a dish builds an enquiry to send on WhatsApp; it is not a confirmed order.{" "}
              <Link to="/cart" onClick={onClose} className="link-underline">View your order</Link>
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
