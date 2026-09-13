import { pageMetadata } from "@/lib/metadata";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { JsonLd } from "@/components/json-ld";
import { SculptureMark } from "@/components/sculpture-mark";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

const title = "Contact";
const description = `Start an enquiry with ${site.name}. Describe the problem in a few sentences and you will get a reply within one business day.`;

export const metadata = pageMetadata(title, description, "/contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Contact", path: "/contact" }]))} />

      <section className="contact-page page-shell" aria-labelledby="contact-title">
        <header className="contact-intro" data-motion-group>
          <h1 id="contact-title" data-motion="headline">Start an<br /><span>enquiry.</span></h1>
          <p>{description}</p>
        </header>
        <div className="contact-layout">
          <div className="contact-form-panel" data-motion="fade">
            <h2>Tell us what you have in mind.</h2>
            <p>A few sentences are enough to get started.</p>
            <ContactForm />
          </div>
          <aside className="contact-guide" aria-labelledby="contact-guide-title" data-motion="panel">
            <div className="contact-guide-heading">
              <h2 id="contact-guide-title">A good partnership starts with a conversation.</h2>
              <SculptureMark />
            </div>
            <div className="contact-next">
              <h3>What happens next</h3>
              <ol>
                <li><span aria-hidden="true">01</span><p>We reply within one business day to understand the problem and see if we’re a good fit.</p></li>
                <li><span aria-hidden="true">02</span><p>If it’s a fit, we start with a paid, one-to-two hour discovery session to agree on the direction.</p></li>
                <li><span aria-hidden="true">03</span><p>You get a written scope, a fixed price, and a delivery date before we start building.</p></li>
              </ol>
            </div>
            <Link href="/team" className="text-link">Meet the people behind the work <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </aside>
        </div>
      </section>
    </>
  );
}
