import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

export default function Home() {
  return (
    <>
      <JsonLd data={graph(faqSchema)} />

      {/* Answer-first hero: the h1 and the paragraph beneath it together answer
          "what is this company and what does it do" with no other context.
          That pairing is what answer engines extract and quote. */}
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
          {site.description}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button render={<Link href="/contact" />} size="lg" className="px-5">
            Start an enquiry
          </Button>
          <Button
            render={<Link href="/services" />}
            size="lg"
            variant="outline"
            className="px-5"
          >
            See what we do
          </Button>
        </div>
      </section>

      <section
        aria-labelledby="services-heading"
        className="border-t bg-muted/30 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="services-heading" className="text-3xl font-semibold tracking-tight">
            How we work with you
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Four ways to engage. Each one is scoped and priced in writing before any
            work begins.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {site.services.map((s) => (
              <Card key={s.slug} className="bg-background">
                <CardHeader>
                  <CardTitle className="text-xl">
                    <Link href={`/services#${s.slug}`} className="hover:underline">
                      {s.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{s.summary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="how-heading" className="text-3xl font-semibold tracking-tight">
            What an engagement looks like
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Discovery",
                body: "A paid one-to-two hour session where we work through the problem, the constraints, and what success actually means.",
              },
              {
                step: "02",
                title: "Written scope",
                body: "You get a fixed price, a delivery date, and an explicit list of what is and is not included. Nothing starts until you sign it.",
              },
              {
                step: "03",
                title: "Weekly delivery",
                body: "Work ships in weekly increments with a demo at the end of each one. You can stop at any week boundary and keep everything built so far.",
              },
            ].map((s) => (
              <li key={s.step}>
                <span className="font-mono text-sm text-muted-foreground">{s.step}</span>
                <h3 className="mt-2 text-lg font-medium">{s.title}</h3>
                <p className="mt-2 text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ uses native <details> — no JS, keyboard-accessible for free, and
          the answers are complete sentences so they survive being quoted in
          isolation. Mirrored into FAQPage JSON-LD above. */}
      <section
        aria-labelledby="faq-heading"
        className="border-t bg-muted/30 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 id="faq-heading" className="text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-10 border-y divide-y">
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
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-balance">
            Tell us what you are trying to ship
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            A short description of the problem is enough to start. You will get a reply
            within one business day.
          </p>
          <Button render={<Link href="/contact" />} size="lg" className="mt-8 px-5">
            Start an enquiry
          </Button>
        </div>
      </section>
    </>
  );
}
