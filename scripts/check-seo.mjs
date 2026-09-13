// Crawl the real rendered site. Uses the same optional Playwright installation as check-ui.mjs.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.TEST_URL || "http://127.0.0.1:3001";
const origin = process.env.EXPECTED_SITE_URL || "https://das-consultancy-services.vercel.app";
const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}) });
const page = await browser.newPage({ reducedMotion: "reduce" });
const pages = new Map();
const titles = new Set();
const descriptions = new Set();
try {
  const xmlResponse = await page.request.get(base + "/sitemap.xml");
  assert.equal(xmlResponse.status(), 200);
  const xml = await xmlResponse.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.equal(new Set(urls).size, urls.length, "no duplicate sitemap URLs");
  assert.equal(urls.length, 11, "all eleven content pages");
  const textResponse = await page.request.get(base + "/sitemap.txt");
  assert.equal(textResponse.status(), 200);
  assert.match(textResponse.headers()["content-type"], /text\/plain/);
  assert.deepEqual((await textResponse.text()).trim().split("\n"), urls);
  const robots = await page.request.get(base + "/robots.txt");
  assert.equal(robots.status(), 200);
  const rules = await robots.text();
  assert.match(rules, /User-Agent: \*/i);
  assert.doesNotMatch(rules, /^Disallow:\s*\/\s*$/im);
  assert.ok(rules.includes(`Sitemap: ${origin}/sitemap.xml`));
  const alias = await page.request.get(base + "/robot.txt", { maxRedirects: 0 });
  assert.equal(alias.status(), 308);
  assert.equal(new URL(alias.headers().location, base).pathname, "/robots.txt");

  for (const url of urls) {
    const canonical = new URL(url);
    assert.equal(canonical.origin, origin);
    assert.equal(canonical.protocol, "https:");
    assert.match(canonical.pathname, /^\/(?:[a-z0-9-]+(?:\/[a-z0-9-]+)*)?$/);
    const response = await page.goto(base + canonical.pathname);
    assert.equal(response.status(), 200, url);
    assert.doesNotMatch(response.headers()["x-robots-tag"] || "", /noindex|none/i);
    const document = await page.evaluate(() => ({
      title: window.document.title,
      descriptions: [...window.document.querySelectorAll('meta[name="description"]')].map((el) => el.content),
      canonicals: [...window.document.querySelectorAll('link[rel="canonical"]')].map((el) => el.href),
      robots: [...window.document.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')].map((el) => el.content),
      headings: [...window.document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((el) => ({ level: Number(el.tagName[1]), text: el.textContent.trim() })),
      images: [...window.document.images].map((el) => ({ alt: el.getAttribute("alt"), decorative: el.classList.contains("sculpture") || Boolean(el.closest('.capabilities-art, [aria-hidden="true"]')), src: el.currentSrc || el.src })),
      ids: [...window.document.querySelectorAll("[id]")].map((el) => el.id),
      links: [...window.document.querySelectorAll("a[href]")].map((el) => el.getAttribute("href")),
      schema: [...window.document.querySelectorAll('script[type="application/ld+json"]')].flatMap((el) => JSON.parse(el.textContent)["@graph"]),
      og: window.document.querySelector('meta[property="og:image"]')?.content,
    }));
    assert.equal(document.headings.filter(({ level }) => level === 1).length, 1, url);
    let previous = 0;
    for (const heading of document.headings) {
      assert.ok(heading.text, `empty heading: ${url}`);
      assert.ok(heading.level <= previous + 1, `${url}: skipped heading level before ${heading.text}`);
      previous = heading.level;
    }
    assert.equal(new Set(document.ids).size, document.ids.length, `${url}: duplicate IDs`);
    assert.deepEqual(document.canonicals, [canonical.href]);
    assert.equal(document.descriptions.length, 1);
    assert.ok(document.descriptions[0].length >= 40 && document.descriptions[0].length <= 200, `${url}: description length`);
    assert.ok(document.title.length >= 15 && document.title.length <= 100);
    assert.ok(!titles.has(document.title) && !descriptions.has(document.descriptions[0]), `${url}: duplicate metadata`);
    titles.add(document.title); descriptions.add(document.descriptions[0]);
    assert.ok(document.robots.length > 0);
    assert.doesNotMatch(document.robots.join(" "), /noindex|none/i, url);
    for (const image of document.images) {
      assert.notEqual(image.alt, null, `${url}: image missing alt`);
      assert.ok(image.alt || image.decorative, `${url}: meaningful image needs alt`);
    }
    assert.ok(document.schema.some((item) => item["@type"] === "Organization"));
    assert.ok(document.schema.some((item) => item["@type"] === "WebSite"));
    if (canonical.pathname !== "/") {
      const crumbs = document.schema.find((item) => item["@type"] === "BreadcrumbList");
      assert.equal(crumbs?.itemListElement.at(-1).item, url);
    }
    if (canonical.pathname.startsWith("/services/")) assert.ok(document.schema.some((item) => item["@type"] === "Service" && item.url === url));
    if (canonical.pathname === "/team") assert.equal(document.schema.find((item) => item["@type"] === "AboutPage").mainEntity.length, 3);
    assert.equal(new URL(document.og).origin, origin);
    pages.set(canonical.pathname, document);
  }

  const checked = new Set();
  let internalLinks = 0;
  for (const [path, document] of pages) {
    for (const href of document.links) {
      const target = new URL(href, origin + path);
      if (target.origin !== origin) continue;
      internalLinks++;
      const targetPage = pages.get(target.pathname);
      if (targetPage && target.hash) assert.ok(targetPage.ids.includes(decodeURIComponent(target.hash.slice(1))), `${path}: broken anchor ${href}`);
      if (!checked.has(target.pathname)) {
        const result = await page.request.get(base + target.pathname, { maxRedirects: 0 });
        assert.equal(result.status(), 200, `${path}: broken or redirecting link ${href}`);
        checked.add(target.pathname);
      }
    }
    for (const image of [...document.images, { src: document.og }]) {
      const target = new URL(image.src);
      const local = target.origin === origin || target.origin === new URL(base).origin;
      const resource = local ? base + target.pathname + target.search : target.href;
      if (checked.has(resource)) continue;
      const result = await page.request.get(resource);
      assert.equal(result.status(), 200, `broken image: ${resource}`);
      assert.match(result.headers()["content-type"], /^image\//);
      checked.add(resource);
    }
  }
  const ogResponse = await page.request.get(base + "/opengraph-image");
  const og = await ogResponse.body();
  assert.equal(og.readUInt32BE(16), 1200);
  assert.equal(og.readUInt32BE(20), 630);
  const slash = await page.request.get(base + "/about/?source=check", { maxRedirects: 0 });
  assert.equal(slash.status(), 308);
  assert.equal(new URL(slash.headers().location, base).pathname, "/about");
  assert.equal(new URL(slash.headers().location, base).search, "?source=check");
  for (const path of ["/missing-page-seo-check", "/services/missing-service-seo-check"]) {
    const missing = await page.request.get(base + path);
    assert.equal(missing.status(), 404, "missing pages must not become soft 404s");
    assert.match(await missing.text(), /name="robots" content="noindex"/);
  }
  console.log(`PASS SEO: ${pages.size} pages, ${internalLinks} internal links, anchors, headings, metadata, schema, images, sitemaps, robots, redirects, and 404s`);
} finally { await browser.close(); }
