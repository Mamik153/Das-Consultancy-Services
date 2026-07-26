import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">
        That page does not exist
      </h1>
      <p className="mt-4 text-muted-foreground text-pretty">
        The link may be out of date. Everything on the site is reachable from the
        pages below.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button render={<Link href="/" />} size="lg" className="px-5">
          Go home
        </Button>
        <Button
          render={<Link href="/services" />}
          size="lg"
          variant="outline"
          className="px-5"
        >
          See services
        </Button>
        <Button
          render={<Link href="/contact" />}
          size="lg"
          variant="outline"
          className="px-5"
        >
          Contact
        </Button>
      </div>
    </section>
  );
}
