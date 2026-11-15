/**
 * Fills the empty <div id="root"> of every generated HTML page with server-rendered markup.
 * Runs after `vite build` (client, writes the HTML files) and `vite build --ssr` (renderer).
 * The browser then hydrates this markup instead of rendering from scratch.
 */
import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

process.env.NODE_ENV = "production";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

/** [html file, route rendered into it] */
const pages = [
  ["index.html", "/"],
  ["404.html", "/404"],
];
const workDir = path.join(dist, "work");
for (const name of readdirSync(workDir)) {
  if (!name.endsWith(".html")) continue;
  const slug = name.slice(0, -".html".length);
  pages.push([`work/${name}`, `/work/${slug}`]);
  pages.push([`work/${slug}/index.html`, `/work/${slug}`]);
}

const EMPTY_ROOT = '<div id="root"></div>';
for (const [file, url] of pages) {
  const target = path.join(dist, file);
  if (!existsSync(target)) throw new Error(`prerender: missing ${file}`);
  const html = readFileSync(target, "utf8");
  if (!html.includes(EMPTY_ROOT)) throw new Error(`prerender: no empty root in ${file}`);
  // data-route lets the browser hydrate only when the URL matches what was rendered.
  writeFileSync(target, html.replace(EMPTY_ROOT, `<div id="root" data-route="${url}">${render(url)}</div>`));
}

rmSync(ssrDir, { recursive: true, force: true });
console.log(`prerender: ${pages.length} pages rendered`);
