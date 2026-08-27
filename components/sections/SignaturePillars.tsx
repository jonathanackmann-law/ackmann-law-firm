import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

const pillarKeys = ["law", "finance", "regulation"] as const;

/**
 * SPEC.md Section 13/5.3 — the brand-defining moment: typography alone, no
 * icons.
 */
export function SignaturePillars() {
  const t = useTranslations("pillars");

  return (
    <Section className="border-b border-border">
      <Container>
        <Reveal className="grid gap-12 md:grid-cols-3 md:gap-8">
          {pillarKeys.map((key) => (
            <div key={key} className="flex flex-col gap-3">
              <h2 className="font-[family-name:var(--font-display)] text-h1 uppercase tracking-tight">
                {t(`${key}.title`)}
              </h2>
              <p className="max-w-xs text-sm text-muted">{t(`${key}.body`)}</p>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
