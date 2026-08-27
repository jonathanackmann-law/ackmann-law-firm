import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "firmPage" });
  return buildMetadata({
    locale,
    path: "/firm",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function FirmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <FirmContent />
      <ContactCTA />
    </main>
  );
}

const blocks = [
  { titleKey: "approachTitle", bodyKey: "approachBody" },
  { titleKey: "perspectiveTitle", bodyKey: "perspectiveBody" },
  { titleKey: "philosophyTitle", bodyKey: "philosophyBody" },
] as const;

function FirmContent() {
  const t = useTranslations("firmPage");

  return (
    <>
      <Section className="border-b border-border pb-8 pt-16 md:pt-24">
        <Container className="flex flex-col gap-6">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-h1">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-body-lg text-foreground/80">
            {t("intro")}
          </p>
        </Container>
      </Section>

      <Section className="border-b border-border">
        <Container className="flex flex-col gap-12 md:gap-16">
          {blocks.map(({ titleKey, bodyKey }) => (
            <div key={titleKey} className="max-w-2xl">
              <h2 className="font-[family-name:var(--font-display)] text-h3">
                {t(titleKey)}
              </h2>
              <p className="mt-4 text-body-lg text-foreground/80">
                {t(bodyKey)}
              </p>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
