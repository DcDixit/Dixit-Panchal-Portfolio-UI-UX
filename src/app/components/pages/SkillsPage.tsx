import { SkillCard } from "../SkillCard";
import {
  Figma,
  Code,
  Users,
  Layers,
  Sparkles,
  ArrowRight,
  Target,
  Network,
} from "lucide-react";
import { Button } from "../ui/button";
import { industryFocus, portfolioStats, siteConfig } from "../../config/siteConfig";

interface SkillsPageProps {
  onNavigate?: (page: string) => void;
}

export function SkillsPage({ onNavigate }: SkillsPageProps) {
  const tools = [
    { name: "Figma", icon: <Figma className="h-5 w-5" /> },
    { name: "FigJam", icon: <Layers className="h-5 w-5" /> },
    { name: "Miro", icon: <Network className="h-5 w-5" /> },
    { name: "Maze", icon: <Target className="h-5 w-5" /> },
    { name: "Notion", icon: <Code className="h-5 w-5" /> },
    { name: "Hotjar / GA4", icon: <Target className="h-5 w-5" /> },
  ];

  return (
    <div className="pt-36 md:pt-40 lg:pt-44">
      <section className="page-section relative overflow-hidden bg-gradient-to-br from-[#f8fafb] via-white to-[#f5f7fa] pb-9 md:pb-12">
        <div className="relative mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <header className="mb-8 max-w-2xl md:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white/90 px-4 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#1a73e8]" aria-hidden />
              <span className="text-sm text-[#717182]">Capabilities</span>
            </div>
            <h1 className="mb-4 text-4xl font-semibold leading-[1.1] tracking-tight text-[#1e1e1e] md:text-5xl lg:text-[3.25rem]">
              Skills & expertise
            </h1>
            <p className="text-base leading-relaxed text-[#5c5c66] md:text-lg">
              {siteConfig.experience} of product design—research, IA, systems, and delivery for cross-functional teams.
            </p>
          </header>
          {onNavigate ? (
            <Button
              type="button"
              variant="outline"
              className="h-10 rounded-full border-[#e5e5e5] px-5"
              onClick={() => onNavigate("case-studies")}
            >
              See work in case studies
            </Button>
          ) : null}
        </div>
      </section>

      <section className="page-section bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: portfolioStats.yearsExperience, label: "Years experience" },
              { value: portfolioStats.productsDelivered, label: "Products delivered" },
              { value: portfolioStats.industries, label: "Industry domains" },
              { value: portfolioStats.clientRetention, label: "Client retention" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-[#e5e5e5] bg-[#fafbfc] p-6 text-center"
              >
                <div className="mb-1 text-2xl font-semibold text-[#1e1e1e] md:text-3xl">{value}</div>
                <p className="text-xs text-[#5c5c66] md:text-sm">{label}</p>
              </div>
            ))}
          </div>

          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 text-3xl text-[#1E1E1E] md:text-4xl">Core competencies</h2>
            <p className="text-lg text-[#717182]">
              UX and product craft first—visual design in service of clarity, accessibility, and business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <SkillCard
              title="UX Research & Strategy"
              icon={<Target className="h-6 w-6" />}
              skills={[
                "User interviews & contextual inquiry",
                "Usability testing (moderated & unmoderated)",
                "Journey mapping & service blueprints",
                "Competitive & heuristic analysis",
                "Hypothesis framing & success metrics",
                "Workshop facilitation",
              ]}
            />
            <SkillCard
              title="Product Design & IA"
              icon={<Figma className="h-6 w-6" />}
              skills={[
                "Information architecture",
                "User flows & task analysis",
                "Wireframing & low-fi exploration",
                "High-fidelity UI design",
                "Interactive prototyping",
                "A/B testing & iteration",
              ]}
            />
            <SkillCard
              title="Design Systems & Accessibility"
              icon={<Layers className="h-6 w-6" />}
              skills={[
                "Component libraries & design tokens",
                "Documentation & governance",
                "WCAG 2.1 accessibility patterns",
                "Responsive & mobile-first design",
                "Design-to-dev handoff specs",
                "Cross-platform consistency",
              ]}
            />
            <SkillCard
              title="Collaboration & Delivery"
              icon={<Users className="h-6 w-6" />}
              skills={[
                "PM & engineering partnership",
                "Agile / sprint rituals",
                "Stakeholder presentations",
                "Design critique & mentorship",
                "Analytics-informed iteration",
                "Launch support & post-ship review",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="page-section bg-[#FAFBFC]">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="mb-6 text-3xl text-[#1E1E1E] md:text-4xl">Tools</h2>
              <p className="mb-8 text-lg text-[#717182]">
                Industry-standard stack for research, design, prototyping, and collaboration.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 rounded-2xl border border-[#E5E5E5] bg-white p-4"
                  >
                    <span className="text-[#1A73E8]">{tool.icon}</span>
                    <span className="text-[#1E1E1E]">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-6 text-3xl text-[#1E1E1E] md:text-4xl">Domain experience</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {industryFocus.map((item) => (
                  <div key={item.title} className="rounded-xl border border-[#E5E5E5] bg-white p-4">
                    <h3 className="mb-1 font-medium text-[#1E1E1E]">{item.title}</h3>
                    <p className="text-sm text-[#717182]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-white pb-24">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="rounded-[32px] bg-gradient-to-br from-[#1A73E8] to-[#1557B0] p-12 text-center md:p-14">
            <h2 className="mb-4 text-3xl text-white md:text-4xl">Ready to discuss a role?</h2>
            <p className="mx-auto mb-8 max-w-xl text-white/90">
              Senior product design · remote US/UK/EU · research-led, outcomes-focused.
            </p>
            {onNavigate ? (
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  onClick={() => onNavigate("contact")}
                  size="lg"
                  className="rounded-full bg-white text-[#1A73E8] hover:bg-[#F5F5F5]"
                >
                  Get in touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  onClick={() => onNavigate("about")}
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-white text-white hover:bg-white/10"
                >
                  About me
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
