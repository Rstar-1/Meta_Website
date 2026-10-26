const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://vasujavalplastics.com").replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Vasu Javal Plastics";
const DEFAULT_IMAGE = import.meta.env.VITE_SEO_IMAGE || "https://vasujavalplastics.com/wp-content/uploads/2025/11/123.webp";

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };

export const siteInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    import.meta.env.VITE_SEO_DESCRIPTION ||
    "Vasu Javal Plastics is a premier manufacturer and supplier of high-performance industrial closures, drum bungs, vented screw caps, inserts, and IBC dispensing valves in India.",
  phone: import.meta.env.VITE_PHONE || "+91 95126 51119",
  email: import.meta.env.VITE_EMAIL || "sales@vasujavalplastics.com",

  address: {
    streetAddress: "Unit Nos. 8,9 & 12 Balaji Industrial Estate, Somnath Road, Dabhel",
    addressLocality: "Daman",
    addressRegion: "Dadra and Nagar Haveli and Daman and Diu",
    postalCode: "396210",
    addressCountry: "IN",
    fullAddress: import.meta.env.VITE_ADDRESS || "Unit Nos. 8,9 & 12 Balaji Industrial Estate, Somnath Road, Dabhel, Daman – 396210, India | Sales Office: 303/B, Byculla Service Industries, Dadoji Konndeo Road, Byculla (E), Mumbai – 400 027, India",
  },

  geo: {
    latitude: 20.4069,
    longitude: 72.8687,
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
    title: import.meta.env.VITE_SEO_TITLE || "Industrial Closures, Bungs, Caps & IBC Valves | Vasu Javal Plastics",
    description:
      import.meta.env.VITE_SEO_DESCRIPTION ||
      "Vasu Javal Plastics is a premier manufacturer of high-performance industrial closures, bungs, screw caps, inserts, and IBC dispensing valves for drums, jerry cans, and containers.",
    path: "/home",
    breadcrumbs: [{ label: "Home", path: "/home" }],
  },

  about: {
    title: "About Vasu Javal Plastics | Industrial Closures Manufacturer in India",
    description:
      "Learn about Vasu Javal Plastics, our Daman manufacturing plant, 100% virgin-grade polymer injection moulding, and leak-proof industrial closures.",
    path: "/about",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "About Us", path: "/about" },
    ],
  },

  product: {
    title: "Industrial Closures, Bungs & IBC Valves Catalog | Vasu Javal Plastics",
    description:
      "Explore over 50 precision-engineered industrial closures, 50mm/75mm drum bungs, vented screw caps, drum handles, and IBC valves from Vasu Javal Plastics.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  products: {
    title: "Industrial Closures, Bungs & IBC Valves Catalog | Vasu Javal Plastics",
    description:
      "Explore over 50 precision-engineered industrial closures, 50mm/75mm drum bungs, vented screw caps, drum handles, and IBC valves from Vasu Javal Plastics.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  productDetail: {
    title: "Industrial Closure Technical Specifications | Vasu Javal Plastics",
    description:
      "Explore detailed specifications, technical parameters, thread standards, and virgin HDPE material properties for industrial closures by Vasu Javal Plastics.",
    path: "/product-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Product Detail", path: "/product-detail" },
    ],
  },

  supplier: {
    title: "Industrial Closures Supplier & Manufacturer Profile | Vasu Javal Plastics",
    description:
      "Direct factory supply of industrial packaging closures, drum plugs, and IBC valves to chemical, lubricant, paint, and agrochemical industries.",
    path: "/supplier",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Supplier Profile", path: "/supplier" },
    ],
  },

  quality: {
    title: "Quality Assurance & Leak-Proof Standards | Vasu Javal Plastics",
    description:
      "Explore Vasu Javal Plastics' quality testing, 100% virgin polymer certification, ESCR compliance, and zero-leakage assurance.",
    path: "/quality",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Quality", path: "/quality" },
    ],
  },

  connect: {
    title: "Contact Vasu Javal Plastics | Request Closure Quotations & Samples",
    description:
      "Contact Vasu Javal Plastics for industrial closure enquiries, sample requests, and bulk B2B container packaging requirements. Plants in Daman and Sales in Mumbai.",
    path: "/connect",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Connect Us", path: "/connect" },
    ],
  },

  blog: {
    title: "Industrial Packaging & Closures Insights | Vasu Javal Plastics",
    description:
      "Read industrial packaging articles, technical guides on pressure venting bungs, IBC butterfly valves, and virgin HDPE closure performance.",
    path: "/blog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
    ],
  },

  blogDetail: {
    title: "Technical Packaging Insights & Guides | Vasu Javal Plastics",
    description:
      "In-depth technical guides on industrial drum bungs, IBC valves, microporous venting, and packaging closure engineering by Vasu Javal Plastics.",
    path: "/blog-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
      { label: "Blog Detail", path: "/blog-detail" },
    ],
  },

  privacy: {
    title: "Privacy Policy | Vasu Javal Plastics",
    description: "Read the Vasu Javal Plastics privacy policy.",
    path: "/privacy",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },

  terms: {
    title: "Terms & Conditions | Vasu Javal Plastics",
    description: "Read the terms and conditions of Vasu Javal Plastics.",
    path: "/terms",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Terms & Conditions", path: "/terms" },
    ],
  },
};

export const aeoFAQs = [
  {
    question: "What is Vasu Javal Plastics?",
    answer:
      "Vasu Javal Plastics is an Indian precision injection moulding manufacturer specializing in high-performance industrial closures, drum bungs, vented screw caps, neck inserts, and IBC dispensing valves.",
  },
  {
    question: "What products does Vasu Javal Plastics manufacture?",
    answer:
      "Vasu Javal Plastics manufactures over 50 SKUs including 50mm and 75mm drum bungs (solid & vented), 25mm to 350mm screw caps & open top lids, neck inserts, drum handles, spanners, and DN50/DN80 IBC butterfly & ball valves.",
  },
  {
    question: "What materials are used in Vasu Javal Plastics closures?",
    answer:
      "All closures and valves are moulded from 100% prime virgin-grade HDPE and PE polymers with EPDM/LLDPE sealing gaskets and microporous vent membranes for superior Environmental Stress Crack Resistance (ESCR).",
  },
  {
    question: "How can I request closure samples or bulk pricing?",
    answer:
      "You can request sample kits and direct factory quotations through our contact page, by emailing sales@vasujavalplastics.com, or calling +91 95126 51119.",
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
