import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/config";

/**
 * SPEC.md Section 13/5.5. Portrait is deferred with Hero (no approved
 * photography yet — see components/sections/Hero.tsx). Bio text is
 * grounded strictly in SPEC.md Section 15's confirmed experience (KPMG,
 * public-sector work, Bank Leumi) — no invented years-of-experience claim.
 */
export function FounderSection() {
  const t = useTranslations("founder");

  return (
    <Section className="border-b border-border">
      <Container>
        <Reveal className="flex flex-col items-start gap-6">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="font-[family-name:var(--font-display)] text-h2">
            {siteConfig.founderName}
          </h2>
          <p className="text-sm text-muted">
            {t("title")} — {t("bar", { number: siteConfig.barNumber })}
          </p>
          <p className="max-w-xl text-body-lg text-foreground/80">{t("bio")}</p>
          <TextLink href="/jonathan-ackmann">{t("cta")}</TextLink>
        </Reveal>
      </Container>
    </Section>
  );
}
