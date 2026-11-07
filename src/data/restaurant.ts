/**
 * Central business information. Edit this file to update the website.
 * Every value that appears on the site (header, footer, contact page, SEO,
 * structured data, table-request messages) is read from here.
 */

export interface OpeningHours {
  /** 0 = Sunday ... 6 = Saturday */
  days: number[];
  opens: string; // 24h "HH:MM"
  closes: string; // 24h "HH:MM"; "24:00" = midnight
}

export const restaurant = {
  name: "Canvas Restaurant & Pizzeria",
  shortName: "Canvas",
  tagline: "An Italian experience in the heart of Fort Kochi",
  description:
    "Canvas Restaurant & Pizzeria is an Italian-inspired restaurant in Fort Kochi, known for wood-fired pizzas, homemade pasta, Italian classics, seafood, salads, desserts, coffee, and a relaxed dining atmosphere.",
  cuisine: ["Italian"],

  address: {
    street: "Vadathazha Lane",
    locality: "Fort Kochi",
    region: "Kerala",
    postalCode: "682001",
    country: "India",
    countryCode: "IN",
  },

  /**
   * NEEDS OWNER CHECK: the brief listed +91 73561 14909, but the public
   * District/Zomato listing shows +91 94478 80111. Confirm which number the
   * restaurant answers (and which one is on WhatsApp), then edit here only.
   */
  phone: {
    display: "+91 73561 14909",
    /** Digits only, with country code. Used for tel: and wa.me links. */
    e164Digits: "917356114909",
  },

  /**
   * Taken from the Google Maps link supplied for the restaurant
   * (https://maps.app.goo.gl/wH9RG4xwwE5j9SDu5). It matches the supplied
   * Plus Code. The coordinates in the original brief (9.964153, 76.237003)
   * resolve to a point about 500 m away, so they are not used.
   */
  geo: { lat: 9.9630543, lng: 76.2411871 },
  plusCode: "X67R+6F Kochi",

  links: {
    googleMaps: "https://maps.app.goo.gl/wH9RG4xwwE5j9SDu5",
    zomato: "https://www.zomato.com/kochi/canvas-restaurant-pizzeria-1-fort-kochi",
    instagram: "https://www.instagram.com/canvas_restaurant_pizzeria/",
    instagramHandle: "@canvas_restaurant_pizzeria",
    facebook: "https://www.facebook.com/canvasrestaurantpizzeria/",
  },

  /** Subject to confirmation. Edit here; the site formats it everywhere. */
  hours: [{ days: [0, 1, 2, 3, 4, 5, 6], opens: "12:00", closes: "24:00" }] as OpeningHours[],
  hoursNote:
    "Hours are indicative and subject to confirmation. They can change on holidays and special occasions, so please call before you travel.",

  /** Indicative only, not a verified menu price. */
  priceRange: "₹400–₹800 per person",

} as const;

export const fullAddress = (): string => {
  const a = restaurant.address;
  return `${a.street}, ${a.locality}, ${a.region} ${a.postalCode}, ${a.country}`;
};

export const telHref = `tel:+${restaurant.phone.e164Digits}`;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${restaurant.geo.lat}%2C${restaurant.geo.lng}`;

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const to12h = (t: string): string => {
  const [hStr, m] = t.split(":");
  const h = Number(hStr);
  if (h === 24 || h === 0) return m === "00" ? "12 midnight" : `12:${m} AM`;
  if (h === 12) return m === "00" ? "12 noon" : `12:${m} PM`;
  return `${h % 12}:${m} ${h < 12 ? "AM" : "PM"}`.replace(":00", "");
};

export const formatTime = to12h;

/** Human-readable hours lines, collapsing days that share the same hours. */
export const hoursLines = (): { label: string; value: string }[] =>
  restaurant.hours.map((h) => ({
    label: h.days.length === 7 ? "Daily" : h.days.map((d) => DAY_NAMES[d]).join(", "),
    value: `${to12h(h.opens)} to ${to12h(h.closes)}`,
  }));

/** Short "12 PM to 12 midnight" style summary for compact places. */
export const hoursSummary = (): string => {
  const first = hoursLines()[0];
  return `${first.label}, ${first.value}`;
};
