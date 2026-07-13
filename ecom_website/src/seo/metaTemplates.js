import { slugify } from '../utils/slugify';

export const blogMetaTemplate = (post, baseUrl = 'https://sobo-marketing.com') => {
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
