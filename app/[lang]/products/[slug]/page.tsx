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
import { getProduct, getProducts, productMeta } from "@/lib/data";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { hasLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { fill } from "@/lib/i18n/fill";

export function generateStaticParams() {
  return locales.flatMap((lang) => productMeta.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const product = getProduct(dict, slug);

  if (!product) {
    return buildMetadata({
      lang,
      title: dict.productDetail.notFound,
      description: dict.productDetail.notFound,
      noIndex: true,
    });
  }

  return buildMetadata({
    lang,
    title: product.title,
    description: product.excerpt,
    path: `/products/${product.slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const product = getProduct(dict, slug);
  if (!product) notFound();

  const related = getProducts(dict)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <PageHeader
        lang={lang}
        dict={dict}
        eyebrow={product.category}
        title={product.title}
        description={product.excerpt}
        hue={product.hue}
        crumbs={[
          { name: dict.nav.products, href: "/products" },
          { name: product.title, href: `/products/${product.slug}` },
        ]}
      />

      <section className="section">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-12">
          <PlaceholderImage
            hue={product.hue}
            className="aspect-4/3 rounded-2xl"
            label={product.title}
          />
          <div>
            <span className="eyebrow">{dict.common.overview}</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{product.title}</h2>
            <p className="mt-4 text-muted-foreground">
              {fill(dict.productDetail.intro, {
                product: product.title,
                company: siteConfig.name,
              })}{" "}
              {product.excerpt}
            </p>

            <ul className="mt-6 space-y-3">
              {dict.productDetail.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-tint text-brand">
                    <Check className="size-4" />
                  </span>
                  <span className="text-sm font-medium">{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button size="lg" render={<Link href={localePath(lang, "/contact")} />}>
                {dict.common.requestQuote} <ArrowRight className="size-4" />
              </Button>
              <InquiryButton label={dict.common.quickInquiry} />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-muted/40">
        <div className="container-site">
          <h2 className="text-2xl font-bold">{dict.common.relatedProducts}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: "/" },
          { name: dict.nav.products, path: "/products" },
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
          url: absoluteUrl(localePath(lang, `/products/${product.slug}`)),
          brand: { "@type": "Brand", name: siteConfig.name },
          manufacturer: { "@type": "Organization", name: siteConfig.legalName },
        }}
      />
    </>
  );
}
