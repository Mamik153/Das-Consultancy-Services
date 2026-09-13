import { test } from "node:test";
import assert from "node:assert/strict";

test("site URL handles unset, blank, and configured environment values", async (t) => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  t.after(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  });

  const cases = [
    [undefined, "https://das-consultancy-services.vercel.app"],
    ["", "https://das-consultancy-services.vercel.app"],
    ["   ", "https://das-consultancy-services.vercel.app"],
    ["https://example.com", "https://das-consultancy-services.vercel.app"],
    [" https://consultancy.example.org ", "https://consultancy.example.org"],
    ["https://consultancy.example.org/", "https://consultancy.example.org"],
    ["http://consultancy.example.org/", "https://consultancy.example.org"],
    ["http://localhost:3000", "http://localhost:3000"],
    ["https://consultancy.example.org/path?query=1#fragment", "https://consultancy.example.org"],
  ] as const;
  for (const [index, [value, expected]] of cases.entries()) {
    if (value === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = value;
    const { site } = await import(`../site.config.ts?url-test=${index}`);
    assert.equal(site.url, expected);
    assert.equal(new URL(site.url).origin, expected);
  }
  for (const [index, value] of ["ftp://example.org", "https://user:password@example.org", "not-a-url"].entries()) {
    process.env.NEXT_PUBLIC_SITE_URL = value;
    await assert.rejects(import(`../site.config.ts?invalid-url=${index}`));
  }
});
