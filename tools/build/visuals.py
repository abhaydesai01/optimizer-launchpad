"""Creative direction for every inner page: one live hero scene (js/viz.js) and, where a human moment helps,
one cinematic video band. Scenes are illustrations with fictional brands (Aurelia Homes, Meridian Industries)
and are labelled as such on screen. Never put client names or real client data here."""

ENGINES = ["ChatGPT", "Gemini", "Claude", "Perplexity", "AI Overviews", "Copilot", "Grok", "Kimi"]

SIX = [
    {"t": "GEO", "d": "Named and cited in AI answers.", "href": "/solutions/geo/"},
    {"t": "Reputation", "d": "Reviews and press that AI trusts.", "href": "/solutions/reputation/"},
    {"t": "Feeder network", "d": "Channels that send buyers your way.", "href": "/solutions/feeder-network/"},
    {"t": "Community", "d": "A room your customers keep alive.", "href": "/solutions/content-community/"},
    {"t": "AI agents", "d": "Answers and bookings, 24/7.", "href": "/solutions/ai-agents/"},
    {"t": "Pipeline", "d": "Every deal traced to its source.", "href": "/solutions/leads-pipeline/"},
]


def ans(q, a, src, ranks):
    return {"q": q, "a": a, "src": src, "ranks": ranks}


# video bands: (file, poster, caption)
V = {
    "story": ("/assets/own/o1-story.mp4", "/assets/own/o1-story.webp"),
    "rep": ("/assets/own/o2-reputation.mp4", "/assets/own/o2-reputation.webp"),
    "com": ("/assets/own/o3-community.mp4", "/assets/own/o3-community.webp"),
    "feed": ("/assets/own/o4-feeder.mp4", "/assets/own/o4-feeder.webp"),
    "conv": ("/assets/own/o5-conversations.mp4", "/assets/own/o5-conversations.webp"),
    "pipe": ("/assets/own/o6-pipeline.mp4", "/assets/own/o6-pipeline.webp"),
    "cafe": ("/assets/video/now-cafe.mp4", "/assets/film/now-cafe.webp"),
    "friends": ("/assets/video/now-friends.mp4", "/assets/film/now-friends.webp"),
    "metro": ("/assets/video/now-metro.mp4", "/assets/film/now-metro.webp"),
    "b2b": ("/assets/video/geo-b2b.mp4", "/assets/film/geo-b2b.webp"),
    "review": ("/assets/video/own-1-review.mp4", "/assets/video/own-1-review.jpg"),
    "forum": ("/assets/video/own-3-forum.mp4", "/assets/video/own-3-forum.jpg"),
    "yt": ("/assets/video/own-5-youtube.mp4", "/assets/video/own-5-youtube.jpg"),
    "web": ("/assets/video/own-8-website.mp4", "/assets/video/own-8-website.jpg"),
    "gate": ("/assets/video/gate-hero.mp4", "/assets/cinema/m1-approach.webp"),
    "hall": ("/assets/video/vision-hall.mp4", "/assets/gate/g4-hall-hd.webp"),
    "door": ("/assets/video/zone1-door.mp4", "/assets/gate/g5-door1-hd.webp"),
    "night": ("/assets/video/night-phone.mp4", "/assets/film/night-phone.webp"),
    # v12 clips (Kling 3.0 pro from GPT Image 2.6 anchors, 10 Nov 2026)
    "desk": ("/assets/video/v12-desk.mp4", "/assets/video/v12-desk.webp"),
    "founder": ("/assets/video/v12-founder.mp4", "/assets/video/v12-founder.webp"),
    "chai": ("/assets/video/v12-chai.mp4", "/assets/video/v12-chai.webp"),
    "team": ("/assets/video/v12-team.mp4", "/assets/video/v12-team.webp"),
    "analyst": ("/assets/video/v12-analyst.mp4", "/assets/video/v12-analyst.webp"),
}

