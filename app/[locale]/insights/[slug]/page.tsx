import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArticleHeader } from "@/components/sections/ArticleHeader";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { getArticles, getArticleBySlug } from "@/lib/articles";
import { routing } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  // No published articles yet — nothing to prerender today. Once articles
  // are added to lib/articles.ts, this automatically statically generates
  // them; no route-file changes needed.
  return routing.locales.flatMap((locale) =>
    getArticles(locale).map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) return {};
  return buildMetadata({
    locale,
    path: `/insights/${slug}`,
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt ?? article.publishedAt,
          author: { "@type": "Person", name: article.author },
          description: article.excerpt,
        }}
      />
      <ArticleHeader article={article} />
      <ArticleBody body={article.body} />
      {/* No related-articles section: with a single-digit article count at
          launch, "related" would be arbitrary. Revisit once there's a
          real corpus to relate against. */}
      <ContactCTA />
    </main>
  );
}
