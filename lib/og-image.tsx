import { ImageResponse } from "next/og";

/**
 * Reusable Open Graph visual template (SPEC.md Section 12/29) — off-white
 * background, charcoal type, sage eyebrow, JA monogram. Generated at
 * request/build time via next/og — no photography dependency, since none
 * exists yet (see Hero/FounderSection deferral notes).
 */
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

export function renderOgImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#f7f5f1",
        padding: "80px",
      }}
    >
      <div
        style={{
          display: "flex",
          width: 72,
          height: 72,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1c1c1a",
          color: "#f7f5f1",
          fontSize: 28,
          fontFamily: "serif",
          marginBottom: 48,
        }}
      >
        JA
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#6f8271",
          marginBottom: 24,
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 62,
          lineHeight: 1.15,
          fontFamily: "serif",
          color: "#1c1c1a",
          maxWidth: 950,
        }}
      >
        {title}
      </div>
    </div>,
    ogImageSize,
  );
}
