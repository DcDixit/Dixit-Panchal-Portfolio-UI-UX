import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "../../components/Icons";
import { Reveal } from "../../components/Reveal";
import { site } from "../../content/site";

export function Contact() {
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
