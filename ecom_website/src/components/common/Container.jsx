import React from "react";

const Container = ({
    children,
    version = "v1",
    className = "",
    style = {},
    ...props
}) => {
    const getContainerClass = () => {
        switch (version) {
            case "v0":
                return "w-full";
            case "v1":
                return "container mx-auto";
            case "v2":
                return "container2";
            case "v3":
                return "container3 mx-auto";
            default:
                return "w-full";
        }
    };

    return (
        <div className={`${getContainerClass()} ${className}`} style={style} {...props}>
            {children}
        </div>
    );
};

export default Container;
