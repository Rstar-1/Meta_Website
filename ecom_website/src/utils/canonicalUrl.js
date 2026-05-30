
export const getCanonicalUrl = (path = '', baseUrl = '') => {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://example.com');
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  
  // Ensure path starts with a slash if not empty
  let cleanPath = path;
  if (cleanPath && !cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  
  // Remove trailing slash from path (unless it is just root '/')
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }
  
  return `${cleanBase}${cleanPath}`;
};
