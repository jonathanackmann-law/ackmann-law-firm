import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { EditorialIntro } from "@/components/sections/EditorialIntro";
import { SignaturePillars } from "@/components/sections/SignaturePillars";
import { PracticeList } from "@/components/sections/PracticeList";
import { FounderSection } from "@/components/sections/FounderSection";
import { InsightsList } from "@/components/sections/InsightsList";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return buildMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("positioning"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <EditorialIntro />
      <SignaturePillars />
      <PracticeList />
      <FounderSection />
      <InsightsList />
      <ContactCTA />
    </main>
  );
}
