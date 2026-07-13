"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/data";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { localePath } from "@/lib/i18n/routing";

export function SearchDialog({
  lang,
  dict,
  className,
}: {
  lang: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const products = getProducts(dict);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setOpen(false);
    router.push(
      localePath(lang, q ? `/products?q=${encodeURIComponent(q)}` : "/products"),
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <button type="button" aria-label={dict.a11y.searchProducts} className={className} />
        }
      >
        <Search className="size-4" />
      </DialogTrigger>
      <DialogContent className="top-24 max-w-[calc(100vw-2rem)] translate-y-0 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{dict.search.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.search.placeholder}
            aria-label={dict.a11y.searchQuery}
            className="h-11"
          />
          <Button type="submit" size="lg" className="shrink-0">
            <Search className="size-4" /> {dict.search.submit}
          </Button>
        </form>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-medium text-muted-foreground">
            {dict.search.popular}
          </span>
          {products.slice(0, 4).map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(localePath(lang, `/products/${p.slug}`));
              }}
              className="rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {p.title}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
