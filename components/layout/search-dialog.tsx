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
import { products } from "@/lib/data";

export function SearchDialog({ className }: { className?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    setOpen(false);
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<button type="button" aria-label="Search products" className={className} />}
      >
        <Search className="size-4" />
      </DialogTrigger>
      <DialogContent className="top-24 translate-y-0 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search products</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex gap-2">
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ploughs, cultivators, harrows…"
            aria-label="Search query"
          />
          <Button type="submit">
            <Search className="size-4" /> Search
          </Button>
        </form>
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="text-xs font-medium text-muted-foreground">Popular:</span>
          {products.slice(0, 4).map((p) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => {
                setOpen(false);
                router.push(`/products/${p.slug}`);
              }}
              className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {p.title}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
