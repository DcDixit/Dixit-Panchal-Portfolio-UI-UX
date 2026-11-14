import { Button } from "../ui/button";
import { cn } from "../ui/utils";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PROJECTS_PAGE_SECTION_IDS, type ProjectListing } from "../../data/projectCatalog";
import { caseStudiesFromPortfolio, showcaseFromPortfolio } from "../../data/portfolioProjectsBridge";
import { usePortfolio } from "../../contexts/PortfolioContext";
import { VisualShowcaseProject } from "../VisualShowcaseProject";

const SHOWCASE_TABS = ["All", "Branding", "SaaS & dashboards", "Mobile", "Web"] as const;
type ShowcaseTab = (typeof SHOWCASE_TABS)[number];

interface ProjectsPageProps {
  onNavigate: (page: string, caseStudySlug?: string) => void;
  /** When opening `#case-studies`, scroll to the narrative section */
  initialScrollSectionId?: string;
  /** `#case-studies` is case-study-first only—omit visual showcase grids */
  variant?: "full" | "case-studies";
}

function showcaseMatchesTab(project: ProjectListing, tab: ShowcaseTab): boolean {
  if (tab === "All") return true;
  const k = project.showcaseKind;
  if (tab === "Branding") return k === "branding";
  if (tab === "SaaS & dashboards") return k === "saas" || k === "dashboard";
  if (tab === "Mobile") return k === "mobile";
  if (tab === "Web") return k === "web";
  return true;
}

