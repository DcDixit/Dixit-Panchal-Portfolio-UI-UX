import { m, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Annotated } from "../components/Annotated";
import { ArrowLeft, ArrowRight, Expand } from "../components/Icons";
import { Img } from "../components/Img";
import { Lightbox, type LightboxItem } from "../components/Lightbox";
import { easeOut, Reveal } from "../components/Reveal";
import { Unconfirmed } from "../components/Unconfirmed";
import { caseStudies, getCaseStudy, isShown, type CaseStudy as Study, type Shot } from "../content/projects";
import { site } from "../content/site";
import { caseStudyMeta } from "../lib/pageMeta";
import { useMeta } from "../lib/useMeta";
import { NotFound } from "./NotFound";

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

  const sections = useMemo(
    () => [
      { id: "glance", label: "At a glance" },
      ...study.decisions.map((d, i) => ({ id: `decision-${i + 1}`, label: d.title })),
      { id: "goal", label: "Goal" },
    ],
    [study],
  );
  const sectionIds = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useScrollSpy(sectionIds);

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
  const facts: { k: string; v: string; flagged: boolean }[] = [
    ...(isShown(study, "role") ? [{ k: "Role", v: study.role, flagged: study.unconfirmed.includes("role") }] : []),
    ...(isShown(study, "timeline") ? [{ k: "Timeline", v: study.timeline, flagged: study.unconfirmed.includes("timeline") }] : []),
    { k: "Platform", v: study.platform, flagged: false },
    { k: "Domain", v: study.category, flagged: false },
  ];

  return (
    <article aria-labelledby="cs-title">
      <m.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-accent"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />

      {/* Header */}
      <header className="container-x pt-[calc(var(--header-h)+clamp(2.5rem,6vw,4.5rem))]">
        <Link to={{ pathname: "/", hash: "#work" }} className="group inline-flex items-center gap-2 text-[0.9375rem] font-medium text-muted hover:text-ink">
          <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <m.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
        >
          <p className="t-eyebrow mt-10">Case study</p>
          <h1 id="cs-title" className="t-display mt-4 max-w-[14ch]">
            {study.title}
          </h1>
          <p className="t-lead mt-6 max-w-[58ch]">{study.tagline}</p>
        </m.div>

        <dl className="mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {facts.map(({ k, v, flagged }) => (
            <div key={k} className="border-b border-line py-4 pr-4 md:border-b-0">
              <dt className="text-sm text-muted">{k}</dt>
              <dd className="mt-1 font-medium text-ink">
                {v}
                {flagged ? <Unconfirmed /> : null}
              </dd>
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
          <button
            type="button"
            onClick={() => openShot(study.cover)}
            className="frame group relative block w-full cursor-zoom-in rounded-b-none"
            aria-label={`View full size: ${study.cover.alt}`}
          >
            <Img shot={study.cover} eager sizes="(min-width: 1240px) 1100px, 90vw" />
            <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/80 text-paper opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <Expand width={16} height={16} />
            </span>
          </button>
        </m.div>
      </div>

      {/* Body */}
      <div className="container-x section-y grid gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
        <nav aria-label="On this page" className="hidden lg:block">
          <ol className="sticky top-[calc(var(--header-h)+2rem)] space-y-0.5 border-l border-line">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "location" : undefined}
                  className={`-ml-px block border-l py-1.5 pl-4 text-[0.875rem] leading-snug transition-colors ${
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
          {/* At a glance: the whole story in a few seconds */}
          <section id="glance" aria-labelledby="glance-title" className="scroll-mt-28">
            <h2 id="glance-title" className="t-eyebrow">
              At a glance
            </h2>
            <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
              <GlanceCell title="Context">{study.context}</GlanceCell>
              <GlanceCell title="Problem">{study.problem}</GlanceCell>
              <GlanceCell title="What I designed" wide>
                <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {study.contribution.map((c) => (
                    <li key={c} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {c}
                    </li>
                  ))}
                </ul>
              </GlanceCell>
            </div>
          </section>

          {/* Decisions */}
          <section aria-labelledby="decisions-title" className="mt-20">
            <h2 id="decisions-title" className="t-eyebrow">
              Key decisions
            </h2>
            <ol className="mt-8 space-y-20 md:space-y-24">
              {study.decisions.map((d, i) => (
                <li key={d.title} id={`decision-${i + 1}`} className="scroll-mt-28">
                  <Reveal>
                    <h3 className="t-h3 max-w-[30ch]">{d.title}</h3>
                    <p className="mt-3 max-w-[66ch]">{d.body}</p>
                  </Reveal>
                  {d.shot ? (
                    <Reveal className="mt-8" y={24}>
                      <Annotated
                        id={`${study.slug}-d${i + 1}`}
                        shot={d.shot}
                        markers={d.markers}
                        stage={study.stage}
                        sizes="(min-width: 1024px) 880px, 92vw"
                        onOpen={openShot}
                      />
                    </Reveal>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          <section id="goal" aria-labelledby="goal-title" className="mt-20 scroll-mt-28 border-t border-line pt-10">
            <Reveal>
              <h2 id="goal-title" className="t-eyebrow mb-5">
                Design goal
              </h2>
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
            </Reveal>
          </section>
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
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl md:col-span-6" style={{ backgroundColor: next.stage }}>
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

function GlanceCell({ title, children, wide }: { title: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`bg-surface p-6 md:p-7 ${wide ? "md:col-span-2" : ""}`}>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-2.5 text-[1rem] leading-relaxed">{children}</div>
    </div>
  );
}

function useScrollSpy(ids: string[]) {
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
