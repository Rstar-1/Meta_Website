import React, { useState, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import Badge from '../../../../components/common/Badge';
import { useCart } from '../../../../context/CartContext';

const SPACES_DATA = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        title: 'Modern Living Space',
        products: [
            {
                id: 102,
                name: 'Loop Sofa Armrest',
                price: '$3,289.00',
                originalPrice: '$3,369.00',
                image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80'
            },
            {
                id: 103,
                name: 'Flip Table Lamp',
                price: '$605.00',
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80'
            },
            {
                id: 104,
                name: 'Swivel Table',
                price: '$305.00',
                originalPrice: '$345.00',
                image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=300&q=80'
            }
        ]
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        title: 'Terracotta Dining Space',
        products: [
            {
                id: 201,
                name: 'Arch Minimal Chair',
                price: '$280.00',
                originalPrice: '$320.00',
                image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=300&q=80'
            },
            {
                id: 202,
                name: 'Stone Cylindrical Table',
                price: '$1,120.00',
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=300&q=80'
            },
            {
                id: 203,
                name: 'Clay Pendant Light',
                price: '$185.00',
                originalPrice: '$210.00',
                image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=300&q=80'
            }
        ]
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        title: 'Neutral Organic Gallery',
        products: [
            {
                id: 301,
                name: 'Sculptural Wood Bench',
                price: '$890.00',
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=300&q=80'
            },
            {
                id: 302,
                name: 'Ceramic Floor Vessel',
                price: '$145.00',
                originalPrice: '$175.00',
                image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=300&q=80'
            }
        ]
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1200&q=80',
        title: 'Minimalist Bedroom Sanctuary',
        products: [
            {
                id: 401,
                name: 'Linen Platform Bed',
                price: '$1,650.00',
                originalPrice: '$1,890.00',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=300&q=80'
            },
            {
                id: 402,
                name: 'Ceramic Nightstand Lamp',
                price: '$210.00',
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=300&q=80'
            }
        ]
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
        title: 'Scandinavian Workspace',
        products: [
            {
                id: 501,
                name: 'Solid Oak Writing Desk',
                price: '$890.00',
                originalPrice: '$980.00',
                image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=300&q=80'
            },
            {
                id: 502,
                name: 'Ergonomic Curved Chair',
                price: '$450.00',
                originalPrice: null,
                image: 'https://images.unsplash.com/photo-1580481077195-c22ae00f68d4?auto=format&fit=crop&w=300&q=80'
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
            {/* Header */}
            <div className="flex items-center justify-between pb-12 bordb">
                <div className="flex items-center gap-8">
                    <h4 className="headmini-text font-500 text-dark">Shop this look</h4>
                    <Badge text={`${products.length} items`} size="xs" color="forth" shape="rounded" />
                </div>
                <Button
                    aria-label="Close shop look"
                    onClick={onClose}
                    icon="Close"
                    iconWidth="14"
                    iconHeight="14"
                    version="icon"
                    variant="outline"
                    bg="transparent"
                    color="gray"
                />
            </div>

            {/* Products List */}
            <div className="grid-cols-1">
                {products.map((p, idx) => (
                    <div
                        key={p.id}
                        onClick={() => onProductClick(p)}
                        className={`flex items-center justify-between gap-12 py-10 cursor-pointer group ${idx < products.length - 1 ? 'bordb' : ''
                            }`}
                    >
                        <div className="flex items-center gap-12 overflow-hidden flex-1">
                            <img
                                src={p.image}
                                alt={p.name}
                                width='50px'
                                height='50px'
                                className="flex object-cover rounded-5"
                            />

                            <div className="overflow-hidden flex-1">
                                <p className="small-text font-600 text-dark truncate group-hover:text-primary transition-colors">
                                    {p.name}
                                </p>
                                <div className="flex items-center gap-6 mt-2">
                                    <span className={`mini-text font-600 ${p.originalPrice ? 'text-danger' : 'text-dark'}`}>
                                        {p.price}
                                    </span>
                                    {p.originalPrice && (
                                        <span className="mini-text text-gray line-through font-400">
                                            {p.originalPrice}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Circular Action Button */}
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

const SpaceCard = memo(({ space, isFirst, isOpen, onToggle, onProductClick }) => {
    return (
        <div
            className='rounded-10 relative overflow-hidden h-450'
            style={{ minWidth: isFirst ? '540px' : '350px' }}
        >
            {/* Background Room Image */}
            <Image
                src={space.image}
                alt={space.title}
                className="w-full h-full object-cover"
            />

            {/* Shop This Look Popup Modal */}
            {isOpen && (
                <ShopLookPopup
                    products={space.products}
                    onClose={onToggle}
                    onProductClick={onProductClick}
                />
            )}

            {/* Floating Tag Pill Button on Bottom Right */}
            <Badge
                text={space.products.length}
                icon="Bag"
                iconSize={14}
                iconStrokeWidth="2"
                shape="pill"
                size="md"
                color="white"
                onClick={onToggle}
                className="absolute z-10 font-600 shadow cursor-pointer"
                style={{
                    bottom: '20px',
                    right: '20px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.18)'
                }}
                aria-label={`Shop ${space.products.length} items from this look`}
            />
        </div>
    );
});

SpaceCard.displayName = 'SpaceCard';

const FeatureSection = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const scrollRef = useRef(null);

    // Default open on first slide as shown in user's image
    const [activeLookId, setActiveLookId] = useState(1);
    const [scrollProgress, setScrollProgress] = useState(25);

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
        <Container>
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

                {/* Section Title */}
                <h2 className="head-text font-700 text-dark mb-24">
                    Get Inspired by Spaces
                </h2>

                {/* Horizontal Slider */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-12 overflow-auto"
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
                            isOpen={activeLookId === space.id}
                            onToggle={() => handleToggleLook(space.id)}
                            onProductClick={handleProductClick}
                        />
                    ))}
                </div>

                {/* Bottom Controls: Progress Bar & Arrow Buttons (referencing FeatureSection.jsx) */}
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
        </Container>
    );
};

export default memo(FeatureSection);