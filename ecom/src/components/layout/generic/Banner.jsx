import React from "react";

import Container from "../../common/Container";
import Breadcrumb from "../../common/Breadcrumb";
import Skeleton from "../../common/Skeleton";
import { resolveImagePath, carpetBanner } from "../../../utils/imageResolver";

const DEFAULT_BANNER_IMAGE = "https://realrainwear.in/wp-content/uploads/2025/05/Best-Raincoats-Rainsuits-Manufacturer-in-India-scaled.jpg";

const getContextualBanner = (title, productData) => {
    if (productData?.image) return productData.image;
    if (productData?.images?.[0]) return productData.images[0];
    if (!title) return DEFAULT_BANNER_IMAGE;

    const t = String(title).toLowerCase();
    if (t.includes('about')) {
        return "https://realrainwear.in/wp-content/uploads/2025/05/Untitled-design.jpg";
    }
    if (t.includes('product') || t.includes('collection') || t.includes('shop') || t.includes('overview')) {
        return "https://realrainwear.in/wp-content/uploads/2025/03/men-banner-02.jpg";
    }
    if (t.includes('news') || t.includes('blog') || t.includes('article') || t.includes('media')) {
        return "https://realrainwear.in/wp-content/uploads/2026/10/Rainy-Day-Family-Rainwear-Advertisement-768x432.png";
    }
    if (t.includes('connect') || t.includes('contact') || t.includes('enquiry')) {
        return "https://realrainwear.in/wp-content/uploads/2025/05/Best-Raincoats-Rainsuits-Manufacturer-in-India-scaled.jpg";
    }
    if (t.includes('privacy') || t.includes('terms') || t.includes('policy')) {
        return "https://realrainwear.in/wp-content/uploads/2025/03/women-bann.jpg";
    }
    return DEFAULT_BANNER_IMAGE;
};

const Banner = ({ title, desc, style, breadcrumbs, productData, loading, bgImage, image, backgroundImage }) => {
    if (loading) {
        return <Skeleton variant="banner" style={style} />;
    }

    const mainHeading = title || "Real Rainwear";
    const contextualImg = getContextualBanner(mainHeading, productData);
    const rawImg = bgImage || backgroundImage || image || contextualImg || carpetBanner || DEFAULT_BANNER_IMAGE;
    const bannerImg = resolveImagePath(rawImg);
    const bannerBackground = bannerImg
        ? (bannerImg.includes('gradient') || bannerImg.startsWith('url(')
            ? bannerImg
            : `linear-gradient(rgba(10, 15, 25, 0.62), rgba(10, 15, 25, 0.78)), url(${bannerImg}) center/cover no-repeat`)
        : `linear-gradient(rgba(10, 15, 25, 0.62), rgba(10, 15, 25, 0.78)), url(${DEFAULT_BANNER_IMAGE}) center/cover no-repeat`;

    const itemsList = productData
        ? [
            { label: 'Home', path: '/home' },
            { label: productData.category || 'Products', path: '/products' },
            { label: productData.title || productData.name || 'Product Detail' }
        ]
        : Array.isArray(breadcrumbs)
            ? breadcrumbs
            : [
                { label: 'Home', path: '/home' },
                { label: title || 'Page' }
            ];

    return (
        <Container className="relative"
            style={{
                background: bannerBackground,
                padding: '120px 0px 80px 0px',
                ...style
            }}>
            <div className="relative w-full py-60 text-center">
                <h2 className="text-white font-600 large-text text-center uppercase mt-40">
                    {mainHeading}
                </h2>

                {desc && (
                    <p className="para-text text-white opacity-90 mt-8 max-w-600 mx-auto">
                        {desc}
                    </p>
                )}

                <div className="mt-8 flex justify-center">
                    <Breadcrumb items={itemsList} className="justify-center" />
                </div>
            </div>
        </Container>
    );
};

export default React.memo(Banner);
