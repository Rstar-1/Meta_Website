import React from "react";
import Container from "../common/Container";
import Breadcrumb from "../common/Breadcrumb";

const Banner = ({ title, desc, style, breadcrumbs, productData }) => {
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
                        className="bg-primary dot rounded-full"
                    />
                    <p
                        className="text-white uppercase font-500 small-text"
                    >
                        {title}
                    </p>
                </div>

                <h2
                    className="text-white font-600 uppercase head-text w-90 md-w-90 sm-w-full"
                >
                    {desc}
                </h2>

                {productData && (
                    <div className="mt-15">
                        <Breadcrumb
                            items={[
                                { label: 'Home', path: '/home' },
                                { label: productData.category || 'Printer Cartridges', path: '/products' },
                                { label: productData.brand },
                                { label: productData.title }
                            ]}
                        />
                    </div>
                )}
                {!productData && breadcrumbs && (
                    <div className="mt-15">
                        {Array.isArray(breadcrumbs) ? (
                            <Breadcrumb items={breadcrumbs} />
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

