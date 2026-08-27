import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/forms/ContactForm";
import { TrackedLink } from "@/components/analytics/TrackedLink";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("intro"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <ContactPageContent />
    </main>
  );
}

function ContactPageContent() {
  const t = useTranslations("contactPage");
  const tNav = useTranslations("nav");

  return (
    <>
      <Section className="border-b border-border pb-8 pt-16 md:pt-24">
        <Container className="flex flex-col gap-6">
          <Eyebrow>{tNav("contact")}</Eyebrow>
          <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-h1">
            {t("title")}
          </h1>
          <p className="max-w-xl text-body-lg text-foreground/80">
            {t("intro")}
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <ContactDetails />
          <ContactForm />
        </Container>
      </Section>
    </>
  );
}

function ContactDetails() {
  const t = useTranslations("contactPage");
  const whatsappHref = `https://wa.me/${siteConfig.whatsappIntl.replace(/\D/g, "")}`;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-[family-name:var(--font-display)] text-h4">
        {siteConfig.firmName}
      </p>
      <address className="not-italic text-sm text-muted">
        {siteConfig.address.line1}, {siteConfig.address.line2}
        <br />
        {siteConfig.address.city}, {siteConfig.address.country}
      </address>
      <TrackedLink
        href={`tel:${siteConfig.phoneIntl}`}
        event={ANALYTICS_EVENTS.phoneClick}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {siteConfig.phone}
      </TrackedLink>
      <TrackedLink
        href={`mailto:${siteConfig.email}`}
        event={ANALYTICS_EVENTS.emailClick}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {siteConfig.email}
      </TrackedLink>
      {/* Discreet text link, not a large floating green button (SPEC.md Section 19). */}
      <TrackedLink
        href={whatsappHref}
        event={ANALYTICS_EVENTS.whatsappClick}
        target="_blank"
        rel="noreferrer noopener"
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        {t("whatsapp")}
      </TrackedLink>
    </div>
  );
}
