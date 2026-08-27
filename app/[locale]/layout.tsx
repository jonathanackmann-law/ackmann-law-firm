import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MotionConfig } from "framer-motion";
import { Fraunces, Inter, Frank_Ruhl_Libre, Heebo } from "next/font/google";
import { routing } from "@/lib/i18n/routing";
import { isRtl, siteConfig } from "@/lib/config";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "../globals.css";

// next/font requires font loaders to be static top-level calls, so all 4
// run unconditionally in this one shared layout even though a given page
// only ever applies 2 of them (Latin OR Hebrew) via `fontVars` below.
// next/font's automatic `<link rel=preload>` isn't aware of that runtime
// split — verified in build output that /he was preloading Fraunces/Inter
// (never rendered there) and vice versa on /en.
//
// Trade-off: body fonts (Inter/Heebo) get `preload: false` — that waste
// isn't worth paying for text that's rarely the LCP element. Display fonts
// (Fraunces/Frank Ruhl Libre) keep preloading — Hero's H1 (the likely LCP
// element on every page, SPEC.md Section 27) uses `--font-display`, so
// eating 1 wasted cross-locale preload there protects LCP on the locale
// that's actually rendering. `font-display: swap` (next/font's default)
// prevents invisible-text blocking either way.

// Latin: editorial serif display + neutral sans body (SPEC.md Section 5).
const displayLatin = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const bodyLatin = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  preload: false,
});

// Hebrew: equivalent-quality pairing, deliberately chosen (SPEC.md Section 5/7).
const displayHebrew = Frank_Ruhl_Libre({
  variable: "--font-display",
  subsets: ["hebrew"],
  weight: ["400", "500", "700"],
});
const bodyHebrew = Heebo({
  variable: "--font-body",
  subsets: ["hebrew"],
  preload: false,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Fallback description only — every real page overrides this via
  // lib/seo.ts's buildMetadata(), using its own localized copy.
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    metadataBase: new URL(siteConfig.canonicalBaseUrl),
    title: {
      default: siteConfig.firmName,
      template: `%s — ${siteConfig.firmName}`,
    },
    description: t("positioning"),
    other: { "current-locale": locale },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this request (next-intl requirement).
  setRequestLocale(locale);

  const dir = isRtl(locale) ? "rtl" : "ltr";
  const fontVars =
    locale === "he"
      ? `${displayHebrew.variable} ${bodyHebrew.variable}`
      : `${displayLatin.variable} ${bodyLatin.variable}`;

  return (
    <html lang={locale} dir={dir} className={`${fontVars} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* Site-wide LegalService JSON-LD (SPEC.md Section 26) — only
            confirmed contact facts, no ratings/reviews/awards. */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LegalService",
            name: siteConfig.firmName,
            url: siteConfig.canonicalBaseUrl,
            telephone: siteConfig.phoneIntl,
            email: siteConfig.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
              addressLocality: siteConfig.address.city,
              addressCountry: siteConfig.address.country,
            },
            founder: {
              "@type": "Person",
              name: siteConfig.founderName,
            },
          }}
        />
        <NextIntlClientProvider>
          {/* SPEC.md Section 23: respect prefers-reduced-motion globally
              instead of every Reveal/motion usage checking it individually. */}
          <MotionConfig reducedMotion="user">
            <Header />
            {children}
            <Footer />
          </MotionConfig>
        </NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
