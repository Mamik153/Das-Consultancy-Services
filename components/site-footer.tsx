import Link from "next/link";
import { site } from "@/site.config";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 sm:grid-cols-3 sm:px-6">
        <div className="sm:col-span-1">
          <p className="font-semibold tracking-tight">{site.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{site.tagline}</p>
        </div>

        <nav aria-label="Services" className="text-sm">
          <h2 className="font-medium">Services</h2>
          <ul className="mt-3 space-y-2">
            {site.services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services#${s.slug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="font-medium">Get in touch</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li>
              <Link href="/contact" className="transition-colors hover:text-foreground">
                Start an enquiry
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-foreground">
                About {site.founder}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <p className="mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          {/* No year: pages are statically built, so a year here freezes at
              build time and silently goes stale on an undeployed site. */}
          © {site.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
