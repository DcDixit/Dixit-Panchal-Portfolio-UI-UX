/** Deep narrative pages — keep to a small set (typically 2–3). */
import {
  COSTALLOCATION_SHOWCASE_GALLERY,
  ENTERPRISE_DASHBOARDS_GALLERY,
  FINANCIAL_REPORTING_GALLERY,
  GOCARDLESS_SHOWCASE_GALLERY,
  UPTRA_SHOWCASE_GALLERY,
  WEB_PLATFORMS_GALLERY,
} from "./showcaseImages";

export const FEATURED_CASE_STUDY_IDS = ["truckflow", "financehub", "ecommerce-redesign"] as const;

export type FeaturedCaseStudyId = (typeof FEATURED_CASE_STUDY_IDS)[number];

export const PROJECTS_PAGE_SECTION_IDS = {
  caseStudies: "case-studies",
  showcase: "project-showcase",
} as const;

/** Used with sessionStorage so nav can land on a section after routing to Projects. */
export const PORTFOLIO_PROJECTS_SCROLL_KEY = "portfolio_projects_scroll_section";

export type ProjectPresentation = "case-study" | "showcase";

export type ShowcaseKind = "branding" | "saas" | "ecommerce" | "dashboard" | "mobile" | "web";

export interface ProjectListing {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  process: string;
  timeline: string;
  tools: string[];
  impact: string;
  category: string;
  imageUrl: string;
  featured: boolean;
  presentation: ProjectPresentation;
  /** Visual grouping for the showcase grid (case studies omit / ignore). */
  showcaseKind?: ShowcaseKind;
  /** Screens, identity tiles, flows — primary surface for showcase projects. */
  galleryImages?: string[];
  /** URL slug for narrative page `#case-study/<slug>`; usually inferred from CMS `caseStudyId` or project id. */
  caseStudySlug?: string;
}

export type CaseStudyMetricIcon = "trending-up" | "users" | "check-circle" | "clock";

export interface CaseStudyMetric {
  icon: CaseStudyMetricIcon;
  value: string;
  label: string;
}

export interface CaseStudyDecision {
  title: string;
  rationale: string;
  challenge?: string;
}

export interface CaseStudyContent {
  id: string;
  title: string;
  heroTagline: string;
  heroImageUrl: string;
  heroImageAlt: string;
  quickSummary: {
    businessGoal: string;
    uxObjective: string;
    designOutcome: string;
    impact: string;
  };
  sidebar: {
    role: string;
    timelineLabel: string;
    toolsLabel: string;
  };
  overview: { heading: string; body: string };
  problemStatement: { heading: string; body: string };
  businessGoal: { heading: string; body: string };
  userPainPoints: { title: string; detail: string }[];
  researchInsights: { title: string; detail: string; implication: string }[];
  processPhases: { phase: string; activities: string; outcome: string }[];
  explorationConceptCount: number;
  uiDesignSystem: { title: string; body: string }[];
  designDecisions: CaseStudyDecision[];
  finalSolutionBlocks: { title: string; detail: string }[];
  metrics: CaseStudyMetric[];
  learnings: string[];
}

export const DEFAULT_CASE_STUDY_ID = "truckflow";

