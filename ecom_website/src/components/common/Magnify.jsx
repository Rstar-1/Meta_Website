import { useRef, useState, useEffect } from "react";

export default function ImageMagnifier({
  src,
  alt = "",
  width = "100%",
  height = "100%",
  zoomWidth = 450,
  zoomHeight = 450,
  zoomScale = 2.5,
  className = "",
  imgClassName = "",
}) {
  const imgRef = useRef(null);

  const [showZoom, setShowZoom] = useState(false);
  const [backgroundPos, setBackgroundPos] = useState("0% 0%");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMove = (e) => {
    if (!imgRef.current) return;
    const { left, top, width: imgW, height: imgH } = imgRef.current.getBoundingClientRect();

    const clientX = e.clientX;
    const clientY = e.clientY;

    let x = ((clientX - left) / imgW) * 100;
    let y = ((clientY - top) / imgH) * 100;

    // Constrain percentages to [0, 100]
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    setBackgroundPos(`${x}% ${y}%`);
  };

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <div
        ref={imgRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          cursor: "crosshair",
        }}
        className="rounded-5 border-ec bg-white flex items-center justify-center"
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          className={imgClassName}
        />
      </div>

      {showZoom && !isMobile && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "105%",
            width: `${zoomWidth}px`,
            height: `${zoomHeight}px`,
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            backgroundColor: "#fff",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoomScale * 100}%`,
            backgroundPosition: backgroundPos,
            zIndex: 50,
          }}
        />
      )}
    </div>
  );
}