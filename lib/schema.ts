import { site } from "@/site.config";

/** Stable @id values so the graph nodes can reference each other. */
const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;

export const organizationSchema = {
  "@type": "Organization",
  "@id": orgId,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  slogan: site.tagline,
  logo: `${site.url}/images/dsc-logo.webp`,
  image: `${site.url}/opengraph-image`,
  founder: site.team.map((member) => ({ "@type": "Person", name: member.name, jobTitle: member.role, url: `${site.url}/team` })),
  knowsAbout: site.services.map((s) => s.title),
  ...(site.sameAs.length > 0 && { sameAs: site.sameAs }),
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    url: `${site.url}/contact`,
    availableLanguage: "English",
  },
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": siteId,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: site.lang,
  publisher: { "@id": orgId },
};

export const teamPageSchema = {
  "@type": "AboutPage",
  "@id": `${site.url}/team#webpage`,
  url: `${site.url}/team`,
  name: `Our team | ${site.name}`,
  isPartOf: { "@id": siteId },
  about: { "@id": orgId },
  mainEntity: site.team.map((member) => ({
    "@type": "Person", name: member.name, jobTitle: member.role,
    description: member.bio, knowsAbout: member.expertise,
    worksFor: { "@id": orgId },
  })),
};

export const faqSchema = {
  "@type": "FAQPage",
  mainEntity: site.faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: `${site.url}${item.path === "/" ? "" : item.path}`,
      }),
    ),
  };
}

/** Wraps nodes in a single @graph so one <script> tag carries the whole page. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
