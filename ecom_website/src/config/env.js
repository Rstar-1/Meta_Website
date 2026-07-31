const ENV = import.meta.env || {};

export const config = {
  apiUrl: ENV.VITE_API_URL || "http://localhost:3000/api",
  appName: ENV.VITE_APP_NAME || "MyApp",
  env: ENV.VITE_APP_ENV || "development",
  isDev: (ENV.VITE_APP_ENV || "development") === "development",
  isProd: ENV.VITE_APP_ENV === "production",
  enableLogs: ENV.VITE_ENABLE_LOGS === "true",

  // E-commerce & Features
  ecom: ENV.VITE_ECOM === "true" || ENV.ECOM === "true",
  magnify: ENV.VITE_MAGNIFY === "true" || ENV.VITE_MAGNIFY === true,
  phone: ENV.VITE_PHONE || "9379030638",
  email: ENV.VITE_EMAIL || "raj.shetyenew@gmail.com",

  // Social Links
  social: {
    facebook: ENV.VITE_SOCIAL_FACEBOOK || "https://facebook.com/ashmitaenterprises",
    twitter: ENV.VITE_SOCIAL_TWITTER || "https://twitter.com/ashmitaent",
    instagram: ENV.VITE_SOCIAL_INSTAGRAM || "https://instagram.com/ashmitaenterprises",
    linkedin: ENV.VITE_SOCIAL_LINKEDIN || "https://linkedin.com/company/ashmitaenterprises",
    whatsapp: ENV.VITE_SOCIAL_WHATSAPP || "https://wa.me/919379030638",
  },

  // SEO & Metadata
  siteUrl: ENV.VITE_SITE_URL || "https://www.ashmitaenterprises.co.in",
  siteName: ENV.VITE_SITE_NAME || "Ashmita Enterprises",
  seoTitle: ENV.VITE_SEO_TITLE || "Ashmita Enterprises | Importer & Wholesaler of PVC Strip Curtains & PVC Roll in Mumbai",
  seoDescription: ENV.VITE_SEO_DESCRIPTION || "Ashmita Enterprises is a leading importer and wholesaler of high-quality PVC Strip Curtains, PVC Rolls, PVC Sheets, Plastic Curtains, PVC Films, and Mounting Brackets based in Mumbai, Maharashtra.",
  seoKeywords: ENV.VITE_SEO_KEYWORDS || "PVC Strip Curtains Mumbai, PVC Roll Wholesaler, Soft PVC Roll, PVC Sheet Importer, Opaque Black PVC Strips, Anti Insect PVC Curtain, Cold Storage Curtains, PVC AC Curtain, Ashmita Enterprises Mumbai, Industrial PVC curtains",
  seoImage: ENV.VITE_SEO_IMAGE || "/sobo_logo.webp",
  seoRobots: ENV.VITE_SEO_ROBOTS || "index, follow",

  // EmailJS Configuration
  emailjs: {
    serviceId: ENV.VITE_EMAILJS_SERVICE_ID || "service_u953567",
    templateId: ENV.VITE_EMAILJS_TEMPLATE_ID || "template_rlnoqs9",
    publicKey: ENV.VITE_EMAILJS_PUBLIC_KEY || "1oAgOb7nNd4rLoZ9B",
  },

  // Google Analytics
  gaMeasurementId: ENV.VITE_GA_MEASUREMENT_ID || "G-J2KWRNQ08V",
};