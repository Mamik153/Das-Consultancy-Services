import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, Plus } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

const title = "Services";
const description = "Explore product engineering, architecture reviews, project rescue, and technical advisory. Software and AI expertise with scope and pricing agreed upfront.";

export const metadata = pageMetadata(title, description, "/services");

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Services", path: "/services" }]))} />

      <div className="services-page page-shell">
        <div className="services-visual-strip" aria-hidden="true">
          <div className="services-visual-word">idea.</div>
          <div className="services-visual-material"><Image src="/images/precision-sculpture.webp" alt="" fill sizes="(max-width: 760px) 25vw, 24vw" loading="eager" /></div>
          <div className="services-visual-arrow"><ArrowRight strokeWidth={1.3} /></div>
          <div className="services-visual-build"><Image src="/images/services-sculpture.webp" alt="" fill sizes="(max-width: 760px) 25vw, 24vw" loading="eager" /><span>built.</span></div>
        </div>
        <header className="services-masthead" data-motion="headline">
          <h1>Services.</h1>
          <Link href="/contact" className="pill-button dark-button">Start an enquiry <ArrowUpRight size={20} aria-hidden="true" /></Link>
        </header>
        <div className="services-intro" data-motion-group>
          <div>
            <h2>Clear outcomes.<br /><span>From the start.</span></h2>
            <p>{description}</p>
          </div>
          <p className="services-statement">Every engagement is scoped, priced, and dated in writing before work starts.</p>
        </div>

        <div className="services-catalog">
          {site.services.map((service) => (
            <section
              key={service.slug}
              id={service.slug}
              className="services-offering"
              aria-labelledby={`${service.slug}-heading`}
            >
              <Image
                className="service-artwork"
                src={`/images/services/${service.slug}.webp`}
                alt=""
                width={960}
                height={640}
                sizes="(max-width: 760px) 100vw, 50vw"
              />
              <div className="services-offering-content">
                <div className="services-overview" data-motion="rise">
                  <h2 id={`${service.slug}-heading`}>{service.title}</h2>
                  <p>{service.summary}</p>
                  <Link href={`/services/${service.slug}`} className="text-link">
                    Explore {service.title.toLowerCase()} <ArrowUpRight size={20} aria-hidden="true" />
                  </Link>
                </div>
                <div className="services-outcomes" data-motion="fade">
                  <h3>What you get</h3>
                  <ul>
                    {service.outcomes.map((outcome) => (
                      <li key={outcome}><Check size={18} aria-hidden="true" /><span>{outcome}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>

        <section className="faq-section" aria-labelledby="services-faq-title">
          <div className="faq-intro" data-motion="rise">
            <h2 id="services-faq-title">Common<br /><span>questions.</span></h2>
            <Link href="/contact" className="text-link">
              Start an enquiry <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
          </div>
          <div className="faq-list" data-motion-group>
            {site.faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}<Plus size={20} aria-hidden="true" /></summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
