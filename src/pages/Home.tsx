import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Copy, Download, Expand } from "../components/Icons";
import { Img } from "../components/Img";
import { Lightbox, type LightboxItem } from "../components/Lightbox";
import { easeOut, Reveal } from "../components/Reveal";
import { caseStudies, moreProjects, type CaseStudy } from "../content/projects";
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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 24]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 56]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  const words = site.hero.headline.split(" ");

  const [a, b, c] = [caseStudies[1], caseStudies[2], caseStudies[3]];

  return (
    <section ref={ref} aria-labelledby="hero-title" className="overflow-hidden pt-[calc(var(--header-h)+clamp(3rem,8vw,6.5rem))]">
      <div className="container-x">
        <h1 id="hero-title">
          <m.span
            className="mb-6 block text-base font-medium tracking-normal text-muted md:mb-8 md:text-lg"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {site.name} · {site.role}
          </m.span>
          <span className="t-display block max-w-[19ch]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
                <m.span
                  className="inline-block"
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: easeOut, delay: 0.1 + i * 0.035 }}
                >
                  {w}
                  {i < words.length - 1 ? " " : ""}
                </m.span>
              </span>
            ))}
          </span>
        </h1>

        <Reveal delay={0.35} className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:items-end">
          <p className="t-lead max-w-[56ch] lg:col-span-7">{site.hero.intro}</p>
          <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Link to={{ hash: "#work" }} className="btn btn-primary">
              View selected work
              <ArrowDown className="arrow" />
            </Link>
            {site.contact.resumeUrl ? (
              <a href={site.contact.resumeUrl} className="btn btn-ghost" download>
                <Download />
                Download CV
              </a>
            ) : (
              <a href={`mailto:${site.contact.email}`} className="btn btn-ghost">
                Get in touch
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.45}>
          <dl className="mt-12 grid grid-cols-1 border-t border-line sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {site.hero.proof.map(({ label, value }) => (
              <div key={label} className="border-b border-line py-4 sm:pr-6 lg:border-b-0">
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="mt-1 font-medium leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Real product screens; each opens its case study */}
      <div className="container-x mt-12 md:mt-16" aria-label="Product screens from selected work">
        <div className="relative overflow-hidden rounded-2xl bg-stage px-5 pt-8 sm:px-10 sm:pt-12 lg:h-[min(44vw,600px)] lg:px-0 lg:pt-0">
          <m.div style={{ y: y1 }} className="relative z-10 lg:absolute lg:left-[4%] lg:top-[10%] lg:w-[52%]">
            <HeroShot study={a} sizes="(min-width: 1024px) 640px, 92vw" eager />
          </m.div>
          <m.div style={{ y: y2 }} className="relative z-20 hidden lg:absolute lg:left-[36%] lg:top-[30%] lg:block lg:w-[38%]">
            <HeroShot study={b} sizes="480px" />
          </m.div>
          <m.div style={{ y: y3 }} className="relative z-30 hidden lg:absolute lg:right-[3%] lg:top-[44%] lg:block lg:w-[44%]">
            <HeroShot study={c} sizes="500px" />
          </m.div>
        </div>
      </div>
    </section>
  );
}

function HeroShot({ study, sizes, eager }: { study: CaseStudy; sizes: string; eager?: boolean }) {
  return (
    <Link
      to={`/work/${study.slug}`}
      className="group block"
      aria-label={`${study.title} case study`}
    >
      <div className="frame transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5">
        <Img shot={study.cover} sizes={sizes} eager={eager} decorative />
      </div>
    </Link>
  );
}

/* ------------------------------------------------------- Section header */

function SectionHead({
  id,
  eyebrow,
  title,
  aside,
}: {
  id: string;
  eyebrow: string;
  title: string;
  aside?: string;
}) {
  return (
    <Reveal className="mb-12 grid gap-6 md:mb-16 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className="t-eyebrow mb-4">{eyebrow}</p>
        <h2 id={`${id}-title`} className="t-h2">
          {title}
        </h2>
      </div>
      {aside ? <p className="max-w-[46ch] text-muted lg:col-span-5 lg:justify-self-end">{aside}</p> : null}
    </Reveal>
  );
}

/* -------------------------------------------------------- Selected work */

