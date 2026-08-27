# ACKMANN LAW FIRM — SPEC.md

## 0. Purpose

Build a premium multilingual website for **Ackmann Law Firm**, based in Jerusalem, Israel.

This document is the product, design, UX, content, and technical source of truth for the first implementation.

The website must feel:

- premium
- editorial
- restrained
- contemporary
- precise
- international
- legally credible
- human, but not casual

The website must **not** feel like a generic lawyer template, SaaS landing page, or aggressive lead-generation funnel.

---

## 1. Core Brand

### Primary name
**ACKMANN LAW FIRM**

### Hebrew name
**משרד עורכי דין אקמן**

### Founder
**Jonathan Ackmann**

### Professional information
- Israeli Bar No. 100674
- Admitted to the Israeli Bar: December 2024
- Based in Jerusalem, Israel

### Contact information
- Address: 105 Derech Beit Lehem, 5th Floor, Jerusalem, Israel
- Phone: 058-793-1228
- Email: jonathan.ackmann@gmail.com

All business information must be centralized in a global configuration file and never duplicated throughout the codebase.

The current email must remain easy to replace later with a domain-based email.

---

## 2. Strategic Positioning

The firm's primary differentiating narrative is the intersection of:

**LAW  
FINANCE  
REGULATION**

This should not artificially limit the practice, but it should influence the site's voice, visual identity, content hierarchy, and homepage narrative.

The website should communicate competence in legal matters with a practical understanding of:

- finance
- banking
- regulation
- business
- compliance
- administrative/public-sector matters
- cross-border and international client environments

Do not present the firm as a mass-market generalist.

---

## 3. Target Audience

The website must remain broad enough to serve:

- companies
- entrepreneurs
- executives
- investors
- regulated businesses
- private clients
- international clients
- French-speaking clients in Israel
- professionals in banking/finance
- individuals facing regulatory or administrative matters

The copy should feel premium and selective without claiming exclusivity.

---

## 4. Creative Direction

### Desired atmosphere

The visual language should sit somewhere between:

- a boutique international law firm
- a private bank
- a strategy consultancy
- a premium editorial publication
- an architecture studio

### Avoid completely

Do not use:

- scales of justice
- gavels
- Greek columns
- law books as a main motif
- generic handshake photography
- generic skyscraper stock imagery
- navy blue + gold as a dominant palette
- heavy gradients
- glossy corporate effects
- glassmorphism as a style system
- excessive rounded cards
- generic SaaS icon grids
- oversized “BOOK NOW” CTAs
- aggressive popups
- autoplay carousels
- template-looking sections
- fake testimonials
- fabricated awards or rankings

---

## 5. Brand System

### Monogram
Use **JA** as a secondary brand asset.

Possible uses:

- favicon
- mobile header
- subtle watermark
- footer
- social/Open Graph artwork
- selected transitions

Do not overuse it.

### Color direction

Primary visual system:

- off-white / ivory
- deep charcoal
- black
- sage green
- stone grey
- warm neutral

Suggested CSS token names:

```css
--background
--foreground
--surface
--muted
--border
--accent
--accent-soft
```

The sage green must be muted, elegant, and used sparingly.

Avoid pure white as the only background tone.

### Typography

Use at most two primary type families.

Preferred combination:

- Editorial serif for display/headings
- Neutral premium sans-serif for body/UI

Hebrew typography must be selected deliberately and should feel equally refined.

Use `next/font` when possible.

Typography is a core visual feature, not just a utility.

---

## 6. Image Direction

Use a deliberate mix of:

1. **Portrait photography**
   - Jonathan Ackmann
   - editorial framing
   - natural light
   - modern architectural context
   - no crossed-arm cliché
   - no fake meeting poses

2. **Jerusalem architecture**
   - stone
   - shadows
   - modern lines
   - textures
   - architectural detail
   - restrained use of the city

The site must not feel like a tourism website.

Photography should support the brand, not dominate it.

---

## 7. Languages & Directionality

Required languages:

- English
- French
- Hebrew

Recommended locale routes:

```text
/en
/fr
/he
```

Hebrew must be fully RTL.

RTL must affect:

