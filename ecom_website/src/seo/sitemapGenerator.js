export const generateSitemap = (routes = [], products = [], categories = [], blogs = [], baseUrl = import.meta.env.VITE_SITE_URL || 'https://sobo-marketing.com') => {
  const lastmod = new Date().toISOString().split('T')[0];
  const urlXml = (loc, freq, prio) => `  <url>
    <loc>${baseUrl}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${prio}</priority>
  </url>`;

  const urls = [
    ...routes.map(r => urlXml(r, r === '/' ? 'daily' : 'weekly', r === '/' ? '1.0' : '0.8')),
    ...products.map(p => urlXml(`/products/${p.slug}`, 'weekly', '0.7')),
    ...categories.map(c => urlXml(`/category/${c.slug}`, 'weekly', '0.6')),
    ...blogs.map(b => urlXml(`/blog/${b.slug}`, 'weekly', '0.6'))
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
};
