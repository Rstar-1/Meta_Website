import React from "react";

const VERSION_CLASSES = {
  v0: "w-full",
  v1: "container mx-auto",
  v2: "container2",
  v3: "container3 mx-auto",
};

const Container = ({
  children,
  version = "v2",
  className = "",
  style = {},
}) => {
  const containerClass = VERSION_CLASSES[version] || "w-full";

  return (
    <div className={`${containerClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container;
