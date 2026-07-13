import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Quote } from "@/components/sections/quote";
import { products } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products",
  description:
    "Explore our full range of tractor-mounted agricultural machinery — ploughs, cultivators, harrows, land levellers and more.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim().toLowerCase() ?? "";
  const filtered = query
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query),
      )
    : products;

  return (
    <>
      <PageHeader
        eyebrow="Explore"
        title="Our Product Portfolio"
        description="A complete range of tractor-mounted implements engineered for every stage of farming."
        crumbs={[{ name: "Products", href: "/products" }]}
      />

      <section className="section">
        <div className="container-site">
          {query ? (
            <p className="mb-8 text-sm text-muted-foreground">
              Showing {filtered.length} result{filtered.length === 1 ? "" : "s"} for{" "}
              <span className="font-semibold text-foreground">“{q}”</span>
            </p>
          ) : null}

          {filtered.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border bg-muted/40 p-8 text-center text-muted-foreground">
              No products matched your search. Try a different term or browse all products.
            </p>
          )}
        </div>
      </section>

      <Quote />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/products/${p.slug}`),
            name: p.title,
          })),
        }}
      />
    </>
  );
}
