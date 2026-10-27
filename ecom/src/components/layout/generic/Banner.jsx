import React from "react";
import { useLocation } from "react-router-dom";

import Container from "../../common/Container";
import Breadcrumb from "../../common/Breadcrumb";
import Skeleton from "../../common/Skeleton";

const DEFAULT_FALLBACK_BANNER = "/images/globalchemie/chemical-lab.jpg";

const getSmartBanner = (pathname = "", title = "") => {
    const path = String(pathname || "").toLowerCase();
    const t = String(title || "").toLowerCase();

    if (path.includes("about") || t.includes("about") || t.includes("story")) {
        return "/images/banners/about-banner.webp";
    }
    if (path.includes("connect") || path.includes("contact") || t.includes("connect") || t.includes("contact") || t.includes("enquiry")) {
        return "/images/banners/connect-banner.webp";
    }
    if (path.includes("blog") || path.includes("news") || path.includes("article") || t.includes("blog") || t.includes("article") || t.includes("news") || t.includes("media")) {
        return "/images/banners/blog-banner.webp";
    }
    if (path.includes("product") || t.includes("product") || path.includes("supplier") || t.includes("supplier") || path.includes("catalog")) {
        return "/images/banners/product-banner.webp";
    }
    return DEFAULT_FALLBACK_BANNER;
};

const Banner = ({ title, desc, style, breadcrumbs, productData, loading, bgImage, image, backgroundImage }) => {
    const location = useLocation();

    if (loading) {
        return <Skeleton variant="banner" style={style} />;
    }

    const mainHeading = title || "Banner";
    const explicitImg = bgImage || backgroundImage || image;
    const bannerImg = explicitImg || getSmartBanner(location?.pathname, title);

    const bannerBackground = bannerImg
        ? (bannerImg.includes('gradient') || bannerImg.startsWith('url(')
            ? bannerImg
            : `linear-gradient(rgba(11, 19, 41, 0.70), rgba(11, 19, 41, 0.82)), url(${bannerImg}) center/cover no-repeat`)
        : `linear-gradient(rgba(11, 19, 41, 0.70), rgba(11, 19, 41, 0.82)), url(${DEFAULT_FALLBACK_BANNER}) center/cover no-repeat`;

    const itemsList = productData
        ? [
            { label: 'Home', path: '/home' },
            { label: productData.category || 'Products', path: '/products' },
            { label: productData.title || 'Product Detail' }
        ]
        : Array.isArray(breadcrumbs)
            ? breadcrumbs
            : [
                { label: 'Home', path: '/home' },
                { label: title || 'Page' }
            ];

    return (
        <Container
            className="relative"
            style={{
                background: bannerBackground,
                padding: '120px 0px 80px 0px',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                ...style
            }}
        >
            <div className="relative w-full py-60 text-center">
                <h2 className="text-white font-600 large-text text-center uppercase mt-40">
                    {mainHeading}
                </h2>

                {desc && (
                    <p className="text-white opacity-85 small-text max-w-700 mx-auto mt-8 font-400">
                        {desc}
                    </p>
                )}

                <div className="mt-12 flex justify-center">
                    <Breadcrumb items={itemsList} className="justify-center" />
                </div>
            </div>
        </Container>
    );
};

export default React.memo(Banner);
