import { slugify } from '../utils/slugify';

const defaultImg = '/images/default-share.jpg';

export const productMetaTemplate = (p, base = import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com') => {
  if (!p) return {};
  const slug = p.slug || slugify(p.name);
  return {
    title: `${p.name} | Buy Online`,
    description: p.description ? `${p.description.substring(0, 155)}...` : `Buy ${p.name} online at EcoStore. Premium sustainable quality.`,
    keywords: p.tags ? p.tags.join(', ') : `${p.name}, eco product, buy ${p.name}`,
    image: p.image || defaultImg,
    canonical: `${base}/products/${slug}`,
    type: 'product',
    path: `/products/${slug}`
  };
};

export const categoryMetaTemplate = (c, base = import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com') => {
  if (!c) return {};
  const slug = c.slug || slugify(c.name);
  return {
    title: `${c.name} Collection`,
    description: c.description || `Browse our full curated selection of ${c.name} products.`,
    keywords: `${c.name}, sustainable ${c.name}, eco-friendly category`,
    image: c.image || defaultImg,
    canonical: `${base}/category/${slug}`,
    type: 'website',
    path: `/category/${slug}`
  };
};

export const blogMetaTemplate = (post, base = import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com') => {
  if (!post) return {};
  const slug = post.slug || slugify(post.title);
  return {
    title: post.title,
    description: post.summary || post.description || `Read our latest post about ${post.title} on EcoStore.`,
    keywords: post.keywords || 'blog post, eco advice, sustainable ideas',
    image: post.image || defaultImg,
    canonical: `${base}/blog/${slug}`,
    type: 'article',
    path: `/blog/${slug}`
  };
};
