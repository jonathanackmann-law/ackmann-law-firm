import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Plain paragraph rendering (split on blank lines) — `Article.body` is a
 * flat string for now since no real article exists to decide the eventual
 * format (MDX vs CMS rich text). Swap this renderer, not the surrounding
 * template, once that's settled — no need for an MDX pipeline today.
 */
export function ArticleBody({ body }: { body: string }) {
  const paragraphs = body.split("\n\n").filter(Boolean);

  return (
    <Section className="border-b border-border">
      <Container>
        <Reveal className="mx-auto flex max-w-[760px] flex-col gap-6">
          {paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-body-lg leading-relaxed text-foreground/90"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
