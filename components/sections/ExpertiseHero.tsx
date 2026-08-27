import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { breadcrumbJsonLd } from "@/lib/seo";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import type { PracticeAreaSlug } from "@/lib/practice-areas";

/**
 * SPEC.md Section 33's required `ExpertiseHero` — mirrors `ArticleHeader`'s
 * pattern (bundles its own breadcrumbs, JSON-LD and view tracking) rather
 * than scattering them across the expertise detail page file.
 */
export function ExpertiseHero({
  slug,
  title,
  intro,
}: {
  slug: PracticeAreaSlug;
  title: string;
  intro: string;
}) {
  const locale = useLocale();
  const t = useTranslations("expertise");
  const tBreadcrumbs = useTranslations("breadcrumbs");

  const breadcrumbItems = [
    { label: tBreadcrumbs("home"), href: "/" },
    { label: t("eyebrow"), href: "/expertise" },
    { label: title },
  ];

  return (
    <Section className="border-b border-border pb-8 pt-16 md:pt-24">
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems, locale)} />
      <ViewTracker event={ANALYTICS_EVENTS.expertiseView} slug={slug} />
      <Container className="flex flex-col gap-6">
        <Breadcrumbs items={breadcrumbItems} />
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-h1">
          {title}
        </h1>
        <p className="max-w-2xl text-body-lg text-foreground/80">{intro}</p>
      </Container>
    </Section>
  );
}
