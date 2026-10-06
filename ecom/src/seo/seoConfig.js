const SITE_URL = import.meta.env.VITE_SITE_URL.replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME;
const DEFAULT_IMAGE = "/sobo_logo.webp";

export const siteGeo = {
  region: "IN-MH",
  placename: "Mumbai",
  position: "18.9220;72.8347",
  icbm: "18.9220, 72.8347",
  streetAddress: "Apollo Bandar, Colaba",
  addressLocality: "Mumbai",
  addressRegion: "Maharashtra",
  postalCode: "400001",
  addressCountry: "IN",
  telephone: import.meta.env.VITE_PHONE,
  email: import.meta.env.VITE_EMAIL,
};

export const sitelinks = [
  {
    name: "About Us",
    description:
      "Learn about Ashmita Vinyls, our manufacturing capabilities, quality focus, and commitment to supplying dependable PVC vinyl products.",
    url: `${SITE_URL}/about`,
  },
  {
    name: "Products",
    description:
      "Explore PVC vinyl products from Ashmita Vinyls for commercial and industrial requirements.",
    url: `${SITE_URL}/product`,
  },
  {
    name: "Applications & Industries",
    description:
      "Discover the industries and applications served by Ashmita Vinyls PVC vinyl solutions.",
    url: `${SITE_URL}/supplier`,
  },
  {
    name: "Contact Us",
    description:
      "Contact Ashmita Vinyls for PVC vinyl product enquiries, specifications, and bulk requirements.",
    url: `${SITE_URL}/connect`,
  },
  {
    name: "News & Blog",
    description:
      "Latest insights, technical articles, and updates on PVC and vinyl solutions from Ashmita Vinyls.",
    url: `${SITE_URL}/blog`,
  },
  {
    name: "Terms & Conditions",
    description:
      "Read the terms and conditions governing the use of the Ashmita Vinyls website and services.",
    url: `${SITE_URL}/terms`,
  },
  {
    name: "Privacy Policy",
    description:
      "Read the Ashmita Vinyls privacy policy to understand how information submitted is handled.",
    url: `${SITE_URL}/privacy`,
  },
];

export const aeoFAQs = [
  {
    question: "What is Ashmita Vinyls?",
    answer:
      "Ashmita Vinyls is a leading PVC vinyl products manufacturer and supplier in India, providing high-quality vinyl solutions for diverse commercial and industrial applications.",
  },
  {
    question: "What products does Ashmita Vinyls manufacture?",
    answer:
      "Ashmita Vinyls manufactures and supplies a comprehensive range of PVC vinyl products, industrial vinyl solutions, custom formulations, and commercial vinyl materials engineered for durability.",
  },
  {
    question: "How can I enquire about PVC vinyl products or bulk orders?",
    answer:
      "You can contact Ashmita Vinyls via our Contact page, email kohad0681@gmail.com, or call +91 7015163045 for product specifications, technical details, and B2B pricing.",
  },
  {
    question: "Where does Ashmita Vinyls supply its products?",
    answer:
      "Ashmita Vinyls manufactures and supplies quality PVC vinyl products across India for industrial, commercial, and enterprise clients.",
  },
];

