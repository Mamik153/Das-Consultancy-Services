// Exercise the actual server action with Resend's network boundary mocked.
import { test, mock } from "node:test";
import assert from "node:assert/strict";
import { registerHooks } from "node:module";
registerHooks({ resolve(specifier, context, next) {
  if (specifier.startsWith("@/")) return next(new URL(`../${specifier.slice(2)}.ts`, import.meta.url).href, context);
  return next(specifier, context);
} });
const { submitEnquiry } = await import("../app/contact/actions.ts");

test("private Resend delivery: validation, configuration, envelope, and provider failure", async (t) => {
  const keys = ["RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"];
  const saved = Object.fromEntries(keys.map((key) => [key, process.env[key]]));
  t.after(() => { for (const key of keys) { if (saved[key] === undefined) delete process.env[key]; else process.env[key] = saved[key]; } mock.restoreAll(); });
  mock.method(console, "error", () => {});
  let envelope;
  let providerError = false;
  const network = mock.method(globalThis, "fetch", async (_url, options) => {
    envelope = JSON.parse(options.body);
    return Response.json(providerError ? { message: "Private provider detail", name: "validation_error" } : { id: "test-message" }, { status: providerError ? 422 : 200 });
  });
  const data = new FormData();
  for (const [key, value] of Object.entries({ name: "Ada", email: "ada@example.com", company: "Example", message: "We need help shipping our software.", website: "" })) data.set(key, value);
  for (const key of keys) delete process.env[key];
  assert.equal((await submitEnquiry({ status: "idle" }, data)).status, "error");
  assert.equal(network.mock.callCount(), 0);
  process.env.RESEND_API_KEY = "re_test_only";
  process.env.CONTACT_TO_EMAIL = "private-inbox@example.net";
  process.env.CONTACT_FROM_EMAIL = "enquiries@example.org";
  data.set("email", "invalid");
  assert.ok((await submitEnquiry({ status: "idle" }, data)).fieldErrors.email);
  data.set("email", "ada@example.com");
  data.set("website", "spam");
  assert.equal((await submitEnquiry({ status: "idle" }, data)).status, "ok");
  assert.equal(network.mock.callCount(), 0);
  data.set("website", "");
  assert.deepEqual(await submitEnquiry({ status: "idle" }, data), { status: "ok" });
  assert.deepEqual(envelope.to, ["private-inbox@example.net"]);
  assert.equal(envelope.from, "Das Software Consultancy <enquiries@example.org>");
  assert.equal(envelope.reply_to, "ada@example.com");
  assert.match(envelope.text, /We need help shipping our software/);
  providerError = true;
  const failed = await submitEnquiry({ status: "idle" }, data);
  assert.equal(failed.status, "error");
  assert.doesNotMatch(JSON.stringify(failed), /Private provider detail|private-inbox|re_test_only/);
});
