import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { LegalDocument } from "@/components/legal-document";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, graph } from "@/lib/schema";
import { site } from "@/site.config";

export const metadata = pageMetadata("Legal & privacy", "Who operates this website, how enquiry information is used, and how to contact us about privacy.", "/legal");

const sections = [
  { id: "operator", title: "Who we are", body: <p>This website is operated by {site.legalName}, an independent software consultancy led by {site.founder} in India. For business, legal, or privacy questions, use our <Link href="/contact">contact form</Link>. Include “Privacy request” or “Legal enquiry” in your message so we can direct it appropriately.</p> },
  { id: "privacy", title: "Information you share", body: <><p>When you send an enquiry, we receive your name, email address, optional company name, and message. These details let us respond and understand the work you are considering. Submitting the form asks us to use that information for this purpose.</p><p>Please share only what we need to assess your enquiry. Do not send passwords, payment details, identity documents, or other sensitive personal information through this form.</p></> },
  { id: "use", title: "How we use information", body: <><p>We use enquiry information to respond to your request, discuss a potential engagement, maintain relevant correspondence, and protect the form against misuse. We do not sell enquiry information or use it to enrol you in marketing emails.</p><p>If we agree to work together, a separate written engagement may set out additional requirements for client information and project data.</p></> },
  { id: "providers", title: "Service providers", body: <><p>Enquiries are delivered using Resend to our private business inbox. Email delivery, inbox, and website hosting providers process information as needed to provide their services. Their processing may take place outside India.</p><p>We may also disclose information where required by applicable law or necessary to respond to a lawful request. We do not publish the content of your enquiry.</p></> },
  { id: "technical-data", title: "Technical data & cookies", body: <p>The website does not use advertising pixels or non-essential analytics cookies. Hosting and delivery services may process technical information, such as IP addresses, request logs, and delivery status, for security and service operation. Fonts and website artwork are served with the website.</p> },
  { id: "retention", title: "Retention & security", body: <><p>We keep enquiry correspondence while it is needed to respond, manage the relationship, or meet applicable record-keeping obligations. When it is no longer needed, it should be deleted or anonymised, subject to lawful retention and service-provider backup practices.</p><p>Access to enquiry information is limited to those who need it for the purposes above. No internet transmission or storage method can be guaranteed to be completely secure.</p></> },
  { id: "choices", title: "Your choices & requests", body: <><p>You can ask us to explain how your information is used, correct it, delete it, stop further contact, or withdraw your request for us to process it. Use the <Link href="/contact">contact form</Link> and describe what you would like us to do. We may need to confirm your identity before sharing or changing information.</p><p>We handle requests subject to applicable Indian law, including any legal retention requirements. Withdrawing permission does not undo processing already carried out lawfully. This notice does not limit any rights or remedies available to you under applicable law.</p></> },
  { id: "website", title: "Website content & changes", body: <p>Our <Link href="/terms">Terms & conditions</Link> explain website use and how it relates to a paid engagement. We may update this notice as our services or practices change; the date above identifies the current version.</p> },
];

export default function LegalPage() {
  return <><JsonLd data={graph(breadcrumbSchema([{ name: "Legal & privacy", path: "/legal" }]))} /><LegalDocument title="Legal & privacy" intro="Clear information about this website and the details you choose to share with us." sections={sections} /></>;
}
