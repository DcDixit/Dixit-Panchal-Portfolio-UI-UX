import { PROJECT_LISTINGS } from "./projectCatalog";
import type { ProjectPresentation, ShowcaseKind } from "./projectCatalog";

/** Portfolio CMS row — drives Projects page (case studies vs visual showcases). */
export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  isFeaturedHero?: boolean;
  client?: string;
  year?: string;
  link?: string;
  galleryImages?: string[];
  toolsUsed?: string[];
  caseStudyUrl?: string;
  enabled: boolean;
  order: number;
  presentation: ProjectPresentation;
  showcaseKind?: ShowcaseKind;
  impact?: string;
  role?: string;
  timeline?: string;
  problem?: string;
  solution?: string;
  process?: string;
  /** Slug for `#case-study/<slug>` when presentation is case-study; defaults to project id when empty. */
  caseStudyId?: string;
}

export function defaultPortfolioProjects(): PortfolioProject[] {
  return PROJECT_LISTINGS.map((listing, idx) => ({
    id: listing.id,
    title: listing.title,
    category: listing.category,
    description: listing.summary,
    image: listing.imageUrl,
    tags: [listing.category],
    featured: listing.featured,
    isFeaturedHero: listing.id === "truckflow",
    presentation: listing.presentation,
    showcaseKind: listing.showcaseKind,
    impact: listing.impact,
    role: listing.role,
    timeline: listing.timeline,
    problem: listing.problem,
    solution: listing.solution,
    process: listing.process,
    galleryImages: listing.galleryImages ? [...listing.galleryImages] : [],
    toolsUsed: [...listing.tools],
    caseStudyUrl: "",
    caseStudyId: listing.presentation === "case-study" ? listing.id : undefined,
    enabled: true,
    order: idx + 1,
    client: "",
    year: "",
    link: "",
  }));
}

function coercePortfolioProject(raw: unknown): PortfolioProject {
  const r = (typeof raw === "object" && raw !== null ? raw : {}) as Record<string, unknown>;
  const id = String(r.id ?? "");
  const c = PROJECT_LISTINGS.find((l) => l.id === id);
  const tagArr = Array.isArray(r.tags) ? (r.tags as string[]) : [];
  const galleryArr = Array.isArray(r.galleryImages) ? (r.galleryImages as string[]) : undefined;
  const toolsArr = Array.isArray(r.toolsUsed) ? (r.toolsUsed as string[]) : undefined;

  const presentationRaw = r.presentation;
  const presentation: ProjectPresentation =
    presentationRaw === "case-study" || presentationRaw === "showcase"
      ? presentationRaw
      : c?.presentation ?? "showcase";

  const showcaseRaw = r.showcaseKind;
  const showcaseKind: ShowcaseKind | undefined =
    showcaseRaw === "branding" ||
    showcaseRaw === "saas" ||
    showcaseRaw === "ecommerce" ||
    showcaseRaw === "dashboard" ||
    showcaseRaw === "mobile" ||
    showcaseRaw === "web"
      ? showcaseRaw
      : c?.showcaseKind;

  const caseStudyIdRaw = r.caseStudyId;
  const caseStudyId =
    presentation === "case-study"
      ? typeof caseStudyIdRaw === "string" && caseStudyIdRaw.trim()
        ? caseStudyIdRaw.trim()
        : id
      : undefined;

  const orderNum =
    typeof r.order === "number"
      ? r.order
      : typeof r.order === "string"
        ? Number.parseInt(r.order, 10) || 0
        : 0;

  return {
    id: id || `project-${Date.now()}`,
    title: typeof r.title === "string" ? r.title : c?.title ?? "",
    category: typeof r.category === "string" ? r.category : c?.category ?? "",
    description: typeof r.description === "string" ? r.description : c?.summary ?? "",
    image: typeof r.image === "string" ? r.image : c?.imageUrl ?? "",
    tags: tagArr.length ? tagArr : c?.category ? [c.category] : [],
    featured: typeof r.featured === "boolean" ? r.featured : c?.featured ?? false,
    isFeaturedHero: Boolean(r.isFeaturedHero),
    client: typeof r.client === "string" ? r.client : "",
    year: typeof r.year === "string" ? r.year : "",
    link: typeof r.link === "string" ? r.link : "",
    galleryImages:
      galleryArr !== undefined ? galleryArr : c?.galleryImages ? [...c.galleryImages] : [],
    toolsUsed: toolsArr !== undefined ? toolsArr : c?.tools ? [...c.tools] : [],
    caseStudyUrl: typeof r.caseStudyUrl === "string" ? r.caseStudyUrl : "",
    enabled: r.enabled !== false,
    order: orderNum,
    presentation,
    showcaseKind,
    impact: typeof r.impact === "string" ? r.impact : c?.impact ?? "",
    role: typeof r.role === "string" ? r.role : c?.role ?? "",
    timeline: typeof r.timeline === "string" ? r.timeline : c?.timeline ?? "",
    problem: typeof r.problem === "string" ? r.problem : c?.problem ?? "",
    solution: typeof r.solution === "string" ? r.solution : c?.solution ?? "",
    process: typeof r.process === "string" ? r.process : c?.process ?? "",
    caseStudyId,
  };
}

