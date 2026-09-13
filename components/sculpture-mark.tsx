import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export function SculptureMark() {
  return (
    <span className="sculpture-mark" aria-hidden="true">
      <span><Image src="/images/precision-sculpture.webp" alt="" fill sizes="160px" /></span>
      <ArrowUpRight strokeWidth={1.25} />
    </span>
  );
}
