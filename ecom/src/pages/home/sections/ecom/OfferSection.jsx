import React, { useState, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import Badge from '../../../../components/common/Badge';
import Icon from '../../../../components/common/Icon';
import { useCart } from '../../../../context/CartContext';

const SPEAKERS_DATA = [
    {
        id: 1,
        name: 'Bass Wave',
        brand: 'AUREAL',
        price: '$4,750.00',
        rating: 4.8,
        image: '/images/speakers/bass_wave_silver.jpg',
        variants: [
            {
                id: 'silver',
                colorName: 'Polished Silver',
                image: '/images/speakers/bass_wave_silver.jpg',
                thumb: '/images/speakers/bass_wave_silver.jpg'
            },
            {
                id: 'black',
                colorName: 'Obsidian Black',
                image: '/images/speakers/bass_wave_black.jpg',
                thumb: '/images/speakers/bass_wave_black.jpg'
            },
            {
                id: 'gold',
                colorName: 'Champagne Gold',
                image: '/images/speakers/bass_wave_gold.jpg',
                thumb: '/images/speakers/bass_wave_gold.jpg'
            }
        ]
    },
    {
        id: 2,
        name: 'Column Tower Duo',
        brand: 'AUREAL',
        price: '$3,890.00',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
        variants: [
            {
                id: 'midnight',
                colorName: 'Midnight Black',
                image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
                thumb: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=120&q=80'
            },
            {
                id: 'walnut',
                colorName: 'Walnut Wood',
                image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
                thumb: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=120&q=80'
            }
        ]
    },
    {
        id: 3,
        name: 'Aura Sphere 360',
        brand: 'AUREAL',
        price: '$2,450.00',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
        variants: [
            {
                id: 'titanium',
                colorName: 'Titanium Gray',
                image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
                thumb: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=120&q=80'
            }
        ]
    }
];

// Interactive Living Room Slide (60% width)
const InteractiveRoomSlide = memo(({
    speakerVariant,
    activeHotspot,
    onToggleHotspot,
    onProductClick
}) => {
    return (
        <div
            className="rounded-15 relative overflow-hidden flex-shrink-0 offer-slide-first"
            style={{ height: '520px' }}
        >
            {/* Background Room Photo */}
            <Image
                src="/images/speakers/living_room.jpg"
                alt="Aureal Premium Speakers Living Room"
                className="w-full h-full object-cover"
            />

            {/* Hotspot 1: Column Tower Speaker (Left) */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleHotspot(1);
                }}
                className="absolute z-10 cursor-pointer flex items-center justify-center group"
                style={{ top: '52%', left: '16%', transform: 'translate(-50%, -50%)' }}
                aria-label="View Column Tower Duo speaker"
            >
                <div
                    className="rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(2px)'
                    }}
                >
                    <div
                        className="rounded-full bg-white shadow-md"
                        style={{ width: '14px', height: '14px' }}
                    />
                </div>
            </div>

            {/* Hotspot 1 Popover Tooltip */}
            {activeHotspot === 1 && (
                <div
                    className="absolute z-20 bg-white rounded-10 p-12 shadow-lg flex items-center gap-12 cursor-pointer hover:shadow-xl transition-shadow"
                    style={{
                        top: 'calc(52% + 22px)',
                        left: '10%',
                        width: '260px',
                        maxWidth: 'calc(100% - 48px)'
                    }}
                    onClick={() => onProductClick(SPEAKERS_DATA[1])}
                >
                    <div
                        className="absolute -top-7 left-20"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: '7px solid transparent',
                            borderRight: '7px solid transparent',
                            borderBottom: '7px solid #ffffff'
                        }}
                    />
                    <div className="w-50 h-50 rounded-5 bg-forth flex items-center justify-center p-4 flex-shrink-0 overflow-hidden">
                        <img
                            src={SPEAKERS_DATA[1].image}
                            alt={SPEAKERS_DATA[1].name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="small-text font-600 text-dark truncate">{SPEAKERS_DATA[1].name}</p>
                        <p className="mini-text text-gray font-500 mt-2">{SPEAKERS_DATA[1].price}</p>
                    </div>
                </div>
            )}

            {/* Hotspot 2: Faceted Bass Wave Speaker (Center-Right Floor) */}
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleHotspot(2);
                }}
                className="absolute z-10 cursor-pointer flex items-center justify-center group"
                style={{ top: '61%', left: '49%', transform: 'translate(-50%, -50%)' }}
                aria-label="View Bass Wave speaker"
            >
                <div
                    className="rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{
                        width: '42px',
                        height: '42px',
                        backgroundColor: 'rgba(255, 255, 255, 0.45)',
                        backdropFilter: 'blur(3px)'
                    }}
                >
                    <div
                        className="rounded-full bg-white shadow-md"
                        style={{ width: '20px', height: '20px' }}
                    />
                </div>
            </div>

            {/* Hotspot 2 Popover Tooltip (Connected to Floor Speaker) */}
            {activeHotspot === 2 && (
                <div
                    className="absolute z-20 bg-white rounded-10 p-12 shadow-lg flex items-center gap-12 cursor-pointer hover:shadow-xl transition-shadow"
                    style={{
                        top: 'calc(61% + 24px)',
                        left: '36%',
                        width: '280px',
                        maxWidth: 'calc(100% - 48px)'
                    }}
                    onClick={() => onProductClick(SPEAKERS_DATA[0])}
                >
                    {/* Arrow pointing up directly to the hotspot pin */}
                    <div
                        className="absolute -top-7 left-36"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: '7px solid transparent',
                            borderRight: '7px solid transparent',
                            borderBottom: '7px solid #ffffff'
                        }}
                    />
                    <div className="w-50 h-50 rounded-5 bg-forth flex items-center justify-center p-4 flex-shrink-0 overflow-hidden">
                        <img
                            src={speakerVariant?.image || SPEAKERS_DATA[0].image}
                            alt="Bass Wave"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="small-text font-600 text-dark truncate">Bass Wave</p>
                        <p className="mini-text text-gray font-500 mt-2">$4,750.00</p>
                    </div>
                </div>
            )}
        </div>
    );
});

