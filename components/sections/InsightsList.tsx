import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/motion/Reveal";

export type ArticlePreview = {
  slug: string;
  category: string;
  title: string;
  date: string;
  readingTime: number;
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

/**
 * SPEC.md Section 13/5.6. No article content model exists yet (Phase 9) —
 * `articles` defaults to empty, exercising the empty state this section is
 * explicitly required to handle gracefully.
 */
export function InsightsList({
  articles = [],
}: {
  articles?: ArticlePreview[];
}) {
  const t = useTranslations("insights");

  return (
    <Section className="border-b border-border">
      <Container className="flex flex-col gap-8">
        <div className="flex items-baseline justify-between gap-4">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <TextLink href="/insights">{t("viewAll")}</TextLink>
        </div>
        <Reveal>
          {articles.length === 0 ? (
            <p className="text-sm text-muted">{t("empty")}</p>
          ) : (
            <ul className="divide-y divide-border border-t border-border">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/insights/${article.slug}`}
                    className={`flex flex-col gap-2 py-6 ${focusRing}`}
                  >
                    <span className="text-eyebrow uppercase tracking-[0.15em] text-muted">
                      {article.category} · {article.date} ·{" "}
                      {article.readingTime} min
                    </span>
                    <span className="text-h4 font-[family-name:var(--font-display)]">
                      {article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </Section>
  );
}
