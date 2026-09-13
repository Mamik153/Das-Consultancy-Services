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
async function openMainNav(page) {
  if (page.viewportSize().width <= 1100 && !await page.getByRole("dialog", { name: "Navigation menu" }).isVisible()) {
    await page.locator('.mobile-menu-toggle[aria-expanded="false"]').waitFor();
    await page.getByRole("button", { name: "Open menu" }).click();
  }
  return page.getByRole("navigation", { name: "Main", exact: true });
}

try {
  for (const [width, height] of [[320, 740], [390, 844], [760, 360], [768, 1024], [1024, 768], [1100, 900], [1101, 900], [1440, 1000]]) {
    const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
    await page.goto(base + "/about");
    await page.evaluate(() => document.fonts.ready);
    const trigger = page.getByRole("button", { name: "Open menu" });
    const modal = page.getByRole("dialog", { name: "Navigation menu" });
    assert.equal(await trigger.isVisible(), width <= 1100);
    assert.equal(await page.locator(".header-cta").isVisible(), width > 1100);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: `.impeccable/screenshots/${width}-navigation-closed.png` });
    if (width <= 1100) {
      assert.equal(await page.getByRole("navigation", { name: "Main", exact: true }).count(), 0);
      await page.evaluate(() => window.scrollTo(0, 200));
      const scrollY = await page.evaluate(() => window.scrollY);
      // Click the visible sticky control without Playwright scrolling its ancestors.
      const triggerBounds = await trigger.boundingBox();
      await page.mouse.click(triggerBounds.x + triggerBounds.width / 2, triggerBounds.y + triggerBounds.height / 2);
      assert.equal(await trigger.getAttribute("aria-expanded"), "true");
      assert.equal(await modal.isVisible(), true);
      assert.equal(await page.getByRole("button", { name: "Close menu" }).evaluate((el) => el === document.activeElement), true);
      assert.equal(await page.locator("html").evaluate((el) => getComputedStyle(el).overflow), "hidden");
      const bounds = await modal.boundingBox();
      assert.equal(bounds.width, width);
      assert.equal(bounds.height, height);
      assert.equal(await modal.evaluate((el) => el.scrollWidth > el.clientWidth), false);
      await page.screenshot({ path: `.impeccable/screenshots/${width}-navigation-open.png` });
      // Native dialogs may visit browser chrome, but never background page controls.
      for (const key of ["Shift+Tab", ...Array(10).fill("Tab")]) {
        await page.keyboard.press(key);
        assert.equal(await modal.evaluate((el) => el.contains(document.activeElement) || document.activeElement === document.body), true);
      }
      await page.keyboard.press("Escape");
      await modal.waitFor({ state: "hidden" });
      await page.locator('.mobile-menu-toggle[aria-expanded="false"]').waitFor({ state: "attached" });
      assert.equal(await trigger.getAttribute("aria-expanded"), "false");
      assert.equal(await trigger.evaluate((el) => el === document.activeElement), true);
      assert.equal(await page.evaluate(() => window.scrollY), scrollY);
      assert.notEqual(await page.locator("html").evaluate((el) => getComputedStyle(el).overflow), "hidden");
      await trigger.click();
      await page.getByRole("button", { name: "Close menu" }).click();
      await modal.waitFor({ state: "hidden" });
      await page.locator('.mobile-menu-toggle[aria-expanded="false"]').waitFor({ state: "attached" });
      await trigger.click();
      await page.setViewportSize({ width: 1101, height });
      await modal.waitFor({ state: "hidden" });
      await page.locator('.mobile-menu-toggle[aria-expanded="false"]').waitFor({ state: "attached" });
      assert.notEqual(await page.locator("html").evaluate((el) => getComputedStyle(el).overflow), "hidden");
      await page.setViewportSize({ width, height });
      const nav = await openMainNav(page);
      await nav.getByRole("link", { name: "Expertise", exact: true }).click();
      await page.waitForURL(base + "/services");
      await modal.waitFor({ state: "hidden" });
      await page.locator('.mobile-menu-toggle[aria-expanded="false"]').waitFor({ state: "attached" });
      await openMainNav(page);
      await nav.getByRole("link", { name: "Expertise", exact: true }).click();
      await modal.waitFor({ state: "hidden" });
      await page.locator('.mobile-menu-toggle[aria-expanded="false"]').waitFor({ state: "attached" });
      await openMainNav(page);
      await modal.getByRole("link", { name: "Let’s talk", exact: true }).click();
      await page.waitForURL(base + "/contact");
      await modal.waitFor({ state: "hidden" });
      await page.locator('.mobile-menu-toggle[aria-expanded="false"]').waitFor({ state: "attached" });
      assert.notEqual(await page.locator("html").evaluate((el) => getComputedStyle(el).overflow), "hidden");
    }
    await page.close();
    console.log(`PASS navigation ${width}×${height}`);
  }
  const motionPage = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "no-preference" });
  await motionPage.goto(base + "/about");
  const motionMenu = motionPage.locator("#mobile-menu");
  await openMainNav(motionPage);
  const opening = await motionMenu.evaluate((menu) => {
    const animations = menu.getAnimations({ subtree: true });
    for (const animation of animations) { animation.pause(); animation.currentTime = 200; }
    const items = [...menu.querySelectorAll(".mobile-menu-nav a, .mobile-menu-cta")];
    return {
      x: new DOMMatrixReadOnly(getComputedStyle(menu).transform).m41,
      delays: items.map((item) => item.getAnimations().find((animation) => animation.transitionProperty === "opacity").effect.getTiming().delay),
      opacity: items.map((item) => Number(getComputedStyle(item).opacity)),
      xItems: items.map((item) => new DOMMatrixReadOnly(getComputedStyle(item).transform).m41),
    };
  });
  assert.ok(opening.x > 0 && opening.x < 390, "Panel slides in from the right");
  assert.deepEqual(opening.delays, [120, 160, 200, 240, 280, 320]);
  assert.ok(opening.opacity[0] > opening.opacity[1] && opening.opacity[1] > opening.opacity[2]);
  assert.ok(opening.xItems[0] < opening.xItems[1] && opening.xItems[1] < opening.xItems[2]);
  await motionPage.screenshot({ path: ".impeccable/screenshots/390-navigation-opening.png" });
  await motionMenu.evaluate((menu) => menu.getAnimations({ subtree: true }).forEach((animation) => animation.finish()));
  const closing = await motionMenu.evaluate((menu) => {
    menu.querySelector(".mobile-menu-close").click();
    const animations = menu.getAnimations({ subtree: true });
    menu.sequenceAnimations = animations;
    for (const animation of animations) { animation.pause(); animation.currentTime = 100; }
    const items = [...menu.querySelectorAll(".mobile-menu-nav a, .mobile-menu-cta")];
    return {
      retained: menu.open && getComputedStyle(document.documentElement).overflow === "hidden",
      x: new DOMMatrixReadOnly(getComputedStyle(menu).transform).m41,
      panelOpacity: Number(getComputedStyle(menu).opacity),
      panelDelay: animations.find((animation) => animation.effect.target === menu && animation.transitionProperty === "transform").effect.getTiming().delay,
      timings: items.map((item) => item.getAnimations().find((animation) => animation.transitionProperty === "opacity").effect.getTiming()),
      opacity: items.map((item) => Number(getComputedStyle(item).opacity)),
      xItems: items.map((item) => new DOMMatrixReadOnly(getComputedStyle(item).transform).m41),
    };
  });
  assert.equal(closing.retained, true);
  assert.equal(closing.x, 0);
  assert.equal(closing.panelOpacity, 1);
  assert.deepEqual(closing.timings.map(({ delay }) => delay), [200, 160, 120, 80, 40, 0]);
  assert.ok(closing.opacity[5] < closing.opacity[4] && closing.opacity[4] < closing.opacity[3]);
  assert.ok(closing.xItems[5] > closing.xItems[4] && closing.xItems[4] > closing.xItems[3]);
  assert.ok(closing.panelDelay + 0.1 >= Math.max(...closing.timings.map(({ delay, duration }) => delay + duration)), "Panel waits until every item finishes leaving (allow sub-millisecond CSS rounding)");
  await motionPage.screenshot({ path: ".impeccable/screenshots/390-navigation-items-closing.png" });
  const exiting = await motionMenu.evaluate((menu) => {
    menu.sequenceAnimations.forEach((animation) => { animation.currentTime = 520; });
    return {
      x: new DOMMatrixReadOnly(getComputedStyle(menu).transform).m41,
      opacity: Number(getComputedStyle(menu).opacity),
      itemsHidden: [...menu.querySelectorAll(".mobile-menu-nav a, .mobile-menu-cta")].every((item) => Number(getComputedStyle(item).opacity) === 0),
    };
  });
  assert.ok(exiting.itemsHidden && exiting.x > 0 && exiting.opacity > 0 && exiting.opacity < 1);
  await motionPage.screenshot({ path: ".impeccable/screenshots/390-navigation-panel-closing.png" });
  await motionMenu.evaluate((menu) => menu.sequenceAnimations.forEach((animation) => animation.finish()));
  await motionMenu.waitFor({ state: "hidden" });
  await motionPage.locator('.mobile-menu-toggle[aria-expanded="false"]').waitFor();
  assert.notEqual(await motionPage.locator("html").evaluate((el) => getComputedStyle(el).overflow), "hidden");
  // Escape can interrupt entry, and repeated opens must not inherit the closing pose.
  await openMainNav(motionPage);
  await motionPage.keyboard.press("Escape");
  await motionMenu.waitFor({ state: "hidden" });
  await openMainNav(motionPage);
  await motionPage.setViewportSize({ width: 1101, height: 844 });
  await motionMenu.waitFor({ state: "hidden" });
  await motionPage.setViewportSize({ width: 390, height: 844 });
  await motionPage.emulateMedia({ reducedMotion: "reduce" });
  await openMainNav(motionPage);
  assert.equal(await motionMenu.evaluate((menu) => getComputedStyle(menu).transitionDuration), "0s");
  const closedImmediately = await motionPage.getByRole("button", { name: "Close menu" }).evaluate((button) => {
    button.click();
    return !document.querySelector("#mobile-menu").open;
  });
  assert.equal(closedImmediately, true);
  await motionPage.close();
  console.log("PASS menu motion: rightward panel, staggered entry, reverse exit, panel sequencing, interruption, resize, replay, and reduced motion");

  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: "reduce" });
    const errors = [];
    const titles = new Set();
    const descriptions = new Set();
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of ["/", "/services", "/services/product-engineering", "/services/architecture-review", "/services/project-rescue", "/services/technical-advisory", "/about", "/team", "/contact", "/legal", "/terms"]) {
      const response = await page.goto(base + route);
      assert.equal(response.status(), 200, route);
      assert.doesNotMatch(await response.text(), /mailto:|mamik@|CONTACT_TO_EMAIL|CONTACT_FROM_EMAIL|re_test_only/);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, `${route}: one heading`);
      const nav = await openMainNav(page);
      assert.deepEqual(await nav.getByRole("link").allTextContents(), ["Home", "Expertise", "About us", "Team", "Contact"]);
      const activePath = route.startsWith("/services") ? "/services" : route;
      const active = nav.locator('[aria-current="page"]');
      if (!["/legal", "/terms"].includes(route)) {
        assert.equal(await active.count(), 1, `${route}: one current page`);
        assert.equal(await active.getAttribute("href"), activePath);
        assert.equal(await active.evaluate((el) => getComputedStyle(el).backgroundColor), "rgb(6, 79, 232)");
      }
      if (width <= 1100) await page.getByRole("button", { name: "Close menu" }).click();
      const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
      const origin = process.env.EXPECTED_SITE_URL || "https://das-consultancy-services.vercel.app";
      assert.equal(canonical, origin + (route === "/" ? "" : route));
      const title = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      assert.ok(description?.length > 40);
      assert.equal(titles.has(title), false, `${route}: unique title`);
      assert.equal(descriptions.has(description), false, `${route}: unique description`);
      titles.add(title);
      descriptions.add(description);
      assert.equal(await page.locator('meta[property="og:title"]').getAttribute("content"), title);
      assert.equal(await page.locator('meta[name="twitter:title"]').getAttribute("content"), title);
      assert.equal(await page.locator('meta[property="og:description"]').getAttribute("content"), description);
      assert.equal(await page.locator('meta[name="twitter:description"]').getAttribute("content"), description);
      assert.ok(await page.locator('meta[property="og:image"]').getAttribute("content"));
      const schema = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.flatMap((script) => JSON.parse(script.textContent)["@graph"]));
      assert.equal(schema.find((node) => node["@type"] === "Organization").logo, origin + "/images/dsc-logo.webp");
      if (route !== "/") assert.ok(schema.some((node) => node["@type"] === "BreadcrumbList"));
      if (route.startsWith("/services/")) assert.ok(schema.some((node) => node["@type"] === "Service"));
      if (route === "/team") assert.equal(schema.find((node) => node["@type"] === "AboutPage").mainEntity.length, 3);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, `${route}: horizontal overflow at ${width}px`);
      if (width !== 320) await page.screenshot({ path: `.impeccable/screenshots/${width}-${route === "/" ? "home" : route.slice(1).replaceAll("/", "-")}.png`, fullPage: true });
      if (route === "/services") {
        assert.equal(await page.locator(".services-visual-strip > div").count(), 4);
        assert.equal(await page.locator(".services-offering").count(), 4);
        assert.equal(await page.locator(".services-outcomes li").count(), 12);
        const links = await page.locator(".services-overview a").evaluateAll((elements) => elements.map((el) => el.getAttribute("href")));
        assert.deepEqual(links, ["/services/product-engineering", "/services/architecture-review", "/services/project-rescue", "/services/technical-advisory"]);
        const faq = page.locator(".faq-list details").first();
        await faq.locator("summary").press("Enter");
        assert.equal(await faq.getAttribute("open"), "");
        await faq.locator("summary").press("Enter");
        assert.equal(await faq.getAttribute("open"), null);
      }
      if (route === "/team") {
        assert.equal(await page.locator(".team-member").count(), 3);
        assert.deepEqual(await page.locator(".team-role").allTextContents(), ["Founder & CEO", "Co-founder & CPO", "Co-founder & CTO"]);
        assert.deepEqual(await page.locator(".team-background dd").allTextContents(), ["Forward Deployed Engineer", "Software Engineer", "Principal Engineer"]);
        assert.equal(await page.locator(".team-bio").count(), 3);
        assert.equal(await page.locator(".team-expertise li").count(), 12);
        assert.equal(await page.locator(".team-expertise li").filter({ hasText: /^AI integration$/ }).count(), 3);
        assert.match(await page.locator('link[rel="canonical"]').getAttribute("href"), /\/team$/);
      }
      if (route === "/") {
        const footer = page.locator(".site-footer");
        await footer.scrollIntoViewIfNeeded();
        await footer.locator(".footer-logo img").evaluate((img) => img.decode());
        assert.ok(await footer.locator(".footer-logo img").evaluate((img) => img.naturalWidth > 0));
        assert.equal(await footer.locator(".footer-logo").getAttribute("href"), "/");
        assert.deepEqual(await footer.getByRole("navigation", { name: "Footer", exact: true }).getByRole("link").allTextContents(), ["Expertise", "About", "Team", "Contact"]);
        assert.equal(await footer.locator("nav a").evaluateAll((links) => links.every((link) => link.getBoundingClientRect().height >= 44)), true);
        assert.equal(await page.locator(".capability-links a").count(), 4);
        assert.equal(await page.locator(".capabilities-tools li").count(), 6);
        await page.locator(".capabilities-art").scrollIntoViewIfNeeded();
        await page.locator(".capabilities-art img").evaluate((img) => img.decode());
        assert.ok(await page.locator(".capabilities-art img").evaluate((img) => img.naturalWidth > 0));
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
      assert.doesNotMatch(content, /https?:\/\/example\.com/);
      for (const path of ["/team", "/legal", "/terms", "/services/product-engineering", "/services/architecture-review", "/services/project-rescue", "/services/technical-advisory"]) assert.ok(content.includes(path), `${route} missing ${path}`);
    }
    const robots = await (await page.request.get(base + "/robots.txt")).text();
    assert.match(robots, /OAI-SearchBot/);
    assert.doesNotMatch(robots, /https?:\/\/example\.com/);
    const manifest = await (await page.request.get(base + "/manifest.webmanifest")).json();
    for (const { src } of manifest.icons) assert.equal((await page.request.get(base + src)).status(), 200);
    assert.equal((await page.request.get(base + "/images/dsc-logo.png")).status(), 200);
    assert.equal((await page.request.get(base + "/opengraph-image")).status(), 200);
    const nav = await openMainNav(page);
    await nav.getByRole("link", { name: "Home", exact: true }).click();
    await page.waitForURL(base + "/");
    await openMainNav(page);
    await nav.locator('a[href="/"][aria-current="page"]').waitFor();
    await nav.getByRole("link", { name: "Contact", exact: true }).click();
    await page.waitForURL(base + "/contact");
    await openMainNav(page);
    await nav.locator('a[href="/contact"][aria-current="page"]').waitFor();
    await page.goBack();
    await page.waitForURL(base + "/");
    await openMainNav(page);
    await nav.locator('a[href="/"][aria-current="page"]').waitFor();
    // Confirm reduced motion removes transitions, and ordinary motion is present.
    await page.goto(base);
    assert.equal(await page.locator(".pill-button").first().evaluate((element) => getComputedStyle(element).transitionDuration), "0s");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    assert.notEqual(await page.locator(".pill-button").first().evaluate((element) => getComputedStyle(element).transitionDuration), "0s");
    assert.deepEqual(errors, [], `Browser errors at ${width}px`);
    await page.close();
    console.log(`PASS ${width}px: all routes, overflow, FAQs, navigation, and browser errors`);
  }
  const noJs = await browser.newPage({ javaScriptEnabled: false });
  await noJs.goto(base + "/team");
  assert.equal(await noJs.locator('.main-nav [aria-current="page"]').getAttribute("href"), "/team");
  assert.equal(await noJs.locator('h1').evaluate((element) => getComputedStyle(element).opacity), "1");
  await noJs.close();
} finally {
  await browser.close();
}
