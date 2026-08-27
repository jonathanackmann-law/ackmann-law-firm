import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalPlaceholder } from "@/components/sections/LegalPlaceholder";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "footer" });
  const tPage = await getTranslations({ locale, namespace: "privacyPage" });
  return buildMetadata({
    locale,
    path: "/privacy",
    title: t("privacy"),
    description: tPage("body"),
  });
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "footer" });
  const tPage = await getTranslations({ locale, namespace: "privacyPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <LegalPlaceholder
      title={t("privacy")}
      body={tPage("body")}
      contactLabel={tNav("contact")}
    />
  );
}
