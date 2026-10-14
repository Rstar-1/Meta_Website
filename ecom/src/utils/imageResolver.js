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
    trimmed.startsWith('/metal/') ||
    trimmed.startsWith('metal/') ||
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

export const jubilantLogo = resolveImagePath('/metal/jubilant_logo_transparent.png');
export const jubilantLogoWhite = resolveImagePath('/metal/jubilant_logo_white.png');
export const jubilantLogoBanner = resolveImagePath('/metal/jubilant_logo_banner.jpg');
export const metalBanner = resolveImagePath('/metal/slide-no2.jpg');
export const metalPatchBanner = resolveImagePath('/metal/slide-no1.jpg');
export const unitedBrothersColor = resolveImagePath('/metal/jubilant_logo_transparent.png');
export const unitedBrothersWhite = resolveImagePath('/metal/jubilant_logo_white.png');
export const soboLogo = resolveImagePath('/metal/jubilant_logo_transparent.png');
export const soboWhite = resolveImagePath('/metal/jubilant_logo_white.png');
export const carpetPatchBanner = metalPatchBanner;
export const carpetBanner = metalBanner;

export default resolveImagePath;
