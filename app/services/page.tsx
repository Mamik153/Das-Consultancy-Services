import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

const title = "Services";
const description = `${site.name} offers ${site.services
  .map((s) => s.title.toLowerCase())
  .join(", ")}. Every engagement is scoped, priced, and dated in writing before work starts.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          faqSchema,
          breadcrumbSchema([{ name: "Services", path: "/services" }]),
        )}
      />

      <section className="interior-page mx-auto max-w-3xl px-6">
        <h1 className="text-5xl font-normal tracking-tight text-balance sm:text-7xl">
          Services
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-pretty">{description}</p>
      </section>

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24">
        {site.services.map((s) => (
          // scroll-mt clears the sticky header when linked to by fragment.
          <section
            key={s.slug}
            id={s.slug}
            className="scroll-mt-24 border-t py-12 first:border-t-0 first:pt-0"
            aria-labelledby={`${s.slug}-heading`}
          >
            <h2
              id={`${s.slug}-heading`}
              className="text-2xl font-semibold tracking-tight"
            >
              <Link href={`/services/${s.slug}`}>{s.title}</Link>
            </h2>
            <p className="mt-4 text-muted-foreground">{s.summary}</p>
            <h3 className="mt-8 text-sm font-medium tracking-wide uppercase">
              What you get
            </h3>
            <ul className="mt-4 space-y-2">
              {s.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-muted-foreground">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/40" />
                  {o}
                </li>
              ))}
            </ul>
            <Link href={`/services/${s.slug}`} className="text-link mt-6">Explore {s.title.toLowerCase()}</Link>
          </section>
        ))}
      </div>

      <section className="border-t bg-muted/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-2xl font-semibold tracking-tight">Common questions</h2>
          <div className="mt-8 border-y divide-y">
            {site.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium marker:content-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                  <span className="flex items-start justify-between gap-4">
                    {f.q}
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-muted-foreground transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <Button render={<Link href="/contact" />} size="lg" className="mt-10 px-5">
            Start an enquiry
          </Button>
        </div>
      </section>
    </>
  );
}
