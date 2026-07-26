import Link from "next/link";
import { Button } from "@/components/ui/button";
import { site } from "@/site.config";

// Three links plus a CTA fit on a 320px viewport, so there is no mobile menu
// and no client JS in the header.
const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          {site.name.replace(" Consultancy", "")}
          <span className="text-muted-foreground"> Consultancy</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground sm:px-3"
            >
              {item.label}
            </Link>
          ))}
          <Button render={<Link href="/contact" />} size="sm" className="px-3">
            Contact
          </Button>
        </nav>
      </div>
    </header>
  );
}
