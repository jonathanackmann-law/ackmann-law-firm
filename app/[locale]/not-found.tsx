import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * Catches `notFound()` calls inside a valid locale segment (invalid
 * expertise/article slug, etc.) — SPEC.md Section 34. The locale is still
 * known here (the URL prefix was valid), so this can be fully localized,
 * unlike the root `app/not-found.tsx`.
 */
export default async function NotFound() {
  const t = await getTranslations("notFoundPage");

  return (
    <main>
      <Section className="flex min-h-[60vh] items-center">
        <Container className="flex flex-col items-start gap-6">
          <Eyebrow>404</Eyebrow>
          <h1 className="font-[family-name:var(--font-display)] text-h1">
            {t("title")}
          </h1>
          <p className="max-w-xl text-body-lg text-foreground/80">
            {t("body")}
          </p>
          <Button href="/">{t("cta")}</Button>
        </Container>
      </Section>
    </main>
  );
}
