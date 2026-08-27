/**
 * Provisional practice-area list (SPEC.md Section 13, Section 04) — slugs
 * only. Titles/detail copy live in the "expertise"/"expertiseDetail" message
 * namespaces (SPEC.md Section 16's suggested content model, adapted: rather
 * than a separate /content data layer, per-locale fields live directly in
 * messages/*.json since that's already this project's established pattern
 * for localized structured content — see jonathanPage.education/experience).
 *
 * Slugs are identical across locales (no per-locale slug translation): the
 * language switcher already preserves the pathname (Phase 2.3), and
 * SPEC.md Section 22's own example keeps the same slug across languages.
 * Only the content behind the slug is localized.
 */
export const practiceAreaSlugs = [
  "banking-finance",
  "financial-regulation",
  "corporate-commercial",
  "compliance",
  "administrative-public-law",
  "dispute-resolution",
  "private-clients",
] as const;

export type PracticeAreaSlug = (typeof practiceAreaSlugs)[number];

export type Expertise = {
  slug: PracticeAreaSlug;
  title: string;
  intro: string;
  keyMatters: string[];
  services: string[];
  approach: string;
  relatedArticles?: string[];
};

export function isPracticeAreaSlug(slug: string): slug is PracticeAreaSlug {
  return (practiceAreaSlugs as readonly string[]).includes(slug);
}
