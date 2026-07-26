import { test } from "node:test";
import assert from "node:assert/strict";
import { contactSchema } from "./contact-schema.ts";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "",
  message: "We have a stalled Next.js build and need help getting it shipped.",
  website: "",
};

test("accepts a well-formed enquiry", () => {
  const r = contactSchema.safeParse(valid);
  assert.equal(r.success, true, JSON.stringify(r.error?.issues));
});

test("rejects a malformed email", () => {
  assert.equal(
    contactSchema.safeParse({ ...valid, email: "not-an-email" }).success,
    false,
  );
});

test("rejects a message shorter than 10 characters", () => {
  assert.equal(contactSchema.safeParse({ ...valid, message: "hi" }).success, false);
});

test("rejects a filled honeypot", () => {
  assert.equal(
    contactSchema.safeParse({ ...valid, website: "http://spam.example" }).success,
    false,
  );
});

test("rejects a blank name", () => {
  assert.equal(contactSchema.safeParse({ ...valid, name: "   " }).success, false);
});

test("company is optional", () => {
  const { name, email, message, website } = valid;
  assert.equal(
    contactSchema.safeParse({ name, email, message, website }).success,
    true,
  );
});
