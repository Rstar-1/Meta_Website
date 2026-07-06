import React from "react";
import Icon from "./Icon";

const Button = ({
  text = "",
  children,
  version = "v1",
  bg = "primary",
  color = "white",
  className = "",
  style = {},
  onClick = () => { },
  type = "button",
  disabled = false,
  variant = "filled", // "filled" | "outline"
  icon = "", // Icon name, e.g. "Cart"
  iconWidth = "16",
  iconHeight = "16",
  iconStrokeWidth = "2.5",
}) => {
  const getButtonClass = () => {
    const borderClass = variant === "outline" ? `border-${bg}` : "border-0";
    switch (version) {
      case "v0":
        return `px-16 py-5 mini-text rounded-5 ${borderClass}`;
      case "v1":
        return `px-20 py-9 para-text rounded-5 ${borderClass}`;
      case "v2":
        return `px-18 py-8 mini-text rounded-5 ${borderClass}`;
      case "v3":
        return `w-full py-10 sm-py-13 mini-text rounded-5 ${borderClass}`;
      default:
        return `w-full py-7 small-text rounded-5 ${borderClass}`;
    }
  };

  const bgClass = variant === "outline" ? "bg-transparent" : `bg-${bg}`;
  const textClass = variant === "outline" ? `text-${bg}` : `text-${color}`;

  const renderIcon = () => {
    if (!icon) return null;
    const defaultStroke = variant === "outline" ? (style.color || "#2563eb") : (style.color || color);
    return (
      <Icon
        name={icon}
        width={iconWidth}
        height={iconHeight}
        strokeWidth={iconStrokeWidth}
        stroke={defaultStroke}
      />
    );
  };

  const buttonContent = icon ? (
    <span className="flex items-center justify-center gap-8 w-full">
      {renderIcon()}
      <span>{children || text}</span>
    </span>
  ) : (
    children || text
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonClass()} ${bgClass} ${textClass} cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      style={style}
    >
      {buttonContent}
    </button>
  );
};

export default Button;