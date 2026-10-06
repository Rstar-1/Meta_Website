import soboLogo from "../assets/sobo_logo.webp";
import soboWhite from "../assets/sobo_white.png";
import aboutBanner from "../assets/about-banner.jpg";

// Automatically index all assets in ../assets/
const assetModules = import.meta.glob("../assets/*", {
  eager: true,
  import: "default",
});

const assetMap = {};

Object.entries(assetModules).forEach(([path, assetUrl]) => {
  const fileName = path.split("/").pop();
  if (fileName) {
    assetMap[fileName] = assetUrl;
    assetMap[`/${fileName}`] = assetUrl;
    assetMap[`/src/assets/${fileName}`] = assetUrl;
    assetMap[`src/assets/${fileName}`] = assetUrl;
    assetMap[`../assets/${fileName}`] = assetUrl;
  }
});

// Custom aliases
if (soboWhite) {
  assetMap["/sobos.png"] = soboWhite;
  assetMap["sobos.png"] = soboWhite;
}

export const resolveImagePath = (path) => {
  if (!path) return "";
  if (typeof path !== "string") return path;

  const trimmed = path.trim();
  if (!trimmed) return "";

  // Check local assets map first
  if (assetMap[trimmed]) {
    return assetMap[trimmed];
  }

  // Already a full, data, blob, or protocol-relative URL
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("//")
  ) {
    return trimmed;
  }

  // Prepend remote CDN base if available for relative filenames (e.g. Compare1.jpg)
  if (!trimmed.startsWith("/")) {
    const base = import.meta.env.VITE_IMAGE || "";
    return base ? `${base.replace(/\/+$/, "")}/${trimmed.replace(/^\/+/, "")}` : trimmed;
  }

  return trimmed;
};

export { soboLogo, soboWhite, aboutBanner };
