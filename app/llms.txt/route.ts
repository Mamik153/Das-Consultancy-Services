import { site } from "@/site.config";

/**
 * /llms.txt — the emerging convention for telling language models what a site
 * is and where its substantive content lives.
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

Contact: ${site.email}
Website: ${site.url}

## Services

${site.services
  .map((s) => `### ${s.title}\n\n${s.summary}\n\n${s.outcomes.map((o) => `- ${o}`).join("\n")}`)
  .join("\n\n")}

## Frequently asked questions

${site.faqs.map((f) => `### ${f.q}\n\n${f.a}`).join("\n\n")}

## Pages

- [Home](${site.url}/): Overview of services and how engagements work.
- [Services](${site.url}/services): Detailed description of each engagement type.
- [About](${site.url}/about): Who runs the consultancy and how it operates.
- [Contact](${site.url}/contact): Enquiry form and direct email address.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
