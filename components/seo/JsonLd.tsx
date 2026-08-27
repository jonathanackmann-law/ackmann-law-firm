/**
 * Next.js-documented pattern for embedding JSON-LD. Only ever given
 * server-generated data built from internal config/content, never user
 * input — safe despite `dangerouslySetInnerHTML`.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
