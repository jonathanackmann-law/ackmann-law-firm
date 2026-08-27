import { getTranslations } from "next-intl/server";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";
import { routing } from "@/lib/i18n/routing";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Ackmann Law Firm";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return renderOgImage({ eyebrow: "Jerusalem, Israel", title: t("title") });
}
