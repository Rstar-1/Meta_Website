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
    trimmed.startsWith('/') ||
    trimmed.startsWith('products/') ||
    trimmed.startsWith('roxy') ||
    trimmed.startsWith('shreehari') ||
    trimmed.startsWith('goonj') ||
    trimmed.startsWith('united_brothers') ||
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

export const roxyLogoColor = resolveImagePath('/products/roxy/logo-horizontal.png');
export const roxyLogoWhite = resolveImagePath('/products/roxy/logo-horizontal-white.png');
export const roxyLogoVertical = resolveImagePath('/products/roxy/logo.png');
export const roxyLogoVerticalWhite = resolveImagePath('/products/roxy/logo-2.png');
export const roxyEmblemColor = resolveImagePath('/products/roxy/roxy-emblem.png');
export const roxyEmblemWhite = resolveImagePath('/products/roxy/roxy-emblem-white.png');
export const shreehariLogoColor = roxyLogoColor;
export const shreehariLogoWhite = roxyLogoWhite;
export const unitedBrothersColor = roxyLogoColor;
export const unitedBrothersWhite = roxyLogoWhite;
export const soboLogo = roxyLogoColor;
export const soboWhite = roxyLogoWhite;
export const carpetPatchBanner = resolveImagePath('/products/roxy/cta_bg.jpg');
export const carpetBanner = resolveImagePath('/products/roxy/breadcumb_bg.jpg');

export default resolveImagePath;
