/**
 * Central site configuration — single source of truth for all brand details.
 * Swap these placeholder values for the real company details and the whole
 * site (header, footer, metadata, schema.org, CTAs) updates automatically.
 */

export const siteConfig = {
  name: "Jageshwar Steel and Agriculture",
  legalName: "Jageshwar Steel and Agriculture",
  tagline: "Partner for Successful Farming",
  description:
    "AgriMech Industries manufactures reliable, technology-driven tractor-mounted agricultural equipment. Over four decades of quality engineering trusted by farmers and dealers across the country.",
  shortDescription:
    "Manufacturer of tractor-mounted agricultural machinery — ploughs, cultivators, harrows and more.",

  // Update to the production domain before deploying.
  url: "https://www.agrimech-industries.example",
  ogImage: "/og/og-default.svg",
  locale: "en_IN",

  foundingYear: 1984,

  contact: {
    phone: "+91 98791 71496",
    phoneHref: "tel:+919879171496",
    whatsapp: "919879171496", // digits only, country code first
    email: "jageshwarsteelandagriculture@gmail.com",
    city: "Panthawada",
    state: "Gujarat",
    addressLine: "Dhanera Road, Panthawada, Banaskantha",
    postalCode: "385520",
    country: "India",
    countryCode: "IN",
    mapUrl: "https://maps.google.com/?q=Dhanera+Road+Panthawada+Banaskantha+Gujarat",
  },

  social: {
    facebook: "https://facebook.com/",
    linkedin: "https://linkedin.com/",
    youtube: "https://youtube.com/",
  },

  // Primary promotional video (YouTube) used by the Video CTA section.
  videoId: "ScMzIvxBSi4",

  brochures: {
    english: "/brochures/agrimech-brochure-en.pdf",
    gujarati: "/brochures/agrimech-brochure-gu.pdf",
  },

  stats: {
    yearsExperience: 40,
    productionAreaSqMtr: 25000,
    fiveStarReviews: 1229,
    dealers: 180,
  },

  googleReviews: {
    count: 1229,
    rating: 4.8,
    writeReviewUrl: "https://search.google.com/local/writereview?placeid=PLACEHOLDER",
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const whatsappLink = (message?: string) =>
  `https://wa.me/${siteConfig.contact.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
