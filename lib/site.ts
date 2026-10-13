export const SITE_URL = "https://optimizer360.ai";
export const SITE_NAME = "Optimizer360.ai";
export const SITE_LOGO_URL = `${SITE_URL}/og-image.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const LINKEDIN_URL = "https://www.linkedin.com/company/optimizer360ai/";
export const INSTAGRAM_URL = "https://www.instagram.com/optimizer360ai/";
export const FACEBOOK_URL = "https://www.facebook.com/people/Optimizer-AI/61594958716542/";
export const GOOGLE_BUSINESS_URL = "https://share.google/rJWDB6ofoXqJMEwiU";
/** Every official profile of the company, used for schema sameAs. Add new profiles here. */
export const SAME_AS_URLS = [LINKEDIN_URL, INSTAGRAM_URL, FACEBOOK_URL, GOOGLE_BUSINESS_URL];
export const FOUNDER_NAME = "Salil Chaturvedi";
export const ORG_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress:
    "1st Floor, Provogue House, 105/106, Off New Link Rd, Veera Desai Industrial Estate, Andheri West",
  addressLocality: "Mumbai",
  addressRegion: "Maharashtra",
  postalCode: "400053",
  addressCountry: "IN",
} as const;

/** Fill this when a public founder bio exists. Do not invent a name. */
export const FOUNDER_NOTE: {
  name: string;
  role: string;
  quote: string;
} | null = null;

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
