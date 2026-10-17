import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';

import { configData } from '../../../../utils/apiData';
import { resolveImagePath } from '../../../../utils/imageResolver';

const HEIGHT_MAP = {
    sticky: { 1: 'h-800 sm-h-550', 2: 'h-650 sm-h-550' },
    normal: { 1: 'h-700 sm-h-550', 2: 'h-550' }
};

const HeroBackground = React.memo(() => (
    <div className='absolute top-0 left-0 w-full h-full z-10'>
        <Image
            src={resolveImagePath('/products/roxy/bg-video.mp4')}
            alt="Stainless Steel Manufacturing Video"
            className='w-full h-full flex object-cover filter-b3'
        />
    </div>
));

const HeroContent = React.memo(({ onGetInTouch, onExplore, isHeaderSticky, heroVersion }) => (
    <div className={`w-full ${isHeaderSticky
        ? 'pb-100'
        : [1, 2].includes(heroVersion)
            ? 'pb-100 sm-pb-30'
            : 'pb-60'
        } relative z-20`}>

        <h1 className='largemid-text text-white font-700 uppercase'>
            Certified Steel &
            <br />
            <span className='text-primary'>Nickel Alloys</span>
        </h1>
        <p className='text-white headpara-text font-300 sm-mt-6 mt-12' style={{ maxWidth: '640px', opacity: 0.9 }}>
            Exporter, Stockiest & Supplier of Stainless Steel, Nickel Alloy, Alloy Steel, & Carbon Steel pipes, tubes, plates, flanges, fittings, and fasteners with 3.1 & 3.2 Mill Test Certificates.
        </p>
        <div className="flex items-center gap-12 mt-20">
            <Button
                text="Explore Catalog"
                icon="ArrowUpRight"
                iconPosition="right"
                iconWidth="16"
                iconHeight="16"
                version="v1"
                className="rounded-20"
                onClick={onExplore}
            />
        </div>
    </div>
));

const BreadcrumbTab = React.memo(({ isMobile, heroVersion }) => {
    if (heroVersion !== 2) return null;

    return (
        <div
            className="absolute z-30 flex items-center justify-center"
            style={{
                width: isMobile ? '90%' : '450px',
                height: isMobile ? '56px' : '68px',
                backgroundColor: 'var(--white)',
                bottom: '-5px',
                left: '50%',
                transform: 'translateX(-50%)',
                WebkitMaskImage: `url(${import.meta.env.VITE_IMAGE + "Mask3.png"})`,
                WebkitMaskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'bottom center',
                maskImage: `url(${import.meta.env.VITE_IMAGE + "Mask3.png"})`,
                maskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                maskPosition: 'bottom center',
            }}
        />
    );
});

const HeroBanner = React.memo(() => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);

    const heroVersion = configData?.HeroBanner?.[0]?.HeroBannerType ?? 1;
    const isHeaderSticky = Boolean(
        configData?.HeaderSticky ??
        configData?.Header?.HeaderSticky ??
        configData?.Header?.[0]?.HeaderSticky
    );

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    const handleGetInTouch = useCallback(() => {
        navigate('/connect');
    }, [navigate]);

    const handleExplore = useCallback(() => {
        navigate('/product');
    }, [navigate]);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const heightClass = HEIGHT_MAP[isHeaderSticky ? 'sticky' : 'normal']?.[heroVersion] || (isHeaderSticky ? 'h-650 sm-h-550' : 'h-550');

    const containerStyle = useMemo(() => {
        if (heroVersion === 1) {
            const maskSize = isMobile ? '260% 100%' : '110% 100%';
            return {
                WebkitMaskImage: `url(${import.meta.env.VITE_IMAGE + "Mask1.png"})`,
                WebkitMaskSize: maskSize,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                position: 'relative',
                maskImage: `url(${import.meta.env.VITE_IMAGE + "Mask1.png"})`,
                maskSize,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
            };
        }
        return {
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '0 0 25px 25px'
        };
    }, [isMobile, heroVersion]);

    return (
        <Container className={`${heightClass} ${[1].includes(heroVersion) ? 'flex items-center' : 'flex items-end'}`}
            style={containerStyle}
        >
            <HeroBackground />
            <HeroContent
                isHeaderSticky={isHeaderSticky}
                heroVersion={heroVersion}
                onGetInTouch={handleGetInTouch}
                onExplore={handleExplore}
            />
            <BreadcrumbTab isMobile={isMobile} heroVersion={heroVersion} />
        </Container>
    );
});

export default HeroBanner;
