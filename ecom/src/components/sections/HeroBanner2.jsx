import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import { configData } from '../../../../utils/apiData';

// Type 1 Images
import heroRelicImg from '../../../../assets/hero/hero_relic_hoodie.jpg';
import heroVintageHatImg from '../../../../assets/hero/hero_vintage_hat.jpg';
import heroSurfingBeanieImg from '../../../../assets/hero/hero_surfing_beanie.jpg';
import heroSeasonalSocksImg from '../../../../assets/hero/hero_seasonal_socks.jpg';

// Type 2 Images
import heroBluetoothHeadphonesImg from '../../../../assets/hero/hero_bluetooth_headphones.jpg';
import heroSmartLightingImg from '../../../../assets/hero/hero_smart_lighting.jpg';
import heroAppleSmartwatchImg from '../../../../assets/hero/hero_apple_smartwatch.jpg';

// Type 3 Images
import heroType3SpeakersImg from '../../../../assets/hero/type3_speaker_dark.jpg';
import heroType3PhonesImg from '../../../../assets/hero/type3_phones.jpg';
import heroType3AudioImg from '../../../../assets/hero/type3_audio_headphones.jpg';
import heroType3LaptopsImg from '../../../../assets/hero/type3_laptop_clean.jpg';
import heroType3VrGamingImg from '../../../../assets/hero/type3_vr_gaming.jpg';

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

/* ------------------- Type 1 Components ------------------- */
const Type1Banners = memo(({ onNavigate }) => (
    <div className="flex gap-8 w-full">
        <div className="w-45 md-w-full sm-w-full sm-h-400 relative rounded-10 overflow-hidden bg-forth" style={{ height: '508px' }}>
            <Image src={heroRelicImg} alt="Relic Relaxed" className="w-full h-full object-cover flex filter-b4" loading="eager" fetchPriority="high" />
            <div className="absolute bottom-0 left-0 m-20">
                <p className="para-text text-white font-500">HOLIDAY '25 COLLECTION</p>
                <h2 className="text-white large-text font-600 mt-6 uppercase">Relic Relaxed</h2>
                <Button text="Shop Collection" version="v1" bg="white" color="dark" className="rounded-30 mt-6" onClick={() => onNavigate('/product')} />
            </div>
        </div>

        <div className="w-25 md-w-full sm-w-full sm-h-400 relative rounded-10 overflow-hidden" style={{ height: '508px' }}>
            <Image src={heroVintageHatImg} alt="Vintage Hats" className="w-full h-full object-cover flex filter-b4" loading="eager" />
            <div className="absolute bottom-0 left-0 m-16">
                <p className="para-text text-white font-500">NEW ARRIVALS</p>
                <h2 className="text-white head-text font-600 uppercase">Vintage Hats</h2>
                <Button text="Shop Now" version="v2" bg="white" color="dark" className="rounded-30 mt-8" onClick={() => onNavigate('/product?category=Hats')} />
            </div>
        </div>

        <div className="w-30 md-w-full sm-w-full grid-cols-1 gap-7">
            <div className="relative rounded-10 overflow-hidden h-250 bg-warning">
                <Image src={heroSurfingBeanieImg} alt="Saving 40% Surfing" className="w-full h-full object-cover flex filter-b4" />
                <div className="absolute bottom-0 left-0 m-18 w-60">
                    <h3 className="text-white font-500 title-text">Saving <br />40% Surfing</h3>
                    <Button text="Shop Now" version="v2" bg="white" color="dark" className="rounded-30 mt-10" onClick={() => onNavigate('/product')} />
                </div>
            </div>
            <div className="relative rounded-10 overflow-hidden h-250 bg-warning">
                <Image src={heroSeasonalSocksImg} alt="Holiday Seasonal Socks" className="w-full h-full object-cover flex filter-b4" />
                <div className="absolute bottom-0 left-0 m-18 w-60">
                    <h3 className="text-white font-500 title-text">Holiday<br />Seasonal Socks</h3>
                    <Button text="Shop Now" version="v2" bg="white" color="dark" className="rounded-30 mt-10" onClick={() => onNavigate('/product?category=Socks')} />
                </div>
            </div>
        </div>
    </div>
));
Type1Banners.displayName = 'Type1Banners';

