/**
 * Case studies and additional work.
 *
 * Content rules: describe only what the real product screens show and what is
 * known about the project. Leave a field out rather than inventing research,
 * metrics or client details.
 */

export interface Shot {
  /** Base name of the image in /public/work (generated as -1200.webp and -2400.webp). */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Decision {
  title: string;
  body: string;
  shot?: Shot;
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** One line used on cards and in the case-study header. */
  tagline: string;
  category: string;
  platform: string;
  role: string;
  timeline: string;
  cover: Shot;
  /** Accent tint behind screenshots on cards (kept subtle). */
  stage: string;
  seoDescription: string;
  context: string;
  problem: string;
  contribution: string[];
  decisions: Decision[];
  goal: string;
}

const shot = (src: string, width: number, height: number, alt: string, caption?: string): Shot => ({
  src,
  width,
  height,
  alt,
  caption,
});

const S = {
  uptraJobs: shot("uptra-jobs", 1200, 1203, "Uptra job listings with match scores, filter chips and apply actions"),
  uptraResume: shot("uptra-resume", 1200, 2360, "Uptra resume editor with profile, skills, experience, education and certificate sections"),
  uptraInterview: shot("uptra-interview", 1200, 830, "Uptra interview preparation with progress stats, topic tabs and suggested questions"),
  gcHome: shot("gocardless-home", 1200, 769, "GoCardless for QuickBooks home with revenue, mandate and payment status, and an automation checklist"),
  gcOnboarding: shot("gocardless-onboarding", 1200, 854, "GoCardless for QuickBooks onboarding checklist for collecting a first payment"),
  capDashboard: shot("costallocation-dashboard", 1200, 675, "CostAllocation Pro dashboard with payroll by grant, hours against limits and monthly salary expense"),
  capTimeLogs: shot("costallocation-time-logs", 1200, 712, "CostAllocation Pro time log table with filters, inline hours and over-hours flags"),
  cfInflow: shot("cashflow-planned-inflow", 1200, 675, "Planned cash inflow table grouped into past, current and projected months"),
  cfStatement: shot("cashflow-statement", 1200, 694, "Cash flow statement preparation with monthly chart, category tabs and line items"),
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "uptra",
    title: "Uptra",
    tagline: "An AI career platform that brings job discovery, resume building and interview prep into one workspace.",
    category: "Career & HR tech",
    platform: "Web app",
    role: "Lead Product Designer",
    timeline: "14 weeks",
    cover: S.uptraJobs,
    stage: "#E9E8F4",
    seoDescription:
      "Uptra case study by Dixit Panchal: designing job matching, structured resume editing and guided interview preparation for an AI career platform.",
    context:
      "Uptra is an AI-assisted career platform. Candidates use it to find relevant roles, maintain their resume and prepare for interviews. These are three high-stakes tasks that usually live in separate tools.",
    problem:
      "Job seekers struggled to prioritise roles and prepare with confidence because the information they needed was spread across fragmented tools. Every listing looked equally important, and preparation happened somewhere else entirely.",
    contribution: [
      "Information architecture connecting jobs, resume, profile and interview prep in one navigation shell",
      "Job listing and match-score patterns",
      "Structured resume editor",
      "Interview preparation workspace",
      "High-fidelity UI and prototypes",
    ],
    decisions: [
      {
        title: "Lead every listing with fit, not just the title",
        body: "Each job card puts a match score and its two most decision-relevant reasons (compensation and visa sponsorship) next to the role. Role facts (location, experience, level, salary range, work type) sit in a consistent grid, so candidates can compare cards by scanning one column at a time. Active filters stay visible as chips, and “Not interested” lets people curate the list instead of scrolling past noise.",
        shot: S.uptraJobs,
      },
      {
        title: "Treat the resume as structured data",
        body: "Instead of a free-form document, the resume is broken into repeatable, editable blocks: profile summary, skills as chips, experience, education, projects and certificates. Timeline markers make the order of experience obvious, and export and edit actions stay pinned at the top. Structured data is also what lets the platform match candidates to roles.",
        shot: S.uptraResume,
      },
      {
        title: "Make interview prep a guided study space",
        body: "Preparation opens with progress, question count, categories and study time, so candidates always know where they stand. Tabs separate questions, company insights, developments and salary expectations. Each suggested question explains “why ask this”, tying it back to the company and the candidate’s own background.",
        shot: S.uptraInterview,
      },
    ],
    goal: "Help candidates shortlist roles faster and walk into interviews prepared, with every step of the search in one coherent product.",
  },
  {
    slug: "gocardless-quickbooks",
    title: "GoCardless for QuickBooks",
    tagline: "A QuickBooks marketplace app that takes small businesses from setup to their first bank payment, then automates the rest.",
    category: "Fintech & payments",
    platform: "Web app · QuickBooks integration",
    role: "Senior Product Designer",
    timeline: "10 weeks",
    cover: S.gcHome,
    stage: "#F1EFD9",
    seoDescription:
      "GoCardless for QuickBooks case study by Dixit Panchal: a guided onboarding path to the first payment and a home dashboard for payouts, mandates and automation.",
    context:
      "GoCardless for QuickBooks lets small businesses collect bank payments against their QuickBooks invoices. Two systems need to stay in sync: payments in GoCardless and invoices in QuickBooks.",
    problem:
      "Small businesses needed to connect payment collection to QuickBooks without complex configuration. Setup involves business verification, payment methods and customer mandates, concepts that are unfamiliar to many first-time users.",
    contribution: [
      "Onboarding flow from account setup to the first payout",
      "Home dashboard for revenue and payment health",
      "Automation settings",
      "Sync and navigation model across GoCardless and QuickBooks",
      "UI design and developer handoff",
    ],
    decisions: [
      {
        title: "Turn setup into a path to the first payment",
        body: "Onboarding is framed around one outcome: collecting a first payment. Six ordered steps run from finishing account setup to automating everything. Only the current step is expanded, with a single primary action, so the next move is never ambiguous. A banner keeps the verification requirement visible until it is done.",
        shot: S.gcOnboarding,
      },
      {
        title: "Answer questions where they come up",
        body: "A “Get started” panel sits beside the checklist with a short walkthrough video and the questions businesses actually ask, such as why GoCardless isn’t showing on invoices, how to talk to customers about bank payments. Help stays in context instead of in a separate help centre.",
      },
      {
        title: "Put exceptions next to revenue",
        body: "The home screen pairs payout and pending totals with the things that need attention: unmatched mandates, inactive mandates, failed payments and chargebacks. “Action required” is written as a link, not just shown as a number, so problems lead straight to a fix.",
        shot: S.gcHome,
      },
      {
        title: "Plain-language automation",
        body: "Automation is a short list of toggles written as outcomes: email a mandate to every new customer, create payments on the invoice due date, reconcile payments in QuickBooks. Sync status and the last sync time stay visible in the sidebar, with direct links to both dashboards.",
      },
    ],
    goal: "Give small businesses a clear path to their first payment and reduce drop-off during setup.",
  },
  {
    slug: "costallocation-pro",
    title: "CostAllocation Pro",
    tagline: "Grant cost allocation for nonprofit finance teams, with payroll analytics, time logging and multi-organisation switching.",
    category: "Nonprofit finance",
    platform: "Web app",
    role: "Lead Product Designer",
    timeline: "16 weeks",
    cover: S.capDashboard,
    stage: "#E6EBE2",
    seoDescription:
      "CostAllocation Pro case study by Dixit Panchal: replacing spreadsheet-based grant cost allocation with a dashboard and an editable, auditable time-log workflow.",
    context:
      "Nonprofits funded by grants must allocate payroll costs to the grants and programmes that fund them. CostAllocation Pro gives finance admins one place to track hours, payroll and allocations across entities.",
    problem:
      "Finance admins were juggling spreadsheets to track hours, grants and cost allocations across organisations. Reconciliation was manual, and staff going over their hour limits was hard to spot.",
    contribution: [
      "Dashboard information architecture",
      "Time-activity and time-log workflows",
      "Organisation switching",
      "Visual design",
      "Annotated developer handoff",
    ],
    decisions: [
      {
        title: "A dashboard built around admin questions",
        body: "Four panels answer what admins check most: year-to-date payroll by grant, each employee’s hours against their limit, salary expense by month, and a monthly allocation summary that links straight to the detail. A calm, muted palette keeps attention on the numbers.",
        shot: S.capDashboard,
      },
      {
        title: "An editable time log that flags problems",
        body: "Time logs are an editable table rather than a read-only report. Admins can filter by employee, customer and class, step through months, and edit hours inline. Each row can be added to, split or deleted. Employees over their hours are flagged in red with the overage amount, and an “Hours over” filter isolates them.",
        shot: S.capTimeLogs,
      },
      {
        title: "Annotated for handoff",
        body: "Screens carry developer notes where behaviour isn’t obvious from the UI. For example, the organisation selector lets admins switch between companies without logging out. Sync status and export options are designed in, not added later.",
      },
    ],
    goal: "Replace spreadsheet reconciliation with an auditable workflow and make grant compliance visible at a glance.",
  },
  {
    slug: "cash-flow-reporting",
    title: "Cash Flow Reporting",
    tagline: "Forecasting and cash-flow statement tools that show past, current and projected cash positions in one view.",
    category: "Financial reporting",
    platform: "Web app",
    role: "Senior Product Designer",
    timeline: "12 weeks",
    cover: S.cfInflow,
    stage: "#E8E6F3",
    seoDescription:
      "Cash flow reporting case study by Dixit Panchal: phased tables, stepper-led workflows and chart-and-table pairings for forecasting and cash-flow statements.",
    context:
      "A financial planning product used by practice owners and their accountants to plan cash inflows and outflows and prepare cash-flow statements. The screens shown use sample data from a dental practice.",
    problem:
      "Finance teams couldn’t reconcile past, present and projected cash positions in one view. Wide monthly tables made it hard to tell actuals from forecasts, and statement preparation spanned several disconnected steps.",
    contribution: [
      "Table UX for wide, time-based financial data",
      "Planning and statement-preparation workflows",
      "Chart and table pairing",
      "Visual design",
    ],
    decisions: [
      {
        title: "Make time visible in the table",
        body: "Months are grouped under “What has happened”, “What is happening” and “What will happen”, with a subtle tint for each band. Users can read a row from actuals into forecast without checking column headers.",
        shot: S.cfInflow,
      },
      {
        title: "Steppers for multi-stage work",
        body: "Planning runs from planned cash inflow to planned outflow to the closing projected cash flow. Statement preparation runs from transactions to review, to preparing, to reviewing the statement. A stepper at the top shows where the user is and what comes next.",
      },
      {
        title: "Pair the chart with the numbers",
        body: "A monthly chart sits above the statement for shape and trend, and the table below holds the detail. Tabs separate operating, investing and financing activities, tax and transfers. Groups collapse to their subtotals, and the selected month stays highlighted across the table.",
        shot: S.cfStatement,
      },
    ],
    goal: "Faster monthly close and clearer forecast visibility for finance teams.",
  },
];

