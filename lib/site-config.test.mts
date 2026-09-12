import { test } from "node:test";
import assert from "node:assert/strict";

test("site URL handles unset, blank, and configured environment values", async (t) => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  t.after(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  });

  const cases = [
    [undefined, "https://example.com"],
    ["", "https://example.com"],
    ["   ", "https://example.com"],
    [" https://consultancy.example.org ", "https://consultancy.example.org"],
  ] as const;
  for (const [index, [value, expected]] of cases.entries()) {
    if (value === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = value;
    const { site } = await import(`../site.config.ts?url-test=${index}`);
    assert.equal(site.url, expected);
    assert.equal(new URL(site.url).origin, expected);
  }
});
