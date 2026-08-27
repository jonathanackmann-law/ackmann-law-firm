import type { ComponentPropsWithoutRef } from "react";

/**
 * Vertical rhythm wrapper (SPEC.md Section 11 — 64-96px mobile, 96-160px
 * desktop section spacing). Pass `className` to override for sections that
 * need tighter or looser hierarchy — spacing is a starting point, not a rule.
 */
export function Section({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"section">) {
  return (
    <section className={`py-16 md:py-24 lg:py-40 ${className}`} {...props} />
  );
}
