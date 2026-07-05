import React from "react";
import Container from "../common/Container";
import { NavLink } from "react-router-dom";

const Banner = ({ title, img, desc, style, breadcrumbs, productData }) => {
    return (
        <Container className="relative"
            style={{
                backgroundColor: '#061325',
                backgroundImage: 'linear-gradient(135deg, #061325 0%, #0c203a 100%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                ...style
            }}>
            <div className="w-full py-90">
                <div className="flex items-center gap-8 mb-12">
                    <span
                        className="bg-warning"
                        style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            flexShrink: 0
                        }}
                    />
                    <p
                        className="text-white uppercase font-500 small-text"
                    >
                        {title}
                    </p>
                </div>

                <h2
                    className="text-white font-600 uppercase head-text"
                >
                    {desc}
                </h2>


                {productData && (
                    <div className="mt-15">
                        <nav className="flex items-center gap-10 w-full text-white opacity-85 flex-wrap small-text">
                            <NavLink
                                to="/home"
                                className="text-white no-underline opacity-70 hover:opacity-100 transition-opacity"
                            >
                                Home
                            </NavLink>
                            <span className="opacity-40">&gt;</span>
                            <NavLink
                                to="/products"
                                className="text-white no-underline opacity-70 hover:opacity-100 transition-opacity"
                            >
                                {productData.category || 'Printer Cartridges'}
                            </NavLink>
                            <span className="opacity-40">&gt;</span>
                            <span className="opacity-70">{productData.brand}</span>
                            <span className="opacity-40">&gt;</span>
                            <span className="text-white font-600">{productData.title}</span>
                        </nav>
                    </div>
                )}
                {!productData && breadcrumbs && (
                    <div className="mt-15">
                        {Array.isArray(breadcrumbs) ? (
                            <nav className="flex items-center gap-10 w-full text-white opacity-85 flex-wrap small-text">
                                {breadcrumbs.map((item, idx) => (
                                    <React.Fragment key={idx}>
                                        {idx > 0 && <span className="opacity-40">&gt;</span>}
                                        {item.path ? (
                                            <NavLink
                                                to={item.path}
                                                className="text-white small-text"
                                            >
                                                {item.label}
                                            </NavLink>
                                        ) : (
                                            <p className="text-white font-500 small-text">{item.label}</p>
                                        )}
                                    </React.Fragment>
                                ))}
                            </nav>
                        ) : (
                            breadcrumbs
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Banner;

