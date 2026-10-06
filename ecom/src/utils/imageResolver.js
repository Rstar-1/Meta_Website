import hero from "../assets/hero.png";
import soboLogo from "../assets/sobo_logo.webp";
import soboWhite from "../assets/sobo_white.png";

const assetMap = {
  "/src/assets/hero.png": hero,
  "/src/assets/sobo_logo.webp": soboLogo,
  "/src/assets/sobo_white.png": soboWhite,
  "/sobo_logo.webp": soboLogo,
  "/sobo_white.png": soboWhite,
  "/sobos.png": soboWhite,
  "sobo_logo.webp": soboLogo,
  "sobo_white.png": soboWhite,
};

export const resolveImagePath = (path) => {
  if (!path) return "";
  if (typeof path === "string") {
    if (assetMap[path] || assetMap[path.trim()]) {
      return assetMap[path] || assetMap[path.trim()];
    }
    if (
      !path.startsWith("http://") &&
      !path.startsWith("https://") &&
      !path.startsWith("data:") &&
      !path.startsWith("blob:") &&
      !path.startsWith("/")
    ) {
      const base = import.meta.env.VITE_IMAGE || "";
      return base ? `${base}${path}` : path;
    }
    return path;
  }
  return path;
};

export { hero, soboLogo, soboWhite };
