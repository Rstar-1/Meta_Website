import { useState, forwardRef } from "react";

export function Image({
  src,
  alt = "",
  fallback = "/images/fallback.webp",
  className = "",
  loading = "lazy",
  width,
  height,
  aspectRatio,
  style,
  ...props
}) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [imgSrc, setImgSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(src);
  }

  const imgStyle = {
    aspectRatio: aspectRatio,
    objectFit: aspectRatio ? "cover" : undefined,
    ...style,
  };

  return (
    <img
      src={imgSrc || fallback}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      className={className}
      style={imgStyle}
      onError={() => {
        if (imgSrc !== fallback) {
          setImgSrc(fallback);
        }
      }}
      {...props}
    />
  );
}

export const ImageDiv = forwardRef(({
  image,
  fallback = "/images/fallback.webp",
  children,
  className = "",
  innerClassName = "",
  overlay = false,
  overlayClass = "",
  innerRef,
  ...props
}, ref) => {
  const [prevImage, setPrevImage] = useState(image);
  const [bgImage, setBgImage] = useState(image);

  if (image !== prevImage) {
    setPrevImage(image);
    setBgImage(image);
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          backgroundImage: `url(${bgImage || fallback})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        onError={() => setBgImage(fallback)}
      />

      {overlay && (
        <div
          className={overlayClass}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
      )}

      <div className="relative z-20 h-full">
        {children}
      </div>
    </div>
  );
});

export default Image;