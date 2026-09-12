/**
 * Single source of truth for the site.
 *
 * Everything — metadata, JSON-LD, sitemap, robots, llms.txt, page copy — reads
 * from here. Private email settings live only in server environment variables.
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
      promise: "From your first idea to a product people can use.",
      engagement: "Scoped build",
      fit: ["You have a product idea and need a dependable team to build it.", "Your prototype needs to become a maintainable production application.", "You need frontend, backend, and deployment handled together."],
      steps: [{"title": "Define the first release", "body": "We work through your users, the core journey, and the constraints. Together, we choose what needs to ship first and what can wait."}, {"title": "Build in visible increments", "body": "Design, frontend, API, and database move forward together. Weekly demos give you something running to review, with decisions recorded as we go."}, {"title": "Launch and hand over", "body": "We deploy the agreed release, set up monitoring, and walk your team through the code and operations. Source and documentation stay in your repository."}],
      scopeNote: "Integrations, migration, hosting costs, and post-launch support are discussed during discovery and included explicitly where agreed.",
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
      promise: "Make your next technical decision with confidence.",
      engagement: "Two-week review",
      fit: ["Your system is growing and you need to understand its limits.", "Infrastructure costs are rising without a clear explanation.", "You want an independent view before committing to a major rewrite."],
      steps: [{"title": "Understand the system", "body": "We review the code, deployment, data flows, and operational concerns with your engineers. The review focuses on your business constraints and actual failure modes."}, {"title": "Find the changes that matter", "body": "We examine reliability, maintainability, and cost tradeoffs. Recommendations are ranked by effort and impact, with evidence and practical next steps."}, {"title": "Agree a path forward", "body": "You receive a written report and a working session with your team. We make the sequence clear so the report becomes an actionable engineering plan."}],
      scopeNote: "The review produces recommendations and a team working session. Implementation, penetration testing, and compliance certification require a separate scope.",
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
      promise: "Get a stalled build moving toward a real release.",
      engagement: "Assessment, then recovery",
      fit: ["Your project has overrun and the launch date keeps moving.", "The original team has left and you need someone to take ownership.", "You need a candid assessment of what is worth keeping."],
      steps: [{"title": "Establish what actually works", "body": "We get the project running and assess the code, dependencies, and release blockers. Within one week, you get an honest view of what is salvageable."}, {"title": "Reset the release plan", "body": "We prioritise the work needed for a releasable product. Dates, scope, dependencies, and risks are made explicit before recovery work starts."}, {"title": "Deliver and restore continuity", "body": "We work through the agreed priorities with weekly demos, then document the system and transfer operational knowledge so your team can continue."}],
      scopeNote: "Recovery starts with an assessment. A release timeline is agreed after the codebase, access, and third-party dependencies have been evaluated.",
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
      promise: "Senior technical judgment, close to your business.",
      engagement: "Monthly retainer",
      fit: ["You are a founder without a senior engineer in-house.", "You need help evaluating vendors, hires, or technical proposals.", "You want a consistent technical voice ahead of a raise or a new phase of growth."],
      steps: [{"title": "Set the decision agenda", "body": "We understand your product, team, and upcoming business milestones. Together, we define the decisions and support the retainer should cover."}, {"title": "Work through the tradeoffs", "body": "From hiring scorecards and vendor reviews to architecture decisions, you get direct, practical advice with the reasoning written down."}, {"title": "Build your team’s independence", "body": "We review progress and adjust priorities as the business changes. The aim is to strengthen your own decision-making and engineering capability."}],
      scopeNote: "Cadence, availability, and the scope of advice are agreed in the retainer. Hands-on product delivery is scoped separately from advisory support.",
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