function usesPlaceholderMedia(url: string): boolean {
  return /images\.unsplash\.com|example\.com/i.test(url);
}

const LEGACY_SHOWCASE_IDS = new Set([
  "brandcraft",
  "healthcare-app",
  "restaurant-booking",
  "saas-dashboard",
  "corporate-website",
]);

function shouldRefreshShowcaseProjects(projects: PortfolioProject[]): boolean {
  return projects.some(
    (p) =>
      p.presentation === "showcase" &&
      (LEGACY_SHOWCASE_IDS.has(p.id) ||
        usesPlaceholderMedia(p.image) ||
        p.galleryImages?.some((url) => usesPlaceholderMedia(url))),
  );
}

function refreshShowcaseProjects(projects: PortfolioProject[]): PortfolioProject[] {
  const catalogShowcase = defaultPortfolioProjects().filter((p) => p.presentation === "showcase");
  const nonShowcase = projects.filter((p) => p.presentation !== "showcase");
  const maxOrder = projects.reduce((max, p) => Math.max(max, p.order), 0);
  const refreshed = catalogShowcase.map((p, i) => ({ ...p, order: maxOrder + i + 1 }));
  return [...nonShowcase, ...refreshed];
}

function migrateShowcaseProject(project: PortfolioProject): PortfolioProject {
  const catalog = PROJECT_LISTINGS.find((l) => l.id === project.id);
  if (!catalog || project.presentation !== "showcase") {
    return project;
  }

  const galleryHasPlaceholder =
    !project.galleryImages?.length ||
    project.galleryImages.some((url) => usesPlaceholderMedia(url));
  const imageIsPlaceholder = !project.image || usesPlaceholderMedia(project.image);

  if (!galleryHasPlaceholder && !imageIsPlaceholder) {
    return project;
  }

  const galleryImages = catalog.galleryImages?.length ? [...catalog.galleryImages] : project.galleryImages;

  return {
    ...project,
    title: catalog.title,
    category: catalog.category,
    description: catalog.summary,
    image: catalog.imageUrl,
    showcaseKind: catalog.showcaseKind,
    galleryImages: galleryImages ?? [],
    impact: catalog.impact,
    role: catalog.role,
    timeline: catalog.timeline,
    problem: catalog.problem,
    solution: catalog.solution,
    process: catalog.process,
    toolsUsed: [...catalog.tools],
  };
}

export function normalizePortfolioData(data: PortfolioData): PortfolioData {
  const coerced = data.projects.map((p) => coercePortfolioProject(p));
  const projects = shouldRefreshShowcaseProjects(coerced)
    ? refreshShowcaseProjects(coerced)
    : coerced.map((p) => migrateShowcaseProject(p));

  return {
    ...data,
    projects,
  };
}

// Default portfolio data structure
export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    bio: string;
    resumeUrl: string;
    profileImage: string;
    yearsOfExperience: string;
  };
  hero: {
    statusText: string;
    headline: string;
    subheadline: string;
    description: string;
  };
  stats: {
    projectsCompleted: string;
    happyClients: string;
    awards: string;
    experience: string;
  };
  skills: {
    id: string;
    category: string;
    items: string[];
    icon: string;
    enabled: boolean;
    order: number;
    description?: string;
  }[];
  experience: {
    id: string;
    role: string;
    company: string;
    period: string;
    location: string;
    description: string;
    achievements: string[];
  }[];
  projects: PortfolioProject[];
  caseStudies: {
    id: string;
    title: string;
    subtitle: string;
    category: string;
    image: string;
    description: string;
    challenge: string;
    solution: string;
    results: string[];
    tags: string[];
  }[];
  industries: {
    id: string;
    title: string;
    description: string;
    projectCount: string;
    icon: string;
  }[];
  testimonials: {
    id: string;
    name: string;
    role: string;
    company: string;
    content: string;
    avatar: string;
  }[];
  aboutPage: {
    title: string;
    subtitle: string;
    description: string;
    bannerImage: string;
    profileImage: string;
    highlights: {
      id: string;
      title: string;
      value: string;
      icon: string;
      enabled: boolean;
    }[];
    contentBlocks: {
      id: string;
      title: string;
      content: string;
      enabled: boolean;
      order: number;
    }[];
  };
  mediaLibrary: {
    id: string;
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedAt: string;
    usedIn: string[];
  }[];
  pages: {
    home: { enabled: boolean; seoTitle: string; seoDescription: string };
    about: { enabled: boolean; seoTitle: string; seoDescription: string };
    skills: { enabled: boolean; seoTitle: string; seoDescription: string };
    projects: { enabled: boolean; seoTitle: string; seoDescription: string };
    caseStudy: { enabled: boolean; seoTitle: string; seoDescription: string };
    contact: { enabled: boolean; seoTitle: string; seoDescription: string };
  };
}

