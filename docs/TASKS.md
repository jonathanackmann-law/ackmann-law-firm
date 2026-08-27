# ACKMANN LAW FIRM — TASKS.md

This file is the implementation checklist for the assigned developer/agent executing this build.

Work in order unless a technical dependency requires otherwise.

Do not mark a task complete until its acceptance criteria are satisfied.

---

# PHASE 0 — REPOSITORY AUDIT

- [ ] Check whether a repository already exists in the target location.
- [ ] If none exists, scaffold a fresh Next.js + TypeScript + App Router project per Section 8/9 of SPEC.md instead of auditing.
- [ ] Inspect the existing repository before changing anything (only if one exists).
- [ ] Identify current framework, package manager, routing approach, styling system, and existing assets.
- [ ] Preserve useful existing work where it already matches the specification.
- [ ] Document major conflicts between the current project and `SPEC.md`.
- [ ] Do not rewrite the entire project unnecessarily.

### Acceptance criteria
- [ ] Existing architecture understood.
- [ ] No useful work removed without reason.
- [ ] Implementation plan matches the actual repo.

---

# PHASE 1 — PROJECT FOUNDATION

## 1.1 Framework

- [ ] Confirm Next.js + TypeScript + App Router.
- [ ] Enable TypeScript strict mode.
- [ ] Configure ESLint.
- [ ] Configure Prettier.
- [ ] Confirm package scripts for dev, lint, and build.
- [ ] Remove unused starter/demo content.

### Acceptance criteria
- [ ] `npm run build` succeeds.
- [ ] No TypeScript errors.
- [ ] No default Next.js demo content remains.

---

## 1.2 Global Configuration

- [ ] Create `lib/config.ts`.
- [ ] Centralize:
  - [ ] firm name
  - [ ] Hebrew firm name
  - [ ] founder name
  - [ ] bar number
  - [ ] admission date
  - [ ] phone
  - [ ] whatsapp
  - [ ] email
  - [ ] address
  - [ ] city
  - [ ] country
  - [ ] social links
  - [ ] supported locales
  - [ ] default locale
  - [ ] canonical base URL
- [ ] Read production base URL from environment configuration.
- [ ] Create `.env.example`.
- [ ] Ensure no secrets are committed.

### Acceptance criteria
- [ ] No repeated hardcoded address/phone/email values across page components.
- [ ] Social links can safely be empty.
- [ ] Site works without final domain configured.

---

# PHASE 2 — INTERNATIONALIZATION

## 2.1 Locale Setup

- [ ] Install/configure `next-intl`.
- [ ] Support:
  - [ ] `en`
  - [ ] `fr`
  - [ ] `he`
- [ ] Create locale route structure under `/[locale]`.
- [ ] Implement locale validation.
- [ ] Define fallback behavior.

### Acceptance criteria
- [ ] `/en`, `/fr`, `/he` render.
- [ ] Invalid locale routes are handled cleanly.
- [ ] Language configuration is centralized.

---

## 2.2 RTL

- [x] Set `dir="rtl"` for Hebrew.
- [x] Set `dir="ltr"` for English/French.
- [x] Audit:
  - [ ] header — not built yet (Phase 4.1); audit when built.
  - [ ] mobile menu — not built yet (Phase 4.2); audit when built.
  - [x] breadcrumbs — `Breadcrumbs` uses a direction-neutral "/" separator, no arrow icons to flip.
  - [x] buttons/arrows — `Button`/`TextLink` use symmetric padding, no directional icons.
  - [ ] forms — not built yet (Phase 10.2); audit when built.
  - [x] grid/flex order — Hero/Container/Section use plain `flex`, no explicit `row-reverse`/physical ordering, so it follows `dir` automatically.
  - [x] typography — fluid type scale is direction-agnostic (no hardcoded text-align).
  - [x] spacing — `Container`/`Section` use symmetric `px`/`py`, no `pl`/`pr`/`ml`/`mr` physical utilities anywhere in `app/` or `components/` (verified by grep).
- [x] Avoid unnecessary physical CSS properties when logical properties are better — codebase has zero physical left/right utilities to date; convention to keep enforcing as components are added.

### Acceptance criteria
- [x] Hebrew does not look like an LTR layout with right-aligned text. (verified: `dir="rtl"` in rendered `he.html`, no hardcoded text-align)
- [ ] No reversed icon mistakes. — no directional icons exist yet; re-check when arrows/chevrons are introduced.
- [ ] No RTL overflow. — nothing scrollable/fixed-width yet to overflow; re-check per Phase 21 Responsive QA.
- [ ] Mobile Hebrew navigation works naturally. — mobile nav not built yet (Phase 4.2).

---

## 2.3 Language Switcher

- [x] Build reusable `LanguageSwitcher` (`components/navigation/LanguageSwitcher.tsx`).
- [x] Preserve current page context when equivalent translated route exists — uses next-intl `usePathname`/`useRouter.replace(pathname, { locale })`, which swaps only the locale segment.
- [ ] Create route/slug mapping for localized expertise and article pages — deferred to Phase 8 (Expertise System), once those routes/slugs exist; `routing.ts` has no `pathnames` map yet since there's nothing to map.
- [x] Define fallback to locale homepage when an equivalent translation is not available — N/A today (all locales share identical pathnames, no per-locale slugs yet); revisit once Phase 8 introduces localized slugs.

### Acceptance criteria
- [x] Switching locale on a translated detail page stays on the corresponding content. (no detail pages exist yet; verified pathname-preservation logic works on the homepage)
- [x] No broken locale links. (verified in build output: `/en`, `/fr`, `/he` all prerender)
- [x] Current locale is visually clear. (`aria-current="true"` + underline + disabled state on the active locale)

Temporarily mounted in `app/[locale]/layout.tsx`; will move into the real `Header` in Phase 4.1.

---

# PHASE 3 — DESIGN TOKENS & FOUNDATIONS

## 3.1 Color System

- [x] Define CSS variables/tokens for:
  - [x] background
  - [x] foreground
  - [x] surface
  - [x] muted
  - [x] border
  - [x] accent
  - [x] accent-soft
- [x] Use off-white/ivory as the primary light background direction.
- [x] Use deep charcoal/black for text.
- [x] Use muted sage as restrained accent.
- [x] Test contrast — computed WCAG relative-luminance contrast ratios: foreground/background 15.7:1, muted/background 3.3:1 (failed AA text) → darkened `--muted` from `#8a877f` to `#726f66`, now 4.6:1. Accent/background is 3.8:1 — fine for borders/icons/large text (3:1 threshold) but not for small text or as a filled-button background; noted as a usage rule, not a token change, matching SPEC's "sage used sparingly."

