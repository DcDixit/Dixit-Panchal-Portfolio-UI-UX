import { m, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Download, Expand } from "../components/Icons";
import { Img } from "../components/Img";
import { Lightbox, type LightboxItem } from "../components/Lightbox";
import { easeOut, Reveal } from "../components/Reveal";
import { Rich } from "../components/Rich";
import { Unconfirmed } from "../components/Unconfirmed";
import { caseStudies, graphicWork, isShown, moreProjects, type CaseStudy } from "../content/projects";
import { site } from "../content/site";
import { homeMeta } from "../lib/pageMeta";
import { useMeta } from "../lib/useMeta";

export function Home() {
  useMeta(homeMeta);
  return (
    <>
      <Hero />
      <SelectedWork />
      <MoreWork />
      <GraphicWork />
      <About />
      <Expertise />
      <Experience />
      <Contact />
    </>
  );
}

/* ---------------------------------------------------------------- Hero */

function Hero() {
  const reduce = useReducedMotion();
  const front = caseStudies.find((c) => c.slug === "gocardless-quickbooks")!;
  const back = caseStudies.find((c) => c.slug === "costallocation-pro")!;

  return (
    <section aria-labelledby="hero-title" className="pt-[calc(var(--header-h)+clamp(1.75rem,4vw,3.25rem))]">
      {/* Title and subtitle */}
      <m.div
        className="container-x"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <p className="flex items-center gap-2 text-[0.9375rem] font-medium text-muted">
          <span aria-hidden className="h-2 w-2 rounded-full bg-[#2f9e5b]" />
          {site.location} · {site.availability}
        </p>
        <div className="mt-5 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <h1 id="hero-title" className="lg:col-span-7">
            <span className="sr-only">
              {site.name}, {site.role}.{" "}
            </span>
            <span className="block text-[clamp(2.25rem,1.2rem+2.9vw,4rem)] font-semibold leading-[1.04] tracking-[-0.04em]">
              <Rich text={site.hero.headline} emClassName="font-semibold text-accent" />
            </span>
          </h1>
          <div className="lg:col-span-5">
            <p className="text-[1.0625rem] leading-relaxed text-ink-2 md:text-lg">
              <Rich text={site.hero.intro} />
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={{ hash: "#work" }} className="btn btn-primary">
                View selected work
                <ArrowDown className="arrow" />
              </Link>
              {site.contact.resumeUrl ? (
                <a href={site.contact.resumeUrl} className="btn btn-ghost" download>
                  <Download />
                  Download CV
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </m.div>

      {/* Real product work, full container width; each screen opens its case study */}
      <m.div
        className="container-x mt-10 md:mt-12"
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.15 }}
      >
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/9] lg:aspect-auto lg:h-[min(46vw,560px)]"
          style={{ backgroundColor: front.stage }}
        >
          <Link
            to={`/work/${back.slug}`}
            aria-label={`${back.title} case study`}
            className="frame absolute right-[4%] top-[9%] hidden w-[50%] transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 sm:block"
          >
            <Img shot={back.cover} sizes="(min-width: 1024px) 620px, 50vw" decorative />
          </Link>
          <Link
            to={`/work/${front.slug}`}
            aria-label={`${front.title} case study`}
            className="frame absolute left-[6%] top-[16%] w-[88%] transition-transform duration-500 ease-[var(--ease-out-soft)] hover:-translate-y-1 sm:w-[56%]"
          >
            <Img shot={front.cover} sizes="(min-width: 1024px) 700px, 90vw" eager decorative />
          </Link>
        </div>
        <p className="mt-3 text-sm text-muted">
          Real product work:{" "}
          <Link to={`/work/${front.slug}`} className="link font-medium">
            {front.title}
          </Link>{" "}
          and{" "}
          <Link to={`/work/${back.slug}`} className="link font-medium">
            {back.title}
          </Link>
        </p>
      </m.div>

      {/* Proof points */}
      <div className="container-x mt-10 md:mt-14">
        <div className="grid gap-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-muted">Currently</p>
            <p className="mt-2 text-lg font-medium leading-snug text-ink">
              <Rich text={site.hero.current} emClassName="font-semibold" />
            </p>
          </div>
          {site.hero.proof.map(({ value, label }) => (
            <div key={value}>
              <p className="text-[clamp(2rem,1.5rem+1.4vw,2.75rem)] font-semibold leading-none tracking-[-0.03em] text-ink">{value}</p>
              <p className="mt-2 text-sm leading-snug text-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Section header */

function SectionHead({
  id,
  eyebrow,
  title,
  aside,
  dark,
}: {
  id: string;
  eyebrow: string;
  title: string;
  aside?: string;
  dark?: boolean;
}) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className={`t-eyebrow mb-4 ${dark ? "!text-paper/60" : ""}`}>{eyebrow}</p>
        <h2 id={`${id}-title`} className={`t-h2 ${dark ? "!text-paper" : ""}`}>
          {title}
        </h2>
      </div>
      {aside ? (
        <p className={`max-w-[46ch] lg:col-span-5 lg:justify-self-end ${dark ? "text-paper/70" : "text-muted"}`}>{aside}</p>
      ) : null}
    </Reveal>
  );
}

/* -------------------------------------------------------- Selected work */

function SelectedWork() {
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
  const reduce = useReducedMotion();
  const tall = study.cover.height / study.cover.width > 0.9;
  const showRole = isShown(study, "role");
  const showTimeline = isShown(study, "timeline");

  return (
    <article aria-labelledby={`row-${study.slug}`} className="group grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
      <Link to={`/work/${study.slug}`} tabIndex={-1} aria-hidden className={`block lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <m.div
          className="relative aspect-[16/11] overflow-hidden rounded-xl"
          style={{ backgroundColor: study.stage }}
          initial={reduce ? false : { clipPath: "inset(10% 4% 0% 4% round 12px)", opacity: 0.5 }}
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
              <dt className="t-eyebrow">Role</dt>
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

/* ------------------------------------------------------------ More work */

function MoreWork() {
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

/* -------------------------------------------- Graphic design (secondary) */

function GraphicWork() {
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

/* ---------------------------------------------------------------- About */

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line section-y">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="t-eyebrow mb-4">About</p>
          <h2 id="about-title" className="t-h2 max-w-[13ch]">
            Clarity for products with real complexity
          </h2>
        </Reveal>
        <Reveal className="space-y-5 lg:col-span-7 lg:pt-9">
          {site.about.paragraphs.map((p) => (
            <p key={p} className="t-lead">
              <Rich text={p} />
            </p>
          ))}
        </Reveal>
      </div>

      <div className="container-x mt-16 md:mt-20">
        <h3 className="t-eyebrow mb-6">How I lead</h3>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {site.about.leadership.map((item, i) => (
            <li key={item.title} className="border-t-2 border-ink pt-5">
              <Reveal delay={i * 0.06}>
                <h4 className="text-xl leading-snug">{item.title}</h4>
                <p className="mt-3 text-muted">
                  <Rich text={item.body} />
                </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Expertise */

function Expertise() {
  const { capabilities, domains, tools, ai } = site.expertise;
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="bg-ink text-paper">
      <div className="container-x section-y">
        <SectionHead id="expertise" eyebrow="Expertise" title="What I bring to a team" dark />

        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {capabilities.map((c, i) => (
            <li key={c.title} className="border-t border-paper/15 pt-5">
              <Reveal delay={i * 0.06}>
                <h3 className="text-lg !text-paper">{c.title}</h3>
                <ul className="mt-4 space-y-2 text-paper/75">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* AI-assisted workflow: given its own panel so it reads at a glance */}
        <Reveal className="mt-16 rounded-2xl border border-paper/15 bg-paper/[0.05] p-7 md:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <h3 className="t-eyebrow !text-paper/60">AI-assisted workflow</h3>
              <p className="mt-3 text-xl leading-snug !text-paper">{ai.summary}</p>
            </div>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-paper/15 sm:grid-cols-4 lg:col-span-7">
              {ai.tools.map((t) => (
                <li key={t.name} className="grid place-items-center bg-ink px-5 py-7" title={t.name}>
                  <img src={t.logo} alt={t.name} width={44} height={44} className="h-11 w-11" loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h3 className="t-eyebrow !text-paper/60">Domains</h3>
            <p className="mt-4 text-lg leading-relaxed text-paper">{domains.join(" · ")}</p>
          </div>
          <div className="md:col-span-5">
            <h3 className="t-eyebrow !text-paper/60">Design tools</h3>
            <p className="mt-4 text-lg leading-relaxed text-paper">{tools.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Experience */

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-y">
      <div className="container-x">
        <SectionHead
          id="experience"
          eyebrow="Experience"
          title={`${site.yearsExperience} years of design`}
          aside="From graphic and brand design to leading the design function and end-to-end UX for B2B products."
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
                  {ed.school} · {ed.year}
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

/* -------------------------------------------------------------- Contact */

function Contact() {
  const [copied, setCopied] = useState(false);
  const { email, linkedin, resumeUrl } = site.contact;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-ink text-paper">
      <div className="container-x section-y">
        <Reveal>
          <p className="t-eyebrow mb-6 !text-paper/60">Contact</p>
          <h2 id="contact-title" className="t-h2 max-w-[18ch] !text-paper">
            Hiring for a senior design role? Let’s talk.
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col gap-6 md:mt-16 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="break-all text-[clamp(1.5rem,1rem+2.6vw,2.75rem)] font-semibold tracking-[-0.03em] text-paper underline decoration-paper/30 decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-paper"
            >
              {email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="grid h-11 w-11 place-items-center rounded-full border border-paper/25 text-paper transition-colors hover:border-paper"
              aria-label={copied ? "Email address copied" : "Copy email address"}
            >
              {copied ? <Check /> : <Copy />}
            </button>
            <span role="status" aria-live="polite" className="sr-only">
              {copied ? "Email address copied to clipboard" : ""}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {linkedin ? (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn border border-paper/30 text-paper hover:border-paper">
                LinkedIn
                <ArrowUpRight className="arrow" />
              </a>
            ) : null}
            {resumeUrl ? (
              <a href={resumeUrl} download className="btn bg-paper text-ink hover:bg-white">
                <Download />
                Download CV
              </a>
            ) : null}
          </div>
        </Reveal>

        <p className="mt-16 border-t border-paper/15 pt-6 text-sm text-paper/60">
          {site.location} · {site.availability}
        </p>
      </div>
    </section>
  );
}
