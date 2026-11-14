# Dixit Panchal · Portfolio

React + Vite + Tailwind CSS v4. Animations use `motion`; routing uses `react-router`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server |
| `npm run build` | Type-check, then build to `dist/` (also writes per-case-study HTML, 404.html, robots.txt and sitemap.xml) |
| `npm run preview` | Serve the production build locally |
| `npm run check` | TypeScript + ESLint |

## Editing content

All content lives in two files. There is no CMS or admin panel.

- `src/content/site.ts`: name, contact details, hero, about, expertise, experience, site URL
- `src/content/projects.ts`: the four case studies and the "More projects" gallery

Empty optional fields (`linkedin`, `resumeUrl`) are hidden automatically. To add a résumé, put the PDF in `public/` and set `resumeUrl` to its path, for example `/dixit-panchal-resume.pdf`.

Set `siteUrl` before deploying. Canonical URLs, absolute Open Graph image URLs and the sitemap depend on it.

## Images

Screenshots in `public/work/` are generated from the 2880px originals at 1200px and 2400px widths as WebP. Social preview images (1200×630 JPEG) are in `public/work/og/`. Colours, type and spacing tokens are defined once in `src/styles/index.css`.

## Routes

- `/`: single-page home (`#work`, `#about`, `#expertise`, `#experience`, `#contact`)
- `/work/<slug>`: case studies. Each has its own static HTML file, so direct links, refreshes and LinkedIn previews work on any static host.
- Old hash links such as `/#case-study/uptra` redirect to the new URLs.
