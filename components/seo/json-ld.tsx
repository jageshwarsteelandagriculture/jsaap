/**
 * Renders a schema.org JSON-LD block. Server component — safe to embed the
 * serialized object directly; data is build-time/trusted, not user input.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
