import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/**
 * SPEC.md Section 13/5.7 — restrained finish, one action, no "Book Now" /
 * "Free Consultation" language. No `border-b`: Footer already has its own
 * `border-t`, avoiding a doubled line between them.
 */
export function ContactCTA() {
  const t = useTranslations("contactCta");

  return (
    <Section>
      <Container>
        <Reveal className="flex flex-col items-start gap-6">
          <p className="max-w-lg text-h3 font-[family-name:var(--font-display)]">
            {t("statement")}
          </p>
          <Button href="/contact">{t("cta")}</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