export const PROJECT_LISTINGS: ProjectListing[] = [
  {
    id: "truckflow",
    title: "TruckFlow - Fleet Management App",
    summary:
      "Unified dispatch, driver communication, and trip visibility into one action-first workflow for logistics teams.",
    problem: "Operations teams were context-switching across disconnected tools and missing urgent delays.",
    solution: "Designed a mobile-first command center with role-aware dashboards and smart status alerts.",
    role: "Lead Product Designer",
    process: "Problem → Research → User Flow → Wireframes → UI → Prototype → Impact",
    timeline: "12 weeks",
    tools: ["Figma", "Miro", "Maze"],
    impact: "40% faster dispatch decisions",
    category: "Mobile Apps",
    imageUrl:
      "https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMzY4NDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
    presentation: "case-study",
  },
  {
    id: "financehub",
    title: "FinanceHub Dashboard",
    summary:
      "Reframed a dense analytics suite into a decision-focused dashboard for finance leads and operators.",
    problem: "Teams struggled to prioritize cash-flow risks across fragmented reports and inconsistent views.",
    solution: "Built a signal-based dashboard hierarchy with guided drill-downs and clearer KPI narratives.",
    role: "Senior Product Designer",
    process: "Data Audit -> Information Architecture -> Hi-Fi Design -> Validation",
    timeline: "10 weeks",
    tools: ["Figma", "Notion", "Hotjar"],
    impact: "27% faster reporting cycles",
    category: "Dashboard",
    imageUrl:
      "https://images.unsplash.com/photo-1583932692875-a42450d50acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXNpZ24lMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzYzNDU0Nzg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
    presentation: "case-study",
  },
  {
    id: "uptra",
    title: "Uptra — AI Career Platform",
    summary:
      "End-to-end product UI for job discovery, resume building, and interview prep—with match scoring and guided question flows.",
    problem: "Job seekers struggled to prioritize roles and prepare confidently across fragmented tools.",
    solution: "Designed a unified dashboard with smart filters, match insights, structured resume editing, and AI-assisted interview prep.",
    role: "Lead Product Designer",
    process: "Research -> IA -> Wireframes -> UI System -> Prototype",
    timeline: "14 weeks",
    tools: ["Figma", "FigJam", "Maze"],
    impact: "Higher application confidence and faster job shortlisting",
    category: "SaaS Product",
    imageUrl: UPTRA_SHOWCASE_GALLERY[0],
    featured: true,
    presentation: "showcase",
    showcaseKind: "saas",
    galleryImages: [...UPTRA_SHOWCASE_GALLERY],
  },
  {
    id: "ecommerce-redesign",
    title: "E-commerce Platform Redesign",
    summary:
      "Redesigned browse-to-checkout journey to reduce drop-offs and improve confidence during purchase.",
    problem: "High cart abandonment and unclear product comparison caused conversion leakage.",
    solution: "Simplified product discovery and checkout with clearer decision architecture and trust signals.",
    role: "Lead Product Designer",
    process: "Research -> Journey Mapping -> Wireframing -> A/B Testing",
    timeline: "9 weeks",
    tools: ["Figma", "GA4", "FigJam"],
    impact: "18% lift in conversion rate",
    category: "Web Design",
    imageUrl:
      "https://images.unsplash.com/photo-1694599048261-a1de00f0117e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWdufGVufDF8fHx8MTc2MzQ3Njk4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    featured: true,
    presentation: "case-study",
  },
  {
    id: "gocardless-quickbooks",
    title: "GoCardless for QuickBooks",
    summary:
      "B2B payments integration with revenue visibility, automation controls, and a guided onboarding path for first-time setup.",
    problem: "SMBs needed to connect payment collection with QuickBooks without complex configuration.",
    solution: "Designed home dashboards with payout metrics, automation toggles, and a step-by-step onboarding checklist.",
    role: "Senior Product Designer",
    process: "Workflow Audit -> IA -> UI Design -> Dev Handoff",
    timeline: "10 weeks",
    tools: ["Figma", "FigJam", "Notion"],
    impact: "Clearer first-payment path and reduced setup drop-off",
    category: "FinTech SaaS",
    imageUrl: GOCARDLESS_SHOWCASE_GALLERY[0],
    featured: false,
    presentation: "showcase",
    showcaseKind: "saas",
    galleryImages: [...GOCARDLESS_SHOWCASE_GALLERY],
  },
  {
    id: "financial-reporting",
    title: "Financial Reporting & Cash Flow",
    summary:
      "Complex forecasting and cash-flow tools with temporal data tables, multi-step workflows, and chart-driven summaries.",
    problem: "Finance teams couldn't reconcile past, present, and projected cash positions in one view.",
    solution: "Built phased column layouts, collapsible line items, and stepper-guided cash-flow preparation flows.",
    role: "Senior Product Designer",
    process: "Domain Research -> IA -> Table UX -> Visual Design",
    timeline: "12 weeks",
    tools: ["Figma", "Miro", "Notion"],
    impact: "Faster monthly close and clearer forecast visibility",
    category: "FinTech Dashboard",
    imageUrl: FINANCIAL_REPORTING_GALLERY[0],
    featured: false,
    presentation: "showcase",
    showcaseKind: "dashboard",
    galleryImages: [...FINANCIAL_REPORTING_GALLERY],
  },
  {
    id: "costallocation-pro",
    title: "CostAllocation Pro",
    summary:
      "Grant and nonprofit cost allocation platform with payroll analytics, time logging, and organization switching.",
    problem: "Finance admins juggled spreadsheets to track hours, grants, and cost allocations across entities.",
    solution: "Designed dashboard analytics, editable time-log tables with status cues, and multi-org navigation.",
    role: "Lead Product Designer",
    process: "Stakeholder Interviews -> Data Modeling -> UI Design -> Iteration",
    timeline: "16 weeks",
    tools: ["Figma", "FigJam", "Jira"],
    impact: "Reduced manual reconciliation and improved grant compliance visibility",
    category: "Enterprise Dashboard",
    imageUrl: COSTALLOCATION_SHOWCASE_GALLERY[0],
    featured: false,
    presentation: "showcase",
    showcaseKind: "dashboard",
    galleryImages: [...COSTALLOCATION_SHOWCASE_GALLERY],
  },
  {
    id: "enterprise-dashboards",
    title: "Enterprise Operations Dashboards",
    summary:
      "B2B admin consoles for payroll and inventory management—designed for high-volume data with clear exception handling.",
    problem: "Operations teams needed role-specific dashboards that surface exceptions without overwhelming users.",
    solution: "Crafted modular layouts with KPI cards, filterable tables, and domain-specific visual hierarchies.",
    role: "Senior UI/UX Designer",
    process: "Heuristic Review -> Component System -> Screen Design -> QA",
    timeline: "Ongoing",
    tools: ["Figma", "Adobe XD", "Notion"],
    impact: "Improved scanability across high-volume operational workflows",
    category: "B2B Dashboards",
    imageUrl: ENTERPRISE_DASHBOARDS_GALLERY[0],
    featured: false,
    presentation: "showcase",
    showcaseKind: "dashboard",
    galleryImages: [...ENTERPRISE_DASHBOARDS_GALLERY],
  },
  {
    id: "web-platforms",
    title: "Web Platforms & Product Hubs",
    summary:
      "Landing experiences and product hubs for AI trade tools, accounting platforms, and finance apps—focused on clarity and conversion.",
    problem: "Complex B2B products needed approachable entry points that still communicate capability.",
    solution: "Designed hero-first layouts, hub navigation, and card-based module discovery patterns.",
    role: "Senior UI/UX Designer",
    process: "Content Strategy -> Wireframes -> Visual Design -> Handoff",
    timeline: "Ongoing",
    tools: ["Figma", "FigJam", "Notion"],
    impact: "Stronger first impressions and clearer product wayfinding",
    category: "Web Design",
    imageUrl: WEB_PLATFORMS_GALLERY[0],
    featured: false,
    presentation: "showcase",
    showcaseKind: "web",
    galleryImages: [...WEB_PLATFORMS_GALLERY],
  },
];

