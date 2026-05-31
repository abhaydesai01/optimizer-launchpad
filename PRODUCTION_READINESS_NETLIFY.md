# Optimizer360 Production Readiness (Netlify)

Use this checklist for first production launch and every major release.

## 1) Netlify Environment Variables

Set all variables in:

- Netlify Dashboard -> `Site configuration` -> `Environment variables`

Use **Production** scope (and **Deploy previews** only if needed).

### Required Variables (exact key names)

- `MONGODB_URI`
  - Value: your Mongo Atlas connection string
  - Example:
    - `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/linkedin_os?appName=Cluster0`

- `ANTHROPIC_API_KEY`
  - Value: your Anthropic API key
  - Example:
    - `sk-ant-...`

- `ADMIN_EMAIL`
  - Value: production admin login email
  - Example:
    - `admin@optimizer360.ai`

- `ADMIN_PASSWORD`
  - Value: strong random password (16+ chars)
  - Example:
    - `use-a-random-generated-secret`

- `NEXTAUTH_SECRET`
  - Value: long random secret (32+ chars)
  - Generate:
    - `openssl rand -base64 48`

- `NEXTAUTH_URL`
  - Value: your canonical production URL
  - Value for this project:
    - `https://optimizer360.ai`

- `RESEND_API_KEY`
  - Value: Resend API key
  - Example:
    - `re_...`

- `TO_EMAIL`
  - Value: owner inbox for lead notifications
  - Example:
    - `abhay@optimizer360.ai`

- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
  - Value: Google reCAPTCHA site key (public)

- `RECAPTCHA_SECRET_KEY`
  - Value: Google reCAPTCHA secret key (private)

- `FOUNDER_EMAIL_DELAY_MINUTES`
  - Recommended value:
    - `7`

- `FOUNDER_QUEUE_SECRET`
  - Value: random secret used by cron caller
  - Generate:
    - `openssl rand -hex 32`

### Optional (recommended)

- `NEXT_PUBLIC_CAL_LINK`
  - Recommended value:
    - `https://cal.com/abhay-desai/free-geo-strategy-call-optimizer360`

- `INDEXNOW_KEY`
  - Optional. Set if you want publish-time IndexNow pings.

## 2) Netlify Build and Publish Configuration

Set in Netlify:

- `Build command`:
  - `npm run build`
- `Publish directory`:
  - `.next`

For Next.js on Netlify, ensure the official Next runtime/plugin is enabled in the site setup (Netlify auto-detect usually handles this).

## 3) Cron Setup (Founder Queue Processor)

The founder follow-up email queue is processed via:

- `POST /api/jobs/process-founder-emails`

This route expects header auth with `FOUNDER_QUEUE_SECRET`.

### Recommended Cron Option (simple): cron-job.org

Create a job:

- URL:
  - `https://optimizer360.ai/api/jobs/process-founder-emails`
- Method:
  - `POST`
- Interval:
  - every `2 minutes`
- Headers:
  - `x-founder-queue-secret: <FOUNDER_QUEUE_SECRET>`

### Alternative Cron Option: GitHub Actions Scheduler

Run every 2 minutes and call:

- `curl -X POST https://optimizer360.ai/api/jobs/process-founder-emails -H "x-founder-queue-secret: $FOUNDER_QUEUE_SECRET"`

## 4) DNS / Domain Settings

Set in:

- Netlify Dashboard -> `Domain management`

### Primary domain

- Set primary domain to:
  - `optimizer360.ai`

### DNS records (typical)

If using Netlify DNS:

- Apex (`@`) -> Netlify-managed apex record (A/ALIAS handled by Netlify)
- `www` -> CNAME to your Netlify subdomain (`<site>.netlify.app`)

If using external DNS provider:

- Apex (`@`) -> Netlify load balancer target (use Netlify-provided values)
- `www` -> CNAME `<site>.netlify.app`

### SSL

- Enable HTTPS certificate (Let's Encrypt) in Netlify domain settings.
- Force HTTPS redirect.

### Canonical redirects

Add redirect rule (Netlify redirects file or UI):

- `http://optimizer360.ai/*` -> `https://optimizer360.ai/:splat` (301)
- `https://www.optimizer360.ai/*` -> `https://optimizer360.ai/:splat` (301)

## 5) Final Production Smoke Tests

- Public pages load:
  - `/`, `/are`, `/usecases`, `/blog`, `/contact`
- Contact and audit forms:
  - valid submit works
  - invalid captcha fails
  - rate limit returns `429`
- Admin login:
  - valid credentials work
  - repeated bad logins are throttled
- Content pipeline:
  - start -> brief -> draft -> review -> schema -> publish
- Published blogs:
  - appear on `/blog`
  - open at `/blog/[slug]`
- SEO endpoints:
  - `/sitemap.xml` returns `200`
  - `/robots.txt` returns expected crawler directives
- Founder queue:
  - cron calls job endpoint successfully
  - pending founder emails move to sent/failed with logs

## 6) Security and Ops Notes

- Do **not** commit real secrets to git.
- Rotate any leaked keys immediately (Mongo, Resend, Anthropic, NextAuth secret).
- Use separate keys for staging vs production.
- Restrict MongoDB network access to trusted origins where possible.

