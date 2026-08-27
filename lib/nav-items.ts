/**
 * Primary navigation — single source shared by Header and Footer
 * (SPEC.md Section 12/20). Labels come from the "nav" message namespace,
 * keyed by `key` below.
 */
export const navItems = [
  { key: "firm", href: "/firm" },
  { key: "expertise", href: "/expertise" },
  { key: "founder", href: "/jonathan-ackmann" },
  { key: "insights", href: "/insights" },
  { key: "contact", href: "/contact" },
] as const;
