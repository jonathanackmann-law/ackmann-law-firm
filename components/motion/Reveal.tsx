"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * SPEC.md Section 23 — subtle fade + vertical movement for below-the-fold
 * section entrances only (never Hero or a page's own H1 block: those must
 * render immediately, no delay on the primary content — SPEC.md Section
 * 5.1's "Hero works without animation"). `once: true` so it never replays.
 * Global `prefers-reduced-motion` handling lives on `MotionConfig` in the
 * root layout, not per-component.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
