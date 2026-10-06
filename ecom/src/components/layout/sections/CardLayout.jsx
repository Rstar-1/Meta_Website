import React, { memo } from 'react';

import Image from '../../common/Image';
import Button from '../../common/Button';

import { resolveImagePath } from '../../../utils/imageResolver';

import { useCart } from '../../../feature/slice/cartSlice';

export const FeatureCard = memo(({
    item,
    onClick,
    onSelect,
    minWidth = '280px',
    maxWidth = '280px',
    isFluid = false
}) => {
    const { addToCart } = useCart();
    const handleCardClick = onClick || onSelect;

    if (!item) return null;

    const tag = item.tag || item.subCategory || item.category || 'Featured';
    const title = item.title || item.name;
    const productName = item.productName || item.name || title;
    const priceDisplay = typeof item.price === 'number'
        ? `$${item.price.toFixed(2)}`
        : (item.priceFormatted || `$${item.price || 0}`);

    const handleShop = (e) => {
        e.stopPropagation();
        addToCart({
            id: item.id,
            name: productName?.replace('...', ''),
            price: item.price,
            image: item.thumb || item.image
        });
        handleCardClick?.(item);
    };

    return (
        <div
            onClick={() => handleCardClick?.(item)}
            className={`h-350 sm-h-350 rounded-10 relative overflow-hidden cursor-pointer feature-card ${!isFluid ? 'flex-shrink-0' : 'w-full'}`}
            style={!isFluid ? { minWidth, maxWidth } : undefined}
        >
            <style>{`
                .feature-card .feature-info {
                    transform: translateY(73px);
                    transition: transform 0.35s cubic-bezier(0.25, 1, 0.5, 1);
                    will-change: transform;
                }
                .feature-card:hover .feature-info {
                    transform: translateY(0);
                }
                .feature-card:hover .feature-data {
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .feature-card:hover .feature-div {
                    opacity: 1;
                }
                .feature-card:hover > img {
                    transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
                    will-change: transform;
                    transform: scale(1.06);
                }
            `}</style>
            <Image
                src={resolveImagePath(item.image)}
                alt={title}
                className="w-full h-full object-cover flex filter-b4"
            />

            <div className="absolute bottom-0 left-0 w-full feature-info">
                <div className="px-12 mb-20 feature-data">
                    <p className="small-text font-400 text-white">
                        {tag}
                    </p>
                    <h3 className="title-text font-600 text-white mt-3 uppercase line-clamp1">
                        {title}
                    </h3>
                </div>
                <div className="rounded-5 p-14 flex items-center justify-between bg-gray feature-div">
                    <div className="flex items-center gap-8 w-60">
                        <Image
                            src={resolveImagePath(item.thumb || item.image)}
                            alt={productName}
                            height="45px"
                            className="flex object-cover rounded-5 w-30"
                        />
                        <div className="w-70">
                            <p className="small-text font-400 text-white line-clamp1">
                                {productName}
                            </p>
                            <p className="mini-text font-500 text-white">
                                {priceDisplay}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleShop}
                        text="Shop Now"
                        version="v2"
                        bg="white"
                        color="dark"
                        className="rounded-20"
                    />
                </div>
            </div>
        </div>
    );
});

FeatureCard.displayName = 'FeatureCard';

export const ProductCard = memo(({
    item,
    onClick,
    onProductClick,
    onCategoryClick,
    minWidth = '270px',
    maxWidth = '270px',
    isFluid = false
}) => {
    const { addToCart } = useCart();
    const handleCardClick = onClick || onProductClick;

    if (!item) return null;

    if (item.isBanner) {
        return (
            <div
                onClick={() => handleCardClick?.(item)}
                className="overflow-hidden rounded-10 relative h-300 cursor-pointer"
                style={!isFluid ? { minWidth, maxWidth } : undefined}
            >
                <Image
                    src={resolveImagePath(item.image)}
                    alt={item.title}
                    className="h-full w-full object-cover flex filter-b4"
                />
                <div className="absolute bottom-0 left-0 px-16 py-20">
                    <p className="text-primary font-500 small-text">{item.subtitle}</p>
                    <h3 className="text-white font-600 title-text mt-4">{item.title}</h3>
                </div>
            </div>
        );
    }

    const badge = item.badge || item.badges?.[0];
    const price = typeof item.price === 'number'
        ? `$${item.price.toFixed(2)}`
        : (item.priceFormatted || `$${item.price || 0}`);
    const originalPrice = item.originalPrice
        ? (typeof item.originalPrice === 'number'
            ? `$${item.originalPrice.toFixed(2)}`
            : (item.originalPriceFormatted || `$${item.originalPrice}`))
        : null;

    return (
        <div
            onClick={() => handleCardClick?.(item)}
            className={`cursor-pointer ${!isFluid ? 'flex-shrink-0' : 'w-full'}`}
            style={!isFluid ? { minWidth, maxWidth } : undefined}
        >
            <style>{`
                .product-card .product-btn {
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(12px);
                    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s;
                }
                .product-card:hover .product-btn {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }
                .product-card img {
                    transition: transform 0.5s ease;
                }
                .product-card:hover img {
                    transform: scale(1.04);
                }
            `}</style>
            <div className="h-300 w-full overflow-hidden rounded-10 relative product-card">
                {badge && (
                    <div className="top-0 left-0 absolute z-2">
                        <p
                            className="m-12 px-12 py-1 mini-text font-400 rounded-20 text-white"
                            style={{ backgroundColor: badge.color || badge.bg || '#C8281E' }}
                        >
                            {badge.text}
                        </p>
                    </div>
                )}
                <Image
                    src={resolveImagePath(item.image)}
                    alt={item.name}
                    className="flex w-full h-full object-cover"
                />
                <div className="product-btn w-full absolute bottom-0 left-0 z-2">
                    <div className="p-18">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                addToCart(item);
                            }}
                            text="Add to Cart"
                            icon="Cart"
                            iconWidth="18"
                            iconHeight="18"
                            iconStrokeWidth="2"
                            iconPosition="left"
                            version="v3"
                            bg="primary"
                            color="white"
                            className="rounded-30 w-full"
                        />
                    </div>
                </div>
            </div>

            <p
                onClick={(e) => {
                    if (onCategoryClick) {
                        e.stopPropagation();
                        onCategoryClick(item.category || item.categoryId);
                    }
                }}
                className="text-gray font-500 uppercase mini-text mt-5 hover:text-primary transition-colors"
            >
                {item.category}
            </p>

            <h3 className="headmini-text text-dark uppercase font-600 mt-2 line-clamp1">
                {item.name}
            </h3>

            <div className="flex items-center gap-6 mt-2">
                <p className="mini-text text-danger font-600">
                    {price}
                </p>
                {originalPrice && (
                    <p className="mini-text text-gray font-400 line-through">
                        {originalPrice}
                    </p>
                )}
            </div>

            {item.colors && item.colors.length > 0 && (
                <div className="flex items-center gap-8 mt-6">
                    {item.colors.map((color, cIdx) => (
                        <span
                            key={cIdx}
                            style={{
                                width: '14px',
                                height: '14px',
                                borderRadius: '3px',
                                backgroundColor: color,
                                border: '1px solid rgba(0,0,0,0.15)'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

ProductCard.displayName = 'ProductCard';

const CardLayout = memo(({ version = 'product', ...props }) => {
    if (version === 'feature') {
        return <FeatureCard {...props} />;
    }
    return <ProductCard {...props} />;
});

CardLayout.displayName = 'CardLayout';

export default CardLayout;
