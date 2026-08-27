"use client";

/**
 * Catches errors in the root layout itself (app/[locale]/layout.tsx —
 * there's no separate app/layout.tsx in this project). Must render its own
 * complete <html>/<body> since it replaces everything, including whatever
 * failed. Deliberately dependency-free: no next-intl, no shared components —
 * if the root layout itself is broken, this must not be able to break too.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
        <h1 style={{ fontSize: "2.5rem", margin: 0 }}>Something went wrong</h1>
        <p style={{ maxWidth: "36rem", fontFamily: "system-ui, sans-serif" }}>
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            border: "1px solid #1c1c1a",
            backgroundColor: "#1c1c1a",
            color: "#f7f5f1",
            padding: "0.75rem 1.5rem",
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
