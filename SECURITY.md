# Sécurité — Ackmann Law Firm

Ce document décrit les règles de sécurité à respecter pour ce projet, dès la
phase actuelle (site vitrine multilingue + formulaire de contact) et pour la
suite du développement.

Contrairement à des projets avec réservation/paiement, ce site n'a **pas** de
base de données, pas de back-office admin et pas de paiement prévus (voir
`docs/SPEC.md`). Le périmètre est volontairement plus restreint.

## État actuel

Le site (`app/[locale]/`) est un front-end Next.js server-rendered en 3
langues (en/fr/he). Le formulaire de contact (`docs/SPEC.md` section 18) est
implémenté via une Server Action (`lib/server/contact-actions.ts`) : validation
serveur stricte (`lib/server/validate-contact.ts`), sanitization anti-injection
d'en-têtes e-mail, honeypot + délai minimum de soumission contre le spam. Le
fournisseur d'envoi d'e-mail n'est pas encore branché (`CONTACT_FORM_PROVIDER_API_KEY`
absente en local) — les soumissions valides sont journalisées côté serveur
uniquement, jamais renvoyées au client (`lib/server/mail.ts`, point de bascule
unique documenté dans le fichier).

Toujours pas de base de données ni de back-office : rien à protéger de ce
côté-là pour l'instant.