const truckflowStudy: CaseStudyContent = {
  id: "truckflow",
  title: "TruckFlow - Fleet Management App",
  heroTagline:
    "A role-aware fleet operations platform that reduced dispatch friction and improved real-time decision velocity across teams.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1605108222700-0d605d9ebafe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYzMzY4NDczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  heroImageAlt: "TruckFlow fleet management product hero",
  quickSummary: {
    businessGoal: "Improve operational efficiency and real-time coordination for fleet teams.",
    uxObjective: "Reduce friction across dispatch, tracking, and driver task completion workflows.",
    designOutcome: "A mobile-first, role-aware experience with measurable speed and satisfaction gains.",
    impact: "40% faster operations, 60% time saved, and 95% user satisfaction after redesign.",
  },
  sidebar: {
    role: "Lead Product Designer",
    timelineLabel: "12-week delivery",
    toolsLabel: "Figma, Miro, Maze",
  },
  overview: {
    heading: "Fleet operations reimagined for speed and clarity",
    body: "TruckFlow is a complex B2B logistics product. I led the end-to-end UX from discovery to handoff, aligning operations constraints with business goals and turning a fragmented toolset into a single role-specific experience.",
  },
  problemStatement: {
    heading: "Critical decisions were delayed by interface complexity",
    body: "Teams relied on disconnected tools, outdated desktop screens, and inconsistent status signals. Dispatchers lacked confidence during high-pressure scenarios, while drivers experienced frequent friction completing core tasks.",
  },
  businessGoal: {
    heading: "Improve operational velocity while reducing avoidable errors",
    body: "The target was to shorten dispatch decision time, improve field task completion, and increase stakeholder trust in real-time data. Success was measured through speed, satisfaction, and escalation reduction metrics.",
  },
  userPainPoints: [
    {
      title: "Fragmented Workflow",
      detail:
        "Dispatch, driver communication, and tracking were spread across separate tools, increasing context switching.",
    },
    {
      title: "Low Mobile Usability",
      detail:
        "Field users struggled with desktop-oriented interfaces and hidden actions on smaller screens.",
    },
    {
      title: "Slow Decision-Making",
      detail:
        "Operations teams could not quickly identify urgent delays or driver bottlenecks in real time.",
    },
  ],
  researchInsights: [
    {
      title: "Dispatchers prioritized exceptions over totals",
      detail: "Users ignored large summary tables and immediately looked for late shipments and blocked assignments.",
      implication: "Designed a risk-first dashboard that surfaces urgent exceptions before aggregate metrics.",
    },
    {
      title: "Drivers needed one-thumb clarity under pressure",
      detail: "Most tasks happened while users were moving or multitasking, making dense navigation error-prone.",
      implication: "Introduced large tap targets, progressive disclosure, and action clustering by urgency.",
    },
    {
      title: "Managers cared about accountability visibility",
      detail: "Leadership asked who owned each delay and what had already been attempted.",
      implication: "Added owner attribution, status history, and clear escalation pathways in every flow.",
    },
  ],
  processPhases: [
    {
      phase: "Problem",
      activities: "Stakeholder workshops, workflow audit, success metrics definition",
      outcome: "Aligned on dispatch velocity and error reduction as north-star KPIs.",
    },
    {
      phase: "Research",
      activities: "Dispatcher interviews, driver shadowing, support ticket analysis",
      outcome: "Identified 3 critical bottlenecks: context switching, mobile friction, exception visibility.",
    },
    {
      phase: "User Flow",
      activities: "Role-based journey maps, IA restructuring, job story mapping",
      outcome: "Separate but connected flows for dispatchers, drivers, and managers.",
    },
    {
      phase: "Wireframes",
      activities: "Low-fi exploration of dashboard hierarchy and field task flows",
      outcome: "Validated exception-first layout and one-thumb driver patterns.",
    },
    {
      phase: "UI",
      activities: "Design system setup, high-fidelity screens, accessibility review",
      outcome: "Status-driven visual language with reusable components across platforms.",
    },
    {
      phase: "Prototype",
      activities: "Interactive Figma prototypes, moderated usability testing (Maze)",
      outcome: "Improved task success rates before engineering handoff.",
    },
    {
      phase: "Impact",
      activities: "Dev handoff, QA support, post-launch metric tracking",
      outcome: "40% faster operations, 95% satisfaction, 33% fewer escalations.",
    },
  ],
  explorationConceptCount: 6,
  uiDesignSystem: [
    {
      title: "Color Logic",
      body: "Status-based palette for risk, warning, and completion states.",
    },
    {
      title: "Component System",
      body: "Reusable cards, alerts, and action bars to keep behavior consistent.",
    },
    {
      title: "Typography Rhythm",
      body: "Large scanable hierarchy tailored for high-pressure operations environments.",
    },
  ],
  designDecisions: [
    {
      title: "Action-first dashboard",
      rationale:
        "Moved mission-critical actions and exceptions to top-level cards so managers can resolve issues faster.",
      challenge: "Avoiding visual noise when multiple exception types compete for attention.",
    },
    {
      title: "Role-aware navigation",
      rationale:
        "Tailored key paths for dispatchers and drivers to reduce irrelevant options and speed completion.",
      challenge: "Keeping shared terminology consistent across roles without duplicating entire IA trees.",
    },
    {
      title: "Status-driven visual language",
      rationale:
        "Introduced clearer state indicators for delays, completion, and risk to improve scanability under pressure.",
      challenge: "Balancing visual urgency without creating alert fatigue across long shift usage.",
    },
    {
      title: "Guided fallback patterns",
      rationale:
        "Created contextual recovery paths when network latency or incomplete data blocked normal task flow.",
      challenge: "Keeping fallback states transparent so users trusted system reliability during disruptions.",
    },
  ],
  finalSolutionBlocks: [
    {
      title: "Operations Command Layer",
      detail:
        "A unified command view for dispatchers that highlights critical actions, live vehicle states, and route risks.",
    },
    {
      title: "Field Execution Layer",
      detail:
        "Driver-facing flows optimized for speed: job acceptance, proof upload, and delivery completion in minimal steps.",
    },
    {
      title: "Manager Insight Layer",
      detail:
        "High-level performance and exception trends with drill-down paths for coaching and strategic planning.",
    },
  ],
  metrics: [
    { icon: "trending-up", value: "40%", label: "Faster Operations" },
    { icon: "users", value: "95%", label: "User Satisfaction" },
    { icon: "check-circle", value: "60%", label: "Time Saved" },
    { icon: "clock", value: "33%", label: "Fewer Support Escalations" },
  ],
  learnings: [
    "Business alignment improves when success metrics are defined before visual exploration.",
    "Role-based IA is essential in operational products where context and urgency vary by user type.",
    "Shipping a robust component system early reduced design debt and accelerated dev collaboration.",
  ],
};

