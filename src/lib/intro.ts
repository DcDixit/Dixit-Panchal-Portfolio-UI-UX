import { useEffect } from "react";

let hydrated = false;

/**
 * Whether mount animations should play.
 *
 * Pages are pre-rendered to HTML at build time. On the first paint (and on the server) this
 * returns false, so above-the-fold content is visible before JavaScript loads and the server
 * and browser render identical markup. On later client-side navigations it returns true.
 */
export function useIntro(): boolean {
  return hydrated;
}

/** Call once in the app root: flips useIntro() to true after the first render commits. */
export function useMarkHydrated() {
  useEffect(() => {
    hydrated = true;
  }, []);
}
