

# Optimizer360 — Complete Website Build Plan

## Overview
Build a 9-page, dark-themed, production-ready website for Optimizer360 — an AI-native product company. The site follows a Linear/Vercel-inspired aesthetic with navy backgrounds, teal accents, and a data-driven, numbers-forward design language.

## Brand & Design System
- **Dark theme throughout** — primary bg `#0B1F3A`, cards `#122848`, teal accent `#00C9B1`
- **Inter font** (Google Fonts) — 700 headings, 500 subheadings, 400 body
- **Component library**: teal CTAs, colored-border cards, stat counters, phase badges, status pills
- **Animations**: Framer Motion for scroll fade-ups, hero stat count-ups, card hovers, chart draw-in

## Pages (9 total)

### 1. Home `/`
- Full-viewport hero with headline, animated stat counters (count-up), dual CTAs
- Product suite grid (5 cards with colored borders and status badges)
- ARE teaser with Recharts bar+line combo chart (spend vs leads)
- Solutions by vertical (6-card grid), Client proof (Aptech stats), Founder strip, Team section, Bottom CTA

### 2. ARE Flagship Product `/products/are`
- Hero with demo/pricing CTAs
- 3-column comparison table (Feeder Website vs ARE Media Brand vs Traditional Agency)
- 8-stage numbered card grid showing how ARE works
- Recharts spend model chart with 6-phase annotations and savings callouts
- ARE vs Alternatives comparison table, Platform architecture layers, Vertical fit grid, Bottom CTA

### 3. All Products `/products`
- 5 detailed product cards (ARE, Accounting Intelligence, Facility Management, Voice Agent, Patient Care)
- Custom AI Builds section with 3 capability cards

### 4. Solutions `/solutions`
- 6 vertical sections (accordion/tabbed): Education, HealthTech, FinTech, Enterprise, Government, Custom AI

### 5. Case Study — Aptech `/case-studies/aptech`
- Challenge (3 problem cards), Solution (3 brand cards)
- 5-year spend model phase table with savings callouts
- Results per brand (3-column table), Asset accumulation table (Year 1–5), Asset valuation cards

### 6. Founder `/founder`
- Premium personal brand hero for Salil Chaturvedi
- Vertical career timeline (Provogue → Prozone → StackIntel → Optimizer360)
- 3 philosophy cards, Team capability cards, CTA

### 7. About `/about`
- Company overview, 4 stat cards, 3 philosophy/principle cards
- 6 achievement cards, Bottom CTA

### 8. Pricing `/pricing`
- 2 pricing cards (Single Brand Pilot ₹2.5L/mo, Full 3-Brand ₹6L/mo)
- Performance guarantee card, FAQ accordion (9 questions)

### 9. Contact `/contact`
- Two-column: Left = form (React Hook Form + Zod validation, 9 fields), Right = "What happens next" steps + direct contact info

## Global Components
- **Sticky nav**: Logo (teal "O"), center links with active teal underline, "Book a Call" teal CTA, blur on scroll, mobile hamburger overlay
- **Footer**: 4-column layout (logo+tagline, Products links, Company links, Performance promise), bottom copyright bar

## Technical Stack
- React + TypeScript + Tailwind CSS (already set up)
- React Router v6 (already set up)
- **Add**: Framer Motion, Recharts, React Hook Form, Zod, Lucide React
- Custom CSS variables updated to match Optimizer360 dark palette
- Favicon: dark navy bg with teal "O"
- Unique meta titles/descriptions per page

## Key Visual Elements
- ARE spend/leads Recharts combo chart (orange declining bars + teal rising line) — appears on Home and ARE pages
- Animated stat counters on hero load
- Scroll-triggered fade-up animations on all sections
- Hover effects on cards (scale 1.02 + border brighten)
- No stock photos — geometric shapes and number-led visuals only

