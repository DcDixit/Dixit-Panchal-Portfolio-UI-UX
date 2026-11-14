/**
 * Single source of truth for profile, contact and section copy.
 * Edit this file to update the site. No admin panel or local storage involved.
 *
 * Optional fields (linkedin, resumeUrl, siteUrl) are hidden automatically when empty,
 * so the site never shows a placeholder link.
 */
export const site = {
  name: "Dixit Panchal",
  role: "Senior UI/UX Designer",
  yearsExperience: "9+",
  location: "Ahmedabad, India",
  availability: "Open to full-time and contract roles · Remote",

  /** Production origin without trailing slash, e.g. "https://dixitpanchal.com". Used for canonical, Open Graph and sitemap URLs. */
  siteUrl: "" as string,

  contact: {
    email: "hello@dixit.design",
    /** Full profile URL, e.g. "https://www.linkedin.com/in/your-handle". Hidden when empty. */
    linkedin: "" as string,
    /** Path to a PDF in /public, e.g. "/dixit-panchal-resume.pdf". Hidden when empty. */
    resumeUrl: "" as string,
  },

  hero: {
    headline: "I design clear, usable products for complex SaaS and fintech workflows.",
    intro:
      "Senior UI/UX designer with 9+ years of experience. I turn data-heavy work in payments, financial reporting, payroll and hiring into interfaces people understand at a glance.",
  },

  about: {
    paragraphs: [
      "I specialise in B2B products where clarity under pressure matters: finance dashboards, payment setup, payroll and time tracking, and career tools. My work starts with understanding the business constraint, not the screen.",
      "I partner closely with product and engineering: framing the problem early, validating flows in prototype, and handing off annotated specs that developers can build from with confidence.",
    ],
    principles: [
      {
        title: "Evidence over assumption",
        body: "Decisions are backed by research, testing and real usage, not personal preference or the loudest voice in the room.",
      },
      {
        title: "Clarity at every scale",
        body: "Information architecture, content and interaction patterns that reduce cognitive load, especially in dense, multi-role products.",
      },
      {
        title: "Outcomes, not outputs",
        body: "Good UI matters when it moves the product forward. Success criteria are agreed up front and revisited after release.",
      },
    ],
  },

  expertise: {
    capabilities: [
      { title: "Product & UX design", items: ["Information architecture", "User flows", "Wireframes", "High-fidelity UI", "Interactive prototypes"] },
      { title: "Data-dense interfaces", items: ["Dashboards", "Editable data tables", "Multi-step workflows", "Onboarding flows"] },
      { title: "Design systems", items: ["Component libraries", "Design tokens", "Accessibility (WCAG)", "Responsive layouts"] },
      { title: "Research & collaboration", items: ["User interviews", "Usability testing", "Stakeholder workshops", "Developer handoff"] },
    ],
    domains: ["Fintech & payments", "Accounting & financial reporting", "Payroll & workforce", "Nonprofit grant finance", "Career & HR tech", "AI-assisted tools"],
    tools: ["Figma", "FigJam", "Miro", "Maze", "Notion", "Adobe XD", "Photoshop", "Illustrator"],
  },

  experience: [
    {
      period: "2021 to Present",
      role: "Senior Product Designer",
      org: "SaaS, fintech & enterprise products",
      summary:
        "Lead discovery-to-delivery on B2B platforms. Own information architecture, design systems and cross-functional alignment. Mentor junior designers.",
    },
    {
      period: "2018 to 2021",
      role: "Product Designer (UI/UX)",
      org: "Tech product teams",
      summary:
        "Moved into digital products: user research, wireframing, prototyping and usability testing for web and mobile apps.",
    },
    {
      period: "2015 to 2018",
      role: "Visual & Brand Designer",
      org: "Agencies & freelance",
      summary:
        "Built foundations in typography, layout and brand systems, learning to communicate clearly through visual hierarchy.",
    },
  ],
} as const;

export const seo = {
  title: `${site.name} · ${site.role}`,
  description: `${site.name} is a ${site.role} with ${site.yearsExperience} years of experience designing SaaS, fintech and data-heavy products. Case studies: Uptra, GoCardless for QuickBooks, CostAllocation Pro and cash-flow reporting.`,
  image: "/work/og/home.jpg",
};
