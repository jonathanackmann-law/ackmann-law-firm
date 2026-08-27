"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires an analytics event on mount, renders nothing. Used for the
 * page-view-style events (expertise_view, article_view) on otherwise-Server
 * Component pages. `event`/`slug` are plain strings, not a function prop,
 * for the same Server→Client boundary reason as TrackedLink.
 */
export function ViewTracker({ event, slug }: { event: string; slug: string }) {
  useEffect(() => {
    trackEvent(event, { slug });
  }, [event, slug]);

  return null;
}
