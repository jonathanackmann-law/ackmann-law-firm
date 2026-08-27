import Link from "next/link";

/**
 * Root-level 404 — catches requests that don't even match a valid
 * `/[locale]/...` route (e.g. an unknown locale prefix). No `app/layout.tsx`
 * exists in this project (app/[locale]/layout.tsx is the effective root),
 * so this file is outside that layout's <html>/<body> and must provide its
 * own. Deliberately not localized: the locale itself may be what's invalid
 * here, so there's nothing reliable to translate against — kept in English
 * with brand colors via inline styles rather than depending on globals.css
 * being guaranteed to apply at this boundary. Uses plain `next/link`, not
 * the locale-aware wrapper in lib/i18n/navigation.ts — that one assumes a
 * valid locale context this file can't guarantee.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: "1.5rem",
          padding: "4rem 1.5rem",
          backgroundColor: "#f7f5f1",
          color: "#1c1c1a",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            color: "#726f66",
            textTransform: "uppercase",
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Page not found</h1>
        <p style={{ maxWidth: "36rem", fontFamily: "system-ui, sans-serif" }}>
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          style={{
            border: "1px solid #1c1c1a",
            backgroundColor: "#1c1c1a",
            color: "#f7f5f1",
            padding: "0.75rem 1.5rem",
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.875rem",
            textDecoration: "none",
          }}
        >
          Back to homepage
        </Link>
      </body>
    </html>
  );
}
