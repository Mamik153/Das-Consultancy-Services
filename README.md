# Das Software Consultancy

Marketing site. Next.js 16 canary (App Router), Tailwind v4, shadcn/ui. Every
page is statically prerendered.

## Before launch

Everything on the site reads from **`site.config.ts`**. Search it for `TODO`.
In priority order:

1. **`NEXT_PUBLIC_SITE_URL`** — set in `.env.local` and in Vercel. Without it
   every canonical URL, the sitemap, `robots.txt`, and `llms.txt` all point at
   `https://example.com`.
2. **`description` and each service `summary`** — this is the text answer
   engines quote when asked what the firm does. Concrete beats aspirational.
3. **`sameAs`** — LinkedIn / GitHub URLs. Confirms to search engines that the
   business is a real, identifiable entity.
4. **Resend sender** — `app/contact/actions.ts` sends from `onboarding@resend.dev`,
   which only delivers to your own Resend account address. Verify your domain in
   Resend and change it.
5. **`app/about/page.tsx`** — two `TODO` blocks of placeholder biography.

## Commands

```bash
pnpm dev      # dev server
pnpm test     # zod contact-schema assertions (node --test)
pnpm build    # production build — all routes must show ○ (Static)
pnpm start    # serve the production build
pnpm lint
```

## Environment

Copy `.env.example` to `.env.local`. Three variables: `NEXT_PUBLIC_SITE_URL`,
`RESEND_API_KEY`, `CONTACT_TO_EMAIL`. Set all three in Vercel across
Production, Preview, and Development.

## SEO / GEO surface

| What | Where |
|---|---|
| Root + per-page metadata, canonicals | `app/layout.tsx`, each `page.tsx` |
| JSON-LD (ProfessionalService, WebSite, FAQPage, BreadcrumbList) | `lib/schema.ts` |
| Sitemap | `app/sitemap.ts` — add a line per new route |
| robots.txt, AI crawlers explicitly allowed | `app/robots.ts` |
| `llms.txt` | `app/llms.txt/route.ts` — generated from `site.config.ts` |
| OG image (1200×630) | `app/opengraph-image.tsx` |

## Deliberately not here

No CMS, no database, no auth, no middleware, no Cache Components — nothing on
this site is dynamic, so none of it would earn its keep. No blog yet; when you
want one, `/insights` with MDX slots in without restructuring, and it is the
single highest-leverage addition for getting cited by answer engines.

Contact form rate limiting is a honeypot only. Add `@upstash/ratelimit` if spam
actually shows up.