export interface MoreProject {
  title: string;
  description: string;
  shot: Shot;
}

export const moreProjects: MoreProject[] = [
  {
    title: "Gather Nexus",
    description: "Module hub for group financial reporting, intercompany control, planning and multi-entity setup.",
    shot: shot("gather-nexus-hub", 1200, 741, "Gather Nexus module hub grouped by reporting, control, planning, entities and users"),
  },
  {
    title: "Ocean AI",
    description: "Conversational home for an AI trade-operations tool. Ask about inventory or upload invoices for extraction.",
    shot: shot("ocean-ai-home", 1200, 591, "Ocean AI home with a prompt field and invoice upload"),
  },
  {
    title: "WageWorks",
    description: "Payroll time activities: regular hours, overtime, shift differences and leave per employee.",
    shot: shot("wageworks-time", 1200, 675, "WageWorks time activities table per employee"),
  },
  {
    title: "PeakEaze",
    description: "Accounting practice dashboard tracking clients, VAT deadlines and documents pending review.",
    shot: shot("peakeaze-dashboard", 1200, 729, "PeakEaze client dashboard with VAT dates and quick actions"),
  },
  {
    title: "CarCollection",
    description: "Dark-theme admin for a dealership: inventory, sell-car and financing requests, and service bookings.",
    shot: shot("carcollection-admin", 1200, 731, "CarCollection admin dashboard with inventory metrics and recent activity"),
  },
];

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
