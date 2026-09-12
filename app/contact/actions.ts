"use server";

import { Resend } from "resend";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { site } from "@/site.config";

// ponytail: honeypot only, no rate limiting. Add @upstash/ratelimit if spam
// actually arrives; hosting protection is not application rate limiting.
export async function submitEnquiry(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    const { fieldErrors } = parsed.error.flatten();
    // A tripped honeypot is a bot. Return the generic success shape so it
    // learns nothing, but send no email.
    if (fieldErrors.website) return { status: "ok" };
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
    };
  }

  const { name, email, company, message } = parsed.data;
  const to = process.env.CONTACT_TO_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!to || !apiKey || !from) {
    console.error("Contact form is not configured: missing CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL, or RESEND_API_KEY");
    return { status: "error", message: "Your enquiry could not be sent right now. Your message is still here; please try again later." };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: `${site.name} <${from}>`,
      to: [to],
      replyTo: email,
      subject: `Enquiry from ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Company: ${company || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) throw error;
    return { status: "ok" };
  } catch (err) {
    // Log the real reason server-side; never return provider errors to the client.
    console.error("Resend send failed", err);
    return {
      status: "error",
      message: "Your enquiry was not sent. Your message is still here; please try again.",
    };
  }
}
