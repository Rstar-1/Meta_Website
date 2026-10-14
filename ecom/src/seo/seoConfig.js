const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://www.jubilantmetal.com").replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Jubilant Metal And Alloys";
const DEFAULT_IMAGE = import.meta.env.VITE_SEO_IMAGE || "/metal/jubilant_logo_transparent.png";

export const getUrl = (path = "/") => {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const getImageUrl = (image) => {
  if (!image) return getUrl(DEFAULT_IMAGE);
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return getUrl(image);
};

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };

export const siteInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    import.meta.env.VITE_SEO_DESCRIPTION ||
    "Jubilant Metal And Alloys is a leading ISO 9001:2008 certified manufacturer, stockist, and exporter of Stainless Steel Pipes, Tubes, Flanges, Buttweld Pipe Fittings, Forged Fittings, and Fasteners based in Mumbai, India.",
  phone: import.meta.env.VITE_PHONE || "+91 9820171740",
  email: import.meta.env.VITE_EMAIL || "info@jubilantmetal.com",

  address: {
    streetAddress: "Shop No 6, A Wing, 1st Floor, Nakoda Mehta Sunshine Heights, Khadilkar Road, Sadashiv Lane, Kakadwadi, Girgaon",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400004",
    addressCountry: "IN",
    fullAddress: import.meta.env.VITE_ADDRESS || "Shop No 6, A Wing, 1st Floor, Nakoda Mehta Sunshine Heights, Khadilkar Road, Sadashiv Lane, Kakadwadi, Girgaon, Mumbai - 400004, Maharashtra, India",
  },

  geo: {
    latitude: 18.9553,
    longitude: 72.8205,
  },

  sameAs: [
    import.meta.env.VITE_SOCIAL_INSTAGRAM,
    import.meta.env.VITE_SOCIAL_YOUTUBE,
    import.meta.env.VITE_SOCIAL_FACEBOOK,
    import.meta.env.VITE_SOCIAL_LINKEDIN,
  ].filter(Boolean),
};

export const pageSeoData = {
  home: {
    title: import.meta.env.VITE_SEO_TITLE || "Stainless Steel Pipes, Flanges, Fittings & Fasteners | Jubilant Metal And Alloys",
    description:
      import.meta.env.VITE_SEO_DESCRIPTION ||
      "Jubilant Metal And Alloys is a leading ISO 9001:2008 certified manufacturer, stockist, and exporter of Stainless Steel Pipes, Tubes, Flanges, Buttweld Pipe Fittings, Forged Fittings, and Fasteners based in Mumbai, India.",
    path: "/home",
    breadcrumbs: [{ label: "Home", path: "/home" }],
  },

  about: {
    title: "About Us | Jubilant Metal And Alloys Mumbai",
    description:
      "Learn about Jubilant Metal And Alloys, our 25+ years of industry leadership, ISO 9001:2008 certification, and global supply footprint across 80+ countries.",
    path: "/about",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "About Us", path: "/about" },
    ],
  },

  product: {
    title: "Stainless Steel & Nickel Alloys Products Catalog | Jubilant Metal And Alloys",
    description:
      "Browse our comprehensive stock of ASTM A312 SS pipes, ASME B16.5 flanges, buttweld fittings, forged fittings, and high-tensile fasteners.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  products: {
    title: "Stainless Steel & Nickel Alloys Products Catalog | Jubilant Metal And Alloys",
    description:
      "Browse our comprehensive stock of ASTM A312 SS pipes, ASME B16.5 flanges, buttweld fittings, forged fittings, and high-tensile fasteners.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  productDetail: {
    title: "Product Specifications & Technical Datasheets | Jubilant Metal And Alloys",
    description:
      "Technical datasheets, chemical composition, mechanical properties, dimension charts, and MTC test certification for stainless steel and alloy products.",
    path: "/product-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Product Detail", path: "/product-detail" },
    ],
  },

  supplier: {
    title: "Supplier Factsheet & Manufacturing Profile | Jubilant Metal And Alloys",
    description:
      "Verified enterprise factsheet, GSTIN 27ATUPD4241P1Z3, ISO certification, testing lab credentials, and mill capabilities of Jubilant Metal Mumbai.",
    path: "/supplier",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Supplier Profile", path: "/supplier" },
    ],
  },

  quality: {
    title: "Quality Assurance & MTC EN 10204 3.1 | Jubilant Metal And Alloys",
    description:
      "Our rigorous 5-stage quality assurance: 100% PMI testing, hydrostatic testing, radiography, ultrasonic testing, and third-party inspection.",
    path: "/quality",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Quality", path: "/quality" },
    ],
  },

  connect: {
    title: "Contact & RFQ | Jubilant Metal And Alloys Mumbai",
    description:
      "Send your material requirements, RFQ, or reach out to Director Virendra Desai directly at +91 9820171740 or info@jubilantmetal.com.",
    path: "/connect",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Connect Us", path: "/connect" },
    ],
  },

  blog: {
    title: "Piping & Metallurgy Technical Insights | Jubilant Metal And Alloys",
    description:
      "Expert engineering guides on stainless steel ASTM/ASME standards, corrosion resistance, flange ratings, and duplex alloy selection.",
    path: "/blog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
    ],
  },

  blogDetail: {
    title: "Technical Engineering Articles | Jubilant Metal And Alloys",
    description:
      "Latest technical insights and specifications on stainless steel pipes, fittings, flanges, and high-performance alloys.",
    path: "/blog-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
      { label: "Blog Detail", path: "/blog-detail" },
    ],
  },

  privacy: {
    title: "Privacy Policy | Jubilant Metal And Alloys",
    description: "Read the Jubilant Metal And Alloys privacy policy.",
    path: "/privacy",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },

  terms: {
    title: "Terms & Conditions | Jubilant Metal And Alloys",
    description: "Read the Jubilant Metal And Alloys terms and conditions.",
    path: "/terms",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Terms & Conditions", path: "/terms" },
    ],
  },
};

export default {
  SITE_URL,
  SITE_NAME,
  DEFAULT_IMAGE,
  siteInfo,
  pageSeoData,
};
