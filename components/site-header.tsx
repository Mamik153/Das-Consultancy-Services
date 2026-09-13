import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import logo from "@/public/images/dsc-logo.webp";
import { SiteNav } from "@/components/site-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner page-shell">
        <Link href="/" className="header-logo" aria-label={`${site.name} home`}>
          <Image src={logo} alt={site.name} sizes="(max-width: 760px) 190px, 240px" loading="eager" />
        </Link>
        <SiteNav />
        <Link href="/contact" className="pill-button header-cta">Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></Link>
      </div>
    </header>
  );
}
