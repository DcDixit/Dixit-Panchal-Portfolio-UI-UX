import { Download } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { Rich } from "../../components/Rich";
import { site } from "../../content/site";
import { SectionHead } from "./SectionHead";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y">
      <div className="container-x">
        <SectionHead
          id="experience"
          eyebrow="Experience"
          title="From brand design to leading product design"
          aside={`${site.yearsExperience} years in UI/UX and product design, building on an early start in graphic and brand design.`}
        />
        <ol className="border-t border-line">
          {site.experience.map((e, idx) => (
            <li key={e.period} className="border-b border-line">
              <Reveal className="grid gap-4 py-9 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-5">
                  <p className="text-sm tabular-nums text-muted">{e.period}</p>
                  <h3 className="mt-2 flex flex-wrap items-center gap-2 text-xl">
                    {e.role}
                    {idx === 0 ? (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold tracking-normal text-accent">
                        Current
                      </span>
                    ) : null}
                  </h3>
                  <p className="mt-1 text-muted">{e.org}</p>
                </div>
                <ul className="space-y-2.5 md:col-span-7">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>
                        <Rich text={h} />
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:gap-8">
          <h3 className="t-eyebrow md:col-span-5 md:pt-1">Education</h3>
          <ul className="grid gap-6 sm:grid-cols-2 md:col-span-7">
            {site.education.map((ed) => (
              <li key={ed.degree}>
                <p className="font-semibold text-ink">{ed.degree}</p>
                <p className="mt-1 text-muted">
                  {ed.school}{"\u00a0· "}{ed.year}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {site.contact.resumeUrl ? (
          <a href={site.contact.resumeUrl} download className="btn btn-primary mt-12">
            <Download />
            Download full CV (PDF)
          </a>
        ) : null}
      </div>
    </section>
  );
}
