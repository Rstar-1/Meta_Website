
export const slugify = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^\w\-]+/g, '')       // Remove all non-word characters except hyphens
    .replace(/\-\-+/g, '-')         // Replace multiple consecutive hyphens with a single one
    .replace(/^-+/, '')             // Trim hyphens from the start
    .replace(/-+$/, '');            // Trim hyphens from the end
};
