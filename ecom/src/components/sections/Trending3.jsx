import React, { useState, useEffect, useRef, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import { useCart } from '../../../../context/CartContext';

const DEAL_PRODUCTS = [
    {
        id: 1,
        vendor: 'Meridian Tech',
        name: 'Meridian VectorPro 15 ...',
        rating: 0,
        ratingCount: 0,
        price: '$1,599.00',
        badges: [{ text: 'Daily deals', bg: '#fef08a', color: '#854d0e' }],
        promo: 'Extra Deals Available',
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
        variants: [
            'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=500&q=80'
        ]
    },
    {
        id: 2,
        vendor: 'NovaTech Wearables',
        name: 'ActiveCore Smartwatch...',
        rating: 5,
        ratingCount: 3,
        price: '$74.99',
        oldPrice: '$109.99',
        discount: '-32%',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=500&q=80'
    },
    {
        id: 3,
        vendor: 'Evolution',
        name: 'Evolution Tab Air 11',
        rating: 0,
        ratingCount: 0,
        pricePrefix: 'From',
        price: '$599.00',
        image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=80',
        variants: [
            'https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=500&q=80'
        ]
    },
    {
        id: 4,
        vendor: 'Evolution Phones',
        name: 'Evolution X Air 5G...',
        rating: 0,
        ratingCount: 0,
        pricePrefix: 'From',
        price: '$869.00',
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80',
        variants: [
            'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=500&q=80'
        ]
    },
    {
        id: 5,
        vendor: 'UrbanCraft Essentials',
        name: 'Precision Stainless...',
        rating: 5,
        ratingCount: 3,
        pricePrefix: 'From',
        price: '$179.00',
        promo: '5 years warranty*',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=500&q=80',
        variants: [
            'https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=500&q=80',
            'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=500&q=80'
        ]
    },
    {
        id: 6,
        vendor: 'AeroNote',
        name: 'BreezeBook 13 —...',
        rating: 0,
        ratingCount: 0,
        price: '$849.00',
        badges: [
            { text: 'Weekend deal', bg: '#4338ca', color: '#ffffff' },
            { text: 'Daily deals', bg: '#fef08a', color: '#854d0e' },
            { text: 'Price drop', bg: '#ffedd5', color: '#9a3412' },
            { text: 'New', bg: '#e0f2fe', color: '#0369a1' }
        ],
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80'
    }
];

const ProductDealCard = memo(({ item, onClick }) => {
    const { addToCart } = useCart();
    const [selectedVariant, setSelectedVariant] = useState(0);

    const activeImage = useMemo(
        () => item.variants?.[selectedVariant] || item.image,
        [item.variants, selectedVariant, item.image]
    );

    const handleCardClick = useCallback(() => onClick?.(item), [onClick, item]);

    const handleAddToCart = useCallback((e) => {
        e.stopPropagation();
        addToCart(item);
    }, [addToCart, item]);

    return (
        <div
            onClick={handleCardClick}
            className="cursor-pointer"
            style={{ width: '220px', minWidth: '220px' }}
        >
            {/* Card Image Box */}
            <div className="w-full h-250 rounded-10 relative overflow-hidden bg-forth product-card">
                {item.badges?.length > 0 && (
                    <div className="absolute top-0 left-0 p-10 flex flex-col gap-4 z-10 pointer-events-none">
                        {item.badges.map((b, idx) => (
                            <span
                                key={idx}
                                className="px-8 py-2 rounded-20 mini-text font-600 leading-none"
                                style={{ backgroundColor: b.bg, color: b.color }}
                            >
                                {b.text}
                            </span>
                        ))}
                    </div>
                )}

                <Image
                    src={activeImage}
                    alt={item.name}
                    className="h-full w-full object-cover"
                />

                <div className="product-btn w-full absolute bottom-0 left-0 p-10">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="w-full py-6 rounded-20 bg-primary text-white mini-text font-600 border-none cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Card Details */}
            <div className="pt-10">
                <p className="mini-text text-gray font-500 uppercase">{item.vendor}</p>
                <h3 className="small-text text-dark font-600 mt-2 truncate" title={item.name}>
                    {item.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-4 mt-6">
                    <div className="flex items-center" style={{ color: item.rating ? '#f59e0b' : '#d1d5db' }}>
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill={i < (item.rating || 0) ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        ))}
                    </div>
                    <span className="mini-text text-gray font-400">({item.ratingCount || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-6 mt-4 flex-wrap">
                    {item.pricePrefix && <span className="small-text font-600 text-dark">{item.pricePrefix}</span>}
                    <span className={`small-text font-700 ${item.oldPrice ? 'text-danger' : 'text-dark'}`}>{item.price}</span>
                    {item.oldPrice && <span className="mini-text text-gray line-through font-400">{item.oldPrice}</span>}
                    {item.discount && (
                        <span className="px-6 py-1 rounded-5 mini-text font-600 leading-none" style={{ backgroundColor: '#fce7f3', color: '#db2777' }}>
                            {item.discount}
                        </span>
                    )}
                </div>

                {/* Variants */}
                {item.variants?.length > 0 && (
                    <div className="flex items-center gap-6 mt-8">
                        {item.variants.map((vUrl, vIdx) => (
                            <button
                                key={vIdx}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedVariant(vIdx);
                                }}
                                className={`rounded-full overflow-hidden flex items-center justify-center p-1 bg-white cursor-pointer ${selectedVariant === vIdx ? 'border-secondary' : 'border-gray'
                                    }`}
                                style={{ width: '22px', height: '22px' }}
                            >
                                <img src={vUrl} alt="" className="w-full h-full object-cover rounded-full" />
                            </button>
                        ))}
                    </div>
                )}

                {/* In stock */}
                <div className="flex items-center gap-6 mt-8">
                    <span className="rounded-full bg-secondary inline-block" style={{ width: '7px', height: '7px' }} />
                    <span className="mini-text font-500 text-secondary">In stock</span>
                </div>

                {/* Promo */}
                {item.promo && (
                    <div className="mt-8 flex items-center gap-4 px-8 py-2 rounded-5 w-max mini-text font-500" style={{ backgroundColor: '#fefce8', color: '#a16207', border: '1px solid #fef08a' }}>
                        <span>⚡</span>
                        <span>{item.promo}</span>
                    </div>
                )}
            </div>
        </div>
    );
});

