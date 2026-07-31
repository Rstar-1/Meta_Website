import { config } from '../config/env';

const defaultSEO = {
  siteName: config.siteName || 'Ashmita Enterprises',
  title: config.seoTitle || 'Ashmita Enterprises | Importer & Wholesaler of PVC Strip Curtains & PVC Roll in Mumbai',
  description: config.seoDescription || 'Ashmita Enterprises is a leading importer and wholesaler of high-quality PVC Strip Curtains, PVC Rolls, PVC Sheets, Plastic Curtains, PVC Films, and Mounting Brackets based in Mumbai, Maharashtra.',
  keywords: config.seoKeywords || 'PVC Strip Curtains Mumbai, PVC Roll Wholesaler, Soft PVC Roll, PVC Sheet Importer, Opaque Black PVC Strips, Anti Insect PVC Curtain, Cold Storage Curtains, PVC AC Curtain, Ashmita Enterprises Mumbai, Industrial PVC curtains',
  siteUrl: config.siteUrl || 'https://www.ashmitaenterprises.co.in',
  image: config.seoImage || '/sobo_logo.webp',
  robots: config.seoRobots || 'index, follow',
  organization: {
    name: config.siteName || 'Ashmita Enterprises',
    url: config.siteUrl || 'https://www.ashmitaenterprises.co.in',
    logo: config.siteUrl 
      ? `${config.siteUrl.replace(/\/$/, '')}${config.seoImage || '/sobo_logo.webp'}` 
      : 'https://www.ashmitaenterprises.co.in/sobo_logo.webp',
    phone: config.phone || '+91-9379030638',
    email: config.email || 'info@ashmitaenterprises.co.in',
    socials: [
      config.social.facebook,
      config.social.twitter,
      config.social.instagram,
      config.social.linkedin
    ]
  }
};

export default defaultSEO;
