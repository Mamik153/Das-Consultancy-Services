import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

const title = "About";
const description = `${site.name} is an independent software consultancy founded by ${site.founder}, working directly with founders and engineering leaders on scoped, fixed-price engagements.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: `${title} | ${site.name}`, description, url: "/about" },
};

// TODO: replace these with your real principles once you've run a few
// engagements — specifics beat generic consultancy language, for readers and
// for answer engines alike.
const principles = [
  {
    title: "Scope in writing, always",
    body: "Every engagement has a written scope with a fixed price and a delivery date agreed before work starts. If the scope changes, we re-scope in writing rather than quietly billing more hours.",
  },
  {
    title: "You own everything",
    body: "Code lands in your repository under your ownership from day one. There is no proprietary framework, no licence, and no hosting arrangement that makes leaving expensive.",
  },
  {
    title: "Boring technology by default",
    body: "We pick well-understood tools your team can hire for and maintain. Novelty is a cost that has to justify itself, not a feature.",
  },
  {
    title: "Working software over documents",
    body: "Every week ends with something running that you can click on. Reports and diagrams are the by-product, not the deliverable.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "About", path: "/about" }]))} />

      <section className="interior-page mx-auto max-w-3xl px-6" data-motion-group>
        <h1 className="text-5xl font-normal tracking-tight text-balance sm:text-7xl">
          About {site.name}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground text-pretty">{description}</p>

        {/* TODO: rewrite this section in your own words. Include how many years
            you've been building software, the kinds of systems and industries
            you've worked in, and one or two concrete outcomes. Specifics here
            are what make the site credible to a reader and citable by an
            answer engine. */}
        <div className="mt-12 space-y-6 text-muted-foreground">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">
            Who you work with
          </h2>
          <p>
            {site.name} is run by {site.founder}. Engagements are led personally —
            you talk to the person writing the code, not an account manager who
            relays messages to a team you never meet.
          </p>
          <p>
            The consultancy stays deliberately small. That means a limited number of
            concurrent engagements, honest answers about availability, and a
            willingness to tell you when a problem is not a good fit for us.
          </p>
          <Link href="/team" className="text-link">Meet the team</Link>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">How we operate</h2>
          <dl className="mt-8 space-y-8">
            {principles.map((p) => (
              <div key={p.title}>
                <dt className="font-medium">{p.title}</dt>
                <dd className="mt-2 text-muted-foreground">{p.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 rounded-xl border p-8">
          <h2 className="text-xl font-semibold tracking-tight">
            Think we might be a fit?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Send over a short description of what you are building. If it is not
            something we should take on, we will say so and point you somewhere
            better.
          </p>
          <Button render={<Link href="/contact" />} size="lg" className="mt-6 px-5">
            Start an enquiry
          </Button>
        </div>
      </section>
    </>
  );
}
