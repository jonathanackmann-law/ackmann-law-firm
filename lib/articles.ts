/**
 * Article content model (SPEC.md Section 17). No published articles exist
 * yet — this ships the architecture (content model, index, article
 * template), not fabricated attorney-authored content. Populate per locale
 * once real articles exist; the index/article pages and category filtering
 * already work against whatever these arrays contain.
 */
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  readingTime?: number;
  body: string;
  seoTitle?: string;
  seoDescription?: string;
  image?: string;
};

const articlesByLocale: Record<string, Article[]> = {
  en: [],
  fr: [],
  he: [],
};

export function getArticles(locale: string): Article[] {
  return articlesByLocale[locale] ?? [];
}

export function getArticleBySlug(
  locale: string,
  slug: string,
): Article | undefined {
  return getArticles(locale).find((article) => article.slug === slug);
}
