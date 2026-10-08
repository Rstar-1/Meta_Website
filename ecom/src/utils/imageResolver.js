import soboLogo from "../assets/sobo_logo.png";
import soboWhite from "../assets/sobo_white.png";

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

if (soboWhite) {
  assetMap["/sobos.png"] = soboWhite;
  assetMap["sobos.png"] = soboWhite;
}

export const resolveImagePath = (path) => {
  if (!path) return "";
  if (typeof path !== "string") return path;

  const trimmed = path.trim();
  if (!trimmed) return "";

  if (assetMap[trimmed]) {
    return assetMap[trimmed];
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("data:") ||
    trimmed.startsWith("blob:") ||
    trimmed.startsWith("//")
  ) {
    return trimmed;
  }

  if (!trimmed.startsWith("/")) {
    const base = import.meta.env.VITE_IMAGE || "";
    return base
      ? `${base.replace(/\/+$/, "")}/${trimmed.replace(/^\/+/, "")}`
      : trimmed;
  }

  return trimmed;
};

export { soboLogo, soboWhite };
