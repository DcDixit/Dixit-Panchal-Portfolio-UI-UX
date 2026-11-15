# Dixit Panchal · Portfolio

React + Vite + Tailwind CSS v4. Animations use `motion`; routing uses `react-router`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Type-check, build to `dist/`, write per-case-study HTML, 404.html, robots.txt and sitemap.xml, then pre-render every page's content into its HTML (`scripts/prerender.mjs`) |
| `npm run preview` | Serve the production build locally |
| `npm run check` | TypeScript + ESLint |

## Editing content

All content lives in two files. There is no CMS or admin panel.

- `src/content/site.ts`: name, contact details, hero, about, expertise, experience, site URL
- `src/content/projects.ts`: the four case studies and the "More projects" gallery

Empty optional fields (`linkedin`, `resumeUrl`) are hidden automatically. To add a résumé, put the PDF in `public/` and set `resumeUrl` to its path, for example `/dixit-panchal-resume.pdf`.

`siteUrl` is resolved at build time. On Vercel it is the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), so nothing needs setting. Elsewhere, or after adding a custom domain, build with `SITE_URL=https://your-domain`. Canonical URLs, absolute Open Graph image URLs and the sitemap depend on it.

Case-study details listed in `unconfirmed` are flagged in development and hidden in production.

## Images

Screenshots in `public/work/` are generated from the 2880px originals at 1200px and 2400px widths as WebP. Social preview images (1200×630 JPEG) are in `public/work/og/`. Colours, type and spacing tokens are defined once in `src/styles/index.css`. Figtree is self-hosted in `public/fonts/` (Latin variable subset, SIL OFL 1.1).

## Routes

- `/`: single-page home (`#work`, `#about`, `#expertise`, `#experience`, `#contact`)
- `/work/<slug>`: case studies. Each has its own static HTML file, so direct links, refreshes and LinkedIn previews work on any static host.
- Old hash links such as `/#case-study/uptra` redirect to the new URLs.

## Deploying (Vercel)

`vercel.json` sets the build command, `dist` output, clean URLs and long-lived caching for hashed assets and fonts. Import the repository in Vercel; no environment variables are required.
