"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Expertise" },
  { href: "/about", label: "About us" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const motionRun = useRef(0);
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => {
    const menu = dialog.current;
    if (!menu?.open || menu.classList.contains("is-closing")) return;
    menu.classList.remove("is-open");
    menu.classList.add("is-closing");
    const run = ++motionRun.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) menu.close();
    else {
      // Include delayed item and panel transitions; interrupted runs cannot close a reopened menu.
      const animations = menu.getAnimations({ subtree: true });
      void Promise.all(animations.map((animation) => animation.finished.catch(() => {}))).then(() => {
        if (menu.isConnected && motionRun.current === run) menu.close();
      });
    }
  }, []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => { if (desktop.matches) dialog.current?.close(); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  const items = links.map(({ href, label }, index) => (
    <Link key={href} href={href} style={{ "--menu-item-index": index } as CSSProperties} onClick={closeMenu} aria-current={pathname === href || (href === "/services" && pathname.startsWith("/services/")) ? "page" : undefined}>
      {label}
    </Link>
  ));

  return (
    <>
      <nav aria-label="Main" className="main-nav">{items}</nav>
      <button ref={trigger} type="button" className="mobile-menu-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu" onClick={() => {
        motionRun.current++;
        dialog.current?.showModal();
        // Establish the closed pose before starting the CSS transition.
        dialog.current?.getBoundingClientRect();
        dialog.current?.classList.add("is-open");
        setOpen(true);
      }}><Menu size={24} aria-hidden="true" /></button>
      <dialog ref={dialog} id="mobile-menu" className="mobile-menu" style={{ "--menu-item-last": links.length } as CSSProperties} aria-label="Navigation menu" onCancel={(event) => {
        event.preventDefault();
        closeMenu();
      }} onClose={() => {
        motionRun.current++;
        dialog.current?.classList.remove("is-open", "is-closing");
        setOpen(false);
        if (trigger.current?.getClientRects().length) trigger.current.focus({ preventScroll: true });
      }}>
        <div className="mobile-menu-top">
          <span>Menu</span>
          <button type="button" className="mobile-menu-close" aria-label="Close menu" autoFocus onClick={closeMenu}><X size={24} aria-hidden="true" /></button>
        </div>
        <nav aria-label="Main" className="mobile-menu-nav">{items}</nav>
        <Link href="/contact" className="pill-button mobile-menu-cta" style={{ "--menu-item-index": links.length } as CSSProperties} onClick={closeMenu}>Let’s talk <ArrowUpRight size={20} aria-hidden="true" /></Link>
      </dialog>
    </>
  );
}
