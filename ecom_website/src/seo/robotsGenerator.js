export const generateRobots = (baseUrl = 'https://ecom-website.example.com') => {
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