- text alignment
- flex/grid direction where appropriate
- menu alignment
- spacing logic
- arrows
- breadcrumbs
- form layout
- content flow
- transitions where direction matters

Do not treat Hebrew as translated text inside an LTR shell.

The design quality of the Hebrew site must match the English and French versions.

---

## 8. Recommended Tech Stack

Preferred stack:

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- next-intl
- Framer Motion
- MDX or a simple CMS abstraction

Preferred deployment:

- Vercel

Keep JavaScript low.

Favor server components by default.

Use client components only when interaction requires them.

Do not add dependencies without a clear need.

---

## 9. Suggested Project Structure

```text
/app
  /[locale]
    /page.tsx
    /firm
    /expertise
    /expertise/[slug]
    /jonathan-ackmann
    /insights
    /insights/[slug]
    /contact
    /privacy
    /legal

/components
  /layout
  /navigation
  /sections
  /forms
  /ui
  /seo

/content
  /en
  /fr
  /he

/lib
  config.ts
  locales.ts
  navigation.ts
  seo.ts
  routes.ts

/public
  /images
  /logos
  /icons
```

---

## 10. Global Configuration

Create a single source of truth for:

```ts
firmName
firmNameHebrew
founderName
barNumber
admissionDate
phone
whatsapp
email
address
city
country
socialLinks
defaultLocale
supportedLocales
canonicalBaseUrl
```

Rules:

- no hardcoded repeated contact data
- social links can be empty
- canonical domain must be environment-driven until the final domain is selected
- do not render social icons when no value exists

---

## 11. Design System Rules

### Grid

Desktop:
- 12 columns

Tablet:
- 8 columns

Mobile:
- 4 columns

Use asymmetric editorial layouts where useful.

Do not center every section.

### Spacing

General direction:

- generous whitespace
- strong section rhythm
- fewer elements per viewport

Approximate section spacing:

- Desktop: 96–160px
- Mobile: 64–96px

Do not apply spacing mechanically. Adjust based on visual hierarchy.

### Buttons

Primary:
- filled, restrained, minimal

Secondary:
- outline or text-link style

Avoid:
- oversized pills
- playful shapes
- excessive shadows

### Icons

Use only when they improve comprehension.

Do not assign a decorative icon to every practice area.

Typography should carry most of the visual identity.

---

## 12. Header

Desktop header should contain:

- wordmark or monogram
- Firm
- Expertise
- Jonathan Ackmann
- Insights
- Contact
- language selector

Possible behavior:
- transparent over hero if legibility allows
- becomes solid after scroll
- compact height

Mobile:
- logo/monogram
- menu button
- full-screen or large-panel navigation

The mobile menu must feel designed, not default.

---

## 13. Homepage Information Architecture

Build the homepage in this conceptual order.

### Section 01 — Hero

Primary goals:
- identify the firm
- establish premium tone
- state a clear positioning
- offer one or two next actions

Core brand text:

**ACKMANN  
LAW FIRM**

Provisional positioning line:

> Independent legal counsel for business, finance and regulation.

Primary CTA:
- Explore the firm

Secondary CTA:
- Contact

Visual direction:
- portrait + architecture, or one strong editorial image
- avoid generic full-screen stock photography

Desktop can use an asymmetric split layout.

The hero should feel near one viewport in height, but not at the expense of mobile usability.

### Section 02 — Positioning Statement

Short editorial statement.

Target length:
- 50–80 words

Theme:
- legal analysis
- financial understanding
- regulatory perspective
- strategic practicality

No “About Us” card.

### Section 03 — Signature Brand Section

Use:

**LAW  
FINANCE  
REGULATION**

as a strong typographic feature.

Each term gets one concise supporting sentence.

No icons required.

This section should be one of the most recognizable visual moments of the site.

### Section 04 — Expertise

Display 4–7 primary practice areas.

Provisional set:

- Banking & Finance
- Financial Regulation
- Corporate & Commercial
- Compliance
- Administrative & Public Law
- Dispute Resolution
- Private Clients

These are placeholders and must be stored in structured content.

Do not treat them as final legal claims until approved.

Use an editorial list or refined grid.

Avoid generic cards.

### Section 05 — Founder

Show:

