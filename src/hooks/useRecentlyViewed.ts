import { useCallback, useState } from "react";
import { readJSON, writeJSON } from "../utils/storage";
import { menuItems } from "../data/menu";

const KEY = "canvas.recent.v1";
const MAX = 6;

/** Non-sensitive preference: the last few dishes a visitor opened. */
export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>(() => {
    const raw = readJSON<unknown>(KEY, []);
    if (!Array.isArray(raw)) return [];
    return raw.filter((id): id is string => typeof id === "string" && menuItems.some((i) => i.id === id)).slice(0, MAX);
  });
  const record = useCallback((id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX);
      writeJSON(KEY, next);
      return next;
    });
  }, []);
  const clear = useCallback(() => { setIds([]); writeJSON(KEY, []); }, []);
  return { ids, record, clear };
}
