import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, Expand } from "../components/Icons";
import { Img } from "../components/Img";
import { Lightbox, type LightboxItem } from "../components/Lightbox";
import { easeOut, Reveal } from "../components/Reveal";
import { caseStudies, getCaseStudy, type CaseStudy as Study, type Shot } from "../content/projects";
import { site } from "../content/site";
import { caseStudyMeta } from "../lib/pageMeta";
import { useMeta } from "../lib/useMeta";
import { NotFound } from "./NotFound";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "role", label: "My role" },
  { id: "decisions", label: "Key decisions" },
  { id: "goal", label: "Goal" },
] as const;
const SECTION_IDS = SECTIONS.map((s) => s.id);

export function CaseStudy() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);
  if (!study) return <NotFound />;
  return <CaseStudyView key={study.slug} study={study} />;
}

function CaseStudyView({ study }: { study: Study }) {
  useMeta(caseStudyMeta(study.slug)!);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const active = useScrollSpy(SECTION_IDS);

  const shots = useMemo(() => {
    const list: Shot[] = [study.cover];
    study.decisions.forEach((d) => d.shot && !list.some((s) => s.src === d.shot!.src) && list.push(d.shot));
    return list;
  }, [study]);
  const lightboxItems: LightboxItem[] = shots.map((s) => ({ shot: s, title: study.title, description: s.alt }));
  const [open, setOpen] = useState<number | null>(null);
  const openShot = (s: Shot) => setOpen(shots.findIndex((x) => x.src === s.src));

  const idx = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <article aria-labelledby="cs-title">
      <m.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />

      {/* Header */}
      <header className="container-x pt-[calc(var(--header-h)+clamp(2.5rem,6vw,5rem))]">
        <Link to={{ pathname: "/", hash: "#work" }} className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-muted hover:text-ink">
          <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <m.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="t-eyebrow mt-10">
            Case study · {study.category}
          </p>
          <h1 id="cs-title" className="t-display mt-4 max-w-[14ch]">
            {study.title}
          </h1>
          <p className="t-lead mt-6 max-w-[58ch]">{study.tagline}</p>
        </m.div>

        <dl className="mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {[
            ["Role", study.role],
            ["Timeline", study.timeline],
            ["Platform", study.platform],
            ["Tools", study.tools.join(", ")],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-line py-4 pr-4 md:border-b-0">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="mt-1 font-medium text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Cover */}
      <div className="container-x mt-10 md:mt-14">
        <m.div
          className="rounded-2xl px-[6%] pt-[6%]"
          style={{ backgroundColor: study.stage }}
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.15 }}
        >
          <ShotButton shot={study.cover} onOpen={openShot} eager sizes="(min-width: 1240px) 1100px, 90vw" className="rounded-b-none" />
        </m.div>
      </div>

      {/* Body */}
      <div className="container-x section-y grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-[calc(var(--header-h)+2rem)] space-y-1 border-l border-line">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "location" : undefined}
                  className={`-ml-px block border-l py-1.5 pl-4 text-[0.9375rem] transition-colors ${
                    active === s.id ? "border-ink font-medium text-ink" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 max-w-[880px]">
          <Block id="overview" label="Overview">
            <p className="t-lead">{study.context}</p>
          </Block>

          <Block id="problem" label="Problem">
            <p className="t-lead">{study.problem}</p>
          </Block>

          <Block id="role" label="My role">
            <p>
              <span className="font-semibold text-ink">{study.role}</span> · {study.timeline}
            </p>
            <ul className="mt-5 grid gap-x-8 sm:grid-cols-2">
              {study.contribution.map((c) => (
                <li key={c} className="flex gap-3 border-t border-line py-3">
                  <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </Block>

          <section id="decisions" aria-labelledby="decisions-title" className="scroll-mt-28 border-t border-line pt-10 pb-6">
            <h2 id="decisions-title" className="t-eyebrow">
              Key decisions
            </h2>
            <ol className="mt-8 space-y-16 md:space-y-20">
              {study.decisions.map((d, i) => (
                <li key={d.title}>
                  <Reveal>
                    <div className="grid gap-3 md:grid-cols-[3rem_1fr]">
                      <span className="text-sm font-medium tabular-nums text-muted md:pt-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="t-h3">{d.title}</h3>
                        <p className="mt-3 max-w-[64ch]">{d.body}</p>
                      </div>
                    </div>
                  </Reveal>
                  {d.shot && d.shot.src !== study.cover.src ? (
                    <Reveal className="mt-8" y={28}>
                      <div className="rounded-xl" style={{ backgroundColor: study.stage, padding: "5%" }}>
                        <ShotButton
                          shot={d.shot}
                          onOpen={openShot}
                          sizes="(min-width: 1024px) 760px, 90vw"
                          narrow={d.shot.height / d.shot.width > 1.3}
                        />
                      </div>
                    </Reveal>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <Block id="goal" label="Design goal">
            <p className="text-[clamp(1.375rem,1.1rem+1.2vw,2rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
              {study.goal}
            </p>
            <p className="mt-6 text-muted">
              Want the full story behind this project? I’m happy to walk through it.{" "}
              <a className="link" href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`About ${study.title}`)}`}>
                Email me
              </a>
              .
            </p>
          </Block>
        </div>
      </div>

      {/* Next */}
      <nav aria-label="Next case study" className="border-t border-line">
        <Link to={`/work/${next.slug}`} className="group container-x grid items-center gap-8 py-14 md:grid-cols-12 md:py-20">
          <div className="md:col-span-6">
            <p className="t-eyebrow">Next case study</p>
            <p className="t-h2 mt-4 transition-colors group-hover:text-accent">{next.title}</p>
            <p className="mt-3 max-w-[48ch] text-muted">{next.tagline}</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-ink">
              Read case study <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
          <div
            className="relative aspect-[16/9] overflow-hidden rounded-xl md:col-span-6"
            style={{ backgroundColor: next.stage }}
          >
            <div className="frame absolute left-[8%] top-[12%] w-[105%] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-2">
              <Img shot={next.cover} sizes="(min-width: 768px) 50vw, 90vw" decorative />
            </div>
          </div>
        </Link>
      </nav>

      <Lightbox items={lightboxItems} index={open} onChange={setOpen} />
    </article>
  );
}

function Block({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28 border-t border-line pt-10 pb-14 first:border-t-0 first:pt-0">
      <Reveal>
        <h2 id={`${id}-title`} className="t-eyebrow mb-5">
          {label}
        </h2>
        {children}
      </Reveal>
    </section>
  );
}

function ShotButton({
  shot,
  onOpen,
  sizes,
  eager,
  narrow,
  className = "",
}: {
  shot: Shot;
  onOpen: (s: Shot) => void;
  sizes: string;
  eager?: boolean;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <figure className={narrow ? "mx-auto max-w-[460px]" : ""}>
      <button
        type="button"
        onClick={() => onOpen(shot)}
        className={`frame group relative block w-full cursor-zoom-in text-left ${className}`}
        aria-label={`View full size: ${shot.alt}`}
      >
        <Img shot={shot} sizes={sizes} eager={eager} />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/80 text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Expand width={16} height={16} />
        </span>
      </button>
    </figure>
  );
}

function useScrollSpy(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}
