import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

const title = "Contact";
const description = `Start an enquiry with ${site.name}. Describe the problem in a few sentences and you will get a reply within one business day.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Contact", path: "/contact" }]))} />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h1 className="text-4xl font-semibold tracking-tight text-balance">
          Start an enquiry
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-pretty">{description}</p>
        <p className="mt-4 text-muted-foreground">
          Prefer email? Write to{" "}
          <a
            href={`mailto:${site.email}`}
            className="font-medium text-foreground underline underline-offset-4"
          >
            {site.email}
          </a>
          .
        </p>

        <div className="mt-12">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
