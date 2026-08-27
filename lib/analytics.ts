/**
 * SPEC.md Section 31 — event names match the spec's list exactly. Calling
 * `trackEvent` is always safe: it's a no-op unless `NEXT_PUBLIC_GA_ID` is
 * set and gtag.js has actually loaded (components/analytics/GoogleAnalytics.tsx),
 * so the site runs fully without analytics configured.
 */
export const ANALYTICS_EVENTS = {
  contactSubmit: "contact_submit",
  phoneClick: "phone_click",
  emailClick: "email_click",
  whatsappClick: "whatsapp_click",
  expertiseView: "expertise_view",
  articleView: "article_view",
} as const;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
