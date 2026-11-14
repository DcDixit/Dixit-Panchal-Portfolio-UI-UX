/**
 * Page metadata shared by the browser (useMeta) and the build step (vite.config.ts),
 * which writes a static HTML file per case study so LinkedIn/Slack previews are correct.
 * Keep this file free of DOM and React imports.
 */
import { caseStudies, getCaseStudy } from "../content/projects";
import { seo, site } from "../content/site";

export interface PageMeta {
  title: string;
  description: string;
  path: string;
  image: string;
  type: "website" | "article";
}

export const homeMeta: PageMeta = {
  title: seo.title,
  description: seo.description,
  path: "/",
  image: seo.image,
  type: "website",
};

export function caseStudyMeta(slug: string): PageMeta | undefined {
  const c = getCaseStudy(slug);
  if (!c) return undefined;
  return {
    title: `${c.title} · Case study · ${site.name}`,
    description: c.seoDescription,
    path: `/work/${c.slug}`,
    image: `/work/og/${c.cover.src}.jpg`,
    type: "article",
  };
}

export const allPages: PageMeta[] = [homeMeta, ...caseStudies.map((c) => caseStudyMeta(c.slug)!)];

/** Absolute URL when siteUrl is configured; otherwise the root-relative path. */
export function absolute(path: string): string {
  return site.siteUrl ? `${site.siteUrl.replace(/\/$/, "")}${path}` : path;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Head tags for static HTML. */
export function metaTagsHtml(m: PageMeta): string {
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    site.siteUrl ? `<link rel="canonical" href="${esc(absolute(m.path))}" />` : "",
    `<meta property="og:type" content="${m.type}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    site.siteUrl ? `<meta property="og:url" content="${esc(absolute(m.path))}" />` : "",
    `<meta property="og:image" content="${esc(absolute(m.image))}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${esc(absolute(m.image))}" />`,
  ];
  return tags.filter(Boolean).join("\n    ");
}
