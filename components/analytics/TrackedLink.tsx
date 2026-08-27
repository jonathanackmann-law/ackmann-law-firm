"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Wraps a plain `<a>` with an analytics event — kept as a small standalone
 * client component so pages/sections using it (Footer, Contact) can stay
 * Server Components otherwise. `event` is a string prop, not a function:
 * Server Components can't pass function props to Client Components.
 */
export function TrackedLink({
  event,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { event: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackEvent(event);
        onClick?.(e);
      }}
    />
  );
}
