import type { MetadataRoute } from "next";
import { routing } from "@/lib/i18n/routing";
import { siteConfig } from "@/lib/config";
import { practiceAreaSlugs } from "@/lib/practice-areas";
import { getArticles } from "@/lib/articles";

// Static routes that exist today.
const staticPaths = [
  "",
  "/firm",
  "/jonathan-ackmann",
  "/expertise",
  "/insights",
  "/contact",
  "/privacy",
  "/legal",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.canonicalBaseUrl;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}/${locale}${path}`,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${base}/${l}${path}`]),
          ),
        },
      });
    }

    for (const slug of practiceAreaSlugs) {
      entries.push({ url: `${base}/${locale}/expertise/${slug}` });
    }

    for (const article of getArticles(locale)) {
      entries.push({ url: `${base}/${locale}/insights/${article.slug}` });
    }
  }

  return entries;
}
