const VITE_IMAGE = import.meta.env.VITE_IMAGE || '';

export const resolveImagePath = (path) => {
  if (!path) return '';
  if (typeof path !== 'string') return path;

  const trimmed = path.trim();
  if (!trimmed) return '';

  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('/src/assets/') ||
    trimmed.startsWith('/assets/') ||
    trimmed.startsWith('@fs/') ||
    trimmed.endsWith('.mp4') ||
    trimmed.endsWith('.webm') ||
    trimmed.endsWith('.ogg')
  ) {
    return trimmed;
  }

  // Local assets in public folder
  if (
    trimmed.startsWith('/products/') ||
    trimmed.startsWith('products/') ||
    trimmed.startsWith('/united_brothers') ||
    trimmed.startsWith('united_brothers') ||
    trimmed.startsWith('/sobo_') ||
    trimmed.startsWith('sobo_')
  ) {
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }

  const base = VITE_IMAGE.replace(/\/+$/, '');
  const cleanPath = trimmed
    .replace(/^(\.\.\/|\.\/)+assets\//, '')
    .replace(/^\/?(src\/)?assets\//, '')
    .replace(/^\/+/, '');

  return base ? `${base}/${cleanPath}` : `/${cleanPath}`;
};

export const unitedBrothersColor = resolveImagePath('https://realrainwear.in/wp-content/uploads/2025/03/real-Logo.png');
export const unitedBrothersWhite = resolveImagePath('https://realrainwear.in/wp-content/uploads/2023/06/footer-logo-768x342.webp');
export const soboLogo = unitedBrothersColor;
export const soboWhite = unitedBrothersWhite;
export const carpetPatchBanner = resolveImagePath('https://realrainwear.in/wp-content/uploads/2025/05/Best-Raincoats-Rainsuits-Manufacturer-in-India-scaled.jpg');
export const carpetBanner = resolveImagePath('https://realrainwear.in/wp-content/uploads/2025/05/Untitled-design.jpg');

export default resolveImagePath;
