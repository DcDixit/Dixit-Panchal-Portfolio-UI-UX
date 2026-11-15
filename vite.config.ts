import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import { site } from "./src/content/site";
import { absolute, allPages, homeMeta, metaTagsHtml } from "./src/lib/pageMeta";

const META_BLOCK = /<!--meta:start-->[\s\S]*?<!--meta:end-->/;
const block = (html: string) => `<!--meta:start-->\n    ${html}\n    <!--meta:end-->`;

/**
 * Static SEO output without a framework:
 * - injects home metadata into index.html
 * - writes dist/work/<slug>/index.html with page-specific title, description and Open Graph tags,
 *   so shared links preview correctly and refreshes work on any static host
 * - writes 404.html (SPA fallback), robots.txt and sitemap.xml
 */
function seoPages(): Plugin {
  let outDir = "dist";
  return {
    name: "portfolio-seo-pages",
    configResolved(c) {
      outDir = path.resolve(c.root, c.build.outDir);
    },
    transformIndexHtml(html) {
      return html.replace(META_BLOCK, block(metaTagsHtml(homeMeta)));
    },
    closeBundle() {
      const indexPath = path.join(outDir, "index.html");
      let index: string;
      try {
        index = readFileSync(indexPath, "utf8");
      } catch {
        return; // not a client build
      }

      for (const page of allPages) {
        if (page.path === "/") continue;
        const html = index.replace(META_BLOCK, block(metaTagsHtml(page)));
        const dir = path.join(outDir, page.path);
        mkdirSync(dir, { recursive: true });
        // Both forms, so /work/<slug> and /work/<slug>/ resolve on any static host.
        writeFileSync(path.join(dir, "index.html"), html);
        writeFileSync(`${dir}.html`, html);
      }

      writeFileSync(
        path.join(outDir, "404.html"),
        index.replace(META_BLOCK, block(`<title>Page not found · ${site.name}</title>\n    <meta name="robots" content="noindex" />`)),
      );

      const robots = ["User-agent: *", "Allow: /"];
      if (site.siteUrl) {
        const urls = allPages
          .map((p) => `  <url><loc>${absolute(p.path)}</loc><changefreq>monthly</changefreq></url>`)
          .join("\n");
        writeFileSync(
          path.join(outDir, "sitemap.xml"),
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
        );
        robots.push(`Sitemap: ${absolute("/sitemap.xml")}`);
      } else {
        this.warn("site.siteUrl is empty, so sitemap.xml, canonical URLs and absolute og:image URLs were skipped. It is set automatically on Vercel; elsewhere, build with SITE_URL=https://your-domain.");
      }
      writeFileSync(path.join(outDir, "robots.txt"), robots.join("\n") + "\n");
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPages()],
  // Same origin in the browser bundle as in the generated HTML (see resolveSiteUrl in site.ts).
  // Build year is fixed at build time so pre-rendered and hydrated footers always match.
  define: {
    "import.meta.env.VITE_SITE_URL": JSON.stringify(site.siteUrl),
    "import.meta.env.VITE_BUILD_YEAR": JSON.stringify(String(new Date().getFullYear())),
  },
});
