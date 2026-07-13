/**
 * English dictionary — the source of truth for the shape of every other
 * locale. `Dictionary` is inferred from this file, so adding a key here makes
 * TypeScript demand the same key in `hi.ts` and `gu.ts`.
 *
 * Every value is a plain string so the whole dictionary stays JSON-serializable
 * and can be handed from a Server Component straight to a Client Component.
 * Dynamic values use `{placeholders}` resolved by `fill()` in lib/i18n/fill.ts.
 *
 * Company names, product slugs and contact details stay in `lib/site-config.ts`
 * and `lib/data.ts` — only human-readable copy lives here.
 */
export const en = {
  brand: {
    tagline: "Partner for Successful Farming",
    description:
      "Jageshwar Welding and Agriculture manufactures reliable, technology-driven tractor-mounted agricultural equipment. Over four decades of quality engineering trusted by farmers and dealers across the country.",
    shortDescription:
      "Manufacturer of tractor-mounted agricultural machinery — ploughs, cultivators, harrows and more.",
  },

  common: {
    home: "Home",
    requestQuote: "Request a Quote",
    getQuote: "Get a Quote",
    quickInquiry: "Quick Inquiry",
    requestNow: "Request Now",
    enquireNow: "Enquire Now",
    sendMessage: "Send Message",
    whatsapp: "WhatsApp",
    whatsappUs: "WhatsApp Us",
    chatOnWhatsapp: "Chat on WhatsApp",
    readMore: "Read more",
    moreAboutUs: "More About Us",
    viewAllProducts: "View all products",
    allArticles: "All articles",
    overview: "Overview",
    relatedProducts: "Related products",
    relatedArticles: "Related articles",
    backToAllArticles: "Back to all articles",
    loading: "Loading…",
    sending: "Sending…",
    verified: "Verified",
    tryAgain: "Try again",
    callUs: "Call us",
    backToHome: "Back to home",
    callAnytime: "Call anytime",
    sendEmailLabel: "Send Email",
    emailUs: "Email us",
    location: "Location",
    /** "{tagline} — Manufacturing since {year}" */
    headerTagline: "{tagline} — Manufacturing since {year}",
  },

  a11y: {
    openMenu: "Open menu",
    primaryNav: "Primary",
    mobileNav: "Mobile",
    breadcrumb: "Breadcrumb",
    featured: "Featured",
    prevSlide: "Previous slide",
    nextSlide: "Next slide",
    goToSlide: "Go to slide {n}",
    prevReviews: "Previous reviews",
    nextReviews: "Next reviews",
    watchOurVideo: "Watch our video",
    companyVideo: "Company video",
    searchProducts: "Search products",
    searchQuery: "Search query",
    openInquiry: "Open quick inquiry form",
    chatWhatsapp: "Chat with us on WhatsApp",
    siteNavigation: "{company} navigation",
  },

  nav: {
    home: "Home",
    company: "The Company",
    about: "About",
    events: "Our Events",
    photoGallery: "Photo Gallery",
    videoGallery: "Video Gallery",
    products: "Products",
    contact: "Contact Us",
    careers: "Careers",
    news: "Latest News",
    privacyPolicy: "Privacy Policy",
    becomeADealer: "Become a Dealer",
    /** The "see everything in this menu" link, e.g. "All Products". */
    allOf: "All {label}",
  },

  language: {
    gateTitle: "Choose your language",
    gateSubtitle:
      "Select a language to browse the site. You can change it anytime from the header.",
    gateContinue: "Continue",
    switcherLabel: "Change language",
    current: "Current language",
  },

  search: {
    title: "Search products",
    placeholder: "Search ploughs, cultivators, harrows…",
    submit: "Search",
    popular: "Popular:",
  },

  form: {
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
    company: "Company",
    namePlaceholder: "Your full name",
    emailPlaceholder: "you@example.com",
    phonePlaceholder: "+91 98791 71496",
    messagePlaceholder: "Tell us which machinery you're interested in and your requirements…",
    errors: {
      nameMin: "Please enter your full name",
      nameMax: "Name is too long",
      emailRequired: "Email is required",
      emailInvalid: "Enter a valid email address",
      phoneInvalid: "Enter a valid phone number",
      phoneMax: "Phone number is too long",
      messageMin: "Please add a few details (min 10 characters)",
      messageMax: "Message is too long",
    },
    correctFields: "Please correct the highlighted fields.",
    successToast: "Enquiry sent!",
    successMessage:
      "Thank you! Your enquiry has been received — our team will contact you shortly.",
    thankYou: "Thank you! We'll be in touch shortly.",
    errorToast: "Could not send your enquiry.",
    errorMessage:
      "Something went wrong while sending your enquiry. Please try again or call us.",
  },

  hero: {
    slides: [
      {
        eyebrow: "Partner for Successful Farming",
        title: "Tractor-Mounted Machinery Built to Last",
        subtitle:
          "Four decades of engineering reliable ploughs, cultivators and harrows for farms across the country.",
        ctaLabel: "Explore Products",
      },
      {
        eyebrow: "Precision Tillage",
        title: "Prepare Perfect Seedbeds, Every Season",
        subtitle:
          "From primary ploughing to fine seedbed finishing — equipment engineered for Indian soils.",
        ctaLabel: "Our Product Portfolio",
      },
      {
        eyebrow: "Trusted by 180+ Dealers",
        title: "Quality, Genuine Parts & Real Support",
        subtitle:
          "A nationwide network keeps your machinery running with genuine spares and expert service.",
        ctaLabel: "Become a Dealer",
      },
    ],
  },

  portfolio: {
    eyebrow: "Explore",
    title: "Our Product Portfolio",
    description:
      "A complete range of tractor-mounted implements engineered for every stage of farming — from primary tillage to precision land preparation.",
  },

  intro: {
    eyebrow: "Our Introduction",
    title: "Most reliable and competent agriculture equipment manufacturer",
    lead: "With over four decades of diligence and quality.",
    body: "{company} manufactures a comprehensive range of tractor-mounted agricultural equipment. For over {years} years we have combined practical farming knowledge with modern manufacturing to build implements that are dependable, durable and genuinely valuable for farmers.",
    features: [
      "Manufacturing tractor-mounted agricultural equipment",
      "Technologically-driven, field-tested farming equipment",
      "Nationwide dealer network with genuine spare parts",
    ],
    imageManufacturing: "Manufacturing floor",
    imageFieldTesting: "Field testing",
    imageSteel: "Quality steel",
    yearsOfExperience: "Years of Experience",
  },

  counters: {
    yearsExperience: "Years of Experience",
    productionArea: "Sq Mtr Production Area",
    fiveStarReviews: "5-Star Reviews",
    dealers: "Dealers Nationwide",
  },

  videoCta: {
    title: "Agriculture Matters to the Future of Development",
    caption: "Watch our video",
  },

  testimonials: {
    eyebrow: "Our Testimonials",
    title: "What They're Saying About Our Company",
    description:
      "Customer satisfaction and product quality drive everything we build. Here is what farmers across the country say about working with us.",
    googleReviews: "Google reviews",
    writeReview: "Write a review",
    items: [
      {
        name: "Ramesh Patel",
        location: "Junagadh, Gujarat",
        text: "The hydraulic reversible plough has cut my field-prep time in half. Build quality is excellent and the after-sales support is genuinely helpful.",
      },
      {
        name: "Harpreet Singh",
        location: "Ludhiana, Punjab",
        text: "I run three of their cultivators across 200 acres. Two seasons in, zero breakdowns. Genuine parts are always available from my local dealer.",
      },
      {
        name: "Suresh Reddy",
        location: "Guntur, Andhra Pradesh",
        text: "Switched from an imported disc harrow to theirs and never looked back. Great value, sturdy discs, and the seedbed finish is perfect.",
      },
      {
        name: "Mahesh Yadav",
        location: "Nashik, Maharashtra",
        text: "Reliable equipment that handles our black cotton soil well. Delivery was on time and the team explained maintenance clearly.",
      },
      {
        name: "Karthik Nair",
        location: "Thrissur, Kerala",
        text: "The land leveller paid for itself in one irrigation season through water savings. Solid engineering and a fair price.",
      },
    ],
  },

  brochureCta: {
    eyebrow: "Achieving more, together",
    title: "The partner for successful farming",
    description:
      "Download our complete product brochure to explore specifications, sizes and applications for every implement in our range.",
    english: "Brochure (English)",
    gujarati: "Brochure (Gujarati)",
    shortEnglish: "Brochure (EN)",
    shortGujarati: "Brochure (GU)",
    downloadEnglish: "Download Brochure (English)",
    downloadGujarati: "Download Brochure (Gujarati)",
  },

  whyChoose: {
    eyebrow: "Our Farm Benefits",
    title: "Why Choose Our Company",
    description:
      "Over four decades of diligence and quality, strong links with the agricultural community, and a reputation preferred both locally and internationally.",
    imageField: "In the field",
    imagePrecision: "Precision build",
    imageHarvest: "Harvest ready",
    benefits: [
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
    ],
  },

  blogSection: {
    eyebrow: "From the Blog",
    title: "News & Articles",
    description: "Practical guides, product news and farming insights from our team.",
  },

  quote: {
    eyebrow: "Get in touch",
    title: "Request a Quote",
    description:
      "Have questions about how {company} can help your farm or dealership? Share your requirements and our team will prepare a tailored quote.",
    formTitle: "Send an enquiry",
    formSubtitle: "Fill in the form and we'll get back to you within one business day.",
  },

  inquiryModal: {
    title: "Quick Inquiry",
    description: "Send us your requirement and our team will get back to you shortly.",
  },

  footer: {
    explore: "Explore",
    contact: "Contact",
    brochures: "Brochures",
    blurb:
      "{short} Built on over {years} years of engineering trusted by farmers and dealers nationwide.",
    copyright: "Copyright © {year} {company}. All rights reserved.",
  },

  products: {
    /** Keyed by the slugs in lib/data.ts */
    items: {
      "hydraulic-reversible-plough": {
        title: "Hydraulic Reversible Plough",
        category: "Ploughing",
        excerpt:
          "Two-way ploughing with hydraulic turnover for level, furrow-free fields and higher daily output.",
      },
      ploughs: {
        title: "Plough",
        category: "Ploughing",
        excerpt:
          "Heavy-duty mouldboard and disc ploughs engineered for deep primary tillage in tough soils.",
      },
      "tractor-cultivator": {
        title: "Cultivators",
        category: "Tillage",
        excerpt:
          "Spring-loaded tractor cultivators for fast, uniform secondary tillage and weed control.",
      },
      "chisel-plough": {
        title: "Chisel Plough",
        category: "Tillage",
        excerpt:
          "Breaks hardpan and improves water infiltration without inverting the soil profile.",
      },
      "disc-harrow": {
        title: "Disc Harrow",
        category: "Seedbed",
        excerpt:
          "Offset and trailed disc harrows that cut residue and prepare a fine, firm seedbed.",
      },
      "land-leveller": {
        title: "Land Leveller",
        category: "Land Prep",
        excerpt:
          "Precision land levellers for efficient irrigation, reduced water use and better yields.",
      },
    },
  },

  productsPage: {
    metaTitle: "Products",
    metaDescription:
      "Explore our full range of tractor-mounted agricultural machinery — ploughs, cultivators, harrows, land levellers and more.",
    headerDescription:
      "A complete range of tractor-mounted implements engineered for every stage of farming.",
    resultsOne: "Showing {count} result for “{query}”",
    resultsOther: "Showing {count} results for “{query}”",
    noResults: "No products matched your search. Try a different term or browse all products.",
  },

  productDetail: {
    intro:
      "The {product} from {company} is engineered for dependable performance season after season.",
    highlights: [
      "High-grade steel construction for long service life",
      "Field-tested across diverse Indian soil conditions",
      "Low maintenance with readily available genuine spares",
      "Compatible with a wide range of tractor HP categories",
    ],
    notFound: "Product not found",
  },

  blog: {
    /** Keyed by the slugs in lib/data.ts */
    items: {
      "mini-bund-former-plough-compact-solution": {
        title:
          "Mini Bund Former Plough — A Compact Solution for Efficient Farmland Management",
        excerpt:
          "How a compact bund former helps small and medium farms shape field boundaries and conserve water without heavy machinery.",
        category: "Equipment",
      },
      "modern-farm-machinery-improving-efficiency": {
        title: "Modern Farm Machinery: Improving Efficiency with Better Equipment",
        excerpt:
          "From tillage to levelling, the right tractor-mounted equipment can dramatically cut costs and boost yields.",
        category: "Guides",
      },
      "disc-plough-vs-disc-harrow-key-differences": {
        title: "Disc Plough vs. Disc Harrow: Key Differences & Uses",
        excerpt:
          "Two implements, two very different jobs. Here is how to pick the right one for each stage of soil preparation.",
        category: "Tillage",
      },
    },
    author: "Editorial Team",
  },

  newsPage: {
    metaTitle: "News & Articles",
    metaDescription: "Product news, farming guides and equipment insights from our team.",
    articleNotFound: "Article not found",
    intro:
      "At {company}, we believe the right equipment transforms how farms operate. This article explores the practical considerations behind {title}, drawing on decades of manufacturing experience and feedback from farmers across the country.",
    whyHeading: "Why it matters",
    why: "Choosing and maintaining the correct implement directly affects fuel use, soil health and ultimately yield. Modern tractor-mounted machinery is engineered to deliver consistent results while reducing the labour and time required for each operation.",
    recommendationHeading: "Our recommendation",
    recommendation:
      "Speak with our team about your soil type, tractor HP and acreage and we'll help you match the ideal implement. Every machine is backed by genuine spare parts and a nationwide dealer network.",
  },

  about: {
    metaTitle: "About Us",
    metaDescription:
      "Learn about {company} — over {years} years of manufacturing reliable, tractor-mounted agricultural machinery.",
    title: "About Us",
    headerDescription:
      "Over {years} years of diligence, quality and partnership with the agricultural community.",
    storyEyebrow: "Our story",
    storyTitle: "A trusted name in agricultural machinery since {year}",
    storyBody1:
      "{company} began with a simple goal: to build farm equipment that farmers can depend on. Four decades later, we manufacture a comprehensive range of tractor-mounted implements that combine practical engineering with modern manufacturing.",
    storyBody2:
      "From our production facility we serve a nationwide network of {dealers}+ dealers, supported by genuine spare parts and responsive service.",
    facilityLabel: "Our manufacturing facility",
    values: [
      "Reliability engineered into every implement",
      "Practical designs informed by real farming needs",
      "Quality materials and rigorous field testing",
      "Lasting partnerships with farmers and dealers",
    ],
  },

  contact: {
    metaTitle: "Contact Us",
    metaDescription:
      "Get in touch with {company} for quotes, dealership enquiries and product support.",
    title: "Contact Us",
    eyebrow: "Get in touch",
    headerDescription:
      "Have a question about our machinery or want a tailored quote? Our team is ready to help.",
    reachUs: "Reach us",
    heading: "We'd love to hear from you",
    body: "Whether you're a farmer looking for the right implement or a business interested in a dealership, get in touch and we'll respond within one business day.",
    visitUs: "Visit us",
    workingHours: "Working hours",
    hours: "Mon – Sat, 9:00 AM – 6:00 PM",
    formTitle: "Send us a message",
    formSubtitle: "Fill in the form and our team will get back to you shortly.",
  },

  dealer: {
    metaTitle: "Become a Dealer",
    metaDescription:
      "Partner with {company}. Join our nationwide dealer network and grow your agricultural machinery business.",
    title: "Become a Dealer",
    eyebrow: "Partner with us",
    headerDescription:
      "Join our growing network of dealers and bring trusted agricultural machinery to farmers in your region.",
    whyEyebrow: "Why partner with us",
    whyTitle: "Grow your business with a trusted brand",
    whyBody:
      "We're always looking for committed partners to expand our reach. As a dealer you'll benefit from a proven product range, genuine parts and dedicated support.",
    benefits: [
      {
        title: "Strong margins",
        text: "Competitive dealer pricing and healthy returns on a trusted product range.",
      },
      {
        title: "Genuine parts supply",
        text: "Reliable access to genuine spares keeps your customers running and loyal.",
      },
      {
        title: "Sales & service support",
        text: "Training, marketing material and responsive support from our team.",
      },
      {
        title: "Established brand",
        text: "Over {years} years of reputation behind every sale.",
      },
    ],
    formTitle: "Dealership enquiry",
    formSubtitle:
      "Tell us about your business and region — our team will reach out to discuss the opportunity.",
    submit: "Apply for Dealership",
  },

  careers: {
    metaTitle: "Careers",
    metaDescription:
      "Build your career with {company}. Explore opportunities in manufacturing, engineering, sales and support.",
    title: "Careers",
    eyebrow: "Join the team",
    headerDescription:
      "We're always looking for talented people who share our passion for building dependable agricultural machinery.",
    noOpenings: "No open positions right now",
    body: "We don't have any vacancies listed at the moment, but we're always glad to hear from skilled professionals in manufacturing, engineering, sales and after-sales support. Send us your résumé and we'll keep it on file.",
    emailResume: "Email your résumé",
  },

  events: {
    metaTitle: "Our Events",
    metaDescription: "Exhibitions, dealer meets and farm demonstrations we take part in.",
    title: "Our Events",
    headerDescription:
      "Meet us at exhibitions, dealer meets and on-field demonstrations across the country.",
    items: [
      {
        title: "National Agri Machinery Expo",
        date: "12 – 15 March 2026",
        location: "Pune, Maharashtra",
      },
      { title: "Regional Dealer Meet", date: "08 February 2026", location: "Rajkot, Gujarat" },
      {
        title: "Live Field Demonstration",
        date: "20 January 2026",
        location: "Ludhiana, Punjab",
      },
      {
        title: "Kisan Agri Show",
        date: "05 – 07 December 2025",
        location: "Nashik, Maharashtra",
      },
    ],
  },

  photoGallery: {
    metaTitle: "Photo Gallery",
    metaDescription: "Photos from our manufacturing facility, products and field operations.",
    title: "Our Photo Gallery",
    headerDescription: "A look inside our manufacturing, products and the farms we serve.",
    photos: [
      "Manufacturing floor",
      "Plough assembly",
      "Field testing",
      "Quality inspection",
      "Harvest season",
      "Disc harrow line",
      "Dealer meet",
      "Land levelling",
    ],
  },

  videoGallery: {
    metaTitle: "Video Gallery",
    metaDescription: "Product walkthroughs, field demonstrations and company videos.",
    title: "Our Video Gallery",
    headerDescription: "Watch our machinery at work and learn more about how we build it.",
    videos: [
      "Company Overview",
      "Hydraulic Reversible Plough in Action",
      "Disc Harrow Field Demo",
      "Land Leveller Walkthrough",
    ],
  },

  privacy: {
    metaTitle: "Privacy Policy",
    metaDescription: "How {company} collects, uses and protects your personal information.",
    title: "Privacy Policy",
    headerDescription:
      "Your privacy matters to us. This policy explains how we handle your information.",
    lastUpdated: "Last updated:",
    sections: [
      {
        heading: "Information we collect",
        body: "When you submit an enquiry or quote request we collect the details you provide — your name, email, phone number and message — solely to respond to your request.",
      },
      {
        heading: "How we use your information",
        body: "We use your information to respond to enquiries, prepare quotes, process dealership applications and, where you have consented, to send relevant product updates. We do not sell your data.",
      },
      {
        heading: "Data retention",
        body: "We keep enquiry information only as long as necessary to serve your request and to comply with applicable legal obligations.",
      },
      {
        heading: "Cookies",
        body: "Our website may use essential cookies to ensure the site functions correctly. You can control cookies through your browser settings.",
      },
      {
        heading: "Your rights",
        body: "You may request access to, correction of, or deletion of your personal data at any time by contacting us using the details below.",
      },
    ],
    contactHeading: "Contact us",
    contactBody: "For any privacy-related questions, contact us at",
    or: "or",
  },

  notFound: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved. Explore our products or get in touch with our team.",
  },

  error: {
    title: "Something went wrong",
    body: "An unexpected error occurred. Please try again — if the problem persists, contact our team.",
  },
};

export type Dictionary = typeof en;
