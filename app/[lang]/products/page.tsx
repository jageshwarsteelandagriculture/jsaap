import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHeader } from "@/components/page-header";
import { ProductCard } from "@/components/product-card";
import { JsonLd } from "@/components/seo/json-ld";
import { Quote } from "@/components/sections/quote";
import { getProducts } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd, absoluteUrl } from "@/lib/seo";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";
import { fill } from "@/lib/i18n/fill";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return buildMetadata({
    lang,
    title: dict.productsPage.metaTitle,
    description: dict.productsPage.metaDescription,
    path: "/products",
  });
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const products = getProducts(dict);

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
        lang={lang}
        dict={dict}
        eyebrow={dict.portfolio.eyebrow}
        title={dict.portfolio.title}
        description={dict.productsPage.headerDescription}
        crumbs={[{ name: dict.nav.products, href: "/products" }]}
      />

      <section className="section">
        <div className="container-site">
          {query ? (
            <p className="mb-8 text-sm text-muted-foreground">
              {fill(
                filtered.length === 1
                  ? dict.productsPage.resultsOne
                  : dict.productsPage.resultsOther,
                { count: filtered.length, query: q ?? "" },
              )}
            </p>
          ) : null}

          {filtered.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} lang={lang} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border bg-muted/40 p-8 text-center text-muted-foreground">
              {dict.productsPage.noResults}
            </p>
          )}
        </div>
      </section>

      <Quote lang={lang} dict={dict} />

      <JsonLd
        data={breadcrumbJsonLd(lang, [
          { name: dict.common.home, path: "/" },
          { name: dict.nav.products, path: "/products" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(localePath(lang, `/products/${p.slug}`)),
            name: p.title,
          })),
        }}
      />
    </>
  );
}