function studyFromListing(
  listing: ProjectListing,
  overrides: Partial<Omit<CaseStudyContent, "id" | "title" | "heroImageUrl" | "heroImageAlt">>,
): CaseStudyContent {
  const toolsLabel = listing.tools.join(", ");
  return {
    id: listing.id,
    title: listing.title,
    heroTagline: overrides.heroTagline ?? listing.summary,
    heroImageUrl: listing.imageUrl,
    heroImageAlt: `${listing.title} preview`,
    quickSummary: {
      businessGoal:
        overrides.quickSummary?.businessGoal ??
        `Move core business outcomes forward by solving the operational friction described in research.`,
      uxObjective:
        overrides.quickSummary?.uxObjective ??
        `Reduce cognitive load and completion time across primary user journeys.`,
      designOutcome:
        overrides.quickSummary?.designOutcome ??
        `A cohesive product experience with clearer hierarchy, reusable patterns, and validated usability.`,
      impact:
        overrides.quickSummary?.impact ??
        `${listing.impact} alongside qualitative gains in clarity and stakeholder confidence.`,
    },
    sidebar: {
      role: listing.role,
      timelineLabel: listing.timeline.includes("week") ? `${listing.timeline} delivery` : listing.timeline,
      toolsLabel,
      ...overrides.sidebar,
    },
    overview: overrides.overview ?? {
      heading: "Product context and design leadership",
      body: `${listing.title} required aligning user needs with business constraints. I owned UX discovery through delivery—structuring workflows, interaction patterns, and a scalable UI foundation.`,
    },
    problemStatement: overrides.problemStatement ?? {
      heading: "Where the experience broke down",
      body: listing.problem,
    },
    businessGoal: overrides.businessGoal ?? {
      heading: "What success looked like for the business",
      body: `Stakeholders needed measurable improvements tied to revenue, retention, or operational efficiency—while keeping implementation realistic for engineering timelines.`,
    },
    userPainPoints:
      overrides.userPainPoints ??
      [
        {
          title: "Unclear priorities",
          detail: "Users could not quickly identify what mattered now versus later.",
        },
        {
          title: "Fragmented mental models",
          detail: "Information was scattered across screens without consistent hierarchy.",
        },
        {
          title: "High friction at moments of commitment",
          detail: "Key actions required extra steps, explanations, or confirmations.",
        },
      ],
    researchInsights:
      overrides.researchInsights ??
      [
        {
          title: "People scan for signals, not dashboards",
          detail: "Participants gravitated toward anomalies and next actions rather than aggregate charts.",
          implication: "Led with actionable summaries and contextual drill-downs.",
        },
        {
          title: "Trust beats novelty",
          detail: "Users preferred predictable patterns when stakes were high.",
          implication: "Standardized components and conservative interaction patterns where risk was high.",
        },
        {
          title: "Content clarity unlocked adoption",
          detail: "Ambiguous labels caused hesitation and avoidable support contacts.",
          implication: "Rewrote critical paths with plain language and progressive disclosure.",
        },
      ],
    processPhases:
      overrides.processPhases ??
      [
        {
          phase: "Problem",
          activities: "Stakeholder alignment, constraint mapping, KPI definition",
          outcome: "Clear problem scope tied to measurable business outcomes.",
        },
        {
          phase: "Research",
          activities: "User interviews, analytics review, competitive audit",
          outcome: "Evidence-based pain points and opportunity areas prioritized.",
        },
        {
          phase: "User Flow",
          activities: "Journey mapping, IA iterations, task analysis",
          outcome: "Structured flows that match user mental models.",
        },
        {
          phase: "Wireframes",
          activities: "Low-fidelity exploration of layout and hierarchy",
          outcome: "Validated structure before visual investment.",
        },
        {
          phase: "UI",
          activities: "High-fidelity design, design tokens, accessibility pass",
          outcome: "Cohesive visual system ready for prototyping.",
        },
        {
          phase: "Prototype",
          activities: "Interactive prototypes, usability testing sessions",
          outcome: "De-risked interactions and copy before development.",
        },
        {
          phase: "Impact",
          activities: "Handoff specs, launch support, post-release measurement",
          outcome: "Shipped experience with traceable impact on KPIs.",
        },
      ],
    explorationConceptCount: overrides.explorationConceptCount ?? 6,
    uiDesignSystem:
      overrides.uiDesignSystem ??
      [
        { title: "Foundations", body: "Typography, spacing, and grid tuned for scan speed on primary surfaces." },
        { title: "Components", body: "Buttons, cards, tables, and filters standardized for reuse across flows." },
        { title: "States & Accessibility", body: "Focused empty, loading, and error patterns to reduce ambiguity." },
      ],
    designDecisions:
      overrides.designDecisions ??
      [
        {
          title: "Prioritized clarity over density",
          rationale: "Reduced visual noise so primary tasks surfaced faster.",
          challenge: "Balancing stakeholder requests for more data on every screen.",
        },
        {
          title: "Guided progressive disclosure",
          rationale: "Surfaced essentials first while keeping advanced controls reachable.",
          challenge: "Ensuring power users could still move quickly.",
        },
      ],
    finalSolutionBlocks:
      overrides.finalSolutionBlocks ??
      [
        {
          title: "Primary journey redesign",
          detail: listing.solution,
        },
        {
          title: "Systemized UI patterns",
          detail: "Established repeatable structures so teams could ship consistently.",
        },
        {
          title: "Measurement-ready UX",
          detail: "Designed flows that map cleanly to funnel and operational analytics.",
        },
      ],
    metrics:
      overrides.metrics ??
      [
        { icon: "trending-up", value: listing.impact.split(" ")[0] || "—", label: "Impact highlight" },
        { icon: "users", value: "↑", label: "User satisfaction trend" },
        { icon: "check-circle", value: "↓", label: "Support friction trend" },
        { icon: "clock", value: listing.timeline.split(" ")[0] || "—", label: "Timeline (weeks)" },
      ],
    learnings:
      overrides.learnings ??
      [
        "Early alignment on metrics prevents beautiful screens that miss business outcomes.",
        "Strong IA pays dividends across every downstream deliverable.",
        "Design systems accelerate execution only when paired with governance.",
      ],
  };
}