/* ------------------- Type 2 Components ------------------- */
const Type2Banners = memo(({ onNavigate }) => (
    <div className="flex gap-8 w-full">
        <div className="w-70 md-w-full sm-w-full sm-h-400 relative rounded-10 overflow-hidden bg-primary" style={{ height: '508px' }}>
            <Image src={heroBluetoothHeadphonesImg} alt="Bluetooth Earbuds" className="w-full h-full object-cover filter-b6 flex" loading="eager" fetchPriority="high" />
            <div className="absolute bottom-0 left-0 w-full">
                <div className='w-60 m-30'>
                    <p className="para-text text-white font-400 uppercase">New On Store</p>
                    <h2 className="text-white large-text font-600 mt-2 uppercase">Bluetooth Wireless Earbuds</h2>
                    <Button text="Shop Headphones" version="v1" bg="white" color="dark" className="rounded-30 mt-10" onClick={() => onNavigate('/product')} />
                </div>
            </div>
        </div>

        <div className="w-30 md-w-full sm-w-full grid-cols-1 gap-7">
            <div className="relative rounded-10 overflow-hidden h-250 bg-secondary">
                <Image src={heroSmartLightingImg} alt="Smart Lighting" className="w-full h-full object-cover filter-b4 flex" />
                <div className="absolute bottom-0 left-0 w-full">
                    <div className='w-80 m-16'>
                        <p className="para-text text-white font-400">Starting at $100</p>
                        <h3 className="text-white font-500 title-text uppercase mt-2">Apple Ultra Smart watch</h3>
                        <Button text="Shop Now" version="v2" bg="white" color="dark" className="rounded-30 mt-10" onClick={() => onNavigate('/product')} />
                    </div>
                </div>
            </div>
            <div className="relative rounded-10 overflow-hidden h-250 bg-tertiary">
                <Image src={heroType3AudioImg} alt="Apple Ultra Smartwatch" className="w-full h-full object-cover filter-b4 flex" style={{ mixBlendMode: 'multiply', objectFit: 'contain', objectPosition: 'right center' }} />
                <div className="absolute bottom-0 left-0 w-full">
                    <div className='w-80 m-16'>
                        <p className="para-text text-white font-400">Starting at $100</p>
                        <h3 className="text-white font-500 title-text uppercase mt-2">Apple Ultra Smart watch</h3>
                        <Button text="Shop Now" version="v2" bg="white" color="dark" className="rounded-30 mt-10" onClick={() => onNavigate('/product')} />
                    </div>
                </div>
            </div>
        </div>
    </div>
));
Type2Banners.displayName = 'Type2Banners';

