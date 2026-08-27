import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

export function EditorialIntro() {
  const t = useTranslations("intro");

  return (
    <Section className="border-b border-border py-16 md:py-20">
      <Container>
        <Reveal>
          <p className="max-w-2xl text-h4 leading-relaxed text-foreground/90">
            {t("statement")}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
