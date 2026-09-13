# Das Software Consultancy

Marketing site. Next.js 16 canary (App Router), Tailwind v4, shadcn/ui. Every
page is statically prerendered.

## Before launch

Business details, service descriptions, FAQs, and metadata read from **`site.config.ts`**. Homepage presentation copy lives in `app/page.tsx`. Search the config for `TODO`.
In priority order:

1. **`NEXT_PUBLIC_SITE_URL`** — currently `https://das-consultancy-services.vercel.app`. Set this in Vercel production settings as well as locally; remove any old `example.com` value. After buying a domain, connect it in Vercel, update this value, redeploy, and permanently redirect the old domain to the new one. Canonicals, social metadata, sitemap, robots, and `llms.txt` use the same normalized origin.
2. **`description` and each service `summary`** — keep these accurate, concise, and consistent with the visible service offering. Search engines may choose their own snippets.
3. **`sameAs`** — LinkedIn / GitHub URLs. Confirms to search engines that the
   business is a real, identifiable entity.
4. **Resend** — configure the private recipient and verified sender as described below.
5. **Legal pages** — review `/legal` and `/terms` against your actual business identity,
   data handling, and commercial agreements before public launch. These are general
   website drafts for India; paid work is governed by a separate written agreement.
6. **`app/about/page.tsx`** — two `TODO` blocks of placeholder biography.

## Team profiles

Edit the three entries in `site.team` in `site.config.ts`: `name`, `role`, `previousRole`,
`bio`, `expertise`, and `portrait`. Mamik is Founder & CEO, Aniket is Co-founder & CPO,
and Sumit is Co-founder & CTO. Previous roles and expertise reflect supplied experience.
The current roster contains only founding members and also supplies founder structured data.
Empty bios are omitted. A blank `name` shows an honest
coming-soon introduction. Do not invent people or credentials.

For portraits, add a file such as `public/images/team/name.webp` and set
`portrait` to `/images/team/name.webp`. Leave it blank to use the initials or
placeholder icon.

## Commands

```bash
pnpm dev      # dev server
pnpm test     # validation and mocked Resend action checks (no email sent)
pnpm build    # production build, including four generated service pages
pnpm start    # serve the production build
pnpm lint
```

## Environment

Copy `.env.example` to `.env.local` and configure the same values on your host:

- `NEXT_PUBLIC_SITE_URL`: your final public website URL.
- `RESEND_API_KEY`: your Resend API key.
- `CONTACT_FROM_EMAIL`: a plain sender address on a domain verified in Resend.
- `CONTACT_TO_EMAIL`: your private Gmail inbox.

Only the site URL is public. Never prefix email settings or the API key with
`NEXT_PUBLIC_`. The server action uses the visitor’s email as Reply-To and sends
to the configured inbox. Missing configuration or delivery failure shows an error
and preserves the visitor’s message. No inbox address appears on public pages,
structured data, or `llms.txt`.