**Jonathan Ackmann**  
Attorney at Law  
Israeli Bar No. 100674

Include:
- portrait
- concise biography
- “View profile” CTA

### Section 06 — Insights

Show 3 latest publications.

Each item should include:
- category
- date
- title
- reading time

Prefer editorial article rows/cards, not SaaS cards.

### Section 07 — Contact CTA

Simple final statement.

Provisional text:

> Let’s discuss your matter.

CTA:
- Contact the firm

Avoid:
- Book Now
- Free Consultation
- Limited Offer
- sales-like language

---

## 14. The Firm Page

Route:

```text
/[locale]/firm
```

Recommended sections:

- intro
- approach
- law / finance / regulation perspective
- working philosophy
- selected values expressed through real copy
- contact CTA

Avoid generic values cards such as:

- Excellence
- Integrity
- Innovation

unless supported by meaningful text.

---

## 15. Jonathan Ackmann Page

Route:

```text
/[locale]/jonathan-ackmann
```

Sections:

- portrait
- short biography
- experience
- education
- bar admission
- languages
- practice areas
- contact CTA

### Education

**Reichman University**
- LL.B. Law
- 2019–2023

**Reichman University**
- M.A. Financial Economics
- 2015–2017

**Université Paris Nanterre**
- B.A. Economics
- 2011–2015

### Experience

#### KPMG Somekh Chaikin
Relevant themes include:
- financial regulation
- credit data
- public complaints
- financial institutions
- systemic issues
- compliance
- Bank of Israel Credit Data environment

Do not make unsupported claims beyond confirmed experience.

#### Public-sector legal experience
Relevant work includes:
- public procurement
- tenders
- contracts
- legal opinions
- public financing
- administrative matters

#### Bank Leumi
Relevant exposure:
- banking
- international clients
- AML
- CRS
- FATCA

---

## 16. Expertise System

### Expertise Index

Route:

```text
/[locale]/expertise
```

Purpose:
- explain the firm's capabilities
- list all active practice areas
- create a clear path into expertise detail pages

### Expertise Detail Route

```text
/[locale]/expertise/[slug]
```

Reusable page template:

- eyebrow
- H1
- intro
- key matters
- services
- approach
- related insights
- contact CTA

Do not hardcode a unique page layout per expertise.

### Suggested content model

```ts
type Expertise = {
  slug: string
  locale: string
  title: string
  shortTitle?: string
  intro: string
  description?: string
  services: string[]
  keyMatters?: string[]
  relatedArticles?: string[]
  seoTitle?: string
  seoDescription?: string
}
```

---

## 17. Insights System

### Index Route

```text
/[locale]/insights
```

Potential categories:

- Legal Updates
- Banking
- Finance
- Regulatory
- Compliance
- Business
- Case Analysis
- Guides

Support:
- category filtering if useful
- pagination or load-more architecture
- multilingual articles

### Article Route

```text
/[locale]/insights/[slug]
```

Article layout:

- category
- title
- summary
- publication date
- author
- reading time
- body
- related articles
- contact CTA

Main article text width:
- approximately 680–760px

Prioritize long-form readability.

### Suggested content model

```ts
type Article = {
  slug: string
  locale: string
  title: string
  excerpt: string
  category: string
  publishedAt: string
  updatedAt?: string
  author: string
  readingTime?: number
  body: unknown
  seoTitle?: string
  seoDescription?: string
  image?: string
}
```

---

## 18. Contact Page

Route:

```text
/[locale]/contact
```

Display:

**ACKMANN LAW FIRM**  
105 Derech Beit Lehem  
5th Floor  
Jerusalem, Israel

058-793-1228

jonathan.ackmann@gmail.com

### Contact form

Fields:

- Name
- Email
- Phone
- Subject
- Message

Required by default:
- Name
- Email
- Message

Requirements:
- accessible labels
- inline validation
- success state
- error state
- server-side validation
- spam protection
- sanitized input
- no unnecessary storage of sensitive data

The email delivery provider must remain replaceable.

---

## 19. WhatsApp

Prepare support for WhatsApp contact.

WhatsApp number is stored separately as `whatsapp` in global config (Section 10). Until confirmed otherwise, treat it as the same number as `phone` (058-793-1228).

