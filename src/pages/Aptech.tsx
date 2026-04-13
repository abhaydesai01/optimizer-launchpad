import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SectionLabel from "@/components/SectionLabel";
import FadeIn from "@/components/FadeIn";
import { ArrowRight } from "lucide-react";

const phases = [
  { phase: "Phase 1", months: "M1–M9", spend: "₹1,75,000/mo", organic: "0%→38%", total: "₹15.75L" },
  { phase: "Phase 2", months: "M10–M18", spend: "₹1,30,000/mo", organic: "38%→66%", total: "₹11.70L" },
  { phase: "Phase 3", months: "M19–M28", spend: "₹1,00,000/mo", organic: "66%→82%", total: "₹10.00L" },
  { phase: "Phase 4", months: "M29–M36", spend: "₹75,000/mo", organic: "82%→88%", total: "₹6.00L" },
  { phase: "Phase 5", months: "M37–M48", spend: "₹50,000/mo", organic: "88%→95%", total: "₹6.00L" },
  { phase: "Phase 6", months: "M49–M60", spend: "₹35,000/mo", organic: "95%→97%", total: "₹4.20L" },
];

const results = [
  { brand: "Arena Animation", leads: "50,180/mo", cpl: "₹1", organic: "97%", total5yr: "9.3L", asset: "₹35–45 Cr" },
  { brand: "MAAC", leads: "43,392/mo", cpl: "₹1", organic: "97%", total5yr: "7.9L", asset: "₹32–42 Cr" },
  { brand: "Lakmé Academy", leads: "34,314/mo", cpl: "₹1", organic: "97%", total5yr: "6.6L", asset: "₹34–45 Cr" },
];

const assetData = [
  { metric: "SEO Articles", y1: "400", y2: "820", y3: "1,260", y4: "1,720", y5: "2,300" },
  { metric: "YouTube Videos", y1: "520", y2: "1,100", y3: "1,750", y4: "2,450", y5: "3,200" },
  { metric: "YouTube Views", y1: "18L", y2: "52L", y3: "1.2Cr", y4: "2.4Cr", y5: "4.2Cr" },
  { metric: "YT Subscribers", y1: "12K", y2: "32K", y3: "70K", y4: "1.1L", y5: "1.8L" },
  { metric: "IG Reels", y1: "365", y2: "730", y3: "1,100", y4: "1,460", y5: "1,825" },
  { metric: "IG Views", y1: "22L", y2: "68L", y3: "1.6Cr", y4: "3.0Cr", y5: "5.2Cr" },
  { metric: "IG Followers", y1: "14K", y2: "35K", y3: "68K", y4: "1.0L", y5: "1.6L" },
  { metric: "Total Leads", y1: "19,800", y2: "48,000", y3: "1.1L", y4: "1.9L", y5: "3.0L" },
];

