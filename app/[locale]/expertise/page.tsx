import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PracticeList } from "@/components/sections/PracticeList";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "expertisePage" });
  return buildMetadata({
    locale,
    path: "/expertise",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function ExpertiseIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "expertisePage" });
  const tExpertise = await getTranslations({ locale, namespace: "expertise" });

  return (
    <main>
      <Section className="border-b border-border pb-8 pt-16 md:pt-24">
        <Container className="flex flex-col gap-6">
          <Eyebrow>{tExpertise("eyebrow")}</Eyebrow>
          <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-h1">
            {t("title")}
          </h1>
          <p className="max-w-xl text-body-lg text-foreground/80">
            {t("intro")}
          </p>
        </Container>
      </Section>

      {/* Same list component as the homepage preview — one source, no duplication. */}
      <PracticeList showHeader={false} />

      <ContactCTA />
    </main>
  );
}
