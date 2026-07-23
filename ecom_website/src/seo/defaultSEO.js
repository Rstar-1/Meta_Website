const defaultSEO = {
  siteName: import.meta.env.VITE_SITE_NAME || 'SOBO Marketing Solution',
  title: import.meta.env.VITE_SEO_TITLE || 'SOBO Marketing Solution | Industrial B2B E-Commerce',
  description: import.meta.env.VITE_SEO_DESCRIPTION || 'Discover high-quality industrial supplies, printing cartridges, and stainless steel products at SOBO Marketing Solution.',
  keywords: import.meta.env.VITE_SEO_KEYWORDS || 'Industrial Supplies, Printer Cartridges, Stainless Steel, SOBO Marketing, B2B India, B2B e-commerce',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com',
  image: import.meta.env.VITE_SEO_IMAGE || '/sobo_logo.webp',
  robots: import.meta.env.VITE_SEO_ROBOTS || 'index, follow',
  organization: {
    name: import.meta.env.VITE_SITE_NAME || 'SOBO Marketing Solution',
    url: import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com',
    logo: import.meta.env.VITE_SITE_URL 
      ? `${import.meta.env.VITE_SITE_URL.replace(/\/$/, '')}${import.meta.env.VITE_SEO_IMAGE || '/sobo_logo.webp'}` 
      : 'https://sobo-marketing.com/sobo_logo.webp',
    phone: import.meta.env.VITE_PHONE || '+91-9876543210',
    email: import.meta.env.VITE_EMAIL || 'info@sobomarketing.com',
    socials: [
      import.meta.env.VITE_SOCIAL_FACEBOOK || 'https://facebook.com/sobomarketing',
      import.meta.env.VITE_SOCIAL_TWITTER || 'https://twitter.com/sobomarketing',
      import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://instagram.com/sobomarketing',
      import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com/company/sobomarketing'
    ]
  }
};

export default defaultSEO;
