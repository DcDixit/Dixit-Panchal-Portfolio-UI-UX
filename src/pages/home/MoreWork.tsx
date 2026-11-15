import { useState } from "react";
import { Expand } from "../../components/Icons";
import { Img } from "../../components/Img";
import { Lightbox, type LightboxItem } from "../../components/Lightbox";
import { Reveal } from "../../components/Reveal";
import { moreProjects } from "../../content/projects";
import { SectionHead } from "./SectionHead";

export function MoreWork() {
  const [open, setOpen] = useState<number | null>(null);
  const items: LightboxItem[] = moreProjects.map((p) => ({ shot: p.shot, title: p.title, description: p.description }));
  return (
    <section id="more-work" aria-labelledby="more-work-title" className="border-t border-line section-y">
      <div className="container-x">
        <SectionHead
          id="more-work"
          eyebrow="More projects"
          title="Additional product UI"
          aside="Dashboards, admin tools and product hubs from other engagements. Select a screen to view it full size."
        />
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {moreProjects.map((p, i) => (
            <li key={p.title} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <Reveal delay={(i < 2 ? i : i - 2) * 0.06}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  className="group block w-full rounded-lg text-left"
                  aria-label={`View ${p.title} screen full size`}
                >
                  <div className="relative aspect-[16/10.5] overflow-hidden rounded-lg bg-stage">
                    <div className="frame absolute inset-x-[7%] top-[9%] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5">
                      <Img shot={p.shot} sizes="(min-width: 1024px) 580px, (min-width: 640px) 46vw, 92vw" decorative />
                    </div>
                    <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface text-ink opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand width={16} height={16} />
                    </span>
                  </div>
                  <p className="mt-4 font-semibold text-ink">{p.title}</p>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{p.description}</p>
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