const financehubStudy = studyFromListing(PROJECT_LISTINGS.find((p) => p.id === "financehub")!, {
  heroTagline:
    "FinanceHub reframes dense analytics into executive-ready signals—so finance teams act faster with fewer spreadsheets.",
  quickSummary: {
    businessGoal: "Give finance leaders faster visibility into cash-flow risk and operational variance.",
    uxObjective: "Reduce time-to-insight by restructuring IA around decisions, not chart galleries.",
    designOutcome: "A modular dashboard with guided narratives and trustworthy drill-down paths.",
    impact: "27% faster reporting cycles with clearer ownership of next actions.",
  },
  overview: {
    heading: "From chart overload to decision-ready dashboards",
    body: "Finance teams were drowning in widgets. I rebuilt the experience around questions executives actually ask weekly—liquidity, runway risk, and anomalies—then supported depth without losing orientation.",
  },
  businessGoal: {
    heading: "Accelerate confident financial decisions",
    body: "The organization needed reporting cycles to shrink without sacrificing accuracy. UX success meant fewer hops between tools and clearer explanations for variance.",
  },
  userPainPoints: [
    {
      title: "Inconsistent metric definitions",
      detail: "The same KPI appeared differently across modules, eroding trust.",
    },
    {
      title: "Drill-down dead ends",
      detail: "Users opened charts but could not trace numbers back to underlying drivers.",
    },
    {
      title: "Heavy cognitive load during reviews",
      detail: "Weekly reviews required mentally stitching disconnected views.",
    },
  ],
  metrics: [
    { icon: "clock", value: "27%", label: "Faster reporting cycles" },
    { icon: "users", value: "↑", label: "Executive adoption in reviews" },
    { icon: "check-circle", value: "↓", label: "Duplicate analysis requests" },
    { icon: "trending-up", value: "↑", label: "Confidence in forecasts" },
  ],
});