If displayed:
- use a subtle link or icon + label
- respect the brand palette
- do not use a large floating green button

---

## 20. Footer

Include:

- ACKMANN LAW FIRM
- Jerusalem, Israel
- address
- phone
- email
- Firm
- Expertise
- Insights
- Contact
- EN / FR / HE
- Privacy
- Legal Notice
- copyright

Privacy and legal routes may be present without final approved text.

Do not invent legal disclosures.

---

## 21. Slogan Handling

No slogan is final.

The hero slogan must be content/config-driven.

Possible tests:

- Law. Finance. Regulation.
- Legal precision. Strategic perspective.
- Law. Finance. Strategy.
- Business understanding. Legal expertise.

Do not hardcode any of these as final brand copy.

---

## 22. Language Switching

The language switcher should preserve page context when a translated route exists.

Example:

```text
/en/expertise/banking-finance
```

should switch to the equivalent French/Hebrew expertise page rather than always returning to the locale homepage.

Build a translation-aware route mapping.

Navigation labels must be localized from config/content, not duplicated manually.

---

## 23. Motion

Use Framer Motion sparingly.

Allowed:
- fade
- reveal
- subtle vertical movement
- image reveal
- menu transition
- restrained page transition
- JA monogram micro-animation

Avoid:
- scroll hijacking
- excessive parallax
- bouncing
- cursor gimmicks
- long animations
- animation that delays content

Typical duration:
- 0.3–0.8s

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

## 24. Responsive Design

Design intentionally for:

- 320px+
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px+

Do not merely scale the desktop design.

Mobile layouts must be consciously redesigned.

No horizontal overflow.

---

## 25. Accessibility

Target WCAG AA principles.

Requirements:

- semantic HTML
- logical heading hierarchy
- keyboard navigation
- visible focus states
- accessible forms
- alt text
- strong contrast
- reduced motion support
- correct `lang`
- correct `dir`
- touch target sizing

RTL accessibility must be tested.

---

## 26. SEO

Use Next.js Metadata API.

Every page must support:

- title
- description
- canonical
- Open Graph
- locale
- alternate locales
- indexability rules

### Multilingual SEO

Implement `hreflang` for:

- en
- fr
- he

Each localized page must have localized metadata.

Do not duplicate English metadata into other languages.

### Structured Data

Use JSON-LD where appropriate:

- LegalService
- Organization
- Person
- Article
- BreadcrumbList

Never fabricate:
- ratings
- review counts
- awards
- client names

### Local SEO

Architecture should support future content around terms such as:

- Jerusalem law firm
- lawyer Jerusalem
- Israeli lawyer
- French speaking lawyer Israel
- avocat Israël
- avocat Jérusalem
- עורך דין ירושלים

Do not keyword-stuff the homepage.

---

## 27. Performance

Prioritize:

- LCP
- CLS
- INP

Requirements:

- responsive images
- AVIF/WebP where appropriate
- `next/image`
- lazy-loading below fold
- font optimization
- no unnecessary third-party scripts
- limited client components
- optimized SVG
- code splitting
- lean animation
- no blocking analytics

Visual sophistication must not create a slow website.

---

## 28. CMS / Content Abstraction

Even if V1 uses local content, create a CMS-friendly architecture.

Core content types:

- Expertise
- Article
- Person
- Global Settings
- Navigation

The code should allow later migration to:

- Sanity
- Payload
- Contentful
- Strapi
- equivalent

Do not scatter long copy directly across React components.

---

## 29. SEO / Social Images

Prepare branded Open Graph images for:

- homepage
- expertise pages
- articles

Visual system:
- off-white
- black
- sage
- JA monogram

---

## 30. Security

Required:

- HTTPS
- secure headers
- environment variables
- `.env.example`
- no secrets committed
- server-side form validation
- input sanitization
- spam prevention
- dependency hygiene

---

## 31. Analytics

Prepare optional integration for:

- Google Analytics
- Google Search Console

Potential tracked events:

```text
contact_submit
phone_click
email_click
whatsapp_click
expertise_view
article_view
```

Do not block rendering with analytics.

---

