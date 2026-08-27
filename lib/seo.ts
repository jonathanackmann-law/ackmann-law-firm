import type { Metadata } from "next";
import { routing } from "./i18n/routing";
import { siteConfig } from "./config";

type BuildMetadataInput = {
  locale: string;
  /** "" for the homepage, otherwise starts with "/", e.g. "/firm". No locale prefix. */
  path: string;
  title: string;
  description: string;
};

/**
 * One place that knows how to build canonical + hreflang alternates + Open
 * Graph for a page (SPEC.md Section 26). URLs are relative — Next resolves
 * them against `metadataBase` (set once in the root layout), so no
 * environment/domain value is ever hardcoded here.
 */
export function buildMetadata({
  locale,
  path,
  title,
  description,
}: BuildMetadataInput): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}${path}`]),
  );

  return {
    // Homepage bypasses the root layout's "%s — Ackmann Law Firm" template
    // (title.absolute) — otherwise it'd read "ACKMANN LAW FIRM — Ackmann Law Firm".
    title: path === "" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: {
        ...languages,
        "x-default": `/${routing.defaultLocale}${path}`,
      },
    },
    openGraph: {
      title,
      description,
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      siteName: siteConfig.firmName,
      type: "website",
      url: `/${locale}${path}`,
    },
  };
}

type BreadcrumbItem = { label: string; href?: string };

/** Structured-data twin of the visual `Breadcrumbs` component — pass it the same items. */
export function breadcrumbJsonLd(items: BreadcrumbItem[], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && {
        item: `${siteConfig.canonicalBaseUrl}/${locale}${item.href === "/" ? "" : item.href}`,
      }),
    })),
  };
}
