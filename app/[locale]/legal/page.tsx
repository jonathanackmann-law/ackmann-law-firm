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
  const tPage = await getTranslations({ locale, namespace: "legalPage" });
  return buildMetadata({
    locale,
    path: "/legal",
    title: t("legal"),
    description: tPage("body"),
  });
}

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "footer" });
  const tPage = await getTranslations({ locale, namespace: "legalPage" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <LegalPlaceholder
      title={t("legal")}
      body={tPage("body")}
      contactLabel={tNav("contact")}
    />
  );
}
