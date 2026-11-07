import { describe, expect, it } from "vitest";
import { buildReservationMessage, isWithinOpeningHours, waLink } from "./whatsapp";

describe("waLink", () => {
  it("builds a wa.me link with the configured number and an encoded message", () => {
    const url = waLink("Hello & welcome\nLine 2");
    expect(url.startsWith("https://wa.me/917356114909?text=")).toBe(true);
    expect(url).toContain("Hello%20%26%20welcome%0ALine%202");
    expect(new URL(url).searchParams.get("text")).toBe("Hello & welcome\nLine 2");
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
