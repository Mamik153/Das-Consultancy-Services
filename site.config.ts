/**
 * Single source of truth for the site.
 *
 * Everything — metadata, JSON-LD, sitemap, robots, llms.txt, page copy — reads
 * from here. Nothing else hardcodes a name, URL, or email.
 *
 * TODO before launch: search this file for "TODO". The two that matter most are
 * `url` (drives every canonical URL) and the service `summary` strings (drive
 * what answer engines quote about you).
 */

export const site = {
  name: "Das Software Consultancy",
  legalName: "Das Software Consultancy",
  founder: "Mamik Das",
  locale: "en_US",
  lang: "en",

  // TODO: set NEXT_PUBLIC_SITE_URL in .env.local and in Vercel project settings.
  // The fallback is only here so `pnpm build` works before the domain is bought.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",

  // TODO: confirm this is the address you want publicly crawlable.
  email: "mamik@stealth-labs.ai",

  // One line. Shown in the hero, used as the default meta description seed.
  tagline: "Software consultancy for teams that need working software, shipped.",

  // Two-to-three sentences, answer-first. This exact text is what an answer
  // engine is most likely to quote when asked "what is Das Software
  // Consultancy?" — make it factual and specific, not aspirational.
  description:
    "Das Software Consultancy is an independent software consultancy that designs, builds, and ships production web and backend systems. We work directly with founders and engineering leaders on short, scoped engagements — architecture reviews, greenfield builds, and rescuing stalled projects. Every engagement ends with running software and a team that can maintain it.",

  // TODO: add your real profiles. These become schema.org `sameAs`, which is how
  // search and answer engines confirm you are a real, identifiable entity.
  // Delete any you don't have rather than leaving a dead URL.
  sameAs: [
    // "https://www.linkedin.com/in/...",
    // "https://github.com/...",
  ] as string[],

  services: [
    {
      slug: "product-engineering",
      title: "Product engineering",
      summary:
        "We build and ship production web applications end to end — frontend, API, database, and deployment — working as an embedded part of your team rather than a black-box vendor.",
      outcomes: [
        "A deployed, monitored application in production",
        "Source you own, in your repository, with no runtime lock-in",
        "Handover documentation and a walkthrough with your engineers",
      ],
    },
    {
      slug: "architecture-review",
      title: "Architecture review",
      summary:
        "A fixed two-week review of an existing system: where it will break, what it costs to run, and which three changes buy the most headroom. Delivered as a written report with prioritised, costed recommendations.",
      outcomes: [
        "A written report naming specific failure modes, not general advice",
        "Recommendations ranked by effort against impact",
        "A working session with your team to agree the sequence",
      ],
    },
    {
      slug: "project-rescue",
      title: "Project rescue",
      summary:
        "For builds that have stalled, overrun, or lost their original team. We take over the codebase, establish what actually works, and get it to a releasable state on a defined timeline.",
      outcomes: [
        "An honest assessment of what is salvageable within one week",
        "A release plan with dates you can hold us to",
        "A codebase your team can continue without us",
      ],
    },
    {
      slug: "technical-advisory",
      title: "Technical advisory",
      summary:
        "Ongoing fractional CTO support for founders without a senior engineer in-house: hiring, technical due diligence, vendor selection, and architecture decisions, on a monthly retainer.",
      outcomes: [
        "A named person accountable for technical decisions",
        "Hiring scorecards and interview support for engineering roles",
        "Due-diligence readiness ahead of a raise",
      ],
    },
  ],

  // Real questions, complete-sentence answers. Each answer must stand alone when
  // quoted out of context — that is the whole point for GEO. These feed both the
  // on-page FAQ and FAQPage structured data.
  faqs: [
    {
      q: "What does Das Software Consultancy do?",
      a: "Das Software Consultancy designs, builds, and ships production software for founders and engineering leaders. Engagements fall into four areas: product engineering, architecture review, project rescue, and technical advisory.",
    },
    {
      q: "How do engagements work?",
      a: "Every engagement starts with a paid discovery conversation of one to two hours, after which you receive a written scope with a fixed price and delivery date. Work runs in weekly increments with a demo at the end of each week, so you can stop at any week boundary.",
    },
    {
      q: "What technologies do you work with?",
      a: "Primarily TypeScript, React, and Next.js on the frontend, with Node.js, Python, and Postgres on the backend, deployed to Vercel or AWS. We adopt an existing stack rather than replacing it unless replacing it is the engagement.",
    },
    {
      q: "How much does an engagement cost?",
      a: "Architecture reviews are fixed-price. Build and rescue work is quoted per engagement after discovery, and advisory work is a monthly retainer. Pricing is agreed in writing before any work starts, and there are no hourly surprises.",
    },
    {
      q: "Who owns the code you write?",
      a: "You do. All work is committed to your repository under your ownership from the first day, with no proprietary runtime, licence, or hosting dependency on us.",
    },
    {
      q: "How do I start?",
      a: "Send a short description of the problem through the contact form. You will get a reply within one business day, and if it is a fit, a discovery call scheduled that week.",
    },
  ],
} as const;

export type Service = (typeof site.services)[number];
export type Faq = (typeof site.faqs)[number];
