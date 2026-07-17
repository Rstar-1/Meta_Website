import { useState, useEffect, useRef } from "react";

const Fade = ({
  children,
  version = "v1",
  direction = "up",
  distance = 30,
  duration = 800,
  delay = 0,
  threshold = 0.15,
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

    if (domRef.current) observer.observe(domRef.current);
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
      const entryProgress = Math.min(Math.max((viewportHeight - rect.top) / (viewportHeight * 0.8), 0), 1);

      element.style.opacity = entryProgress;

      const shift = (1 - entryProgress) * distance;
      const transforms = {
        up: `translate3d(0, ${shift}px, 0)`,
        down: `translate3d(0, -${shift}px, 0)`,
        left: `translate3d(-${shift}px, 0, 0)`,
        right: `translate3d(${shift}px, 0, 0)`,
        scale: `scale(${1 - (1 - entryProgress) * 0.1})`,
      };
      element.style.transform = transforms[direction] || "none";
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [version, direction, distance]);

  const getTransform = () => {
    if (isVisible) return "translate(0, 0) scale(1)";
    const transMap = {
      up: `translateY(${distance}px)`,
      down: `translateY(-${distance}px)`,
      left: `translateX(-${distance}px)`,
      right: `translateX(${distance}px)`,
      scale: "scale(0.9)",
    };
    return transMap[direction] || "none";
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
