import type { MetadataRoute } from "next";
import { site } from "@/site.config";

/**
 * AI crawlers listed explicitly rather than left to the `*` rule.
 *
 * A wildcard Allow already permits them, but several of these agents are
 * blocked by default in hosting-provider and CDN bot rules, and an explicit
 * Allow line is the clearest signal that this content is meant to be read and
 * cited. Blocking them is the most common self-inflicted GEO wound.
 */
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
