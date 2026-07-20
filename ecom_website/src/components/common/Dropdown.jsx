import React, { useEffect, useRef } from "react";

const Dropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
  style = {},
  align = "left",
  minWidth = "210px",
  padding = "10px 0",
  ...props
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !onClose) return;

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const baseStyle = {
    position: "absolute",
    top: "100%",
    [align]: 0,
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    boxShadow: "0 14px 35px rgba(0, 0, 0, 0.08)",
    borderRadius: "6px",
    padding: padding,
    minWidth: minWidth,
    zIndex: 1000,
    ...style,
  };

  return (
    <div
      ref={dropdownRef}
      className={`drop-card ${className}`}
      style={baseStyle}
      {...props}
    >
      {children}
    </div>
  );
};

export default Dropdown;
