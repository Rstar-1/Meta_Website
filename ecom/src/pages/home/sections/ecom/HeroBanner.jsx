import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../../components/common/Button';
import Container from '../../../../components/common/Container';
import { configData, heroCMS } from '../../../../utils/apiData';
import bannerVideo from '../../../../assets/Banner.mp4';

const HEIGHT_MAP = {
    sticky: { 1: 'h-800 sm-h-550', 2: 'h-700 sm-h-550' },
    normal: { 1: 'h-700 sm-h-550', 2: 'h-550' }
};

const HeroBackground = React.memo(() => (
    <div className='absolute top-0 left-0 w-full h-full z-10 overflow-hidden'>
        <video
            src={bannerVideo}
            autoPlay
            loop
            muted
            playsInline
            className='w-full h-full object-cover flex'
        />
        <div
            className='absolute w-full h-full top-0 left-0'
            style={{
                background: 'linear-gradient(180deg, rgba(10, 15, 25, 0.65) 0%, rgba(10, 15, 25, 0.35) 50%, rgba(10, 15, 25, 0.88) 100%), radial-gradient(ellipse 90% 80% at 70% 20%, rgba(0, 180, 216, 0.15) 0%, rgba(10, 15, 25, 0.65) 100%)',
            }}
        />
    </div>
));

const HeroContent = React.memo(({ onGetInTouch, isHeaderSticky, heroVersion }) => (
    <div className={`w-full ${isHeaderSticky
        ? 'pb-100 sm-pb-1'
        : [1, 2].includes(heroVersion)
            ? 'pb-100 sm-pb-30'
            : 'pb-60'
        } relative z-20`}>
        <h1 className='largemid-text text-white font-600 uppercase'>
            {heroCMS?.titleLine1 || 'HIGH-PURITY'}
            <br />
            <span className='text-primary'>{heroCMS?.titleHighlight || 'BULK DRUG INTERMEDIATES'}</span>
        </h1>
        <p className='text-white headpara-text text-muted font-300 sm-mt-6 mt-12' style={{ maxWidth: '650px' }}>
            {heroCMS?.leftText || "Reputed Indian contract manufacturer, wholesaler, trader, importer, and exporter of bulk drug intermediates, speciality chemicals, fine chemicals, and rare research compounds."}
        </p>
        <Button
            text="Get Chemical Quote"
            icon="ArrowUpRight"
            iconPosition="right"
            iconWidth="16"
            iconHeight="16"
            version="v1"
            className="rounded-20 mt-18"
            onClick={onGetInTouch}
        />
    </div>
));

const BreadcrumbTab = React.memo(({ isMobile, heroVersion }) => {
    if (heroVersion !== 2) return null;

    return (
        <div
            className="absolute z-30 flex items-center justify-center"
            style={{
                width: isMobile ? '60%' : '450px',
                height: isMobile ? '50px' : '68px',
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
    const [isMobile, setIsMobile] = React.useState(false);

    const heroVersion = configData?.HeroBanner?.[0]?.HeroBannerType ?? 1;
    const isHeaderSticky = Boolean(
        configData?.HeaderSticky ??
        configData?.Header?.HeaderSticky ??
        configData?.Header?.[0]?.HeaderSticky
    );

    const handleResize = React.useCallback(() => {
        setIsMobile(window.innerWidth <= 768);
    }, []);

    const handleGetInTouch = React.useCallback(() => {
        navigate('/connect');
    }, [navigate]);

    React.useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    const heightClass = HEIGHT_MAP[isHeaderSticky ? 'sticky' : 'normal']?.[heroVersion] || (isHeaderSticky ? 'h-650 sm-h-550' : 'h-550');

    const containerStyle = React.useMemo(() => {
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
            borderRadius: isMobile ? '0 0 20px 20px' : '0 0 25px 25px'
        };
    }, [isMobile, heroVersion]);

    return (
        <Container className={`${heightClass} ${[1].includes(heroVersion) ? 'flex items-center' : 'flex items-end sm-items-center'}`}
            style={containerStyle}
        >
            <HeroBackground />
            <HeroContent isHeaderSticky={isHeaderSticky} heroVersion={heroVersion} onGetInTouch={handleGetInTouch} />
            <BreadcrumbTab isMobile={isMobile} heroVersion={heroVersion} />
        </Container>
    );
});

export default HeroBanner;
