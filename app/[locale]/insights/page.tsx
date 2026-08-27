import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getArticles, type Article } from "@/lib/articles";
import { buildMetadata } from "@/lib/seo";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "insightsPage" });
  return buildMetadata({
    locale,
    path: "/insights",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function InsightsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const articles = getArticles(locale);

  return (
    <main>
      <InsightsIndexContent articles={articles} />
      <ContactCTA />
    </main>
  );
}

/**
 * Category filtering (SPEC.md Section 9.2) is deferred: with zero
 * articles, there's nothing to filter and no way to verify a filter UI
 * actually works. `getArticles` already returns full `Article` objects
 * with `category`, so adding filter chips once real content exists is a
 * small addition here, not a redesign.
 */
function InsightsIndexContent({ articles }: { articles: Article[] }) {
  const t = useTranslations("insightsPage");
  const tInsights = useTranslations("insights");

  return (
    <>
      <Section className="border-b border-border pb-8 pt-16 md:pt-24">
        <Container className="flex flex-col gap-6">
          <Eyebrow>{tInsights("eyebrow")}</Eyebrow>
          <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-h1">
            {t("title")}
          </h1>
          <p className="max-w-xl text-body-lg text-foreground/80">
            {t("intro")}
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          {articles.length === 0 ? (
            <p className="text-sm text-muted">{tInsights("empty")}</p>
          ) : (
            <ul className="divide-y divide-border border-t border-border">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/insights/${article.slug}`}
                    className={`flex flex-col gap-2 py-6 ${focusRing}`}
                  >
                    <span className="text-eyebrow uppercase tracking-[0.15em] text-muted">
                      {article.category} · {article.publishedAt}
                      {article.readingTime
                        ? ` · ${article.readingTime} min`
                        : ""}
                    </span>
                    <span className="text-h4 font-[family-name:var(--font-display)]">
                      {article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </>
  );
}
