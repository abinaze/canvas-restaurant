import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, MessageCircle, Trash2, Copy } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { restaurant } from "../data/restaurant";
import { MENU_NOTE } from "../data/menu";
import { Picture } from "../components/Picture";
import { itemArt } from "../components/MenuCard";
import { QuantityStepper } from "../components/QuantityStepper";
import { buildOrderMessage, waLink } from "../utils/whatsapp";
import { formatRupees, isPlausiblePhone } from "../utils/format";
import type { OrderType } from "../types";

const meta = routes.find((r) => r.path === "cart")!;
const TYPES: { id: OrderType; label: string; hint: string }[] = [
  { id: "dine-in", label: "Dine-in", hint: "You’ll eat at the restaurant" },
  { id: "takeaway", label: "Takeaway", hint: "You’ll collect it" },
  { id: "delivery", label: "Delivery", hint: "Subject to the restaurant’s confirmation" },
];

type Errors = Partial<Record<"name" | "phone" | "address", string>>;

export default function Cart() {
  usePageMeta(meta.title, meta.description, { noindex: true });
  const { lines, totals, setQuantity, remove, clear } = useCart();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("takeaway");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [prepared, setPrepared] = useState<string | null>(null);

  const sendLabel = restaurant.whatsappOrdersConfirmed ? "Order on WhatsApp" : "Send order enquiry on WhatsApp";

  const message = () =>
    buildOrderMessage({
      customerName: name, customerPhone: phone, orderType, address, instructions: notes,
      lines: lines.map((l) => ({ name: l.item.name, quantity: l.quantity, option: l.optionChoice, price: l.item.price })),
    });

  const validate = (): boolean => {
    const e: Errors = {};
    if (!name.trim()) e.name = "Enter your name so the restaurant knows who to reply to.";
    if (!phone.trim()) e.phone = "Enter your phone number.";
    else if (!isPlausiblePhone(phone)) e.phone = "That doesn’t look like a phone number. Include the area or country code.";
    if (orderType === "delivery" && !address.trim()) e.address = "Enter a delivery address, or choose takeaway.";
    setErrors(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
    }
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const text = message();
    setPrepared(text);
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  };

  const copyMessage = async () => {
    if (!validate()) return;
    try {
      await navigator.clipboard.writeText(message());
      toast("Enquiry copied. Paste it into a message to the restaurant.");
    } catch {
      toast("Couldn’t copy automatically. Use the WhatsApp button instead.");
    }
  };

  if (lines.length === 0) {
    return (
      <section className="wrap grid min-h-[70dvh] place-items-center pb-20 pt-36 text-center">
        <div className="max-w-md">
          <h1 className="h-display">Your order is empty</h1>
          <p className="lede mx-auto mt-4">Browse the menu and add a few dishes. We’ll turn them into an enquiry you can send on WhatsApp.</p>
          <Link to="/menu" className="btn btn-primary mt-8">Browse the menu</Link>
        </div>
      </section>
    );
  }

  return (
    <div className="wrap pb-24 pt-32">
      <h1 className="h-display">Your order enquiry</h1>
      <p className="lede mt-3">Check your dishes, add your details, then send the enquiry on WhatsApp. Nothing is ordered or paid for until the restaurant replies and confirms.</p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <section aria-labelledby="items-title">
          <h2 id="items-title" className="sr-only">Dishes in your order</h2>
          <ul className="border-t border-line">
            {lines.map((l) => (
              <li key={l.key} className="grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 border-b border-line py-5 sm:grid-cols-[6.5rem_1fr_auto]">
                <Picture id={l.item.id} kind={itemArt(l.item)} seed={l.item.id} alt={l.item.name} decorative className="row-span-2 aspect-square w-full rounded-[3px] sm:row-span-1" />
                <div>
                  <p className="font-display text-[1.7rem] leading-none">{l.item.name}</p>
                  {l.optionChoice && <p className="mt-1 text-sm text-muted">{l.item.option?.label.replace("Choose your ", "").replace(/^./, (c) => c.toUpperCase())}: {l.optionChoice}</p>}
                  <p className="mt-1 text-sm text-muted">{typeof l.item.price === "number" ? formatRupees(l.item.price * l.quantity) : "Price on request"}</p>
                </div>
                <div className="col-start-2 flex items-center gap-3 sm:col-start-3 sm:justify-end">
                  <QuantityStepper value={l.quantity} onChange={(n) => setQuantity(l.key, n)} label={l.item.name} />
                  <button type="button" onClick={() => remove(l.key)} className="grid h-11 w-11 place-items-center rounded-full text-muted hover:bg-linen hover:text-tomato-deep" aria-label={`Remove ${l.item.name}${l.optionChoice ? ` (${l.optionChoice})` : ""}`}>
                    <Trash2 size={18} aria-hidden />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-6 grid gap-1 text-[0.98rem]">
            <div className="flex justify-between"><dt>Dishes</dt><dd className="tabular-nums">{totals.itemCount}</dd></div>
            {totals.total !== null ? (
              <div className="flex justify-between text-lg font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatRupees(totals.total)}</dd></div>
            ) : (
              <div className="flex justify-between"><dt>Total</dt><dd className="text-muted">Confirmed by the restaurant</dd></div>
            )}
          </dl>
          {totals.total === null && (
            <p className="mt-3 text-sm text-muted">Prices aren’t listed online yet, so we don’t show a total. The restaurant will confirm prices when it replies. {MENU_NOTE}</p>
          )}
          <button type="button" onClick={() => { clear(); setPrepared(null); }} className="link-underline mt-5 text-sm text-muted">Empty the order</button>
        </section>

        <form onSubmit={onSubmit} noValidate className="grid content-start gap-5 rounded-[4px] bg-linen p-6 md:p-8" aria-labelledby="details-title">
          <h2 id="details-title" className="font-display text-3xl">Your details</h2>
          <p className="field-hint -mt-3">Kept only in this page. We don’t store them.</p>

          <fieldset className="grid gap-2">
            <legend className="label mb-1 font-semibold text-[0.92rem]">How would you like it?</legend>
            {TYPES.map((t) => (
              <label key={t.id} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[3px] border-[1.5px] border-line bg-white px-3 has-[:checked]:border-ink">
                <input type="radio" name="orderType" value={t.id} checked={orderType === t.id} onChange={() => setOrderType(t.id)} className="h-4 w-4 accent-tomato" />
                <span><span className="font-semibold">{t.label}</span> <span className="text-sm text-muted">{t.hint}</span></span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "c-name-err" : undefined} />
            {errors.name && <p id="c-name-err" className="field-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="c-phone">Phone number</label>
            <input id="c-phone" type="tel" inputMode="tel" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "c-phone-err" : undefined} />
            {errors.phone && <p id="c-phone-err" className="field-error">{errors.phone}</p>}
          </div>
          {orderType === "delivery" && (
            <div className="field">
              <label htmlFor="c-address">Delivery address</label>
              <textarea id="c-address" className="input" value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" aria-invalid={Boolean(errors.address)} aria-describedby={errors.address ? "c-address-err" : undefined} />
              {errors.address && <p id="c-address-err" className="field-error">{errors.address}</p>}
            </div>
          )}
          <div className="field">
            <label htmlFor="c-notes">Special instructions <span className="font-normal text-muted">(optional)</span></label>
            <textarea id="c-notes" className="input" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={400} />
          </div>

          <div className="grid gap-3 pt-1">
            <button type="submit" className="btn btn-basil"><MessageCircle size={18} aria-hidden /> {sendLabel}</button>
            <a href={restaurant.links.zomato} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Continue to Zomato <ExternalLink size={16} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
            </a>
            <p className="text-sm text-muted">Zomato doesn’t receive this basket, so you’ll choose dishes again there.</p>
            <button type="button" onClick={copyMessage} className="link-underline inline-flex items-center justify-center gap-1.5 text-sm"><Copy size={15} aria-hidden /> Copy the enquiry text instead</button>
          </div>

          {prepared && (
            <div role="status" className="rounded-[3px] border-l-4 border-basil bg-white p-4 text-[0.95rem]">
              <p className="font-semibold">Your enquiry is open in WhatsApp.</p>
              <p className="mt-1 text-muted">It hasn’t been sent until you press send there, and it isn’t an order until the restaurant confirms. If nothing opened, <a className="link-underline" href={waLink(prepared)} target="_blank" rel="noopener noreferrer">open WhatsApp here</a>.</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