## 32. Legal & Ethical Content Rules

Do not invent:

- case outcomes
- client names
- rankings
- awards
- testimonials
- years of experience
- specialist certifications
- team members
- partnership claims
- guarantees of success

Use only approved and confirmed facts.

Where final copy is not approved:
- use realistic provisional copy
- mark it clearly
- avoid Lorem Ipsum

Example:

```ts
// TODO: replace with approved final copy
```

---

## 33. Required Core Components

At minimum:

```text
Header
MobileMenu
LanguageSwitcher
Footer
Container
Section
Button
TextLink
Hero
EditorialIntro
SignaturePillars
PracticeList
FounderSection
InsightsList
ContactCTA
ContactForm
Breadcrumbs
Eyebrow
Divider
ImageFrame
ArticleHeader
ArticleBody
ExpertiseHero
SEOJsonLd
```

Avoid giant page components.

Prefer reusable composition.

---

## 34. Required Error States

Create:

- 404 page
- general error page
- contact form error state
- contact form success state
- empty insights state

All must match the brand.

Avoid default framework-looking errors in production.

---

## 35. Favicon / Assets

Prepare:

- favicon.ico
- SVG icon
- Apple touch icon

Use the JA monogram as the primary favicon direction.

Logo and monogram assets should be SVG where possible.

---

## 36. Testing Matrix

Manually test at minimum:

Browsers:
- Chrome
- Safari
- Firefox
- Edge

Devices / sizes:
- iPhone
- Android
- iPad
- laptop
- large desktop

Functional:
- EN/FR/HE
- RTL
- language switching
- navigation
- mobile menu
- contact form
- keyboard navigation
- focus states
- internal links
- metadata
- 404
- long titles
- long Hebrew text
- images
- no overflow

---

## 37. Code Quality

Requirements:

- TypeScript strict mode
- ESLint
- Prettier
- semantic component names
- no duplicated constants
- no unexplained magic values
- no giant monolithic components
- no repeated hardcoded business info
- clear content/data separation
- comments only where useful
- no dead code

Before completion:

```bash
npm run build
```

must pass without errors.

No:
- TypeScript errors
- hydration warnings
- console errors
- broken links

---

## 38. Acceptance Criteria — Visual

The implementation is accepted only if:

- it does not resemble a generic lawyer template
- it does not resemble a SaaS landing page
- typography is a major design element
- spacing feels premium
- sage green is restrained
- imagery feels editorial
- mobile feels intentionally designed
- Hebrew feels native
- no section relies on cliché legal imagery
- the site remains coherent even with temporary placeholder photography

---

## 39. Acceptance Criteria — UX

Within roughly 10 seconds, a first-time visitor should understand:

**WHO**  
Ackmann Law Firm

**WHAT**  
Law firm

**WHERE**  
Jerusalem / Israel

**DIFFERENTIATOR**  
Legal + financial + regulatory perspective

**NEXT ACTION**  
Explore expertise or contact the firm

---

## 40. Acceptance Criteria — Technical

Before V1 is considered complete:

- production build passes
- no console errors
- no broken internal links
- no horizontal mobile overflow
- no missing required translations
- RTL works
- sitemap exists
- robots.txt exists
- metadata is localized
- contact form is validated server-side
- responsive images are used
- reduced-motion behavior exists
- environment variables are documented

---

## 41. Future-Proofing

The architecture must support later addition of:

- more lawyers
- team page
- new practice areas
- newsletter
- media
- careers
- multiple offices
- events
- downloadable guides
- client resources
- professional social links

Do not implement these in V1 unless requested.

---

## 42. Open Decisions

Keep these intentionally configurable/open:

- final domain
- final slogan
- final list of practice areas
- final social links
- final legal notice/privacy copy
- final approved photography
- final production email address
- final primary language if different from English

Do not block V1 architecture on these decisions.

---

## 43. Final Creative Rule

Always prioritize:

- clarity
- restraint
- typography
- whitespace
- editorial quality
- brand consistency
- mobile quality
- legal credibility

over:

- effects
- decoration
- feature density
- animation
- template conventions

The goal is not merely:

> a professional lawyer website

The goal is:

> a recognizable premium legal brand.
