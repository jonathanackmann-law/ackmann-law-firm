"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

/**
 * Runtime-error boundary for pages under a locale segment (SPEC.md
 * Section 34). Must be a Client Component per Next.js convention. Renders
 * inside app/[locale]/layout.tsx, so next-intl is still available — unlike
 * app/global-error.tsx, which replaces that layout entirely.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    // Browser-console only — no internal details rendered to the visitor.
    console.error(error);
  }, [error]);

  return (
    <main>
      <Section className="flex min-h-[60vh] items-center">
        <Container className="flex flex-col items-start gap-6">
          <h1 className="font-[family-name:var(--font-display)] text-h1">
            {t("title")}
          </h1>
          <p className="max-w-xl text-body-lg text-foreground/80">
            {t("body")}
          </p>
          <div className="flex gap-4">
            <Button onClick={() => reset()}>{t("retry")}</Button>
            <Button href="/" variant="secondary">
              {t("home")}
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
