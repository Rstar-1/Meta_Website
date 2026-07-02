import React from "react";

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
}) => {
  const getButtonClass = () => {
    switch (version) {
      case "v0":
        return "px-16 py-5 mini-text rounded-5 border-0";
      case "v1":
        return "px-20 py-9 para-text rounded-5 border-0";
      case "v2":
        return "px-20 py-10 mini-text rounded-5 border-0";
      case "v3":
        return "w-full py-12 small-text rounded-5 border-0";
      default:
        return "w-full py-7 small-text rounded-5 border-0";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${getButtonClass()} bg-${bg} text-${color} cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""
        } ${className}`}
      style={style}
    >
      {children || text}
    </button>
  );
};

export default Button;