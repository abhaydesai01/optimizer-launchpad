# Optimizer360 Launchpad

Next.js 14 marketing site and admin content pipeline for GEO publishing.

## Tech Stack

- Next.js 14 (App Router), React 18, TypeScript
- MongoDB + Mongoose
- NextAuth (credentials provider for admin)
- Anthropic Claude for brief/draft/review/schema generation
- Resend for contact and audit notifications

## Local Setup

1. Install dependencies:
   - `npm install`
2. Create environment file:
   - `cp .env.local.example .env.local`
3. Fill required environment variables:
   - `MONGODB_URI`
   - `ANTHROPIC_API_KEY`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (`http://localhost:3000` for local)
   - `RESEND_API_KEY`
   - `TO_EMAIL`
   - `FOUNDER_EMAIL_DELAY_MINUTES` (default: `7`)
   - `FOUNDER_QUEUE_SECRET` (required in production for queue job auth)
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`
   - Optional: `NEXT_PUBLIC_CAL_LINK`, `INDEXNOW_KEY`
4. Run dev server:
   - `npm run dev`

## Key Routes

- Public:
  - `/`, `/are`, `/blog`, `/blog/[slug]`, `/about`, `/pricing`, `/contact`
- Admin:
  - `/admin/login`
  - `/admin`, `/admin/targets`, `/admin/articles`
  - `/admin/articles/[id]/brief|draft|review|schema|publish`

## Pipeline Flow

1. Seed targets (optional)
2. Start pipeline from admin dashboard
3. Generate brief
4. Generate draft
5. Review / rewrite
6. Inject schema + internal links
7. Publish article (optional IndexNow ping)

## Destructive Command Warning

`npm run seed:targets` runs `scripts/seed-targets.ts` and calls:

- `Target.deleteMany({})`

This deletes all existing targets before reseeding.
Use only in local/dev or with explicit approval in shared environments.

## Security and Abuse Controls

- Public forms (`/api/contact`, `/api/audit`) enforce:
  - reCAPTCHA verification
  - IP-based rate limiting
- Admin credential login has request throttling.

## GEO Schema and Robots Templates

- JSON-LD template library:
  - `lib/schema-library.ts`
  - Pre-built templates:
    - `FAQPage`
    - `Organization`
    - `Course`
    - `MedicalBusiness`
    - `LocalBusiness`
    - `Product`
    - `QAPage`
- Robots template library:
  - `lib/robots-template.ts`
  - Consumed by `app/robots.ts`
  - Explicit allow directives for:
    - `GPTBot`
    - `PerplexityBot`
    - `ClaudeBot`
    - `Google-Extended`

## Founder Email Delay Queue

- Contact/audit submissions queue a founder follow-up email instead of sending immediately.
- Queue processor endpoint:
  - `POST /api/jobs/process-founder-emails`
- Authorization:
  - Set `FOUNDER_QUEUE_SECRET` and send it as `x-founder-queue-secret` header (or Bearer token).
- Run this endpoint via cron every 1-2 minutes for near-real-time delayed sends.

## Staging Verification Checklist

Before production release, validate:

1. Env vars present in staging
2. Contact form submission success + captcha failure path
3. Audit form submission success + captcha failure path
4. Rate-limit behavior (`429` and `Retry-After` headers)
5. Admin login throttling after repeated failures
6. End-to-end pipeline publish from a fresh target
7. `/sitemap.xml` includes published `/blog/[slug]` URLs

## Incident Quick Checks

If pipeline or form submission fails:

1. Check missing/invalid env vars in deployment logs.
2. Check MongoDB connectivity (`MONGODB_URI`).
3. Check Anthropic API errors for admin generation routes.
4. Check Resend API status for contact/audit routes.
5. Check reCAPTCHA keys for public form failures.
6. Review `PipelineLog` entries for failed step diagnostics.

## Useful Commands

- `npm run dev` - start local development server
- `npm run build` - production build
- `npm run start` - run built app
- `npm run lint` - lint checks
- `npm run seed:targets` - destructive target reseed
