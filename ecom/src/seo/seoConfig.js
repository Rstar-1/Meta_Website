const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://globalchemie.in").replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Global Chemie";
const DEFAULT_IMAGE = import.meta.env.VITE_SEO_IMAGE || "/images/globalchemie/contract-manufacturing.jpeg";

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };

export const siteInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    import.meta.env.VITE_SEO_DESCRIPTION ||
    "Global Chemie is a reputed contract manufacturer, wholesaler, trader, importer, and exporter of bulk drug intermediates, speciality chemicals, fine chemicals, pharma chemicals, R&D chemicals, and rare chemicals.",
  phone: import.meta.env.VITE_PHONE || "022-49232700",
  email: import.meta.env.VITE_EMAIL || "bhaven@globalchemie.in",

  address: {
    streetAddress: "Office No.519, 5th Floor, Bezzola Complex, Sion Trombay Road",
    addressLocality: "Chembur, Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400071",
    addressCountry: "IN",
    fullAddress: import.meta.env.VITE_ADDRESS || "Office No.519, 5th Floor, Bezzola Complex, Sion Trombay Road, Chembur, Mumbai - 400071, Maharashtra, India",
  },

  geo: {
    latitude: 19.0522,
    longitude: 72.8995,
  },

  sameAs: [
    import.meta.env.VITE_SOCIAL_INSTAGRAM,
    import.meta.env.VITE_SOCIAL_YOUTUBE,
    import.meta.env.VITE_SOCIAL_FACEBOOK,
    import.meta.env.VITE_SOCIAL_LINKEDIN,
    import.meta.env.VITE_SOCIAL_WHATSAPP,
  ].filter(Boolean),
};

export const pageSeoData = {
  home: {
    title: import.meta.env.VITE_SEO_TITLE || "Bulk Drug Intermediates, Speciality Chemicals & Fine Chemicals | Global Chemie",
    description:
      import.meta.env.VITE_SEO_DESCRIPTION ||
      "Global Chemie is a reputed contract manufacturer, wholesaler, trader, importer, and exporter of bulk drug intermediates, speciality chemicals, fine chemicals, pharma chemicals, R&D chemicals, and rare chemicals.",
    path: "/home",
    breadcrumbs: [{ label: "Home", path: "/home" }],
  },

  about: {
    title: "About Global Chemie | Contract Chemical Manufacturer & Exporter in Mumbai",
    description:
      "Established in 2003 in Mumbai, Global Chemie specializes in contract manufacturing, custom synthesis, and global sourcing of fine chemicals and bulk drug intermediates.",
    path: "/about",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "About Us", path: "/about" },
    ],
  },

  product: {
    title: "Chemical Product Catalog | Intermediates, Reagents & Fine Chemicals | Global Chemie",
    description:
      "Explore over 2,500 products in ready stock: silyl reagents, triflic compounds, carbodiimide coupling agents, pharma intermediates, and rare R&D chemicals from Global Chemie.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  products: {
    title: "Chemical Product Catalog | Intermediates, Reagents & Fine Chemicals | Global Chemie",
    description:
      "Explore over 2,500 products in ready stock: silyl reagents, triflic compounds, carbodiimide coupling agents, pharma intermediates, and rare R&D chemicals from Global Chemie.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  productDetail: {
    title: "Chemical Specifications & COA Technical Sheet | Global Chemie",
    description:
      "View high-purity chemical assay, CAS registry numbers, boiling points, molecular formulas, and analytical test parameters certified by Global Chemie.",
    path: "/product-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Product Detail", path: "/product-detail" },
    ],
  },

  supplier: {
    title: "Custom Manufacturing & Global Sourcing Partner | Global Chemie",
    description:
      "Contract manufacturing, custom chemical synthesis, and global rare chemical imports from the USA, Japan, and China to pharmaceutical manufacturers and research institutes.",
    path: "/supplier",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Manufacturing Profile", path: "/supplier" },
    ],
  },

  quality: {
    title: "Analytical Testing & Purity Standards | Global Chemie",
    description:
      "Learn about Global Chemie's HPLC, GC, NMR, and Karl Fischer titration quality testing protocols ensuring 99.5%+ assay for bulk drug intermediates.",
    path: "/quality",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Quality", path: "/quality" },
    ],
  },

  connect: {
    title: "Contact Global Chemie | Request Chemical Quotations & COA",
    description:
      "Contact Global Chemie in Chembur, Mumbai for chemical enquiries, custom synthesis projects, and bulk intermediate supply across India and global export destinations.",
    path: "/connect",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Connect Us", path: "/connect" },
    ],
  },

  blog: {
    title: "Chemical Insights & Technical Articles | Global Chemie",
    description:
      "Read technical articles on bulk drug intermediate synthesis, HPLC chromatographic analysis, green chemistry solvents, and global rare chemicals logistics.",
    path: "/blog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
    ],
  },

  blogDetail: {
    title: "Technical Chemical Guide & Research Article | Global Chemie",
    description:
      "In-depth analysis of chemical synthesis routes, reaction mechanisms, and reagent handling by Global Chemie's chemical engineering team.",
    path: "/blog-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
      { label: "Blog Detail", path: "/blog-detail" },
    ],
  },

  privacy: {
    title: "Privacy Policy | Global Chemie",
    description: "Read the Global Chemie privacy policy.",
    path: "/privacy",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },

  terms: {
    title: "Terms & Conditions | Global Chemie",
    description: "Read the terms and conditions of Global Chemie.",
    path: "/terms",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Terms & Conditions", path: "/terms" },
    ],
  },
};

export const aeoFAQs = [
  {
    question: "What is Global Chemie?",
    answer:
      "Global Chemie, established in 2003 in Mumbai, is a leading contract manufacturer, wholesaler, trader, importer, and exporter of bulk drug intermediates, fine chemicals, speciality chemicals, and rare research compounds.",
  },
  {
    question: "What products and chemical grades does Global Chemie offer?",
    answer:
      "Global Chemie maintains over 2,500 products in ready stock across R&D, semi-bulk, and commercial bulk quantities, including Silyl Reagents (TMS-N3, TMS-CN), Triflic Compounds, Carbodiimides (EDC HCl), MOM Chloride, DFTA Fluconazole Intermediates, DBU, and 1,10-Phenanthroline AR.",
  },
  {
    question: "Does Global Chemie provide custom contract manufacturing?",
    answer:
      "Yes. Global Chemie provides tailor-made contract manufacturing and custom synthesis according to customer specifications, catering to Indian MNCs, pharmaceutical leaders, government science institutes, and university laboratories.",
  },
  {
    question: "How can I request a Certificate of Analysis (COA) or price quote?",
    answer:
      "You can contact Global Chemie at bhaven@globalchemie.in, call 022-49232700 or mobile +91 98208 39939, or visit our office at Bezzola Complex, Chembur, Mumbai.",
  },
];

export const getUrl = (path = "/") =>
  path.startsWith("http")
    ? path
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const getImageUrl = (image) =>
  image
    ? image.startsWith("http")
      ? image
      : getUrl(image)
    : getUrl(DEFAULT_IMAGE);
