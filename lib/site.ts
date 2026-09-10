export const CAL_LINK =
  process.env.NEXT_PUBLIC_CAL_LINK ||
  "https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360";

export const CONTACT_EMAIL = "hello@optimizer360.ai";

/** The dashboard app lives on its own subdomain (geo.optimizer360.ai), separate from this
 * marketing site (optimizer360.ai) — override locally via NEXT_PUBLIC_DASHBOARD_URL to point
 * at the dashboard's dev server instead. */
export const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://geo.optimizer360.ai";
export const DASHBOARD_LOGIN_URL = `${DASHBOARD_URL}/login`;
