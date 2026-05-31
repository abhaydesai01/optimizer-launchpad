export type UseCaseSegment =
  | "Ecommerce & D2C"
  | "Healthcare & Dental"
  | "SaaS & B2B Technology"
  | "Real Estate"
  | "Financial Services"
  | "EdTech & Courses"
  | "Legal Services"
  | "Agencies";

export type UseCaseRole =
  | "CMO"
  | "Founder / CEO"
  | "Growth Lead"
  | "Agency Partner"
  | "Revenue Operations";

export type RolePlaybook = {
  role: UseCaseRole;
  priorities: string[];
  geoMoves: string[];
  kpis: string[];
};

export type ApproachStep = {
  phase: string;
  title: string;
  detail: string;
};

export type UseCaseFAQ = {
  question: string;
  answer: string;
};

export type UseCase = {
  slug: string;
  title: string;
  shortTitle: string;
  segment: UseCaseSegment;
  roles: UseCaseRole[];
  tagline: string;
  intro: string;
  painPoints: string[];
  geoOpportunity: string[];
  approach: ApproachStep[];
  rolePlaybooks: RolePlaybook[];
  expectedOutcomes: string[];
  faq: UseCaseFAQ[];
};

export const useCases: UseCase[] = [
  {
    slug: "geo-for-ecommerce-d2c-brands",
    title: "GEO for Ecommerce & D2C Brands",
    shortTitle: "Ecommerce & D2C",
    segment: "Ecommerce & D2C",
    roles: ["CMO", "Founder / CEO", "Growth Lead"],
    tagline: "Own buying-intent answers before shoppers hit marketplaces.",
    intro:
      "D2C brands already spend heavily on paid social and search, but purchase discovery is shifting to AI assistants. When buyers ask for product comparisons, category guidance, or 'best option under a budget', the brands cited in AI responses win consideration first.",
    painPoints: [
      "Revenue depends on rising paid acquisition costs.",
      "Category pages rank, but informational intent is captured by competitors.",
      "Product launches spike briefly, then fade without persistent discovery.",
    ],
    geoOpportunity: [
      "Capture AI citations on high-intent product questions and category prompts.",
      "Build always-on conversion pathways from educational content to product pages.",
      "Improve trust with structured product, FAQ, and comparison entities.",
    ],
    approach: [
      {
        phase: "Phase 1",
        title: "Intent and query map",
        detail:
          "We map buyer questions by funnel stage (problem, comparison, decision) and prioritize prompts linked to revenue-driving SKUs.",
      },
      {
        phase: "Phase 2",
        title: "Citation-ready content system",
        detail:
          "We create category intelligence pages, product comparison narratives, and buyer FAQs that answer directly and cleanly for AI retrieval.",
      },
      {
        phase: "Phase 3",
        title: "Entity and schema reinforcement",
        detail:
          "We strengthen product and brand entities with structured data, internal links, and evidence-backed claims to improve citation consistency.",
      },
    ],
    rolePlaybooks: [
      {
        role: "CMO",
        priorities: [
          "Reduce paid dependency by growing compounding discovery channels.",
          "Align category education and product storytelling with demand capture.",
        ],
        geoMoves: [
          "Prioritize top 25 purchase-intent prompts by weighted margin potential.",
          "Create answer-first pages that connect educational context to offer pages.",
          "Track citation share by category against top 3 competitors.",
        ],
        kpis: ["AI citation share", "Branded search lift", "Assisted conversion rate"],
      },
      {
        role: "Founder / CEO",
        priorities: [
          "Stabilize CAC volatility and build defensible organic demand.",
          "Create board-level confidence in long-term demand generation.",
        ],
        geoMoves: [
          "Focus on the 5 product lines that define brand margin.",
          "Establish monthly GEO scorecard tied directly to revenue outcomes.",
        ],
        kpis: ["CAC trend", "Net new revenue from AI-assisted sessions", "Repeat purchase growth"],
      },
      {
        role: "Growth Lead",
        priorities: [
          "Turn GEO insights into repeatable experiment cycles.",
          "Integrate GEO reporting with CRM and channel analytics.",
        ],
        geoMoves: [
          "Run weekly prompt tracking with content update sprints.",
          "Build route-level attribution from AI entry pages to checkout.",
        ],
        kpis: ["Prompt win rate", "Time-to-citation", "Funnel progression from GEO pages"],
      },
    ],
    expectedOutcomes: [
      "Higher presence in AI answer experiences for priority categories.",
      "Reduced reliance on short-lived campaign spikes for demand.",
      "Better conversion quality from high-context educational journeys.",
    ],
    faq: [
      {
        question: "How quickly can an ecommerce brand see GEO impact?",
        answer:
          "Most brands see first citation movement in 4 to 6 weeks, with compounding gains over 90 to 120 days as entity confidence strengthens.",
      },
      {
        question: "Will GEO replace performance marketing?",
        answer:
          "No. GEO reduces pressure on paid channels by building durable discovery, which improves the efficiency of your total demand mix.",
      },
    ],
  },
  {
    slug: "geo-for-dental-and-clinic-growth",
    title: "GEO for Dental Chains, Clinics, and Healthcare Practices",
    shortTitle: "Dental & Clinics",
    segment: "Healthcare & Dental",
    roles: ["Founder / CEO", "CMO", "Revenue Operations"],
    tagline: "Be the trusted recommendation when patients ask AI for care decisions.",
    intro:
      "Healthcare decision-making is increasingly question-led. Patients ask AI tools about symptoms, treatment options, costs, and local providers. GEO helps clinics appear as credible, compliant recommendations instead of being absent from early patient research.",
    painPoints: [
      "High dependency on aggregator listings and paid lead marketplaces.",
      "Trust gaps when generic content does not answer real patient concerns.",
      "Inconsistent visibility across treatment-specific local queries.",
    ],
    geoOpportunity: [
      "Increase qualified patient intent by answering treatment and cost questions clearly.",
      "Strengthen local authority signals for procedure-specific searches.",
      "Create patient education journeys that convert to bookings.",
    ],
    approach: [
      {
        phase: "Phase 1",
        title: "Patient query architecture",
        detail:
          "We cluster questions by treatments, urgency, and locality so content aligns with how patients actually decide.",
      },
      {
        phase: "Phase 2",
        title: "Trust-first healthcare content",
        detail:
          "We build medically responsible, plain-language pages for procedures, expectations, pricing ranges, and recovery guidance.",
      },
      {
        phase: "Phase 3",
        title: "Local authority and conversion design",
        detail:
          "We connect educational prompts to city and clinic pages, with strong appointment intent pathways and credibility markers.",
      },
    ],
    rolePlaybooks: [
      {
        role: "Founder / CEO",
        priorities: [
          "Improve patient acquisition quality while controlling lead cost.",
          "Build long-term brand trust in key treatment categories.",
        ],
        geoMoves: [
          "Prioritize top treatment lines by patient lifetime value.",
          "Create geo-intent pages for every city-clinic-treatment combination.",
        ],
        kpis: ["Qualified consultation bookings", "Lead-to-treatment conversion", "Cost per booked consult"],
      },
      {
        role: "CMO",
        priorities: [
          "Position the brand as the most trusted voice in treatment education.",
          "Unify content and location strategy across clinics.",
        ],
        geoMoves: [
          "Launch treatment FAQ hubs with structured schema and practitioner context.",
          "Track citation share for treatment + location prompt sets.",
        ],
        kpis: ["AI local citation share", "Organic booking sessions", "Treatment page conversion rate"],
      },
      {
        role: "Revenue Operations",
        priorities: [
          "Connect discovery behavior to booked consult and realized revenue.",
          "Improve operational predictability from digital demand channels.",
        ],
        geoMoves: [
          "Tag GEO entry points in CRM source attribution.",
          "Measure treatment-level funnel velocity and show-up rates.",
        ],
        kpis: ["Time-to-book", "Show-up rate", "Booked consult pipeline value"],
      },
    ],
    expectedOutcomes: [
      "More treatment-ready leads from trust-led educational journeys.",
      "Stronger local authority presence in AI-assisted research moments.",
      "Better conversion economics versus marketplace-only lead models.",
    ],
    faq: [
      {
        question: "Does GEO need medical compliance review?",
        answer:
          "Yes. We design content to support clinical oversight and factual clarity while still answering patient intent directly.",
      },
      {
        question: "Can GEO help for single-clinic practices?",
        answer:
          "Yes. Even single-clinic providers can dominate focused local-treatment prompt sets with strong evidence and structured content.",
      },
    ],
  },
  {
    slug: "geo-for-b2b-saas-pipeline",
    title: "GEO for B2B SaaS Pipeline Generation",
    shortTitle: "B2B SaaS",
    segment: "SaaS & B2B Technology",
    roles: ["CMO", "Growth Lead", "Revenue Operations"],
    tagline: "Win shortlist conversations before prospects hit review sites.",
    intro:
      "B2B buyers use AI assistants to understand categories, compare tools, and shortlist options. GEO helps SaaS teams earn structured visibility at those moments and turn research intent into sales-qualified conversations.",
    painPoints: [
      "Content exists, but does not map to high-intent evaluation prompts.",
      "Review platforms dominate category trust while brand POV is muted.",
      "Marketing and sales attribution disconnects top-of-funnel from pipeline.",
    ],
    geoOpportunity: [
      "Capture category and comparison prompts where software buying starts.",
      "Differentiate with clear point-of-view content and quantified outcomes.",
      "Tie GEO entry points to pipeline stages and forecast quality.",
    ],
    approach: [
      {
        phase: "Phase 1",
        title: "Buying committee prompt map",
        detail:
          "We map prompts by persona (marketing, ops, finance) and stage (problem, solution, vendor selection).",
      },
      {
        phase: "Phase 2",
        title: "Evaluation content engine",
        detail:
          "We publish answer-first comparison assets, implementation playbooks, and ROI narratives built for AI retrieval.",
      },
      {
        phase: "Phase 3",
        title: "Pipeline analytics integration",
        detail:
          "We connect GEO pages with attribution and opportunity stages so leadership can track revenue impact with confidence.",
      },
    ],
    rolePlaybooks: [
      {
        role: "CMO",
        priorities: [
          "Increase qualified inbound from category-intent searches.",
          "Strengthen strategic narrative beyond feature-level comparison.",
        ],
        geoMoves: [
          "Create category leadership pages and vendor comparison clusters.",
          "Instrument AI citation share by ICP-focused keyword families.",
        ],
        kpis: ["SQL growth from GEO pages", "Category prompt citation share", "Pipeline influenced ARR"],
      },
      {
        role: "Growth Lead",
        priorities: [
          "Drive test-and-learn cycles tied to conversion outcomes.",
          "Improve speed from content insight to published optimization.",
        ],
        geoMoves: [
          "Run weekly prompt tracking and content refresh cadence.",
          "Ship role-specific landing paths for ICP segments.",
        ],
        kpis: ["Time-to-citation improvement", "Page-to-demo conversion", "Prompt-level win rate"],
      },
      {
        role: "Revenue Operations",
        priorities: [
          "Unify top-funnel discovery and downstream opportunity attribution.",
          "Improve confidence in demand source forecasting.",
        ],
        geoMoves: [
          "Tag GEO first-touch and multi-touch paths in CRM.",
          "Report GEO-attributed progression through deal stages.",
        ],
        kpis: ["Opportunity creation from GEO", "Stage conversion rates", "Sales cycle velocity"],
      },
    ],
    expectedOutcomes: [
      "Higher quality inbound opportunities from buyer-intent content.",
      "Stronger category leadership footprint in AI recommendation flows.",
      "Better board-level visibility into content-to-revenue impact.",
    ],
    faq: [
      {
        question: "Does GEO matter if we already rank on search engines?",
        answer:
          "Yes. AI assistants create a separate recommendation layer where citation presence and structured clarity directly affect shortlist inclusion.",
      },
      {
        question: "Can GEO support enterprise and SMB motions together?",
        answer:
          "Yes. We segment prompts and pages by buying complexity so each audience sees the right depth and proof points.",
      },
    ],
  },
  {
    slug: "geo-for-real-estate-developers-and-brokers",
    title: "GEO for Real Estate Developers and Brokerage Teams",
    shortTitle: "Real Estate",
    segment: "Real Estate",
    roles: ["Founder / CEO", "CMO", "Agency Partner"],
    tagline: "Own high-intent locality and project discovery before listing portals.",
    intro:
      "Property buyers now ask AI tools for locality comparisons, budget-fit options, and project trust signals. GEO helps developers and brokers become the cited authority during these high-intent decision windows.",
    painPoints: [
      "Lead quality is uneven due to portal-heavy acquisition mix.",
      "Project pages are brochure-like and weak on question-driven discovery.",
      "Locality and lifestyle intent queries are under-optimized.",
    ],
    geoOpportunity: [
      "Capture demand around locality + budget + lifestyle prompts.",
      "Create trust with transparent comparison content and project clarity.",
      "Move from listing dependency to owned demand assets.",
    ],
    approach: [
      {
        phase: "Phase 1",
        title: "Micro-market intent research",
        detail:
          "We map real buyer intent by locality, configuration, budget range, and buying timeline.",
      },
      {
        phase: "Phase 2",
        title: "Decision-grade property content",
        detail:
          "We create locality intelligence, project comparison pages, and buyer checklists designed for AI answer inclusion.",
      },
      {
        phase: "Phase 3",
        title: "Lead pathway optimization",
        detail:
          "We align answer pages with call scheduling, site visit requests, and qualification workflows.",
      },
    ],
    rolePlaybooks: [
      {
        role: "Founder / CEO",
        priorities: [
          "Improve lead quality and reduce wasted sales cycles.",
          "Build brand authority in high-value micro-markets.",
        ],
        geoMoves: [
          "Prioritize GEO by inventory movement and margin contribution.",
          "Track citation visibility for top revenue projects weekly.",
        ],
        kpis: ["Qualified lead ratio", "Site visit conversion", "Cost per qualified lead"],
      },
      {
        role: "CMO",
        priorities: [
          "Control brand narrative beyond portal listings.",
          "Increase trust and intent depth before first sales call.",
        ],
        geoMoves: [
          "Publish locality and project comparison hubs with clear evidence.",
          "Layer FAQ schema on all buyer decision pages.",
        ],
        kpis: ["AI citation presence by project", "Direct inquiry volume", "Page-to-inquiry conversion"],
      },
      {
        role: "Agency Partner",
        priorities: [
          "Deliver measurable quality outcomes, not just lead volume.",
          "Create strategic moat for long-term account retention.",
        ],
        geoMoves: [
          "Build repeatable GEO content clusters per project and locality.",
          "Report AI-assisted lead quality alongside campaign metrics.",
        ],
        kpis: ["Retention impact", "Qualified appointment rate", "Attribution confidence"],
      },
    ],
    expectedOutcomes: [
      "Better-qualified inquiries with lower noise.",
      "Higher trust in project narratives before sales engagement.",
      "Reduced dependence on third-party listing ecosystems.",
    ],
    faq: [
      {
        question: "Can GEO work for inventory with short sales windows?",
        answer:
          "Yes. GEO works well when focused on high-intent locality and budget prompts tied to near-term inventory movement.",
      },
      {
        question: "Will this replace listing portals?",
        answer:
          "It complements portals while building owned discovery assets that improve lead quality and strategic control.",
      },
    ],
  },
  {
    slug: "geo-for-financial-services-and-advisory",
    title: "GEO for Financial Services and Advisory Firms",
    shortTitle: "Financial Services",
    segment: "Financial Services",
    roles: ["CMO", "Founder / CEO", "Revenue Operations"],
    tagline: "Build trust-led discovery for high-consideration financial decisions.",
    intro:
      "Financial buyers research extensively before engaging an advisor or provider. GEO ensures your expertise appears in trusted AI-led educational moments where confidence and clarity drive conversion.",
    painPoints: [
      "High-trust categories need depth, but content often remains generic.",
      "Conversion lag is long due to low confidence in early touchpoints.",
      "Regulated communication limits promotional messaging flexibility.",
    ],
    geoOpportunity: [
      "Create educational authority around planning, risk, and product fit.",
      "Increase trust through structured explanations and transparent scenarios.",
      "Improve consultation intent from informed prospects.",
    ],
    approach: [
      {
        phase: "Phase 1",
        title: "Trust-intent mapping",
        detail:
          "We prioritize prompts that indicate consultation readiness and align with compliant educational communication.",
      },
      {
        phase: "Phase 2",
        title: "Authority content framework",
        detail:
          "We build scenario-led guides, comparison explainers, and advisor-led Q&A resources with clear factual framing.",
      },
      {
        phase: "Phase 3",
        title: "Consultation conversion orchestration",
        detail:
          "We connect educational journeys to consult booking and follow-up nurturing paths by segment.",
      },
    ],
    rolePlaybooks: [
      {
        role: "CMO",
        priorities: [
          "Drive trust-led demand in complex decision categories.",
          "Balance compliance with compelling educational narratives.",
        ],
        geoMoves: [
          "Publish risk-aware educational hubs for top client personas.",
          "Deploy FAQ and QAPage schema for recurring advisor queries.",
        ],
        kpis: ["Consultation requests", "AI trust citation share", "Content engagement depth"],
      },
      {
        role: "Founder / CEO",
        priorities: [
          "Strengthen firm positioning against larger incumbents.",
          "Increase advisor utilization with higher-intent consultations.",
        ],
        geoMoves: [
          "Focus GEO on premium advisory service lines.",
          "Track conversion from discovery to booked strategy sessions.",
        ],
        kpis: ["Booked advisory calls", "Client acquisition quality", "Revenue per advisory relationship"],
      },
      {
        role: "Revenue Operations",
        priorities: [
          "Improve visibility into long-cycle conversion pathways.",
          "Align attribution with consultation and conversion milestones.",
        ],
        geoMoves: [
          "Instrument engagement milestones in CRM by persona.",
          "Build GEO-assisted funnel reports by service line.",
        ],
        kpis: ["Consult-to-client conversion", "Pipeline velocity", "Attribution coverage"],
      },
    ],
    expectedOutcomes: [
      "Higher trust and stronger early-stage client confidence.",
      "More qualified consultations from educated prospects.",
      "Improved advisory funnel efficiency with clearer attribution.",
    ],
    faq: [
      {
        question: "Is GEO suitable for regulated financial content?",
        answer:
          "Yes. GEO can be executed with compliance-first educational framing while preserving clarity and authority.",
      },
      {
        question: "Can GEO improve consultation quality?",
        answer:
          "Yes. Better-informed prospects usually enter calls with clearer intent, which improves close probability and advisor productivity.",
      },
    ],
  },
  {
    slug: "geo-for-edtech-and-cohort-programs",
    title: "GEO for EdTech, Institutes, and Cohort Programs",
    shortTitle: "EdTech & Courses",
    segment: "EdTech & Courses",
    roles: ["CMO", "Growth Lead", "Founder / CEO"],
    tagline: "Get discovered when learners ask AI what to learn next.",
    intro:
      "Learners increasingly ask AI tools which programs are credible, practical, and career-relevant. GEO helps education brands show up in those conversations with proof-rich content that converts curiosity into enrollment intent.",
    painPoints: [
      "Enrollment growth depends on expensive launch windows.",
      "Generic curriculum pages do not answer learner objections deeply.",
      "Low trust in outcomes when differentiation is not explicit.",
    ],
    geoOpportunity: [
      "Capture discovery at the exact moment learners compare paths.",
      "Improve enrollment quality by setting expectations early.",
      "Build long-term organic demand assets across topic clusters.",
    ],
    approach: [
      {
        phase: "Phase 1",
        title: "Learner intent decomposition",
        detail:
          "We map decisions by outcome goals, career stage, budget, and timeline.",
      },
      {
        phase: "Phase 2",
        title: "Enrollment-oriented content architecture",
        detail:
          "We publish role-based learning roadmaps, curriculum explainers, and ROI narratives optimized for answer engines.",
      },
      {
        phase: "Phase 3",
        title: "Conversion and retention signaling",
        detail:
          "We align landing paths to counseling calls, trial lessons, and confidence-building social proof.",
      },
    ],
    rolePlaybooks: [
      {
        role: "CMO",
        priorities: [
          "Build consistent inbound beyond campaign-led enrollment spikes.",
          "Strengthen market authority in high-demand domains.",
        ],
        geoMoves: [
          "Create role-specific pages for learner outcomes and job transitions.",
          "Track citation share for high-intent 'best course for' prompts.",
        ],
        kpis: ["Qualified lead volume", "Enrollment conversion", "Cost per enrollment"],
      },
      {
        role: "Growth Lead",
        priorities: [
          "Improve funnel quality with intent-aligned content journeys.",
          "Accelerate experiment loops tied to conversion impact.",
        ],
        geoMoves: [
          "Weekly content refreshes on underperforming prompt clusters.",
          "Segment conversion paths by learner maturity level.",
        ],
        kpis: ["Prompt win lift", "Lead-to-counseling rate", "Counseling-to-enrollment rate"],
      },
      {
        role: "Founder / CEO",
        priorities: [
          "Improve enrollment predictability and pricing power.",
          "Build brand moat with trusted educational authority.",
        ],
        geoMoves: [
          "Focus GEO on flagship outcomes and premium cohorts.",
          "Report monthly GEO influence on net enrollments.",
        ],
        kpis: ["Net enrollments", "Revenue per cohort", "Predictability of monthly intake"],
      },
    ],
    expectedOutcomes: [
      "More qualified learner demand entering counseling funnels.",
      "Higher credibility in AI-assisted learning discovery.",
      "Lower volatility across intake cycles.",
    ],
    faq: [
      {
        question: "Can GEO help low-brand-awareness EdTech players?",
        answer:
          "Yes. GEO rewards answer quality and structured clarity, which helps focused specialists compete effectively.",
      },
      {
        question: "Will GEO help both degree and short-form programs?",
        answer:
          "Yes. The strategy adapts by decision cycle length and learner intent depth.",
      },
    ],
  },
  {
    slug: "geo-for-legal-services-firms",
    title: "GEO for Legal Services Firms and Practice Groups",
    shortTitle: "Legal Services",
    segment: "Legal Services",
    roles: ["CMO", "Founder / CEO", "Agency Partner"],
    tagline: "Be the first trusted reference when clients ask legal-intent questions.",
    intro:
      "Prospective clients now research legal options through AI assistants before contacting firms. GEO helps legal teams appear in these high-intent moments with clear, jurisdiction-aware guidance that builds credibility early.",
    painPoints: [
      "Practice pages are often service catalogs, not decision guidance.",
      "High-value matters are won by trust signals, not just search rankings.",
      "Referral dependence limits predictable inbound growth.",
    ],
    geoOpportunity: [
      "Capture high-intent legal prompts by practice area and case context.",
      "Build trust through clear answer-first education and structured clarity.",
      "Improve consultation quality with better-prepared prospects.",
    ],
    approach: [
      {
        phase: "Phase 1",
        title: "Practice-area intent mapping",
        detail:
          "We map user prompts by legal scenario, urgency, and decision stage across your priority practice lines.",
      },
      {
        phase: "Phase 2",
        title: "Authority content clusters",
        detail:
          "We create practical explainers, procedural timelines, and client-facing checklists designed for AI retrieval and trust-building.",
      },
      {
        phase: "Phase 3",
        title: "Consultation conversion layer",
        detail:
          "We connect informational pages to consultation pathways with stronger qualification context and conversion intent.",
      },
    ],
    rolePlaybooks: [
      {
        role: "CMO",
        priorities: [
          "Increase trust-led demand for strategic practice areas.",
          "Create defensible authority around high-value legal topics.",
        ],
        geoMoves: [
          "Publish practice-specific question hubs with FAQ and QAPage structures.",
          "Track citation share by practice area and matter type.",
        ],
        kpis: ["Qualified legal inquiries", "Consultation conversion", "Practice-area citation share"],
      },
      {
        role: "Founder / CEO",
        priorities: [
          "Build durable brand authority independent of referral cycles.",
          "Improve quality of first consultations and matter fit.",
        ],
        geoMoves: [
          "Prioritize GEO around top-margin and strategic matters.",
          "Review monthly GEO-to-matter pipeline report.",
        ],
        kpis: ["Matter quality score", "Conversion from consult to engagement", "Revenue from inbound matters"],
      },
      {
        role: "Agency Partner",
        priorities: [
          "Move legal clients from vanity traffic to qualified intent outcomes.",
          "Demonstrate strategic impact on business development.",
        ],
        geoMoves: [
          "Build repeatable GEO operating cadences by practice segment.",
          "Report prompt wins linked to consultation outcomes.",
        ],
        kpis: ["Client retention impact", "Qualified consult growth", "Attribution quality"],
      },
    ],
    expectedOutcomes: [
      "Higher trust and quality in inbound legal consultations.",
      "Better authority footprint in AI-assisted legal research flows.",
      "More predictable demand beyond legacy referral dependence.",
    ],
    faq: [
      {
        question: "Can legal firms use GEO while staying compliant?",
        answer:
          "Yes. GEO can be executed with careful legal review and jurisdiction-aware language while preserving clarity and usefulness.",
      },
      {
        question: "Does GEO work for niche practice areas?",
        answer:
          "Yes. Niche practices often benefit strongly because answer-engine queries are highly specific and intent-rich.",
      },
    ],
  },
  {
    slug: "geo-for-growth-and-performance-agencies",
    title: "GEO for Growth, SEO, and Performance Agencies",
    shortTitle: "Agencies",
    segment: "Agencies",
    roles: ["Agency Partner", "CMO", "Growth Lead"],
    tagline: "Turn GEO capability into a premium, retention-driving service line.",
    intro:
      "Agencies are being asked to explain AI-era visibility, but most still operate with search-era playbooks only. GEO helps agencies launch a strategic service line that improves client outcomes and protects long-term retainers.",
    painPoints: [
      "Clients ask for AI visibility strategy, but delivery playbooks are immature.",
      "Service differentiation is weak in crowded performance/SEO markets.",
      "Retainers are pressured when value narratives stay channel-specific.",
    ],
    geoOpportunity: [
      "Launch GEO as a premium advisory-plus-execution offering.",
      "Improve client retention by tying GEO to measurable business impact.",
      "Create cross-client operational templates for scalable delivery.",
    ],
    approach: [
      {
        phase: "Phase 1",
        title: "Offer design and positioning",
        detail:
          "We define GEO packages by client maturity, vertical complexity, and expected outcome timelines.",
      },
      {
        phase: "Phase 2",
        title: "Delivery operating system",
        detail:
          "We set up prompt mapping, content workflows, schema standards, and reporting cadences for repeatable fulfillment.",
      },
      {
        phase: "Phase 3",
        title: "Proof and scale",
        detail:
          "We build case-study style scorecards that link citation gains to qualified demand and retention outcomes.",
      },
    ],
    rolePlaybooks: [
      {
        role: "Agency Partner",
        priorities: [
          "Differentiate agency positioning with a future-ready growth narrative.",
          "Increase margin through strategic service layers.",
        ],
        geoMoves: [
          "Launch GEO discovery engagements for top clients first.",
          "Standardize delivery templates and QA checklists by segment.",
        ],
        kpis: ["Retainer expansion", "Service margin", "Client retention"],
      },
      {
        role: "CMO",
        priorities: [
          "Create market leadership perception for the agency brand.",
          "Attract high-quality inbound opportunities.",
        ],
        geoMoves: [
          "Publish agency POV assets on GEO adoption and results.",
          "Build demand around role-led and segment-led GEO cases.",
        ],
        kpis: ["Inbound SQL volume", "Win rate on strategic deals", "Brand authority metrics"],
      },
      {
        role: "Growth Lead",
        priorities: [
          "Operationalize GEO execution without adding heavy overhead.",
          "Maintain clear performance visibility across accounts.",
        ],
        geoMoves: [
          "Set weekly prompt monitoring and optimization loops.",
          "Track account-level citation movement vs pipeline outcomes.",
        ],
        kpis: ["Time-to-impact", "Delivery efficiency", "Account performance consistency"],
      },
    ],
    expectedOutcomes: [
      "New high-value agency service line with strategic stickiness.",
      "Improved retention via clearer long-term growth narratives.",
      "Stronger differentiation in competitive agency markets.",
    ],
    faq: [
      {
        question: "Can GEO be productized for agency delivery?",
        answer:
          "Yes. With proper intent mapping, workflow templates, and reporting standards, GEO can be packaged and scaled effectively.",
      },
      {
        question: "Will clients pay for GEO as a separate line item?",
        answer:
          "Yes, when the offer is tied to measurable discovery and pipeline outcomes rather than generic content production.",
      },
    ],
  },
];

export const useCaseSegments: UseCaseSegment[] = [
  "Ecommerce & D2C",
  "Healthcare & Dental",
  "SaaS & B2B Technology",
  "Real Estate",
  "Financial Services",
  "EdTech & Courses",
  "Legal Services",
  "Agencies",
];

export const useCaseRoles: UseCaseRole[] = [
  "CMO",
  "Founder / CEO",
  "Growth Lead",
  "Agency Partner",
  "Revenue Operations",
];

export function getUseCaseBySlug(slug: string) {
  return useCases.find((item) => item.slug === slug);
}
