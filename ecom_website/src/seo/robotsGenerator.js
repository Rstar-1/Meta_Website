export const generateRobots = (baseUrl = import.meta.env.VITE_SITE_URL || 'https://www.ashmitaenterprises.co.in') => {
  return `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Disallow admin panels or raw query parameters that cause duplicate pages
Disallow: /admin/
Disallow: /search
Disallow: /*?*

# Specify sitemap location
Sitemap: ${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}sitemap.xml
`;
};
