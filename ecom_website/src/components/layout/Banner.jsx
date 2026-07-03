import React from "react";
import Container from "../common/Container";
import { ImageDiv } from "../common/Image";
import { NavLink } from "react-router-dom";

const Banner = ({ title, img, desc, style, breadcrumbs, productData }) => {
    return (
        <ImageDiv
            image={img}
            className="w-full h-450 bg-forth"
            innerClassName="animate-hero-bg"
            style={style}
        >
            <Container>
                <div className="w-full flex items-center h-450 animate-hero-content">
                    <div className="w-70">
                        {productData && (
                            <div className="mb-20">
                                <nav className="flex items-center gap-12 w-full text-white opacity-95 flex-wrap small-text">
                                    <NavLink
                                        to="/home"
                                        className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                        Home
                                    </NavLink>
                                    <span className="opacity-60">&gt;</span>
                                    <NavLink
                                        to="/products"
                                        className="text-white no-underline opacity-80 hover:opacity-100 transition-opacity"
                                    >
                                        {productData.category || 'Printer Cartridges'}
                                    </NavLink>
                                    <span className="opacity-60">&gt;</span>
                                    <span className="opacity-80">{productData.brand}</span>
                                    <span className="opacity-60">&gt;</span>
                                    <span className="text-white font-semibold">{productData.title}</span>
                                </nav>
                            </div>
                        )}
                        {!productData && breadcrumbs && (
                            <div className="mb-20">
                                {breadcrumbs}
                            </div>
                        )}
                        <div className="flex items-center gap-9">
                            <span className="dot bg-warning"></span>
                            <p className="para-text text-white uppercase">{title}</p>
                        </div>
                        <h2 className="large-text text-white font-600 uppercase pt-20">
                            {desc}
                        </h2>
                    </div>
                </div>
            </Container>
        </ImageDiv>
    );
};

export default Banner;