export const defaultPortfolioData: PortfolioData = {
  personal: {
    name: "Dixit Panchal",
    title: "Senior UI/UX & Graphic Designer",
    location: "Ahmedabad, India",
    email: "hello@dixitpanchal.com",
    phone: "+91 98765 43210",
    bio: "Passionate designer with 9+ years of experience creating user-centric digital experiences. Specialized in mobile app design, web interfaces, and brand identity systems.",
    resumeUrl: "",
    profileImage: "",
    yearsOfExperience: "9+"
  },
  hero: {
    statusText: "Open to New Opportunities",
    headline: "Dixit Panchal",
    subheadline: "Senior UI/UX Designer",
    description: "Crafting elegant digital experiences for mobile apps, web platforms, and brand identities. Currently seeking new opportunities to create impactful designs with innovative teams."
  },
  stats: {
    projectsCompleted: "200+",
    happyClients: "50+",
    awards: "15+",
    experience: "9+"
  },
  skills: [
    {
      id: "1",
      category: "UI/UX Design",
      items: ["User Research", "Wireframing", "Prototyping", "User Testing", "Information Architecture"],
      icon: "Eye",
      enabled: true,
      order: 1,
      description: "Designing user interfaces and experiences that are intuitive and user-friendly."
    },
    {
      id: "2",
      category: "Design Tools",
      items: ["Figma", "Adobe XD", "Sketch", "InVision", "Principle"],
      icon: "Palette",
      enabled: true,
      order: 2,
      description: "Proficient in using various design tools to create high-fidelity prototypes."
    },
    {
      id: "3",
      category: "Visual Design",
      items: ["Typography", "Color Theory", "Layout Design", "Icon Design", "Illustration"],
      icon: "Sparkles",
      enabled: true,
      order: 3,
      description: "Creating visually appealing designs that enhance user experience."
    },
    {
      id: "4",
      category: "Graphic Design",
      items: ["Adobe Photoshop", "Adobe Illustrator", "Brand Identity", "Print Design", "Marketing Materials"],
      icon: "PenTool",
      enabled: true,
      order: 4,
      description: "Designing brand identities and marketing materials that resonate with the target audience."
    }
  ],
  experience: [
    {
      id: "1",
      role: "Senior UI/UX Designer",
      company: "Tech Company",
      period: "2020 - Present",
      location: "Ahmedabad, India",
      description: "Leading design initiatives for mobile and web applications",
      achievements: [
        "Led design for 15+ successful product launches",
        "Established design system used across 20+ projects",
        "Mentored junior designers and conducted workshops"
      ]
    }
  ],
  projects: defaultPortfolioProjects(),
  caseStudies: [
    {
      id: "1",
      title: "E-Commerce Platform Redesign",
      subtitle: "Increasing conversion rates through user-centered design",
      category: "Web Design",
      image: "",
      description: "A comprehensive redesign of an e-commerce platform to improve user experience and increase conversion rates.",
      challenge: "The existing platform had low conversion rates and high cart abandonment.",
      solution: "Implemented user research, simplified checkout flow, and created a modern design system.",
      results: [
        "45% increase in conversion rate",
        "30% reduction in cart abandonment",
        "25% increase in average order value"
      ],
      tags: ["E-Commerce", "UX Research", "Design System"]
    }
  ],
  industries: [
    {
      id: "1",
      title: "Automotive Industry",
      description: "User interfaces for connected vehicles, fleet management systems, and automotive SaaS platforms.",
      projectCount: "12+ Projects",
      icon: "Car"
    },
    {
      id: "2",
      title: "SaaS Products",
      description: "Scalable design systems and interfaces for B2B and B2C software-as-a-service applications.",
      projectCount: "25+ Projects",
      icon: "Layers"
    },
    {
      id: "3",
      title: "Healthcare",
      description: "Patient portals, medical dashboards, and healthcare management systems with HIPAA compliance.",
      projectCount: "8+ Projects",
      icon: "Heart"
    },
    {
      id: "4",
      title: "Mobile Applications",
      description: "Native iOS and Android app designs focusing on usability and engagement.",
      projectCount: "30+ Projects",
      icon: "Smartphone"
    }
  ],
  testimonials: [
    {
      id: "1",
      name: "John Doe",
      role: "Product Manager",
      company: "Tech Corp",
      content: "Working with Dixit was an absolute pleasure. His attention to detail and user-centric approach resulted in a product our users love.",
      avatar: ""
    }
  ],
  aboutPage: {
    title: "About Dixit Panchal",
    subtitle: "Senior UI/UX & Graphic Designer",
    description: "Dixit Panchal is a passionate designer with 9+ years of experience creating user-centric digital experiences. Specialized in mobile app design, web interfaces, and brand identity systems.",
    bannerImage: "banner.jpg",
    profileImage: "profile.jpg",
    highlights: [
      {
        id: "1",
        title: "Years of Experience",
        value: "9+",
        icon: "Calendar",
        enabled: true
      },
      {
        id: "2",
        title: "Projects Completed",
        value: "200+",
        icon: "Folder",
        enabled: true
      },
      {
        id: "3",
        title: "Happy Clients",
        value: "50+",
        icon: "Smile",
        enabled: true
      },
      {
        id: "4",
        title: "Awards",
        value: "15+",
        icon: "Trophy",
        enabled: true
      }
    ],
    contentBlocks: [
      {
        id: "1",
        title: "Design Philosophy",
        content: "My design philosophy is centered around creating intuitive and user-friendly experiences. I believe in the power of design to solve problems and enhance user satisfaction.",
        enabled: true,
        order: 1
      },
      {
        id: "2",
        title: "Design Process",
        content: "My design process involves user research, wireframing, prototyping, user testing, and information architecture to create high-quality designs.",
        enabled: true,
        order: 2
      }
    ]
  },
  mediaLibrary: [
    {
      id: "1",
      name: "banner.jpg",
      url: "https://example.com/banner.jpg",
      type: "image",
      size: 1024,
      uploadedAt: "2023-10-01T12:00:00Z",
      usedIn: ["aboutPage.bannerImage"]
    },
    {
      id: "2",
      name: "profile.jpg",
      url: "https://example.com/profile.jpg",
      type: "image",
      size: 512,
      uploadedAt: "2023-10-01T12:00:00Z",
      usedIn: ["aboutPage.profileImage"]
    }
  ],
  pages: {
    home: { enabled: true, seoTitle: "Home", seoDescription: "Welcome to Dixit Panchal's portfolio" },
    about: { enabled: true, seoTitle: "About", seoDescription: "Learn more about Dixit Panchal" },
    skills: { enabled: true, seoTitle: "Skills", seoDescription: "Explore Dixit Panchal's design skills" },
    projects: { enabled: true, seoTitle: "Projects", seoDescription: "View Dixit Panchal's design projects" },
    caseStudy: { enabled: true, seoTitle: "Case Study", seoDescription: "Read Dixit Panchal's case studies" },
    contact: { enabled: true, seoTitle: "Contact", seoDescription: "Get in touch with Dixit Panchal" }
  }
};

// Local storage key
export const PORTFOLIO_DATA_KEY = "portfolio_data";
export const ADMIN_PASSWORD_KEY = "portfolio_admin_password";

// Helper functions
export function getPortfolioData(): PortfolioData {
  try {
    const stored = localStorage.getItem(PORTFOLIO_DATA_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as PortfolioData;
      return normalizePortfolioData(parsed);
    }
  } catch (error) {
    console.error("Error loading portfolio data:", error);
  }
  return normalizePortfolioData(defaultPortfolioData);
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    localStorage.setItem(PORTFOLIO_DATA_KEY, JSON.stringify(normalizePortfolioData(data)));
  } catch (error) {
    console.error("Error saving portfolio data:", error);
  }
}

export function resetPortfolioData(): void {
  localStorage.removeItem(PORTFOLIO_DATA_KEY);
}

export function exportPortfolioData(): string {
  const data = getPortfolioData();
  return JSON.stringify(data, null, 2);
}

export function importPortfolioData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString) as PortfolioData;
    savePortfolioData(data);
    return true;
  } catch (error) {
    console.error("Error importing portfolio data:", error);
    return false;
  }
}