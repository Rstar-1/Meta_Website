import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to slugify text
const slugify = (text) =>
  (typeof text === 'string' && text)
    ? text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+|-+$/g, '')
    : '';

const VITE_SITE_NAME = 'Ashmita Enterprises';
const VITE_SITE_URL = 'https://www.ashmitaenterprises.co.in';

async function generate() {
  try {
    const dataDir = path.join(__dirname, '../data');
    
    // Read data files
    const products = JSON.parse(await fs.readFile(path.join(dataDir, 'products.json'), 'utf-8'));
    const categories = JSON.parse(await fs.readFile(path.join(dataDir, 'category.json'), 'utf-8'));
    const blogs = JSON.parse(await fs.readFile(path.join(dataDir, 'blogs.json'), 'utf-8'));
    const clients = JSON.parse(await fs.readFile(path.join(dataDir, 'client.json'), 'utf-8'));

    const seoData = {};

    // 1. Static Pages
    const staticPages = {
      '/': {
        title: 'Ashmita Enterprises | Importer & Wholesaler of PVC Strip Curtains & PVC Roll in Mumbai',
        description: 'Ashmita Enterprises is a leading importer and wholesaler of high-quality PVC Strip Curtains, PVC Rolls, PVC Sheets, Plastic Curtains, PVC Films, and Mounting Brackets based in Mumbai, Maharashtra.',
        keywords: 'PVC Strip Curtains Mumbai, PVC Roll Wholesaler, Soft PVC Roll, PVC Sheet Importer, Opaque Black PVC Strips, Anti Insect PVC Curtain, Cold Storage Curtains, PVC AC Curtain, Ashmita Enterprises Mumbai, Industrial PVC curtains',
        type: 'website'
      },
      '/home': {
        title: 'Ashmita Enterprises | Importer & Wholesaler of PVC Strip Curtains & PVC Roll in Mumbai',
        description: 'Ashmita Enterprises is a leading importer and wholesaler of high-quality PVC Strip Curtains, PVC Rolls, PVC Sheets, Plastic Curtains, PVC Films, and Mounting Brackets based in Mumbai, Maharashtra.',
        keywords: 'PVC Strip Curtains Mumbai, PVC Roll Wholesaler, Soft PVC Roll, PVC Sheet Importer, Opaque Black PVC Strips, Anti Insect PVC Curtain, Cold Storage Curtains, PVC AC Curtain, Ashmita Enterprises Mumbai, Industrial PVC curtains',
        type: 'website'
      },
      '/about': {
        title: 'About Us | Ashmita Enterprises - PVC Importer & Wholesaler',
        description: 'Learn about Ashmita Enterprises, a leading importer and wholesaler of high-quality PVC strip curtains, rolls, sheets, and mounting brackets in Mumbai.',
        keywords: 'About Ashmita Enterprises, PVC roll supplier Mumbai, PVC strip curtain dealer',
        type: 'website'
      },
      '/products': {
        title: 'PVC Strip Curtains & PVC Rolls Catalog | Ashmita Enterprises',
        description: 'Browse our full catalog of PVC Strip Curtains, Soft PVC Rolls, Clear Transparent Sheets, Anti-Insect Curtains, and Mounting Brackets.',
        keywords: 'PVC strip curtain catalog, transparent PVC rolls, anti insect yellow curtain, mounting hanger brackets',
        type: 'product'
      },
      '/category': {
        title: 'Product Categories - PVC Curtains & Rolls | Ashmita Enterprises',
        description: 'Explore our product categories including PVC Curtains, PVC Transparent Rolls, PVC Colour Clear Film Rolls, PVC Reinforced Sheets, and Mounting Brackets.',
        keywords: 'PVC categories, PVC sheets supplier, PVC roll manufacturer',
        type: 'website'
      },
      '/blog': {
        title: 'PVC Sheets & Curtains Blog - Ashmita Enterprises',
        description: 'Read industrial insights, maintenance guides, temperature control tips, and updates about PVC strip curtains and rolls.',
        keywords: 'PVC curtains blog, cold storage insulation tips, PVC roll maintenance',
        type: 'website'
      },
      '/contact': {
        title: 'Contact Us | Ashmita Enterprises PVC Wholesaler',
        description: 'Get in touch with Ashmita Enterprises in Mumbai for bulk orders, price quotes, and custom sizes of PVC Strip Curtains, PVC Rolls, and Sheets.',
        keywords: 'Contact Ashmita Enterprises, PVC strip curtains Mumbai contact, bulk PVC roll price list, PVC manufacturer phone number',
        type: 'website'
      },
      '/connect': {
        title: 'Contact Us | Ashmita Enterprises PVC Wholesaler',
        description: 'Get in touch with Ashmita Enterprises in Mumbai for bulk orders, price quotes, and custom sizes of PVC Strip Curtains, PVC Rolls, and Sheets.',
        keywords: 'Contact Ashmita Enterprises, PVC strip curtains Mumbai contact, bulk PVC roll price list, PVC manufacturer phone number',
        type: 'website'
      },
      '/cart': {
        title: 'Shopping Cart | Ashmita Enterprises',
        description: 'View the items in your shopping cart and proceed to request a quote or complete your purchase.',
        keywords: 'shopping cart, checkout, PVC curtains quote, Ashmita Enterprises',
        type: 'website'
      },
      '/wheretobuy': {
        title: 'Where to Buy | Ashmita Enterprises',
        description: 'Find our main dealer network, wholesale warehouses, and retail partners for purchasing high-quality PVC strip curtains and rolls.',
        keywords: 'buy PVC curtains, PVC roll distributors, wholesale warehouses Mumbai',
        type: 'website'
      },
      '/order': {
        title: 'Order Summary | Ashmita Enterprises',
        description: 'Review your order details, payment options, and delivery status.',
        keywords: 'order status, track order, bulk delivery',
        type: 'website'
      }
    };

    for (const [route, meta] of Object.entries(staticPages)) {
      seoData[route] = {
        title: meta.title,
        description: meta.description,
        keywords: meta.keywords,
        canonical: `${VITE_SITE_URL}${route === '/' ? '' : route}`,
        image: `${VITE_SITE_URL}/sobo_logo.webp`,
        type: meta.type
      };
    }

    // 2. Dynamic Product Detail Pages
    for (const p of products) {
      const slug = p.slug || slugify(p.name);
      const desc = p.description ? p.description.substring(0, 155).trim() + '...' : `Buy ${p.name} online. Premium sustainable quality.`;
      const keywords = p.tags ? p.tags.join(', ') : `${p.name}, PVC product, buy ${p.name}`;
      const image = p.image || '/images/default-share.jpg';
      
      const meta = {
        title: `${p.name} | Buy Online | ${VITE_SITE_NAME}`,
        description: desc,
        keywords: keywords,
        canonical: `${VITE_SITE_URL}/product-detail/${p.id}`,
        image: image.startsWith('http') ? image : `${VITE_SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`,
        type: 'product'
      };

      seoData[`/product-detail/${p.id}`] = meta;
      if (p.slug && p.slug !== p.id) {
        seoData[`/product-detail/${p.slug}`] = {
          ...meta,
          canonical: `${VITE_SITE_URL}/product-detail/${p.slug}`
        };
      }
    }

    // 3. Dynamic Category Pages (rendered as /products?category=...)
    for (const c of categories) {
      const slug = slugify(c.name);
      const desc = c.description || `Browse our full curated selection of ${c.name} products.`;
      const keywords = `${c.name}, PVC ${c.name}, Ashmita Enterprises category`;
      const image = c.icon || '/sobo_logo.webp';

      const meta = {
        title: `${c.name} Collection | ${VITE_SITE_NAME}`,
        description: desc,
        keywords: keywords,
        canonical: `${VITE_SITE_URL}/category/${slug}`,
        image: image.startsWith('http') ? image : `${VITE_SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`,
        type: 'website'
      };

      seoData[`/category/${slug}`] = meta;
      seoData[`/products?category=${c.id}`] = {
        ...meta,
        canonical: `${VITE_SITE_URL}/products?category=${c.id}`
      };
    }

    // 4. Dynamic Blog Detail Pages
    for (const b of blogs) {
      const slug = b.slug || slugify(b.title);
      const desc = b.summary || b.description || `Read our latest post about ${b.title}.`;
      const keywords = b.keywords || 'blog post, PVC advice, industrial ideas';
      const image = b.image || '/images/default-share.jpg';

      const meta = {
        title: `${b.title} | ${VITE_SITE_NAME}`,
        description: desc,
        keywords: keywords,
        canonical: `${VITE_SITE_URL}/blog-detail/${b.id}`,
        image: image.startsWith('http') ? image : `${VITE_SITE_URL}${image.startsWith('/') ? '' : '/'}${image}`,
        type: 'article'
      };

      seoData[`/blog-detail/${b.id}`] = meta;
      if (b.slug && b.slug !== b.id) {
        seoData[`/blog-detail/${b.slug}`] = {
          ...meta,
          canonical: `${VITE_SITE_URL}/blog-detail/${b.slug}`
        };
      }
    }

    // 5. Dynamic Supplier Pages
    // Collect unique brands from products & clients
    const brands = new Set();
    for (const p of products) {
      if (p.brand) brands.add(p.brand.trim());
    }
    for (const c of clients) {
      if (c.name) brands.add(c.name.trim());
    }

    for (const brand of brands) {
      const matchedClient = clients.find(c => c.name?.toLowerCase() === brand.toLowerCase() || c.id?.toLowerCase() === brand.toLowerCase()) || {};
      const cityLocation = matchedClient.location || 'Mumbai, India';
      
      const meta = {
        title: `${brand} - Verified Supplier | ${VITE_SITE_NAME}`,
        description: `Get authentic products, wholesale prices, and verified profile info for ${brand}. Location: ${cityLocation}.`,
        keywords: `${brand} Supplier, ${brand} Wholesale, Verified Supplier ${cityLocation}`,
        canonical: `${VITE_SITE_URL}/supplier/${encodeURIComponent(brand)}`,
        image: `${VITE_SITE_URL}/sobo_logo.webp`,
        type: 'website'
      };

      seoData[`/supplier/${brand}`] = meta;
      seoData[`/supplier/${encodeURIComponent(brand)}`] = meta;
      
      if (matchedClient.id) {
        seoData[`/supplier/${matchedClient.id}`] = {
          ...meta,
          canonical: `${VITE_SITE_URL}/supplier/${matchedClient.id}`
        };
      }
    }

    // Write to src/data/seo.json
    const outputPath = path.join(dataDir, 'seo.json');
    await fs.writeFile(outputPath, JSON.stringify(seoData, null, 2), 'utf-8');
    console.log(`Success! Generated SEO text for ${Object.keys(seoData).length} paths at ${outputPath}`);
  } catch (error) {
    console.error('Error generating SEO json:', error);
    process.exit(1);
  }
}

generate();
