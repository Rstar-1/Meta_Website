export const generateMeta = (pageMeta = {}, defaultMeta = {}) => {
  const siteName = defaultMeta.siteName || 'E-Commerce Store';
  const siteUrl = (typeof window !== 'undefined' ? window.location.origin : '') || defaultMeta.siteUrl || import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com';
  const toAbsoluteUrl = (p) => p.startsWith('http') ? p : `${siteUrl}${p.startsWith('/') ? p : '/' + p}`;

  const title = pageMeta.title ? `${pageMeta.title} | ${siteName}` : defaultMeta.title || siteName;
  const desc = pageMeta.description || defaultMeta.description || '';
  const keywords = (Array.isArray(pageMeta.keywords) ? pageMeta.keywords.join(', ') : pageMeta.keywords) || defaultMeta.keywords || '';
  const ogImage = toAbsoluteUrl(pageMeta.image || defaultMeta.image || '/og-image.jpg');
  const canonical = pageMeta.canonical || toAbsoluteUrl(pageMeta.path || '');

  return {
    title,
    metaTags: [
      { name: 'description', content: desc },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: pageMeta.robots || defaultMeta.robots || 'index, follow' },
      { name: 'theme-color', content: pageMeta.themeColor || defaultMeta.themeColor || '#1e74db' },
      { name: 'author', content: pageMeta.author || defaultMeta.author || siteName },
      { name: 'referrer', content: pageMeta.referrer || defaultMeta.referrer || 'no-referrer-when-downgrade' },
      { property: 'og:type', content: pageMeta.type || 'website' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:alt', content: pageMeta.imageAlt || defaultMeta.imageAlt || title },
      { property: 'og:image:width', content: pageMeta.imageWidth || defaultMeta.imageWidth || '1200' },
      { property: 'og:image:height', content: pageMeta.imageHeight || defaultMeta.imageHeight || '630' },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: siteName },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:url', content: canonical },
      { name: 'twitter:site', content: pageMeta.twitterSite || defaultMeta.twitterSite || '@sobomarketing' }
    ],
    linkTags: [{ rel: 'canonical', href: canonical }]
  };
};
