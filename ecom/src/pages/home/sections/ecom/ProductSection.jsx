import React, { useRef, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';

import Heading from '../../../../components/layout/generic/Heading';

import { useCart } from '../../../../context/CartContext';
import productsData from '../../../../data/product.json';

const ProductCard = ({ item, onClick }) => {
    const { addToCart } = useCart();
    const badge = item.badge || item.badges?.[0];
    const price = typeof item.price === 'number' ? `$${item.price.toFixed(2)}` : (item.priceFormatted || item.price);
    const originalPrice = item.originalPrice
        ? (typeof item.originalPrice === 'number' ? `$${item.originalPrice.toFixed(2)}` : (item.originalPriceFormatted || item.originalPrice))
        : null;

    return (
        <div
            onClick={onClick}
            className='cursor-pointer flex-shrink-0'
            style={{ minWidth: '270px', maxWidth: '270px' }}
        >
            <div className="h-300 w-full overflow-hidden rounded-10 relative product-card">
                {badge && (
                    <div className='top-0 left-0 absolute'>
                        <p
                            className='m-12 px-12 py-1 mini-text font-400 rounded-20 text-white'
                            style={{ backgroundColor: badge.color || badge.bg || '#C8281E' }}
                        >
                            {badge.text}
                        </p>
                    </div>
                )}
                <Image
                    src={item.image}
                    alt={item.name}
                    className="flex w-full h-full object-cover"
                />
                <div className='product-btn w-full absolute bottom-0 left-0'>
                    <div className='p-18'>
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
                            iconPosition='left'
                            version="v3"
                            bg="primary"
                            color="white"
                            className='rounded-30 w-full'
                        />
                    </div>
                </div>
            </div>

            <p className='text-gray font-500 uppercase mini-text mt-5'>
                {item.category}
            </p>

            <h3 className='headmini-text text-dark uppercase font-600 mt-2'>
                {item.name}
            </h3>

            <div className='flex items-center gap-6 mt-2'>
                <p className='mini-text text-danger font-600'>
                    {price}
                </p>
                {originalPrice && (
                    <p className='mini-text text-gray font-400 line-through'>
                        {originalPrice}
                    </p>
                )}
            </div>

            {item.colors && (
                <div className='flex items-center gap-8 mt-6'>
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
};

const ProductSliderSection = ({ products, onProductClick }) => {
    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(25);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll > 0) {
                const progress = Math.min(100, Math.max(25, ((scrollLeft / maxScroll) * 75) + 25));
                setScrollProgress(progress);
            }
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className='mt-40'>
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                style={{
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
                className="flex gap-12 overflow-auto"
            >
                {products.map((item) => (
                    <ProductCard
                        key={item.id}
                        item={item}
                        onClick={() => onProductClick(item)}
                    />
                ))}
            </div>

            <div className='flex items-center justify-between mt-20'>
                <div style={{ height: '3px' }} className='w-80 sm-w-60 bg-tertiary relative'>
                    <div
                        style={{
                            height: '3px',
                            width: `${scrollProgress}%`,
                            transition: 'width 0.2s ease'
                        }}
                        className='top-0 left-0 bg-primary absolute'
                    />
                </div>

                <div className='flex items-center gap-12'>
                    <Button
                        aria-label="Previous Products"
                        onClick={() => scroll('left')}
                        icon="ArrowLeft"
                        iconWidth="18"
                        iconHeight="18"
                        iconStrokeWidth="2"
                        variant="outline"
                        version="icon"
                        color='primary'
                        className="border-primary rounded-30"
                    />
                    <Button
                        aria-label="Next Products"
                        onClick={() => scroll('right')}
                        icon="ArrowRight"
                        iconWidth="18"
                        iconHeight="18"
                        iconStrokeWidth="2"
                        variant="outline"
                        version="icon"
                        color='primary'
                        className="border-primary rounded-30"
                    />
                </div>
            </div>
        </div>
    );
};

const ProductSection = () => {
    const navigate = useNavigate();

    const allProducts = useMemo(() => {
        return productsData.filter((p) => !p.isBanner);
    }, []);

    const firstRowProducts = useMemo(() => {
        return allProducts.slice(0, 6);
    }, [allProducts]);

    const secondRowProducts = useMemo(() => {
        return allProducts.length > 6 ? allProducts.slice(6, 12) : allProducts.slice(0, 6);
    }, [allProducts]);

    const handleProductClick = (item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    };

    return (
        <Container>
            <div className="w-full py-50">
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

                <Heading
                    version="v2"
                    tag="SPECIAL OFFERS FOR YOU"
                    title="Featured Products & Popular Designs"
                    actionText="Shop All Products"
                    actionLink="/products"
                />

                {/* First Slider Row (Products 1 - 6) */}
                <ProductSliderSection
                    products={firstRowProducts}
                    onProductClick={handleProductClick}
                />

                {/* Second Slider Row (Products 7 - 12) */}
                <ProductSliderSection
                    products={secondRowProducts}
                    onProductClick={handleProductClick}
                />
            </div>
        </Container>
    );
};

export default React.memo(ProductSection);