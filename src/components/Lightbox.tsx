import { useEffect, useRef } from "react";
import type { Shot } from "../content/projects";
import { ArrowLeft, ArrowRight, Close } from "./Icons";

export interface LightboxItem {
  shot: Shot;
  title?: string;
  description?: string;
}

interface Props {
  items: LightboxItem[];
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Full-size screenshot viewer built on the native <dialog> (focus trap, Esc and inert background for free). */
export function Lightbox({ items, index, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const item = open ? items[index] : undefined;
  const many = items.length > 1;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const step = (dir: 1 | -1) => {
    if (index === null) return;
    onChange((index + dir + items.length) % items.length);
  };

  return (
    <dialog
      ref={ref}
      aria-label={item?.title ?? item?.shot.alt ?? "Screenshot"}
      onClose={() => onChange(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null);
      }}
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 backdrop:bg-[#141414]/88"
    >
      {item ? (
        <div
          className="flex h-full flex-col"
          onClick={(e) => {
            if (e.target === e.currentTarget) onChange(null);
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 text-[#f7f6f2] md:px-6">
            <div className="min-w-0">
              {item.title ? <p className="truncate font-semibold">{item.title}</p> : null}
              {item.description ? (
                <p className="truncate text-sm text-[#f7f6f2]/70">{item.description}</p>
              ) : null}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {many ? (
                <span className="mr-2 text-sm tabular-nums text-[#f7f6f2]/70">
                  {index! + 1} / {items.length}
                </span>
              ) : null}
              <button
                type="button"
                onClick={() => onChange(null)}
                className="grid h-11 w-11 place-items-center rounded-full text-[#f7f6f2] hover:bg-white/10"
                aria-label="Close"
                autoFocus
              >
                <Close width={22} height={22} />
              </button>
            </div>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-start justify-center overflow-auto px-4 pb-6 md:px-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) onChange(null);
            }}
          >
            <img
              key={item.shot.src}
              src={`/work/${item.shot.src}-2400.webp`}
              alt={item.shot.alt}
              width={item.shot.width}
              height={item.shot.height}
              className="h-auto w-full max-w-[1600px] rounded-md bg-white"
            />
          </div>

          {many ? (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous screenshot"
                className="fixed left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:grid"
              >
                <ArrowLeft width={22} height={22} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next screenshot"
                className="fixed right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:grid"
              >
                <ArrowRight width={22} height={22} />
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </dialog>
  );
}
