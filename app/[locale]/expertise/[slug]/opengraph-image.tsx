import { getTranslations } from "next-intl/server";
import { renderOgImage, ogImageSize, ogImageContentType } from "@/lib/og-image";
import { routing } from "@/lib/i18n/routing";
import { practiceAreaSlugs, isPracticeAreaSlug } from "@/lib/practice-areas";

export const size = ogImageSize;
export const contentType = ogImageContentType;
// Static string only: Next's `alt` export can't read route params directly
// (that needs the heavier `generateImageMetadata` API) — a generic label
// beats no alt text at all.
export const alt = "Ackmann Law Firm — Expertise";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    practiceAreaSlugs.map((slug) => ({ locale, slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "expertise" });
  const title = isPracticeAreaSlug(slug) ? t(`items.${slug}`) : t("eyebrow");
  return renderOgImage({ eyebrow: t("eyebrow"), title });
}
