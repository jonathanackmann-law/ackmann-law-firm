import type { ComponentPropsWithoutRef } from "react";

/**
 * Horizontal content wrapper (SPEC.md Section 11 — grid/max-width strategy).
 * Not every section needs one: full-bleed imagery should skip it.
 */
export function Container({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={`mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16 ${className}`}
      {...props}
    />
  );
}
