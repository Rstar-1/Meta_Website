import React from "react";
import Icon from "./Icon";

const VERSION_CLASSES = {
  v0: "px-22 py-8 sm-px-12 sm-py-6 mini-text",
  v1: "px-20 py-9 para-text",
  v2: "px-25 py-11 sm-px-12 sm-py-6 small-text",
  v3: "w-full py-10 sm-py-13 mini-text",
};

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
  variant = "filled",
  icon = "",
  iconWidth = "16",
  iconHeight = "16",
  iconStrokeWidth = "2.5",
  iconPosition = "left",
}) => {
  const borderClass = variant === "outline" ? `border-${bg}` : "border-0";
  const bgClass = variant === "outline" ? "bg-transparent" : `bg-${bg}`;
  const textClass = variant === "outline" ? `text-${bg}` : `text-${color}`;
  
  const versionClass = VERSION_CLASSES[version] || "w-full py-7 small-text";
  const buttonClass = `${versionClass} rounded-5 ${borderClass}`;

  const defaultStroke = variant === "outline" ? (style.color || "#2563eb") : (style.color || color);

  const iconElement = icon && (
    <Icon
      name={icon}
      width={iconWidth}
      height={iconHeight}
      strokeWidth={iconStrokeWidth}
      stroke={defaultStroke}
    />
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${buttonClass} ${bgClass} ${textClass} cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      style={style}
    >
      {icon ? (
        <span className="flex items-center justify-center gap-8 w-full">
          {iconPosition !== "right" && iconElement}
          <span>{children || text}</span>
          {iconPosition === "right" && iconElement}
        </span>
      ) : (
        children || text
      )}
    </button>
  );
};

export default Button;