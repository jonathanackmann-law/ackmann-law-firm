import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

/**
 * SPEC.md Section 13/5.1 — near one viewport in height, but capped with
 * `min-h` (not a hard 100vh) so mobile URL-bar chrome doesn't create
 * scroll/viewport glitches. Editorial portrait/architecture image is
 * deferred: no approved photography exists yet (SPEC.md Section 42 keeps
 * "final approved photography" explicitly open) — the single-column
 * text-first layout works without it and won't need restructuring once an
 * image is supplied.
 *
 * `hero.positioning` (messages/*.json) is a provisional slogan, not final
 * brand copy — SPEC.md Section 21 explicitly keeps this open and lists it
 * among the Section 42 open decisions. Swap the message value when a final
 * slogan is approved; no component change needed.
 */
export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="flex min-h-[85vh] items-center border-b border-border py-24 md:min-h-[90vh]">
      <Container className="flex flex-col items-start gap-6">
        <Eyebrow>Jerusalem, Israel</Eyebrow>
        <h1 className="font-[family-name:var(--font-display)] text-display">
          {t("title")}
        </h1>
        <p className="max-w-xl text-body-lg text-foreground/80">
          {t("positioning")}
        </p>
        <div className="flex gap-4 pt-4">
          <Button href="/firm" variant="primary">
            {t("ctaPrimary")}
          </Button>
          <Button href="/contact" variant="secondary">
            {t("ctaSecondary")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
