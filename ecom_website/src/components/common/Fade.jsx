import { useState, useEffect, useRef } from "react";

const Fade = ({
  children,
  version = "v1", // "v1" (intersection observer) or "v2" (scroll-linked)
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

  // Version 1: Intersection Observer
  useEffect(() => {
    if (version !== "v1") return;

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
  }, [threshold, version]);

  // Version 2: Scroll-linked dynamic animation
  useEffect(() => {
    if (version !== "v2") return;

    const handleScroll = () => {
      const element = domRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate entry progress: 0 when top is at viewportHeight, 1 when top reaches 20% of viewport
      const entryProgress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight * 0.8), 0), 1);

      element.style.opacity = entryProgress;

      let transformStr;
      const shift = (1 - entryProgress) * distance;
      switch (direction) {
        case "up":
          transformStr = `translate3d(0, ${shift}px, 0)`;
          break;
        case "down":
          transformStr = `translate3d(0, -${shift}px, 0)`;
          break;
        case "left":
          transformStr = `translate3d(-${shift}px, 0, 0)`;
          break;
        case "right":
          transformStr = `translate3d(${shift}px, 0, 0)`;
          break;
        case "scale":
          transformStr = `scale(${1 - (1 - entryProgress) * 0.1})`;
          break;
        default:
          transformStr = "none";
      }
      element.style.transform = transformStr;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, [version, direction, distance]);

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

  const transitionStyles = version === "v2"
    ? {
        transition: "opacity 0.6s ease, transform 0.6s ease",
        willChange: "opacity, transform",
        ...style,
      }
    : {
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1), transform ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1)`,
        transitionDelay: `${delay}ms`,
        ...style,
      };

  const Tag = tag;

  return (
    <Tag ref={domRef} style={transitionStyles} className={className} {...props}>
      {typeof children === "function" ? children(version === "v2" || isVisible) : children}
    </Tag>
  );
};

export default Fade;
