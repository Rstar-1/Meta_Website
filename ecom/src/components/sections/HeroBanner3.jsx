import React, { memo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import { configData } from '../../../../utils/apiData';

// Type 1 Images (Furniture)
import scandiSofaImg from '../../../../assets/hero/scandi_sofa.jpg';
import warmLivingImg from '../../../../assets/hero/living_room_warm.jpg';
import modernLivingImg from '../../../../assets/hero/living_modern.jpg';

// Type 2 Images (Audio Elegance)
import audioEleganceImg from '../../../../assets/hero/audio_elegance_banner.png';
import audioHeadphonesImg from '../../../../assets/hero/hero_bluetooth_headphones.jpg';
import audioSpeakerImg from '../../../../assets/hero/type3_speaker_dark.jpg';

// Categories Images
import catJacketImg from '../../../../assets/hero/cat_jacket.jpg';
import catSocksImg from '../../../../assets/hero/cat_socks.jpg';
import catHatImg from '../../../../assets/hero/cat_hat.jpg';
import catVestImg from '../../../../assets/hero/cat_vest.jpg';
import catSweaterImg from '../../../../assets/hero/cat_sweater.jpg';
import catPufferImg from '../../../../assets/hero/cat_puffer.jpg';

const CATEGORIES = [
    { id: 'jackets', name: 'Jackets', image: catJacketImg, path: '/product?category=Jackets' },
    { id: 'socks', name: 'Socks', image: catSocksImg, path: '/product?category=Socks' },
    { id: 'hats', name: 'Hats', image: catHatImg, path: '/product?category=Hats' },
    { id: 'hoodies', name: 'Hoodies', image: catVestImg, path: '/product?category=Hoodies' },
    { id: 'sweaters', name: 'Sweaters', image: catSweaterImg, path: '/product?category=Sweaters' },
    { id: 'puffers', name: 'Puffers', image: catPufferImg, path: '/product?category=Puffers' },
];

/* ------------------- Type 1 Slides ------------------- */
const TYPE1_SLIDES = [
    {
        id: 1,
        tag: 'Modern Elegance',
        title: 'Modern Elegance Spoke Sofa',
        buttonText: 'Shop Collection',
        path: '/product',
        image: scandiSofaImg,
        alt: 'Modern Elegance Spoke Sofa'
    },
    {
        id: 2,
        tag: 'Timeless Living',
        title: 'Nordic Lounge Interior',
        buttonText: 'Shop Collection',
        path: '/product',
        image: warmLivingImg,
        alt: 'Nordic Lounge Interior'
    },
    {
        id: 3,
        tag: 'Artisan Craft',
        title: 'Modern Living Space',
        buttonText: 'Shop Collection',
        path: '/product',
        image: modernLivingImg,
        alt: 'Modern Living Space'
    }
];

/* ------------------- Type 2 Slides ------------------- */
const TYPE2_SLIDES = [
    {
        id: 1,
        title: 'EXPERIENCE\nUNPARALLELED AUDIO\nELEGANCE',
        buttonText: 'Shop Headphones',
        path: '/product',
        image: modernLivingImg,
        alt: 'Experience Unparalleled Audio Elegance'
    },
    {
        id: 2,
        title: 'STUDIO FIDELITY\nCRAFTED FOR PURITY',
        buttonText: 'Shop Headphones',
        path: '/product',
        image: audioHeadphonesImg,
        alt: 'Studio Fidelity Audio'
    },
    {
        id: 3,
        title: 'IMMERSIVE ACOUSTICS\nFOR MODERN SPACES',
        buttonText: 'Shop Speakers',
        path: '/product',
        image: warmLivingImg,
        alt: 'Immersive Acoustics'
    }
];

/* ========================================================
   TYPE 1: Centered Scandinavian Furniture Swiper UI
   ======================================================== */
const Type1SlideItem = memo(({ slide, onNavigate }) => {
    const handleButtonClick = useCallback((e) => {
        e?.stopPropagation?.();
        onNavigate(slide.path);
    }, [onNavigate, slide.path]);

    return (
        <div
            className="w-full relative rounded-10 overflow-hidden cursor-pointer h-500"
            onClick={() => onNavigate(slide.path)}
        >
            <Image src={slide.image} alt={slide.alt} className="w-full h-full object-cover flex filter-b4" loading="eager" />

            <div
                className='absolute top-0 left-0 w-full h-full'
            >
                <div className='flex items-center justify-center h-full'>
                    <div>
                        <p className="text-white font-500 headpara-text uppercase text-center">
                            {slide.tag}
                        </p>
                        <h2 className="text-white font-600 large-text uppercase mt-2 text-center">
                            {slide.title}
                        </h2>
                        <Button text={slide.buttonText} version="v1" bg="white" color="dark" className="rounded-30 font-500 mx-auto flex mt-16" onClick={handleButtonClick} />
                    </div>
                </div>
            </div>
        </div>
    );
});
Type1SlideItem.displayName = 'Type1SlideItem';

const Type1Swiper = memo(({ onNavigate }) => {
    const [swiper, setSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = useCallback((s) => setActiveIndex(s.realIndex), []);
    const handlePrev = useCallback(() => swiper?.slidePrev(), [swiper]);
    const handleNext = useCallback(() => swiper?.slideNext(), [swiper]);
    const handleDot = useCallback((idx) => swiper?.slideToLoop(idx), [swiper]);

    return (
        <div className="w-full relative rounded-10 overflow-hidden">
            <Swiper onSwiper={setSwiper} onSlideChange={handleSlideChange} modules={[Autoplay]} slidesPerView={1} loop autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }} speed={600} className="w-full rounded-10 overflow-hidden">
                {TYPE1_SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <Type1SlideItem slide={slide} onNavigate={onNavigate} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div style={{ position: 'absolute', bottom: '24px', left: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', zIndex: 10, pointerEvents: 'auto', userSelect: 'none' }}>
                <button type="button" aria-label="Previous" onClick={handlePrev} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', opacity: 0.85 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {TYPE1_SLIDES.map((_, idx) => (
                        <button key={idx} type="button" aria-label={`Slide ${idx + 1}`} onClick={() => handleDot(idx)} style={{ width: idx === activeIndex ? '36px' : '7px', height: idx === activeIndex ? '4px' : '7px', borderRadius: idx === activeIndex ? '3px' : '50%', backgroundColor: idx === activeIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.55)', border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }} />
                    ))}
                </div>
                <button type="button" aria-label="Next" onClick={handleNext} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', opacity: 0.85 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
            </div>
        </div>
    );
});
Type1Swiper.displayName = 'Type1Swiper';

/* ========================================================
   TYPE 2: Luxury Audio Elegance Swiper UI
   ======================================================== */
const Type2SlideItem = memo(({ slide, onNavigate }) => {
    const handleButtonClick = useCallback((e) => {
        e?.stopPropagation?.();
        onNavigate(slide.path);
    }, [onNavigate, slide.path]);

    return (
        <div
            className="w-full relative rounded-10 overflow-hidden cursor-pointer h-500"
            onClick={() => onNavigate(slide.path)}
        >
            <Image src={slide.image} alt={slide.alt} className="w-full h-full object-cover filter-b5 flex" loading="eager" />
            <div className='absolute bottom-0 left-0 w-full z-20'>
                <div className='flex items-end justify-between px-30 pb-80'>
                    <h2
                        className="text-white font-600 large-text uppercase w-50"
                    >
                        {slide.title}
                    </h2>

                    <Button
                        text={slide.buttonText}
                        version="v1"
                        bg="white"
                        color="dark"
                        className='rounded-30 font-500'
                        onClick={handleButtonClick}
                    />
                </div>
            </div>
        </div>
    );
});
Type2SlideItem.displayName = 'Type2SlideItem';

const Type2Swiper = memo(({ onNavigate }) => {
    const [swiper, setSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = useCallback((s) => setActiveIndex(s.realIndex), []);
    const handlePrev = useCallback(() => swiper?.slidePrev(), [swiper]);
    const handleNext = useCallback(() => swiper?.slideNext(), [swiper]);
    const handleDot = useCallback((idx) => swiper?.slideToLoop(idx), [swiper]);

    return (
        <div className="w-full relative rounded-10 overflow-hidden">
            <Swiper onSwiper={setSwiper} onSlideChange={handleSlideChange} modules={[Autoplay]} slidesPerView={1} loop autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }} speed={700} className="w-full rounded-10 overflow-hidden">
                {TYPE2_SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <Type2SlideItem slide={slide} onNavigate={onNavigate} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Bottom Controls Bar: Left arrow, Center dots, Right arrow */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '22px',
                    left: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 42px',
                    boxSizing: 'border-box',
                    zIndex: 10,
                    pointerEvents: 'auto',
                    userSelect: 'none'
                }}
            >
                {/* Left Thin Arrow */}
                <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={handlePrev}
                    style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', opacity: 0.85, transition: 'opacity 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                </button>

                {/* Center 3 Dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {TYPE2_SLIDES.map((_, idx) => {
                        const isActive = idx === activeIndex;
                        return (
                            <button
                                key={idx}
                                type="button"
                                aria-label={`Slide ${idx + 1}`}
                                onClick={() => handleDot(idx)}
                                style={{
                                    width: isActive ? '8px' : '5px',
                                    height: isActive ? '8px' : '5px',
                                    borderRadius: '50%',
                                    backgroundColor: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.45)',
                                    outline: isActive ? '2px solid rgba(255,255,255,0.7)' : 'none',
                                    outlineOffset: '2px',
                                    border: 'none',
                                    padding: 0,
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease'
                                }}
                            />
                        );
                    })}
                </div>

                {/* Right Thin Arrow */}
                <button
                    type="button"
                    aria-label="Next slide"
                    onClick={handleNext}
                    style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', opacity: 0.85, transition: 'opacity 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                    </svg>
                </button>
            </div>
        </div>
    );
});
Type2Swiper.displayName = 'Type2Swiper';

