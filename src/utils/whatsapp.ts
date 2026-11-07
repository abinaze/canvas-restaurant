import { restaurant } from "../data/restaurant";
import { formatClock, formatLongDate } from "./format";

export const waLink = (message: string, digits: string = restaurant.phone.e164Digits): string =>
  `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;

export const waChatLink = (digits: string = restaurant.phone.e164Digits): string => `https://wa.me/${digits}`;

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