const uptraStudy = studyFromListing(PROJECT_LISTINGS.find((p) => p.id === "uptra")!, {
  heroTagline:
    "Uptra unifies job discovery, resume building, and interview prep—helping candidates act with confidence, not guesswork.",
  quickSummary: {
    businessGoal: "Increase engagement and successful job applications on the platform.",
    uxObjective: "Reduce friction from job discovery through interview preparation in one cohesive flow.",
    designOutcome: "Match-scored listings, structured resume editing, and AI-guided interview questions.",
    impact: "Clearer candidate confidence and faster path from browse to apply.",
  },
  overview: {
    heading: "Career intelligence designed for decision speed",
    body: "Uptra spans multiple high-stakes workflows—finding roles, refining resumes, and preparing for interviews. I structured the IA so each module feels connected while keeping dense information scannable.",
  },
  metrics: [
    { icon: "users", value: "↑", label: "Application confidence" },
    { icon: "check-circle", value: "3", label: "Core modules unified" },
    { icon: "clock", value: "14 wks", label: "Design cycle" },
    { icon: "trending-up", value: "↑", label: "Match clarity" },
  ],
});

const gocardlessStudy = studyFromListing(PROJECT_LISTINGS.find((p) => p.id === "gocardless-quickbooks")!, {
  heroTagline:
    "GoCardless for QuickBooks connects payment collection with accounting—through clear dashboards and guided onboarding.",
  quickSummary: {
    businessGoal: "Help SMBs start collecting payments through QuickBooks with minimal setup friction.",
    uxObjective: "Surface revenue status, automation controls, and first-payment milestones in one home experience.",
    designOutcome: "Revenue cards, automation checklist, and expandable onboarding steps with contextual help.",
    impact: "Reduced setup confusion and clearer path to first payout.",
  },
  metrics: [
    { icon: "check-circle", value: "↓", label: "Setup drop-off" },
    { icon: "users", value: "↑", label: "Automation adoption" },
    { icon: "clock", value: "10 wks", label: "Design cycle" },
    { icon: "trending-up", value: "↑", label: "Payment clarity" },
  ],
});

