import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Button from '../common/Button';
import Image from '../common/Image';
import Icon from '../common/Icon';
import { addToCart } from '../../utils/cartHelper';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../common/Tooltip';

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
    ...props
}) => {
    const navigate = useNavigate();
    const sliderId = React.useId().replace(/:/g, '');
    const combinedClassName = `grid-cols-${cols} md-grid-cols-${mdCols} sm-grid-cols-${smCols} gap-${gap} ${className}`.trim();

    const renderDefaultCard = (item, index) => {
        if (cardType === 'product') {
            const imgSrc = (imageMap && imageMap[item.id]) || item.image;
            return (
                <div
                    key={item.id || index}
                    className="bg-white border-ec rounded-10 p-12 cursor-pointer transition-all flex flex-column justify-between"
                    onClick={() => onCardClick && onCardClick(item)}
                >
                    <div>
                        {/* Product Image Container */}
                        <div className="overflow-hidden rounded-5">
                            <Image
                                src={imgSrc}
                                alt={item.name}
                                loading={index < 2 ? "eager" : "lazy"}
                                fetchPriority={index < 2 ? "high" : undefined}
                                className={`w-full object-cover flex ${imageHeight || 'h-200'}`}
                            />
                        </div>

                        {/* Product Metadata */}
                        <div className="mt-12">
                            <h3
                                className="text-dark mid-text font-600 line-clamp1"
                            >
                                {item.name}
                            </h3>
                            <p
                                className="text-gray mini-text line-clamp2"
                            >
                                {item.description}
                            </p>
                            {(item.priceDisplay || item.price) && (
                                <p
                                    className="text-dark small-text font-500 mt-4"
                                >
                                    {item.priceDisplay || `₹ ${item.price} / Piece`}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons at Bottom */}
                    <div className="flex gap-10 mt-10 w-full">
                        {showAddToCart && (
                            <Button
                                text="Quick Add"
                                variant="outline"
                                bg="primary"
                                version="v3"
                                icon="Cart"
                                className={showViewProducts ? "flex-1" : "w-full"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onAddToCart) {
                                        onAddToCart(item);
                                    } else {
                                        addToCart(item);
                                        showToast(`${item.name} added to cart!`);
                                    }
                                }}
                            />
                        )}
                        {showViewProducts && (
                            <Button
                                text="View Products"
                                bg="primary"
                                variant="filled"
                                version="v3"
                                className={showAddToCart ? "flex-1" : "w-full"}
                                style={{
                                    backgroundColor: '#2563eb',
                                    color: '#ffffff',
                                    borderRadius: '8px',
                                    fontWeight: '500',
                                    fontSize: '0.95rem',
                                    padding: '10px 0',
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onButtonClick) {
                                        onButtonClick(item);
                                    } else if (onCardClick) {
                                        onCardClick(item);
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            );
        }

        if (cardType === 'business') {
            return (
                <div
                    key={item.id || index}
                    className="bg-white border-ec rounded-5 overflow-hidden p-10 cursor-pointer flex flex-column justify-between"
                    onClick={() => onCardClick && onCardClick(item)}
                >
                    <div>
                        <div className="relative rounded-5 overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.name}
                                loading={index < 2 ? "eager" : "lazy"}
                                fetchPriority={index < 2 ? "high" : undefined}
                                className={`w-full object-cover rounded-5 flex ${imageHeight || 'h-150'}`}
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

                            {/* Rating Row */}
                            <div className="flex items-center gap-6 mb-8">
                                <p className="text-white font-600 mini-text px-6 py-2 rounded-3 bg-success">
                                    ★ {item.rating}
                                </p>
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
                            if (onButtonClick) {
                                onButtonClick(item);
                            } else if (onCardClick) {
                                onCardClick(item);
                            }
                        }}
                    />
                </div>
            );
        }

        if (cardType === 'article') {
            return (
                <article
                    key={item.id || index}
                    className="bg-white rounded-5 overflow-hidden cursor-pointer flex flex-column justify-between"
                    onClick={() => onCardClick && onCardClick(item)}
                >
                    <div>
                        {/* Image box */}
                        <div className="overflow-hidden relative">
                            <Image
                                src={item.image}
                                alt={item.title}
                                loading={index < 2 ? "eager" : "lazy"}
                                fetchPriority={index < 2 ? "high" : undefined}
                                className={`w-full object-cover ${imageHeight || 'h-200'}`}
                            />
                        </div>

                        {/* Details */}
                        <div className="p-10">
                            {item.tag && (
                                <p className="px-12 py-5 rounded-5 font-600 mini-text mb-10 w-max bg-light-primary text-primary">
                                    {item.tag}
                                </p>
                            )}

                            <h3 className="text-dark font-600 mid-text line-clamp1">
                                {item.title}
                            </h3>
                            <p className="text-primary font-500 mini-text mt-3">
                                {item.date} • {item.readTime}
                            </p>
                            <p className="text-gray small-text line-clamp2 mt-7">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </article>
            );
        }

        if (cardType === 'city') {
            const paddedIndex = String(index + 1).padStart(2, '0');
            return (
                <div
                    key={item.id || index}
                    className="city-card relative overflow-hidden rounded-10 cursor-pointer h-350 flex items-end"
                    style={{
                        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.75) 100%), url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                    onClick={() => onCardClick && onCardClick(item)}
                >
                    <div className="bg-white icon-lg rounded-full absolute top-0 left-0 m-12">
                        <p className="text-primary small-text font-600">{paddedIndex}</p>
                    </div>

                    <div className="relative w-full">
                        <div className="p-20">
                            <div className="flex items-center gap-8 mb-6">
                                <Icon name="MapPin" width="14" height="14" strokeWidth="2.5" className="text-white" />
                                <h4 className="mid-text text-white font-600">{item.name}</h4>
                            </div>

                            {/* Stats List */}
                            <div className="grid-cols-1 gap-6 mb-16">
                                <div className="flex items-center gap-8 text-white opacity-95">
                                    <Icon name="Building" width="14" height="14" strokeWidth="2.5" className="text-white" />
                                    <span className="small-text font-400">{item.businesses}</span>
                                </div>
                                <div className="flex items-center gap-8 text-white opacity-95">
                                    <Icon name="Grid" width="14" height="14" strokeWidth="2.5" className="text-white" />
                                    <span className="small-text font-400">{item.categories}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full">
                                {/* Dynamic Tag Badge */}
                                {item.tag ? (
                                    <div
                                        className="px-12 py-5 rounded-20 w-max flex items-center gap-6"
                                        style={{
                                            backgroundColor: item.tagType === 'most-searched' ? '#eab308' : '#22c55e',
                                            color: item.tagType === 'most-searched' ? '#000000' : '#ffffff',
                                        }}
                                    >
                                        {item.tagType === 'most-searched' ? (
                                            <Icon name="Star" width="12" height="12" fill="currentColor" stroke="none" className="flex" />
                                        ) : (
                                            <Icon name="Trending" width="12" height="12" stroke="currentColor" strokeWidth="3" className="flex" />
                                        )}
                                        <span className="mini-text font-600 uppercase tracking-wider">
                                            {item.tag}
                                        </span>
                                    </div>
                                ) : null}

                                {/* Circular Right Action Button */}
                                <div className="icon-lg bg-white rounded-full">
                                    <Icon name="ArrowRight" width="16" height="16" stroke="var(--primary)" strokeWidth="3.5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <style>{`
                .city-card {
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .city-card:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
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
                        slidesPerView={1.2}
                        navigation={{
                            prevEl: `.prev-${sliderId}`,
                            nextEl: `.next-${sliderId}`,
                        }}
                        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        breakpoints={{
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