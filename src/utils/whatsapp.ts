import { restaurant } from "../data/restaurant";
import { formatRupees, formatClock, formatLongDate } from "./format";
import type { OrderType } from "../types";

export const waLink = (message: string, digits: string = restaurant.phone.e164Digits): string =>
  `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

export const waChatLink = (digits: string = restaurant.phone.e164Digits): string => `https://wa.me/${digits}`;

export interface OrderMessageLine {
  name: string;
  quantity: number;
  option?: string;
  price?: number;
}

export interface OrderMessageInput {
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  address?: string;
  instructions?: string;
  lines: OrderMessageLine[];
}

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  "dine-in": "Dine-in",
  takeaway: "Takeaway",
  delivery: "Delivery",
};

export function buildOrderMessage(input: OrderMessageInput): string {
  const out: string[] = [];
  out.push(`Hello ${restaurant.name}, I would like to enquire about this order.`);
  out.push("");
  out.push(`Name: ${input.customerName.trim()}`);
  out.push(`Phone: ${input.customerPhone.trim()}`);
  out.push(`Order type: ${ORDER_TYPE_LABEL[input.orderType]}`);
  if (input.orderType === "delivery" && input.address?.trim()) out.push(`Delivery address: ${input.address.trim()}`);
  out.push("");
  out.push("Items:");
  let priced = 0;
  let allPriced = input.lines.length > 0;
  for (const l of input.lines) {
    const opt = l.option ? ` (${l.option})` : "";
    if (typeof l.price === "number") {
      priced += l.price * l.quantity;
      out.push(`- ${l.quantity} x ${l.name}${opt} - ${formatRupees(l.price * l.quantity)}`);
    } else {
      allPriced = false;
      out.push(`- ${l.quantity} x ${l.name}${opt}`);
    }
  }
  if (allPriced) {
    out.push("");
    out.push(`Total: ${formatRupees(priced)}`);
  }
  if (input.instructions?.trim()) {
    out.push("");
    out.push(`Special instructions: ${input.instructions.trim()}`);
  }
  out.push("");
  out.push("Please confirm availability, prices and timing. Thank you.");
  return out.join("\n");
}

export interface ReservationInput {
  name: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guests: number;
  request?: string;
}

export function buildReservationMessage(input: ReservationInput): string {
  const out: string[] = [];
  out.push(`Hello ${restaurant.name}, I would like to request a table.`);
  out.push("");
  out.push(`Name: ${input.name.trim()}`);
  out.push(`Phone: ${input.phone.trim()}`);
  out.push(`Date: ${formatLongDate(input.date)}`);
  out.push(`Preferred time: ${formatClock(input.time)}`);
  out.push(`Guests: ${input.guests}`);
  if (input.request?.trim()) out.push(`Special request: ${input.request.trim()}`);
  out.push("");
  out.push("Please let me know if this is available.");
  return out.join("\n");
}

const toMinutes = (t: string): number => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Whether a requested time falls inside the configured opening hours for that date. */
export function isWithinOpeningHours(dateISO: string, time: string): boolean {
  const [y, m, d] = dateISO.split("-").map(Number);
  if (!y || !m || !d || !/^\d{2}:\d{2}$/.test(time)) return false;
  const day = new Date(y, m - 1, d).getDay();
  const t = toMinutes(time);
  return restaurant.hours.some((h) => h.days.includes(day) && t >= toMinutes(h.opens) && t < toMinutes(h.closes));
}
