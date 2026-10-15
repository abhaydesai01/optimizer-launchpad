import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Inter, Inter_Tight } from "next/font/google";
import { buildOrganizationSchema } from "@/lib/schema-library";
import { FOUNDER_NAME, ORG_ADDRESS, ORG_DESCRIPTION, SAME_AS_URLS, SITE_LOGO_URL } from "@/lib/site";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  axes: ["opsz"],
});

const orgSchema = {
  ...buildOrganizationSchema({
    name: "Optimizer360.ai",
    url: "https://optimizer360.ai",
    description: ORG_DESCRIPTION,
    // Profiles live in SAME_AS_URLS (lib/site.ts); add Crunchbase, G2, Clutch there once live
    sameAs: SAME_AS_URLS,
    founderName: FOUNDER_NAME,
    logo: SITE_LOGO_URL,
  }),
  alternateName: ["Optimizer360", "Optimizer 360"],
  address: ORG_ADDRESS,
  email: "hello@optimizer360.ai",
  knowsAbout: [
    "AI GEO",
    "Generative Engine Optimisation",
    "Answer Engine Optimisation",
    "AI search visibility",
    "AI citations",
    "Entity SEO",
    "Structured data",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Optimizer360.ai",
  url: "https://optimizer360.ai",
  description:
    "AI GEO for enterprise brands — Generative Engine Optimisation that makes your brand the answer AI gives.",
  publisher: { "@type": "Organization", name: "Optimizer360.ai" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI GEO — Generative Engine Optimisation",
  serviceType: "AI GEO / Generative Engine Optimisation",
  provider: { "@type": "Organization", name: "Optimizer360.ai", url: "https://optimizer360.ai" },
  areaServed: "Worldwide",
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Enterprise brands in healthcare, finance, real estate, education, jewellery and hospitality",
  },
  description:
    "Optimizer360.ai structures a brand's credibility, content and evidence so AI engines — ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude — can read, trust and cite it. Baseline audit, gap diagnosis, gap-targeted content and entity structuring, and weekly citation tracking across all five engines. Engagements are scoped individually; request an audit for a quote.",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://optimizer360.ai"),
  title: {
    default:
      "Optimizer360.ai — AI GEO & Generative Engine Optimisation for Enterprise Brands",
    template: "%s | Optimizer360.ai",
  },
  description:
    "Be the brand AI recommends. Optimizer360.ai is the AI GEO firm that makes your brand the answer AI gives — across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude. We never fabricate data.",
  keywords: [
    "AI GEO",
    "AI GEO agency",
    "Generative Engine Optimisation",
    "GEO",
    "Answer Engine Optimisation",
    "AEO",
    "AI Overviews optimisation",
    "AI citations",
    "AI search visibility",
    "ChatGPT brand visibility",
    "Perplexity citations",
    "enterprise GEO firm",
  ],
  alternates: {
    canonical: "https://optimizer360.ai",
  },
  // Google Search Console ownership tag. Keep it: removing it un-verifies the property.
  verification: {
    google: "Y39ll0sAdls-421IWlEOaFqVLvWFFfYguZociO_7sRY",
  },
  openGraph: {
    title:
      "Optimizer360.ai — AI GEO for Enterprise Brands",
    description:
      "Be the brand AI recommends. AI GEO (Generative Engine Optimisation) across ChatGPT, Perplexity, Google AI Overviews, Gemini and Claude.",
    url: "https://optimizer360.ai",
    siteName: "Optimizer360.ai",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://optimizer360.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Optimizer360.ai — AI GEO & Generative Engine Optimisation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Optimizer360.ai — AI GEO for Enterprise Brands",
    description:
      "Be the brand AI recommends. AI GEO (Generative Engine Optimisation) across all five major AI engines.",
    images: ["https://optimizer360.ai/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${fraunces.variable}`}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-89SE77PEFT"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-89SE77PEFT');`,
          }}
        />
        {/* optimizer360 realtime attribution */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var endpoint='https://api.optimizer360.ai/api/attribution/events';
  var key='attr_6aa8f92f2b41f2960681d169';
  var sidKey='optimizer360_attr_sid';
  var vidKey='optimizer360_attr_vid';
  function id(){return Math.random().toString(36).slice(2)+Date.now().toString(36)}
  function store(k){try{var v=localStorage.getItem(k);if(!v){v=id();localStorage.setItem(k,v)}return v}catch(e){return id()}}
  function params(){try{return new URLSearchParams(location.search)}catch(e){return new URLSearchParams()}}
  function send(eventType, extra){
    var q=params();
    var body=JSON.stringify(Object.assign({
      publicKey:key,eventType:eventType,sessionId:store(sidKey),visitorId:store(vidKey),
      landingUrl:location.href,referrer:document.referrer,
      utmSource:q.get('utm_source')||undefined,utmMedium:q.get('utm_medium')||undefined,
      utmCampaign:q.get('utm_campaign')||undefined,occurredAt:new Date().toISOString()
    },extra||{}));
    if(navigator.sendBeacon){navigator.sendBeacon(endpoint,new Blob([body],{type:'application/json'}));return}
    fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:body,keepalive:true}).catch(function(){});
  }
  send('pageview');
  window.optimizer360Attribution={track:function(name,extra){send(name==='conversion'?'conversion':'click',extra)}};
})();`,
          }}
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </body>
    </html>
  );
}
