const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://goonjhealthcare.com").replace(/\/$/, "");
const SITE_NAME = import.meta.env.VITE_SITE_NAME || "Goonj & Shreehari Healthcare";
const DEFAULT_IMAGE = import.meta.env.VITE_SEO_IMAGE || "/products/spaces/hospital_ward.jpg";

export { SITE_URL, SITE_NAME, DEFAULT_IMAGE };

export const siteInfo = {
  name: SITE_NAME,
  url: SITE_URL,
  description:
    import.meta.env.VITE_SEO_DESCRIPTION ||
    "Leading manufacturers & suppliers of Grade 304 Hospital Holloware, OT Surgical Lights, Autoclaves, CE-Certified First Aid Boxes, and Emergency Stretchers from Delhi & Mumbai.",
  phone: import.meta.env.VITE_PHONE || "+91 98731 98731",
  email: import.meta.env.VITE_EMAIL || "info@goonjcom.in",

  // Central Hubs
  delhiHub: {
    name: "Delhi Distribution Hub (Goonj Communication & Electronic Scale Co. / Brand CYNOR)",
    address: "58-B, Damodar Park Ind. Area, Dilshad Garden",
    locality: "Dilshad Garden",
    city: "Delhi",
    postalCode: "110095",
    country: "IN",
    phone: "+91 98731 98731",
    altPhone: "+91 98732 98731",
    email: "info@goonjcom.in",
    supportEmail: "support@goonjcom.in",
    website: "https://www.goonjcom.in",
    gstin: "07AAAFG8942K1ZV",
    fullAddress: "58-B, Damodar Park Ind. Area, Dilshad Garden, Delhi - 110095, India",
    geo: {
      latitude: 28.6835,
      longitude: 77.3178,
    },
  },

  mumbaiHub: {
    name: "Mumbai First Aid Hub (Shreehari Surgicals & Co. / Brand SUPPORT)",
    address: "11/12, 2nd floor, 290/292, Vadgadi Azad Chowk CHSL, Samuel Street",
    locality: "Masjid Bunder West",
    city: "Mumbai",
    region: "Maharashtra",
    postalCode: "400003",
    country: "IN",
    phone: "+91 98179 26992",
    altPhone: "+91 98205 60982",
    email: "shreeharisurgicals.co2022@gmail.com",
    website: "https://www.shreeharisurgicals.com",
    gstin: "27NKOPS399G1ZY",
    dlNo: "20B-MH-MZ1-521914 / 21B-MH-MZ1-521915",
    fullAddress: "11/12, 2nd floor, 290/292, Vadgadi Azad Chowk CHSL, Samuel Street Masjid Bunder West Mumbai 400003.",
    geo: {
      latitude: 18.9536,
      longitude: 72.8378,
    },
  },

  address: {
    streetAddress: "11/12, 2nd floor, 290/292, Vadgadi Azad Chowk CHSL, Samuel Street Masjid Bunder West",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400003",
    addressCountry: "IN",
    fullAddress:
      import.meta.env.VITE_ADDRESS ||
      "Delhi Hub: 58-B, Damodar Park, Dilshad Garden - 110095 | Mumbai Hub: 11/12, 2nd floor, 290/292, Vadgadi Azad Chowk CHSL, Samuel Street Masjid Bunder West Mumbai 400003.",
  },

  geo: {
    latitude: 18.9536,
    longitude: 72.8378,
  },

  sameAs: [
    import.meta.env.VITE_SOCIAL_FACEBOOK,
    import.meta.env.VITE_SOCIAL_INSTAGRAM,
    import.meta.env.VITE_SOCIAL_LINKEDIN,
    import.meta.env.VITE_SOCIAL_YOUTUBE,
    "https://www.goonjcom.in",
    "https://www.shreeharisurgicals.com",
  ].filter(Boolean),
};

