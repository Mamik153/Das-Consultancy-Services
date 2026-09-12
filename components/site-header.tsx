import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link href="/" className="wordmark" aria-label={`${site.name} home`}>das<span>.</span><span className="wordmark-description">software<br />consultancy</span></Link>
        <nav aria-label="Main" className="main-nav">
          <Link href="/services">Expertise</Link>
          <Link href="/#approach">Our approach</Link>
          <Link href="/about">About us</Link>
          <Link href="/team">Team</Link>
        </nav>
        <Link href="/contact" className="pill-button header-cta">Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </header>
  );
}
