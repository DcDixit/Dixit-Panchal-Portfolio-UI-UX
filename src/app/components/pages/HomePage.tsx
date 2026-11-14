import { Button } from "../ui/button";
import { CaseStudyCard } from "../CaseStudyCard";
import {
  ArrowRight,
  Briefcase,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  coreCompetencies,
  industryFocus,
  portfolioStats,
  recruiterHighlights,
  siteConfig,
  uxProcessSteps,
} from "../../config/siteConfig";

interface HomePageProps {
  onNavigate: (page: string, caseStudySlug?: string) => void;
}

const processCardClass =
  "group flex h-full min-h-[168px] flex-col rounded-2xl border border-[#E8EAED] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#1A73E8]/35 hover:shadow-[0_10px_32px_rgba(26,115,232,0.09)] md:min-h-[176px] md:p-7";

function ProcessStepCard({ index, step, description }: { index: number; step: string; description: string }) {
  return (
    <article className={processCardClass}>
      <p className="mb-4 text-2xl font-bold tabular-nums leading-none tracking-tight text-[#1A73E8] md:text-[1.75rem]">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mb-2 text-[15px] font-semibold leading-snug text-[#1E1E1E] md:text-base">{step}</h3>
      <p className="mt-auto text-[13px] leading-snug text-[#717182] md:text-sm">{description}</p>
    </article>
  );
}

function ProcessTimelineNode({ index, step, description }: { index: number; step: string; description: string }) {
  return (
    <div className="group relative flex h-full flex-col items-center">
      <div className="relative z-10 mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#E5E8EB] bg-white text-lg font-bold tabular-nums text-[#1A73E8] shadow-sm transition-all duration-300 group-hover:border-[#1A73E8] group-hover:bg-[#1A73E8] group-hover:text-white group-hover:shadow-md">
        {String(index + 1).padStart(2, "0")}
      </div>
      <article className={`${processCardClass} w-full flex-1`}>
        <h3 className="mb-2 text-[15px] font-semibold leading-snug text-[#1E1E1E]">{step}</h3>
        <p className="text-[13px] leading-snug text-[#717182]">{description}</p>
      </article>
    </div>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-32 md:pt-36 lg:pt-40">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F8FAFB] via-white to-[#F5F7FA]" />
        <div className="absolute top-20 right-0 h-96 w-96 rounded-full bg-[#1A73E8]/5 blur-3xl" />
        <div className="absolute bottom-20 left-0 h-96 w-96 rounded-full bg-[#FF6F3C]/5 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[1200px] px-6 pb-20 pt-4 md:px-20 md:pb-24 md:pt-6">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#E5E5E5] bg-white px-5 py-3 shadow-sm">
                <div className="relative">
                  <div className="h-3 w-3 rounded-full bg-[#1A73E8]" />
                  <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-[#1A73E8] opacity-75" />
                </div>
                <span className="text-sm text-[#1E1E1E]">{siteConfig.availability}</span>
              </div>

              <div className="space-y-4">
                <h1 className="leading-[1.1] text-[#1E1E1E]">
                  <span className="mb-2 block text-5xl font-bold md:text-6xl lg:text-7xl">{siteConfig.name}</span>
                  <span className="block bg-gradient-to-r from-[#1A73E8] to-[#FF6F3C] bg-clip-text text-2xl text-transparent md:text-3xl lg:text-4xl">
                    {siteConfig.role}
                  </span>
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-[#717182]">{siteConfig.recruiterPitch}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 shadow-sm">
                  <MapPin className="h-4 w-4 text-[#1A73E8]" />
                  <span className="text-sm text-[#717182]">{siteConfig.location}</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white px-4 py-2 shadow-sm">
                  <Briefcase className="h-4 w-4 text-[#FF6F3C]" />
                  <span className="text-sm text-[#717182]">{siteConfig.experience} in product design</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => onNavigate("contact")}
                    size="lg"
                    className="min-h-[48px] rounded-full bg-gradient-to-r from-[#1A73E8] to-[#1557B0] text-white shadow-lg shadow-[#1A73E8]/25 hover:from-[#1557B0] hover:to-[#1A73E8]"
                  >
                    <Mail className="mr-2 h-5 w-5 shrink-0" aria-hidden />
                    Contact for roles
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden />
                  </Button>
                  <Button
                    onClick={() => onNavigate("case-study", "truckflow")}
                    variant="outline"
                    size="lg"
                    className="min-h-[48px] rounded-full border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8]/5"
                  >
                    Read flagship case study
                  </Button>
                </div>
                <p className="max-w-xl text-sm leading-relaxed text-[#52525b]">
                  <span className="font-medium text-[#1E1E1E]">{siteConfig.responseSla}</span>
                  {" · "}
                  {siteConfig.hireFootprint}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 sm:gap-4">
                {[
                  { value: portfolioStats.yearsExperience, label: "Years experience" },
                  { value: portfolioStats.productsDelivered, label: "Products shipped" },
                  { value: portfolioStats.industries, label: "Industry domains" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[#E5E5E5] bg-gradient-to-br from-white to-[#F8FAFB] p-4 transition-all hover:border-[#1A73E8]/40 hover:shadow-lg sm:p-5"
                  >
                    <div className="mb-1 text-2xl text-[#1E1E1E] sm:text-3xl">{value}</div>
                    <p className="text-xs leading-relaxed text-[#717182]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block lg:h-[560px]">
              <div className="relative h-full overflow-hidden rounded-[32px] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1587355760421-b9de3226a046?auto=format&fit=crop&w=1080&q=80"
                  alt="UX research and product design process"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#1A73E8]/20 via-transparent to-[#FF6F3C]/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recruiter Quick Scan */}
      <section className="border-y border-[#EDEDED] bg-white py-16">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#717182]">Recruiter quick scan</p>
              <h2 className="mb-4 text-3xl text-[#1E1E1E]">Senior product design profile</h2>
              <p className="leading-relaxed text-[#717182]">
                Research-led UX, systems thinking, and measurable impact—before you dive into case studies.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-3">
              {recruiterHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] px-5 py-4 text-[#1E1E1E]"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="page-section relative overflow-hidden bg-gradient-to-b from-white to-[#FAFBFC]">
        <div className="relative mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="mb-16 max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E5E5E5] bg-white/80 px-5 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#1A73E8]" />
              <span className="text-sm text-[#717182]">What I bring</span>
            </div>
            <h2 className="section-heading mb-6 text-[#1E1E1E]">Product design capabilities</h2>
            <p className="section-subheading text-xl text-[#717182]">
              UX strategy, research, and systems—not just visual polish. Built for cross-functional product teams.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {coreCompetencies.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-[#E5E5E5] bg-white p-8 transition-all hover:border-[#1A73E8]/40 hover:shadow-xl"
              >
                <h3 className="mb-3 text-xl text-[#1E1E1E]">{item.title}</h3>
                <p className="mb-5 leading-relaxed text-[#717182]">{item.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-[#F0F7FF] px-3 py-1 text-xs font-medium text-[#1A73E8]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* UX Process — horizontal timeline */}
      <section className="page-section bg-white">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#717182]">How I work</p>
            <h2 className="section-heading mb-4 text-[#1E1E1E]">End-to-end UX process</h2>
            <p className="text-base leading-relaxed text-[#717182] md:text-lg">
              Seven steps. Same rigor on every case study.
            </p>
          </div>

          {/* Desktop — connected horizontal timeline */}
          <div className="group/timeline relative hidden xl:block">
            <div
              className="pointer-events-none absolute left-[7%] right-[7%] top-6 h-px bg-gradient-to-r from-transparent via-[#1A73E8]/25 to-transparent"
              aria-hidden
            />
            <div className="grid grid-cols-7 items-stretch gap-4">
              {uxProcessSteps.map((item, index) => (
                <ProcessTimelineNode
                  key={item.step}
                  index={index}
                  step={item.step}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          {/* Tablet — horizontal scroll */}
          <div className="hidden md:block xl:hidden">
            <div className="-mx-2 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 pb-2 [scrollbar-width:thin]">
              {uxProcessSteps.map((item, index) => (
                <div key={item.step} className="w-[min(100%,220px)] shrink-0 snap-start sm:w-[200px]">
                  <ProcessStepCard index={index} step={item.step} description={item.description} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — vertical timeline */}
          <div className="relative md:hidden">
            <div
              className="absolute bottom-4 left-[1.125rem] top-4 w-px bg-gradient-to-b from-[#1A73E8]/20 via-[#E5E8EB] to-transparent"
              aria-hidden
            />
            <ol className="space-y-4">
              {uxProcessSteps.map((item, index) => (
                <li key={item.step} className="relative pl-12">
                  <span className="absolute left-0 top-6 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#E5E8EB] bg-white text-sm font-bold tabular-nums text-[#1A73E8] shadow-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ProcessStepCard index={index} step={item.step} description={item.description} />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="relative bg-[#F8FAFB] py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full border border-[#E5E5E5] bg-white px-4 py-2 shadow-sm">
              <span className="text-sm text-[#717182]">Portfolio</span>
            </div>
            <h2 className="mb-4 text-4xl text-[#1E1E1E] lg:text-5xl">Selected case studies</h2>
            <p className="mx-auto max-w-2xl text-lg text-[#717182]">
              Problem → research → solution → impact. Three flagship narratives with measurable business outcomes.
            </p>
          </div>

          <div className="space-y-32">
            <CaseStudyCard
              title="TruckFlow Fleet Management"
              category="B2B SaaS · Mobile-first"
              description="Operations teams were losing hours to fragmented tools. I led discovery through launch—role-aware IA, exception-first dashboards, and validated field workflows."
              imageUrl="https://images.unsplash.com/photo-1717323454555-f053c31ff4b4?auto=format&fit=crop&w=1080&q=80"
              metrics={[
                { value: "40%", label: "Faster dispatch decisions" },
                { value: "95%", label: "User satisfaction" },
              ]}
              onViewCase={() => onNavigate("case-study", "truckflow")}
            />

            <div className="flex items-center justify-center">
              <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent" />
            </div>

            <CaseStudyCard
              title="FinanceHub Analytics Dashboard"
              category="FinTech · Web dashboard"
              description="Finance leads couldn't act on data buried in chart galleries. Restructured IA around weekly decisions—signal-first hierarchy with trustworthy drill-downs."
              imageUrl="https://images.unsplash.com/photo-1758240931165-60242e5ce08c?auto=format&fit=crop&w=1080&q=80"
              metrics={[
                { value: "27%", label: "Faster reporting cycles" },
                { value: "↑", label: "Executive adoption" },
              ]}
              isReversed
              onViewCase={() => onNavigate("case-study", "financehub")}
            />

            <div className="flex items-center justify-center">
              <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent" />
            </div>

            <CaseStudyCard
              title="E-commerce Platform Redesign"
              category="Commerce · Web & mobile"
              description="High cart abandonment traced to comparison fatigue and trust gaps at checkout. Redesigned browse-to-purchase with clearer IA and reassurance at decision points."
              imageUrl="https://images.unsplash.com/photo-1694599048261-a1de00f0117e?auto=format&fit=crop&w=1080&q=80"
              metrics={[
                { value: "18%", label: "Conversion lift" },
                { value: "↓", label: "Cart abandonment" },
              ]}
              onViewCase={() => onNavigate("case-study", "ecommerce-redesign")}
            />
          </div>

          <div className="mt-16 flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => onNavigate("case-studies")}
              variant="outline"
              size="lg"
              className="rounded-full border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white"
            >
              All case studies
            </Button>
            <Button
              onClick={() => onNavigate("projects")}
              variant="ghost"
              size="lg"
              className="rounded-full text-[#52525b] hover:text-[#1A73E8]"
            >
              Visual project grids
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Industry Focus — compact */}
      <section className="page-section bg-white">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.16em] text-[#717182]">Domain experience</p>
            <h2 className="mb-4 text-3xl text-[#1E1E1E] md:text-4xl">Industries I&apos;ve designed for</h2>
            <p className="text-[#717182]">
              B2B and B2C product work across regulated and high-stakes environments.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industryFocus.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-6 transition-all hover:border-[#1A73E8]/30 hover:shadow-md"
              >
                <h3 className="mb-1 text-lg text-[#1E1E1E]">{item.title}</h3>
                <p className="text-sm text-[#717182]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="page-section bg-gradient-to-br from-[#F8FAFB] to-white">
        <div className="mx-auto max-w-[1200px] px-6 md:px-20">
          <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#1A73E8] to-[#1557B0] p-12 text-center md:p-16">
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5" />
            <div className="relative z-10">
              <h2 className="mb-6 text-4xl text-white lg:text-5xl">Let&apos;s talk about your product</h2>
              <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/90">
                Open to senior product design roles—remote US/UK/EU with overlap. I&apos;d love to hear about the
                problems your team is solving.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  onClick={() => onNavigate("contact")}
                  size="lg"
                  className="rounded-full bg-white text-[#1A73E8] shadow-xl hover:bg-[#F5F5F5]"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Get in touch
                </Button>
                <Button
                  onClick={() => onNavigate("case-study", "truckflow")}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-white text-white hover:bg-white/10"
                >
                  Read TruckFlow case study
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