Sender setup: [Resend domain and sender guidance](https://resend.com/docs/knowledge-base/how-do-I-create-an-email-address-or-sender-in-resend).
The India privacy draft accounts for phased commencement rather than claiming
all provisions are already effective; reference the official
[DPDP Act](https://www.meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf)
and [2025 Rules](https://www.meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf).

## SEO / GEO surface

| What | Where |
|---|---|
| Unique titles/descriptions, canonicals, matching Open Graph and Twitter previews | `lib/metadata.ts`, `app/layout.tsx`, each `page.tsx` |
| JSON-LD (Organization, WebSite, FAQPage, BreadcrumbList, founding-team AboutPage/Person, service details) | `lib/schema.ts`, service detail route |
| Sitemap | `app/sitemap.ts` — add a line per new route |
| robots.txt, AI crawlers explicitly allowed | `app/robots.ts` |
| `llms.txt` | `app/llms.txt/route.ts` — generated from `site.config.ts` |
| OG image (1200×630) | `app/opengraph-image.tsx` |


### Search and AI-search operations

Google applies its existing SEO fundamentals to AI Overviews and AI Mode: crawlable server-rendered text, useful internal links, good page experience, and structured data consistent with visible content. No special AI schema or `llms.txt` is required. The existing `llms.txt` remains an optional readable index; it does not guarantee citations. Organization markup uses the real logo, and founding-team data uses supplied biographies. No invented addresses, ratings, clients, or credentials are included. FAQ markup is emitted on the homepage only, where the answers are visible; Google retired FAQ rich results in May 2026; this markup only describes the visible questions and answers.

Production pages permit indexing and rich snippets. Application metadata permits indexing; Vercel may independently restrict preview deployments through response headers or authentication. robots.txt permits search crawling, including OAI-SearchBot; explicit permissions do not override Vercel firewall or bot-protection settings. Search access and model-training access are separate policies; the existing training permissions were preserved.

After deploying, verify the domain in Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`, check that inclusion in Search generative AI features is enabled in Search Console, inspect the rendered homepage and a service page, and validate JSON-LD with the Rich Results Test and Schema Markup Validator. Check mobile Core Web Vitals using PageSpeed Insights and field data when available. Check that Vercel's production environment uses the public URL above and does not require authentication. External indexing, rankings, and AI citations are not guaranteed by code changes.

Official references checked for this update:
- [Google: 2026 generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: FAQ rich-result retirement](https://developers.google.com/search/updates#may-2026)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google: organization logos](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: useful meta descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [OpenAI: search versus training crawlers](https://developers.openai.com/api/docs/bots)

## Deliberately not here

No CMS, no database, no auth, no middleware, no Cache Components — nothing on
page content is dynamic, so none of it would earn its keep. No blog yet; when you
want one, `/insights` with MDX slots in without restructuring, when there is useful original material to publish. Do not manufacture case studies or publish filler for search engines.

The contact form has a honeypot, not rate limiting. Add rate limiting if abuse appears.

## Design and assets

The reference-led agency design uses cobalt blue, charcoal, light gray, oversized
Manrope typography, and rounded panels. `PRODUCT.md` records confirmed product
facts; `DESIGN.md` records the implemented visual system. No client work or
customer testimonials are presented until real material is supplied.

- `public/images/precision-sculpture.webp`: original artwork generated with the
  built-in ImageGen tool, optimized to approximately 64 KB.
- `app/fonts/manrope-variable.woff2`: compressed, self-hosted Manrope from Google Fonts (the original TTF is retained).
  Its open font license is included in `app/fonts/OFL.txt`.

Artwork prompt: “Premium editorial 3D sculpture, portrait 4:5: a glossy cobalt
blue tubular arch, a brushed chrome sphere nested through its opening, and a
folded ivory ribbon-like structural element on a cool gray studio floor.
Believable soft shadows, soft upper-left daylight, meticulous reflections.
Composition fills the central 80%, leaving room for HTML labels. No text, logos,
interface, or watermark. Original abstract artwork suggesting precision and
connected systems, not a client project.”

## Visual verification

With the dev server running, `scripts/check-ui.mjs` checks all eleven pages at
1440, 390, and 320 pixels, horizontal overflow, active navigation, canonical/social metadata, JSON-LD, native FAQ keyboard
interaction, enquiry validation, network-failure message retention, success feedback,
reduced motion, sitemap entries, and browser errors. It uses a fresh headless
profile; success takes the honeypot no-send branch and never delivers email. Screenshots are written to
`.impeccable/screenshots/` (ignored by Git).

Use an existing Playwright installation without adding a runtime dependency:

```bash
PLAYWRIGHT_MODULE=/absolute/path/to/playwright \
CHROME_PATH=/absolute/path/to/chrome \
node scripts/check-ui.mjs
```

`CHROME_PATH` can be omitted when Playwright's matching browser is installed.
`TEST_URL` defaults to `http://127.0.0.1:3000`.

`EXPECTED_SITE_URL` lets the browser checks validate a future custom canonical domain.

## SEO maintenance

See [SEO.md](SEO.md) for verification, performance measurements, and the backlink and broken-link plan.
Run `scripts/check-seo.mjs` with the same Playwright and Chrome variables above; its `TEST_URL` defaults to `http://127.0.0.1:3001`.
Set `GOOGLE_SITE_VERIFICATION` to the Search Console HTML-tag content token and rebuild before verifying ownership.
