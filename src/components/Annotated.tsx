import { useState } from "react";
import type { Marker, Shot } from "../content/projects";
import { Expand } from "./Icons";
import { Img } from "./Img";

interface Props {
  shot: Shot;
  markers?: Marker[];
  stage: string;
  sizes: string;
  onOpen: (s: Shot) => void;
  /** Unique prefix so legend items and markers can be linked. */
  id: string;
}

/**
 * A real screenshot with minimal numbered markers and a legend underneath.
 * Hovering or focusing a legend item highlights its marker (and vice versa).
 * Markers are decorative for assistive tech; the legend carries the meaning.
 */
export function Annotated({ shot, markers = [], stage, sizes, onOpen, id }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const ratio = shot.height / shot.width;
  const tall = ratio > 1.3;
  const square = !tall && ratio > 0.9;
  const strip = ratio < 0.3;

  return (
    <figure className="rounded-xl" style={{ backgroundColor: stage }}>
      <div className={tall ? "px-[8%] pt-[6%]" : strip ? "px-[5%] py-[7%]" : "px-[5%] pt-[5%]"}>
        <div className={`relative ${tall ? "mx-auto max-w-[440px]" : square ? "mx-auto max-w-[640px]" : ""}`}>
          <button
            type="button"
            onClick={() => onOpen(shot)}
            className={`frame group relative block w-full cursor-zoom-in ${strip ? "" : "rounded-b-none"}`}
            aria-label={`View full size: ${shot.alt}`}
          >
            <Img shot={shot} sizes={sizes} />
            <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink/80 text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand width={15} height={15} />
            </span>
          </button>

          {markers.map((m, i) => (
            <span
              key={i}
              aria-hidden
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`pointer-events-auto absolute grid h-[1.125rem] w-[1.125rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-[0.5625rem] sm:h-6 sm:w-6 sm:text-[0.6875rem] font-semibold tabular-nums ring-2 ring-white transition-[transform,background-color] duration-200 ${
                active === i ? "scale-125 bg-ink text-paper" : "bg-accent text-white"
              } shadow-[0_2px_8px_rgb(20_20_20/0.25)]`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      {markers.length ? (
        <figcaption className="px-[5%] pb-5 pt-5">
          <ol className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {markers.map((m, i) => (
              <li
                key={i}
                id={`${id}-m${i + 1}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="flex items-start gap-2.5 text-[0.9375rem] leading-snug text-ink-2"
              >
                <span
                  aria-hidden
                  className={`mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full text-[0.625rem] font-semibold tabular-nums transition-colors ${
                    active === i ? "bg-ink text-paper" : "bg-accent text-white"
                  }`}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="sr-only">Marker {i + 1}: </span>
                  {m.label}
                </span>
              </li>
            ))}
          </ol>
        </figcaption>
      ) : (
        <div className="pb-[5%]" />
      )}
    </figure>
  );
}
