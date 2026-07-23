import React from 'react';
import Container from '../../../components/common/Container';
import Skeleton from '../../../components/common/Skeleton';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';
import { resolveImagePath } from '../../../utils/imageResolver';

const featuresList = [
    {
        icon: "Shield",
        title: "Premium Quality",
        desc: "Reliable & durable PVC"
    },
    {
        icon: "Settings",
        title: "Wide Range",
        desc: "Solutions for every need"
    },
    {
        icon: "Edit",
        title: "Custom Solutions",
        desc: "Tailored to requirements"
    },
    {
        icon: "Truck",
        title: "Timely Delivery",
        desc: "Across India delivery"
    }
];

const Feature = ({ loading, displayCategories, handleCategoryClick }) => {
    return (
        <>
            <style>{`
        .feature-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border: 1px solid rgba(31, 90, 192, 0.08);
          background-color: #f0f6ff;
          color: #1f5ac0;
        }

        /* Badge and Title Styling */
        .category-badge-pill {
          display: inline-block;
          padding: 6px 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #1f5ac0;
          background: #e8f0fe;
          border: 1px solid #dbe5ff;
          border-radius: 100px;
        }
        .category-divider-line {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        /* Category Card Styling */
        .category-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }
        .category-card:hover {
          transform: translateY(-6px);
        }
        .card-image-right {
          flex: 1;
          position: relative;
          overflow: hidden;
          transition: clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%);
        }
        .category-card:hover .card-image-right {
          clip-path: polygon(12% 0, 100% 0, 100% 100%, 0% 100%);
        }
        .card-image-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

            {/* Main Categories Page Content Wrapper */}
            <Container style={{ background: 'var(--forth)' }}>
                <div className='w-full py-50'>
                    {/* Floating Features Bar */}
                    <div className="bg-white p-20 sm-p-15 grid-cols-4 sm-grid-cols-1 gap-12">
                        {featuresList.map((item, index) => (
                            <div key={index} className="flex items-center gap-12 sm-mb-8">
                                <div className="feature-icon-wrapper">
                                    <Icon name={item.icon} width="20" height="20" stroke="currentColor" />
                                </div>
                                <div className="">
                                    <h5 className="font-600 text-dark headmini-text">{item.title}</h5>
                                    <p className="text-gray mini-text">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Section Header */}
                    <div className="w-full mt-60 text-center">
                        <div className="flex justify-center mb-12">
                            <span className="category-badge-pill">OUR CATEGORIES</span>
                        </div>
                        <h1 className="text-dark font-700 large-text mb-12">
                            Premium <span style={{ color: '#1f5ac0' }}>PVC</span> Solutions
                        </h1>
                        <p className="text-gray small-text mb-15" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            High-quality PVC products for industrial, commercial and custom applications.
                        </p>
                        <div className="category-divider-line mt-15 mb-40">
                            <div style={{ width: '40px', height: '3px', backgroundColor: '#1f5ac0', borderRadius: '2px' }} />
                            <div style={{ width: '6px', height: '6px', backgroundColor: '#1f5ac0', borderRadius: '50%' }} />
                            <div style={{ width: '40px', height: '3px', backgroundColor: '#1f5ac0', borderRadius: '2px' }} />
                        </div>
                    </div>

                    {/* Categories Cards Grid */}
                    {loading ? (
                        <Skeleton variant="card-grid" count={displayCategories.length || 6} className="grid-cols-3 gap-12" theme="adaptive" />
                    ) : (
                        <div className="grid-cols-3 sm-grid-cols-1 gap-12">
                            {displayCategories.map((cat) => (
                                <div
                                    key={cat.id}
                                    className="category-card bg-white rounded-10 overflow-hidden flex cursor-pointer"
                                    onClick={() => handleCategoryClick(cat.id)}
                                >
                                    {/* Left Text details */}
                                    <div className="w-55 sm-w-60">
                                        <div className='p-20'>
                                            <div>
                                                <div
                                                    className="icon-lg rounded-5"
                                                    style={{ backgroundColor: cat.bgColor, color: cat.accentColor }}
                                                >
                                                    <Icon name={cat.iconName || "Grid"} width="22" height="22" stroke={cat.accentColor} />
                                                </div>
                                                <h3 className="mid-text text-dark font-600 pt-8">{cat.name}</h3>
                                                <p className="text-gray mini-text line-clamp3 mt-4">
                                                    {cat.description}
                                                </p>
                                            </div>
                                            <p className="mini-text font-500 mt-20 flex items-center gap-4" style={{ color: cat.accentColor }}>
                                                Explore Products <Icon name="ArrowRight" width="13" height="13" stroke="currentColor" />
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right slanted Image */}
                                    <div className="card-image-right w-45 sm-w-40">
                                        <Image
                                            src={resolveImagePath(cat.icon)}
                                            alt={cat.name}
                                            className="card-image-element"
                                            loading="lazy"
                                        />
                                        {/* Decorative diagonal accent triangle */}
                                        <div
                                            style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                right: 0,
                                                width: '40px',
                                                height: '40px',
                                                background: cat.accentColor,
                                                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                                opacity: 0.85,
                                                zIndex: 2
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Feature;
