import React, { useState, useEffect, useRef } from "react";

const Fade = ({
  children,
  direction = "up", // "up" | "down" | "left" | "right" | "scale" | "none"
  distance = 30, // transform offset in px
  duration = 800, // animation duration in ms
  delay = 0, // delay before animation starts in ms
  threshold = 0.15, // intersection trigger threshold
  className = "",
  style = {},
  tag = "div",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: `0px 0px -${threshold * 100}% 0px` }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(-${distance}px)`;
      case "right":
        return `translateX(${distance}px)`;
      case "scale":
        return "scale(0.9)";
      case "none":
      default:
        return "none";
    }
  };

  const transitionStyles = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1), transform ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1)`,
    transitionDelay: `${delay}ms`,
    ...style,
  };

  const Tag = tag;

  return (
    <Tag ref={domRef} style={transitionStyles} className={className} {...props}>
      {typeof children === "function" ? children(isVisible) : children}
    </Tag>
  );
};

export default Fade;