export const pageSeoData = {
  home: {
    title: "PVC Vinyl Products Manufacturer in India | Ashmita Vinyls",
    description:
      "Ashmita Vinyls manufactures and supplies quality PVC vinyl products for commercial and industrial applications. Explore reliable vinyl solutions from India.",
    keywords:
      "PVC vinyl products manufacturer India, PVC vinyl manufacturer, vinyl products supplier, plastic products manufacturer, Ashmita Vinyls",
    path: "/home",
  },
  about: {
    title: "About Ashmita Vinyls | PVC Vinyl Manufacturer in India",
    description:
      "Learn about Ashmita Vinyls, our manufacturing capabilities, quality focus and commitment to supplying dependable PVC vinyl products to customers across India.",
    keywords:
      "Ashmita Vinyls company, PVC vinyl manufacturer India, vinyl manufacturing company, about Ashmita Vinyls",
    path: "/about",
  },
  product: {
    title: "PVC Vinyl Products & Solutions | Ashmita Vinyls",
    description:
      "Explore PVC vinyl products from Ashmita Vinyls for commercial and industrial requirements. Discover quality-focused vinyl solutions and request product details.",
    keywords:
      "PVC vinyl products, PVC products manufacturer, vinyl product range, PVC vinyl supplier, Ashmita Vinyls",
    path: "/product",
  },
  products: {
    title: "PVC Vinyl Products & Solutions | Ashmita Vinyls",
    description:
      "Explore PVC vinyl products from Ashmita Vinyls for commercial and industrial requirements. Discover quality-focused vinyl solutions and request product details.",
    keywords:
      "PVC vinyl products, PVC products manufacturer, vinyl product range, PVC vinyl supplier, Ashmita Vinyls",
    path: "/products",
  },
  productDetail: {
    title: "PVC Vinyl Manufacturer & Supplier in India | Ashmita Vinyls",
    description:
      "Looking for PVC vinyl products? Ashmita Vinyls supplies quality vinyl solutions for diverse commercial and industrial applications across India.",
    keywords:
      "PVC vinyl manufacturer, PVC vinyl supplier India, PVC vinyl products, industrial vinyl, Ashmita Vinyls",
    path: "/product-detail",
  },
  supplier: {
    title: "PVC Vinyl Applications & Industries | Ashmita Vinyls",
    description:
      "Discover the industries and applications served by Ashmita Vinyls. Explore PVC vinyl solutions designed for varied commercial and industrial requirements.",
    keywords:
      "PVC vinyl applications, industrial PVC vinyl, commercial vinyl applications, Ashmita Vinyls",
    path: "/supplier",
  },
  applications: {
    title: "PVC Vinyl Applications & Industries | Ashmita Vinyls",
    description:
      "Discover the industries and applications served by Ashmita Vinyls. Explore PVC vinyl solutions designed for varied commercial and industrial requirements.",
    keywords:
      "PVC vinyl applications, industrial PVC vinyl, commercial vinyl applications, Ashmita Vinyls",
    path: "/supplier",
  },
  quality: {
    title: "PVC Vinyl Manufacturing Quality & Infrastructure | Ashmita Vinyls",
    description:
      "Explore Ashmita Vinyls' manufacturing approach, quality focus and infrastructure supporting consistent PVC vinyl products for business requirements.",
    keywords:
      "PVC vinyl manufacturing quality, vinyl manufacturing process, quality PVC products, Ashmita Vinyls",
    path: "/quality",
  },
  connect: {
    title: "Contact Ashmita Vinyls | PVC Vinyl Product Enquiry",
    description:
      "Contact Ashmita Vinyls for PVC vinyl product enquiries, specifications, bulk requirements and business discussions. Send your requirement to our team today.",
    keywords:
      "contact PVC vinyl manufacturer, PVC vinyl supplier enquiry, vinyl manufacturer contact, Ashmita Vinyls",
    path: "/connect",
  },
  contact: {
    title: "Contact Ashmita Vinyls | PVC Vinyl Product Enquiry",
    description:
      "Contact Ashmita Vinyls for PVC vinyl product enquiries, specifications, bulk requirements and business discussions. Send your requirement to our team today.",
    keywords:
      "contact PVC vinyl manufacturer, PVC vinyl supplier enquiry, vinyl manufacturer contact, Ashmita Vinyls",
    path: "/connect",
  },
  privacy: {
    title: "Privacy Policy | Ashmita Vinyls",
    description:
      "Read the Ashmita Vinyls privacy policy to understand how information submitted through our website is collected, used and handled.",
    keywords:
      "Ashmita Vinyls privacy policy, website privacy policy, privacy policy",
    path: "/privacy",
  },
  terms: {
    title: "Terms & Conditions | Ashmita Vinyls",
    description:
      "Read the terms and conditions governing the use of the Ashmita Vinyls website, content, enquiries and related website services.",
    keywords:
      "Ashmita Vinyls terms and conditions, website terms, terms and conditions",
    path: "/terms",
  },
  blog: {
    title: "News & Industry Insights | Ashmita Vinyls",
    description:
      "Stay updated with the latest news, product innovations, and industrial insights on PVC and vinyl solutions from Ashmita Vinyls.",
    keywords:
      "Ashmita Vinyls blog, PVC vinyl news, vinyl industry articles, PVC manufacturing updates",
    path: "/blog",
  },
  blogDetail: {
    title: "News & Industry Insights | Ashmita Vinyls",
    description:
      "Stay updated with the latest news, product innovations, and industrial insights on PVC and vinyl solutions from Ashmita Vinyls.",
    keywords:
      "Ashmita Vinyls blog, PVC vinyl news, vinyl industry articles, PVC manufacturing updates",
    path: "/blog-detail",
  },
};

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };
