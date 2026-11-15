/**
 * Case studies and additional work.
 *
 * Content rules: describe only what the real product screens show and what is
 * known about the project. Leave a field out rather than inventing research,
 * metrics or client details.
 *
 * Annotation markers (x, y) are percentages of the screenshot's width and height,
 * placed at the edge of the element they point to.
 */

export interface Shot {
  /** Base name of the image in /public/work (generated as -1200.webp and -2400.webp). */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Marker {
  x: number;
  y: number;
  label: string;
}

export interface Decision {
  title: string;
  body: string;
  shot?: Shot;
  markers?: Marker[];
}

/** Fields carried over from the earlier site that the owner has not yet confirmed. */
export type UnconfirmedField = "role" | "timeline";

export interface CaseStudy {
  slug: string;
  title: string;
  /** One line used on the homepage and in the case-study header. */
  tagline: string;
  /** The problem in one short sentence, for scanning. */
  problemShort: string;
  category: string;
  platform: string;
  role: string;
  timeline: string;
  unconfirmed: UnconfirmedField[];
  cover: Shot;
  /** Tint behind screenshots (kept subtle). */
  stage: string;
  seoDescription: string;
  context: string;
  problem: string;
  contribution: string[];
  decisions: Decision[];
  goal: string;
}

const shot = (src: string, width: number, height: number, alt: string): Shot => ({ src, width, height, alt });
const mk = (x: number, y: number, label: string): Marker => ({ x, y, label });

const S = {
  uptraJobs: shot("uptra-jobs", 1200, 1203, "Uptra job listings with match scores, filter chips and apply actions"),
  uptraResume: shot("uptra-resume", 1200, 2360, "Uptra resume editor with profile, skills, experience, education and certificate sections"),
  uptraInterview: shot("uptra-interview", 1200, 830, "Uptra interview preparation with progress stats, topic tabs and suggested questions"),
  gcHome: shot("gocardless-home", 1200, 769, "GoCardless for QuickBooks home with revenue, mandate and payment status, and an automation checklist"),
  gcOnboarding: shot("gocardless-onboarding", 1200, 854, "GoCardless for QuickBooks onboarding checklist for collecting a first payment"),
  gcHelp: shot("gocardless-help", 802, 820, "Close-up of the Get started panel with a walkthrough video and frequently asked questions"),
  gcAutomation: shot("gocardless-automation", 1200, 754, "Close-up of the sidebar sync status and the automation checklist toggles"),
  capDashboard: shot("costallocation-dashboard", 1200, 675, "CostAllocation Pro dashboard with payroll by grant, hours against limits and monthly salary expense"),
  capTimeLogs: shot("costallocation-time-logs", 1200, 712, "CostAllocation Pro time log table with filters, inline hours and over-hours flags"),
  capHandoff: shot("costallocation-handoff", 1200, 207, "Close-up of the organisation selector with its developer comment"),
  cfInflow: shot("cashflow-planned-inflow", 1200, 675, "Planned cash inflow table grouped into past, current and projected months"),
  cfSteppers: shot("cashflow-steppers", 1200, 173, "The two steppers: planning cash flow and preparing the cash flow statement"),
  cfStatement: shot("cashflow-statement", 1200, 694, "Cash flow statement preparation with monthly chart, category tabs and line items"),
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "uptra",
    title: "Uptra",
    tagline: "An AI career platform that brings job discovery, resume building and interview prep into one workspace.",
    problemShort: "Job seekers couldn’t prioritise roles or prepare with confidence across fragmented tools.",
    category: "Career & HR tech",
    platform: "Web app",
    role: "Lead Product Designer",
    timeline: "About 14 weeks",
    unconfirmed: ["role"],
    cover: S.uptraInterview,
    stage: "#E9E8F4",
    seoDescription:
      "Uptra case study by Dixit Panchal: designing job matching, structured resume editing and guided interview preparation for an AI career platform.",
    context:
      "Uptra is an AI-assisted career platform. Candidates use it to find relevant roles, maintain their resume and prepare for interviews. The product brings these three tasks into one workspace.",
    problem:
      "Job seekers struggled to prioritise roles and prepare with confidence because the information they needed was spread across fragmented tools.",
    contribution: [
      "Information architecture connecting jobs, resume, profile and interview prep",
      "Job listing and match-score patterns",
      "Structured resume editor",
      "Interview preparation workspace",
      "High-fidelity UI",
    ],
    decisions: [
      {
        title: "Lead every listing with fit, not just the title",
        body: "Each job card puts a match score and two key reasons (compensation and visa sponsorship) next to the role. Role facts sit in a consistent grid, so candidates compare cards by scanning one column at a time. Active filters stay visible as chips, and “Not interested” lets people curate the list instead of scrolling past noise.",
        shot: S.uptraJobs,
        markers: [
          mk(72.6, 18, "Match score with the two reasons that matter"),
          mk(24, 22.4, "Consistent grid of role facts"),
          mk(24.4, 7.3, "Active filters stay visible as chips"),
          mk(74.5, 24.4, "“Not interested” to curate the list"),
        ],
      },
      {
        title: "Treat the resume as structured data",
        body: "Instead of a free-form document, the resume is broken into repeatable, editable blocks: profile summary, skills as chips, experience, education, projects and certificates. Timeline markers make the order of experience obvious, and export and edit actions stay pinned at the top.",
        shot: S.uptraResume,
        markers: [
          mk(84, 3.8, "Export and edit pinned at the top"),
          mk(24, 19.5, "Skills as editable chips"),
          mk(27, 25, "Timeline markers order experience"),
          mk(86, 23, "Repeatable blocks per section"),
        ],
      },
      {
        title: "Make interview prep a guided study space",
        body: "Preparation opens with progress, question count, categories and study time, so candidates always know where they stand. Tabs separate questions, company insights, developments and salary expectations. Each suggested question explains “why ask this”, tying it back to the company and the candidate’s own background.",
        shot: S.uptraInterview,
        markers: [
          mk(24, 14.6, "Progress, questions, categories and study time"),
          mk(77.5, 26.8, "Topic tabs, including suggested questions"),
          mk(25.8, 47.3, "“Why ask this” on every question"),
        ],
      },
    ],
    goal: "Help candidates shortlist roles faster and walk into interviews prepared, with every step of the search in one coherent product.",
  },
  {
    slug: "gocardless-quickbooks",
    title: "GoCardless for QuickBooks",
    tagline: "A QuickBooks marketplace app that takes small businesses from setup to their first bank payment, then automates the rest.",
    problemShort: "Small businesses needed to collect payments through QuickBooks without complex setup.",
    category: "Fintech & payments",
    platform: "Web app · QuickBooks integration",
    role: "Senior Product Designer",
    timeline: "About 10 weeks",
    unconfirmed: ["role"],
    cover: S.gcHome,
    stage: "#F1EFD9",
    seoDescription:
      "GoCardless for QuickBooks case study by Dixit Panchal: a guided onboarding path to the first payment and a home dashboard for payouts, mandates and automation.",
    context:
      "GoCardless for QuickBooks lets small businesses collect bank payments against their QuickBooks invoices. Two systems need to stay in sync: payments in GoCardless and invoices in QuickBooks.",
    problem:
      "Small businesses needed to connect payment collection to QuickBooks without complex configuration. Setup involves business verification, payment methods and customer mandates, all before the first payment.",
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
        markers: [
          mk(46, 8.5, "Verification stays visible until done"),
          mk(29, 41.9, "Only the current step expands, with one action"),
          mk(26, 68.7, "Ordered steps to the first payment"),
        ],
      },
      {
        title: "Answer questions where they come up",
        body: "A “Get started” panel sits beside the checklist with a short walkthrough video and common questions, such as why GoCardless isn’t showing on invoices, or how to talk to customers about bank payments. Help stays in context instead of in a separate help centre.",
        shot: S.gcHelp,
        markers: [mk(50, 38, "Short walkthrough video"), mk(5, 76, "Common questions answered in context")],
      },
      {
        title: "Put exceptions next to revenue",
        body: "The home screen pairs payout and pending totals with the things that need attention: unmatched mandates, inactive mandates, failed payments and chargebacks. “Action required” is written as a link, not just shown as a number, so problems lead straight to a fix.",
        shot: S.gcHome,
        markers: [
          mk(22.3, 29, "Payout and pending totals"),
          mk(61.6, 27.2, "“Action required” links to the fix"),
          mk(79.6, 38.6, "Exceptions: failed payments, chargebacks"),
        ],
      },
      {
        title: "Plain-language automation",
        body: "Automation is a short list of toggles written as outcomes: email a mandate to every new customer, create payments on the invoice due date, reconcile payments in QuickBooks. Sync status and the last sync time stay visible in the sidebar, with direct links to both dashboards.",
        shot: S.gcAutomation,
        markers: [
          mk(20.5, 7.5, "Sync status with last sync time"),
          mk(31.5, 82, "Automation as simple toggles"),
          mk(50, 60.7, "Each toggle written as an outcome"),
          mk(19, 75, "Direct links to both dashboards"),
        ],
      },
    ],
    goal: "Give small businesses a clear path to their first payment and reduce drop-off during setup.",
  },
  {
    slug: "costallocation-pro",
    title: "CostAllocation Pro",
    tagline: "Grant cost allocation for nonprofit finance teams, with payroll analytics, time logging and multi-organisation switching.",
    problemShort: "Finance admins tracked hours, grants and allocations across organisations in spreadsheets.",
    category: "Nonprofit finance",
    platform: "Web app",
    role: "Lead Product Designer",
    timeline: "About 16 weeks",
    unconfirmed: ["role"],
    cover: S.capDashboard,
    stage: "#E6EBE2",
    seoDescription:
      "CostAllocation Pro case study by Dixit Panchal: replacing spreadsheet-based grant cost allocation with a dashboard and an editable, auditable time-log workflow.",
    context:
      "Nonprofits funded by grants must allocate payroll costs to the grants and programmes that fund them. CostAllocation Pro gives finance admins one place to track hours, payroll and allocations across entities.",
    problem:
      "Finance admins were juggling spreadsheets to track hours, grants and cost allocations across organisations. Reconciliation was manual.",
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
        body: "Four panels cover the core admin questions: year-to-date payroll by grant, each employee’s hours against their limit, salary expense by month, and a monthly allocation summary that links straight to the detail. A calm, muted palette keeps attention on the numbers.",
        shot: S.capDashboard,
        markers: [
          mk(31.7, 17.5, "Year-to-date payroll by grant"),
          mk(75.1, 17.5, "Employee hours against limits"),
          mk(28.1, 70.5, "Salary expense by month"),
          mk(73.3, 74.5, "Monthly allocations link to detail"),
        ],
      },
      {
        title: "An editable time log that flags problems",
        body: "Time logs are an editable table rather than a read-only report. Admins filter by employee, customer and class, step through months, and edit hours inline. Each row can be added to, split or deleted. Employees over their hours are flagged in red with the overage amount, and an “Hours over” filter isolates them.",
        shot: S.capTimeLogs,
        markers: [
          mk(23.6, 24.6, "Filter by employee, customer and class"),
          mk(27.8, 44.4, "Over-hours flagged in red with the amount"),
          mk(77.8, 30.6, "Hours edited inline"),
          mk(87.4, 30.6, "Add, split or delete per row"),
        ],
      },
      {
        title: "Annotated for handoff",
        body: "Screens carry developer notes where behaviour isn’t obvious from the UI. For example, the organisation selector lets admins switch between companies without logging out. Sync status and export options are part of the design.",
        shot: S.capHandoff,
        markers: [mk(20.5, 82.5, "Developer note explains the behaviour"), mk(56, 24.6, "Organisation switcher")],
      },
    ],
    goal: "Replace spreadsheet reconciliation with an auditable workflow and make grant compliance visible at a glance.",
  },
  {
    slug: "cash-flow-reporting",
    title: "Cash Flow Reporting",
    tagline: "Forecasting and cash-flow statement tools that show past, current and projected cash positions in one view.",
    problemShort: "Finance teams couldn’t see past, present and projected cash positions in one view.",
    category: "Financial reporting",
    platform: "Web app",
    role: "Senior Product Designer",
    timeline: "About 12 weeks",
    unconfirmed: ["role"],
    cover: S.cfInflow,
    stage: "#E8E6F3",
    seoDescription:
      "Cash flow reporting case study by Dixit Panchal: phased tables, stepper-led workflows and chart-and-table pairings for forecasting and cash-flow statements.",
    context:
      "A financial planning product for planning cash inflows and outflows and preparing cash-flow statements. The screens shown use sample data from a dental practice.",
    problem:
      "Finance teams couldn’t reconcile past, present and projected cash positions in one view.",
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
        markers: [mk(26.4, 22.6, "What has happened"), mk(58.6, 22.6, "What is happening"), mk(75.4, 22.6, "What will happen")],
      },
      {
        title: "Steppers for multi-stage work",
        body: "Planning runs from planned cash inflow to planned outflow to the closing projected cash flow. Statement preparation runs from transactions to review, to preparing, to reviewing the statement. A stepper at the top shows where the user is and what comes next.",
        shot: S.cfSteppers,
        markers: [mk(23.1, 18.5, "Planning: inflow, outflow, closing position"), mk(49.9, 73.8, "Statement: review, prepare, review")],
      },
      {
        title: "Pair the chart with the numbers",
        body: "A monthly chart sits above the statement for shape and trend, and the table below holds the detail. Tabs separate operating, investing and financing activities, tax and transfers. Groups collapse to their subtotals, and the selected month stays highlighted across the table.",
        shot: S.cfStatement,
        markers: [
          mk(49, 28.7, "Monthly chart for shape and trend"),
          mk(73.4, 47.6, "Tabs by activity type"),
          mk(7.9, 52.4, "Groups collapse to subtotals"),
          mk(86, 38.5, "Selected month highlighted"),
        ],
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

/** Supporting graphic design work, shown after all UI/UX work. Extracted from the owner's graphic portfolio PDF. */
export interface GraphicPiece {
  title: string;
  kind: string;
  description: string;
  /** Square crop for the grid. */
  thumb: Shot;
  /** Full presentation board for the lightbox. */
  full: Shot;
}

const gd = (name: string, title: string, kind: string, description: string, fullHeight: number, fullWidth = 1000): GraphicPiece => ({
  title,
  kind,
  description,
  thumb: shot(`graphic/${name}`, 800, 800, `${title}: ${kind.toLowerCase()}`),
  full: shot(`graphic/${name}-full`, fullWidth, fullHeight, `${title} presentation board`),
});

export const graphicWork: GraphicPiece[] = [
  gd("social-art", "Social Art", "Brand identity", "Logo, signage and website applications.", 2481),
  gd("hotel-interiors", "Hotel Interiors", "Print", "Flyer for a custom hotel furniture and joinery maker.", 2840),
  gd("company-formation", "Company Formation", "Editorial print", "Multi-page brochure for a business setup consultancy.", 3320),
  gd("zondaro", "Zondaro", "Exhibition", "Booth walls, roll-ups and counter, through to the built stand.", 2390, 960),
  gd("fireflies", "We Are All Fireflies", "Book cover", "Cover design and typography.", 1000),
];

export function getCaseStudy(slug: string | undefined): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Unconfirmed details are shown with a flag in development and hidden in production builds. */
export function isShown(study: CaseStudy, field: UnconfirmedField): boolean {
  return import.meta.env.DEV || !study.unconfirmed.includes(field);
}
