// Run with PLAYWRIGHT_MODULE pointing to an installed Playwright package.
// Uses a fresh profile. Enquiry tests abort delivery or trip the honeypot; no email is sent.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({
  ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
  headless: true,
});
const base = process.env.TEST_URL || "http://127.0.0.1:3000";
await mkdir(".impeccable/screenshots", { recursive: true });
try {
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of ["/", "/services", "/services/product-engineering", "/services/architecture-review", "/services/project-rescue", "/services/technical-advisory", "/about", "/team", "/contact", "/legal", "/terms"]) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200, route);
      assert.doesNotMatch(await response.text(), /mailto:|mamik@|CONTACT_TO_EMAIL|CONTACT_FROM_EMAIL|re_test_only/);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, `${route}: one heading`);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, `${route}: horizontal overflow at ${width}px`);
      if (width !== 320) await page.screenshot({ path: `.impeccable/screenshots/${width}-${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`, fullPage: true });
      if (route === "/team") {
        assert.equal(await page.locator(".team-member").count(), 3);
        assert.equal(await page.getByRole("navigation", { name: "Main", exact: true }).getByRole("link", { name: "Team", exact: true }).count(), 1);
        assert.match(await page.locator('link[rel="canonical"]').getAttribute("href"), /\/team$/);
      }
      if (route === "/") {
        await page.locator(".hero").screenshot({path: `.impeccable/screenshots/${width}-hero.png`});
        const faq = page.locator(".faq-list details").first();
        await faq.locator("summary").click();
        assert.equal(await faq.getAttribute("open"), "");
        await faq.locator("summary").press("Enter");
        assert.equal(await faq.getAttribute("open"), null);
        const hrefs = await page.locator('a[href^="/"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")));
        for (const href of new Set(hrefs)) {
          const target = new URL(href, base);
          const result = await page.request.get(target.href);
          assert.equal(result.status(), 200, `Broken link: ${href}`);
        }
      }
      if (route === "/contact" && width === 390) {
        await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
        await page.locator("#name-error").waitFor();
        assert.equal(await page.locator('#email[aria-invalid="true"]').count(), 1);
        assert.equal(await page.locator('#message[aria-invalid="true"]').count(), 1);
        await page.locator("#name").fill("UI check");
        await page.locator("#email").fill("ui-check@example.com");
        await page.locator("#message").fill("Testing message retention without sending an email.");
        await page.route("**/contact", (request) => request.request().method() === "POST" ? request.abort() : request.continue());
        await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
        await page.getByText("We couldn’t connect. Your message is still here; please try again.", { exact: true }).first().waitFor();
        assert.equal(await page.locator("#name").inputValue(), "UI check");
        assert.equal(await page.locator("#message").inputValue(), "Testing message retention without sending an email.");
        await page.unroute("**/contact");
        // Honeypot takes the server's no-send success branch, even with real credentials configured.
        await page.locator("#website").evaluate((input) => { input.value = "automated-check"; });
        await page.getByRole("button", { name: "Send enquiry", exact: true }).click();
        await page.locator(".form-success").waitFor();
        assert.equal(await page.locator("#name").inputValue(), "");
        assert.equal(await page.locator("#message").inputValue(), "");
        const pathLength = await page.locator(".t-success-check path").evaluate((path) => path.getTotalLength());
        assert.ok(pathLength < 23 && pathLength > 20);
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: ".impeccable/screenshots/390-contact-success.png", fullPage: true });
      }
    }
    const missing = await page.request.get(base + "/services/not-a-service");
    assert.equal(missing.status(), 404);
    for (const route of ["/sitemap.xml", "/llms.txt"]) {
      const response = await page.request.get(base + route);
      const content = await response.text();
      assert.doesNotMatch(content, /mailto:|mamik@/);
      for (const path of ["/team", "/legal", "/terms", "/services/product-engineering", "/services/architecture-review", "/services/project-rescue", "/services/technical-advisory"]) assert.ok(content.includes(path), `${route} missing ${path}`);
    }
    // Confirm reduced motion removes transitions, and ordinary motion is present.
    await page.goto(base);
    assert.equal(await page.locator(".pill-button").first().evaluate((element) => getComputedStyle(element).transitionDuration), "0s");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    assert.notEqual(await page.locator(".pill-button").first().evaluate((element) => getComputedStyle(element).transitionDuration), "0s");
    assert.deepEqual(errors, [], `Browser errors at ${width}px`);
    await page.close();
    console.log(`PASS ${width}px: all routes, overflow, FAQs, navigation, and browser errors`);
  }
} finally {
  await browser.close();
}
