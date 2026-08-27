import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/TextLink";

/**
 * SPEC.md Section 20/32/17: privacy/legal routes "may be present without
 * final approved text" but must never invent binding legal disclosures.
 * The placeholder status is stated plainly in the visible copy itself
 * (`body`), not just in a code comment — a visitor reading the page sees
 * it's pending review, not a real policy.
 */
export function LegalPlaceholder({
  title,
  body,
  contactLabel,
}: {
  title: string;
  body: string;
  contactLabel: string;
}) {
  return (
    <main>
      <Section className="pb-16 pt-16 md:pt-24">
        <Container className="flex flex-col gap-6">
          <h1 className="max-w-2xl font-[family-name:var(--font-display)] text-h1">
            {title}
          </h1>
          <p className="max-w-xl text-body-lg text-foreground/80">{body}</p>
          <TextLink href="/contact">{contactLabel}</TextLink>
        </Container>
      </Section>
    </main>
  );
}
