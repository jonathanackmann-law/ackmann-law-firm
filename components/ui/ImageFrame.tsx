import Image, { type ImageProps } from "next/image";

type ImageFrameProps = ImageProps & {
  /** CSS aspect-ratio value, e.g. "4/5", "16/9". Defaults to editorial portrait. */
  aspectRatio?: string;
  frameClassName?: string;
};

/**
 * Consistent framing for next/image (SPEC.md Section 6/27) — fills a sized
 * box so responsive `sizes` behave predictably wherever it's used.
 */
export function ImageFrame({
  aspectRatio = "4/5",
  frameClassName = "",
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  alt,
  ...props
}: ImageFrameProps) {
  return (
    <div
      className={`relative overflow-hidden bg-surface ${frameClassName}`}
      style={{ aspectRatio }}
    >
      <Image
        fill
        sizes={sizes}
        alt={alt}
        className={`object-cover ${className}`}
        {...props}
      />
    </div>
  );
}
