import { useState } from "react";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock3,
  Sparkles,
  TrendingUp,
  User,
  Users,
  Wrench,
} from "lucide-react";
import {
  FEATURED_CASE_STUDY_IDS,
  getCaseStudyContent,
  type CaseStudyMetricIcon,
} from "../../data/projectCatalog";

interface CaseStudyPageProps {
  onNavigate: (page: string, caseStudySlug?: string) => void;
  caseStudySlug?: string;
}

function MetricIcon({ icon }: { icon: CaseStudyMetricIcon }) {
  switch (icon) {
    case "trending-up":
      return <TrendingUp className="h-8 w-8" />;
    case "users":
      return <Users className="h-8 w-8" />;
    case "check-circle":
      return <CheckCircle className="h-8 w-8" />;
    case "clock":
      return <Clock3 className="h-8 w-8" />;
    default:
      return <TrendingUp className="h-8 w-8" />;
  }
}

export function CaseStudyPage({ onNavigate, caseStudySlug }: CaseStudyPageProps) {
  const c = getCaseStudyContent(caseStudySlug);
  const [mobileJumpNavKey, setMobileJumpNavKey] = useState(0);

  const navigationItems = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "solution", label: "Solution" },
    { id: "process", label: "Process" },
    { id: "final-ui", label: "Final UI" },
    { id: "impact-results", label: "Results & Impact" },
    { id: "learnings", label: "Key Learnings" },
  ];

  const relatedStudies = FEATURED_CASE_STUDY_IDS.filter((id) => id !== c.id).map((id) => ({
    id,
    title: getCaseStudyContent(id).title,
  }));

  const sectionWrap = "max-w-[1180px] mx-auto px-6 md:px-12 lg:px-16";

  return (
    <div className="pt-36 md:pt-40 lg:pt-44">
      <section className="page-section relative overflow-hidden bg-gradient-to-br from-[#f8fafb] via-white to-[#f5f7fa] pb-9 md:pb-12">
        <div className="pointer-events-none absolute top-0 right-0 h-[336px] w-[336px] rounded-full bg-gradient-to-bl from-[#1a73e8]/6 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[256px] w-[256px] rounded-full bg-gradient-to-tr from-[#ff6f3c]/6 to-transparent blur-3xl" />

        <div className={`${sectionWrap} relative`}>
          <div className="mb-6 md:mb-8">
            <Button
              variant="ghost"
              onClick={() => onNavigate("case-studies")}
              className="-ml-2 h-10 rounded-full px-3 text-[#1a73e8] hover:bg-[#1a73e8]/5 hover:text-[#1557b0]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to case studies
            </Button>
          </div>

          <header className="mb-8 max-w-2xl md:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white/90 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-[#1a73e8]" aria-hidden />
              <span className="text-sm text-[#717182]">Case study</span>
            </div>

            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-[#1e1e1e] leading-[1.1] md:text-5xl lg:text-[3.25rem]">
              {c.title}
            </h1>

            <p className="text-base leading-relaxed text-[#5c5c66] md:text-lg">{c.heroTagline}</p>
          </header>

          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <img src={c.heroImageUrl} alt={c.heroImageAlt} className="h-[min(56vh,480px)] w-full object-cover" />
          </div>

          {relatedStudies.length > 0 ? (
            <div className="mt-8 rounded-2xl border border-[#e8eaec] bg-white/80 p-4 shadow-sm backdrop-blur-sm md:p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#717182]">
                Related case studies
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch">
                {relatedStudies.map(({ id, title }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onNavigate("case-study", id)}
                    className="group flex min-h-[44px] flex-1 items-center justify-between gap-3 rounded-xl border border-[#e5e5e5] bg-[#fafbfc] px-4 py-3 text-left text-sm font-medium text-[#1e1e1e] transition-colors hover:border-[#1a73e8]/35 hover:bg-[#1a73e8]/6 sm:min-w-[200px] sm:flex-none"
                  >
                    <span className="line-clamp-2">{title}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-[#1a73e8] opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-y border-[#EDEDED] bg-[#fafbfc] py-14 md:py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="mb-8 max-w-2xl">
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#717182]">At a glance</p>
            <h2 className="text-3xl font-semibold tracking-tight text-[#1E1E1E] md:text-4xl">
              Scope, intent, and outcome
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#5c5c66] md:text-base">
              Four anchors for how this work maps to business asks, UX goals, and measurable results.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {(
              [
                { k: "Business goal", v: c.quickSummary.businessGoal },
                { k: "UX objective", v: c.quickSummary.uxObjective },
                { k: "Design outcome", v: c.quickSummary.designOutcome },
                { k: "Impact", v: c.quickSummary.impact },
              ] as const
            ).map(({ k, v }) => (
              <div
                key={k}
                className="rounded-2xl border border-[#e8eaec] bg-white p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#717182]">{k}</p>
                <p className="text-base leading-snug text-[#1E1E1E] md:text-lg">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-white pb-20">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="mb-8 lg:hidden">
            <label htmlFor="case-study-section-jump" className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[#717182]">
              Jump to section
            </label>
            <select
              key={mobileJumpNavKey}
              id="case-study-section-jump"
              defaultValue=""
              onChange={(e) => {
                const id = e.target.value;
                if (!id) return;
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                setMobileJumpNavKey((k) => k + 1);
              }}
              className="h-12 w-full rounded-xl border border-[#e5e5e5] bg-[#fafbfc] px-4 text-sm text-[#1e1e1e] shadow-sm outline-none ring-[#1a73e8]/20 focus:ring-2"
            >
              <option value="">Choose a section…</option>
              {navigationItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[250px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-5">
                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#717182]">On this page</p>
                <nav className="space-y-1.5">
                  {navigationItems.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-[#4B4C5A] transition-colors hover:bg-[#1A73E8]/8 hover:text-[#1A73E8]"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-6 border-t border-[#E5E5E5] pt-5">
                  <p className="mb-3 text-xs uppercase tracking-[0.14em] text-[#717182]">At a glance</p>
                  <div className="space-y-2.5 text-sm text-[#4B4C5A]">
                    <p className="flex items-center gap-2">
                      <User className="h-4 w-4 shrink-0 text-[#1A73E8]" />
                      {c.sidebar.role}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 shrink-0 text-[#1A73E8]" />
                      {c.sidebar.timelineLabel}
                    </p>
                    <p className="flex items-start gap-2">
                      <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-[#1A73E8]" />
                      {c.sidebar.toolsLabel}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="space-y-8">
              <section
                id="overview"
                className="rounded-3xl border border-[#E5E5E5] bg-gradient-to-br from-white to-[#F8FAFB] p-7 md:p-9"
              >
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#717182]">Overview</p>
                <h2 className="mb-4 text-3xl text-[#1E1E1E]">{c.overview.heading}</h2>
                <p className="leading-relaxed text-[#4B4C5A]">{c.overview.body}</p>
              </section>

              <section id="problem" className="rounded-3xl border border-[#E5E5E5] bg-white p-7 md:p-9">
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#717182]">Problem</p>
                <h2 className="mb-4 text-3xl text-[#1E1E1E]">{c.problemStatement.heading}</h2>
                <p className="mb-8 leading-relaxed text-[#4B4C5A]">{c.problemStatement.body}</p>

                <div className="mb-8 rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#717182]">
                    Business context
                  </p>
                  <h3 className="mb-3 text-xl text-[#1E1E1E]">{c.businessGoal.heading}</h3>
                  <p className="leading-relaxed text-[#4B4C5A]">{c.businessGoal.body}</p>
                </div>

                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#717182]">User pain points</p>
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {c.userPainPoints.map((point) => (
                    <div key={point.title} className="rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-5">
                      <h3 className="mb-2 text-lg text-[#1E1E1E]">{point.title}</h3>
                      <p className="text-sm leading-relaxed text-[#4B4C5A]">{point.detail}</p>
                    </div>
                  ))}
                </div>

                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#717182]">Research & insights</p>
                <div className="space-y-4">
                  {c.researchInsights.map((insight) => (
                    <div key={insight.title} className="rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-5">
                      <h3 className="mb-2 text-lg text-[#1E1E1E]">{insight.title}</h3>
                      <p className="mb-3 text-[#4B4C5A]">{insight.detail}</p>
                      <p className="text-sm text-[#1A73E8]">
                        <span className="text-[#717182]">Design implication:</span> {insight.implication}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="solution" className="rounded-3xl border border-[#E5E5E5] bg-white p-7 md:p-9">
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#717182]">Solution</p>
                <h2 className="mb-6 text-3xl text-[#1E1E1E]">What we shipped</h2>
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                  {c.finalSolutionBlocks.map((block) => (
                    <div
                      key={block.title}
                      className="rounded-2xl border border-[#E5E5E5] bg-gradient-to-br from-white to-[#F8FAFB] p-5"
                    >
                      <h3 className="mb-2 text-xl text-[#1E1E1E]">{block.title}</h3>
                      <p className="leading-relaxed text-[#4B4C5A]">{block.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="mb-4 text-xs uppercase tracking-[0.16em] text-[#717182]">Key decisions</p>
                <div className="space-y-4">
                  {c.designDecisions.map((decision) => (
                    <div key={decision.title} className="rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-5">
                      <h3 className="mb-2 text-lg text-[#1E1E1E]">{decision.title}</h3>
                      <p className="mb-2 text-[#4B4C5A]">
                        <span className="text-[#717182]">Rationale:</span> {decision.rationale}
                      </p>
                      {decision.challenge ? (
                        <p className="text-sm text-[#4B4C5A]">
                          <span className="text-[#717182]">Trade-off:</span> {decision.challenge}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>

              <section id="process" className="rounded-3xl border border-[#E5E5E5] bg-white p-7 md:p-9">
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#717182]">Process</p>
                <h2 className="mb-6 text-3xl text-[#1E1E1E]">Problem → research → prototype → impact</h2>
                <div className="space-y-4">
                  {c.processPhases.map((phase, index) => (
                    <div key={`${phase.phase}-${index}`} className="rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-5">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-[140px_1fr_1fr]">
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[#717182]">
                            Step {index + 1}
                          </p>
                          <h3 className="text-xl text-[#1E1E1E]">{phase.phase}</h3>
                        </div>
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[#717182]">Activities</p>
                          <p className="text-sm text-[#4B4C5A]">{phase.activities}</p>
                        </div>
                        <div>
                          <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[#717182]">Outcome</p>
                          <p className="text-sm text-[#4B4C5A]">{phase.outcome}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl border border-dashed border-[#D0D0D0] bg-[#FAFBFC] p-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#717182]">Wireframes & exploration</p>
                  <p className="text-sm leading-relaxed text-[#4B4C5A]">
                    Explored {c.explorationConceptCount} layout directions across user flows and IA—testing hierarchy,
                    task paths, and role-specific entry points before high-fidelity UI. Validated through moderated
                    usability sessions with target users.
                  </p>
                </div>
              </section>

              <section
                id="final-ui"
                className="rounded-3xl border border-[#E5E5E5] bg-gradient-to-br from-white to-[#F8FAFB] p-7 md:p-9"
              >
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#717182]">Final UI</p>
                <h2 className="mb-6 text-3xl text-[#1E1E1E]">Design system & key screens</h2>
                <div className="mb-8 overflow-hidden rounded-2xl border border-[#E5E5E5] shadow-lg">
                  <img src={c.heroImageUrl} alt={c.heroImageAlt} className="h-[min(40vh,360px)] w-full object-cover" />
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {c.uiDesignSystem.map((block) => (
                    <div key={block.title} className="rounded-2xl border border-[#E5E5E5] bg-white p-5">
                      <p className="mb-2 text-sm font-medium text-[#1A73E8]">{block.title}</p>
                      <p className="text-[#4B4C5A]">{block.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section
                id="impact-results"
                className="rounded-3xl border border-[#E5E5E5] bg-gradient-to-br from-white to-[#F8FAFB] p-7 md:p-9"
              >
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#717182]">Results & business impact</p>
                <h2 className="mb-6 text-3xl text-[#1E1E1E]">Measurable outcomes</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {c.metrics.map((metric, index) => (
                    <div key={`${metric.label}-${index}`} className="rounded-2xl border border-[#E5E5E5] bg-white p-5 text-center">
                      <div className="mb-3 flex justify-center text-[#1A73E8]">
                        <MetricIcon icon={metric.icon} />
                      </div>
                      <p className="mb-1 text-3xl text-[#1E1E1E]">{metric.value}</p>
                      <p className="text-sm text-[#717182]">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="learnings" className="rounded-3xl border border-[#E5E5E5] bg-white p-7 md:p-9">
                <p className="mb-2 text-xs uppercase tracking-[0.16em] text-[#717182]">Key learnings</p>
                <h2 className="mb-6 text-3xl text-[#1E1E1E]">What I&apos;d carry forward</h2>
                <ul className="space-y-4">
                  {c.learnings.map((learning) => (
                    <li key={learning} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1A73E8]/10">
                        <CheckCircle className="h-4 w-4 text-[#1A73E8]" />
                      </div>
                      <p className="leading-relaxed text-[#4B4C5A]">{learning}</p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-gradient-to-b from-white to-[#f5f7fa] pb-24 pt-4">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1A73E8] to-[#124d99] p-10 text-center shadow-[0_24px_48px_-12px_rgba(26,115,232,0.35)] md:rounded-[36px] md:p-14 lg:p-16">
            <div className="pointer-events-none absolute top-0 right-0 h-[min(100%,420px)] w-[min(100%,420px)] -translate-y-1/3 translate-x-1/4 rounded-full bg-white/[0.07] blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-[min(80%,320px)] w-[min(80%,320px)] translate-y-1/3 -translate-x-1/4 rounded-full bg-[#ff6f3c]/10 blur-3xl" />

            <div className="relative z-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/75">Case studies</p>
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
                Keep exploring the narrative
              </h2>
              <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/88 md:text-lg">
                Compare framing, research, and outcomes across projects—or start a conversation if this problem space
                matches something on your roadmap.
              </p>
              <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Button
                  type="button"
                  onClick={() => onNavigate("case-studies")}
                  size="lg"
                  className="group rounded-full bg-white px-8 text-[#1A73E8] shadow-lg hover:bg-[#f5f8ff]"
                >
                  All case studies
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  type="button"
                  onClick={() => onNavigate("contact")}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-white/90 bg-transparent text-white hover:bg-white/10"
                >
                  Get in touch
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
