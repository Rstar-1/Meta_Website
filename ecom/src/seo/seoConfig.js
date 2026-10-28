const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://realrainwear.in").replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Real Rainwear";
const DEFAULT_IMAGE = import.meta.env.VITE_SEO_IMAGE || "https://realrainwear.in/wp-content/uploads/2025/03/real-Logo.png";

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };

export const siteInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    import.meta.env.VITE_SEO_DESCRIPTION ||
    "Real Rainwear is India's premier manufacturer and exporter of premium raincoats, rain suits, waterproof jackets, and ponchos for men, women, and kids since 1979.",
  phone: import.meta.env.VITE_PHONE || "+91 8104013898",
  email: import.meta.env.VITE_EMAIL || "info@realrainwear.in",

  address: {
    streetAddress: "3, 222, Durya Mansion, Kambekar Street, Masjid",
    addressLocality: "Mandvi, Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400003",
    addressCountry: "IN",
    fullAddress: import.meta.env.VITE_ADDRESS || "3, 222, Durya Mansion, Kambekar Street, Masjid, Mandvi, Mumbai, Maharashtra - 400003, India",
  },

  geo: {
    latitude: 18.9535,
    longitude: 72.8385,
  },

  sameAs: [
    import.meta.env.VITE_SOCIAL_INSTAGRAM,
    import.meta.env.VITE_SOCIAL_YOUTUBE,
    import.meta.env.VITE_SOCIAL_FACEBOOK,
    import.meta.env.VITE_SOCIAL_LINKEDIN,
    import.meta.env.VITE_SOCIAL_TWITTER,
  ].filter(Boolean),
};

export const pageSeoData = {
  home: {
    title: import.meta.env.VITE_SEO_TITLE || "Real Rainwear | Premium Raincoats for Men, Women & Kids",
    description:
      import.meta.env.VITE_SEO_DESCRIPTION ||
      "Shop high-quality raincoats, rain suits & ponchos at Real Rainwear. Durable, stylish, and waterproof gear for all ages. Since 1979.",
    path: "/home",
    breadcrumbs: [{ label: "Home", path: "/home" }],
  },

  about: {
    title: "About Real Rainwear | India's Premium Rainwear Brand Since 1979",
    description:
      "Discover the heritage of Real Rainwear, pioneering waterproof raincoats and suits with craftsmanship and innovation since 1979.",
    path: "/about",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "About Us", path: "/about" },
    ],
  },

  product: {
    title: "Raincoats, Rainsuits & Waterproof Gear | Real Rainwear",
    description:
      "Explore men's rain suits, women's raincoats, kids' school rainwear, and trekking ponchos by Real Rainwear.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  products: {
    title: "Raincoats, Rainsuits & Waterproof Gear | Real Rainwear",
    description:
      "Explore men's rain suits, women's raincoats, kids' school rainwear, and trekking ponchos by Real Rainwear.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  productDetail: {
    title: "Rainwear Product Details | Real Rainwear",
    description:
      "Explore detailed specifications, waterproof ratings, seam construction, and sizing for Real Rainwear products.",
    path: "/product-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Product Detail", path: "/product-detail" },
    ],
  },

  supplier: {
    title: "Real Rainwear - Manufacturing & Wholesale Distribution | Mumbai",
    description:
      "Real Rainwear wholesale supplier and exporter of heavy-duty rain suits, raincoats and monsoon essentials from Mumbai, Maharashtra.",
    path: "/supplier",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Supplier Profile", path: "/supplier" },
    ],
  },

  quality: {
    title: "Waterproof Quality & Standards | Real Rainwear",
    description:
      "Explore Real Rainwear's manufacturing quality, 100% heat-sealed taped seam testing, and leak-proof standards.",
    path: "/quality",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Quality", path: "/quality" },
    ],
  },

  connect: {
    title: "Contact Real Rainwear | Mumbai Showroom & Factory Enquiry",
    description:
      "Contact Real Rainwear for retail, dealership, and wholesale bulk rainwear enquiries. Visit our showroom in Mandvi, Mumbai.",
    path: "/connect",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Connect Us", path: "/connect" },
    ],
  },

  blog: {
    title: "Rainwear Buying Guides & Monsoon Insights | Real Rainwear",
    description:
      "Read expert guides on choosing the best raincoats for men, women & kids, trekking poncho selection, and monsoon garment care by Real Rainwear.",
    path: "/blog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
    ],
  },

  blogDetail: {
    title: "Monsoon & Rainwear Articles | Real Rainwear",
    description:
      "Latest tips, maintenance guides, and fabric technology updates on waterproof rainwear by Real Rainwear.",
    path: "/blog-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "News & Media", path: "/blog" },
      { label: "Blog Detail", path: "/blog-detail" },
    ],
  },

  privacy: {
    title: "Privacy Policy | Real Rainwear",
    description: "Read the Real Rainwear privacy policy.",
    path: "/privacy",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },

  terms: {
    title: "Terms & Conditions | Real Rainwear",
    description: "Read the terms and conditions of Real Rainwear.",
    path: "/terms",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Terms & Conditions", path: "/terms" },
    ],
  },
};

export const aeoFAQs = [
  {
    question: "What is Real Rainwear?",
    answer:
      "Real Rainwear is India's premier rainwear manufacturer and exporter established in 1979, specializing in durable raincoats, biker rain suits, kids rainwear, and ponchos.",
  },
  {
    question: "What types of rainwear does Real Rainwear manufacture?",
    answer:
      "Real Rainwear manufactures men's heavy-duty and biker rainsuits, women's stylish trench coats and skirt suits, children's school raincoats with backpack covers, and trekking ponchos.",
  },
  {
    question: "Where is Real Rainwear located?",
    answer:
      "Real Rainwear is based at 3, 222, Durya Mansion, Kambekar Street, Masjid, Mandvi, Mumbai, Maharashtra - 400003, India.",
  },
  {
    question: "How can I purchase or enquire about wholesale rainwear orders?",
    answer:
      "You can contact Real Rainwear via phone / WhatsApp at +91 8104013898 or email at info@realrainwear.in for distributor, retail, and wholesale enquiries.",
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
