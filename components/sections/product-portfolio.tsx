import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";

export function ProductPortfolio() {
  return (
    <section id="products" className="section bg-muted/40">
      <div className="container-site">
        <div className="flex flex-col items-end justify-between gap-6 md:flex-row">
          <SectionHeading
            eyebrow="Explore"
            title="Our Product Portfolio"
            description="A complete range of tractor-mounted implements engineered for every stage of farming — from primary tillage to precision land preparation."
          />
          <Button variant="outline" className="shrink-0" render={<Link href="/products" />}>
            View all products <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
