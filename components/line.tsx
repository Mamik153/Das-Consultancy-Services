import type { CSSProperties, ReactNode } from "react";

/** One masked headline line; `globals.css` slides the inner span up on first paint. */
export function Line({ index, accent = false, children }: { index: number; accent?: boolean; children: ReactNode }) {
  return (
    <span className="line" style={{ "--line": index } as CSSProperties}>
      <span className={accent ? "accent" : undefined}>{children}</span>
    </span>
  );
}