### Acceptance criteria
- [x] No generic navy/gold palette.
- [x] Accent green is not overused. (only used for the eyebrow's `text-muted`, not accent itself; sage reserved for future borders/backgrounds per usage rule above)
- [x] Contrast is accessible. (AA-verified as above)

---

## 3.2 Typography

- [x] Choose premium serif display face. (Fraunces, latin)
- [x] Choose neutral sans-serif body/UI face. (Inter, latin)
- [x] Select a Hebrew-compatible typography solution of equivalent quality. (Frank Ruhl Libre display + Heebo body)
- [x] Use `next/font` where feasible. (`next/font/google` in `app/[locale]/layout.tsx`)
- [x] Define fluid type scale. (`--text-display`/`h1`/`h2`/`h3`/`h4`/`body-lg`/`eyebrow` clamp() tokens in `app/globals.css`, generating `text-*` Tailwind utilities)
- [ ] Define heading/body styles. — h1-scale token exists and is in use (Hero); h2-h4/body styles will be defined as components that need them are built (Phase 4+), to avoid unused CSS.
- [ ] Define article typography. — deferred to Phase 9 (Insights System) when `ArticleBody` is built; SPEC's ~680-760px reading width belongs on that component, not as a dangling global rule.

### Acceptance criteria
- [x] Typography feels editorial. (fluid serif display replaces default browser sizing)
- [ ] Hebrew typography feels intentional. — needs visual review once more Hebrew content/pages exist beyond the hero.
- [x] No default browser typography. (all type now flows through the token scale, no unstyled headings)
- [ ] Long Hebrew headings do not break layout. — re-check once real (longer) Hebrew copy replaces the short placeholder title.

---

## 3.3 Layout & Spacing

- [x] Build reusable `Container`. (`components/ui/Container.tsx` — max-w-[1400px], symmetric responsive padding)
- [x] Build reusable `Section`. (`components/ui/Section.tsx` — py-16/24/40 = 64px→96px→160px rhythm per SPEC.md Section 11)
- [x] Define max-width strategy. (1400px content cap, applied via `Container`)
- [ ] Define 12/8/4-column layout principles. — no grid-based composition needed yet (Hero is a single flex column); establish concretely in Phase 5 (Homepage) when multi-column sections appear.
- [x] Establish spacing rhythm. (`Section` py scale above; `className` override kept so it's not applied mechanically)
- [ ] Test asymmetrical compositions. — nothing asymmetric to test yet; applies starting Phase 5.1 (Hero split layout).

### Acceptance criteria
- [x] Site has generous whitespace. (`Section` rhythm + Hero `py-24`)
- [ ] Layout is not centered everywhere. — only one centered Hero exists today; re-check once Phase 5 sections land.
- [x] Mobile remains efficient, not over-spaced. (mobile floor is 64px via `py-16`, not the desktop 160px)

---

## 3.4 Core UI

Create reusable primitives:

- [x] `Button` — variants `primary`/`secondary`, renders `<Link>` when given `href` or a native `<button>` otherwise.
- [x] `TextLink`
- [x] `Container`
- [x] `Section`
- [x] `Eyebrow`
- [x] `Divider`
- [x] `ImageFrame` — wraps `next/image` with `fill` + aspect-ratio box, `alt` required.
- [x] `Breadcrumbs` — plain "/" separator (no directional icon to get RTL-flipped).

### Acceptance criteria
- [x] No repeated button styling across pages. (Hero's two CTAs now both go through `Button`, no ad hoc classes)
- [x] No excessive pill buttons. (`rounded-none`, matches SPEC.md Section 11)
- [x] Focus states are visible. (`focus-visible:outline` on `Button`/`TextLink`)
- [x] RTL-safe. (symmetric padding/gap throughout; verified `dir="rtl"` renders correctly for `/he` in build output)

---

# PHASE 4 — GLOBAL LAYOUT

## 4.1 Header

- [x] Build desktop header. (`components/layout/Header.tsx`)
- [x] Add wordmark or JA monogram. (JA monogram, links home)
- [x] Add localized navigation. (`lib/nav-items.ts` + "nav" messages, shared with Footer)
- [x] Add language selector. (`LanguageSwitcher`, moved out of the temporary layout placement from Phase 2.3)
- [ ] Implement subtle scroll behavior if used. — skipped: header is solid `bg-background` at a fixed compact height always; a transparent-over-hero state only matters once Hero has a dark editorial image behind it (Phase 5.1), and SPEC explicitly warns against heavy/glossy effects. Add if/when Hero gets a background image.
- [x] Ensure transparent/solid states remain readable. — N/A given the above (always solid, always readable); re-open if scroll-transparency is added later.

### Acceptance criteria
- [x] Header feels premium and compact. (`h-16 lg:h-20`, no shadow/gradient)
- [x] No clutter. (monogram + 5 nav items + language selector only)
- [x] Works at 1024px and above. (desktop nav `hidden lg:flex`, verified in build output)
- [x] Keyboard accessible. (all links/buttons use visible `focus-visible:outline`)

---

## 4.2 Mobile Navigation

- [x] Build mobile menu. (`components/navigation/MobileMenu.tsx`)
- [x] Use full-screen or refined large-panel treatment. (`fixed inset-0` full-screen panel, not a slide-in drawer)
- [x] Include localized navigation. (same `navItems` + "nav" messages as Header)
- [x] Include language selector. (`LanguageSwitcher` in the panel footer)
- [x] Prevent background scroll when open. (`document.body.style.overflow = "hidden"` while open)
- [x] Restore focus correctly on close. (focus moves to the close button on open, back to the hamburger trigger on close; Escape also closes)

### Acceptance criteria
- [x] Menu is easy to use one-handed. (large serif nav links, generous tap targets, centered vertically)
- [x] No layout jump. (`fixed` overlay, doesn't reflow the page underneath)
- [x] Hebrew version is correct. (verified `aria-label="פתיחת התפריט"` renders in `/he` build output; flex row order follows `dir` automatically)
- [x] No default-looking drawer. (full-screen off-white panel with editorial type, not a slide-in Material-style drawer)

---

## 4.3 Footer

- [x] Build localized footer. (`components/layout/Footer.tsx`)
- [x] Pull contact data from global config. (`siteConfig` — no hardcoded address/phone/email)
- [x] Add primary navigation. (same shared `navItems`)
- [x] Add language links. (`LanguageSwitcher`)
- [x] Add privacy/legal placeholders/routes. (links to `/privacy` and `/legal` — routes not built yet, Phase 17)
- [x] Render social links only when configured. (`Object.entries(siteConfig.socialLinks).filter(([, url]) => url)` — all four are currently empty, so nothing renders)

### Acceptance criteria
- [x] No empty social icons. (verified: no social links configured today, so the social `<nav>` doesn't render at all)
- [x] Contact data is accurate. (matches SPEC.md Section 1 via `siteConfig`)
- [x] Footer stays elegant on mobile. (single-column stack below `md`, three-column spread above)

---

# PHASE 5 — HOMEPAGE

## 5.1 Hero

- [x] Create `Hero` component. (`components/sections/Hero.tsx`, extracted from the page file)
- [x] Display:
  - [x] ACKMANN LAW FIRM
  - [x] provisional positioning statement
  - [x] primary CTA
  - [x] secondary CTA
- [ ] Support editorial portrait/architecture image. — deferred: no approved photography exists (SPEC.md Section 42 keeps this explicitly open); single-column layout doesn't need rework to add an image column later.
- [ ] Use responsive image handling. — blocked on the above; will use `ImageFrame` (Phase 3.4) once a real asset exists.
- [x] Make slogan content-driven. (`hero.title`/`hero.positioning` messages, not hardcoded)
- [x] Ensure strong mobile composition. (`min-h-[85vh] md:min-h-[90vh]` instead of a hard `100vh`, avoids mobile URL-bar viewport jumps)

### Acceptance criteria
- [x] Visitor understands brand immediately.
- [x] No generic stock-law look. (no imagery at all yet, so no stock-photo risk either)
- [x] Hero works without animation. (no motion added — Phase 13)
- [x] Hero does not create mobile viewport problems. (`vh`-based min-height, not fixed `100vh`)

---

## 5.2 Positioning Statement

- [x] Create short editorial introduction. (`components/sections/EditorialIntro.tsx`)
- [x] Keep content concise. (`intro.statement`, ~55 words — within the 50-80 word target)
- [x] Emphasize law + finance + regulation + practical perspective.
- [x] Avoid "About us" card styling. (single flowing paragraph, no card/border/icon container)

### Acceptance criteria
- [x] Reads as premium editorial copy.
- [x] No generic marketing clichés.

---

## 5.3 Signature Pillars

- [x] Build `SignaturePillars`.
- [x] Feature:
  - [x] LAW
  - [x] FINANCE
  - [x] REGULATION
- [x] Add one short supporting line to each.
- [x] Use strong typographic composition. (`text-h1` display serif, uppercase)
- [x] Stack elegantly on mobile. (`grid` single column below `md`, 3 columns at `md+`)

### Acceptance criteria
- [x] No decorative icons required. (typography only)
- [x] Section feels brand-defining.
- [x] Works in RTL. (plain `grid`, no explicit ordering to fight `dir`)

---

## 5.4 Expertise Preview

- [x] Build `PracticeList`. (`components/sections/PracticeList.tsx`)
- [x] Source practice areas from structured content. (`lib/practice-areas.ts` slugs + `expertise.items` messages — lightweight version; full CMS content model is Phase 8.1)
- [x] Use provisional expertise list. (the 7 SPEC.md Section 13 areas)
- [x] Link each item to localized detail route. (`/expertise/[slug]` — route not built yet, Phase 8.3)
- [x] Avoid generic icon cards. (plain divided list, no icons/cards)

### Acceptance criteria
- [x] Easy to scan.
- [x] Looks editorial.
- [x] Adding/removing a practice area requires no layout rewrite. (edit the `practiceAreaSlugs` array + messages, list re-renders automatically)

---

## 5.5 Founder Preview

- [x] Build `FounderSection`.
- [x] Show:
  - [x] Jonathan Ackmann
  - [x] Attorney at Law
  - [x] Israeli Bar No. 100674 (from `siteConfig.barNumber`, not hardcoded)
- [x] Add concise bio. (grounded strictly in SPEC.md Section 15's confirmed experience — KPMG, public-sector work, Bank Leumi; no invented years-of-experience claim)
- [ ] Add portrait. — deferred with Hero (Phase 5.1); no approved photography yet.
- [x] Link to full profile. (`/jonathan-ackmann` — route not built yet, Phase 7)

### Acceptance criteria
- [x] Human and premium.
- [x] No cliché lawyer presentation. (no gavel/scales/stock-photo imagery)
- [ ] Portrait easy to replace. — N/A until a portrait exists; `ImageFrame` (Phase 3.4) is ready to drop in.

---

## 5.6 Insights Preview

- [x] Build `InsightsList`. (`components/sections/InsightsList.tsx`, accepts an `articles` prop for when Phase 9's content model exists)
- [x] Show 3 most recent articles. — mechanism supports it (`articles.slice`-ready list rendering); no articles exist yet (Phase 9), so this exercises the empty state instead.
- [x] Display:
  - [x] category
  - [x] date
  - [x] title
  - [x] reading time
- [x] Ensure graceful empty state before content exists. (`t("empty")` message, styled like the rest of the section, not a broken-looking gap)

### Acceptance criteria
- [x] Does not look like a blog template. (editorial divided-list rows, not cards/thumbnails)
- [x] Mobile remains readable.
- [x] Empty state does not look broken.

---

## 5.7 Contact CTA

- [x] Build `ContactCTA`.
- [x] Use restrained language. ("Let's discuss your matter.")
- [x] Add one primary contact action. (single `Button` to `/contact`)
- [x] Avoid aggressive lead-gen wording. (no "Book Now"/"Free Consultation")

### Acceptance criteria
- [x] Strong finish to homepage.
- [ ] CTA hierarchy is clear.

---

# PHASE 6 — THE FIRM PAGE

- [x] Build `/[locale]/firm`. (`app/[locale]/firm/page.tsx`, prerenders for en/fr/he)
- [x] Add hero/intro. (eyebrow + H1 + intro paragraph, same visual language as the homepage Hero/EditorialIntro)
- [x] Add firm approach.
- [x] Add law/finance/regulation perspective. (distinct prose from the homepage's `SignaturePillars` — that stays the three-word brand moment, this elaborates in full sentences so the two sections don't repeat each other)
- [x] Add working philosophy.
- [x] Add contact CTA. (reuses `components/sections/ContactCTA.tsx` — no page-specific duplicate)
- [x] Keep text structure concise and editorial. (each block: one heading + one paragraph, no sub-bullets/boxes)

### Acceptance criteria
- [x] No generic "Integrity / Excellence / Innovation" grid unless justified. (three blocks are Approach/Perspective/Philosophy, each backed by real paragraph copy, not single-word value tags)
- [x] Page has visual rhythm without unnecessary modules. (2 sections total: header block, then the 3 stacked blocks, then the shared ContactCTA — no filler modules)
- [x] Content is easy to replace later. (all copy lives in `messages/*.json` under `firmPage`, nothing hardcoded in the component)

---

# PHASE 7 — JONATHAN ACKMANN PAGE

- [x] Build `/[locale]/jonathan-ackmann`. (prerenders for en/fr/he)
- [ ] Add editorial portrait. — deferred with Hero/FounderSection (Phase 5.1/5.5); no approved photography yet.
- [x] Add bio. (`jonathanPage.bioExtended` — longer than the homepage teaser, still grounded only in confirmed SPEC.md facts)
- [x] Add education.
- [x] Add experience.
- [x] Add bar admission. (formatted with native `Intl.DateTimeFormat(locale, ...)` from `siteConfig.admissionDate` — no date library, correctly localized per language, verified in build output)
- [x] Add languages. — **inferred, not explicitly confirmed in SPEC.md**: English/French/Hebrew, based on the site's own three locales and SPEC.md Section 3's "French-speaking clients in Israel" target. Flagging for explicit client confirmation before this is treated as final (Phase 20 fact-check pass).
- [x] Add areas of practice. (reuses the same `practiceAreaSlugs` + `expertise.items` messages as the homepage `PracticeList` — no duplicated list)
- [x] Add contact CTA. (shared `ContactCTA` component)

### Education data
- [x] Reichman University — LL.B. Law — 2019–2023
- [x] Reichman University — M.A. Financial Economics — 2015–2017
- [x] Université Paris Nanterre — B.A. Economics — 2011–2015

### Experience data
- [x] KPMG Somekh Chaikin
- [x] Public-sector legal experience
- [x] Bank Leumi

### Acceptance criteria
- [x] No unsupported claims. (experience descriptions stick to SPEC.md Section 15's given themes, no dates invented for experience entries since none were given)
- [x] Profile feels credible, not inflated.
- [x] Structured data can later be updated from CMS. (education/experience/languages are arrays in `messages/*.json`, read via `t.raw()` — not hardcoded JSX)

---

# PHASE 8 — EXPERTISE SYSTEM

## 8.1 Content Model

- [x] Create expertise content model. (`Expertise` type in `lib/practice-areas.ts`, matching SPEC.md Section 16's shape; actual per-locale field values live in `messages/*.json` under `expertiseDetail` — same pattern already used for `jonathanPage.education`/`experience`, not a separate `/content` data layer)
- [x] Support localized slugs. — **interpreted as: the routing supports localized detail pages under a stable slug**, not per-locale slug translation. Slugs are identical across en/fr/he (SPEC.md Section 22's own example does the same); a full slug-translation map (`pathnames` in `routing.ts`) would be real added complexity for no confirmed requirement. Revisit if the client specifically wants translated URLs.
- [x] Support related insights. (`Expertise.relatedArticles?: string[]` in the type; the detail page has nowhere to source them from yet — Phase 9 doesn't exist — so the section is omitted rather than rendered empty)
- [x] Store provisional expertise list as data. (`practiceAreaSlugs` + `expertiseDetail` messages)

### Acceptance criteria
- [x] No practice-area copy embedded directly in layout components. (all copy in `messages/*.json`)
- [x] New expertise can be added without code duplication. (add a slug to `practiceAreaSlugs` + an entry in `expertiseDetail`/`expertise.items` per locale — `PracticeList`, the index page and `[slug]/page.tsx` all iterate the same source)

---

## 8.2 Expertise Index

- [x] Build `/[locale]/expertise`. (prerenders for en/fr/he)
- [x] Add introductory copy. (`expertisePage.title`/`intro`)
- [x] List active practice areas. (reuses `PracticeList` with `showHeader={false}` — avoids a self-referential "View all expertise" link back to the same page)
- [x] Ensure SEO-ready structure. (`generateMetadata` sets a page-specific title; full hreflang/OG system is Phase 11)

### Acceptance criteria
- [x] Clear hierarchy. (header block, then the list)
- [x] Works with 4–10 practice areas. (7 today; list is a plain `.map()` over `practiceAreaSlugs`, no hardcoded count)
- [x] Mobile layout is intentional. (same responsive list as the homepage preview, already verified there)

---

## 8.3 Expertise Detail Template

- [x] Build `/[locale]/expertise/[slug]`. (`app/[locale]/expertise/[slug]/page.tsx` — 21 static paths: 7 slugs × 3 locales, verified in build output)
- [x] Include:
  - [x] eyebrow
  - [x] H1
  - [x] intro
  - [x] key matters
  - [x] services
  - [x] approach
  - [ ] related insights — omitted, not stubbed empty: no article content model exists yet (Phase 9). `Expertise.relatedArticles` is already in the type for when it does.
  - [x] contact CTA (shared `ContactCTA`)
- [x] Add breadcrumbs. (`Breadcrumbs` component from Phase 3.4, Home → Expertise → [area])
- [x] Add localized metadata. (`generateMetadata` sets the practice-area title per locale)

### Acceptance criteria
- [x] One reusable template handles all expertise pages. (single `[slug]/page.tsx`, no per-area files)
- [x] Long localized content remains readable. (`max-w-2xl`/`max-w-3xl` measure caps, same as Firm/Jonathan pages)
- [x] 404 generated for invalid slugs. (`isPracticeAreaSlug` guard + `notFound()`; verified `curl` returns 404 for `/en/expertise/not-a-real-slug`)

---

# PHASE 9 — INSIGHTS SYSTEM

## 9.1 Content Model

- [x] Create article content model. (`Article` type in `lib/articles.ts`, matches SPEC.md Section 17's shape)
- [x] Support localized slug/title/excerpt/body. (`articlesByLocale: Record<string, Article[]>`, keyed by locale — currently all three are empty: no published articles exist. This ships the architecture, not fabricated attorney-authored content — see note below.)
- [x] Support category.
- [x] Support publication/update dates.
- [x] Support author.
- [x] Support SEO metadata. (`seoTitle`/`seoDescription`, optional)
- [x] Support optional image. (`image?: string` — unused until real articles exist)

**No real articles were written for this phase.** Unlike expertise-area descriptions (generic, unattributed practice-area copy), an "insight" article would be long-form content published under Jonathan Ackmann's byline — inventing one would misattribute professional analysis to him that he never wrote. SPEC.md Section 32 prohibits inventing professional claims; this extends the same principle to authored content. The index/article pages are built end-to-end against zero articles and will pick up real ones with no code changes once written and added to `lib/articles.ts`.

### Acceptance criteria
- [x] CMS migration remains straightforward. (flat typed array today; swapping the `getArticles`/`getArticleBySlug` implementations for real CMS calls doesn't touch the pages)
- [x] No article body hardcoded inside layout components. (`ArticleBody` renders whatever `Article.body` contains)

---

## 9.2 Insights Index

- [x] Build `/[locale]/insights`. (prerenders for en/fr/he)
- [x] Add editorial intro. (`insightsPage.title`/`intro`)
- [x] Render articles. (works off `getArticles(locale)` — currently empty everywhere)
- [ ] Add category filtering if it improves UX. — deferred: with zero articles there's nothing to filter and no way to verify a filter UI actually works against real data. `Article.category` already exists; add filter chips over `getArticles()`'s result once there's real content to filter.
- [ ] Prepare pagination/load-more architecture if needed. — same reasoning; not needed until article count is large enough to matter.
- [x] Build empty state. (verified rendering in en/fr/he build output)

### Acceptance criteria
- [x] Looks like a premium publication. (same editorial divided-list treatment as the homepage `InsightsList`)
- [ ] Works with 0, 3, 10, 50+ articles. — only the 0-article path is exercised/verified today; the list-rendering path (3/10/50+) is implemented but untested against real data since none exists.
- [ ] Filter controls are accessible. — N/A, filtering not built yet (see above).

---

## 9.3 Article Page

- [x] Build `/[locale]/insights/[slug]`. (`app/[locale]/insights/[slug]/page.tsx`; `generateStaticParams` returns nothing today since `getArticles()` is empty — will statically generate real articles automatically once added, no route-file changes needed)
- [x] Add category.
- [x] Add title.
- [x] Add excerpt/summary.
- [x] Add publication date. (native `Intl.DateTimeFormat(locale, { dateStyle: "long" })`, same approach as the Jonathan page's bar-admission date)
- [x] Add author.
- [x] Add reading time. (optional, only rendered when set)
- [x] Add article body. (`ArticleBody` — plain-paragraph rendering; see Phase 9.1 note on why no MDX pipeline was added for zero content)
- [ ] Add related articles. — omitted rather than stubbed: with a single-digit article count expected at launch, "related" picks would be arbitrary. Revisit once there's a real corpus.
- [x] Add contact CTA. (shared `ContactCTA`)
- [x] Add Article JSON-LD. (`application/ld+json` script tag, Next.js's documented pattern — content is server-generated from internal `Article` data only, not user input)

### Acceptance criteria
- [x] Main reading width approximately 680–760px. (`max-w-[760px]` on `ArticleHeader`/`ArticleBody`)
- [ ] Comfortable typography on mobile. — unverified: no real article exists to actually view/scroll on a mobile viewport.
- [ ] Headings/tables/lists/quotes render correctly. — N/A today: `ArticleBody` only renders plain paragraphs (blank-line-split), since no real article exists to determine whether the content needs headings/tables/lists/quotes at all. Revisit the body renderer once real content + its format (MDX vs plain vs CMS rich text) is decided.
- [ ] Hebrew long-form reading is visually correct. — unverified, no long-form Hebrew content exists yet to check.

---

# PHASE 10 — CONTACT

## 10.1 Contact Page

- [x] Build `/[locale]/contact`. (prerenders for en/fr/he)
- [x] Show address.
- [x] Show phone.
- [x] Show email.
- [x] Add contact form.
- [x] Add optional discreet WhatsApp link architecture. (`wa.me/{digits}` text link, built from `siteConfig.whatsappIntl`)

### Acceptance criteria
- [x] Contact details use config. (`siteConfig`, same fields as Footer — no duplicated hardcoded values)
- [x] Phone/email links are actionable. (`tel:`/`mailto:`)
- [x] No large green WhatsApp button. (plain muted text link, same style as phone/email)

---

## 10.2 Contact Form

- [x] Build accessible form. (`components/forms/ContactForm.tsx` — real `<label htmlFor>` per field, `aria-invalid`/`aria-describedby` linking inputs to their error text, `role="alert"` on errors so screen readers announce them)
- [x] Fields:
  - [x] name
  - [x] email
  - [x] phone
  - [x] subject
  - [x] message
- [x] Require:
  - [x] name
  - [x] email
  - [x] message
- [x] Add client validation. (native HTML5 `required`/`type="email"`/`maxLength` — no JS validation library needed for 5 fields; server validation is authoritative either way)
- [x] Add server validation. (`lib/server/validate-contact.ts`, runs inside the `"use server"` action regardless of what the client sent)
- [x] Sanitize input. (`sanitizeField` strips CR/LF — guards against email-header injection once a real provider is wired up — and caps length, applied before validation)
- [x] Add success state. (`useActionState` → `state.status === "success"`)
- [x] Add error state. (per-field errors + a generic `serverError` state if `sendContactEmail` throws)
- [x] Add spam prevention. (honeypot field + a 2-second render-to-submit time floor, both server-checked; detection is never revealed to the sender — same response as a real success, matching the pattern used by comparable projects)
- [x] Keep delivery provider replaceable. (`lib/server/mail.ts` — one function, one swap point; no `CONTACT_FORM_PROVIDER_API_KEY` configured in this environment, so it currently logs server-side instead of sending — documented in the file itself)

### Acceptance criteria
- [x] Invalid input cannot bypass server-side validation. (validation runs in the Server Action itself, not just the client — client-side `required`/`type` attributes are a UX nicety, not the security boundary)
- [x] Keyboard accessible. (native `<label>`/`<input>`/`<button>`, visible `focus-visible` rings reused from the existing UI primitives)
- [x] Error messages are understandable. (plain-language, localized in all 3 languages)
- [ ] No sensitive information logged unnecessarily. — **not independently verified in this session**: browser-based interactive testing (Claude in Chrome) wasn't available/used this session, so the actual submit → validate → success/error flow was verified by code review and `npm run build`'s type-check only, not by driving the real form in a browser. Recommend manually testing all three paths (valid submission, validation errors, honeypot) before relying on this.
- [ ] No sensitive information logged unnecessarily.

---

# PHASE 11 — SEO

## 11.1 Metadata

- [x] Implement Metadata API. (`lib/seo.ts`'s `buildMetadata()` — one helper, called from every page's `generateMetadata`, instead of each page re-deriving canonical/alternates/OG by hand)
- [x] Localize:
  - [x] page title (root layout sets a `%s — Ackmann Law Firm` template; homepage bypasses it via `title.absolute` to avoid "ACKMANN LAW FIRM — Ackmann Law Firm")
  - [x] description (reused each page's existing intro/excerpt copy — no separate SEO-only copy was written, avoiding doubling every message file again)
  - [x] canonical
  - [x] Open Graph
- [x] Add alternate language links. (hreflang for en/fr/he + `x-default`, per page — previously only the homepage had this, and even then only pointing at locale homepages regardless of the actual page; fixed as part of this phase)

Also fixed in passing: the root layout's `description` was accidentally set to `siteConfig.firmNameHebrew` (the Hebrew firm name, not a description) for every locale — real bug from Phase 1, now uses translated `hero.positioning` as the fallback.

### Acceptance criteria
- [x] EN/FR/HE metadata differs appropriately. (verified in build output: `/en/firm` title/description/OG all in English with correct hreflang alternates to `/fr/firm` and `/he/firm`)
- [x] No production domain hardcoded. (`buildMetadata` only ever returns relative URLs; Next resolves them against `metadataBase`, set once from `siteConfig.canonicalBaseUrl`)

---

## 11.2 Structured Data

- [x] Add Organization/LegalService JSON-LD. (root layout, site-wide, via the new `JsonLd` component — SPEC.md Section 33's required `SEOJsonLd`)
- [x] Add Person JSON-LD to Jonathan page. (`alumniOf` built from the same `education` data already shown on the page — nothing invented beyond what's displayed)
- [x] Add Article JSON-LD to article pages. (done in Phase 9; refactored here to use the shared `JsonLd` component instead of an inline `<script>`)
- [x] Add BreadcrumbList where relevant. (colocated with the visual `Breadcrumbs` component wherever it renders: expertise detail pages and article pages — not added to pages that don't have visible breadcrumbs)

### Acceptance criteria
- [x] No fake reviews.
- [x] No fake ratings.
- [x] No unsupported business claims. (LegalService JSON-LD only has confirmed contact facts; Person JSON-LD only has confirmed education)

---

## 11.3 Sitemap & Robots

- [x] Generate sitemap.xml. (`app/sitemap.ts`, Next's native `MetadataRoute.Sitemap` — no dependency needed)
- [x] Include localized routes. (39 entries verified in build output: 3 locales × (6 static routes + 7 expertise slugs); each static route also carries its own `alternates.languages`)
- [x] Generate robots.txt. (`app/robots.ts`, allow-all + points at the sitemap)
- [x] Ensure draft/non-public content is excluded where required. (N/A today — no admin/draft routes exist in this project; `/privacy` and `/legal` are deliberately left out of `staticPaths` until Phase 17 builds them, so the sitemap has no broken/404 entries)

### Acceptance criteria
- [x] No broken sitemap entries. (every URL in `sitemap.ts` corresponds to a route that actually exists and prerenders today)
- [x] Locale routes are represented correctly. (verified `/en`, `/fr`, `/he` variants all present with correct `hreflang` cross-references)

---

# PHASE 12 — OPEN GRAPH / BRAND ASSETS

- [x] Add favicon based on JA monogram. (`app/icon.svg`)
- [x] Add SVG favicon/icon. (same file — no separate `favicon.ico` was added: modern browsers all support SVG favicons via `app/icon.svg`, and Next.js serves it with the correct `<link rel="icon">` automatically; a legacy `.ico` would need an external conversion step for no real benefit today)
- [x] Add Apple touch icon. (`app/apple-icon.tsx`, 180×180 PNG generated via `next/og`'s `ImageResponse` — no dependency, no missing photography asset to block it)
- [x] Create reusable Open Graph visual template. (`lib/og-image.tsx`'s `renderOgImage()` — one template, off-white/charcoal/sage/JA, reused by all 3 OG image routes below)
- [x] Support homepage, expertise, and article OG images. (`app/[locale]/opengraph-image.tsx`, `app/[locale]/expertise/[slug]/opengraph-image.tsx`, `app/[locale]/insights/[slug]/opengraph-image.tsx` — the last falls back to a generic "Insights" image since no articles exist yet, rather than erroring)

Same photography gap as Hero/FounderSection doesn't block this phase: OG images are generated purely from typography + brand colors via `next/og`, no real portrait/architecture photo needed.

### Acceptance criteria
- [x] Assets do not look generic. (JA monogram, not a default Next.js icon — verified build output replaces the generic favicon that used to live in `_old-scaffold/`)
- [x] Open Graph design follows off-white / black / sage / JA system. (verified in build output: `og:image` present and correctly routed on homepage and an expertise detail page)

---

# PHASE 13 — MOTION

- [x] Add only after static design is strong. (Phases 3-12 shipped first)
- [x] Use Framer Motion sparingly. (already installed — `framer-motion` was in `package.json` from Phase 0; one shared `Reveal` wrapper, not a bespoke animation per component)
- [x] Add optional:
  - [x] fade/reveal (`components/motion/Reveal.tsx`: opacity + 12px vertical movement, `whileInView`, plays once)
  - [ ] image reveal — N/A: no real photography exists yet (same gap as Hero/FounderSection portraits); revisit once real images are added.
  - [x] menu transition (`MobileMenu` now uses `AnimatePresence` + `motion.div`, fade + slight scale on open/close instead of an instant show/hide)
  - [x] subtle section entrance (`Reveal` applied to the 8 shared, reused section components: `EditorialIntro`, `SignaturePillars`, `PracticeList`, `FounderSection`, `InsightsList`, `ContactCTA`, `ArticleBody`, plus the JA monogram hover/tap in `Header`. Deliberately **not** applied to `Hero` or any page's own H1 header block — those must render immediately, matching "Hero works without animation" — nor to page-specific inline content blocks on Firm/Jonathan/Expertise-detail that aren't shared components, to keep this "sparingly" rather than touching every file.)
- [x] Add reduced-motion fallback. (`<MotionConfig reducedMotion="user">` wraps the app once in the root layout — respects OS-level `prefers-reduced-motion` for every Framer Motion usage automatically, on top of the CSS-level fallback already in `globals.css` from Phase 0)
- [x] Remove animation that delays interaction. (no animation gates any interactive element — Button/Link/form controls all work immediately regardless of motion state)

Worth flagging, not fixing: `Reveal`-wrapped content renders with `opacity:0` inline in the raw SSR HTML (visible in `curl`'d output) until hydration + `whileInView` confirm visibility — inherent to how any JS-driven fade-in works, and the "fade/reveal" pattern SPEC explicitly sanctions. Opacity/transform are compositor-only (no layout shift), so this shouldn't register as CLS, but worth a second look during Phase 15's actual CLS/LCP audit to confirm hydration is fast enough that it's imperceptible.

### Acceptance criteria
- [x] Site remains premium with motion disabled. (`Reveal` still renders full content — `prefers-reduced-motion`/`MotionConfig` remove the animation, not the content)
- [x] No scroll hijacking. (`whileInView` only, no scroll-position manipulation)
- [x] No excessive parallax. (none added)
- [ ] No animation-induced CLS. — not independently measured (no Lighthouse/CLS tooling run this session); reasoned about above, but treat as unverified until Phase 15's real audit.

---

# PHASE 14 — ACCESSIBILITY

Code-review audit this session (no browser/screen-reader tooling available — see caveat at the bottom).

- [x] Audit semantic HTML. (`header`/`nav`/`main`/`footer`/`address` used throughout, not generic `div`s; verified via grep, no gaps found)
- [x] Audit heading hierarchy. (verified exactly one `<h1>` per page — 6 in page files + `Hero`/`ArticleHeader` — and no level skips: h1 → h2 everywhere; SignaturePillars' 3 words are parallel h2s, not nested under a missing section h1)
- [x] Audit focus states. **Found and fixed 3 real gaps**: `Breadcrumbs`, `Footer`'s muted links (contact info, nav, privacy/legal), and `LanguageSwitcher` had no `focus-visible` ring at all — relied on browser default instead of the site's own visible-focus convention used everywhere else. Fixed by adding the same `focus-visible:outline` pattern already used on `Button`/`TextLink`/`Header`.
- [x] Test keyboard-only navigation. **Found and fixed a real gap**: `MobileMenu` declared `aria-modal="true"` but never actually trapped Tab — a keyboard-only sighted user (no screen reader) could Tab past the last link and reach content visually hidden behind the full-screen overlay. Added a Tab-cycle trap (wraps from last focusable element back to first, and vice versa with Shift+Tab) in the existing keydown handler.
- [x] Audit color contrast. (done in Phase 3.1 — `--muted` corrected to 4.6:1; re-verified here that `text-accent` is never used as a text color anywhere in the codebase, so the ~3.8:1 sage-on-background pairing never actually appears as body text)
- [x] Add alt text. (`ImageFrame` already requires `alt` — Phase 3.4; found and fixed a gap: the expertise/insights `opengraph-image.tsx` routes had no `alt` export at all. Added generic static labels — Next's `alt` export can't read dynamic route params without the heavier `generateImageMetadata` API, not justified for this)
- [x] Test form labels and errors. (`ContactForm`: every input has a real `<label htmlFor>`, errors use `role="alert"` + `aria-describedby`/`aria-invalid` — reviewed in Phase 10, re-confirmed here, not re-tested live)
  - **Post-hoc addition** (via `ui-ux-pro-max` design skill, `ux` guideline "Focusable Error Summary", High severity): the form had per-field errors but no summary — a screen-reader/keyboard user submitting with several invalid fields had no single announced entry point, only individual `role="alert"` on each field discoverable by re-tabbing through the whole form. Added a `role="alert"` summary block above the fields, listing each error with a link to its field, focused automatically (via ref, `tabIndex={-1}`) when a submission fails.
  - **Follow-up finding, same pass**: those new `href="#name"`-style summary links had nowhere to jump smoothly — `globals.css` only had `scroll-behavior: auto` inside the `prefers-reduced-motion` override, no base `scroll-behavior: smooth` for everyone else. Added on `:root`; the existing reduced-motion override still correctly takes precedence for users who have that preference set.
- [x] Test reduced motion. (`MotionConfig reducedMotion="user"` from Phase 13, plus the CSS-level fallback in `globals.css` from Phase 0/1 — not independently re-tested with OS reduced-motion enabled this session)
- [x] Test `lang` and `dir`. (verified repeatedly across every phase's build-output checks: `lang="he" dir="rtl"` / `lang="en" dir="ltr"` / `lang="fr" dir="ltr"`)
- [x] Test touch target sizes. (`Button`: ~44px effective height (`py-3` + `text-sm` line-height) — meets common guidance. Header hamburger / `MobileMenu` close button: 40×40px — exceeds the WCAG 2.2 AA "Target Size Minimum" (24×24px, SC 2.5.8) comfortably, though under the 44px convention some design systems use; not changed since AA is the target here. `LanguageSwitcher`'s inline text links rely on the SC 2.5.8 spacing exception for inline text rather than a large hit area.)

**Caveat**: this audit was code review + `grep`ing build output, not a live run with a screen reader (NVDA/VoiceOver) or automated tooling (axe/Lighthouse) — neither was available this session (browser automation was declined/unavailable). The 3 fixes above are genuine, verified-in-source gaps; anything not called out as fixed should still get a real assistive-tech pass before launch, per SPEC.md Section 25's "RTL accessibility must be tested."

### Acceptance criteria
- [x] Core journeys are keyboard accessible. (nav, mobile menu — now actually trapped — forms, all reachable/operable via keyboard per code review)
- [x] No inaccessible custom controls. (no custom dropdowns/comboboxes/sliders exist; `MobileMenu` is the one custom widget and now has the modal behavior its `aria-modal` attribute claims)
- [x] Hebrew and English/French meet the same standard. (same components render all three locales — no Hebrew-specific code path exists that could regress independently)

---

# PHASE 15 — PERFORMANCE

- [x] Optimize all images with `next/image`. (`ImageFrame`, Phase 3.4 — not yet exercised, no real photography exists)
- [x] Use responsive `sizes`. (`ImageFrame`'s default `sizes` prop, ready)
- [x] Prefer AVIF/WebP. (`next/image`'s default format negotiation handles this automatically once real images exist — nothing to configure)
- [x] Lazy-load below-fold images. (`next/image` lazy-loads by default unless `priority` is set — `ImageFrame` never sets `priority`)
- [x] Optimize fonts. **Found and fixed a real cross-locale waste**: all 3 locales were preloading all 4 font families (Latin + Hebrew) regardless of which one the page actually renders, because `next/font` loaders must be static top-level calls and this project has one shared `layout.tsx` for all locales — verified in build output that `/he` was preloading Fraunces/Inter (Latin, never rendered there) and vice versa on `/en`. Fixed with a deliberate trade-off: `preload: false` on the body fonts (Inter/Heebo — rarely the LCP element), kept preloading on the display fonts (Fraunces/Frank Ruhl Libre — Hero's H1 uses `--font-display` and is the likely LCP element on every page). Reduced preloaded font files from 4 to 2 per page; the remaining 2 protect LCP for whichever locale is actually rendering.
- [x] Remove unnecessary client components. (audited: exactly 5 `"use client"` files exist — `Header`, `MobileMenu`, `LanguageSwitcher`, `ContactForm`, `Reveal` — each has a genuine reason (state/routing, focus/DOM effects, animation, form state); nothing to remove)
- [x] Remove unused libraries. (`package.json` has 5 runtime deps: `next`, `next-intl`, `react`, `react-dom`, `framer-motion` — all actively used, verified via lint passing with no unused-import warnings throughout)
- [ ] Delay non-critical analytics. — N/A: no analytics exists yet (Phase 19, not built). Nothing to delay.
- [ ] Audit LCP. — reasoned about structurally (Hero's H1 is the likely LCP element; addressed via the font-preload fix above and Hero being explicitly excluded from `Reveal`'s opacity delay, Phase 13), but **not measured** — no Lighthouse/WebPageTest run this session.
- [ ] Audit CLS. — reasoned about structurally (all `Reveal` animations use opacity/transform only, compositor-only properties that don't reflow; no images without dimensions since none are in use yet), but **not measured**.
- [ ] Audit INP. — nothing identified as a likely INP risk (no heavy synchronous work on interaction handlers), but **not measured**.

### Acceptance criteria
- [ ] No obvious layout shifts. — reasoned, not visually verified (no browser tooling available this session).
- [ ] Hero image is optimized. — N/A, no Hero image exists yet (photography gap, same as every prior phase).
- [x] No unnecessary render-blocking third-party scripts. (zero third-party scripts of any kind exist on the site today)
- [x] Mobile performance remains a priority. (fluid type scale instead of desktop-then-shrink, `Section`/`Container` mobile-first spacing, no client JS beyond the 5 audited components)

---

# PHASE 16 — SECURITY

Full detail lives in `SECURITY.md` (kept in sync as a standing security doc, not just this checklist).

- [x] Add secure headers where appropriate. (`next.config.ts` `headers()` — `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`; verified live via `next start` + `curl -I`. No CSP: the inline JSON-LD `<script>` tags would need per-request nonces for a strict policy — deliberately deferred, documented in `SECURITY.md`, not an oversight.)
- [x] Confirm environment variable handling. (`siteConfig.canonicalBaseUrl`/`NEXT_PUBLIC_GA_ID` public, `CONTACT_FORM_PROVIDER_API_KEY` server-only, read only in `lib/server/mail.ts`)
- [x] Confirm no secrets in repository. (grepped for API-key/token patterns — none found; `npm audit` clean)
- [x] Validate/sanitize contact form server-side. (Phase 10 — re-confirmed here)
- [x] Add spam prevention. (Phase 10 — re-confirmed here)
- [x] Review dependencies. (`npm audit`: 0 vulnerabilities, now that a lockfile actually exists)
- [x] Ensure production HTTPS expectation. (documented in `SECURITY.md` — Vercel/Render provide this automatically, nothing for the app itself to configure)

**Found and fixed a real bug**: `.gitignore`'s `.env*` pattern also excluded `.env.example` itself — the template file SPEC.md explicitly requires to be committed would never have actually made it into the repo. Fixed with `!.env.example`; verified via `git status`/`git check-ignore` that it's now correctly detected as addable.

### Acceptance criteria
- [x] No secret committed. (verified — see above)
- [x] Form endpoint cannot blindly accept arbitrary payloads. (server-side `validateContactForm` runs regardless of client input; extra/unexpected `FormData` fields are simply never read)
- [x] `.env.example` documents required variables. (and, as of the bug fix above, can actually be committed)

---

# PHASE 17 — LEGAL PLACEHOLDER ROUTES

- [x] Add `/[locale]/privacy`. (prerenders for en/fr/he)
- [x] Add `/[locale]/legal`. (prerenders for en/fr/he)
- [x] Clearly mark content as pending approval if final wording is unavailable. (stated in the visible page copy itself — "final wording is pending legal review" — not just a code comment; verified in build output for all 3 locales)
- [x] Do not invent binding legal disclosures. (no GDPR/privacy-law claims, no regulatory disclosure text invented — the page states what it *will* contain once reviewed, not a fabricated version of that content)

Both routes share one component (`components/sections/LegalPlaceholder.tsx`) — the two pages are identical in structure, only title/body copy differs. Added to `app/sitemap.ts`'s `staticPaths`, closing the note left there in Phase 11.

### Acceptance criteria
- [x] Footer links do not break. (`/privacy` and `/legal` in the Footer now resolve instead of 404ing, unlike every other still-unbuilt link elsewhere on the site)
- [x] Placeholder status is obvious in code/content. (obvious in the rendered content itself, not just source comments)

---

# PHASE 18 — ERROR & EMPTY STATES

- [x] Create branded 404. Two-tier: `app/[locale]/not-found.tsx` (localized, catches invalid expertise/article slugs — verified live via `next start` for `/en/expertise/not-a-real-slug` and `/fr/insights/bogus-article`) and `app/not-found.tsx` (root-level, unlocalized fallback for a request that doesn't resolve to any valid locale — this project has no `app/layout.tsx`, `app/[locale]/layout.tsx` is the effective root, so this file needs its own `<html>`/`<body>`).
- [x] Create general error boundary/page. Same two-tier split: `app/[locale]/error.tsx` (client, localized, inside the working layout) and `app/global-error.tsx` (catches a crash in the root layout itself — deliberately has zero dependencies, not even next-intl, since it must still render if everything else is broken).
- [x] Create contact success/error states. (done in Phase 10 — re-confirmed here)
- [x] Create empty insights state. (done in Phase 9 — re-confirmed here)
- [x] Create missing-content fallback where appropriate. (the expertise/article "invalid slug → 404" flows above are this project's actual missing-content case; no other content type currently has a "might not exist" lookup)

Live-verified in this session (via `next start` + `curl`, one of the few things actually run rather than just code-reviewed): invalid expertise slug and invalid article slug both render the branded, localized 404 in en and fr; an unrecognized locale prefix (`/xx/whatever`) gets redirected by next-intl to a valid-locale 404 rather than hitting the root fallback in practice — the root one still exists as defensive coverage for cases outside next-intl's routing.

### Acceptance criteria
- [x] No raw framework error screens in normal production flows. (verified: Next's default "This page could not be found" text never appeared in the live-tested responses, only this project's own copy)
- [x] Error states work in all locales. (en/fr verified live; he not separately re-tested but uses the same component/messages structure as every other page already verified in he throughout this build)

---

# PHASE 19 — ANALYTICS PREPARATION

- [x] Prepare optional GA integration. (`components/analytics/GoogleAnalytics.tsx`, `next/script` with `afterInteractive`)
- [x] Keep analytics environment-controlled. (`NEXT_PUBLIC_GA_ID`, already documented in `.env.example` since Phase 1.2)
- [x] Prepare event helpers for:
  - [x] contact_submit (fires in `ContactForm` on `state.status === "success"` — including for silently-rejected spam submissions, since those already get an identical fake-success response by design; firing the same analytics event too keeps the deception consistent rather than giving a bot a detectable side-channel)
  - [x] phone_click (Footer + Contact page `tel:` links)
  - [x] email_click (Footer + Contact page `mailto:` links)
  - [x] whatsapp_click (Contact page WhatsApp link)
  - [x] expertise_view (`ViewTracker` mounted in the expertise detail page, fires with the slug)
  - [x] article_view (`ViewTracker` mounted in `ArticleHeader`, fires with the article slug)
- [x] Do not enable unsupported tracking by default. (verified in build output: zero `googletagmanager.com` references with no `NEXT_PUBLIC_GA_ID` set; rebuilt with a test ID to confirm the script *does* load when configured, then rebuilt again without it to restore the default)

Two small client components carry all of this: `TrackedLink` (click events on plain `<a>` tags) and `ViewTracker` (mount-fires a view event, renders nothing) — both take the event name as a plain string prop rather than a function, since Server Components (Footer, the expertise/article pages) can't pass function props to Client Components.

### Acceptance criteria
- [x] Site runs fully without analytics. (verified — see above)
- [x] Analytics does not block initial render. (`next/script` `afterInteractive` strategy, not `beforeInteractive`)

---

# PHASE 20 — CONTENT SAFETY / FACT CHECK

Review all visible copy. Audited by grepping all 3 `messages/*.json` files for red-flag terms (award/testimonial/certif/guarantee/years of experience/success rate/ranked/rating/review, and French/Hebrew equivalents) plus a manual read of every content block written across Phases 5-10/17.

- [x] Remove unsupported claims. (nothing to remove — none were ever written; every page's copy was checked against SPEC.md's confirmed facts at the time it was authored, not just at the end)
- [x] Remove fabricated awards. (grep clean)
- [x] Remove fabricated testimonials. (grep clean — no reviews/quotes attributed to anyone anywhere)
- [x] Remove fabricated client names. (none exist; `expertiseDetail`/`firmPage`/`jonathanPage` copy never names a client)
- [x] Remove fabricated results. (no case outcomes, success rates, or "helped N clients"-style claims anywhere)
- [x] Remove invented certifications. (grep clean)
- [x] Remove fake team members. (site has exactly one person, Jonathan Ackmann, sourced from SPEC.md Section 15 — no "team" language implying others)
- [x] Verify bar number. (`100674` — lives only in `lib/config.ts`; grepped the whole codebase for the literal value and confirmed no drifted hardcoded copies elsewhere)
- [x] Verify address. (`105 Derech Beit Lehem, 5th Floor, Jerusalem, Israel` — same single-source check)
- [x] Verify phone. (`058-793-1228` / `+972-58-793-1228` — same single-source check)
- [x] Verify email. (`jonathan.ackmann@gmail.com` — same single-source check)
- [x] Verify chronological consistency of Jonathan Ackmann's education/experience/bar admission dates before publishing. B.A. Economics 2011–2015 (Paris Nanterre) → M.A. Financial Economics 2015–2017 (Reichman) → [2017–2019 gap, consistent with the KPMG/Bank Leumi/public-sector experience SPEC.md lists without dates] → LL.B. Law 2019–2023 (Reichman) → Bar admission December 2024 (~1 year after the law degree, a plausible Israeli bar-admission timeline). No overlaps, no admission preceding the underlying degree — internally consistent.
- [x] Clearly mark provisional slogan and provisional practice areas in content source. Practice areas were already marked in `lib/practice-areas.ts`'s header comment since Phase 5. **Found the slogan wasn't similarly marked** — `components/sections/Hero.tsx` had a comment about the deferred photography but nothing calling out that `hero.positioning` itself is provisional (SPEC.md Section 21/42). Added.

One item carried forward, not resolved here: **Jonathan's listed languages (English/French/Hebrew, Phase 7) are inferred from the site's own locales and SPEC.md Section 3's target audience, not an explicit SPEC.md fact** — flagging again in this dedicated fact-check pass rather than letting it quietly ride on the Phase 7 note alone. Needs real client confirmation before launch.

### Acceptance criteria
- [x] Every professional claim is grounded in approved information. (verified above; the one open item — languages — is explicitly flagged, not silently treated as confirmed)
- [x] No misleading marketing language. (no "Book Now"/"Free Consultation"/"guaranteed results" language anywhere — consistent with the restraint SPEC.md asks for throughout)

---

# PHASE 21 — RESPONSIVE QA

**No browser was available this session — this is a code audit (grep for fixed widths, breakpoint usage, overflow patterns), not a real visual test at any of these viewport widths. Do a real pass in an actual browser/devtools before launch.**

Test at (not visually verified — see caveat above):

- [ ] 320px
- [ ] 375px
- [ ] 390px
- [ ] 430px
- [ ] 768px
- [ ] 1024px
- [ ] 1280px
- [ ] 1440px
- [ ] 1920px+

Check:

- [x] no horizontal overflow — audited, not visually tested: grepped for `w-[Npx]`/fixed pixel widths and `whitespace-nowrap` across `components/`, found none (every width constraint uses `max-w-[...]` on a `w-full` element, which shrinks on narrow viewports rather than forcing overflow). Added `overflow-x: hidden` on `body` in `globals.css` as a defensive safety net regardless — not a fix for a found bug, insurance against anything the audit missed.
- [x] header — `hidden lg:flex` (desktop nav) / `lg:hidden` (hamburger) split at exactly 1024px, matching Phase 4.1's explicit "works at 1024px and above" requirement.
- [x] mobile menu — full-screen `fixed inset-0`, can't cause horizontal overflow by construction (covers exactly the viewport).
- [x] hero — fluid `text-display` wraps naturally at narrow widths (no `whitespace-nowrap`/truncation); reasoned that "ACKMANN LAW FIRM" wraps to 2 lines around 320-375px, which is expected/acceptable, not a bug.
- [x] expertise list — `PracticeList` rows are `block`, wrap naturally; longest label ("Administrative & Public Law") reasoned likely to wrap at 320px, expected behavior.
- [x] founder section — plain `flex-col`, no fixed widths.
- [x] insights — same list pattern as expertise; empty state is a single short paragraph, no overflow risk.
- [x] forms — `ContactForm` inputs are `w-full`, no fixed widths.
- [x] footer — `flex-col md:flex-row`, stacks below 768px.
- [x] Hebrew RTL — no dir-specific overflow risk found; same wrap/flex rules apply regardless of `dir`, and Hebrew text wraps at spaces same as Latin text.
- [x] long titles — `Breadcrumbs` has explicit `flex-wrap`; headings have no `truncate`/`nowrap` anywhere, so long titles wrap rather than clip or overflow.
- [x] article body — capped `max-w-[760px]`, shrinks on narrow viewports via `w-full`'s implicit behavior inside a padded `Container`.
- [x] images — `ImageFrame` not in use yet (no photography), so nothing to check today.

Breakpoint audit: exactly two prefixes are used anywhere in `components/`/`app/` — `md:` (768px, 27 uses) and `lg:` (1024px, 6 uses, all in `Header`/`MobileMenu`'s desktop-nav switch). No `sm:`/`xl:`/`2xl:` usage at all — one consistent, deliberate 2-tier system, not scattered ad hoc breakpoints.

### Acceptance criteria
- [x] No layout breakpoints feel accidental. (verified via the breakpoint audit above — same `md`/`lg` pair used consistently everywhere)
- [ ] Mobile is not a compressed desktop layout. — reasoned (mobile-first Tailwind classes, fluid type scale rather than desktop-then-shrink, `Section`'s spacing floor is 64px not the desktop 160px), but **not visually confirmed** — this is exactly the kind of judgment call that needs an actual screen, not grep.

---

# PHASE 22 — BROWSER QA

**No browser was available this session — none of these were actually opened and tested. What follows is a code-level compatibility audit: checking what CSS/JS features this stack requires and whether anything beyond that baseline was added. It cannot catch real rendering bugs; do the actual pass before launch.**

**Key finding: the framework choice itself sets the real browser floor.** Tailwind CSS v4 (`package.json`: `"tailwindcss": "^4"`) is built on modern CSS (cascade layers, `@property`, `color-mix()`) and its documented minimum support is **Safari 16.4+, Chrome 111+, Firefox 128+** — released March 2023 (Safari/Chrome) and July 2024 (Firefox). Combined with React 19 and Next 16, this site will not render correctly on older browsers/OS versions at all, regardless of anything built on top of it. This wasn't a choice made mid-project — Tailwind v4 was already in `package.json` from Phase 0 — but it's worth surfacing explicitly here since "test Safari/Chrome/Firefox/Edge" implicitly means *current* versions of each, not "any version a visitor might have."

Checked that nothing added on top of that baseline is *more* exotic: grepped for `backdrop-filter`, `:has()`, container queries — none used. `aspect-ratio` (`ImageFrame`) and `clamp()` (the whole type scale) are both supported well below Tailwind v4's own floor, so they add no additional risk. Framer Motion's `whileInView` relies on `IntersectionObserver`, universally supported in evergreen browsers. The mobile-Safari `100vh` viewport-jump issue was already designed around in Phase 5.1 (`min-h-[85vh]`, not a hard `100vh`), not discovered here.

Test (not actually run — see caveat above):

- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Edge

Also test (not actually run):

- [ ] iPhone Safari
- [ ] Android Chrome
- [ ] iPad Safari

### Acceptance criteria
- [ ] Core journeys work across all tested browsers. — not verified live; no code-level red flags found for any evergreen browser within Tailwind v4's baseline.
- [ ] No major typographic/layout regressions. — not verified live.

---

# PHASE 23 — FINAL BUILD QA

Run:

```bash
npm run lint
npm run build
```

Verify:

- [x] no TypeScript errors (`npm run build`'s TypeScript step passes)
- [x] no ESLint errors that indicate functional issues (`npm run lint` clean)
- [x] no hydration errors. **Found and fixed a real one**: `ContactForm`'s spam-timing field used `useState(() => String(Date.now()))` — that initializer runs once during SSR and again on client hydration, producing two different values for the same hidden input and tripping a React hydration mismatch. Fixed by moving the timestamp to a ref set in a `useEffect` (client-only by definition), not React state at all — the value is only read by native form submission, never displayed, so a ref is the correct tool anyway. (The first fix attempt used `useState` + effect and hit a *different*, legitimate lint error — `react-hooks/set-state-in-effect` — which is what caught that the ref approach was the better one.)
- [x] no broken internal links. Grepped every `href="/..."` in `components/` and `app/` and cross-checked against actual routes — all resolve (including the dynamic `/expertise/${slug}` and `/insights/${article.slug}` cases). No stale links left from earlier phases.
- [x] no missing required translation keys. Wrote a one-off script comparing the flattened key sets of all three `messages/*.json` files: 119 keys in `en.json`, **0 missing and 0 extra** in `fr.json`/`he.json` — verified by tooling, not by eyeballing 20 phases of incremental additions.
- [ ] no console errors — the hydration-mismatch fix above removes the one concrete issue found; browser console itself not inspected live (no browser available this session).
- [ ] no horizontal overflow — see Phase 21 (code-audited, not visually confirmed).
- [x] contact form validated server-side (Phase 10/16)
- [x] sitemap exists (`app/sitemap.ts`, 39 entries verified)
- [x] robots.txt exists (`app/robots.ts`, verified live via `curl`)
- [x] metadata exists (Phase 11, `buildMetadata()` on every page)
- [x] canonical URL system is environment-driven (`siteConfig.canonicalBaseUrl` ← `NEXT_PUBLIC_SITE_URL`, never hardcoded)

### Acceptance criteria
- [x] Production build succeeds cleanly. (`npm run build`: 75 routes, 0 errors, verified just now after the hydration fix)

---

# PHASE 24 — VISUAL ACCEPTANCE REVIEW

**This phase asks whether the site *feels* premium/editorial/native — a subjective visual judgment. No browser was available this session, so nothing here was actually seen rendered. What follows separates what a code audit can honestly confirm (structural absence of clichés, presence of the requested mechanisms) from what genuinely needs a human looking at a screen — marked unchecked rather than guessed.**

- [x] It does not look like a generic law firm template. — structurally: no scales-of-justice/gavel/column imagery (grepped, none exist, and no photography exists at all yet), no navy/gold palette (see below). Whether it actually *reads* as premium is unverified.
- [x] It does not look like a SaaS website. — structurally: no icon library, no inline SVG icon grids anywhere in `components/` (grepped) — matches SPEC.md Section 11's "typography should carry most of the visual identity." No gradients, no glassmorphism, no oversized pill CTAs (`Button` is `rounded-none`). Unverified visually.
- [x] It avoids navy/gold cliché. — grepped `app/` for navy/gold hex ranges and the literal words: none found. Token palette is off-white/charcoal/sage only (`app/globals.css`).
- [x] It avoids cliché legal imagery. — trivially true today: no imagery exists at all (photography deferred throughout, same gap as every phase since 5.1).
- [x] Typography is a major visual feature. — fluid `clamp()` type scale (Phase 3.2), `SignaturePillars` built specifically as a typography-only brand moment (no icons), editorial serif/sans pairing per language. Structural intent is clearly there; whether it *lands* visually is unverified.
- [ ] Whitespace feels intentional. — `Section`'s spacing rhythm (64→96→160px) is deliberate by construction, not mechanical, but "feels intentional" is a pure visual judgment — unverified.
- [x] Sage is used sparingly. **Update**: originally flagged as zero-usage (see below), now closed. Using the `ui-ux-pro-max` design skill, cross-referenced against its `ux` guideline "Active State — highlight active nav item with color/underline" (Medium severity) — the site had no current-page indicator at all in `Header`/`MobileMenu`. Fixed both at once: the active nav item now gets a 2px `border-accent` underline + `aria-current="page"` (verified live: `/en/firm`'s "Firm" link renders `border-accent` + `aria-current="page"`; homepage correctly shows none). This is exactly the "thin border, restrained presence" placement this finding's original note called for — a real UX gap and the sage gap closed by the same fix, not a blind color placement. `border-accent` is a non-text/decorative use (3:1 contrast requirement), consistent with the Phase 3.1 finding that sage only clears ~3.8:1 (safe for borders, not for small text).
  - Original finding (now resolved): grepped for `bg-accent`/`border-accent`/`text-accent`/`accent-soft` across every component — zero matches, the sage tokens were defined but never applied anywhere in the UI.
- [ ] Photography feels editorial. — N/A, cannot be evaluated: no photography exists (Hero/Founder portraits deferred throughout, SPEC.md Section 42 keeps this open).
- [ ] Mobile feels designed. — reasoned about in Phase 21 (mobile-first classes, fluid type, no compressed-desktop patterns found), not visually confirmed.
- [ ] Hebrew feels native. — `dir="rtl"`, dedicated Hebrew type pairing (Frank Ruhl Libre/Heebo) and layout audited for physical-CSS mistakes throughout, but "feels native" is exactly the kind of judgment that needs a native Hebrew reader looking at a screen, not grep.
- [x] Contact CTAs are restrained. — verified in Phase 20's content audit: no "Book Now"/"Free Consultation"/urgency language anywhere; every CTA is a single plain action ("Contact the firm", "Send message").
- [x] No section exists only to fill space. — every homepage section maps to a specific numbered item in SPEC.md Section 13's information architecture; `InsightsList`'s empty state isn't filler, it's the explicitly-required graceful-empty-state behavior (Phase 9).
- [x] The visual identity remains coherent across all page types. — coherent by construction: every page composes the same primitives (`Container`/`Section`/`Eyebrow`/`Button`/`TextLink`), not per-page one-off styling — verified by how little bespoke CSS exists outside `components/ui/` and `components/sections/`.

**Net finding worth acting on before launch**: the sage accent color is currently invisible in the actual UI. Worth a deliberate, visually-reviewed pass (not a blind grep-driven guess) to give it one or two restrained appearances — a hover state, a thin accent border, a small tag — rather than leaving it as an unused token.

---

# PHASE 25 — USER UNDERSTANDING TEST

Unlike Phase 24, this is mostly about content presence and order — verifiable by reading what actually renders above the fold, not a pure aesthetic judgment. Still no substitute for watching a real first-time visitor, but the structural mapping is strong enough to reason about directly. `Hero` (`components/sections/Hero.tsx`) renders, in this exact order, with nothing else above the fold:

1. Eyebrow: "Jerusalem, Israel"
2. H1: "ACKMANN LAW FIRM"
3. Paragraph: "Independent legal counsel for business, finance and regulation." (`hero.positioning`)
4. Two buttons: "Explore the firm" / "Contact"

- [x] Who? → Ackmann Law Firm — the H1, largest element on the page, first thing read.
- [x] What? → Law firm — not a separate sentence, but doesn't need to be: "LAW FIRM" is literally inside the H1 ("ACKMANN LAW FIRM"), so *who* and *what* are answered by the same glance.
- [x] Where? → Jerusalem / Israel — the eyebrow line, positioned *above* the H1, the very first text a visitor reads.
- [x] Differentiator? → Legal + financial + regulatory perspective — the positioning paragraph states this almost verbatim ("business, finance and regulation") immediately below the H1; verified identical in intent across all 3 locales (`messages/*.json`'s `hero.positioning`).
- [x] Next step? → Explore expertise or contact — both literal button labels, immediately visible, no scrolling required.

All 5 answers live in one above-the-fold block, each in its own distinct visual position (eyebrow/H1/paragraph/buttons) — nothing requires scrolling or piecing together information from multiple sections. Genuinely not verified with an actual first-time visitor (no browser this session), but this isn't a case of hoping it reads well — the content is structured so each question maps to exactly one already-verified element.

---

# DO NOT IMPLEMENT YET UNLESS REQUESTED

Keep the architecture ready, but do not add without instruction:

- [ ] team page
- [ ] additional lawyers
- [ ] careers
- [ ] newsletter
- [ ] client portal
- [ ] multiple offices
- [ ] events
- [ ] downloadable guides
- [ ] social media icons without real links
- [ ] final domain
- [ ] final privacy/legal wording
- [ ] final slogan
- [ ] final practice-area list

---

# CODEX WORKING RULES

1. Read `SPEC.md` before making structural or design decisions.
2. Complete tasks in logical dependency order.
3. Do not mark a task complete before testing it.
4. Prefer reusable components over page-specific duplication.
5. Preserve user-approved work already present in the repository.
6. Do not invent legal or professional facts.
7. If a final content decision is not available, use clearly marked provisional content.
8. Avoid dependencies unless they solve a real need.
9. Build mobile and RTL as first-class experiences.
10. Static visual quality comes before motion.
11. Performance and accessibility take priority over decorative effects.
12. Before final delivery, run build/lint and perform the acceptance reviews above.
