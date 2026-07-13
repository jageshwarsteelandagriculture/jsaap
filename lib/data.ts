/**
 * Content data. In a full build these would come from MongoDB via Mongoose;
 * here they are typed in-memory fixtures so the site renders with zero external
 * setup (frontend-first). Each shape mirrors a future model.
 *
 * Translatable copy does NOT live here — it lives in `lib/i18n/dictionaries/`,
 * keyed by the slugs below. This module keeps only the structural fields that
 * are the same in every language (slug, hue, date, rating), and exposes
 * `get*` helpers that merge a dictionary in to produce the display shape.
 */
import type { Dictionary } from "@/lib/i18n/dictionaries";

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

export type ProductSlug = keyof Dictionary["products"]["items"];

type ProductMeta = {
  slug: ProductSlug;
  /** Hue used by the placeholder gradient image. */
  hue: number;
};

export const productMeta: ProductMeta[] = [
  { slug: "hydraulic-reversible-plough", hue: 142 },
  { slug: "ploughs", hue: 96 },
  { slug: "tractor-cultivator", hue: 160 },
  { slug: "chisel-plough", hue: 32 },
  { slug: "disc-harrow", hue: 200 },
  { slug: "land-leveller", hue: 122 },
];

export type Product = ProductMeta & {
  title: string;
  category: string;
  excerpt: string;
};

export function getProducts(dict: Dictionary): Product[] {
  return productMeta.map((meta) => ({ ...meta, ...dict.products.items[meta.slug] }));
}

export function getProduct(dict: Dictionary, slug: string): Product | undefined {
  const meta = productMeta.find((p) => p.slug === slug);
  return meta ? { ...meta, ...dict.products.items[meta.slug] } : undefined;
}

/* -------------------------------------------------------------------------- */
/* Blog                                                                        */
/* -------------------------------------------------------------------------- */

export type BlogSlug = keyof Dictionary["blog"]["items"];

type BlogMeta = {
  slug: BlogSlug;
  /** ISO date */
  date: string;
  hue: number;
};

export const blogMeta: BlogMeta[] = [
  { slug: "mini-bund-former-plough-compact-solution", date: "2025-07-09", hue: 140 },
  { slug: "modern-farm-machinery-improving-efficiency", date: "2025-04-22", hue: 96 },
  { slug: "disc-plough-vs-disc-harrow-key-differences", date: "2025-04-16", hue: 200 },
];

export type BlogPost = BlogMeta & {
  title: string;
  excerpt: string;
  category: string;
  author: string;
};

export function getBlogPosts(dict: Dictionary): BlogPost[] {
  return blogMeta.map((meta) => ({
    ...meta,
    ...dict.blog.items[meta.slug],
    author: dict.blog.author,
  }));
}

export function getBlogPost(dict: Dictionary, slug: string): BlogPost | undefined {
  const meta = blogMeta.find((p) => p.slug === slug);
  return meta
    ? { ...meta, ...dict.blog.items[meta.slug], author: dict.blog.author }
    : undefined;
}

/* -------------------------------------------------------------------------- */
/* Testimonials                                                                */
/* -------------------------------------------------------------------------- */

type TestimonialMeta = {
  rating: number;
  source: string;
  verified: boolean;
};

/** Positional — index i pairs with `dict.testimonials.items[i]`. */
export const testimonialMeta: TestimonialMeta[] = [
  { rating: 5, source: "Google", verified: true },
  { rating: 5, source: "Google", verified: true },
  { rating: 5, source: "Google", verified: true },
  { rating: 4, source: "Google", verified: true },
  { rating: 5, source: "Google", verified: true },
];

export type Testimonial = TestimonialMeta & {
  name: string;
  location: string;
  text: string;
};

export function getTestimonials(dict: Dictionary): Testimonial[] {
  return dict.testimonials.items.map((item, i) => ({
    ...testimonialMeta[i],
    ...item,
  }));
}

/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

/** Positional — index i pairs with `dict.hero.slides[i]`. */
const heroMeta = [
  { href: "/products", hue: 142 },
  { href: "/products", hue: 122 },
  { href: "/become-a-dealer", hue: 96 },
];

export type HeroSlide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  /** Unprefixed path — callers pass it through `localePath`. */
  ctaHref: string;
  hue: number;
};

export function getHeroSlides(dict: Dictionary): HeroSlide[] {
  return dict.hero.slides.map((slide, i) => ({
    ...slide,
    ctaHref: heroMeta[i].href,
    hue: heroMeta[i].hue,
  }));
}

/* -------------------------------------------------------------------------- */
/* Gallery / events hues (copy lives in the dictionary, positionally)          */
/* -------------------------------------------------------------------------- */

export const eventHues = [142, 96, 122, 200];
export const photoHues = [142, 96, 122, 32, 48, 200, 160, 110];
export const videoHues = [142, 96, 200, 122];
