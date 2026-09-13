"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { observeSectionMotion } from "@/lib/section-motion";

export function SectionMotion() {
  const pathname = usePathname();
  useEffect(() => observeSectionMotion(), [pathname]);
  return null;
}
