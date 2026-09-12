"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { Check, LoaderCircle, ArrowUpRight } from "lucide-react";
import { submitEnquiry } from "@/app/contact/actions";
import type { ContactState } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="enquiry-submit">
      {pending ? <LoaderCircle className="sending-spinner" size={18} aria-hidden="true" /> : null}
      {pending ? "Sending…" : "Send enquiry"}
      {!pending && <ArrowUpRight size={18} aria-hidden="true" />}
    </Button>
  );
}

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="text-sm text-destructive">
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", company: "", message: "" });
  const [state, action, pending] = useActionState<ContactState, FormData>(async (previous, data) => {
    try {
      const result = await submitEnquiry(previous, data);
      if (result.status === "ok") setValues({ name: "", email: "", company: "", message: "" });
      return result;
    } catch {
      return { status: "error", message: "We couldn’t connect. Your message is still here; please try again." };
    }
  }, { status: "idle" });

  const errors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form action={action} className="contact-form space-y-6" noValidate>
      <div aria-live="polite" aria-atomic="true">
        {state.status === "ok" && <div className="form-result form-success">
          <span className="t-success-check" data-state="in" aria-hidden="true"><Check size={24} /></span>
          <div><strong>Enquiry sent.</strong><p>Thanks for reaching out. We’ll reply within one business day.</p></div>
        </div>}
        {state.status === "error" && <p className="form-result form-error">{state.message}</p>}
      </div>

      <fieldset disabled={pending} className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              maxLength={100}
              value={values.name}
              onChange={(event) => setValues({ ...values, name: event.target.value })}
              autoComplete="name"
              required
              aria-invalid={!!errors?.name}
              aria-describedby={errors?.name ? "name-error" : undefined}
            />
            <FieldError id="name-error" errors={errors?.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              maxLength={254}
              value={values.email}
              onChange={(event) => setValues({ ...values, email: event.target.value })}
              type="email"
              autoComplete="email"
              required
              aria-invalid={!!errors?.email}
              aria-describedby={errors?.email ? "email-error" : undefined}
            />
            <FieldError id="email-error" errors={errors?.email} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">
            Company <span className="text-muted-foreground">(optional)</span>
          </Label>
          <Input id="company" name="company" autoComplete="organization" maxLength={200} value={values.company} onChange={(event) => setValues({ ...values, company: event.target.value })} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">What are you trying to build or fix?</Label>
          <Textarea
            id="message"
            name="message"
            maxLength={5000}
            value={values.message}
            onChange={(event) => setValues({ ...values, message: event.target.value })}
            rows={6}
            required
            placeholder="A few sentences on the problem, where the project is now, and any deadline you're working to."
            aria-invalid={!!errors?.message}
            aria-describedby={errors?.message ? "message-error" : undefined}
          />
          <FieldError id="message-error" errors={errors?.message} />
        </div>

        {/* Honeypot. Hidden from sight and from assistive tech; bots fill it in
            and get silently dropped server-side. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

      </fieldset>
      <p className="form-privacy">We use your details to respond to this enquiry. Read our <Link href="/legal#privacy">privacy notice</Link> before sending. Please don’t include passwords or sensitive personal information.</p>
      <SubmitButton />
    </form>
  );
}
