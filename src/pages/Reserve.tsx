import { useState, type FormEvent } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { usePageMeta } from "../hooks/usePageMeta";
import { routes } from "../data/routes";
import { restaurant, telHref, hoursLines } from "../data/restaurant";
import { buildReservationMessage, isWithinOpeningHours, waLink } from "../utils/whatsapp";
import { isPlausiblePhone, todayISO } from "../utils/format";

const meta = routes.find((r) => r.path === "reserve")!;
const MAX_ONLINE_GUESTS = 12;
type Errors = Partial<Record<"name" | "phone" | "date" | "time" | "guests", string>>;

export default function Reserve() {
  usePageMeta(meta.title, meta.description);
  const [f, setF] = useState({ name: "", phone: "", date: "", time: "", guests: "2", request: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [ready, setReady] = useState<string | null>(null);
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => { setF((s) => ({ ...s, [k]: e.target.value })); setReady(null); };
  const hours = hoursLines()[0];

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: Errors = {};
    const guests = Number(f.guests);
    if (!f.name.trim()) e.name = "Enter your name.";
    if (!isPlausiblePhone(f.phone)) e.phone = "Enter a phone number the restaurant can reach you on.";
    if (!f.date) e.date = "Choose a date.";
    else if (f.date < todayISO()) e.date = "Choose today or a later date.";
    if (!f.time) e.time = "Choose a preferred time.";
    else if (f.date && !isWithinOpeningHours(f.date, f.time)) e.time = `Choose a time between ${hours.value.replace(" to ", " and ")}.`;
    if (!Number.isInteger(guests) || guests < 1) e.guests = "Enter the number of guests.";
    else if (guests > MAX_ONLINE_GUESTS) e.guests = `For more than ${MAX_ONLINE_GUESTS} guests, please call the restaurant.`;
    setErrors(e);
    if (Object.keys(e).length) {
      setReady(null);
      requestAnimationFrame(() => document.querySelector<HTMLElement>("[aria-invalid='true']")?.focus());
      return;
    }
    setReady(buildReservationMessage({ name: f.name, phone: f.phone, date: f.date, time: f.time, guests, request: f.request }));
  };

  const err = (k: keyof Errors) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `r-${k}-err` } : {});
  const Err = ({ k }: { k: keyof Errors }) => (errors[k] ? <p id={`r-${k}-err`} className="field-error">{errors[k]}</p> : null);

  return (
    <div className="wrap pb-24 pt-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <h1 className="h-display">Request a table</h1>
          <p className="lede mt-4">Tell us when you’d like to come. We’ll prepare a WhatsApp message for you to send. A table is only reserved once the restaurant replies to confirm.</p>
          <p className="mt-8 text-[0.95rem]"><span className="font-semibold">Open {hours.label.toLowerCase()}:</span> {hours.value}</p>
          <p className="mt-1 text-sm text-muted">{restaurant.hoursNote}</p>
          <a href={telHref} className="btn btn-ink mt-8"><Phone size={18} aria-hidden /> Call {restaurant.phone.display}</a>
        </div>

        <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-[4px] bg-linen p-6 md:p-8" aria-label="Table request">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="field"><label htmlFor="r-name">Name</label><input id="r-name" className="input" value={f.name} onChange={set("name")} autoComplete="name" {...err("name")} /><Err k="name" /></div>
            <div className="field"><label htmlFor="r-phone">Phone number</label><input id="r-phone" type="tel" inputMode="tel" className="input" value={f.phone} onChange={set("phone")} autoComplete="tel" {...err("phone")} /><Err k="phone" /></div>
            <div className="field"><label htmlFor="r-date">Date</label><input id="r-date" type="date" min={todayISO()} className="input" value={f.date} onChange={set("date")} {...err("date")} /><Err k="date" /></div>
            <div className="field"><label htmlFor="r-time">Preferred time</label><input id="r-time" type="time" step={900} className="input" value={f.time} onChange={set("time")} {...err("time")} /><Err k="time" /></div>
            <div className="field"><label htmlFor="r-guests">Number of guests</label><input id="r-guests" type="number" inputMode="numeric" min={1} max={MAX_ONLINE_GUESTS} className="input" value={f.guests} onChange={set("guests")} {...err("guests")} /><Err k="guests" /></div>
          </div>
          <div className="field">
            <label htmlFor="r-request">Special request <span className="font-normal text-muted">(optional)</span></label>
            <textarea id="r-request" className="input" value={f.request} onChange={set("request")} maxLength={400} />
            <p className="field-hint">For example a celebration, a high chair, or seating preference. The restaurant will say what it can do.</p>
          </div>
          <button type="submit" className="btn btn-primary">Prepare my request</button>

          {ready && (
            <div role="status" className="grid gap-4 rounded-[3px] border-l-4 border-basil bg-white p-5">
              <p className="font-semibold">Your reservation request is ready to send. The restaurant must confirm availability before your table is reserved.</p>
              <pre className="whitespace-pre-wrap rounded-[3px] bg-linen p-3 font-sans text-sm">{ready}</pre>
              <div className="flex flex-wrap gap-3">
                <a href={waLink(ready)} target="_blank" rel="noopener noreferrer" className="btn btn-basil"><MessageCircle size={18} aria-hidden /> Send on WhatsApp<span className="sr-only"> (opens in a new tab)</span></a>
                <a href={telHref} className="btn btn-outline"><Phone size={18} aria-hidden /> Or call instead</a>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
