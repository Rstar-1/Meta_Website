import { slugify } from '../utils/slugify';

export const productMetaTemplate = (product, baseUrl = 'https://ecom-website.example.com') => {
  if (!product) return {};
  const productSlug = product.slug || slugify(product.name);
  return {
    title: `${product.name} | Buy Online`,
    description: product.description ? product.description.substring(0, 155) + '...' : `Buy ${product.name} online at EcoStore. Premium sustainable quality.`,
    keywords: product.tags ? product.tags.join(', ') : `${product.name}, eco product, buy ${product.name}`,
    image: product.image || '/images/default-share.jpg',
    canonical: `${baseUrl}/products/${productSlug}`,
    type: 'product',
    path: `/products/${productSlug}`
  };
};

export const categoryMetaTemplate = (category, baseUrl = 'https://ecom-website.example.com') => {
  if (!category) return {};
  const categorySlug = category.slug || slugify(category.name);
  return {
    title: `${category.name} Collection`,
    description: category.description || `Browse our full curated selection of ${category.name} products.`,
    keywords: `${category.name}, sustainable ${category.name}, eco-friendly category`,
    image: category.image || '/images/default-share.jpg',
    canonical: `${baseUrl}/category/${categorySlug}`,
    type: 'website',
    path: `/category/${categorySlug}`
  };
};

export const blogMetaTemplate = (post, baseUrl = 'https://ecom-website.example.com') => {
  if (!post) return {};
  const postSlug = post.slug || slugify(post.title);
  return {
    title: post.title,
    description: post.summary || post.description || `Read our latest post about ${post.title} on EcoStore.`,
    keywords: post.keywords || 'blog post, eco advice, sustainable ideas',
    image: post.image || '/images/default-share.jpg',
    canonical: `${baseUrl}/blog/${postSlug}`,
    type: 'article',
    path: `/blog/${postSlug}`
  };
};