export const pageSeoData = {
  home: {
    title:
      import.meta.env.VITE_SEO_TITLE ||
      "Goonj & Shreehari Healthcare | Hospital Holloware, OT Equipment & Certified First Aid Kits",
    description:
      import.meta.env.VITE_SEO_DESCRIPTION ||
      "Leading Indian manufacturers & suppliers of Grade 304 Stainless Steel Hospital Holloware, LED OT Surgical Lights, Vertical Autoclaves, Section 45 Factories Act First Aid Kits, and Emergency Stretchers.",
    path: "/home",
    breadcrumbs: [{ label: "Home", path: "/home" }],
  },

  about: {
    title: "About Us | Goonj Communication & Shreehari Surgicals Healthcare Network",
    description:
      "Learn about Goonj Communication (brand CYNOR) in Delhi and Shreehari Surgicals & Co. (brand SUPPORT) in Mumbai, delivering CE-certified hospital furniture, surgical lighting, AISI 304 holloware, and workplace trauma supplies.",
    path: "/about",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "About Us", path: "/about" },
    ],
  },

  product: {
    title: "Hospital Holloware, OT Lights & First Aid Products Catalog | Goonj & Shreehari",
    description:
      "Explore certified AISI 304 hospital dressing drums, surgical instrument trays, shadowless cold LED OT lights, vertical autoclaves, Factories Act compliant first aid metal boxes, and emergency patient stretchers.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  products: {
    title: "Hospital Holloware, OT Lights & First Aid Products Catalog | Goonj & Shreehari",
    description:
      "Explore certified AISI 304 hospital dressing drums, surgical instrument trays, shadowless cold LED OT lights, vertical autoclaves, Factories Act compliant first aid metal boxes, and emergency patient stretchers.",
    path: "/product",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
    ],
  },

  productDetail: {
    title: "Medical & Emergency Product Details | Technical Specifications & Wholesale Supply",
    description:
      "Detailed specifications, technical parameters, CE Certificate of Compliance, ISO 9001 certifications, and institutional hospital wholesale supply pricing.",
    path: "/product-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Products", path: "/product" },
      { label: "Product Detail", path: "/product-detail" },
    ],
  },

  supplier: {
    title: "Direct Manufacturer Distribution Hubs | Delhi & Mumbai Warehouses",
    description:
      "Connect with Goonj Communication in Dilshad Garden, Delhi and Shreehari Surgicals & Co. in Masjid Bunder, Mumbai for direct manufacturer supply, pan-India cargo dispatch, and hospital tenders.",
    path: "/supplier",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Supplier Profile", path: "/supplier" },
    ],
  },

  quality: {
    title: "Manufacturing Quality & Accreditations | CE, ISO 9001 & AISI 304 Stainless Steel",
    description:
      "Explore Goonj and Shreehari manufacturing quality standards, AISI 304 surgical steel fabrication, CE conformity (Directive 2006/42/CE & 92/29), ISO 9001:2015, and Section 45 Factories Act compliance.",
    path: "/quality",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Quality & Accreditations", path: "/quality" },
    ],
  },

  connect: {
    title: "Institutional Enquiry & Contact | Delhi & Mumbai Healthcare Hubs",
    description:
      "Contact Goonj & Shreehari Surgicals for wholesale healthcare tenders, institutional hospital rate cards, custom industrial first aid kits, or emergency medical dispatches.",
    path: "/connect",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Connect Us", path: "/connect" },
    ],
  },

  blog: {
    title: "Healthcare, Sterilization & Workplace Safety Insights | Goonj & Shreehari",
    description:
      "Read expert technical guides on Section 45 Factories Act industrial first aid stations, AISI 304 autoclave sterilization cycles, LED OT lighting lux levels, and patient transfer ergonomics.",
    path: "/blog",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Healthcare Insights", path: "/blog" },
    ],
  },

  blogDetail: {
    title: "Healthcare Technical Articles & Safety Compliance Guides | Goonj & Shreehari",
    description:
      "In-depth clinical equipment guides, regulatory factory inspectorate standards, trauma rescue procedures, and surgical suite procurement insights.",
    path: "/blog-detail",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Healthcare Insights", path: "/blog" },
      { label: "Article Detail", path: "/blog-detail" },
    ],
  },

  privacy: {
    title: "Privacy Policy | Goonj & Shreehari Healthcare Network",
    description:
      "Read our institutional privacy policy regarding healthcare procurement, customer quotations, and secure data practices.",
    path: "/privacy",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },

  terms: {
    title: "Terms & Conditions | Goonj & Shreehari Healthcare Network",
    description:
      "Terms of trade, institutional hospital warranties, wholesale return policies, and pan-India transit terms.",
    path: "/terms",
    breadcrumbs: [
      { label: "Home", path: "/home" },
      { label: "Terms & Conditions", path: "/terms" },
    ],
  },
};

export const aeoFAQs = [
  {
    question: "What medical products does Goonj Communication & Brand CYNOR manufacture?",
    answer:
      "Goonj Communication & Brand CYNOR (Delhi) manufactures and supplies AISI 304 stainless steel hospital holloware (jointed and jointless dressing drums, surgical instrument trays, kidney dishes, catheter trays, bedpans), shadowless cold LED surgical lights (7, 12, and 20 LED), vertical radial autoclaves, electric surgical suction apparatus, ICU beds, crash carts, and sterile hospital linens.",
  },
  {
    question: "What emergency and first aid products does Shreehari Surgicals & Co. supply?",
    answer:
      "Shreehari Surgicals & Co. (Brand SUPPORT, Mumbai) specializes in CE-certified industrial first aid kits (Type A, Type B, Type C metal boxes compliant with Section 45 Factories Act), emergency scoop stretchers, folding stretchers, evacuation stair chairs, spine boards, trauma rescue kits, and stainless steel wall-mounted first aid cabinets.",
  },
  {
    question: "Where are the Goonj and Shreehari central distribution hubs located?",
    answer:
      "Our North India hub is Goonj Communication, located at 58-B, Damodar Park Ind. Area, Dilshad Garden, Delhi - 110095 (Phone: +91 98731 98731). Our Western India emergency hub is Shreehari Surgicals & Co., located at 11/12, 2nd floor, 290/292, Vadgadi Azad Chowk CHSL, Samuel Street Masjid Bunder West Mumbai 400003 (Phone: +91 98179 26992 / +91 98205 60982 | Email: shreeharisurgicals.co2022@gmail.com).",
  },
  {
    question: "How can hospitals and industrial enterprises request wholesale quotations or custom kits?",
    answer:
      "You can submit institutional requirements through the website contact form on the Connect Us page, email Delhi (info@goonjcom.in) or Mumbai (shreeharisurgicals.co2022@gmail.com), or call direct lines +91 98731 98731 / +91 98179 26992 for immediate tenders and factory wholesale pricing.",
  },
  {
    question: "What quality certifications and regulatory approvals do the products hold?",
    answer:
      "All hospital holloware is fabricated from genuine AISI 304 surgical grade stainless steel. Emergency stretchers and first aid boxes carry CE Certificate of Compliance (Directive 2006/42/CE & EC Directive 92/29), ISO 9001:2015 quality management accreditation, statutory alignment with Indian Factories Act Section 45, and Drug License certifications (20B-MH-MZ1-521914 / 21B-MH-MZ1-521915).",
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
