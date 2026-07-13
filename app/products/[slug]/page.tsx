import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { PlaceholderImage } from "@/components/placeholder-image";
import { ProductCard } from "@/components/product-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { InquiryButton } from "@/components/inquiry/inquiry-cta";
import { products } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return buildMetadata({ title: "Product not found", noIndex: true });
  return buildMetadata({
    title: product.title,
    description: product.excerpt,
    path: `/products/${product.slug}`,
  });
}

const highlights = [
  "High-grade steel construction for long service life",
  "Field-tested across diverse Indian soil conditions",
  "Low maintenance with readily available genuine spares",
  "Compatible with a wide range of tractor HP categories",
];

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={product.category}
        title={product.title}
        description={product.excerpt}
        hue={product.hue}
        crumbs={[
          { name: "Products", href: "/products" },
          { name: product.title, href: `/products/${product.slug}` },
        ]}
      />

      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <PlaceholderImage
            hue={product.hue}
            className="aspect-[4/3] rounded-2xl"
            label={product.title}
          />
          <div>
            <span className="eyebrow">Overview</span>
            <h2 className="mt-3 text-3xl font-bold">{product.title}</h2>
            <p className="mt-4 text-muted-foreground">
              The {product.title.toLowerCase()} from {siteConfig.name} is engineered for dependable
              performance season after season. {product.excerpt}
            </p>

            <ul className="mt-6 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                    <Check className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" render={<Link href="/contact" />}>
                Request a Quote <ArrowRight className="size-4" />
              </Button>
              <InquiryButton />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-site">
          <h2 className="text-2xl font-bold">Related products</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.title, path: `/products/${product.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          category: product.category,
          description: product.excerpt,
          url: absoluteUrl(`/products/${product.slug}`),
          brand: { "@type": "Brand", name: siteConfig.name },
          manufacturer: { "@type": "Organization", name: siteConfig.legalName },
        }}
      />
    </>
  );
}
