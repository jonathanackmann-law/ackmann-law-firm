import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ExpertiseHero } from "@/components/sections/ExpertiseHero";
import { routing } from "@/lib/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import {
  practiceAreaSlugs,
  isPracticeAreaSlug,
  type PracticeAreaSlug,
} from "@/lib/practice-areas";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    practiceAreaSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isPracticeAreaSlug(slug)) return {};
  const t = await getTranslations({ locale, namespace: "expertise" });
  const tDetail = await getTranslations({
    locale,
    namespace: "expertiseDetail",
  });
  return buildMetadata({
    locale,
    path: `/expertise/${slug}`,
    title: t(`items.${slug}`),
    description: tDetail(`${slug}.intro`),
  });
}

export default async function ExpertiseDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isPracticeAreaSlug(slug)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <main>
      <ExpertiseDetailContent slug={slug} />
      <ContactCTA />
    </main>
  );
}

function ExpertiseDetailContent({ slug }: { slug: PracticeAreaSlug }) {
  const t = useTranslations("expertise");
  const tDetail = useTranslations("expertiseDetail");

  const title = t(`items.${slug}`);
  const keyMatters = tDetail.raw(`${slug}.keyMatters`) as string[];
  const services = tDetail.raw(`${slug}.services`) as string[];

  return (
    <>
      {/* No "related insights" section: Phase 9's content model doesn't
          exist yet, so there's nothing to show — omitted rather than
          rendering an empty block. */}
      <ExpertiseHero
        slug={slug}
        title={title}
        intro={tDetail(`${slug}.intro`)}
      />

      <Section className="border-b border-border">
        <Container className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-h3">
              {tDetail("keyMattersLabel")}
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {keyMatters.map((item) => (
                <li key={item} className="text-body-lg text-foreground/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-[family-name:var(--font-display)] text-h3">
              {tDetail("servicesLabel")}
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {services.map((item) => (
                <li key={item} className="text-body-lg text-foreground/80">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border">
        <Container>
          <h2 className="font-[family-name:var(--font-display)] text-h3">
            {tDetail("approachLabel")}
          </h2>
          <p className="mt-6 max-w-2xl text-body-lg text-foreground/80">
            {tDetail(`${slug}.approach`)}
          </p>
        </Container>
      </Section>
    </>
  );
}
