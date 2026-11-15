import { m } from "motion/react";
import { Link } from "react-router";
import { ArrowDown, Download } from "../../components/Icons";
import { Img } from "../../components/Img";
import { easeOut } from "../../components/Reveal";
import { Rich } from "../../components/Rich";
import { caseStudies } from "../../content/projects";
import { site } from "../../content/site";
import { useIntro } from "../../lib/intro";

export function Hero() {
  const animate = useIntro();
  const front = caseStudies.find((c) => c.slug === "gocardless-quickbooks")!;
  const back = caseStudies.find((c) => c.slug === "costallocation-pro")!;

  return (
    <section aria-labelledby="hero-title" className="pt-[calc(var(--header-h)+clamp(1.75rem,4vw,3.25rem))]">
      {/* Title and subtitle */}
      <m.div
        className="container-x"
        initial={animate ? { opacity: 0, y: 16 } : false}
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
        initial={animate ? { opacity: 0, y: 24 } : false}
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