const Aptech = () => (
  <div className="min-h-screen pt-16">
    {/* HERO */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
        <SectionLabel>CASE STUDY — APTECH LIMITED</SectionLabel>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">Three Media Brands. ₹40–50 Crore Asset. 3.1 Lakh Leads Per Year.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">How Optimizer360 deployed ARE for Arena Animation, MAAC, and Lakmé Academy — turning India's largest vocational education network into a category-owning digital powerhouse.</p>
      </div>
    </section>

    {/* CHALLENGE */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn><SectionLabel>THE CHALLENGE</SectionLabel></FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Near-Zero Digital Presence", desc: "Students searching 'VFX course Delhi' or 'makeup course near me' landed on competitors." },
            { title: "Social With No Funnel", desc: "110K Instagram followers generating near-zero inquiries. No DM automation. Zero lead capture." },
            { title: "100+ Fragmented Franchise Sites", desc: "Every center an island. No unified SEO. No city-level content. No compounding presence." },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <div className="bg-card border-l-[6px] border-destructive rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* SOLUTION */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE SOLUTION</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Three Category-Owning Media Brands.</h2>
          <p className="text-muted-foreground mb-10">Not feeder websites. Editorial media brands with their own audiences, content libraries, and lead systems.</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { brand: "AnimationCareerIndia", domain: "animationcareers.in", target: "Arena Animation centers", courses: "VFX · DCC · Animation · Game Design" },
            { brand: "VFXCourseIndia", domain: "vfxcourseindia.in", target: "MAAC centers", courses: "VFX · CareerX · 24FPS Awards" },
            { brand: "BeautyCareerIndia", domain: "beautycareers.in", target: "Lakmé Academy centers", courses: "Cosmetology · Makeup · Salon Entrepreneur" },
          ].map((b, i) => (
            <FadeIn key={b.brand} delay={i * 0.1}>
              <div className="bg-card border border-primary/30 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-primary mb-1">{b.brand}</h3>
                <p className="text-xs text-muted-foreground mb-3">{b.domain}</p>
                <p className="text-sm text-muted-foreground mb-2">All leads → {b.target}</p>
                <p className="text-xs text-muted-foreground">{b.courses}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* SPEND MODEL */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE MARKETING SPEND MODEL</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Start at ₹1.75L. End at ₹35K. Leads Never Stop Rising.</h2>
        </FadeIn>
        <FadeIn>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Phase</th>
                <th className="py-3 px-4 text-muted-foreground">Months</th>
                <th className="py-3 px-4 text-muted-foreground">Spend</th>
                <th className="py-3 px-4 text-muted-foreground">Organic %</th>
                <th className="py-3 px-4 text-muted-foreground">Phase Total</th>
              </tr></thead>
              <tbody>
                {phases.map((p, i) => (
                  <tr key={p.phase} className={i % 2 === 0 ? "bg-card/50" : ""}>
                    <td className="py-3 px-4 font-medium text-foreground">{p.phase}</td>
                    <td className="py-3 px-4 text-muted-foreground text-center">{p.months}</td>
                    <td className="py-3 px-4 text-foreground text-center">{p.spend}</td>
                    <td className="py-3 px-4 text-primary text-center">{p.organic}</td>
                    <td className="py-3 px-4 text-muted-foreground text-center">{p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-4 gap-4 mt-8">
          {[
            { num: "₹5.4L", label: "Total spend (per brand)" },
            { num: "₹105L", label: "If flat spend" },
            { num: "₹5.1L", label: "Saved (per brand)" },
            { num: "₹13", label: "Per lead at Month 60" },
          ].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="bg-card rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-primary">{s.num}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* RESULTS */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn><SectionLabel>THE RESULTS</SectionLabel></FadeIn>
        <FadeIn>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Metric</th>
                {results.map(r => <th key={r.brand} className="py-3 px-4 text-foreground">{r.brand}</th>)}
              </tr></thead>
              <tbody>
                {["leads", "cpl", "organic", "total5yr", "asset"].map((key, i) => (
                  <tr key={key} className={i % 2 === 0 ? "bg-card/50" : ""}>
                    <td className="py-3 px-4 font-medium text-foreground">{["Leads/month (Y5)", "CPL at M60", "Organic % at M60", "5-yr total leads", "Media brand asset"][i]}</td>
                    {results.map(r => <td key={r.brand} className="py-3 px-4 text-center text-primary font-medium">{(r as any)[key]}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ASSET TABLE */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE ASSET BUILT — PER BRAND — YEAR 5</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">Content Accumulation Over 5 Years</h2>
        </FadeIn>
        <FadeIn>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground">Metric</th>
                {["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"].map(y => <th key={y} className="py-3 px-4 text-muted-foreground">{y}</th>)}
              </tr></thead>
              <tbody>
                {assetData.map((row, i) => (
                  <tr key={row.metric} className={i % 2 === 0 ? "bg-card/50" : ""}>
                    <td className="py-3 px-4 font-medium text-foreground">{row.metric}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.y1}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.y2}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.y3}</td>
                    <td className="py-3 px-4 text-center text-muted-foreground">{row.y4}</td>
                    <td className="py-3 px-4 text-center text-primary font-medium">{row.y5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* VALUATION */}
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn>
          <SectionLabel>THE ASSET VALUATION — ALL 3 BRANDS — YEAR 5</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">By Year 5, Aptech Owns ₹40–50 Crore in Media Brand Assets.</h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "₹6–8 Cr", label: "SEO + Content Asset", desc: "2,300 articles, DA 50+ per domain" },
            { num: "₹8–12 Cr", label: "Social Media Asset", desc: "1.8L YT subs + 1.6L IG followers per brand" },
            { num: "₹25–30 Cr", label: "Lead Engine Value", desc: "3L leads/yr × ₹8,000 avg enrollment CAC" },
            { num: "₹40–50 Cr", label: "TOTAL — All 3 Brands", desc: "Conservative. Excludes brand equity + franchise value uplift.", highlight: true },
          ].map((v, i) => (
            <FadeIn key={v.label} delay={i * 0.1}>
              <div className={`bg-card rounded-lg p-6 text-center ${v.highlight ? "border-2 border-o360-gold" : "border border-border"}`}>
                <div className={`text-2xl font-bold mb-2 ${v.highlight ? "text-o360-gold" : "text-primary"}`}>{v.num}</div>
                <div className="text-sm font-medium text-foreground mb-1">{v.label}</div>
                <div className="text-xs text-muted-foreground">{v.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Build this for your brand.</h2>
          <Button asChild size="lg"><Link to="/contact">Book a Call <ArrowRight className="ml-1" size={16} /></Link></Button>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default Aptech;
