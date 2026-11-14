import { Button } from "./ui/button";
import { Menu, X, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { siteConfig } from "../config/siteConfig";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, caseStudySlug?: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: "Home", value: "home" },
    { label: "About", value: "about" },
    { label: "Skills", value: "skills" },
    { label: "Projects", value: "projects" },
    { label: "Case Studies", value: "case-studies" },
    { label: "Contact", value: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      <div
        className={`bg-[#1E1E1E] text-white transition-[padding] duration-300 ${
          isScrolled ? "py-1.5" : "py-2"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 xl:px-20 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs">
          <span className="text-white font-medium">{siteConfig.availability}</span>
          <span className="text-white/85 tabular-nums">
            {siteConfig.location} · {siteConfig.timezone}
          </span>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 xl:px-20">
        <div
          className={`grid grid-cols-[1fr_auto] items-center gap-4 transition-[min-height,padding] duration-300 lg:grid-cols-[auto_1fr_auto] lg:gap-8 xl:gap-10 ${
            isScrolled ? "min-h-[4rem] py-2.5 lg:min-h-[4.25rem]" : "min-h-[4.75rem] py-3 lg:min-h-20 lg:py-4"
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="text-left rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] lg:col-start-1"
            aria-label={`${siteConfig.name}, home`}
          >
            <div className="font-bold text-lg md:text-xl text-[#1E1E1E]">
              {siteConfig.name}
            </div>
            {!isScrolled && (
              <div className="text-xs text-[#52525b] -mt-0.5 whitespace-nowrap">{siteConfig.role}</div>
            )}
          </button>

          <nav
            className="hidden lg:flex items-center justify-center gap-5 xl:gap-8 lg:col-start-2"
            aria-label="Primary"
          >
            {navItems.map((item) => {
              const active = currentPage === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onNavigate(item.value)}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-md px-1 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] ${
                    active
                      ? "text-[#1A73E8] font-semibold"
                      : "text-[#1E1E1E] hover:text-[#1A73E8]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0 lg:col-start-3 lg:pl-4 xl:pl-6 lg:border-l lg:border-gray-100">
            {siteConfig.calendarUrl ? (
              <Button
                type="button"
                asChild
                variant="ghost"
                size={isScrolled ? "sm" : "default"}
                className="rounded-full text-[#1E1E1E] hover:bg-[#F0F7FF]"
              >
                <a
                  href={siteConfig.calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  <Calendar className="h-4 w-4 shrink-0" aria-hidden />
                  Schedule intro
                </a>
              </Button>
            ) : null}
            <Button
              type="button"
              onClick={() => onNavigate("case-study", "truckflow")}
              variant="outline"
              size={isScrolled ? "sm" : "default"}
              className="rounded-full px-4 lg:px-5 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white"
            >
              Flagship case
            </Button>
            <Button
              type="button"
              onClick={() => onNavigate("contact")}
              size={isScrolled ? "sm" : "default"}
              className="rounded-full px-5 lg:px-6 bg-[#1A73E8] hover:bg-[#1557B0] text-white shadow-sm"
            >
              Contact
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden rounded-md p-2 text-[#1E1E1E] hover:bg-[#F5F5F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8] col-start-2 row-start-1"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobile-nav"
            className="lg:hidden py-4 border-t border-gray-200"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile">
              {navItems.map((item) => {
                const active = currentPage === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => {
                      onNavigate(item.value);
                      setMobileMenuOpen(false);
                    }}
                    aria-current={active ? "page" : undefined}
                    className={`text-left py-3 px-2 rounded-lg transition-colors ${
                      active
                        ? "text-[#1A73E8] font-semibold bg-[#1A73E8]/5"
                        : "text-[#1E1E1E] hover:bg-[#F5F5F5]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="flex flex-col gap-2 pt-3">
                <Button
                  type="button"
                  onClick={() => {
                    onNavigate("case-study", "truckflow");
                    setMobileMenuOpen(false);
                  }}
                  variant="outline"
                  className="w-full rounded-full border-[#1A73E8] text-[#1A73E8]"
                >
                  View flagship case
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    onNavigate("contact");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full rounded-full bg-[#1A73E8] hover:bg-[#1557B0] text-white"
                >
                  Contact for roles
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
