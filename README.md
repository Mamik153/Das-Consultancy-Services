# Das Software Consultancy

Marketing site. Next.js 16 canary (App Router), Tailwind v4, shadcn/ui. Every
page is statically prerendered.

## Before launch

Business details, service descriptions, FAQs, and metadata read from **`site.config.ts`**. Homepage presentation copy lives in `app/page.tsx`. Search the config for `TODO`.
In priority order:

1. **`NEXT_PUBLIC_SITE_URL`** — set in `.env.local` and in Vercel. Without it
   every canonical URL, the sitemap, `robots.txt`, and `llms.txt` all point at
   `https://example.com`.
2. **`description` and each service `summary`** — this is the text answer
   engines quote when asked what the firm does. Concrete beats aspirational.
3. **`sameAs`** — LinkedIn / GitHub URLs. Confirms to search engines that the
   business is a real, identifiable entity.
4. **Resend** — configure the private recipient and verified sender as described below.
5. **Legal pages** — review `/legal` and `/terms` against your actual business identity,
   data handling, and commercial agreements before public launch. These are general
   website drafts for India; paid work is governed by a separate written agreement.
6. **`app/about/page.tsx`** — two `TODO` blocks of placeholder biography.

## Team profiles

Edit the three entries in `site.team` in `site.config.ts`: `name`, `role`, `bio`,
and `portrait`. Mamik Das is Founder; Aniket Giri and Sumit Khanna are Co-founders.
All three also carry the title “Software engineer”. Empty bios are omitted. A blank `name` shows an honest
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
| Root + per-page metadata, canonicals | `app/layout.tsx`, each `page.tsx` |
| JSON-LD (ProfessionalService, WebSite, FAQPage, BreadcrumbList) | `lib/schema.ts` |
| Sitemap | `app/sitemap.ts` — add a line per new route |
| robots.txt, AI crawlers explicitly allowed | `app/robots.ts` |
| `llms.txt` | `app/llms.txt/route.ts` — generated from `site.config.ts` |
| OG image (1200×630) | `app/opengraph-image.tsx` |

## Deliberately not here

No CMS, no database, no auth, no middleware, no Cache Components — nothing on
page content is dynamic, so none of it would earn its keep. No blog yet; when you
want one, `/insights` with MDX slots in without restructuring, and it is the
single highest-leverage addition for getting cited by answer engines.

The contact form has a honeypot, not rate limiting. Add rate limiting if abuse appears.

## Design and assets

The reference-led agency design uses cobalt blue, charcoal, light gray, oversized
Manrope typography, and rounded panels. `PRODUCT.md` records confirmed product
facts; `DESIGN.md` records the implemented visual system. No client work or
customer testimonials are presented until real material is supplied.

- `public/images/precision-sculpture.webp`: original artwork generated with the
  built-in ImageGen tool, optimized to approximately 64 KB.
- `app/fonts/manrope-variable.ttf`: self-hosted Manrope from Google Fonts.
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
1440, 390, and 320 pixels, horizontal overflow, navigation, native FAQ keyboard
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
