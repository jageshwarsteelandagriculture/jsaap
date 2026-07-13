export type NavChild = { label: string; href: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "The Company",
    href: "/company",
    children: [
      { label: "About", href: "/company/about" },
      { label: "Our Events", href: "/company/events" },
      { label: "Photo Gallery", href: "/company/photo-gallery" },
      { label: "Video Gallery", href: "/company/video-gallery" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Hydraulic Reversible Plough", href: "/products/hydraulic-reversible-plough" },
      { label: "Ploughs", href: "/products/ploughs" },
      { label: "Tractor Cultivator", href: "/products/tractor-cultivator" },
      { label: "Chisel Plough", href: "/products/chisel-plough" },
      { label: "Disc Harrow", href: "/products/disc-harrow" },
      { label: "Land Leveller", href: "/products/land-leveller" },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];

export const footerExploreLinks: NavChild[] = [
  { label: "About", href: "/company/about" },
  { label: "Products", href: "/products" },
  { label: "Careers", href: "/careers" },
  { label: "Latest News", href: "/news" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];
