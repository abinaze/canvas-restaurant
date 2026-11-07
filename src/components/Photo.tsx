import { IMAGES, imageUrl, type ImageName } from "../data/images";

interface PhotoProps {
  /** Which picture slot to show (see src/data/images.ts). */
  name: ImageName;
  /** Override the default description, e.g. for a specific dish. */
  alt?: string;
  /** The picture is described by nearby text, so hide it from assistive tech. */
  decorative?: boolean;
  /** Load straight away (use only for the first screen). */
  eager?: boolean;
  /** Sizing and shape classes for the frame, e.g. "aspect-[4/3] w-full". */
  className?: string;
  /** Tailwind object-position class when the subject is off-centre. */
  position?: string;
}

/** Shows src/assets/images/<name>.*, cropped to fill its frame. Replace the file to change the picture. */
export function Photo({ name, alt, decorative, eager, className = "", position = "object-center" }: PhotoProps) {
  const slot = IMAGES[name];
  const src = imageUrl(name);
  return (
    <div className={`relative overflow-hidden bg-linen ${className}`}>
      {src && (
        <img
          src={src}
          alt={decorative ? "" : (alt ?? slot.alt)}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          className={`absolute inset-0 h-full w-full object-cover ${position}`}
        />
      )}
    </div>
  );
}
