export const generateSitemap = (routes = [], products = [], categories = [], blogs = [], baseUrl = 'https://sobo-marketing.com') => {
  const urls = [];
  const addUrl = (loc, changefreq = 'daily', priority = '0.8') => {
    urls.push(`  <url>
    <loc>${baseUrl}${loc}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  };

  // Add standard static routes
  routes.forEach(route => {
    const priority = route === '/' ? '1.0' : '0.8';
    const changefreq = route === '/' ? 'daily' : 'weekly';
    addUrl(route, changefreq, priority);
  });

  // Add Product routes
  products.forEach(p => {
    addUrl(`/products/${p.slug}`, 'weekly', '0.7');
  });

  // Add Category routes
  categories.forEach(c => {
    addUrl(`/category/${c.slug}`, 'weekly', '0.6');
  });

  // Add Blog routes
  blogs.forEach(post => {
    addUrl(`/blog/${post.slug}`, 'weekly', '0.6');
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
};