const financialReportingStudy = studyFromListing(PROJECT_LISTINGS.find((p) => p.id === "financial-reporting")!, {
  heroTagline:
    "Financial reporting tools that organize past, present, and projected cash positions into actionable tables and charts.",
  quickSummary: {
    businessGoal: "Accelerate monthly close and improve forecast accuracy for finance teams.",
    uxObjective: "Make temporal data scannable across wide tables without losing drill-down depth.",
    designOutcome: "Phased column groups, collapsible sections, stepper workflows, and chart-table pairings.",
    impact: "Faster monthly close and clearer forecast visibility.",
  },
  metrics: [
    { icon: "clock", value: "↑", label: "Close speed" },
    { icon: "trending-up", value: "↑", label: "Forecast clarity" },
    { icon: "check-circle", value: "4", label: "Product surfaces" },
    { icon: "users", value: "↑", label: "Finance team adoption" },
  ],
});

const costallocationStudy = studyFromListing(PROJECT_LISTINGS.find((p) => p.id === "costallocation-pro")!, {
  heroTagline:
    "CostAllocation Pro turns grant tracking and time logging into a governed dashboard experience for nonprofit finance teams.",
  quickSummary: {
    businessGoal: "Replace spreadsheet workflows with auditable cost allocation tooling.",
    uxObjective: "Make hours, grants, and payroll analytics scannable with clear exception states.",
    designOutcome: "Analytics dashboard, editable time logs with conditional formatting, and org switching.",
    impact: "Reduced manual reconciliation and improved compliance visibility.",
  },
  metrics: [
    { icon: "trending-up", value: "↓", label: "Manual reconciliation" },
    { icon: "check-circle", value: "↑", label: "Grant compliance" },
    { icon: "clock", value: "16 wks", label: "Design cycle" },
    { icon: "users", value: "↑", label: "Admin efficiency" },
  ],
});

