import { useState, useEffect, useRef, forwardRef } from "react";

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
  const isEager = loading === "eager" || props.fetchPriority === "high" || props.fetchpriority === "high";
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(isEager);
  const imgRef = useRef(null);

  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(isEager);
  }, [src, isEager]);

  useEffect(() => {
    if (imgRef.current?.complete) setIsLoaded(true);
  }, [imgSrc]);

  return (
    <img
      ref={imgRef}
      src={imgSrc || fallback}
      alt={alt}
      loading={loading}
      width={width}
      height={height}
      className={className}
      style={{
        aspectRatio,
        objectFit: aspectRatio ? "cover" : undefined,
        transition: isEager ? "none" : "opacity 0.3s ease-in-out, filter 0.3s ease-in-out",
        opacity: isLoaded ? 1 : 0.6,
        filter: isLoaded ? "none" : "blur(4px)",
        ...style,
      }}
      onLoad={() => setIsLoaded(true)}
      onError={() => imgSrc !== fallback ? setImgSrc(fallback) : setIsLoaded(true)}
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
  const [bgImage, setBgImage] = useState(image);

  useEffect(() => {
    setBgImage(image);
  }, [image]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
      <div
        ref={innerRef}
        className={innerClassName}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: `url(${bgImage || fallback}) center/cover no-repeat`,
        }}
      />
      {overlay && (
        <div
          className={overlayClass}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
      )}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
});

export default Image;