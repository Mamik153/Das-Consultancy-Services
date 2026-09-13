import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function LegalDocument({ title, intro, sections }: {
  title: string;
  intro: string;
  sections: { id: string; title: string; body: ReactNode }[];
}) {
  return (
    <article className="legal-document page-shell">
      <header className="legal-heading" data-motion="fade"><h1>{title}</h1><p>{intro}</p><span>Last updated: 13 September 2026</span></header>
      <div className="legal-layout">
        <nav aria-label="On this page"><h2>On this page</h2>{sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
        <div className="legal-content">{sections.map((section) => <section data-motion="fade" key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`}><h2 id={`${section.id}-heading`}>{section.title}</h2>{section.body}</section>)}<Link href="/contact" className="text-link">Contact us about these policies <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
      </div>
    </article>
  );
}
