import type { SVGProps } from "react";

/**
 * "dp" monogram: a d and a p drawn on one grid. The p is the d turned 180°,
 * so the mark is rotationally symmetric. Stroke weight matches Figtree semibold.
 */
export function LogoMark({ title, ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg viewBox="0 0 64 64" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} {...props}>
      {title ? <title>{title}</title> : null}
      <rect width="64" height="64" rx="15" fill="var(--color-ink)" />
      <g fill="none" stroke="var(--color-paper)" strokeWidth="5">
        <circle cx="20.5" cy="32" r="7.5" />
        <path d="M28 10V42" />
        <circle cx="43.5" cy="32" r="7.5" />
        <path d="M36 22V54" />
      </g>
    </svg>
  );
}
