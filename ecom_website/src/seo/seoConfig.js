import defaultSEO from './defaultSEO';

export const routeMeta = {
  '/': {
    title: 'Home',
    description: defaultSEO.description,
    keywords: defaultSEO.keywords,
    path: '/'
  },
  '/about': {
    title: 'About Us - Our Story & Values',
    description: 'Learn about EcoStore, our commitment to sustainability, environmental impact, and our premium product selection.',
    keywords: 'about ecostore, our mission, green values, eco team',
    path: '/about'
  },
  '/products': {
    title: 'Shop All Products',
    description: 'Explore our full range of premium eco-friendly items. Fast shipping, easy returns, and sustainable packaging.',
    keywords: 'shop eco-friendly, sustainable products list, green inventory',
    path: '/products'
  },
  '/category': {
    title: 'Product Categories',
    description: 'Browse sustainable solutions curated by category. Find eco-friendly alternatives for home, kitchen, and personal care.',
    keywords: 'product categories, kitchen care, personal care, green home',
    path: '/category'
  },
  '/blog': {
    title: 'EcoStore Blog - Sustainable Living Tips',
    description: 'Read the latest tips on zero-waste living, sustainability guides, and eco-friendly practices.',
    keywords: 'eco blog, zero waste lifestyle, sustainable living articles',
    path: '/blog'
  },
  '/enquiry': {
    title: 'Bulk & Corporate Enquiries',
    description: 'Get in touch for wholesale, customized branding, or bulk orders of our eco-friendly products.',
    keywords: 'wholesale eco products, bulk inquiries, corporate gifting',
    path: '/enquiry'
  },
  '/contact': {
    title: 'Contact Us',
    description: 'Have questions or need assistance? Reach out to EcoStore support via contact form, email, or phone.',
    keywords: 'contact ecostore, customer support, customer care',
    path: '/contact'
  }
};
