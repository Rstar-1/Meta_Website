const defaultSEO = {
  siteName: import.meta.env.VITE_SITE_NAME || 'Ashmita Enterprises',
  title: import.meta.env.VITE_SEO_TITLE || 'Ashmita Enterprises | Importer & Wholesaler of PVC Strip Curtains & PVC Roll in Mumbai',
  description: import.meta.env.VITE_SEO_DESCRIPTION || 'Ashmita Enterprises is a leading importer and wholesaler of high-quality PVC Strip Curtains, PVC Rolls, PVC Sheets, Plastic Curtains, PVC Films, and Mounting Brackets based in Mumbai, Maharashtra.',
  keywords: import.meta.env.VITE_SEO_KEYWORDS || 'PVC Strip Curtains Mumbai, PVC Roll Wholesaler, Soft PVC Roll, PVC Sheet Importer, Opaque Black PVC Strips, Anti Insect PVC Curtain, Cold Storage Curtains, PVC AC Curtain, Ashmita Enterprises Mumbai, Industrial PVC curtains',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://www.ashmitaenterprises.co.in',
  image: import.meta.env.VITE_SEO_IMAGE || '/sobo_logo.webp',
  robots: import.meta.env.VITE_SEO_ROBOTS || 'index, follow',
  organization: {
    name: import.meta.env.VITE_SITE_NAME || 'Ashmita Enterprises',
    url: import.meta.env.VITE_SITE_URL || 'https://www.ashmitaenterprises.co.in',
    logo: import.meta.env.VITE_SITE_URL 
      ? `${import.meta.env.VITE_SITE_URL.replace(/\/$/, '')}${import.meta.env.VITE_SEO_IMAGE || '/sobo_logo.webp'}` 
      : 'https://www.ashmitaenterprises.co.in/sobo_logo.webp',
    phone: import.meta.env.VITE_PHONE || '+91-9379030638',
    email: import.meta.env.VITE_EMAIL || 'info@ashmitaenterprises.co.in',
    socials: [
      import.meta.env.VITE_SOCIAL_FACEBOOK || 'https://facebook.com/ashmitaenterprises',
      import.meta.env.VITE_SOCIAL_TWITTER || 'https://twitter.com/ashmitaent',
      import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://instagram.com/ashmitaenterprises',
      import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com/company/ashmitaenterprises'
    ]
  }
};

export default defaultSEO;
