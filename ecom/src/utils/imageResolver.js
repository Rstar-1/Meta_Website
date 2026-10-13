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
    trimmed.startsWith('//')
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

export const unitedBrothersColor = resolveImagePath('/united_brothers_color.png');
export const unitedBrothersWhite = resolveImagePath('/united_brothers_white.png');
export const soboLogo = unitedBrothersColor;
export const soboWhite = unitedBrothersWhite;
export const carpetPatchBanner = resolveImagePath('/products/carpet_patch_banner.jpg');
export const carpetBanner = resolveImagePath('/products/carpet_banner.jpg');

export default resolveImagePath;
