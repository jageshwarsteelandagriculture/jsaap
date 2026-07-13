import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";

export function ProductPortfolio({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const products = getProducts(dict);

  return (
    <section id="products" className="section bg-muted/40">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={dict.portfolio.eyebrow}
            title={dict.portfolio.title}
            description={dict.portfolio.description}
          />
          <Button
            variant="outline"
            className="w-full shrink-0 sm:w-auto"
            render={<Link href={localePath(lang, "/products")} />}
          >
            {dict.common.viewAllProducts} <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
