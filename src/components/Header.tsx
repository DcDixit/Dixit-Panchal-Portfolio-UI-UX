import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { site } from "../content/site";
import { Close, Download, Menu } from "./Icons";

const NAV = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

/** Sections that highlight a nav item while in view (Expertise belongs to About). */
const SECTION_TO_NAV: Record<string, string> = {
  work: "work",
  "more-work": "work",
  "graphic-work": "work",
  about: "about",
  expertise: "about",
  experience: "experience",
  contact: "contact",
};

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const els = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(SECTION_TO_NAV[e.target.id] ?? null);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);
  return active;
}

export function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(isHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? "border-b border-line bg-paper" : "border-b border-transparent bg-paper/0"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link to="/" className="group flex items-baseline gap-2 rounded-sm" aria-label={`${site.name}, home`}>
          <span className="whitespace-nowrap text-[1.0625rem] font-semibold tracking-[-0.02em] text-ink">{site.name}</span>
          {/* Hidden at md, where the full nav needs the width; shown again from lg. */}
          <span className="hidden whitespace-nowrap text-sm text-muted sm:inline md:hidden lg:inline">{site.role}</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const current = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    to={{ pathname: "/", hash: `#${item.id}` }}
                    aria-current={current ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                      current ? "text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={`absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300 ${
                        current ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
            {site.contact.resumeUrl ? (
              <li className="ml-2">
                <a href={site.contact.resumeUrl} className="btn btn-primary min-h-10 px-4" download>
                  <Download width={16} height={16} />
                  Download CV
                </a>
              </li>
            ) : null}
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
        {site.contact.resumeUrl ? (
          <a href={site.contact.resumeUrl} download className="btn btn-primary min-h-10 px-3.5 text-sm" aria-label="Download CV (PDF)">
            <Download width={16} height={16} />
            CV
          </a>
        ) : null}
        <button
          type="button"
          className="-mr-2 grid h-11 w-11 place-items-center rounded-full text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close width={22} height={22} /> : <Menu width={22} height={22} />}
        </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t border-line bg-paper md:hidden"
      >
        <ul className="container-x flex flex-col py-3">
          {NAV.map((item) => (
            <li key={item.id}>
              <Link
                to={{ pathname: "/", hash: `#${item.id}` }}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-line text-lg font-medium text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
          {site.contact.resumeUrl ? (
            <li className="pt-4">
              <a href={site.contact.resumeUrl} className="btn btn-primary w-full" download>
                Download CV
              </a>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}