export function ProjectsPage({
  onNavigate,
  initialScrollSectionId,
  variant = "full",
}: ProjectsPageProps) {
  const showShowcase = variant === "full";
  const [showcaseTab, setShowcaseTab] = useState<ShowcaseTab>("All");
  const { data } = usePortfolio();

  const caseStudies = useMemo(() => caseStudiesFromPortfolio(data.projects), [data.projects]);
  const showcaseProjects = useMemo(() => showcaseFromPortfolio(data.projects), [data.projects]);

  const filteredShowcase = useMemo(
    () => showcaseProjects.filter((p) => showcaseMatchesTab(p, showcaseTab)),
    [showcaseProjects, showcaseTab],
  );

  useEffect(() => {
    const targetId = initialScrollSectionId;
    if (!targetId) return;
    requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [initialScrollSectionId]);

  const sectionWrap = "max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16";

  return (
    <div className="pt-36 md:pt-40 lg:pt-44">
      <section className="page-section relative overflow-hidden bg-gradient-to-br from-[#f8fafb] via-white to-[#f5f7fa] pb-9 md:pb-12">
        <div className="pointer-events-none absolute top-0 right-0 h-[336px] w-[336px] rounded-full bg-gradient-to-bl from-[#1a73e8]/6 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[256px] w-[256px] rounded-full bg-gradient-to-tr from-[#ff6f3c]/6 to-transparent blur-3xl" />

        <div className={`${sectionWrap} relative`}>
          <header className="mb-8 max-w-2xl md:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#1a73e8]" aria-hidden />
              <span className="text-sm text-[#717182]">{showShowcase ? "Projects" : "Case studies"}</span>
            </div>

            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[#1e1e1e] leading-[1.1] md:text-5xl lg:text-[3.25rem]">
              {showShowcase ? (
                <>Product design portfolio</>
              ) : (
                <>Case studies</>
              )}
            </h1>

            <p className="text-base leading-relaxed text-[#5c5c66] md:text-lg">
              {showShowcase ? (
                <>
                  Flagship case studies with full UX narrative—problem, research, process, and business impact—plus
                  visual showcases for additional product and UI work.
                </>
              ) : (
                <>
                  Research-led narratives structured for recruiters: overview, problem, solution, process, final UI,
                  results, and key learnings.
                </>
              )}
            </p>
          </header>

          <div className="flex flex-wrap gap-3">
            {showShowcase ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-full border-[#e5e5e5] px-5 text-[#5c5c66] hover:border-[#1a73e8]/35 hover:bg-[#1a73e8]/5 hover:text-[#1a73e8]"
                  onClick={() =>
                    document.getElementById(PROJECTS_PAGE_SECTION_IDS.caseStudies)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                >
                  Jump to case studies
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-full border-[#e5e5e5] px-5 text-[#5c5c66] hover:border-[#1a73e8]/35 hover:bg-[#1a73e8]/5 hover:text-[#1a73e8]"
                  onClick={() =>
                    document.getElementById(PROJECTS_PAGE_SECTION_IDS.showcase)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                >
                  Jump to showcase grids
                </Button>
              </>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-full border-[#e5e5e5] px-5 text-[#5c5c66] hover:border-[#1a73e8]/35 hover:bg-[#1a73e8]/5 hover:text-[#1a73e8]"
                onClick={() => onNavigate("projects")}
              >
                Visual project grids
                <ArrowRight className="ml-2 h-4 w-4 opacity-80" />
              </Button>
            )}
          </div>
        </div>
      </section>

      <section
        id={PROJECTS_PAGE_SECTION_IDS.caseStudies}
        className="scroll-mt-28 border-y border-[#efefef] bg-white py-16 md:py-24"
      >
        <div className={sectionWrap}>
          <div className="mb-10 md:mb-12">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#717182]">Case studies</p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#1e1e1e] md:text-3xl">
              Problem → process → impact
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#5c5c66] md:text-[15px]">
              {showShowcase ? (
                <>
                  Three flagship product narratives. Each follows the same structure: business problem, user research,
                  solution, and measurable outcomes.
                </>
              ) : (
                <>Full UX narratives with outcomes you can verify in conversation.</>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-8">
            {caseStudies.map((project) => (
              <article
                key={project.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-[#ebebeb] bg-[#fafbfc] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition hover:border-[#1a73e8]/22 hover:shadow-[0_12px_36px_rgba(26,115,232,0.07)]"
              >
                <div className="relative isolate aspect-[16/11] overflow-hidden bg-[#f0f2f4]">
                  <img
                    src={project.imageUrl}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#1e1e1e] shadow-sm backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-[#1e1e1e] md:text-xl">{project.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#5c5c66]">{project.summary}</p>
                  <p className="mt-4 text-xs font-semibold text-[#1a73e8]">{project.impact}</p>

                  <div className="mt-6 flex flex-wrap gap-x-2 gap-y-1 border-t border-[#ececec] pt-5 text-[11px] text-[#717182]">
                    <span>{project.timeline}</span>
                    <span aria-hidden className="text-[#d0d0d0]">
                      ·
                    </span>
                    <span>{project.role}</span>
                  </div>

                  <Button
                    type="button"
                    className="mt-6 h-10 w-full rounded-full bg-[#1a73e8] text-sm font-medium text-white hover:bg-[#1557b0] md:w-auto md:self-start md:px-6"
                    onClick={() => onNavigate("case-study", project.caseStudySlug ?? project.id)}
                  >
                    Read case study
                    <ArrowRight className="ml-2 h-4 w-4 opacity-90" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {showShowcase ? (
        <section
          id={PROJECTS_PAGE_SECTION_IDS.showcase}
          className="scroll-mt-28 bg-gradient-to-b from-[#fafbfc] to-white py-16 md:py-24"
        >
          <div className={sectionWrap}>
            <div className="mb-8 md:mb-12">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#717182]">
                Projects showcase
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#1e1e1e] md:text-3xl">
                Screens, systems &amp; brand artifacts
              </h2>
              <div className="mt-3 flex flex-col gap-4 md:gap-5">
                <p className="max-w-xl text-sm leading-relaxed text-[#5c5c66] md:text-[15px]">
                  Dense visual grids—ideal for scanning SaaS depth, identity systems, and UI craft without reading long case
                  threads.
                </p>

                <div className="w-full min-w-0">
                  <div
                    role="tablist"
                    aria-label="Filter showcase by category"
                    className="flex justify-start"
                  >
                    <div
                      className={cn(
                        "flex max-w-full flex-nowrap items-stretch gap-0.5 overflow-x-auto rounded-full border border-[#e2e4e8] bg-[#eceef2] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)]",
                        "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
                      )}
                    >
                      {SHOWCASE_TABS.map((tab) => {
                        const selected = showcaseTab === tab;
                        return (
                          <button
                            key={tab}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setShowcaseTab(tab)}
                            className={cn(
                              "shrink-0 rounded-full px-3 py-2 text-center text-xs font-medium whitespace-nowrap transition-colors md:px-4 md:text-sm",
                              "outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#eceef2]",
                              selected
                                ? "bg-white text-[#1a73e8] shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.05]"
                                : "text-[#5c5c66] hover:bg-white/60 hover:text-[#1e1e1e]",
                            )}
                          >
                            {tab}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-14 md:space-y-16">
              {filteredShowcase.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[#dcdcdc] bg-white px-6 py-16 text-center text-sm text-[#717182]">
                  Nothing in this filter yet—try another category.
                </p>
              ) : (
                filteredShowcase.map((project) => <VisualShowcaseProject key={project.id} project={project} />)
              )}
            </div>
          </div>
        </section>
      ) : null}

      <section className="page-section bg-white pb-16 md:pb-24">
        <div className={sectionWrap}>
          <div className="rounded-2xl border border-[#e8e8e8] bg-[#fafbfc] px-6 py-8 text-center md:px-10 md:py-10">
            <Layers className="mx-auto mb-4 h-9 w-9 text-[#1a73e8]" aria-hidden />
            <p className="mx-auto mb-6 max-w-lg text-sm leading-relaxed text-[#5c5c66] md:text-base">
              Want more context on a specific domain or role? I&apos;m happy to walk through additional work on a call.
            </p>
            <Button
              type="button"
              onClick={() => onNavigate("contact")}
              size="lg"
              className="rounded-full bg-[#1a73e8] px-8 text-white shadow-md hover:bg-[#1557b0]"
            >
              Start a conversation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="page-section bg-gradient-to-br from-[#f8fafb] to-white pb-20 md:pb-28">
        <div className={sectionWrap}>
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1a73e8] to-[#1557b0] px-8 py-12 text-center md:px-14 md:py-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-white/[0.05]" />

            <div className="relative z-10">
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Hiring a senior product designer?
              </h2>
              <p className="mx-auto mb-9 max-w-xl text-base leading-relaxed text-white/88 md:text-lg">
                Research-led UX, design systems, and cross-functional delivery—remote US/UK/EU with timezone overlap.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  size="lg"
                  className="rounded-full bg-white font-medium text-[#1a73e8] shadow-lg hover:bg-[#f5f5f5]"
                >
                  Get in touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  onClick={() => onNavigate("about")}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-white/90 bg-transparent font-medium text-white hover:bg-white/10"
                >
                  About me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
