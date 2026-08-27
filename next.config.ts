import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  // Pins the workspace root explicitly — without this Turbopack walks up
  // parent directories and can pick up an unrelated lockfile (e.g. a stray
  // package-lock.json in the user's home directory).
  turbopack: {
    root: __dirname,
  },

  // SPEC.md Section 30 — baseline secure headers. No Content-Security-Policy
  // yet: the JSON-LD <script> tags (components/seo/JsonLd.tsx) are inline,
  // so a CSP would need per-request nonces to stay strict, which is real
  // added complexity — deliberately deferred, not an oversight.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
