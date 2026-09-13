import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { faqSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

const serviceNotes = ["From first idea to first release.", "Clarity before your next big move.", "A fresh start for a stalled build.", "A technical partner in your corner."];
const steps = [
  { number: "01", title: "Find the right problem.", detail: "We start with a paid, one-to-two hour discovery session. Your goals, your constraints, and a shared definition of done.", deliverable: "A clear direction" },
  { number: "02", title: "Make the plan explicit.", detail: "You get a written scope, a fixed price, and a delivery date. We agree on what is included before a line of code is written.", deliverable: "A scope you can rely on" },
  { number: "03", title: "Build. Show. Improve.", detail: "Working software, demonstrated every week. You can stop at any week boundary and keep everything built so far.", deliverable: "Progress you can see" },
];

export default function Home() {
  return (
    <>
      <JsonLd data={graph(faqSchema)} />
      <section className="hero page-shell" aria-labelledby="hero-title">
        <div className="hero-copy" data-motion-group>
          <h1 data-motion="headline" id="hero-title">Big ambition.<br />Thoughtful<br /><span>engineering.</span></h1>
          <div className="hero-bottom">
            <p>We turn your next big idea into software that works. An independent engineering partner for founders ready to build something that lasts.</p>
            <Link className="pill-button dark-button" href="/contact">Let’s build together <ArrowUpRight aria-hidden="true" size={20} /></Link>
            <span className="hero-note">Direct collaboration. Clear commitments.</span>
          </div>
        </div>
        <div className="hero-art" data-motion="panel">
          <Image src="/images/precision-sculpture.webp" alt="" fill sizes="(max-width: 760px) 100vw, 43vw" preload className="sculpture" />
          <div className="art-top"><span>Considered by design.</span><span>Built to last.</span></div>
          <div className="art-bottom"><span>Strong foundations.<br />Extraordinary possibilities.</span><a href="#approach" className="round-link" aria-label="Explore our approach"><ArrowDown size={27} aria-hidden="true" /></a></div>
        </div>
      </section>

      <div className="trust-strip page-shell" data-motion-group aria-label="Our commitments">
        <p>A good partnership starts<br /><strong>with peace of mind.</strong></p>
        <span><Check aria-hidden="true" /> Fixed scope, agreed upfront</span>
        <span><Check aria-hidden="true" /> Working software, every week</span>
        <span><Check aria-hidden="true" /> Your code. Your ownership.</span>
      </div>

      <section className="services-section page-shell" id="services" aria-labelledby="services-title">
        <div className="section-intro" data-motion-group>
          <h2 id="services-title">The right expertise.<br /><span>Right when you need it.</span></h2>
          <p>From a blank canvas to a complex codebase. We meet you where you are and take responsibility for what comes next.</p>
        </div>
        <div className="service-list" data-motion-group>
          {site.services.map((service, index) => (
            <Link href={`/services/${service.slug}`} className="service-row" key={service.slug}>
              <h3>{service.title}</h3>
              <p>{serviceNotes[index]}</p>
              <span className="service-arrow"><ArrowUpRight aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
        <div className="technology-line" data-motion="fade"><span>Built with tools your next team will know.</span><p>TypeScript <span>/</span> React <span>/</span> Next.js <span>/</span> Python <span>/</span> Postgres</p></div>
      </section>

      <section className="approach-section" id="approach" aria-labelledby="approach-title">
        <div className="page-shell">
          <div className="section-intro" data-motion-group>
            <h2 id="approach-title">Good software.<br /><span>No guesswork.</span></h2>
            <p>You shouldn’t need to chase an update or wonder what you’re paying for. Here’s how we keep the work clear, visible, and yours.</p>
          </div>
          <ol className="process-list" data-motion-group>
            {steps.map((step) => (
              <li key={step.number}>
                <div className="step-top"><span>{step.number}</span><ArrowDownRight aria-hidden="true" size={30} /></div>
                <h3>{step.title}</h3><p>{step.detail}</p>
                <div className="deliverable"><Check aria-hidden="true" size={16} />{step.deliverable}</div>
              </li>
            ))}
          </ol>
          <div className="ownership-note" data-motion="rise"><span>From day one</span><p>Your repository.<br />Your intellectual property.<br /><span>Your freedom to move forward.</span></p><ArrowUpRight aria-hidden="true" /></div>
        </div>
      </section>

      <section className="partner-section page-shell" aria-labelledby="partner-title">
        <div className="partner-panel" data-motion="panel"><span className="partner-name">{site.name}</span><p>Small by choice.<br />Accountable<br />by name.</p><div className="founder-signoff"><div className="founder-initials" aria-hidden="true">md.</div><div><strong>{site.founder}</strong><span>Founder & engineering partner</span></div><ArrowUpRight aria-hidden="true" /></div></div>
        <div className="partner-copy" data-motion="rise"><h2 id="partner-title">A partner.<br /><span>Not a hand-off.</span></h2><p>You talk to the person building your product. Mamik leads every engagement personally, from the first conversation to the final handover.</p><p>We keep our commitments focused so your project gets the attention it deserves. Honest advice, well-understood technology, and software your team can maintain.</p><Link href="/about" className="text-link">Meet your engineering partner <ArrowUpRight aria-hidden="true" size={20} /></Link></div>
      </section>

      <section className="faq-section page-shell" aria-labelledby="faq-title">
        <div className="faq-intro" data-motion="rise"><h2 id="faq-title">Good questions.<br /><span>Straight answers.</span></h2><p>Something else on your mind?</p><Link href="/contact" className="text-link">Let’s talk <ArrowRight aria-hidden="true" size={18} /></Link></div>
        <div className="faq-list" data-motion-group>{site.faqs.map((faq) => (<details key={faq.q}><summary>{faq.q}<Plus size={20} aria-hidden="true" /></summary><p>{faq.a}</p></details>))}</div>
      </section>
    </>
  );
}