InteractiveRoomSlide.displayName = 'InteractiveRoomSlide';

// Speaker Spotlight Card (40% width)
const SpeakerSpotlightCard = memo(({
    speaker,
    activeColorIndex,
    onSelectColor,
    onProductClick
}) => {
    const currentVariant = speaker.variants ? speaker.variants[activeColorIndex] || speaker.variants[0] : null;
    const displayImage = currentVariant ? currentVariant.image : speaker.image;

    return (
        <div
            className="rounded-15 p-24 sm-p-16 justify-between relative bg-forth"
            style={{ height: '520px' }}
        >
            {/* Top Rating Badge */}
            <div className="flex items-center justify-end w-full">
                <Badge
                    text={String(speaker.rating || '4.8')}
                    icon="Star"
                    iconSize={12}
                    iconColor="#f59e0b"
                    color="white"
                    shape="pill"
                    size="xs"
                    className="font-600 shadow-sm"
                />
            </div>

            {/* Center Product Image */}
            <div
                className="flex-1 flex items-center justify-center py-16 cursor-pointer"
                onClick={() => onProductClick(speaker)}
            >
                <img
                    src={displayImage}
                    alt={speaker.name}
                    className="w-auto object-contain transition-transform duration-300 hover:scale-105"
                    style={{ maxHeight: '280px' }}
                />
            </div>

            {/* Bottom Info & Swatches */}
            <div className="w-full">
                <p className="mini-text font-600 text-gray uppercase tracking-wider mb-4">
                    {speaker.brand || 'AUREAL'}
                </p>
                <div className="flex items-center justify-between">
                    <h3
                        className="headmini-text font-700 text-dark cursor-pointer hover:text-primary transition-colors"
                        onClick={() => onProductClick(speaker)}
                    >
                        {speaker.name}
                    </h3>
                    <span className="mid-text font-700 text-dark">
                        {speaker.price}
                    </span>
                </div>

                {/* Color Swatches */}
                {speaker.variants && speaker.variants.length > 0 && (
                    <div className="flex items-center gap-8 mt-14">
                        {speaker.variants.map((v, idx) => (
                            <button
                                key={v.id || idx}
                                type="button"
                                onClick={() => onSelectColor(idx)}
                                aria-label={`Select ${v.colorName}`}
                                className={`rounded-8 p-3 cursor-pointer transition-all flex items-center justify-center bg-white ${activeColorIndex === idx
                                    ? 'border border-dark shadow-sm scale-105'
                                    : 'border border-gray/30 hover:border-gray'
                                    }`}
                                style={{ width: '38px', height: '38px' }}
                            >
                                <img
                                    src={v.thumb || v.image}
                                    alt={v.colorName}
                                    className="w-full h-full object-contain"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

SpeakerSpotlightCard.displayName = 'SpeakerSpotlightCard';

const OfferSection = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const scrollRef = useRef(null);

    // Active color variant for Bass Wave speaker (0: silver, 1: black, 2: gold)
    const [activeColorIndex, setActiveColorIndex] = useState(0);

    // Default open on Hotspot 2 (floor speaker) as shown in user's image
    const [activeHotspot, setActiveHotspot] = useState(2);
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

    const handleToggleHotspot = useCallback((id) => {
        setActiveHotspot((prev) => (prev === id ? null : id));
    }, []);

    const handleSelectColor = useCallback((index) => {
        setActiveColorIndex(index);
    }, []);

    const handleProductClick = useCallback((product) => {
        addToCart(product);
        navigate(`/product/${product.id}`, { state: { product } });
    }, [addToCart, navigate]);

    return (
        <Container>
            <div className="w-full py-30">
                <style>{`
                    .offer-slide-first {
                        flex: 0 0 calc(60% - 12px);
                        width: calc(60% - 12px);
                        min-width: 320px;
                    }
                    .offer-slide-other {
                        flex: 0 0 calc(40% - 12px);
                        width: calc(40% - 12px);
                        min-width: 280px;
                    }
                    @media (max-width: 768px) {
                        .offer-slide-first {
                            flex: 0 0 85% !important;
                            width: 85% !important;
                            min-width: 280px !important;
                        }
                        .offer-slide-other {
                            flex: 0 0 70% !important;
                            width: 70% !important;
                            min-width: 250px !important;
                        }
                    }
                `}</style>

                {/* Section Header */}
                <div className="text-center">
                    <p className="para-text font-500 text-gray uppercase">
                        Premium Speakers
                    </p>
                    <h2 className="head-text font-700 text-dark relative inline-block">
                        Bring Quality Sound into Your{' '}
                        <span className="relative">
                            Home
                            <svg
                                className="absolute left-0 bottom-0 w-full"
                                height="14"
                                viewBox="0 0 100 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3 9C28 3 72 3 97 10C80 7 40 5 15 11"
                                    stroke="#E59866"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </h2>
                </div>

                {/* Horizontal Slider (60% First Slide / 40% Other Slides) */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex gap-12 items-start overflow-auto mt-30"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollBehavior: 'smooth'
                    }}
                >
                    {/* First Slide: Interactive Living Room Scene (60%) */}
                    <InteractiveRoomSlide
                        speakerVariant={SPEAKERS_DATA[0].variants[activeColorIndex]}
                        activeHotspot={activeHotspot}
                        onToggleHotspot={handleToggleHotspot}
                        onProductClick={handleProductClick}
                    />

                    {/* Second Slide: Bass Wave Spotlight Card (40%) */}
                    <SpeakerSpotlightCard
                        speaker={SPEAKERS_DATA[0]}
                        activeColorIndex={activeColorIndex}
                        onSelectColor={handleSelectColor}
                        onProductClick={handleProductClick}
                    />

                    {/* Additional Speaker Cards for continuous smooth sliding */}
                    {SPEAKERS_DATA.slice(1).map((speaker) => (
                        <SpeakerSpotlightCard
                            key={speaker.id}
                            speaker={speaker}
                            activeColorIndex={0}
                            onSelectColor={() => { }}
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
                        {/* Carousel Dots Indicator */}
                        <div className="flex items-center gap-6">
                            <span
                                onClick={() => scroll('left')}
                                className={`cursor-pointer rounded-full transition-all ${scrollProgress <= 40 ? 'bg-dark' : 'bg-gray/40'
                                    }`}
                                style={{
                                    width: scrollProgress <= 40 ? '16px' : '6px',
                                    height: '6px'
                                }}
                                aria-label="First slide"
                            />
                            <span
                                onClick={() => scroll('right')}
                                className={`cursor-pointer rounded-full transition-all ${scrollProgress > 40 ? 'bg-dark' : 'bg-gray/40'
                                    }`}
                                style={{
                                    width: scrollProgress > 40 ? '16px' : '6px',
                                    height: '6px'
                                }}
                                aria-label="Next slide"
                            />
                        </div>

                        {/* Navigation Buttons from FeatureSection.jsx */}
                        <div className="flex items-center gap-10">
                            <Button
                                aria-label="Previous speaker"
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
                                aria-label="Next speaker"
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
            </div>
        </Container>
    );
};

export default memo(OfferSection);