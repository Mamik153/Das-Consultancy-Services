import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-invitation" data-motion="rise"><h2>Something in mind?<br /><span>Let’s make it real.</span></h2><Link href="/contact" className="footer-arrow" aria-label="Start a project enquiry"><ArrowUpRight aria-hidden="true" /></Link></div>
        <div className="footer-contact" data-motion="rise"><p>A short description is all it takes to start.<br />We’ll get back to you within one business day.</p><Link href="/contact">Start a conversation<ArrowUpRight size={20} aria-hidden="true" /></Link></div>
        <div className="footer-bottom" data-motion="rise"><Link href="/" className="wordmark" aria-label={site.name}>das<span>.</span></Link><p>© {site.legalName}</p><nav aria-label="Footer"><Link href="/services">Expertise</Link><Link href="/about">About</Link><Link href="/team">Team</Link><Link href="/contact">Contact</Link></nav><div className="footer-policies"><Link href="/legal">Legal & privacy</Link><Link href="/terms">Terms & conditions</Link></div><a href="#main" className="back-top">Back to top <ArrowUpRight size={16} aria-hidden="true" /></a></div>
      </div>
    </footer>
  );
}
