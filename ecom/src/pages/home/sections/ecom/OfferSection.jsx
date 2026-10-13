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
        image: "/products/spaces/living_room.webp",
        title: "1800 GSM Poly Shrink Living Space",
        products: [
            {
                id: 15,
                name: "New Age Poly Shrink Rug - Abstract Linear",
                price: "₹1,250/sq mtr",
                originalPrice: "₹1,650/sq mtr",
                image: "/products/rugs/poly_shrink_p1_1.webp"
            },
            {
                id: 16,
                name: "New Age Poly Shrink Rug - Honeycomb Hexagon",
                price: "₹1,250/sq mtr",
                originalPrice: null,
                image: "/products/rugs/poly_shrink_p2_1.webp"
            },
            {
                id: 19,
                name: "New Age Poly Shrink Rug - Stepped Border",
                price: "₹1,250/sq mtr",
                originalPrice: "₹1,650/sq mtr",
                image: "/products/rugs/poly_shrink_p5_1.webp"
            }
        ]
    },
    {
        id: 2,
        image: "/products/spaces/auto_interior.webp",
        title: "Automotive Cabin & Trunk Flooring",
        products: [
            {
                id: 1,
                name: "Black Dilour Carpet",
                price: "₹380/sq mtr",
                originalPrice: "₹480/sq mtr",
                image: "/products/dilour_black.jpg"
            },
            {
                id: 9,
                name: "Black Ribs Carpet",
                price: "₹320/sq mtr",
                originalPrice: "₹420/sq mtr",
                image: "/products/ribs_black.jpg"
            },
            {
                id: 6,
                name: "Premium Automotive Interior Dilour",
                price: "₹420/sq mtr",
                originalPrice: "₹520/sq mtr",
                image: "/products/dilour_car.jpg"
            }
        ]
    },
    {
        id: 3,
        image: "/products/spaces/office_corridor.webp",
        title: "Commercial Anti-Slip Corridors",
        products: [
            {
                id: 10,
                name: "Grey Ribs Carpet",
                price: "₹320/sq mtr",
                originalPrice: null,
                image: "/products/ribs_grey.jpg"
            },
            {
                id: 13,
                name: "Heavy Duty Commercial Anti-Slip Ribs",
                price: "₹360/sq mtr",
                originalPrice: "₹460/sq mtr",
                image: "/products/ribs_car.jpg"
            },
            {
                id: 2,
                name: "Grey Dilour Carpet",
                price: "₹380/sq mtr",
                originalPrice: "₹480/sq mtr",
                image: "/products/dilour_grey.jpg"
            }
        ]
    },
    {
        id: 4,
        image: "/products/spaces/dining_salon.webp",
        title: "Shalimar Luxury Woven Dining Salon",
        products: [
            {
                id: 45,
                name: "Shalimar Rug 24030 - Beige (182x270 cm)",
                price: "₹8,500/piece",
                originalPrice: "₹11,000/piece",
                image: "/products/shalimar/shalimar_p1_1.webp"
            },
            {
                id: 46,
                name: "Shalimar Rug 24031 - Grey (182x270 cm)",
                price: "₹8,500/piece",
                originalPrice: null,
                image: "/products/shalimar/shalimar_p1_2.webp"
            },
            {
                id: 48,
                name: "Shalimar Rug 24031 - Steel Blue",
                price: "₹8,500/piece",
                originalPrice: "₹11,000/piece",
                image: "/products/shalimar/shalimar_p1_4.webp"
            }
        ]
    },
    {
        id: 5,
        image: "/products/spaces/bedroom_retreat.webp",
        title: "Minimalist Plush Bedroom Sanctuary",
        products: [
            {
                id: 35,
                name: "New Age Poly Shrink Rug - Pure Ivory",
                price: "₹1,250/sq mtr",
                originalPrice: "₹1,650/sq mtr",
                image: "/products/rugs/poly_shrink_p21_1.webp"
            },
            {
                id: 3,
                name: "Beige Dilour Carpet",
                price: "₹380/sq mtr",
                originalPrice: null,
                image: "/products/dilour_beige.jpg"
            },
            {
                id: 76,
                name: "Plush Comfort Shaggy Area Rug",
                price: "₹4,800/piece",
                originalPrice: "₹6,500/piece",
                image: "/products/rugs_shaggy.jpg"
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
                tag="CURATED SPACES & INSPIRATION"
                title="Styled Spaces & Flooring Collections"
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