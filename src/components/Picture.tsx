import { useState } from "react";
import { Art, type ArtKind } from "./Art";
import { photos } from "../data/images";
import { asset } from "../utils/assets";

interface PictureProps {
  /** Key into src/data/images.ts. When a photo is configured it replaces the illustration. */
  id: string;
  kind: ArtKind;
  seed: string;
  alt: string;
  className?: string;
  eager?: boolean;
  /** The image is described by adjacent text, so hide it from assistive tech. */
  decorative?: boolean;
  /** Overlay a small "Illustration" tag when no photo is configured. */
  tag?: boolean;
}

export function Picture({ id, kind, seed, alt, className = "", eager, tag, decorative }: PictureProps) {
  const photo = photos[id];
  const [failed, setFailed] = useState(false);
  const showPhoto = photo && !failed;
  return (
    <div className={`relative overflow-hidden bg-linen ${className}`}>
      {showPhoto ? (
        <img
          src={asset(photo.thumb ?? photo.src)}
          alt={decorative ? "" : photo.alt || alt}
          width={photo.width}
          height={photo.height}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <Art kind={kind} seed={seed} label={decorative ? undefined : `${alt} (illustration)`} className="h-full w-full" />
      )}
      {tag && !showPhoto && (
        <span className="absolute bottom-2 left-2 rounded-[2px] bg-ink/80 px-2 py-0.5 text-[0.7rem] font-medium text-paper">
          Illustration
        </span>
      )}
      {tag && showPhoto && !photo.official && (
        <span className="absolute bottom-2 left-2 rounded-[2px] bg-ink/80 px-2 py-0.5 text-[0.7rem] font-medium text-paper">
          Representative image
        </span>
      )}
    </div>
  );
}
