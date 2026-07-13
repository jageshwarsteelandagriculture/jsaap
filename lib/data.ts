/**
 * Homepage content data. In a full build these would come from MongoDB via
 * Mongoose; here they are typed in-memory fixtures so the site renders with
 * zero external setup (frontend-first). Each shape mirrors a future model.
 */

export type Product = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  /** Hue used by the placeholder gradient image. */
  hue: number;
};

export const products: Product[] = [
  {
    slug: "hydraulic-reversible-plough",
    title: "Hydraulic Reversible Plough",
    category: "Ploughing",
    excerpt:
      "Two-way ploughing with hydraulic turnover for level, furrow-free fields and higher daily output.",
    hue: 142,
  },
  {
    slug: "ploughs",
    title: "Plough",
    category: "Ploughing",
    excerpt:
      "Heavy-duty mouldboard and disc ploughs engineered for deep primary tillage in tough soils.",
    hue: 96,
  },
  {
    slug: "tractor-cultivator",
    title: "Cultivators",
    category: "Tillage",
    excerpt:
      "Spring-loaded tractor cultivators for fast, uniform secondary tillage and weed control.",
    hue: 160,
  },
  {
    slug: "chisel-plough",
    title: "Chisel Plough",
    category: "Tillage",
    excerpt:
      "Breaks hardpan and improves water infiltration without inverting the soil profile.",
    hue: 32,
  },
  {
    slug: "disc-harrow",
    title: "Disc Harrow",
    category: "Seedbed",
    excerpt:
      "Offset and trailed disc harrows that cut residue and prepare a fine, firm seedbed.",
    hue: 200,
  },
  {
    slug: "land-leveller",
    title: "Land Leveller",
    category: "Land Prep",
    excerpt:
      "Precision land levellers for efficient irrigation, reduced water use and better yields.",
    hue: 122,
  },
];

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  source: string;
  verified: boolean;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ramesh Patel",
    location: "Junagadh, Gujarat",
    rating: 5,
    source: "Google",
    verified: true,
    text: "The hydraulic reversible plough has cut my field-prep time in half. Build quality is excellent and the after-sales support is genuinely helpful.",
  },
  {
    name: "Harpreet Singh",
    location: "Ludhiana, Punjab",
    rating: 5,
    source: "Google",
    verified: true,
    text: "I run three of their cultivators across 200 acres. Two seasons in, zero breakdowns. Genuine parts are always available from my local dealer.",
  },
  {
    name: "Suresh Reddy",
    location: "Guntur, Andhra Pradesh",
    rating: 5,
    source: "Google",
    verified: true,
    text: "Switched from an imported disc harrow to theirs and never looked back. Great value, sturdy discs, and the seedbed finish is perfect.",
  },
  {
    name: "Mahesh Yadav",
    location: "Nashik, Maharashtra",
    rating: 4,
    source: "Google",
    verified: true,
    text: "Reliable equipment that handles our black cotton soil well. Delivery was on time and the team explained maintenance clearly.",
  },
  {
    name: "Karthik Nair",
    location: "Thrissur, Kerala",
    rating: 5,
    source: "Google",
    verified: true,
    text: "The land leveller paid for itself in one irrigation season through water savings. Solid engineering and a fair price.",
  },
];

export type BenefitItem = {
  title: string;
  description: string;
};

export const benefits: BenefitItem[] = [
  {
    title: "Quality Agricultural Equipment",
    description:
      "Every machine is built from high-grade steel and field-tested to perform season after season.",
  },
  {
    title: "Professional Support",
    description:
      "Our agronomy and service teams help you choose the right implement and keep it running.",
  },
  {
    title: "Genuine Parts",
    description:
      "A nationwide dealer network keeps genuine spares within reach, minimising downtime.",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  author: string;
  category: string;
  hue: number;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "mini-bund-former-plough-compact-solution",
    title:
      "Mini Bund Former Plough — A Compact Solution for Efficient Farmland Management",
    excerpt:
      "How a compact bund former helps small and medium farms shape field boundaries and conserve water without heavy machinery.",
    date: "2025-07-09",
    author: "AgriMech Editorial",
    category: "Equipment",
    hue: 140,
  },
  {
    slug: "modern-farm-machinery-improving-efficiency",
    title: "Modern Farm Machinery: Improving Efficiency with Better Equipment",
    excerpt:
      "From tillage to levelling, the right tractor-mounted equipment can dramatically cut costs and boost yields.",
    date: "2025-04-22",
    author: "AgriMech Editorial",
    category: "Guides",
    hue: 96,
  },
  {
    slug: "disc-plough-vs-disc-harrow-key-differences",
    title: "Disc Plough vs. Disc Harrow: Key Differences & Uses",
    excerpt:
      "Two implements, two very different jobs. Here is how to pick the right one for each stage of soil preparation.",
    date: "2025-04-16",
    author: "AgriMech Editorial",
    category: "Tillage",
    hue: 200,
  },
];

export type HeroSlide = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  hue: number;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Partner for Successful Farming",
    title: "Tractor-Mounted Machinery Built to Last",
    subtitle:
      "Four decades of engineering reliable ploughs, cultivators and harrows for farms across the country.",
    ctaLabel: "Explore Products",
    ctaHref: "/products",
    hue: 142,
  },
  {
    eyebrow: "Precision Tillage",
    title: "Prepare Perfect Seedbeds, Every Season",
    subtitle:
      "From primary ploughing to fine seedbed finishing — equipment engineered for Indian soils.",
    ctaLabel: "Our Product Portfolio",
    ctaHref: "/products",
    hue: 122,
  },
  {
    eyebrow: "Trusted by 180+ Dealers",
    title: "Quality, Genuine Parts & Real Support",
    subtitle:
      "A nationwide network keeps your machinery running with genuine spares and expert service.",
    ctaLabel: "Become a Dealer",
    ctaHref: "/become-a-dealer",
    hue: 96,
  },
];
