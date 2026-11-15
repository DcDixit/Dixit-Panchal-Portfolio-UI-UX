/**
 * Build-time renderer used by scripts/prerender.mjs. Not shipped to the browser.
 * Renders a route to HTML so every page has real content before JavaScript loads.
 */
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
