import React, { useEffect, useState, useRef } from 'react';

const AgencyCustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ringRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .interactive, button');
      setIsHovered(!!isInteractive);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Smooth Lerp Animation Loop for Trailing Ring
    let animationFrameId;
    const animateRing = () => {
      const lerp = 0.2; // Smoothness factor
      ringPosRef.current.x += (mouseRef.current.x - ringPosRef.current.x) * lerp;
      ringPosRef.current.y += (mouseRef.current.y - ringPosRef.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0px) translate(-50%, -50%) scale(${isHovered ? 1.7 : 1})`;
      }

      animationFrameId = requestAnimationFrame(animateRing);
    };

    animationFrameId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered, isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        overflow: 'hidden'
      }}
    >
      {/* Trailing Large Soft Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '44px',
          height: '44px',
          backgroundColor: isHovered ? 'rgba(255, 81, 0, 0.28)' : 'rgba(228, 162, 146, 0.48)',
          border: isHovered ? '1px solid #FF5100' : '1px solid rgba(217, 68, 54, 0.25)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          transition: 'opacity 0.3s ease, background-color 0.3s ease, border-color 0.3s ease'
        }}
      />

      {/* Instant Small Solid Dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: isHovered ? '#FF5100' : '#D94436',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1000000,
          willChange: 'transform',
          transition: 'transform 0.05s linear, background-color 0.3s ease',
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0px) translate(-50%, -50%) scale(${isHovered ? 0.7 : 1})`
        }}
      />
    </div>
  );
};

export default AgencyCustomCursor;
