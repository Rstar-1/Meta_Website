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
    cardType,
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

    const cardRenderers = React.useMemo(() => ({
        product: (item, index, imgProps) => {
            const imgSrc = imageMap?.[item.id] || resolveProductImage(item);
            return (
                <div
                    key={item.id || index}
                    className="cursor-pointer"
                    onClick={() => onCardClick?.(item)}
                >
                    <div>
                        <div className="overflow-hidden rounded-5 bg-forth">
                            <Image
                                src={imgSrc}
                                alt={item.name}
                                {...imgProps}
                                className={`w-full object-cover flex ${imageHeight || 'h-200'}`}
                                width="300"
                                height={imageHeight?.includes('h-150') ? '150' : imageHeight?.includes('h-250') ? '250' : '200'}
                            />
                        </div>
                        <div className="mt-12">
                            <h3 className="text-dark mid-text font-600 line-clamp1">{item.name}</h3>
                            {(item.priceDisplay || item.price) && (
                                <p className="text-gray mini-text font-400 mt-3">
                                    {item.priceDisplay || `₹ ${item.price} / Piece`}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            );
        },
        business: (item, index, imgProps) => {
            return (
                <div
                    key={item.id || index}
                    className="bg-white border-ec rounded-5 overflow-hidden p-10 cursor-pointer flex flex-column justify-between"
                    onClick={() => onCardClick?.(item)}
                >
                    <div>
                        <div className="relative rounded-5 overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                {...imgProps}
                                className={`w-full object-cover rounded-5 flex ${imageHeight || 'h-150'}`}
                                width="350"
                                height="150"
                            />
                            {item.logo && (
                                <div className="absolute bottom-0 left-0 mb-15 ml-10 border-white flex items-center justify-center rounded-full icon-lg bg-primary z-10">
                                    <p className="text-white font-600 mini-text">{item.logo}</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-5">
                            <h3 className="text-dark font-600 mid-text">{item.name}</h3>
                            <p className="text-gray mini-text mb-8">{item.category}</p>
                            <div className="flex items-center gap-6 mb-8">
                                <p className="text-white font-600 mini-text px-6 py-2 rounded-3 bg-success">★ {item.rating}</p>
                                <p className="text-gray mini-text">({item.reviews} Reviews)</p>
                            </div>
                            <p className="mini-text text-gray">📍 {item.location}</p>
                        </div>
                    </div>
                    <Button
                        text="Call Now"
                        bg="primary"
                        version="v3"
                        className="w-full cursor-pointer font-600 mt-8"
                        onClick={(e) => {
                            e.stopPropagation();
                            onButtonClick ? onButtonClick(item) : onCardClick?.(item);
                        }}
                    />
                </div>
            );
        },
        article: (item, index, imgProps) => {
            return (
                <article
                    key={item.id || index}
                    className="bg-white rounded-5 overflow-hidden cursor-pointer flex flex-column justify-between"
                    onClick={() => onCardClick?.(item)}
                >
                    <div>
                        <div className="overflow-hidden relative">
                            <Image
                                src={item.image}
                                alt={item.title}
                                {...imgProps}
                                className={`w-full object-cover ${imageHeight || 'h-200'}`}
                                width="400"
                                height="200"
                            />
                        </div>
                        <div className="py-10">
                            {item.tag && (
                                <p className="px-12 py-4 rounded-5 font-400 mini-text mb-10 w-max bg-light-primary text-primary">{item.tag}</p>
                            )}
                            <h3 className="text-dark font-600 mid-text line-clamp1">{item.title}</h3>
                            <p className="text-gray font-500 mini-text mt-3">
                                {formatDate(item.datePublished || item.date, 'human')} • {item.readTime}
                            </p>
                            <p className="text-gray small-text line-clamp2 mt-7">{item.description}</p>
                        </div>
                    </div>
                </article>
            );
        }
    }), [imageMap, imageHeight, onCardClick, onButtonClick]);

    const renderDefaultCard = (item, index) => {
        const isEager = index < eagerCount;
        const imgProps = {
            loading: isEager ? "eager" : "lazy",
            fetchPriority: isEager ? "high" : undefined
        };

        const renderer = cardRenderers[cardType];
        return renderer ? renderer(item, index, imgProps) : null;
    };

    return (
        <>
            <style>{`
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
                                slidesPerView: 4.2,
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