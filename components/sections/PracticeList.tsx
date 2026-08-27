import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/motion/Reveal";
import { practiceAreaSlugs } from "@/lib/practice-areas";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground";

/**
 * SPEC.md Section 13/5.4 — editorial list, not icon cards. Rows have no
 * arrow glyph on purpose: a "→" would need to flip for RTL, so hover
 * affordance is an underline instead. Hover color intentionally stays
 * `foreground`, not `accent` — accent only clears ~3.8:1 against the
 * background, under the 4.5:1 AA floor for this text size (Phase 3.1).
 */
export function PracticeList({
  showHeader = true,
}: {
  /** Set to false on `/expertise` itself — that page already has its own
   * H1, so a "View all expertise" link back to the same page would be
   * self-referential. */
  showHeader?: boolean;
}) {
  const t = useTranslations("expertise");

  return (
    <Section className="border-b border-border">
      <Container className="flex flex-col gap-8">
        {showHeader && (
          <div className="flex items-baseline justify-between gap-4">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <TextLink href="/expertise">{t("viewAll")}</TextLink>
          </div>
        )}
        <Reveal>
          <ul className="divide-y divide-border border-t border-border">
            {practiceAreaSlugs.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/expertise/${slug}`}
                  className={`block py-6 text-h4 font-[family-name:var(--font-display)] underline decoration-transparent underline-offset-4 transition-colors hover:decoration-foreground ${focusRing}`}
                >
                  {t(`items.${slug}`)}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