/* ------------------- Category Section ------------------- */
const CategorySection = memo(({ onNavigate, className = '' }) => {
    const handleClick = useCallback((path) => onNavigate(path), [onNavigate]);

    return (
        <div className={`grid-cols-6 md-grid-cols-4 sm-grid-cols-2 gap-12 w-full ${className}`}>
            {CATEGORIES.map((cat) => (
                <div key={cat.id} onClick={() => handleClick(cat.path)} className="bg-white rounded-5 p-10 cursor-pointer">
                    <Image src={cat.image} alt={cat.name} className="object-cover flex w-full h-150 bg-forth bordb" loading="lazy" />
                    <div className="flex items-center justify-between w-full mt-6">
                        <p className="font-500 para-text text-dark">{cat.name}</p>
                        <Button icon="ChevronRight" version="icon" variant="outline" border="tertiary" bg="transparent" color="gray" className="rounded-30" onClick={(e) => { e?.stopPropagation?.(); handleClick(cat.path); }} />
                    </div>
                </div>
            ))}
        </div>
    );
});
CategorySection.displayName = 'CategorySection';

/* ========================================================
   Root HeroBanner Component
   ======================================================== */
const BANNER_MAP = {
    1: Type1Swiper,
    2: Type2Swiper
};

const HeroBanner = memo(() => {
    const navigate = useNavigate();
    const handleNavigate = useCallback((path) => navigate(path), [navigate]);

    const heroConfig = configData?.HeroBanner?.[0] || {};
    const heroBannerType = heroConfig.HeroBannerType ?? 1;
    const heroBannerCat = heroConfig.HeroBannerCat ?? 1;

    const ActiveBanner = BANNER_MAP[heroBannerType] || Type1Swiper;

    return (
        <Container style={{ background: 'var(--forth)' }}>
            <div className="w-full py-30">
                {heroBannerCat ? (
                    <>
                        <CategorySection onNavigate={handleNavigate} className="mb-15" />
                        <ActiveBanner onNavigate={handleNavigate} />
                    </>
                ) : (
                    <>
                        <ActiveBanner onNavigate={handleNavigate} />
                        <CategorySection onNavigate={handleNavigate} className="mt-15" />
                    </>
                )}
            </div>
        </Container>
    );
});

HeroBanner.displayName = 'HeroBanner';

export default HeroBanner;
