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

      <section className="interior-page mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-normal tracking-tight text-balance sm:text-7xl">
          Start an enquiry
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-pretty">{description}</p>


        <div className="mt-12">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
