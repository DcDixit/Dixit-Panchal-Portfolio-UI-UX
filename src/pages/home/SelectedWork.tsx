import { m } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "../../components/Icons";
import { Img } from "../../components/Img";
import { easeOut } from "../../components/Reveal";
import { Unconfirmed } from "../../components/Unconfirmed";
import { caseStudies, isShown, type CaseStudy } from "../../content/projects";
import { SectionHead } from "./SectionHead";

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y">
      <div className="container-x">
        <SectionHead
          id="work"
          eyebrow="Selected work"
          title="Case studies"
          aside="Four products across career tech, payments, nonprofit finance and financial reporting. Each shows the problem, what I designed, the key design decisions and the real screens."
        />
        <ol>
          {caseStudies.map((c, i) => (
            <li key={c.slug} className="border-t border-line py-12 first:border-t-0 first:pt-0 md:py-16">
              <WorkRow study={c} flip={i % 2 === 1} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WorkRow({ study, flip }: { study: CaseStudy; flip: boolean }) {
  const tall = study.cover.height / study.cover.width > 0.9;
  const showRole = isShown(study, "role");
  const showTimeline = isShown(study, "timeline");

  return (
    <article aria-labelledby={`row-${study.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
      <Link to={`/work/${study.slug}`} tabIndex={-1} aria-hidden className={`block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <m.div
          className="relative aspect-[16/11] overflow-hidden rounded-xl"
          style={{ backgroundColor: study.stage }}
          initial={{ clipPath: "inset(10% 4% 0% 4% round 12px)", opacity: 0.5 }}
          whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.9, ease: easeOut }}
        >
          <div
            className={`frame absolute top-[9%] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-2 ${
              tall ? "left-[15%] w-[70%]" : "left-[7%] w-[100%]"
            }`}
          >
            <Img shot={study.cover} sizes="(min-width: 1024px) 700px, 100vw" decorative />
          </div>
        </m.div>
      </Link>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="text-sm text-muted">
          {study.category} · {study.platform}
        </p>
        <h3 id={`row-${study.slug}`} className="mt-2 text-[clamp(1.75rem,1.4rem+1.2vw,2.5rem)] leading-[1.08] tracking-[-0.03em]">
          <Link to={`/work/${study.slug}`} className="transition-colors hover:text-accent">
            {study.title}
          </Link>
        </h3>
        <p className="mt-3 text-[1.0625rem]">{study.tagline}</p>

        <dl className="mt-6 space-y-5 border-t border-line pt-5">
          <div>
            <dt className="t-eyebrow">Problem</dt>
            <dd className="mt-1.5 text-ink">{study.problemShort}</dd>
          </div>
          <div>
            <dt className="t-eyebrow">Key decisions</dt>
            <dd>
              <ul className="mt-2 space-y-1.5">
                {study.decisions.map((d) => (
                  <li key={d.title} className="flex gap-3 text-ink">
                    <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {d.title}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          {showRole || showTimeline ? (
            <div>
              <dt className="t-eyebrow">{showRole && showTimeline ? "Role & timeline" : showRole ? "Role" : "Timeline"}</dt>
              <dd className="mt-1.5 text-ink">
                {[showRole && study.role, showTimeline && study.timeline].filter(Boolean).join(" · ")}
                {study.unconfirmed.length ? <Unconfirmed /> : null}
              </dd>
            </div>
          ) : null}
        </dl>

        <Link
          to={`/work/${study.slug}`}
          className="mt-7 inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-accent"
        >
          Read case study
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          <span className="sr-only">: {study.title}</span>
        </Link>
      </div>
    </article>
  );
}
