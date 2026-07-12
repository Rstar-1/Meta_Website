import React, { useState, useEffect, useRef } from 'react';

const LazySection = ({ children, placeholderHeight = '300px', className = '' }) => {
  const [isIntersected, setIsIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // If IntersectionObserver is not supported, fall back to immediate rendering
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px 0px' } // Eagerly load 300px before entering viewport
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={ref} className={className} style={!isIntersected ? { minHeight: placeholderHeight } : undefined}>
      {isIntersected ? children : null}
    </div>
  );
};

export default LazySection;
