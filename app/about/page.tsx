import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SculptureMark } from "@/components/sculpture-mark";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

const title = "About";
const description = "Meet Das Software Consultancy, a founder-led team building software and integrating AI with clear scope, direct communication, and client-owned code.";

export const metadata = pageMetadata(title, description, "/about");

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

      <div className="about-page page-shell">
        <header className="about-hero">
          <div className="about-intro" data-motion-group>
            <h1 data-motion="headline">About us.<br /><span>Small by choice.</span></h1>
            <p>{description}</p>
            <Link href="/team" className="text-link">Meet the team <ArrowUpRight size={20} aria-hidden="true" /></Link>
          </div>
          <div className="partner-panel about-founder" data-motion="panel">
            <SculptureMark />
            <p>Accountable<br />by name.</p>
            <div className="founder-signoff">
              <div className="founder-initials" aria-hidden="true">md.</div>
              <div><strong>{site.founder}</strong><span>Founder & engineering partner</span></div>
              <ArrowUpRight aria-hidden="true" />
            </div>
          </div>
        </header>

        {/* TODO: rewrite this section in your own words. Include how many years
            you've been building software, the kinds of systems and industries
            you've worked in, and one or two concrete outcomes. Specifics here
            are what make the site credible to a reader and citable by an
            answer engine. */}
        <section className="about-partnership" aria-labelledby="partnership-title" data-motion-group>
          <h2 id="partnership-title">Who you<br /><span>work with.</span></h2>
          <div>
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
          </div>
        </section>

        <section className="about-principles" aria-labelledby="principles-title">
          <h2 id="principles-title" data-motion="rise">How we <span>operate.</span></h2>
          <dl data-motion-group>
            {principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="about-invitation" aria-labelledby="invitation-title" data-motion-group>
          <h2 id="invitation-title">
            Think we might<br /><span>be a fit?</span>
          </h2>
          <div><p>
            Send over a short description of what you are building. If it is not
            something we should take on, we will say so and point you somewhere
            better.
          </p>
          <Link href="/contact" className="pill-button dark-button">
            Start an enquiry <ArrowUpRight size={20} aria-hidden="true" />
          </Link></div>
        </section>
      </div>
    </>
  );
}
