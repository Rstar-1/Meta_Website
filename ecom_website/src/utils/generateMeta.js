export const generateMeta = (pageMeta = {}, defaultMeta = {}) => {
  const siteName = defaultMeta.siteName || 'E-Commerce Store';
  const siteUrl = (typeof window !== 'undefined' ? window.location.origin : '') || defaultMeta.siteUrl || 'https://sobo-marketing.com';
  
  // Resolve title
  const title = pageMeta.title 
    ? `${pageMeta.title} | ${siteName}` 
    : defaultMeta.title || siteName;

  // Resolve description, keywords, and robots tags
  const description = pageMeta.description || defaultMeta.description || '';
  const keywords = pageMeta.keywords
    ? (Array.isArray(pageMeta.keywords) ? pageMeta.keywords.join(', ') : pageMeta.keywords)
    : defaultMeta.keywords || '';
  const robots = pageMeta.robots || defaultMeta.robots || 'index, follow';

  // Resolve canonical URL
  const path = pageMeta.path || '';
  const canonical = pageMeta.canonical || `${siteUrl}${path.startsWith('/') ? path : '/' + path}`;

  // Resolve sharing image
  const image = pageMeta.image || defaultMeta.image || '/og-image.jpg';
  const ogImage = image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? image : '/' + image}`;

  // Open Graph content type
  const type = pageMeta.type || 'website';

  // Recommended and Optional fields
  const themeColor = pageMeta.themeColor || defaultMeta.themeColor || '#1e74db';
  const author = pageMeta.author || defaultMeta.author || siteName;
  const referrer = pageMeta.referrer || defaultMeta.referrer || 'no-referrer-when-downgrade';
  const imageAlt = pageMeta.imageAlt || defaultMeta.imageAlt || title;
  const imageWidth = pageMeta.imageWidth || defaultMeta.imageWidth || '1200';
  const imageHeight = pageMeta.imageHeight || defaultMeta.imageHeight || '630';
  const twitterSite = pageMeta.twitterSite || defaultMeta.twitterSite || '@sobomarketing';

  return {
    title,
    metaTags: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: robots },
      { name: 'theme-color', content: themeColor },
      { name: 'author', content: author },
      { name: 'referrer', content: referrer },
      
      // Open Graph / Facebook
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:alt', content: imageAlt },
      { property: 'og:image:width', content: imageWidth },
      { property: 'og:image:height', content: imageHeight },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: siteName },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:url', content: canonical },
      { name: 'twitter:site', content: twitterSite }
    ],
    linkTags: [
      { rel: 'canonical', href: canonical }
    ]
  };
};