const enterpriseStudy = studyFromListing(PROJECT_LISTINGS.find((p) => p.id === "enterprise-dashboards")!, {
  heroTagline:
    "Enterprise admin consoles for payroll and inventory—balancing data density with scan speed.",
  quickSummary: {
    businessGoal: "Help operations teams monitor KPIs and resolve exceptions without tool-switching.",
    uxObjective: "Design repeatable dashboard patterns that adapt to domain-specific data models.",
    designOutcome: "KPI cards, filterable tables, and role-aware layouts across B2B products.",
    impact: "Improved scanability across high-volume operational workflows.",
  },
  metrics: [
    { icon: "users", value: "2+", label: "Product domains" },
    { icon: "check-circle", value: "↑", label: "Task scan speed" },
    { icon: "clock", value: "↑", label: "Time to insight" },
    { icon: "trending-up", value: "↑", label: "Operational clarity" },
  ],
});

const webPlatformsStudy = studyFromListing(PROJECT_LISTINGS.find((p) => p.id === "web-platforms")!, {
  heroTagline:
    "Web platforms and product hubs that balance first impressions with clear paths into complex B2B capabilities.",
  quickSummary: {
    businessGoal: "Help users understand product value and navigate modules quickly.",
    uxObjective: "Design approachable entry points without sacrificing enterprise credibility.",
    designOutcome: "Hero layouts, hub navigation, and card-based module discovery.",
    impact: "Stronger first impressions and clearer product wayfinding.",
  },
  metrics: [
    { icon: "users", value: "4", label: "Platform surfaces" },
    { icon: "check-circle", value: "↑", label: "Wayfinding clarity" },
    { icon: "clock", value: "↑", label: "Time to first action" },
    { icon: "trending-up", value: "↑", label: "Product comprehension" },
  ],
});

const ecommerceStudy = studyFromListing(PROJECT_LISTINGS.find((p) => p.id === "ecommerce-redesign")!, {
  quickSummary: {
    businessGoal: "Increase conversion and average order value without adding checkout friction.",
    uxObjective: "Make comparison, trust, and shipping clarity effortless before purchase.",
    designOutcome: "A streamlined PDP-to-checkout journey with stronger reassurance moments.",
    impact: "18% lift in conversion rate post-release.",
  },
  userPainPoints: [
    { title: "Comparison fatigue", detail: "Users could not differentiate variants and bundles quickly." },
    { title: "Trust gaps near checkout", detail: "Shipping and returns felt opaque at the decision moment." },
    { title: "Mobile drop-offs", detail: "Forms and summaries did not adapt well to small screens." },
  ],
  metrics: [
    { icon: "trending-up", value: "18%", label: "Conversion lift" },
    { icon: "users", value: "↓", label: "Cart abandonment" },
    { icon: "check-circle", value: "↑", label: "Checkout clarity score" },
    { icon: "clock", value: "9 wks", label: "End-to-end UX cycle" },
  ],
});


export const CASE_STUDY_CONTENT: Record<string, CaseStudyContent> = {
  truckflow: truckflowStudy,
  financehub: financehubStudy,
  "ecommerce-redesign": ecommerceStudy,
  uptra: uptraStudy,
  "gocardless-quickbooks": gocardlessStudy,
  "financial-reporting": financialReportingStudy,
  "costallocation-pro": costallocationStudy,
  "enterprise-dashboards": enterpriseStudy,
  "web-platforms": webPlatformsStudy,
};

export function resolveCaseStudyId(id: string | undefined): string {
  if (
    id &&
    (FEATURED_CASE_STUDY_IDS as readonly string[]).includes(id) &&
    CASE_STUDY_CONTENT[id]
  ) {
    return id;
  }
  return DEFAULT_CASE_STUDY_ID;
}

export function getShowcaseProjectListings(): ProjectListing[] {
  return PROJECT_LISTINGS.filter((p) => p.presentation === "showcase");
}

export function getCaseStudyProjectListings(): ProjectListing[] {
  const caseStudies = PROJECT_LISTINGS.filter((p) => p.presentation === "case-study");
  return [...caseStudies].sort((a, b) => {
    const ia = FEATURED_CASE_STUDY_IDS.indexOf(a.id as FeaturedCaseStudyId);
    const ib = FEATURED_CASE_STUDY_IDS.indexOf(b.id as FeaturedCaseStudyId);
    const ra = ia === -1 ? 999 : ia;
    const rb = ib === -1 ? 999 : ib;
    return ra - rb;
  });
}

export function getCaseStudyContent(id: string | undefined): CaseStudyContent {
  const resolved = resolveCaseStudyId(id);
  return CASE_STUDY_CONTENT[resolved];
}
