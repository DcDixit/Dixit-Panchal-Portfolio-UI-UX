import { useState } from "react";
import { Expand } from "../../components/Icons";
import { Img } from "../../components/Img";
import { Lightbox, type LightboxItem } from "../../components/Lightbox";
import { Reveal } from "../../components/Reveal";
import { graphicWork } from "../../content/projects";

export function GraphicWork() {
  const [open, setOpen] = useState<number | null>(null);
  const items: LightboxItem[] = graphicWork.map((g) => ({ shot: g.full, title: g.title, description: `${g.kind}: ${g.description}` }));
  return (
    <section id="graphic-work" aria-labelledby="graphic-work-title" className="border-t border-line py-[clamp(3.5rem,7vw,6rem)]">
      <div className="container-x">
        <Reveal className="mb-10 grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="t-eyebrow mb-3">Visual design</p>
            <h2 id="graphic-work-title" className="text-[clamp(1.5rem,1.2rem+1vw,2rem)] leading-tight tracking-[-0.025em]">
              Brand, print and editorial
            </h2>
          </div>
          <p className="max-w-[46ch] text-muted lg:col-span-5 lg:justify-self-end">
            Graphic design is where I started, and it still shapes my product work. A few selected pieces.
          </p>
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-5">
          {graphicWork.map((g, i) => (
            <li key={g.title}>
              <Reveal delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group block w-full rounded-lg text-left"
                  aria-label={`View ${g.title} (${g.kind}) full size`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-stage">
                    <Img
                      shot={g.thumb}
                      sizes="(min-width: 1024px) 230px, (min-width: 640px) 30vw, 46vw"
                      decorative
                      className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                    />
                    <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-surface text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand width={14} height={14} />
                    </span>
                  </div>
                  <p className="mt-3 text-[0.9375rem] font-semibold text-ink">{g.title}</p>
                  <p className="text-sm text-muted">{g.kind}</p>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={items} index={open} onChange={setOpen} />
    </section>
  );
}
