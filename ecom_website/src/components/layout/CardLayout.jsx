import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Button from '../common/Button';
import Image from '../common/Image';
import Icon from '../common/Icon';
import { addToCart } from '../../utils/cartHelper';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../common/Tooltip';
import { resolveProductImage } from '../../utils/imageResolver';
import { formatDate } from '../../utils/formatDate';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const CardLayout = ({
    items,
    renderItem,
    cardType, // "product" | "business" | "article" | "city"
    imageMap,
    imageHeight,
    onCardClick,
    onButtonClick,
    onAddToCart,
    showAddToCart = true,
    showViewProducts = true,
    cols = '4',
    mdCols = '2',
    smCols = '1',
    gap = '12',
    className = '',
    children,
    isSlider = false,
    sliderBreakpoints,
    sliderSlidesPerView = 1.2,
    eagerCount = 0,
    ...props
}) => {
    const navigate = useNavigate();
    const sliderId = React.useId().replace(/:/g, '');
    const combinedClassName = `grid-cols-${cols} md-grid-cols-${mdCols} sm-grid-cols-${smCols} gap-${gap} ${className}`.trim();

    const renderDefaultCard = (item, index) => {
        if (cardType === 'case-study') {
            const tags = item.keywords
                ? item.keywords.split(',').map(k => k.trim()).slice(0, 3)
                : (item.tags || [item.category]);

            return (
                <div
                    key={item.id || index}
                    className="cursor-pointer"
                    onClick={() => {
                        if (onCardClick) {
                            onCardClick(item);
                        } else {
                            navigate(`/blog-detail/${item.id}`);
                        }
                    }}
                >
                    <div className="overflow-hidden rounded-5">
                        <Image
                            src={item.image}
                            alt={item.title}
                            className="w-full object-cover h-300 flex rounded-5 transition-all hover-scale"
                            style={{ transition: 'transform 0.4s ease' }}
                        />
                    </div>
                    <div className="py-10">
                        <h3 className="text-dark font-500 mid-text line-clamp2 hover-text-primary transition-all">
                            {item.title}
                        </h3>
                        <div className="flex flex-wrap gap-12 mt-6">
                            {tags.map((tag, i) => (
                                <p key={i} className="bg-forth text-gray font-400 mini-text px-12 py-2">
                                    {tag}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            );
        }

        if (cardType === 'why-choose') {
            return (
                <div key={item.id || index} className="w-full grid-cols-1 gap-12 mb-20 animate-fade-in">
                    <div className="flex justify-between items-center">
                        <p className="text-dark font-500 small-text">
                            {item.label}
                        </p>
                    </div>
                    <div
                        className="relative w-full"
                        style={{
                            height: '6px',
                            backgroundColor: '#e5e7eb',
                            borderRadius: '10px',
                            overflow: 'visible'
                        }}
                    >
                        {/* Progress Fill */}
                        <div
                            className="absolute left-0 top-0 h-full transition-all duration-1000 ease-out"
                            style={{
                                width: `${item.percentage}%`,
                                backgroundColor: 'var(--primary)',
                                borderRadius: '10px'
                            }}
                        />

                        {/* Circle Indicator Handle */}
                        <div
                            className="absolute transition-all duration-1000 ease-out"
                            style={{
                                left: `${item.percentage}%`,
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                border: '3px solid var(--primary)',
                                backgroundColor: '#ffffff',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                                zIndex: 2
                            }}
                        />

                        {/* Floating Percentage Label */}
                        <p
                            className="absolute mini-text text-gray font-500"
                            style={{
                                left: `${item.percentage}%`,
                                bottom: '16px',
                                transform: 'translateX(-50%)',
                                color: '#000000',
                                whiteSpace: 'nowrap',
                                zIndex: 2
                            }}
                        >
                            {item.percentage}%
                        </p>
                    </div>
                </div>
            );
        }

        if (cardType === 'team-member') {
            return (
                <div key={item.id || index}>
                    <div className="overflow-hidden h-300 team-card relative">
                        <Image
                            src={item.image}
                            alt={item.name}
                            className="w-full object-cover h-300 flex"
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '40%',
                                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.99) 0%, rgba(0, 0, 0, 0) 100%)',
                                pointerEvents: 'none'
                            }}
                        />
                        <div className="flex items-center gap-8 absolute bottom-0 left-0 m-8">
                            <div className="icon-lg bg-white rounded-full">
                                <Icon name="Facebook" width="18" height="18" stroke="currentColor" />
                            </div>
                            <div className="icon-lg bg-white rounded-full">
                                <Icon name="Instagram" width="18" height="18" stroke="currentColor" />
                            </div>
                            <div className="icon-lg bg-white rounded-full">
                                <Icon name="WhatsApp" width="18" height="18" stroke="currentColor" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-10">
                        <h3 className="text-dark mid-text font-600">{item.name}</h3>
                        <p className="text-gray mini-text font-400 uppercase">{item.role}</p>
                    </div>
                </div>
            );
        }

        if (cardType === 'service') {
            return (
                <div key={item.id || index} className="service-card py-35 px-30 rounded-10">
                    <div>
                        <div className="service-icon-bg">
                            <Image src={item.icon} alt={item.title} width='30px' height='30px' className="flex object-contain" />
                        </div>
                        <h3 className="text-dark title-text font-600 pt-20">{item.title}</h3>
                        <p className="text-gray small-text line-clamp3 mt-16">{item.desc}</p>
                        <p className="text-dark small-text font-600 mt-28 flex items-center gap-6">
                            Read More <Icon name="ArrowRight" width="14" height="14" stroke="currentColor" strokeWidth="2.5" />
                        </p>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <style>{`
                .service-card {
                    background: var(--forth);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 1px solid transparent;
                }
                .service-card:hover {
                    background: var(--white);
                    border: 1px solid var(--primary);
                    transform: translateY(-8px);
                }
                .service-icon-bg {
                    width: 70px;
                    height: 70px;
                    background: #ffffff;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.4s ease;
                }

                .hover-scale:hover {
                    transform: scale(1.05);
                }
                .hover-text-primary:hover {
                    color: var(--primary) !important;
                }
                .team-card {
                    transition: all 0.4s ease;
                }
                .team-card:hover {
                    transform: translateY(-8px);
                }
                .team-social-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #ffffff;
                    color: var(--dark);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }

                
                .custom-swiper-prev,
                .custom-swiper-next {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
                    user-select: none;
                }

                .custom-swiper-prev {
                    left: -22px;
                    background: #ffffff !important;
                    border: 1.5px solid var(--primary) !important;
                    color: var(--primary) !important;
                }

                .custom-swiper-prev:hover {
                    background: rgba(30, 116, 219, 0.05) !important;
                    transform: translateY(-50%) scale(1.05);
                }

                .custom-swiper-next {
                    right: -22px;
                    background: var(--primary) !important;
                    border: 1.5px solid var(--primary) !important;
                    color: #ffffff !important;
                }

                .custom-swiper-next:hover {
                    opacity: 0.95;
                    transform: translateY(-50%) scale(1.05);
                }

                /* Disable buttons when swiper reaches start/end */
                .custom-swiper-prev.swiper-button-disabled,
                .custom-swiper-next.swiper-button-disabled {
                    opacity: 0.35 !important;
                    cursor: not-allowed;
                    pointer-events: none;
                }

                @media (max-width: 768px) {
                    .custom-swiper-prev,
                    .custom-swiper-next {
                        display: none !important;
                    }
                }
            `}</style>

            {isSlider ? (
                <div className="w-full relative py-10 swiper-slider-container">
                    {/* Thin custom prev icon (White background with blue border) */}
                    <button className={`custom-swiper-prev prev-${sliderId}`} aria-label="Previous slide">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>

                    {/* Thin custom next icon (Solid blue background) */}
                    <button className={`custom-swiper-next next-${sliderId}`} aria-label="Next slide">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>

                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={12}
                        slidesPerView={sliderSlidesPerView}
                        navigation={{
                            prevEl: `.prev-${sliderId}`,
                            nextEl: `.next-${sliderId}`,
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        breakpoints={sliderBreakpoints || {
                            640: {
                                slidesPerView: 1.2,
                            },
                            768: {
                                slidesPerView: 3.5,
                            },
                            1024: {
                                slidesPerView: 4.4,
                            }
                        }}
                        className="mySwiper"
                    >
                        {items && items.map((item, index) => (
                            <SwiperSlide key={item.id || index} style={{ height: 'auto', display: 'flex' }}>
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                    {renderItem ? renderItem(item, index) : renderDefaultCard(item, index)}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <div className={combinedClassName} {...props}>
                    {items && (renderItem || cardType)
                        ? items.map((item, index) => (renderItem ? renderItem(item, index) : renderDefaultCard(item, index)))
                        : children}
                </div>
            )}
        </>
    );
};

export default CardLayout;