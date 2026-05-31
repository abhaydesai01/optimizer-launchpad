import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

type AuditDocumentProps = {
  brand: string;
  website: string;
  industry: string;
  contactName: string;
  competitors: string;
  product: string;
};

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11.2,
    backgroundColor: "#0A0A0F",
    color: "#F0F0F5",
  },
  title: {
    fontSize: 24.5,
    marginBottom: 12,
    fontWeight: 700,
  },
  subtitle: {
    fontSize: 12.5,
    marginBottom: 6,
    color: "#6B6B80",
  },
  section: {
    marginTop: 14,
    padding: 14,
    border: "1 solid #1E1E2E",
    borderRadius: 8,
  },
  heading: {
    fontSize: 16,
    marginBottom: 8,
    color: "#00E5A0",
    fontWeight: 600,
  },
  bullet: {
    marginBottom: 5,
    lineHeight: 1.4,
  },
  label: {
    color: "#6B6B80",
  },
});

export function AuditDocument({
  brand,
  website,
  industry,
  contactName,
  competitors,
  product,
}: AuditDocumentProps) {
  const preparedOn = new Date().toISOString().slice(0, 10);
  const [comp1 = "Competitor 1", comp2 = "Competitor 2"] = competitors
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>FREE GEO AUDIT REPORT</Text>
        <Text style={styles.subtitle}>Brand: {brand}</Text>
        <Text style={styles.subtitle}>Website: {website}</Text>
        <Text style={styles.subtitle}>Industry: {industry}</Text>
        <Text style={styles.subtitle}>Prepared: {preparedOn}</Text>
        <Text style={styles.subtitle}>Prepared for: {contactName}</Text>
        <Text style={styles.subtitle}>
          Prepared by: Optimizer360 GEO Team - hello@optimizer360.ai
        </Text>
        <View style={styles.section}>
          <Text style={styles.bullet}>
            "Find out where AI sees you - and where it doesn't."
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>What this audit covers</Text>
        <Text style={styles.bullet}>
          We searched {brand} across 6 AI engines using 10 brand-specific
          prompts across 3 query categories.
        </Text>
        <Text style={styles.bullet}>
          CATEGORY 1: Problem-aware prompts. Queries buyers use when they have
          the problem but don't know your brand.
        </Text>
        <Text style={styles.bullet}>
          CATEGORY 2: Solution-aware prompts. Queries buyers use when they know
          the type of solution they need.
        </Text>
        <Text style={styles.bullet}>
          CATEGORY 3: Brand-aware prompts. Queries buyers use when they've heard
          of you and are validating.
        </Text>
        <View style={styles.section}>
          <Text style={styles.bullet}>
            65% of ChatGPT queries are now search-intent. If your brand doesn't
            appear for these 10 prompts, you are invisible to a growing segment
            of your buyers before they ever visit your website.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>The 10 brand-specific prompts</Text>
        <Text style={styles.bullet}>
          1) How do I solve {product.toLowerCase()} without high execution
          overhead?
        </Text>
        <Text style={styles.bullet}>
          2) What is the best way to improve this for {industry} companies?
        </Text>
        <Text style={styles.bullet}>
          3) Why is this challenge happening and how do I fix it?
        </Text>
        <Text style={styles.bullet}>
          4) Best {product.toLowerCase()} for {industry} in 2026
        </Text>
        <Text style={styles.bullet}>
          5) How to automate this capability
        </Text>
        <Text style={styles.bullet}>
          6) {product} with measurable ROI
        </Text>
        <Text style={styles.bullet}>
          7) {comp1} vs {comp2} vs alternatives
        </Text>
        <Text style={styles.bullet}>8) What is {brand}?</Text>
        <Text style={styles.bullet}>9) {brand} reviews and results</Text>
        <Text style={styles.bullet}>10) Is {brand} worth it?</Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Citation scorecard</Text>
        <Text style={styles.bullet}>
          {brand} - AI CITATION SCORECARD | Date: {preparedOn}
        </Text>
        <Text style={styles.bullet}>ChatGPT: _ /10</Text>
        <Text style={styles.bullet}>Perplexity: _ /10</Text>
        <Text style={styles.bullet}>Google AI: _ /10</Text>
        <Text style={styles.bullet}>Claude: _ /10</Text>
        <Text style={styles.bullet}>Gemini: _ /10</Text>
        <Text style={styles.bullet}>Copilot: _ /10</Text>
        <Text style={styles.bullet}>TOTAL: _ /60</Text>
        <View style={styles.section}>
          <Text style={styles.bullet}>CITATION RATE: __%</Text>
          <Text style={styles.bullet}>
            Industry average (no GEO active): 0–8%
          </Text>
          <Text style={styles.bullet}>
            Top quartile (active GEO): 35–55%
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Competitor comparison</Text>
        <Text style={styles.bullet}>Competitor citation analysis:</Text>
        <Text style={styles.bullet}>{comp1}: [X] /60</Text>
        <Text style={styles.bullet}>{comp2}: [X] /60</Text>
        <Text style={styles.bullet}>{brand}: [X] /60</Text>
        <View style={styles.section}>
          <Text style={styles.bullet}>
            KEY FINDING: Team writes actual findings here before sending.
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Top 3 gaps</Text>
        <Text style={styles.bullet}>
          GAP 1: [Finding] | What's missing: [Finding] | What to do: [Action] |
          Impact: HIGH
        </Text>
        <Text style={styles.bullet}>
          GAP 2: [Finding] | What's missing: [Finding] | What to do: [Action] |
          Impact: HIGH
        </Text>
        <Text style={styles.bullet}>
          GAP 3: [Finding] | What's missing: [Finding] | What to do: [Action] |
          Impact: MEDIUM
        </Text>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>90-day GEO roadmap</Text>
        <Text style={styles.bullet}>
          WEEKS 1-2: Foundation - schema, robots, entity registration, baseline
          tracking.
        </Text>
        <Text style={styles.bullet}>
          WEEKS 3-6: Content - publish prompt-driven content and FAQ layers.
        </Text>
        <Text style={styles.bullet}>
          WEEKS 7-12: Authority - PR placements, founder thought leadership,
          weekly citation iteration.
        </Text>
        <View style={styles.section}>
          <Text style={styles.bullet}>Expected milestones:</Text>
          <Text style={styles.bullet}>Week 6: First Perplexity citations</Text>
          <Text style={styles.bullet}>Week 8: First ChatGPT citations</Text>
          <Text style={styles.bullet}>
            Week 12: Consistent citation on 4-6 of 10 prompts
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Next steps</Text>
        <Text style={styles.bullet}>{brand} citation score today: [X] /60</Text>
        <Text style={styles.bullet}>Industry average (no GEO): 0-8%</Text>
        <Text style={styles.bullet}>What's possible in 90 days: 30-50%</Text>
        <View style={styles.section}>
          <Text style={styles.bullet}>Option 1 - Do it yourself</Text>
          <Text style={styles.bullet}>Option 2 - GEO Starter (₹35,000/month)</Text>
          <Text style={styles.bullet}>Option 3 - GEO Growth (₹85,000/month)</Text>
          <Text style={styles.bullet}>
            https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360
          </Text>
        </View>
        <Text style={styles.subtitle}>
          Prepared by Optimizer360 GEO Team | hello@optimizer360.ai |
          optimizer360.ai
        </Text>
      </Page>
    </Document>
  );
}
