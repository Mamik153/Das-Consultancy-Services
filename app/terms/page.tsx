import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument } from "@/components/legal-document";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "Terms & conditions",
  description: "Terms for using the Das Software Consultancy website and making a project enquiry.",
  alternates: { canonical: "/terms" },
  openGraph: { title: `Terms & conditions | ${site.name}`, url: "/terms" },
};

const sections = [
  { id: "scope", title: "About these terms", body: <p>These terms apply to your use of the website operated by {site.legalName} in India. Please read them before using the website or submitting an enquiry. They cover website use; a paid project is governed by a separate written engagement agreement.</p> },
  { id: "enquiries", title: "Enquiries & engagements", body: <><p>Submitting an enquiry does not create a client relationship, reserve capacity, or require either party to proceed. Service descriptions explain the types of work we offer and are not a binding quotation.</p><p>Before paid work begins, we agree the scope, price, delivery assumptions, and applicable terms in writing. Payment schedules, taxes, changes, cancellation, refunds, support, confidentiality, and project responsibilities belong in that agreement. If it conflicts with these website terms on a project matter, the engagement agreement takes precedence.</p></> },
  { id: "use", title: "Responsible use", body: <><p>You may browse the website and contact us for legitimate business or policy enquiries. Provide accurate information and only share material you are entitled to provide.</p><p>Do not use the website to send spam, impersonate another person, distribute malicious code, attempt unauthorised access, or interfere with the service. We may restrict access where reasonably needed to address misuse or security risks.</p></> },
  { id: "ownership", title: "Intellectual property", body: <><p>Unless otherwise identified, website text, artwork, branding, and design belong to {site.name} or their licensors. You may view and link to public pages. Other reuse must respect applicable copyright and any stated licences; these terms do not restrict uses permitted by law.</p><p>Ownership and licensing of software created for a client are addressed in the written engagement agreement. Website materials are separate from client deliverables.</p></> },
  { id: "information", title: "Information & availability", body: <p>We aim to keep website information accurate and useful, but it may change and is not a substitute for advice about your particular system. We do not promise uninterrupted access or that every page will always be free of errors. Let us know through the <Link href="/contact">contact form</Link> if you find a problem.</p> },
  { id: "privacy", title: "Privacy & submitted material", body: <p>Our <Link href="/legal#privacy">privacy notice</Link> explains how enquiry information is used. Initial enquiries should not contain confidential project files, credentials, or sensitive personal information. If your project needs confidentiality arrangements, we can agree them before exchanging protected material.</p> },
  { id: "third-parties", title: "Third-party services", body: <p>Links to other websites are provided for convenience. Their operators control their content and practices. The availability of third-party services used for hosting or communication may affect website operation.</p> },
  { id: "liability", title: "Responsibility & legal rights", body: <p>To the extent permitted by applicable law, we are not responsible for indirect or consequential losses arising solely from use of this informational website. Nothing in these terms excludes liability that cannot lawfully be excluded, limits mandatory consumer rights, or changes obligations we accept in a written engagement agreement.</p> },
  { id: "law", title: "Indian law & concerns", body: <p>These website terms are governed by the laws of India, subject to any mandatory rights that apply to you. Please first raise a concern through the <Link href="/contact">contact form</Link> so we can try to resolve it. Nothing here prevents you from approaching a court or authority with jurisdiction under applicable law.</p> },
  { id: "changes", title: "Updates to these terms", body: <p>We may revise these website terms as the website or business changes. Updates appear on this page with a revised date. Changes to an existing paid engagement must follow that engagement’s written agreement.</p> },
];

export default function TermsPage() {
  return <><JsonLd data={graph(breadcrumbSchema([{ name: "Terms & conditions", path: "/terms" }]))} /><LegalDocument title="Terms & conditions" intro="The terms for using our website, starting a conversation, and understanding where a written engagement begins." sections={sections} /></>;
}