`npm audit` : 0 vulnérabilité (lockfile désormais présent). Recherche de
secrets en dur, de `dangerouslySetInnerHTML` dangereux, `eval`, `innerHTML` :
un seul usage de `dangerouslySetInnerHTML`, dans `components/seo/JsonLd.tsx`,
limité à du JSON généré côté serveur à partir de données internes (jamais
d'entrée utilisateur) — safe et documenté en commentaire dans le fichier.

Headers de sécurité configurés dans `next.config.ts` (`X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`), vérifiés en sortie
d'un `next start` local. Pas de `Content-Security-Policy` : les balises
`<script type="application/ld+json">` sont inline, donc une CSP stricte
demanderait un nonce par requête — complexité réelle, différée
volontairement, pas un oubli.

## Bug trouvé et corrigé cette phase

`.gitignore` excluait `.env*`, ce qui masquait aussi `.env.example` lui-même —
le fichier censé être committé comme modèle (sans valeurs réelles) n'aurait
donc **jamais** pu être versionné. Corrigé avec une règle de négation
(`!.env.example`) ; vérifié via `git status`/`git check-ignore` que le fichier
est maintenant bien détecté comme à ajouter.

## Audit des failles classiques applicables à ce projet

| # | Faille | Statut | Détail |
|---|---|---|---|
| 1 | Clé API dans le front-end | ✅ | Aucune clé en dur. `.env.example` documente le préfixe `NEXT_PUBLIC_` = public ; `CONTACT_FORM_PROVIDER_API_KEY` n'est lue que dans `lib/server/mail.ts`, jamais importée dans un fichier `"use client"` |
| 2 | Secrets sur GitHub | ✅ | `.gitignore` exclut `.env*` (avec l'exception `.env.example`, cf. bug ci-dessus) ; aucun secret réel n'a jamais existé dans ce dépôt |
| 3 | Le serveur croit le client | ✅ | Le formulaire de contact valide et sanitize côté serveur (`validateContactForm`/`sanitizeField`) indépendamment de ce que le client a envoyé ; les attributs `required`/`type` côté client ne sont qu'un confort UX, pas la frontière de sécurité |
| 4 | XSS (injection de script) | ✅ | Aucun `dangerouslySetInnerHTML` sur du contenu utilisateur ; React échappe le texte par défaut ; le seul usage de `dangerouslySetInnerHTML` (JSON-LD) ne reçoit que des données serveur |
| 5 | CORS trop permissif | N/A | Pas de route API cross-origin ; la Server Action du formulaire n'est appelable que depuis les pages du site lui-même |
| 6 | API sans limite de requêtes | ⚠️ | Pas de rate limiting partagé sur la Server Action — nécessiterait un store partagé (Redis/Upstash), pas justifié tant que le site n'est pas déployé publiquement à volume. Le honeypot + délai minimum couvrent le spam non sophistiqué en attendant |
| 7 | Protection anti-spam | ✅ | Honeypot + délai minimum de 2s (render→submit), tous deux vérifiés côté serveur ; la détection n'est jamais révélée à l'expéditeur (même réponse « succès ») |
| 8 | Erreurs qui exposent des détails internes | ✅ | Next.js masque les traces en production par défaut ; le formulaire renvoie des messages génériques côté client, les détails techniques restent dans les logs serveur (`console.error` dans `contact-actions.ts`) |
| 9 | Dépendances jamais mises à jour | ✅ | `npm audit` : 0 vulnérabilité aujourd'hui ; à réexécuter avant chaque mise en production |
| 10 | Stockage inutile de données sensibles | ✅ | Aucune base de données ; les soumissions valides ne sont journalisées que le temps de configurer un vrai fournisseur d'e-mail |
| 11 | Headers de sécurité absents | ✅ | `next.config.ts` : `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` — vérifiés en sortie HTTP réelle |
| 12 | Injection d'en-têtes e-mail | ✅ | `sanitizeField` retire les retours à la ligne (`\r\n`) de tous les champs avant tout usage — protège un futur fournisseur SMTP brut contre l'injection de faux en-têtes (Bcc, etc.) via le champ sujet/email |

## Règles pour les secrets

1. **Aucun secret n'est jamais commité.** `.env`, `.env.local` et variantes
   sont exclus par `.gitignore`. Seul `.env.example` (sans valeurs réelles,
   désormais correctement versionnable) documente les variables attendues.
2. **Préfixe `NEXT_PUBLIC_` = visible par tout le monde.** Toute variable
   sans ce préfixe (ex. `CONTACT_FORM_PROVIDER_API_KEY`) est un secret
   serveur et ne doit être lue que côté serveur (Server Components, Route
   Handlers, Server Actions) — jamais dans un fichier `"use client"`.
3. **Rotation.** Toute clé qui a pu fuiter doit être régénérée immédiatement
   chez le fournisseur, pas seulement remplacée dans `.env`.

## Exigences issues de docs/SPEC.md (section 30)

- **HTTPS** sur tous les environnements déployés — Vercel/Render le
  fournissent automatiquement, rien à configurer côté application.
- **Headers de sécurité** — ✅ configurés (`next.config.ts`).
- **Validation serveur systématique** — ✅ implémentée pour le formulaire de
  contact.
- **Sanitization des entrées** — ✅ implémentée (`sanitizeField`).
- **Anti-spam** — ✅ honeypot + délai minimum implémentés.
- **Hygiène des dépendances** — ✅ `npm audit` propre aujourd'hui, à
  réexécuter régulièrement.

## Checklist avant mise en production

- [x] Lockfile présent, `npm audit` propre.
- [x] Formulaire de contact : validation serveur + honeypot + sanitization
      implémentés (code review fait ; **test live en navigateur pas encore
      effectué cette session** — voir `docs/TASKS.md` Phase 10.2).
- [ ] `CONTACT_FORM_PROVIDER_API_KEY` renseignée en production et
      `lib/server/mail.ts` branché sur un vrai fournisseur (Resend, Postmark,
      SES...) — actuellement en mode « log serveur » faute de fournisseur
      configuré.
- [x] Headers de sécurité ajoutés à `next.config.ts`.
- [ ] Secret scanning activé sur le dépôt GitHub (à faire avant le premier
      push public).
- [ ] Mentions légales / politique de confidentialité relues par un
      professionnel du droit avant publication (Phase 17, pas encore
      construite).
- [ ] Test manuel réel du formulaire (navigateur) : soumission valide, champ
      piège rempli, données invalides — code-reviewé mais pas exécuté en
      direct cette session.