function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-y scroll-mt-0">
      <div className="container-x">
        <SectionHead
          id="work"
          eyebrow="Selected work"
          title="Case studies"
          aside="Four products across career tech, payments, nonprofit finance and financial reporting: the problem, my role, the key design decisions and the real screens."
        />
        <ol className="grid gap-x-8 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {caseStudies.map((c, i) => (
            <li key={c.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <WorkCard study={c} index={i} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WorkCard({ study, index }: { study: CaseStudy; index: number }) {
  const reduce = useReducedMotion();
  const tall = study.cover.height / study.cover.width > 0.9;
  return (
    <Link to={`/work/${study.slug}`} className="group block rounded-xl" aria-labelledby={`card-${study.slug}`}>
      <m.div
        className="relative aspect-[4/3.4] overflow-hidden rounded-xl"
        style={{ backgroundColor: study.stage }}
        initial={reduce ? false : { clipPath: "inset(14% 6% 0% 6% round 12px)", opacity: 0.4 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 12px)", opacity: 1 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 1, ease: easeOut }}
      >
        <div
          className={`frame absolute left-[9%] top-[11%] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:-translate-y-2 group-hover:scale-[1.015] ${
            tall ? "w-[78%]" : "w-[112%]"
          }`}
        >
          <Img shot={study.cover} sizes="(min-width: 768px) 46vw, 100vw" decorative />
        </div>
      </m.div>

      <div className="mt-6 grid grid-cols-[auto_1fr] gap-x-5">
        <span className="pt-1 text-sm font-medium tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <p className="text-sm text-muted">
            {study.category} · {study.platform}
          </p>
          <h3 id={`card-${study.slug}`} className="t-h3 mt-1.5">
            {study.title}
          </h3>
          <p className="mt-2 max-w-[52ch]">{study.tagline}</p>
          <p className="mt-4 inline-flex items-center gap-2 font-semibold text-ink transition-colors group-hover:text-accent">
            Read case study
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </p>
        </div>
      </div>
    </Link>
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

/* ---------------------------------------------------------------- About */

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line section-y">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="t-eyebrow mb-4">About</p>
          <h2 id="about-title" className="t-h2 max-w-[13ch]">
            Clarity for products with real complexity
          </h2>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal className="space-y-5">
            {site.about.paragraphs.map((p) => (
              <p key={p} className="t-lead">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="container-x mt-16 md:mt-24">
        <h3 className="t-eyebrow mb-6">Design philosophy</h3>
        <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
          {site.about.principles.map((p, i) => (
            <li key={p.title} className="border-t border-ink pt-5">
              <Reveal delay={i * 0.08}>
                <p className="text-sm tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</p>
                <h4 className="mt-3 text-xl">{p.title}</h4>
                <p className="mt-3 text-muted">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Expertise */

function Expertise() {
  const { capabilities, domains, tools, ai } = site.expertise;
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="border-t border-line section-y">
      <div className="container-x">
        <SectionHead id="expertise" eyebrow="Expertise" title="What I bring to a team" />
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {capabilities.map((c, i) => (
            <li key={c.title}>
              <Reveal delay={i * 0.06}>
                <h3 className="text-lg">{c.title}</h3>
                <ul className="mt-4 space-y-2 text-muted">
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <h3 className="t-eyebrow">Domains</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink">{domains.join(" · ")}</p>
          </div>
          <div className="md:col-span-3">
            <h3 className="t-eyebrow">Design tools</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink">{tools.join(" · ")}</p>
          </div>
          <div className="md:col-span-3">
            <h3 className="t-eyebrow">AI-assisted workflow</h3>
            <p className="mt-4 text-lg leading-relaxed text-ink">{ai.join(" · ")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Experience */

function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-line section-y">
      <div className="container-x">
        <SectionHead
          id="experience"
          eyebrow="Experience"
          title={`${site.yearsExperience} years of design`}
          aside="From graphic and brand design to leading the design function and end-to-end UX for B2B products."
        />
        <ol className="border-t border-line">
          {site.experience.map((e) => (
            <li key={e.period} className="border-b border-line">
              <Reveal className="grid gap-3 py-9 md:grid-cols-12 md:gap-8">
                <p className="text-sm tabular-nums text-muted md:col-span-3 md:pt-1.5">{e.period}</p>
                <div className="md:col-span-4">
                  <h3 className="text-xl">{e.role}</h3>
                  <p className="mt-1 text-muted">{e.org}</p>
                </div>
                <ul className="space-y-2.5 md:col-span-5">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 md:grid-cols-12 md:gap-8">
          <h3 className="t-eyebrow md:col-span-3 md:pt-1">Education</h3>
          <ul className="grid gap-6 sm:grid-cols-2 md:col-span-9">
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
