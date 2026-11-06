/**
 * Customer feedback is shown as themes, not quotes. We have no verified
 * reviewer names, dates or wording, so none are invented here.
 * If you obtain permission to quote a review, add it to `quotes`.
 */
export interface ReviewTheme {
  id: string;
  title: string;
  tone: "positive" | "mixed";
  summary: string;
}

export const positiveThemes: ReviewTheme[] = [
  { id: "wood-fired", title: "Wood-fired pizza", tone: "positive", summary: "Often mentioned as a highlight of the menu." },
  { id: "pasta", title: "Fresh pasta", tone: "positive", summary: "Guests regularly praise the pasta." },
  { id: "tiramisu", title: "Tiramisu", tone: "positive", summary: "A dessert guests single out." },
  { id: "semifreddo", title: "Semifreddo", tone: "positive", summary: "Another dessert that comes up in feedback." },
  { id: "service", title: "Friendly service", tone: "positive", summary: "Guests describe the team as friendly." },
  { id: "ambience", title: "Restaurant ambience", tone: "positive", summary: "The setting and atmosphere are often liked." },
];

export const mixedThemes: ReviewTheme[] = [
  { id: "pasta-consistency", title: "Pasta can vary", tone: "mixed", summary: "Some guests found their pasta inconsistent." },
  { id: "mosquitoes", title: "Mosquitoes", tone: "mixed", summary: "Occasional complaints about mosquitoes." },
  { id: "expectations", title: "Dessert texture and expectations", tone: "mixed", summary: "Opinions differ on dessert texture and on how some dishes compare with expectations." },
];

/** Add verified, permitted quotes here: { text, author?, source, url? }. */
export interface ReviewQuote {
  text: string;
  author?: string;
  source: string;
  url?: string;
}
export const quotes: ReviewQuote[] = [];