GEO_DEMO = [
    ans("Which Pune builders deliver on time?", "Buyers often shortlist <mark>Aurelia Homes</mark>, Skyline Homes and Harbour Realty. Aurelia has delivered 4,200 homes, 96% on time, per its facts page.", ["aurelia-homes.example/facts", "Google reviews", "99acres", "Times of India"], [1, 3, 2, 0, 1, 0, 0, 0]),
    ans("Is Aurelia Homes a trustworthy builder?", "Yes. Buyers rate <mark>Aurelia Homes</mark> 4.6 from 1,240 reviews, and early complaints were answered and resolved in public.", ["Google reviews", "Property portal", "Residents' forum"], [1, 1, 2, 1, 1, 0, 2, 0]),
]

DIRECTION = {
    # ---------------- solutions
    "/solutions/": {"viz": ("ring", {"items": SIX, "center": "Own your growth"}), "video": ("story", "Six assets. One engine. All of them yours.")},
    "/solutions/geo/": {"viz": ("answer", {"items": GEO_DEMO}), "video": ("cafe", "Your buyer is asking right now. Is your name in the answer?")},
    "/solutions/geo-investor-relations/": {"viz": ("flip", {"q": "Summarise Meridian Industries' latest results. Any governance concerns?", "before": [["Revenue", "Quotes the FY24 report", "two years old"], ["Margin", "Old figure from a news story", "outdated"], ["Governance", "Leads with the 2019 auditor exit", "resolved in 2020"]], "after": [["Revenue", "Quotes this quarter's filing", "latest filing"], ["Margin", "Matches the investor presentation", "current"], ["Governance", "Notes the 2019 issue as resolved", "in context"]]}), "video": ("b2b", "Analysts ask AI before they open your filing.")},
    "/solutions/reputation/": {"viz": ("reviews", {}), "video": ("rep", "Reputation is what others say when you are not in the room.")},
    "/solutions/feeder-network/": {"viz": ("network", {"hub": "Your brand", "nodes": ["Your blog", "Guide site", "Video channel", "Newsletter", "'Best of' list", "Creator review"]}), "video": ("feed", "Every channel you own keeps feeding you, long after a campaign ends.")},
    "/solutions/content-community/": {"viz": ("thread", {}), "video": ("com", "People trust people. Give them a room worth coming back to.")},
    "/solutions/ai-agents/": {"viz": ("chat", {}), "video": ("conv", "11:47 pm. Your buyer has a question. Someone answers.")},
    "/solutions/leads-pipeline/": {"viz": ("trace", {}), "video": ("pipe", "Fund what began the deal, not what touched it last.")},
    "/platform/": {"viz": None, "film": "platform", "video": None},
    # ---------------- industries
    "/industries/": {"viz": ("answer", {"items": [
        ans("Best builders in Pune for a 2BHK?", "Buyers often shortlist <mark>Aurelia Homes</mark>, Skyline Homes and Harbour Realty.", ["99acres", "RERA", "Google reviews"], [1, 2, 0, 1, 1, 0, 0, 0]),
        ans("Best CRM for an Indian sales team on WhatsApp?", "Teams often compare <mark>Your brand</mark> with two global tools, citing review sites and docs.", ["G2", "Product docs", "Reddit"], [2, 0, 1, 1, 0, 3, 0, 0]),
        ans("Healthiest packaged snack for kids?", "Parents often pick <mark>Your brand</mark> for its label: no added sugar, millet based.", ["Marketplace reviews", "Label facts", "Recipe videos"], [1, 1, 0, 2, 1, 0, 0, 1]),
    ]}), "video": ("metro", "Ten industries. Ten different ways AI decides.")},
    "/industries/real-estate/": {"viz": ("answer", {"items": [GEO_DEMO[0], ans("Which Pune projects have possession by March?", "<mark>Aurelia Homes</mark> lists possession dates for each project, RERA registered, on its facts page.", ["RERA", "aurelia-homes.example", "Housing.com"], [1, 2, 0, 1, 2, 0, 0, 0])]}), "video": ("rep", "Keys handed over. Now make sure AI tells that story.")},
    "/industries/financial-services/": {"viz": ("flip", {"q": "Is Meridian Industries a sound investment right now?", "before": [["Results", "Quotes last year's annual report", "stale"], ["Ratings", "Cites an old downgrade", "since upgraded"], ["Headline", "A resolved controversy", "outdated"]], "after": [["Results", "Quotes the latest quarterly filing", "current"], ["Ratings", "Current rating from the exchange filing", "current"], ["Headline", "The business as it is today", "in context"]]}), "video": ("b2b", "Retail investors, analysts and fund managers all ask AI first.")},
    "/industries/retail-consumer/": {"viz": ("answer", {"items": [ans("Best D2C sunscreen for oily skin in India?", "Shoppers often pick <mark>Your brand</mark> for its matte finish, rated 4.5 on marketplaces.", ["Nykaa reviews", "Amazon", "Creator videos"], [1, 2, 0, 1, 1, 0, 2, 0])]}), "video": ("review", "Shoppers ask AI, then check two review sites. Be in both.")},
    "/industries/food-fmcg/": {"viz": ("answer", {"items": [ans("Healthiest packaged snack for kids?", "Parents often choose <mark>Your brand</mark>: millet based, no added sugar, FSSAI-labelled.", ["Quick-commerce listings", "Label facts", "Recipe videos"], [1, 1, 0, 2, 1, 0, 0, 1])]}), "video": ("friends", "The answer shapes the cart before anyone opens the app.")},
    "/industries/b2b-services/": {"viz": ("answer", {"items": [ans("Best CA firm in Mumbai for startup compliance?", "Founders often shortlist <mark>Your firm</mark>, citing its compliance guides and directory profile.", ["Directory profile", "LinkedIn", "Trade press"], [2, 1, 0, 1, 0, 2, 0, 0])]}), "video": ("b2b", "The shortlist is drawn up before the first call.")},
    "/industries/technology-saas/": {"viz": ("answer", {"items": [ans("Best CRM for an Indian sales team on WhatsApp?", "Teams often compare <mark>Your product</mark> with two global tools; reviewers praise its WhatsApp inbox.", ["G2", "Product docs", "Reddit"], [2, 0, 1, 1, 0, 3, 0, 0])]}), "video": ("web", "Buyers read the answer, then the docs. Make both say the same thing.")},
    "/industries/pharma-healthcare/": {"viz": ("answer", {"items": [ans("Best hospital for knee replacement in Pune?", "Patients often consider <mark>Your hospital</mark>, citing its accreditation and published outcomes.", ["Accreditation listing", "Google reviews", "News"], [1, 2, 0, 1, 1, 0, 0, 0])]}), "video": ("night", "The question is asked at 2 am. The answer must be accurate.")},
    "/industries/manufacturing/": {"viz": ("answer", {"items": [ans("IATF 16949 certified component makers near Chennai?", "Sourcing teams often shortlist <mark>Your company</mark>, citing its current certificates, machining capacity and export record.", ["IndiaMART", "Capability page", "Certification record", "Trade press"], [2, 1, 0, 1, 2, 0, 0, 1]), ans("Contract manufacturer for private-label skincare in India?", "Brand owners often consider <mark>Your company</mark> for low minimum orders and GMP-certified lines.", ["Capability page", "TradeIndia", "Reviews"], [1, 2, 0, 1, 0, 2, 0, 0])]}), "video": ("b2b", "The supplier shortlist is written before the first RFQ.")},
    "/industries/industrial-engineering/": {"viz": ("answer", {"items": [ans("Top valve manufacturers in India with API certification?", "Procurement teams often shortlist <mark>Your company</mark>, citing its certifications and spec sheets.", ["IndiaMART", "Spec sheets", "Trade press"], [2, 1, 0, 1, 0, 2, 0, 0])]}), "video": ("b2b", "Procurement asks AI for a shortlist before the tender.")},
    "/industries/cinema-entertainment/": {"viz": ("answer", {"items": [ans("Best Malayalam thrillers on OTT this month?", "Viewers often see <mark>Your film</mark> named, with its critics' rating and streaming date.", ["Wikipedia", "Reviews", "Fan forums"], [1, 1, 2, 1, 0, 0, 1, 0])]}), "video": ("friends", "Audiences ask what to watch. Be the answer on release week.")},
    # ---------------- results
    "/results/": {"viz": ("gauge", {"from": 32, "to": 58}), "video": ("story", "Measured from week one. Proven every week.")},
    "/results/real-estate-ai-visibility/": {"viz": ("gauge", {"from": 32, "to": 58}), "video": ("story", "A residential developer in India. Under 2.5 months.")},
    "/results/investor-relations-narrative/": {"viz": ("flip", {"q": "Summarise Meridian Industries' latest results. Any governance concerns?", "before": [["Revenue", "Quotes the FY24 report", "two years old"], ["Margin", "Old figure from a news story", "outdated"], ["Governance", "Leads with the 2019 auditor exit", "resolved in 2020"]], "after": [["Revenue", "Quotes this quarter's filing", "latest filing"], ["Margin", "Matches the investor presentation", "current"], ["Governance", "Notes the 2019 issue as resolved", "in context"]]}), "video": ("analyst", "Investors ask AI before they read your filing.")},
    # ---------------- blog
    "/blog/": {"viz": ("answer", {"items": GEO_DEMO}), "video": ("desk", "Search is changing shape. Here is what holds.")},
    "/blog/generative-engine-optimization/": {"viz": ("answer", {"items": GEO_DEMO}), "video": ("cafe", "The question used to go into a search box. Now it goes into a conversation.")},
    "/blog/geo-vs-seo-vs-aeo/": {"viz": ("serp", {}), "video": ("founder", "Ten links became one answer.")},
    "/blog/how-ai-engines-choose-brands-to-cite/": {"viz": ("orbit", {}), "video": ("chai", "AI listens to what others say about you.")},
    "/blog/how-to-get-cited-by-ai-engines/": {"viz": ("wiki", {}), "video": ("forum", "Show up where people ask. Openly, as yourself.")},
    "/blog/what-an-ai-visibility-audit-includes/": {"viz": ("gauge", {"from": 32, "to": 58}), "video": ("team", "Measure the answer, not the hope.")},
    "/blog/when-ai-gets-your-brand-wrong/": {"viz": ("flip", {"q": "Summarise Meridian Industries' latest results. Any governance concerns?", "before": [["Revenue", "Quotes the FY24 report", "two years old"], ["Margin", "Old figure from a news story", "outdated"], ["Governance", "Leads with the 2019 auditor exit", "resolved in 2020"]], "after": [["Revenue", "Quotes this quarter's filing", "latest filing"], ["Margin", "Matches the investor presentation", "current"], ["Governance", "Notes the 2019 issue as resolved", "in context"]]}), "video": ("analyst", "Investors ask AI before they read your filing.")},
    # ---------------- company
    "/about/": {"viz": ("ring", {"items": [{"t": "Agents find it", "d": "8 engines, 1,000 prompts a day.", "href": "/platform/"}, {"t": "Experts fix it", "d": "Six teams own the KPIs.", "href": "/solutions/"}, {"t": "Data proves it", "d": "Weekly, against Week 1.", "href": "/results/"}], "center": "AI-native"}), "video": ("gate", "Stop renting growth. Own it.")},
    "/careers/": {"viz": ("ring", {"items": [{"t": "Brand strategy", "d": "", "href": "#"}, {"t": "GEO strategy", "d": "", "href": "#"}, {"t": "Technical", "d": "", "href": "#"}, {"t": "Content", "d": "", "href": "#"}, {"t": "Digital PR", "d": "", "href": "#"}, {"t": "Programme mgmt", "d": "", "href": "#"}, {"t": "AI agents", "d": "", "href": "#"}], "center": "Seven teams"}), "video": ("hall", "Six doors. Seven teams. One engine.")},
    "/contact/": {"viz": ("key", {}), "video": ("door", "Your key. Your door.")},
    "/glossary/": {"viz": ("chips", {}), "video": None},
    "/faq/": {"viz": ("answer", {"items": [ans("Does Optimizer360 guarantee rankings in ChatGPT?", "No. The engines decide. <mark>Optimizer360</mark> measures every week against your Week-1 baseline and shows what moved.", ["optimizer360.ai/faq"], None)]}), "video": None},
    "/privacy/": {"viz": ("flow", {}), "video": None},
    "/terms/": {"viz": ("flow", {"terms": True}), "video": None},
}
