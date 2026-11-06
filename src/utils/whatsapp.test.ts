import { describe, expect, it } from "vitest";
import { buildOrderMessage, buildReservationMessage, isWithinOpeningHours, waLink } from "./whatsapp";

describe("waLink", () => {
  it("builds a wa.me link with the configured number and an encoded message", () => {
    const url = waLink("Hello & welcome\nLine 2");
    expect(url.startsWith("https://wa.me/917356114909?text=")).toBe(true);
    expect(url).toContain("Hello%20%26%20welcome%0ALine%202");
    expect(new URL(url).searchParams.get("text")).toBe("Hello & welcome\nLine 2");
  });
});

describe("buildOrderMessage", () => {
  const base = { customerName: " Asha ", customerPhone: "98765 43210", orderType: "takeaway" as const };

  it("lists items, option and instructions, without a total when a price is unknown", () => {
    const msg = buildOrderMessage({
      ...base,
      instructions: "Less spicy",
      lines: [
        { name: "Pizza Manzo", quantity: 2 },
        { name: "Beef Steak", quantity: 1, option: "Fries" },
      ],
    });
    expect(msg).toContain("Name: Asha");
    expect(msg).toContain("Order type: Takeaway");
    expect(msg).toContain("- 2 x Pizza Manzo");
    expect(msg).toContain("- 1 x Beef Steak (Fries)");
    expect(msg).toContain("Special instructions: Less spicy");
    expect(msg).not.toContain("Total");
  });

  it("adds a total only when every line is priced", () => {
    const msg = buildOrderMessage({ ...base, lines: [{ name: "A", quantity: 2, price: 100 }, { name: "B", quantity: 1, price: 50 }] });
    expect(msg).toMatch(/Total: ₹250/);
  });

  it("includes the address only for delivery", () => {
    const lines = [{ name: "A", quantity: 1 }];
    expect(buildOrderMessage({ ...base, orderType: "delivery", address: "12 Lane", lines })).toContain("Delivery address: 12 Lane");
    expect(buildOrderMessage({ ...base, orderType: "takeaway", address: "12 Lane", lines })).not.toContain("Delivery address");
  });

  it("is an enquiry, never a confirmation", () => {
    const msg = buildOrderMessage({ ...base, lines: [{ name: "A", quantity: 1 }] });
    expect(msg).toMatch(/enquire/i);
    expect(msg).toMatch(/confirm availability/i);
  });
});

describe("buildReservationMessage", () => {
  it("asks for availability rather than claiming a booking", () => {
    const msg = buildReservationMessage({ name: "Ravi", phone: "9999999999", date: "2026-12-24", time: "19:30", guests: 4, request: "Window table" });
    expect(msg).toContain("request a table");
    expect(msg).toContain("Preferred time: 7:30 PM");
    expect(msg).toContain("Guests: 4");
    expect(msg).toContain("Special request: Window table");
    expect(msg).toContain("Please let me know if this is available.");
  });
});

describe("isWithinOpeningHours", () => {
  it("accepts times inside 12:00 to midnight and rejects others", () => {
    expect(isWithinOpeningHours("2026-12-24", "12:00")).toBe(true);
    expect(isWithinOpeningHours("2026-12-24", "23:30")).toBe(true);
    expect(isWithinOpeningHours("2026-12-24", "11:59")).toBe(false);
    expect(isWithinOpeningHours("2026-12-24", "bad")).toBe(false);
  });
});
