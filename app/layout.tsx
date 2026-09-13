import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import localFont from "next/font/local";
import { JsonLd } from "@/components/json-ld";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionMotion } from "@/components/section-motion";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { site } from "@/site.config";
import "./globals.css";

const manrope = localFont({
  src: "./fonts/manrope-variable.woff2",
  variable: "--font-manrope",
  display: "swap",
  weight: "200 800",
});

export const metadata: Metadata = {
  ...pageMetadata("Software Engineering & AI Integration", site.description, "/"),
  metadataBase: new URL(site.url),
  title: { default: `Software Engineering & AI Integration | ${site.name}`, template: `%s | ${site.name}` },
  applicationName: site.name,
  authors: site.team.map(({ name }) => ({ name, url: `${site.url}/team` })),
  creator: site.founder,
  publisher: site.legalName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined },
  formatDetection: { telephone: false, address: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.lang}
      className={`${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <div hidden dangerouslySetInnerHTML={{ __html: `<!--
THESIS: A premium independent engineering partnership, with concrete commitments as proof.
OWN-WORLD: Cobalt blue, white, charcoal, Manrope typography, oversized rounded panels, original chrome-and-blue sculpture.
STORY: Understand the offer, inspect the services and delivery terms, meet the founder, send an enquiry.
FIRST VIEWPORT: Large left-aligned three-line promise and enquiry button beside a full-height sculptural artwork.
FORM: Reference-led agency composition, pinned by the user's 14 examples; seed da7395e9 yielded no challengers and does not override the brief.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
-->` }} />
        <JsonLd data={graph(organizationSchema, websiteSchema)} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <SectionMotion />
      </body>
    </html>
  );
}
