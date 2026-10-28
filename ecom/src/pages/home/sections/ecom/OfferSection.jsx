import React, { useState, useRef, useCallback, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import Badge from '../../../../components/common/Badge';

import Heading from '../../../../components/layout/generic/Heading';

import { useCart } from '../../../../feature/slice/cartSlice';

const SPACES_DATA = [
    {
        id: 1,
        image: "https://realrainwear.in/wp-content/uploads/2025/03/men-banner-02.jpg",
        title: "Heavy-Duty Biker & Highway Rainsuits",
        products: [
            {
                id: 1,
                name: "TREX Men's Rainsuit",
                price: "₹1,200",
                originalPrice: "₹3,220",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/TREX-_-GREY-4-600x799.jpg"
            },
            {
                id: 2,
                name: "RIDER Men's Rainsuit",
                price: "₹1,250",
                originalPrice: "₹2,990",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/EmptyName-930-600x799.jpg"
            },
            {
                id: 6,
                name: "LEXUS Men's Rainsuit",
                price: "₹2,070",
                originalPrice: "₹4,140",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/EmptyName-351-600x799.jpg"
            }
        ]
    },
    {
        id: 2,
        image: "https://realrainwear.in/wp-content/uploads/2025/03/women-bann.jpg",
        title: "Women's Trench Coats & Skirt Suits",
        products: [
            {
                id: 25,
                name: "NEON Women's Raincoat",
                price: "₹1,475",
                originalPrice: "₹2,950",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/NEON-COAT-1-600x799.jpg"
            },
            {
                id: 22,
                name: "All-Weather Long Raincoat",
                price: "₹1,320",
                originalPrice: "₹2,640",
                image: "https://realrainwear.in/wp-content/uploads/2023/09/women-01.png"
            },
            {
                id: 23,
                name: "Women's Waterproof Jacket",
                price: "₹1,450",
                originalPrice: "₹2,800",
                image: "https://realrainwear.in/wp-content/uploads/2025/12/1-600x799.jpg"
            }
        ]
    },
    {
        id: 3,
        image: "https://realrainwear.in/wp-content/uploads/2025/03/kid-bann.jpg",
        title: "Kids' School Rainwear with Bag Protection",
        products: [
            {
                id: 45,
                name: "Daffodil Girl's Raincoat",
                price: "₹1,070",
                originalPrice: "₹2,140",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/Artboard-7-3-1-1-600x799.jpg"
            },
            {
                id: 41,
                name: "Kids DIY Colourful Raincoat",
                price: "₹650",
                originalPrice: "₹1,200",
                image: "https://realrainwear.in/wp-content/uploads/2025/06/kids-diy-raincoat-purple-1-600x799.png"
            },
            {
                id: 42,
                name: "Boys Hooded School Raincoat",
                price: "₹980",
                originalPrice: "₹1,960",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/Untitled-design-1.png"
            }
        ]
    },
    {
        id: 4,
        image: "https://realrainwear.in/wp-content/uploads/2025/05/How-to-Choose-the-Best-Rain-Jacket-for-Travelers-1300x867.jpg",
        title: "Trekking Ponchos & Backpack Covers",
        products: [
            {
                id: 49,
                name: "All-Weather Backpack Rain Cover",
                price: "₹350",
                originalPrice: "₹700",
                image: "https://realrainwear.in/wp-content/uploads/2023/06/Mega-Menu.png"
            },
            {
                id: 24,
                name: "Waterproof Trekking Rain Poncho",
                price: "₹1,150",
                originalPrice: "₹2,300",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/How-to-Choose-the-Best-Rain-Jacket-for-Travelers-1300x867.jpg"
            },
            {
                id: 8,
                name: "ACHIEVERS Nylon Men's Raincoat",
                price: "₹1,500",
                originalPrice: "₹3,000",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/ACHIEVERS-NYLON-2-600x799.jpg"
            }
        ]
    },
    {
        id: 5,
        image: "https://realrainwear.in/wp-content/uploads/2025/05/Best-Raincoats-Rainsuits-Manufacturer-in-India-scaled.jpg",
        title: "Everyday Monsoon Commute & Storm Wear",
        products: [
            {
                id: 4,
                name: "BLACKBERRY Men's Rainsuit",
                price: "₹1,325",
                originalPrice: "₹2,650",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/EmptyName-1445-600x799.jpg"
            },
            {
                id: 5,
                name: "FORCE Men's Raincoat",
                price: "₹1,135",
                originalPrice: "₹2,270",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/EmptyName-1563-600x799.jpg"
            },
            {
                id: 9,
                name: "SKIPPER Men's Rainsuit",
                price: "₹1,375",
                originalPrice: "₹2,750",
                image: "https://realrainwear.in/wp-content/uploads/2025/05/SKIPPER_BRN-1-600x799.jpg"
            }
        ]
    }
];

const ShopLookPopup = memo(({ products = [], onClose, onProductClick }) => {
    return (
        <div
            className="absolute rounded-10 bg-white top-0 right-0 p-12 m-20 z-20"
            style={{
                width: '260px',
                maxWidth: 'calc(100% - 48px)',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between pb-12 bordb">
                <div className="flex items-center gap-8">
                    <h4 className="headmini-text font-500 text-dark capitalize">Shop this look</h4>
                    <Badge text={`${products.length} items`} size="xs" color="forth" shape="rounded" />
                </div>
                <Button
                    aria-label="Close shop look"
                    onClick={onClose}
                    icon="Close"
                    iconWidth="14"
                    iconHeight="14"
                    version="icon"
                    bg="forth"
                    color="danger"
                />
            </div>

            <div className="grid-cols-1">
                {products.map((p, idx) => (
                    <div
                        key={p.id}
                        onClick={() => onProductClick(p)}
                        className={`flex items-center justify-between gap-12 py-10 cursor-pointer group ${idx < products.length - 1 ? 'bordb' : ''
                            }`}
                    >
                        <div className="flex items-center gap-12 overflow-hidden">
                            <Image
                                src={p.image}
                                alt={p.name}
                                width="45px"
                                height="45px"
                                className="flex object-cover rounded-5 flex-shrink-0"
                                style={{ width: '45px', height: '45px' }}
                            />

                            <div className="overflow-hidden w-85">
                                <h5 className="headmini-text font-600 text-dark line-clamp1">
                                    {p.name}
                                </h5>
                                <div className="flex items-center gap-6 mt-2">
                                    <p className={`mini-text font-500 ${p.originalPrice ? 'text-danger' : 'text-dark'}`}>
                                        {p.price}
                                    </p>
                                    {p.originalPrice && (
                                        <p className="mini-text text-gray line-through font-400">
                                            {p.originalPrice}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <Button
                            aria-label={`View ${p.name}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onProductClick(p);
                            }}
                            icon="ChevronRight"
                            iconWidth="12"
                            iconHeight="12"
                            iconStrokeWidth="2.5"
                            version="icon"
                            variant="outline"
                            color="dark"
                            border="gray"
                            className="rounded-full flex-shrink-0 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors"
                            style={{ width: '28px', height: '28px' }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
});

ShopLookPopup.displayName = 'ShopLookPopup';

const SpaceCard = memo(({ space, isFirst, isMobile, isOpen, onToggle, onProductClick }) => {
    const isMob = isMobile ?? (typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    return (
        <div
            className='rounded-10 relative overflow-hidden h-450 sm-h-400'
            style={{
                minWidth: isMob
                    ? (isFirst ? '360px' : '340px')
                    : (isFirst ? '650px' : '390px')
            }}
        >
            <Image
                src={space.image}
                alt={space.title}
                className="w-full h-full flex object-cover"
            />

            {isOpen && (
                <ShopLookPopup
                    products={space.products}
                    onClose={onToggle}
                    onProductClick={onProductClick}
                />
            )}

            <Badge
                text={space.products.length}
                icon="Bag"
                iconSize={12}
                iconStrokeWidth="2"
                shape="pill"
                size="md"
                color="white"
                onClick={onToggle}
                className="absolute z-10 bottom-0 right-0 m-15"
                aria-label={`Shop ${space.products.length} items from this look`}
            />
        </div>
    );
});

SpaceCard.displayName = 'SpaceCard';

const OfferSection = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const scrollRef = useRef(null);

    const [activeLookId, setActiveLookId] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(25);
    const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const maxScroll = scrollWidth - clientWidth;
            if (maxScroll > 0) {
                const progress = Math.min(100, Math.max(25, ((scrollLeft / maxScroll) * 75) + 25));
                setScrollProgress(progress);
            }
        }
    }, []);

    const scroll = useCallback((direction) => {
        if (scrollRef.current) {
            const slideWidth = scrollRef.current.clientWidth * 0.4;
            const scrollAmount = direction === 'left' ? -slideWidth : slideWidth;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, []);

    const handleToggleLook = useCallback((id) => {
        setActiveLookId((prev) => (prev === id ? null : id));
    }, []);

    const handleProductClick = useCallback((p) => {
        addToCart(p);
        navigate(`/product/${p.id}`, { state: { product: p } });
    }, [addToCart, navigate]);

    return (
        <div className="w-full py-40">
            <style>{`
                    .trending-slide-first {
                        flex: 0 0 calc(60% - 10px);
                        width: calc(60% - 10px);
                        min-width: 320px;
                    }
                    .trending-slide-other {
                        flex: 0 0 calc(40% - 10px);
                        width: calc(40% - 10px);
                        min-width: 260px;
                    }
                    @media (max-width: 768px) {
                        .trending-slide-first {
                            flex: 0 0 85% !important;
                            width: 85% !important;
                            min-width: 280px !important;
                        }
                        .trending-slide-other {
                            flex: 0 0 65% !important;
                            width: 65% !important;
                            min-width: 240px !important;
                        }
                    }
                `}</style>

            <Heading
                version="v2"
                tag="MONSOON COLLECTIONS & INSPIRATION"
                title="Engineered All-Weather Rainwear Looks"
            />

            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-12 overflow-auto mt-30"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    scrollBehavior: 'smooth'
                }}
            >
                {SPACES_DATA.map((space, index) => (
                    <SpaceCard
                        key={space.id}
                        space={space}
                        isFirst={index === 0}
                        isMobile={isMobile}
                        isOpen={activeLookId === space.id}
                        onToggle={() => handleToggleLook(space.id)}
                        onProductClick={handleProductClick}
                    />
                ))}
            </div>

            <div className="flex items-center justify-between mt-24">
                <div style={{ height: '3px' }} className="w-80 sm-w-60 bg-tertiary relative">
                    <div
                        style={{
                            height: '3px',
                            width: `${scrollProgress}%`,
                            transition: 'width 0.2s ease'
                        }}
                        className="top-0 left-0 bg-primary absolute"
                    />
                </div>

                <div className="flex items-center gap-12">
                    <Button
                        aria-label="Previous spaces"
                        onClick={() => scroll('left')}
                        icon="ArrowLeft"
                        iconWidth="18"
                        iconHeight="18"
                        iconStrokeWidth="2"
                        variant="outline"
                        version="icon"
                        color="primary"
                        className="border-primary rounded-30"
                    />
                    <Button
                        aria-label="Next spaces"
                        onClick={() => scroll('right')}
                        icon="ArrowRight"
                        iconWidth="18"
                        iconHeight="18"
                        iconStrokeWidth="2"
                        variant="outline"
                        version="icon"
                        color="primary"
                        className="border-primary rounded-30"
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(OfferSection);