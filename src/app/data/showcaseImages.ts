/** Real project screenshots served from /public/showcase — optimized PNG exports. */
const showcase = (filename: string) => `/showcase/${filename}`;

export const UPTRA_SHOWCASE_GALLERY = [
  showcase("uptra-job-listing.png"),
  showcase("uptra-resume-details.png"),
  showcase("uptra-interview-prep.png"),
] as const;

export const GOCARDLESS_SHOWCASE_GALLERY = [
  showcase("gocardless-dashboard.png"),
  showcase("gocardless-onboarding.png"),
] as const;

export const FINANCIAL_REPORTING_GALLERY = [
  showcase("financial-planned-cash-inflow.png"),
  showcase("financial-cash-flow-statement.png"),
] as const;

export const COSTALLOCATION_SHOWCASE_GALLERY = [
  showcase("costallocation-dashboard.png"),
  showcase("costallocation-time-logs.png"),
] as const;

export const ENTERPRISE_DASHBOARDS_GALLERY = [
  showcase("wageworks-time-activities.png"),
  showcase("carcollection-admin.png"),
] as const;

export const WEB_PLATFORMS_GALLERY = [
  showcase("ocean-ai-home.png"),
  showcase("gather-nexus-hub.png"),
  showcase("uifry-finance-dashboard.png"),
  showcase("peakeaze-dashboard.png"),
] as const;
