import React from "react";

// Inject keyframes globally once (safe for SSR)
if (typeof document !== "undefined" && !document.getElementById("skeleton-styles")) {
  const style = document.createElement("style");
  style.id = "skeleton-styles";
  style.textContent = `
    @keyframes sk-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
    @keyframes sk-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
  `;
  document.head.appendChild(style);
}

const Skeleton = ({
  variant = "rect", // "rect" | "circle" | "text" | "card"
  width,
  height,
  borderRadius,
  count = 1,
  className = "",
  theme = "light", // "light" | "dark" | "adaptive"
  animation = "shimmer", // "shimmer" | "pulse" | "none"
  style = {},
  ...props
}) => {
  const themes = {
    light: { bg: "#e2e8f0", grad: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)" },
    dark: { bg: "#1e293b", grad: "linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%)" },
    adaptive: { bg: "rgba(0,0,0,0.08)", grad: "linear-gradient(90deg, rgba(0,0,0,0.08) 25%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.08) 75%)" }
  };
  const active = themes[theme] || themes.light;

  const baseStyle = {
    display: "inline-block",
    position: "relative",
    overflow: "hidden",
    verticalAlign: "middle",
    backgroundColor: animation === "shimmer" ? "transparent" : active.bg,
    backgroundImage: animation === "shimmer" ? active.grad : "none",
    backgroundSize: animation === "shimmer" ? "200% 100%" : "auto",
    animation: animation === "shimmer" ? "sk-shimmer 1.5s infinite linear" : animation === "pulse" ? "sk-pulse 1.5s infinite ease-in-out" : "none",
  };

  const getStyle = () => {
    switch (variant) {
      case "circle":
        return { borderRadius: "50%", width: width || "40px", height: height || "40px" };
      case "text":
        return { borderRadius: borderRadius || "4px", width: width || "100%", height: height || "16px", margin: "8px 0" };
      default: // "rect"
        return { borderRadius: borderRadius || "6px", width: width || "100%", height: height || "150px" };
    }
  };

  if (variant === "card") {
    const cardBg = theme === "dark" ? "#0f172a" : theme === "light" ? "#ffffff" : "rgba(255,255,255,0.05)";
    return (
      <>
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className={`rounded-5 ${className}`}
            style={{
              background: cardBg,
              boxShadow: theme === "light" ? "0 4px 6px -1px rgba(0,0,0,0.05)" : "none",
              width: width || "100%",
              height: height || "auto",
              ...style
            }}
          >
            <Skeleton variant="rect" theme={theme} animation={animation} height="180px" borderRadius="6px" />
            <Skeleton variant="text" theme={theme} animation={animation} width="30%" height="12px" />
            <Skeleton variant="text" theme={theme} animation={animation} width="85%" height="20px" />
            <div className="flex flex-column gap-6">
              <Skeleton variant="text" theme={theme} animation={animation} width="100%" height="12px" style={{ margin: 0 }} />
              <Skeleton variant="text" theme={theme} animation={animation} width="60%" height="12px" style={{ margin: 0 }} />
            </div>
            <div className="flex justify-between items-center mt-8">
              <Skeleton variant="text" theme={theme} animation={animation} width="25%" height="16px" style={{ margin: 0 }} />
              <Skeleton variant="rect" theme={theme} animation={animation} width="60px" height="28px" borderRadius="4px" />
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`skeleton-element ${className}`}
          style={{ ...baseStyle, ...getStyle(), ...style }}
          {...props}
        />
      ))}
    </>
  );
};

export default Skeleton;
