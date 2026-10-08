const SITE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Ashmita Vinyls";
const DEFAULT_IMAGE = import.meta.env.VITE_SEO_IMAGE || "/sobo_logo.webp";

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };

export const siteInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    import.meta.env.VITE_SEO_DESCRIPTION ||
    "Ashmita Vinyls manufactures and supplies PVC vinyl products for commercial and industrial applications.",
  phone: import.meta.env.VITE_PHONE || "07942562287",
  email: import.meta.env.VITE_EMAIL || "info@ashmitavinyls.com",

  address: {
    streetAddress: "C 304, 3rd Floor, Eastern Business District, L.B.S Marg Road, Bhandup West",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400078",
    addressCountry: "IN",
    fullAddress: import.meta.env.VITE_ADDRESS || "Ashmita Enterprises C 304, 3 Rd Floor, Eastern Business Distric, Near Mangatram Petrol Pump L.B.S Marg Road, Bhandup West, Mumbai City, Mumbai - 400078, Maharashtra, India",
  },

  geo: {
    latitude: 19.1485,
    longitude: 72.9367,
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
    title: import.meta.env.VITE_SEO_TITLE || "PVC Vinyl Products Manufacturer in India | Ashmita Vinyls",
    description:
      import.meta.env.VITE_SEO_DESCRIPTION ||
      "Ashmita Vinyls manufactures and supplies PVC vinyl products for commercial and industrial applications across India.",
    path: "/home",
    breadcrumbs: [{ label: "Home", path: "/home" }],
  },

  about: {
    title: "About Ashmita Vinyls | PVC Vinyl Manufacturer in India",
    description:
      "Learn about Ashmita Vinyls, our PVC vinyl manufacturing capabilities, quality focus and industrial solutions.",
    path: "/about",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "About Us", path: "/about" },
    ],
  },

  product: {
    title: "PVC Vinyl Products & Solutions | Ashmita Vinyls",
    description:
      "Explore PVC vinyl products and industrial vinyl solutions from Ashmita Vinyls.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  products: {
    title: "PVC Vinyl Products & Solutions | Ashmita Vinyls",
    description:
      "Explore PVC vinyl products and industrial vinyl solutions from Ashmita Vinyls.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  productDetail: {
    title: "PVC Vinyl Product Details | Ashmita Vinyls",
    description:
      "Explore detailed specifications, technical parameters, and applications for PVC vinyl products by Ashmita Vinyls.",
    path: "/product-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Product Detail", path: "/product-detail" },
    ],
  },

  supplier: {
    title: "PVC Vinyl Applications & Industries | Ashmita Vinyls",
    description:
      "Discover industries and applications using Ashmita Vinyls PVC vinyl solutions.",
    path: "/supplier",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Supplier Profile", path: "/supplier" },
    ],
  },

  quality: {
    title: "PVC Vinyl Manufacturing Quality | Ashmita Vinyls",
    description:
      "Explore Ashmita Vinyls manufacturing quality, infrastructure and PVC vinyl production capabilities.",
    path: "/quality",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Quality", path: "/quality" },
    ],
  },

  connect: {
    title: "Contact Ashmita Vinyls | PVC Vinyl Product Enquiry",
    description:
      "Contact Ashmita Vinyls for PVC vinyl product enquiries, specifications and bulk requirements.",
    path: "/connect",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Connect Us", path: "/connect" },
    ],
  },

  blog: {
    title: "PVC Vinyl News & Industry Insights | Ashmita Vinyls",
    description:
      "Read PVC vinyl industry news, product information, technical articles and business insights.",
    path: "/blog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
    ],
  },

  blogDetail: {
    title: "PVC Vinyl News & Articles | Ashmita Vinyls",
    description:
      "Latest technical insights, case studies, and updates on PVC vinyl solutions by Ashmita Vinyls.",
    path: "/blog-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
      { label: "Blog Detail", path: "/blog-detail" },
    ],
  },

  privacy: {
    title: "Privacy Policy | Ashmita Vinyls",
    description: "Read the Ashmita Vinyls privacy policy.",
    path: "/privacy",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },

  terms: {
    title: "Terms & Conditions | Ashmita Vinyls",
    description: "Read the terms and conditions of Ashmita Vinyls.",
    path: "/terms",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Terms & Conditions", path: "/terms" },
    ],
  },
};

export const aeoFAQs = [
  {
    question: "What is Ashmita Vinyls?",
    answer:
      "Ashmita Vinyls is a PVC vinyl products manufacturer and supplier in India serving commercial and industrial requirements.",
  },
  {
    question: "What products does Ashmita Vinyls supply?",
    answer:
      "Ashmita Vinyls supplies PVC vinyl products and industrial vinyl solutions for different commercial and industrial applications.",
  },
  {
    question: "How can I enquire about PVC vinyl products?",
    answer:
      "You can contact Ashmita Vinyls through the website contact page, phone or email for product specifications and bulk enquiries.",
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
