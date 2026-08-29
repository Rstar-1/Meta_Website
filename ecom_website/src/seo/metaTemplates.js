import { slugify } from '../utils/slugify';

export const blogMetaTemplate = (post, baseUrl = 'https://inraclick.com') => {
  if (!post) return {};
  const postSlug = post.slug || slugify(post.title);
  return {
    title: `${post.title} | Inraclick Blog`,
    description: post.summary || post.description || `Read our latest post about ${post.title} on Inraclick (inraclick.com).`,
    keywords: post.keywords || 'Inraclick, digital marketing blog, web development, SEO insights',
    image: post.image || '/sobo_logo.webp',
    canonical: `${baseUrl}/blog/${postSlug}`,
    type: 'article',
    path: `/blog/${postSlug}`
  };
};
