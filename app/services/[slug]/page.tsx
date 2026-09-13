import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { SculptureMark } from "@/components/sculpture-mark";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

export const dynamicParams = false;
export function generateStaticParams() {
  return site.services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = site.services.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata(service.title, service.metaDescription, `/services/${slug}`);
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = site.services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <>
      <JsonLd data={graph(
        breadcrumbSchema([{ name: "Expertise", path: "/services" }, { name: service.title, path: `/services/${slug}` }]),
        { "@type": "Service", name: service.title, description: service.summary, url: `${site.url}/services/${slug}`, provider: { "@id": `${site.url}/#organization` } },
      )} />
      <article className="service-detail page-shell">
        <Link className="text-link" href="/services"><ArrowLeft size={17} aria-hidden="true" /> All expertise</Link>
        <div className="service-detail-hero" data-motion-group>
          <div><h1>{service.title}</h1><p>{service.summary}</p><Link className="pill-button dark-button" href="/contact">Discuss your project <ArrowUpRight size={20} aria-hidden="true" /></Link></div>
          <aside className="service-promise" data-motion="panel"><h2>{service.promise}</h2><div><span>{service.engagement}</span><SculptureMark /></div></aside>
        </div>
        <section className="service-fit" data-motion-group aria-labelledby="fit-title"><h2 id="fit-title">A good fit<br />if this is you.</h2><ul>{service.fit.map((item) => <li key={item}><Check size={20} aria-hidden="true" />{item}</li>)}</ul></section>
        <section className="service-steps" data-motion="rise" aria-labelledby="steps-title"><h2 id="steps-title">How we get there.</h2><ol>{service.steps.map((step, index) => <li key={step.title}><span className="service-step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></li>)}</ol></section>
        <section className="service-deliverables" data-motion-group aria-labelledby="deliverables-title"><div><h2 id="deliverables-title">What you<br />walk away with.</h2><p>{service.scopeNote}</p></div><ul>{service.outcomes.map((outcome) => <li key={outcome}><Check size={20} aria-hidden="true" />{outcome}</li>)}</ul></section>
        <nav className="related-services" data-motion-group aria-label="Explore other services"><h2>A different kind of challenge?</h2>{site.services.filter((item) => item.slug !== slug).map((item) => <Link key={item.slug} href={`/services/${item.slug}`}>{item.title}<ArrowUpRight size={20} aria-hidden="true" /></Link>)}</nav>
      </article>
    </>
  );
}
