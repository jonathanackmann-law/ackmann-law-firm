import { getTranslations } from "next-intl/server";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";
import { routing } from "@/lib/i18n/routing";
import { getArticles, getArticleBySlug } from "@/lib/articles";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ackmann Law Firm — Insights";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getArticles(locale).map((article) => ({ locale, slug: article.slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  const tInsights = await getTranslations({ locale, namespace: "insights" });
  // No published articles exist yet — falls back to a generic Insights
  // image rather than erroring; will pick up real titles automatically
  // once articles are added to lib/articles.ts.
  return renderOgImage({
    eyebrow: article?.category ?? tInsights("eyebrow"),
    title: article?.title ?? tInsights("eyebrow"),
  });
}
