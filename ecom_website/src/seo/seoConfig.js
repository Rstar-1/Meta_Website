import defaultSEO from './defaultSEO';

const homeMeta = {
  title: 'SOBO Marketing Solution | Industrial B2B E-Commerce',
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
};

const contactMeta = {
  title: 'Contact Us | SOBO Marketing Solution',
  description: 'Have questions or need assistance with your B2B order? Reach out to SOBO Marketing Solution support.',
  keywords: 'contact SOBO, B2B customer support, get quote, industrial supplier contact',
};

export const routeMeta = {
  '/': { ...homeMeta, path: '/' },
  '/home': { ...homeMeta, path: '/home' },
  '/about': {
    title: 'About Us | SOBO Marketing Solution',
    description: 'Learn about SOBO Marketing Solution, our journey, values, and how we deliver top-tier industrial products.',
    keywords: 'About SOBO, B2B Supplier India, Industrial Partner, SOBO Marketing',
    path: '/about'
  },
  '/products': {
    title: 'Industrial Products & Supplies Catalog | SOBO Marketing Solution',
    description: 'Browse our comprehensive catalog of toner cartridges, stainless steel pipes, sheets, rods, and general products.',
    keywords: 'Product Catalog, Toner Cartridges Shop, SS Steel Sheets, B2B Supplies, SOBO Marketing',
    path: '/products'
  },
  '/category': {
    title: 'Product Categories | SOBO Marketing Solution',
    description: 'Browse industrial and commercial products by category. Find premium stainless steel, PVC strip curtains, and printing consumables.',
    keywords: 'product categories, stainless steel, PVC strip curtains, toner cartridges, B2B categories',
    path: '/category'
  },
  '/blog': {
    title: 'SOBO Marketing Blog - Industrial & Marketing Insights',
    description: 'Read the latest guides and tips on B2B marketing, industrial supply chain standards, and digital growth strategies.',
    keywords: 'B2B marketing, industrial supplies blog, supply chain insights, digital marketing tips',
    path: '/blog'
  },
  '/contact': { ...contactMeta, path: '/contact' },
  '/connect': { ...contactMeta, path: '/connect' }
};
