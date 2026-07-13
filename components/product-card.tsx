import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PlaceholderImage } from "@/components/placeholder-image";
import type { Product } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/routing";

export function ProductCard({ product, lang }: { product: Product; lang: Locale }) {
  return (
    <Link
      href={localePath(lang, `/products/${product.slug}`)}
      className="group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="relative aspect-4/3 overflow-hidden">
        <PlaceholderImage
          hue={product.hue}
          className="size-full transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-dark">
          {product.category}
        </span>
        <span className="absolute inset-0 bg-brand/0 transition-colors duration-300 group-hover:bg-brand/25" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="flex items-start justify-between gap-2 text-lg font-bold text-heading transition-colors group-hover:text-brand">
          {product.title}
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-colors group-hover:text-brand" />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{product.excerpt}</p>
      </div>
    </Link>
  );
}