ProductDealCard.displayName = 'ProductDealCard';

const FeatureSection = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const [timeLeft, setTimeLeft] = useState({ days: 95, hours: 22, minutes: 3, seconds: 19 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const scroll = useCallback((direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: direction === 'left' ? -240 : 240, behavior: 'smooth' });
        }
    }, []);

    const handleProductClick = useCallback((item) => {
        navigate(`/product/${item.id}`, { state: { product: item } });
    }, [navigate]);

    return (
        <Container style={{ background: '#ffffff' }}>
            <div className="w-full py-40">
                <style>{`
                    .product-card .product-btn {
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(8px);
                        transition: all 0.25s ease;
                    }
                    .product-card:hover .product-btn {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0);
                    }
                `}</style>

                {/* Header */}
                <div className="flex items-end justify-between gap-16 flex-wrap mb-24">
                    <div>
                        <p className="mini-text text-gray font-600 uppercase tracking-wider mb-2">
                            OUR TOP DEALS
                        </p>
                        <h2 className="head-text font-700 text-dark leading-tight">
                            Best Sellers!
                        </h2>
                    </div>

                    <div className="flex items-center gap-12 flex-wrap">
                        <span className="small-text text-gray font-500">
                            Hurry up! Offer ends in:
                        </span>

                        {/* Countdown */}
                        <div className="flex items-center gap-4">
                            {[timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
                                <React.Fragment key={i}>
                                    {i > 0 && <span className="font-700 text-dark">:</span>}
                                    <span
                                        className="px-8 py-4 rounded-5 font-700 text-white mini-text text-center bg-danger"
                                        style={{ minWidth: '32px' }}
                                    >
                                        {String(val).padStart(2, '0')}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>

                        <a
                            href="/products"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/products');
                            }}
                            className="font-600 small-text text-secondary hover-primary ml-6"
                        >
                            View All &raquo;
                        </a>
                    </div>
                </div>

                {/* Slider */}
                <div className="relative">
                    <div
                        ref={scrollRef}
                        className="flex gap-16 overflow-auto pb-10"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {DEAL_PRODUCTS.map((item) => (
                            <ProductDealCard
                                key={item.id}
                                item={item}
                                onClick={handleProductClick}
                            />
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => scroll('right')}
                        className="absolute right-0 rounded-full bg-white flex items-center justify-center text-dark hover-primary cursor-pointer border-gray"
                        style={{
                            top: '45%',
                            transform: 'translateY(-50%)',
                            width: '36px',
                            height: '36px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                            zIndex: 20
                        }}
                        aria-label="Next deals"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>
                </div>
            </div>
        </Container>
    );
};

export default memo(FeatureSection);