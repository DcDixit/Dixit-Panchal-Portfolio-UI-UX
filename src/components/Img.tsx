import type { Shot } from "../content/projects";

interface Props {
  shot: Shot;
  /** Rendered width hint for the browser, e.g. "(min-width: 1024px) 50vw, 100vw". */
  sizes: string;
  className?: string;
  eager?: boolean;
  /** Use empty alt when the image is duplicated by adjacent text. */
  decorative?: boolean;
}

/** Responsive screenshot: 1200w for standard screens, 2400w for high-density displays. */
export function Img({ shot, sizes, className, eager, decorative }: Props) {
  const base = `/work/${shot.src}`;
  return (
    <img
      src={`${base}-1200.webp`}
      srcSet={`${base}-1200.webp 1200w, ${base}-2400.webp 2400w`}
      sizes={sizes}
      width={shot.width}
      height={shot.height}
      alt={decorative ? "" : shot.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
