import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please give us at least a sentence to work with.")
    .max(5000, "Please keep this under 5000 characters."),
  // Honeypot: a real person never sees this field, so it must arrive empty.
  website: z.literal("", { message: "Rejected." }),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };
