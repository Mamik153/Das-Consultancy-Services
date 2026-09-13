import { site } from "@/site.config";

/**
 * Optional human-readable site index; not a search-engine requirement or a
 * guarantee of inclusion in AI answers.
 *
 * Generated from site.config.ts so it cannot drift from the pages.
 * Spec: https://llmstxt.org
 */
// GET route handlers are uncached by default since Next 15; the content here is
// build-time constant, so prerender it like every other page.
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.tagline}

${site.description}

Contact: ${site.url}/contact
Website: ${site.url}

## Founding team

${site.team.map((member) => `### ${member.name} — ${member.role}\n\n${member.bio}`).join("\n\n")}

## Services

${site.services
  .map((s) => `### ${s.title}\n\n${s.summary}\n\n${s.outcomes.map((o) => `- ${o}`).join("\n")}`)
  .join("\n\n")}

## Frequently asked questions

${site.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Pages

- [Home](${site.url}/): Overview of services and how engagements work.
- [Services](${site.url}/services): Detailed description of each engagement type.
${site.services.map((service) => `- [${service.title}](${site.url}/services/${service.slug}): ${service.promise}`).join("\n")}
- [Legal & privacy](${site.url}/legal): Website operator and enquiry privacy notice.
- [Terms & conditions](${site.url}/terms): Website use and engagement terms.
- [About](${site.url}/about): Who runs the consultancy and how it operates.
- [Team](${site.url}/team): Meet the people behind the consultancy.
- [Contact](${site.url}/contact): Private enquiry form.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
