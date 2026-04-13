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
  <div className="min-h-screen">
    <section className="pt-32 pb-24 hero-gradient relative overflow-hidden">
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center relative z-10">
        <SectionLabel>CASE STUDY — APTECH LIMITED</SectionLabel>
        <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-6 tracking-tight">Three Media Brands. <span className="gradient-text-gold">₹40–50 Crore Asset.</span> 3.1 Lakh Leads/Year.</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">How Optimizer360 deployed ARE for Arena Animation, MAAC, and Lakmé Academy.</p>
      </div>
    </section>

    {/* CHALLENGE */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE CHALLENGE</SectionLabel></div></FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Near-Zero Digital Presence", desc: "Students searching 'VFX course Delhi' landed on competitors." },
            { title: "Social With No Funnel", desc: "110K followers generating near-zero inquiries. No DM automation." },
            { title: "100+ Fragmented Sites", desc: "Every center an island. No unified SEO. No compounding presence." },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <div className="glass-card border-l-4 border-destructive rounded-xl p-6 card-hover">
                <h3 className="text-lg font-bold text-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* SOLUTION */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <SectionLabel>THE SOLUTION</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Three <span className="gradient-text">Category-Owning</span> Media Brands.</h2>
          </div>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { brand: "AnimationCareerIndia", domain: "animationcareers.in", target: "Arena Animation", courses: "VFX · DCC · Animation · Game Design" },
            { brand: "VFXCourseIndia", domain: "vfxcourseindia.in", target: "MAAC", courses: "VFX · CareerX · 24FPS Awards" },
            { brand: "BeautyCareerIndia", domain: "beautycareers.in", target: "Lakmé Academy", courses: "Cosmetology · Makeup · Salon Entrepreneur" },
          ].map((b, i) => (
            <FadeIn key={b.brand} delay={i * 0.1}>
              <div className="glass-card rounded-xl p-6 card-hover border-t-2 border-primary/30">
                <h3 className="text-lg font-bold gradient-text mb-1">{b.brand}</h3>
                <p className="text-xs text-muted-foreground mb-3">{b.domain}</p>
                <p className="text-sm text-muted-foreground mb-2">All leads → {b.target} centers</p>
                <p className="text-xs text-muted-foreground/70">{b.courses}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* SPEND MODEL */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE MARKETING SPEND MODEL</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Start at ₹1.75L. End at ₹35K.</h2></div></FadeIn>
        <FadeIn>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/[0.06]">
                  {["Phase", "Months", "Spend", "Organic %", "Phase Total"].map(h => <th key={h} className="py-4 px-5 text-muted-foreground text-xs uppercase tracking-wider first:text-left">{h}</th>)}
                </tr></thead>
                <tbody>
                  {phases.map((p, i) => (
                    <tr key={p.phase} className="border-b border-white/[0.03]">
                      <td className="py-3 px-5 font-bold text-foreground">{p.phase}</td>
                      <td className="py-3 px-5 text-muted-foreground text-center">{p.months}</td>
                      <td className="py-3 px-5 text-foreground text-center font-medium">{p.spend}</td>
                      <td className="py-3 px-5 text-center gradient-text font-semibold">{p.organic}</td>
                      <td className="py-3 px-5 text-muted-foreground text-center">{p.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[{ num: "₹5.4L", label: "Total spend (per brand)" }, { num: "₹105L", label: "If flat spend" }, { num: "₹5.1L", label: "Saved (per brand)" }, { num: "₹13", label: "Per lead at M60" }].map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}><div className="glass-card rounded-xl p-5 text-center"><div className="text-2xl font-extrabold gradient-text stat-glow">{s.num}</div><div className="text-xs text-muted-foreground mt-1">{s.label}</div></div></FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* RESULTS */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE RESULTS</SectionLabel></div></FadeIn>
        <FadeIn>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/[0.06]">
                  <th className="text-left py-4 px-5 text-muted-foreground text-xs uppercase tracking-wider">Metric</th>
                  {results.map(r => <th key={r.brand} className="py-4 px-5 text-foreground text-xs uppercase tracking-wider">{r.brand}</th>)}
                </tr></thead>
                <tbody>
                  {[
                    { key: "leads", label: "Leads/month (Y5)" },
                    { key: "cpl", label: "CPL at M60" },
                    { key: "organic", label: "Organic % at M60" },
                    { key: "total5yr", label: "5-yr total leads" },
                    { key: "asset", label: "Media brand asset" },
                  ].map((row, i) => (
                    <tr key={row.key} className="border-b border-white/[0.03]">
                      <td className="py-3 px-5 font-medium text-foreground">{row.label}</td>
                      {results.map(r => <td key={r.brand} className="py-3 px-5 text-center gradient-text font-semibold">{(r as any)[row.key]}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* ASSET TABLE */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <FadeIn><div className="text-center mb-16"><SectionLabel>THE ASSET BUILT — PER BRAND</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Content Accumulation Over 5 Years</h2></div></FadeIn>
        <FadeIn>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-white/[0.06]">
                  <th className="text-left py-4 px-5 text-muted-foreground text-xs uppercase tracking-wider">Metric</th>
                  {["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"].map(y => <th key={y} className="py-4 px-5 text-muted-foreground text-xs uppercase tracking-wider">{y}</th>)}
                </tr></thead>
                <tbody>
                  {assetData.map((row, i) => (
                    <tr key={row.metric} className="border-b border-white/[0.03]">
                      <td className="py-3 px-5 font-medium text-foreground">{row.metric}</td>
                      <td className="py-3 px-5 text-center text-muted-foreground">{row.y1}</td>
                      <td className="py-3 px-5 text-center text-muted-foreground">{row.y2}</td>
                      <td className="py-3 px-5 text-center text-muted-foreground">{row.y3}</td>
                      <td className="py-3 px-5 text-center text-muted-foreground">{row.y4}</td>
                      <td className="py-3 px-5 text-center gradient-text font-semibold">{row.y5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>

    {/* VALUATION */}
    <section className="py-24 relative">
      <div className="absolute inset-0 section-gradient" />
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <FadeIn><div className="text-center mb-16"><SectionLabel>ASSET VALUATION — ALL 3 BRANDS</SectionLabel><h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">₹40–50 Crore in <span className="gradient-text-gold">Media Brand Assets.</span></h2></div></FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: "₹6–8 Cr", label: "SEO + Content Asset", desc: "2,300 articles, DA 50+" },
            { num: "₹8–12 Cr", label: "Social Media Asset", desc: "1.8L YT subs + 1.6L IG per brand" },
            { num: "₹25–30 Cr", label: "Lead Engine Value", desc: "3L leads/yr × ₹8K CAC" },
            { num: "₹40–50 Cr", label: "TOTAL — All 3 Brands", desc: "Conservative estimate", highlight: true },
          ].map((v, i) => (
            <FadeIn key={v.label} delay={i * 0.1}>
              <div className={`glass-card rounded-xl p-6 text-center card-hover ${v.highlight ? "border-2 border-accent glow-gold" : ""}`}>
                <div className={`text-2xl font-extrabold mb-2 ${v.highlight ? "gradient-text-gold" : "gradient-text"} stat-glow`}>{v.num}</div>
                <div className="text-sm font-bold text-foreground mb-1">{v.label}</div>
                <div className="text-xs text-muted-foreground">{v.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-24 hero-gradient">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8 tracking-tight">Build this for your brand.</h2>
          <Button asChild size="lg" className="rounded-full px-10 shadow-lg shadow-primary/25 h-12">
            <Link to="/contact">Book a Call <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
        </FadeIn>
      </div>
    </section>
  </div>
);

export default Aptech;
