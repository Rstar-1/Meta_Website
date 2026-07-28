import defaultSEO from './defaultSEO';

const homeMeta = {
  title: 'Ashmita Enterprises | Importer & Wholesaler of PVC Strip Curtains & PVC Roll in Mumbai',
  description: defaultSEO.description,
  keywords: defaultSEO.keywords,
};

const contactMeta = {
  title: 'Contact Us | Ashmita Enterprises PVC Wholesaler',
  description: 'Get in touch with Ashmita Enterprises in Mumbai for bulk orders, price quotes, and custom sizes of PVC Strip Curtains, PVC Rolls, and Sheets.',
  keywords: 'Contact Ashmita Enterprises, PVC strip curtains Mumbai contact, bulk PVC roll price list, PVC manufacturer phone number',
};

export const routeMeta = {
  '/': { ...homeMeta, path: '/' },
  '/home': { ...homeMeta, path: '/home' },
  '/about': {
    title: 'About Us | Ashmita Enterprises - PVC Importer & Wholesaler',
    description: 'Learn about Ashmita Enterprises, a leading importer and wholesaler of high-quality PVC strip curtains, rolls, sheets, and mounting brackets in Mumbai.',
    keywords: 'About Ashmita Enterprises, PVC roll supplier Mumbai, PVC strip curtain dealer',
    path: '/about'
  },
  '/products': {
    title: 'PVC Strip Curtains & PVC Rolls Catalog | Ashmita Enterprises',
    description: 'Browse our full catalog of PVC Strip Curtains, Soft PVC Rolls, Clear Transparent Sheets, Anti-Insect Curtains, and Mounting Brackets.',
    keywords: 'PVC strip curtain catalog, transparent PVC rolls, anti insect yellow curtain, mounting hanger brackets',
    path: '/products'
  },
  '/category': {
    title: 'Product Categories - PVC Curtains & Rolls | Ashmita Enterprises',
    description: 'Explore our product categories including PVC Curtains, PVC Transparent Rolls, PVC Colour Clear Film Rolls, PVC Reinforced Sheets, and Mounting Brackets.',
    keywords: 'PVC categories, PVC sheets supplier, PVC roll manufacturer',
    path: '/category'
  },
  '/blog': {
    title: 'PVC Sheets & Curtains Blog - Ashmita Enterprises',
    description: 'Read industrial insights, maintenance guides, temperature control tips, and updates about PVC strip curtains and rolls.',
    keywords: 'PVC curtains blog, cold storage insulation tips, PVC roll maintenance',
    path: '/blog'
  },
  '/contact': { ...contactMeta, path: '/contact' },
  '/connect': { ...contactMeta, path: '/connect' }
};
