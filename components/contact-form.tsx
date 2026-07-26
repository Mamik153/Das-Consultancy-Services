"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { submitEnquiry } from "@/app/contact/actions";
import type { ContactState } from "@/lib/contact-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? "Sending…" : "Send enquiry"}
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
  const [state, action] = useActionState<ContactState, FormData>(submitEnquiry, {
    status: "idle",
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "ok") {
      toast.success("Enquiry sent. You will hear back within one business day.");
      formRef.current?.reset();
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  const errors = state.status === "error" ? state.fieldErrors : undefined;

  return (
    <form ref={formRef} action={action} className="space-y-6" noValidate>
      {/* Screen readers get the result even though the visual cue is a toast. */}
      <p aria-live="polite" className="sr-only">
        {state.status === "ok"
          ? "Enquiry sent."
          : state.status === "error"
            ? state.message
            : ""}
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
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
        <Input id="company" name="company" autoComplete="organization" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">What are you trying to build or fix?</Label>
        <Textarea
          id="message"
          name="message"
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

      <SubmitButton />
    </form>
  );
}