/* ------------------- Type 3 Components ------------------- */
const Type3Banners = memo(({ onNavigate }) => (
    <div className="flex gap-8 w-full">
        <div className="w-75 md-w-full sm-w-full">
            <div
                onClick={() => onNavigate('/product')}
                className="relative rounded-10 overflow-hidden cursor-pointer h-300">
                <Image
                    src={heroBluetoothHeadphonesImg}
                    alt="Flagship Savings"
                    className="w-full h-full flex filter-b5 object-cover"
                    loading="eager"
                    fetchPriority="high"
                />
                <div
                    className="absolute top-0 left-0 flex items-center"
                    style={{
                        backgroundColor: '#be1e2d',
                        width: '46px',
                        height: '54px',
                        borderBottomLeftRadius: '23px',
                        borderBottomRightRadius: '23px',
                    }}
                >
                    <p className='mini-text text-white text-center font-500'>SALE <strong>45%</strong></p>
                </div>

                <div className="absolute bottom-0 left-0 w-full">
                    <div className='m-20 w-70'>
                        <p className="text-white headpara-text font-500 uppercase">
                            Up to 45% off
                        </p>
                        <h2 className="text-white font-600 large-text uppercase mt-2">
                            Premium Quality Unbeatable Prices
                        </h2>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 w-full mt-8">
                <div
                    onClick={() => onNavigate('/product')}
                    className="relative rounded-10 overflow-hidden h-250 cursor-pointer w-60"
                >
                    <Image
                        src={heroType3AudioImg}
                        alt="Immerse in Virtual Reality"
                        className="w-full h-full object-cover filter-b5 flex"
                    />
                    <div className="absolute bottom-0 left-0 w-full">
                        <div className='w-70 m-15'>
                            <p className='text-white font-500 small-text'>Up to 50% off</p>
                            <h3 className="text-white font-600 title-text uppercase mt-5">
                                Premium Audio, Unbeatable Prices
                            </h3>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => onNavigate('/product')}
                    className="relative rounded-10 overflow-hidden h-250 cursor-pointer w-40"
                >
                    <Image
                        src={heroType3LaptopsImg}
                        alt="Immerse in Virtual Reality"
                        className="w-full h-full object-cover filter-b5 flex"
                    />
                    <div className="absolute bottom-0 left-0 w-full">
                        <div className='w-70 m-15'>
                            <p className='text-white font-500 small-text'>Up to 50% off</p>
                            <h3 className="text-white font-600 title-text uppercase mt-5">
                                Laptops & Tablets
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-25 md-w-full sm-w-full">
            <div
                onClick={() => onNavigate('/product')}
                className="relative rounded-10 overflow-hidden h-200 cursor-pointer"
            >
                <Image
                    src={heroType3PhonesImg}
                    alt="Immerse in Virtual Reality"
                    className="w-full h-full object-cover filter-b5 flex"
                />
                <div className="absolute bottom-0 left-0 w-full">
                    <div className='w-70 m-15'>
                        <p className='text-white font-500 small-text'>Up to 50% off</p>
                        <h3 className="text-white font-600 title-text uppercase mt-5">
                            Immerse in Virtual Reality
                        </h3>
                    </div>
                </div>
            </div>

            <div
                onClick={() => onNavigate('/product')}
                className="relative rounded-10 overflow-hidden h-350 cursor-pointer mt-8"
            >
                <Image
                    src={heroType3VrGamingImg}
                    alt="Immerse in Virtual Reality"
                    className="w-full h-full object-cover filter-b5 flex"
                />
                <div className="absolute top-0 right-0 m-10">
                    <div className='bg-primary rounded-full flex items-center' style={{ width: '50px', height: '50px' }}>
                        <p className='mini-text text-white text-center uppercase font-500'>50% SALE</p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full">
                    <div className='w-70 m-15'>
                        <h3 className="text-white font-600 title-text uppercase">
                            Immerse in Virtual Reality
                        </h3>
                        <div className="flex items-center gap-8 mt-12">
                            <Button
                                text="Explore Now"
                                version="v2"
                                bg="white"
                                color="dark"
                                border='white'
                                className='font-500'
                                onClick={(e) => {
                                    e?.stopPropagation?.();
                                    onNavigate('/product');
                                }}
                            />
                            <Button
                                icon='Box'
                                version="icon"
                                bg="glass"
                                color="white"
                                border="transparent"
                                onClick={(e) => {
                                    e?.stopPropagation?.();
                                    onNavigate('/product');
                                }}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
));
Type3Banners.displayName = 'Type3Banners';

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

/* ------------------- Banner Type Map ------------------- */
const BANNER_COMPONENTS = {
    1: Type1Banners,
    2: Type2Banners,
    3: Type3Banners,
};

/* ------------------- Main HeroBanner ------------------- */
const HeroBanner = memo(() => {
    const navigate = useNavigate();
    const handleNavigate = useCallback((path) => navigate(path), [navigate]);

    const heroConfig = configData?.HeroBanner?.[0] || {};
    const heroBannerType = heroConfig.HeroBannerType ?? 1;
    const heroBannerCat = heroConfig.HeroBannerCat ?? 1;

    const ActiveBanner = BANNER_COMPONENTS[heroBannerType] || Type1Banners;

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
