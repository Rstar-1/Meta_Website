const SITE_URL = (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Roxy Enterprises";
const DEFAULT_IMAGE = import.meta.env.VITE_SEO_IMAGE || "/products/roxy/logo.png";

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };

export const siteInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    import.meta.env.VITE_SEO_DESCRIPTION ||
    "Roxy Enterprises is a premier Exporter, Stockiest, & Supplier of Stainless Steel, Nickel Alloy, Alloy Steel, & Carbon Steel Pipes, Plates, Flanges, and Fittings based in Mumbai.",
  phone: import.meta.env.VITE_PHONE || "+91 97692 57080",
  email: import.meta.env.VITE_EMAIL || "roxyenterprises91@gmail.com",

  address: {
    streetAddress: "Office no.12, 2nd Floor, 20/26, Doctor Building D Block, Maruti Mandir Marg, 5th Kumbharwada",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400004",
    addressCountry: "IN",
    fullAddress: import.meta.env.VITE_ADDRESS || "Office no.12, 2nd Floor, 20/26, Doctor Building D Block, Maruti Mandir Marg, 5th Kumbharwada, Mumbai 400004 (MH), India",
  },

  geo: {
    latitude: 18.9595,
    longitude: 72.8239,
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
    title: import.meta.env.VITE_SEO_TITLE || "Roxy Enterprises - Exporter, Stockiest & Supplier of Stainless Steel & Nickel Alloys | Mumbai",
    description:
      import.meta.env.VITE_SEO_DESCRIPTION ||
      "Roxy Enterprises is a leading Exporter, Stockiest, & Supplier of Stainless Steel, Nickel Alloy, Alloy Steel, & Carbon Steel Pipes, Plates, Flanges, and Fittings. Tested with 3.1/3.2 Mill Test Certificates.",
    path: "/home",
    breadcrumbs: [{ label: "Home", path: "/home" }],
  },

  about: {
    title: "About Us | Roxy Enterprises - Metal & Steel Exporter Mumbai",
    description:
      "Learn about Roxy Enterprises, our Mumbai stockyard, our mission, vision, and core steel product portfolio with complete 3.1/3.2 Mill Test Certificates.",
    path: "/about",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "About Us", path: "/about" },
    ],
  },

  product: {
    title: "Steel, Nickel Alloys & Metal Products | Roxy Enterprises",
    description:
      "Explore Pipes & Tubes, Industrial Plates, Flanges, Butt-Weld Fittings, Nickel Alloys, Circles, and Fasteners from Roxy Enterprises.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  products: {
    title: "Steel, Nickel Alloys & Metal Products | Roxy Enterprises",
    description:
      "Explore Pipes & Tubes, Industrial Plates, Flanges, Butt-Weld Fittings, Nickel Alloys, Circles, and Fasteners from Roxy Enterprises.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  productDetail: {
    title: "Product Specifications & Mill Test Data | Roxy Enterprises",
    description:
      "Explore detailed specifications, ASTM/ASME standards, UNS numbers, chemical composition, and mechanical test parameters by Roxy Enterprises.",
    path: "/product-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Product Detail", path: "/product-detail" },
    ],
  },

  supplier: {
    title: "Roxy Enterprises - Exporter, Stockiest & Supplier Profile | Mumbai",
    description:
      "Verified Exporter, Stockiest, and Supplier of Stainless Steel, Nickel Alloy, and Carbon Steel. Contact: Mr. Ambalal Choudhary (+91 9769257080).",
    path: "/supplier",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Supplier Profile", path: "/supplier" },
    ],
  },

  quality: {
    title: "3.1 / 3.2 Mill Test Certificates & Quality Testing | Roxy Enterprises",
    description:
      "Discover Roxy Enterprises testing protocols: Spectro chemical analysis, hydrostatic testing, ultrasonic NDT, and EN 10204 3.1/3.2 certificates.",
    path: "/quality",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Quality", path: "/quality" },
    ],
  },

  connect: {
    title: "Connect With Us - Roxy Enterprises | Exporter, Stockiest & Supplier Mumbai",
    description:
      "Kind Attention: Procurement Department — Contact Roxy Enterprises for quotations on Stainless Steel, Nickel Alloys, Plates, and Pipes. Call +91 97692 57080.",
    path: "/connect",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Connect Us", path: "/connect" },
    ],
  },

  blog: {
    title: "Steel & Metallurgical Insights | Roxy Enterprises Blogs",
    description:
      "Technical guides on Pipe Fittings, Stainless Steel Plates, Carbon Steel Pipes, and Superalloys by Roxy Enterprises.",
    path: "/blog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Blogs", path: "/blog" },
    ],
  },

  terms: {
    title: "Terms & Conditions | Roxy Enterprises",
    description: "Terms and conditions governing industrial supply and export orders with Roxy Enterprises.",
    path: "/terms",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Terms", path: "/terms" },
    ],
  },

  privacy: {
    title: "Privacy Policy | Roxy Enterprises",
    description: "Privacy policy and corporate data protection guidelines of Roxy Enterprises.",
    path: "/privacy",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },
};

export const getUrl = (path = "") => {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

export const getImageUrl = (image = DEFAULT_IMAGE) => {
  if (!image) return DEFAULT_IMAGE;
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:")) return image;
  return `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
};

export default {
  siteInfo,
  pageSeoData,
  getUrl,
  getImageUrl,
};
