export const generateMeta = (pageMeta = {}, defaultMeta = {}) => {
  const siteName = defaultMeta.siteName || 'E-Commerce Store';
  const siteUrl = defaultMeta.siteUrl || 'https://example.com';
  
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

  return {
    title,
    metaTags: [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: robots },
      
      // Open Graph / Facebook
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: siteName },
      
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage }
    ],
    linkTags: [
      { rel: 'canonical', href: canonical }
    ]
  };
};
