# SEO implementation and link plan

Checked 13 September 2026. Target: founders and growing businesses commissioning software and AI integration.

## Implementation and validation

- XML and plain-text sitemaps share the same eleven content URLs. `/robots.txt` permits crawling; `/robot.txt` permanently redirects to it.
- Public content pages have unique titles/descriptions, HTTPS canonical URLs, social metadata, one H1, sequential heading levels, and image alt attributes. The abstract sculpture is decorative and intentionally has empty alt text.
- Organization, WebSite, breadcrumbs, service and founding-team schema describe the visible content. No fabricated reviews or customers.
- Automated crawl of the deployed public site passed eleven pages and 331 internal links, including anchors, image resources, schema, redirects, and genuine 404s. Missing pages retain appropriate noindex metadata.
- Responsive browser checks passed all eleven pages at 320, 390 and 1440 pixels; navigation also passed at 760 and 761 pixels, including keyboard operation and reduced motion.
- Production build, lint and nine automated tests passed. The 1200×630 social image and mobile homepage were visually inspected.
- Existing readable lowercase slugs are retained. Trailing slashes redirect to the canonical form while preserving query strings.
- Logo delivery now uses a 29 KiB WebP instead of a 241 KiB PNG. The full variable font uses 52 KiB WOFF2 instead of 162 KiB TTF. Source assets and font license remain available.
- Hero image has high fetch priority. Initially visible content avoids delayed reveal animations. An unused notification renderer was removed.

### Performance evidence

Before the subsequent services artwork/layout changes, one before/after local production run each, Lighthouse 13.4.1 simulated mobile, same machine and Chrome configuration. These are lab measurements, subject to run-to-run variation.

| Metric | Before | After |
| --- | ---: | ---: |
| Performance | 93 | 97 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 3.18 s | 2.61 s |
| CLS | 0 | 0 |
| Total blocking time | 4 ms | 6 ms |

LCP improved but remains slightly above the 2.5-second good threshold in this lab run. This does not establish a field Core Web Vitals pass: check deployed mobile and desktop field data at the 75th percentile, including INP. [Web Vitals guidance](https://web.dev/articles/vitals).

## Deployment complete; Search Console pending

The former live deployment emitted `https://example.com` as its canonical. The corrected build was deployed on 13 September 2026 to `https://das-consultancy-services.vercel.app` (deployment `dpl_Fx7MDbe5cVwdgS6tFCUy98LUSZA1`). Local environment files and test screenshots were excluded from the upload. Live HTTP already redirects to HTTPS with status 308, and HTTPS returns HSTS (`max-age=63072000; includeSubDomains; preload`).

1. For future deployments, use `NEXT_PUBLIC_SITE_URL=https://das-consultancy-services.vercel.app` (or the actual production custom domain). Recheck production canonicals, robots and both sitemaps.
2. Add that HTTPS URL as a URL-prefix property in Google Search Console. For a future domain you own, DNS verification is an alternative; do not attempt DNS ownership of `vercel.app`.
3. Select HTML-tag verification and place only the tag's `content` value in the Vercel environment variable `GOOGLE_SITE_VERIFICATION`. Rebuild/redeploy, then select Verify. Keep the token configured afterward.
4. Submit `sitemap.xml`, inspect the homepage and a service page, and review indexing and Core Web Vitals reports when data becomes available.

No token or DNS access was supplied, and ownership verification has not been completed. [Google verification instructions](https://support.google.com/webmasters/answer/9008080). XML and plain-text sitemaps are supported; submission does not guarantee indexing. [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Earn relevant backlinks

### First 30 days

- Mamik: keep company details consistent on the team's existing professional profiles and link to the homepage or team page where appropriate. Prepare an original founder-focused article about scoping an AI integration, with actual tradeoffs and implementation examples.
- Aniket: prepare a working frontend/SEO demo or a robotics integration write-up that can be shared with relevant engineering communities. Link from its public repository documentation only where the consultancy attribution is useful.
- Sumit: prepare an architecture review checklist or technical breakdown based on experience, without disclosing former employers' confidential information. Link it from the relevant service page once published.
- Build a shortlist of ten genuinely relevant founder communities, technical publications, engineering meetups or ecosystem partners. Evaluate audience fit and editorial quality before proposing useful contributions. No outreach has been sent by this task.

### Days 31–90

Publish one useful original resource per month. Offer a small number of tailored contributions to relevant communities; let editors decide whether a link helps readers. When real client work exists and permission is obtained, publish a specific case study with evidence and invite the client to reference it. Reclaim accurate unlinked company mentions where a link would help readers.

Track source page, destination, relevance, editorial contact, publication date, referral visits and qualified enquiries in a simple spreadsheet. Judge success by relevant referral traffic and enquiries, not a purchased link count. Do not buy ranking links, automate forum comments, use private link networks or arrange excessive reciprocal exchanges. [Google link-spam policy](https://developers.google.com/search/docs/essentials/spam-policies#link-spam). Mark paid placements `rel="sponsored"` and user-submitted links `rel="ugc"` where applicable. [Link qualification](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links).

## Broken-link maintenance

Run `scripts/check-seo.mjs` against each production release and monthly. Supply `TEST_URL` and `EXPECTED_SITE_URL` for the deployed origin, plus the documented Playwright/Chrome paths. This checks internal HTML links, anchors and image resources; separately review external destinations and Search Console reports.

| Finding | Action |
| --- | --- |
| Incorrect internal URL or missing anchor | Fix the source link and rerun the crawl. |
| Permanently moved page with an equivalent replacement | Add a single permanent redirect; update internal links and sitemap. |
| Deleted page with no equivalent | Keep a genuine 404/410 and remove internal references; do not redirect everything to the homepage. |
| Useful backlink pointing to an old URL | Restore the useful page or redirect to its closest equivalent; ask the publisher to update the link if appropriate. |
| External resource removed or changed | Replace it with a relevant authoritative resource or remove the reference. |
| Broken link on another relevant website | Offer your resource only if it genuinely replaces the missing material; avoid bulk templated outreach. |

Review Search Console Links and Manual Actions monthly once verified. Random spam links do not justify routine disavowal. Consider disavowal only for a substantial artificial-link problem causing or likely to cause a manual action, after attempting removal. [Google disavow guidance](https://support.google.com/webmasters/answer/2648487).
