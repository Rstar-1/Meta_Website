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
        image: "/metal/round-bars.jpg",
        title: "ASTM A276 Centerless Ground Round Bars",
        products: [
            {
                id: 17,
                name: "SS 316L Centerless Ground Round Bar (ASTM A276)",
                price: "₹385/kg",
                originalPrice: "₹420/kg",
                image: "/metal/round-bars.jpg"
            },
            {
                id: 18,
                name: "Duplex 2205 (UNS S32205) Peeled Round Bar",
                price: "₹650/kg",
                originalPrice: null,
                image: "/metal/round-bars.jpg"
            },
            {
                id: 19,
                name: "Inconel 625 (UNS N06625) High-Nickel Round Bar",
                price: "₹3,400/kg",
                originalPrice: "₹3,800/kg",
                image: "/metal/round-bars.jpg"
            }
        ]
    },
    {
        id: 2,
        image: "/metal/forged-fittings.jpg",
        title: "Class 3000# & 6000# High Pressure Forged Fittings",
        products: [
            {
                id: 21,
                name: "ASME B16.11 Forged Socket Weld 90° Elbow (3000#)",
                price: "₹480/pc",
                originalPrice: "₹560/pc",
                image: "/metal/forged-fittings.jpg"
            },
            {
                id: 22,
                name: "ASME B16.11 Forged Threaded (NPT) Tee (3000#)",
                price: "₹580/pc",
                originalPrice: null,
                image: "/metal/forged-fittings.jpg"
            },
            {
                id: 23,
                name: "High Pressure Forged Full Coupling (6000#)",
                price: "₹620/pc",
                originalPrice: "₹740/pc",
                image: "/metal/forged-fittings.jpg"
            }
        ]
    },
    {
        id: 3,
        image: "/metal/enhanced_ss_pipes.jpg",
        title: "ASTM A312 Seamless & Welded Process Pipes",
        products: [
            {
                id: 1,
                name: "ASTM A312 TP304/304L Seamless Pipe (1/2\" to 12\")",
                price: "₹320/kg",
                originalPrice: "₹360/kg",
                image: "/metal/enhanced_ss_pipes.jpg"
            },
            {
                id: 2,
                name: "ASTM A312 TP316/316L Welded Pipe (Sch 10S/40S)",
                price: "₹420/kg",
                originalPrice: null,
                image: "/metal/enhanced_ss_pipes.jpg"
            },
            {
                id: 3,
                name: "ASTM A790 Duplex 2205 Subsea Pipeline Pipe",
                price: "₹690/kg",
                originalPrice: "₹780/kg",
                image: "/metal/pipe-tubes.jpg"
            }
        ]
    },
    {
        id: 4,
        image: "/metal/enhanced_ss_flanges.jpg",
        title: "ASME B16.5 Heavy Forged Industrial Flanges",
        products: [
            {
                id: 5,
                name: "SS 304/304L Slip On Flange (SORF 150# - 600#)",
                price: "₹850/pc",
                originalPrice: "₹990/pc",
                image: "/metal/enhanced_ss_flanges.jpg"
            },
            {
                id: 6,
                name: "SS 316/316L Weld Neck Flange (WNRF 150# - 2500#)",
                price: "₹1,450/pc",
                originalPrice: null,
                image: "/metal/enhanced_ss_flanges.jpg"
            },
            {
                id: 7,
                name: "SS 316L Blind Flange (BLRF Raised Face)",
                price: "₹1,150/pc",
                originalPrice: "₹1,350/pc",
                image: "/metal/flanges.jpg"
            }
        ]
    },
    {
        id: 5,
        image: "/metal/enhanced_ss_fasteners.jpg",
        title: "High-Tensile Fasteners & Stud Bolts",
        products: [
            {
                id: 13,
                name: "SS Hex Head Bolts DIN 933 / ISO 4017 (A2-70 & A4-80)",
                price: "₹45/pc",
                originalPrice: "₹55/pc",
                image: "/metal/enhanced_ss_fasteners.jpg"
            },
            {
                id: 14,
                name: "SS Heavy Hex Nuts DIN 934 / ASTM A194 Gr 8M",
                price: "₹28/pc",
                originalPrice: null,
                image: "/metal/enhanced_ss_fasteners.jpg"
            },
            {
                id: 15,
                name: "ASTM A193 B8 / B8M Continuous Thread Stud Bolts",
                price: "₹190/pc",
                originalPrice: "₹240/pc",
                image: "/metal/fastners.jpg"
            }
        ]
    }
];

const ShopLookPopup = memo(({ products = [], onClose, onProductClick }) => {
    return (
        <div
            className="absolute rounded-10 bg-white top-0 right-0 p-12 m-20 z-20"
            style={{
                width: '280px',
                maxWidth: 'calc(100% - 48px)',
            }}
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between pb-12 bordb">
                <div className="flex items-center gap-8">
                    <h4 className="headmini-text font-500 text-dark capitalize">Material Scope</h4>
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
                tag="ENGINEERED PRODUCT PACKAGES"
                title="Stainless Steel Round Bars, Forged Fittings & Flanges Scope"
                subtitle="Browse certified alloy packages ready for immediate dispatch from our Mumbai stockyard."
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