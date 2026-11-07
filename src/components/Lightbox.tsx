import { useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Modal } from "./Modal";
import { Photo } from "./Photo";
import type { GalleryEntry } from "../data/gallery";

interface Props {
  entries: GalleryEntry[];
  index: number | null;
  onIndex: (i: number | null) => void;
}

export function Lightbox({ entries, index, onIndex }: Props) {
  const open = index !== null;
  const entry = open ? entries[index] : null;

  const go = (delta: number) => {
    if (index === null) return;
    onIndex((index + delta + entries.length) % entries.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  const nav = "absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-paper/95 shadow hover:bg-white";

  return (
    <Modal open={open} onClose={() => onIndex(null)} label="Gallery image viewer" bare className="max-w-5xl !bg-ink text-paper">
      {entry && (
        <figure className="relative">
          <button type="button" onClick={() => onIndex(null)} aria-label="Close viewer" className="absolute right-3 top-3 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper/95 text-ink shadow hover:bg-white"><X size={20} aria-hidden /></button>
          <Photo name={entry.image} alt={entry.caption} className="aspect-[4/3] max-h-[72dvh] w-full" eager />
          <button type="button" className={`${nav} left-3 text-ink`} onClick={() => go(-1)} aria-label="Previous image"><ChevronLeft aria-hidden /></button>
          <button type="button" className={`${nav} right-3 text-ink`} onClick={() => go(1)} aria-label="Next image"><ChevronRight aria-hidden /></button>
          <figcaption className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
            <span className="h-sub">{entry.caption}</span>
            <span className="text-sm text-[#b9b2a0]">
              {index! + 1} of {entries.length}
            </span>
          </figcaption>
        </figure>
      )}
    </Modal>
  );
}
