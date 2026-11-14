import { TimelineItem } from "../TimelineItem";
import {
  Target,
  MapPin,
  Briefcase,
  Users,
  Lightbulb,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Search,
  Layers,
} from "lucide-react";
import { Button } from "../ui/button";
import { portfolioStats, siteConfig } from "../../config/siteConfig";

interface AboutPageProps {
  onNavigate?: (page: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const strengths = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Research-led UX",
      description: "Interviews, usability testing, and analytics to validate decisions before and after launch.",
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Design Systems",
      description: "Scalable tokens and components that keep product and engineering aligned at speed.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Product Thinking",
      description: "Connecting user needs to business KPIs—metrics defined early, impact measured post-ship.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Cross-functional Leadership",
      description: "Partnering with PM and engineering from discovery through handoff and iteration.",
    },
  ];

  const skills = [
    { icon: <CheckCircle className="h-5 w-5" />, text: "User research & usability testing" },
    { icon: <CheckCircle className="h-5 w-5" />, text: "Information architecture & user flows" },
    { icon: <CheckCircle className="h-5 w-5" />, text: "Wireframing & interactive prototyping" },
    { icon: <CheckCircle className="h-5 w-5" />, text: "Design systems & accessibility (WCAG)" },
    { icon: <CheckCircle className="h-5 w-5" />, text: "Workshop facilitation & stakeholder alignment" },
    { icon: <CheckCircle className="h-5 w-5" />, text: "Figma, FigJam, Miro, Maze" },
  ];

  return (
    <div className="pt-36 md:pt-40 lg:pt-44">
      <section className="page-section relative overflow-hidden bg-gradient-to-br from-[#f8fafb] via-white to-[#f5f7fa] pb-9 md:pb-12">
        <div className="pointer-events-none absolute top-0 right-0 h-[336px] w-[336px] rounded-full bg-gradient-to-bl from-[#1a73e8]/6 to-transparent blur-3xl" />
        <div className="relative mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <header className="mb-8 max-w-2xl md:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e8e8e8] bg-white/90 px-4 py-2 shadow-sm">
              <Sparkles className="h-4 w-4 text-[#1a73e8]" aria-hidden />
              <span className="text-sm text-[#717182]">About</span>
            </div>
            <h1 className="mb-4 text-4xl font-semibold leading-[1.1] tracking-tight text-[#1e1e1e] md:text-5xl lg:text-[3.25rem]">
              Product designer who ships outcomes
            </h1>
            <p className="text-base leading-relaxed text-[#5c5c66] md:text-lg">
              {siteConfig.experience} turning ambiguous product problems into clear, accessible experiences—with
              research, systems thinking, and measurable business impact.
            </p>
          </header>
          {onNavigate ? (
            <div className="flex flex-wrap gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-full border-[#e5e5e5] px-5 text-[#5c5c66] hover:border-[#1a73e8]/35 hover:bg-[#1a73e8]/5 hover:text-[#1a73e8]"
                onClick={() => onNavigate("case-studies")}
              >
                View case studies
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-full border-[#e5e5e5] px-5 text-[#5c5c66] hover:border-[#1a73e8]/35 hover:bg-[#1a73e8]/5 hover:text-[#1a73e8]"
                onClick={() => onNavigate("contact")}
              >
                Get in touch
              </Button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="page-section border-y border-[#efefef] bg-white py-16 md:py-20">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1640622308113-ca5d7b948515?auto=format&fit=crop&w=1080&q=80"
                alt="Product design workspace"
                className="h-[380px] w-full object-cover md:h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1A73E8]/15 via-transparent to-[#FF6F3C]/10" />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-3xl text-[#1E1E1E] lg:text-4xl">Problem solver, systems thinker, collaborator</h2>
                <p className="mb-6 text-lg leading-relaxed text-[#717182]">
                  I specialize in B2B and B2C products where clarity under pressure matters—logistics ops, finance
                  dashboards, healthcare flows, and commerce journeys. My work starts with understanding the business
                  constraint, not the screen.
                </p>
                <p className="text-lg leading-relaxed text-[#717182]">
                  I partner closely with product and engineering: defining success metrics in discovery, validating flows
                  in prototype, and supporting launch with specs teams can trace back to user evidence.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-5">
                  <MapPin className="mt-0.5 h-6 w-6 shrink-0 text-[#1A73E8]" />
                  <div>
                    <div className="mb-1 text-[#1E1E1E]">{siteConfig.location}</div>
                    <p className="text-sm text-[#717182]">{siteConfig.hireFootprint}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-2xl border border-[#E5E5E5] bg-[#FAFBFC] p-5">
                  <Briefcase className="mt-0.5 h-6 w-6 shrink-0 text-[#FF6F3C]" />
                  <div>
                    <div className="mb-1 text-[#1E1E1E]">{siteConfig.availability}</div>
                    <p className="text-sm text-[#717182]">{siteConfig.responseSla}</p>
                  </div>
                </div>
              </div>

              {onNavigate ? (
                <Button
                  onClick={() => onNavigate("contact")}
                  size="lg"
                  className="w-full rounded-full bg-gradient-to-r from-[#1A73E8] to-[#1557B0] text-white shadow-lg sm:w-auto"
                >
                  Start a conversation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 text-3xl text-[#1E1E1E] md:text-4xl">Core strengths</h2>
            <p className="text-lg text-[#717182]">What I bring to senior product design roles on cross-functional teams.</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {strengths.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[#E5E5E5] bg-[#FAFBFC] p-7 transition-all hover:border-[#1A73E8]/35 hover:shadow-lg"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1A73E8]/10 text-[#1A73E8]">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-lg text-[#1E1E1E]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#717182]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-[#FAFBFC]">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl text-[#1E1E1E] md:text-4xl">Skills & methods</h2>
              <p className="mb-8 text-lg leading-relaxed text-[#717182]">
                Full-stack product design—from discovery and IA through high-fidelity UI, prototyping, and usability
                validation.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {skills.map((skill) => (
                  <div
                    key={skill.text}
                    className="flex items-center gap-3 rounded-xl border border-[#E5E5E5] bg-white p-4"
                  >
                    <span className="text-[#1A73E8]">{skill.icon}</span>
                    <span className="text-sm text-[#1E1E1E]">{skill.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: portfolioStats.yearsExperience, label: "Years in product design" },
                { value: portfolioStats.productsDelivered, label: "Products delivered" },
                { value: portfolioStats.industries, label: "Industry domains" },
                { value: portfolioStats.clientRetention, label: "Client retention" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-[#E5E5E5] bg-white p-6 text-center"
                >
                  <div className="mb-1 text-3xl text-[#1E1E1E]">{value}</div>
                  <p className="text-xs text-[#717182]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-section bg-white">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="mb-12 max-w-2xl">
            <h2 className="mb-4 text-3xl text-[#1E1E1E] md:text-4xl">Professional journey</h2>
            <p className="text-lg text-[#717182]">
              From visual design foundations to leading end-to-end product UX on complex B2B platforms.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <TimelineItem
              year="2015 – 2018"
              title="Visual & Brand Designer"
              company="Agencies & freelance"
              description="Built foundations in typography, layout, and brand systems—learning to communicate clearly through visual hierarchy."
            />
            <TimelineItem
              year="2018 – 2021"
              title="Product Designer (UI/UX)"
              company="Tech product teams"
              description="Shifted to digital products: user research, wireframing, prototyping, and usability testing on web and mobile apps."
            />
            <TimelineItem
              year="2021 – Present"
              title="Senior Product Designer"
              company="SaaS, logistics & enterprise"
              description="Lead discovery-to-delivery on B2B platforms. Own IA, design systems, and cross-functional alignment. Mentor junior designers."
              isLast
            />
          </div>
        </div>
      </section>

      <section className="page-section bg-[#FAFBFC]">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl text-[#1E1E1E] md:text-4xl">Design principles</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: <Search className="h-8 w-8 text-[#1A73E8]" />,
                title: "Evidence over assumption",
                body: "Decisions backed by research, testing, and post-launch data—not personal preference or stakeholder loudest voice.",
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-[#FF6F3C]" />,
                title: "Clarity at every scale",
                body: "IA, content, and interaction patterns that reduce cognitive load—especially in high-stakes, multi-role products.",
              },
              {
                icon: <Target className="h-8 w-8 text-[#1A73E8]" />,
                title: "Outcomes, not outputs",
                body: "Beautiful UI matters when it moves KPIs. Success metrics are agreed upfront and revisited after ship.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-[#E5E5E5] bg-white p-8 text-center">
                <div className="mb-4 flex justify-center">{item.icon}</div>
                <h3 className="mb-3 text-xl text-[#1E1E1E]">{item.title}</h3>
                <p className="leading-relaxed text-[#717182]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section bg-white pb-24">
        <div className="mx-auto max-w-[1180px] px-6 md:px-12 lg:px-16">
          <div className="rounded-[32px] bg-gradient-to-br from-[#1A73E8] to-[#1557B0] p-12 text-center md:p-14">
            <h2 className="mb-4 text-3xl text-white md:text-4xl">Interested in working together?</h2>
            <p className="mx-auto mb-8 max-w-xl text-white/90">
              I&apos;m open to senior product design roles with teams that value research, systems, and measurable impact.
            </p>
            {onNavigate ? (
              <Button
                onClick={() => onNavigate("contact")}
                size="lg"
                className="rounded-full bg-white text-[#1A73E8] hover:bg-[#F5F5F5]"
              >
                Get in touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
