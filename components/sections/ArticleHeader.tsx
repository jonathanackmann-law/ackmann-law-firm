import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { Article } from "@/lib/articles";

/** SPEC.md Section 17/9.3 — capped to the ~680-760px reading measure. */
export function ArticleHeader({ article }: { article: Article }) {
  const locale = useLocale();
  const tBreadcrumbs = useTranslations("breadcrumbs");
  const tInsights = useTranslations("insights");

  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    new Date(article.publishedAt),
  );

  const breadcrumbItems = [
    { label: tBreadcrumbs("home"), href: "/" },
    { label: tInsights("eyebrow"), href: "/insights" },
    { label: article.title },
  ];

  return (
    <Section className="border-b border-border pb-8 pt-16 md:pt-24">
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems, locale)} />
      <ViewTracker event={ANALYTICS_EVENTS.articleView} slug={article.slug} />
      <Container>
        <div className="mx-auto flex max-w-[760px] flex-col gap-6">
          <Breadcrumbs items={breadcrumbItems} />
          <Eyebrow>{article.category}</Eyebrow>
          <h1 className="font-[family-name:var(--font-display)] text-h1">
            {article.title}
          </h1>
          <p className="text-sm text-muted">
            {article.author} · {date}
            {article.readingTime ? ` · ${article.readingTime} min` : ""}
          </p>
          <p className="text-body-lg text-foreground/80">{article.excerpt}</p>
        </div>
      </Container>
    </Section>
  );
}
