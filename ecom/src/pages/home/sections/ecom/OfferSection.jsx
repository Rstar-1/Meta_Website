import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import { resolveImagePath } from '../../../../utils/imageResolver';

const offerBanners = [
    {
        id: 1,
        title: 'Stainless Steel',
        description: 'Seamless, ERW, and Welded pipes in SS 304, 316L, 321, Duplex, and ASTM A106 Gr. B with EN 10204 3.1 Mill Test Certificates.',
        buttonText: 'Explore Pipes & Tubes',
        discountLabel: 'Mill Tested',
        discountPercent: '3.1/3.2',
        bgColor: '#F0FDF4',
        badgeBg: '#16A34A',
        badgeColor: '#FFFFFF',
        image: resolveImagePath('/products/roxy/ss_pipe.jpg'),
        category: 'Pipes & Tubes (Seamless, ERW, Welded)'
    },
    {
        id: 2,
        title: 'Industrial Plates',
        description: 'Boiler quality ASTM A516 Gr. 70, abrasion-resistant Hardox 400/500, Corten weathering steel, and high tensile structural plates direct from stockyard.',
        buttonText: 'Explore Industrial Plates',
        discountLabel: 'Direct',
        discountPercent: 'Stockyard',
        bgColor: '#EFF6FF',
        badgeBg: '#2563EB',
        badgeColor: '#FFFFFF',
        image: resolveImagePath('/products/roxy/ss_plate.jpg'),
        category: 'Industrial Plates & Sheets'
    }
];

const categoryPills = [
    {
        id: 1,
        name: 'SS Seamless Pipes',
        image: resolveImagePath('/products/roxy/ss_pipe.jpg'),
        category: 'Pipes & Tubes (Seamless, ERW, Welded)'
    },
    {
        id: 2,
        name: 'Carbon Steel Pipes',
        image: resolveImagePath('/products/roxy/cs_pipe.jpg'),
        category: 'Pipes & Tubes (Seamless, ERW, Welded)'
    },
    {
        id: 3,
        name: 'Boiler & Hardox Plates',
        image: resolveImagePath('/products/roxy/ss_plate.jpg'),
        category: 'Industrial Plates & Sheets'
    },
    {
        id: 4,
        name: 'Butt-Weld Pipe Fittings',
        image: resolveImagePath('/products/roxy/pipe_fittings.jpg'),
        category: 'Pipe Fittings & Butt-Weld Fittings'
    },
    {
        id: 5,
        name: 'Forged Steel Flanges',
        image: resolveImagePath('/products/roxy/ss_flange.jpg'),
        category: 'Flanges (Forged, Slip-On, Blind, Weld-Neck)'
    },
    {
        id: 6,
        name: 'Nickel Alloys & Inconel',
        image: resolveImagePath('/products/roxy/about_2.jpg'),
        category: 'Nickel Alloys & High-Performance Superalloys'
    },
    {
        id: 7,
        name: 'Stainless Steel Circles',
        image: resolveImagePath('/products/roxy/ss_circle.jpg'),
        category: 'Circles, Rings, Shims & Flat Products'
    },
    {
        id: 8,
        name: 'High-Tensile Fasteners',
        image: resolveImagePath('/products/roxy/ss_nut_bolt.jpg'),
        category: 'Fasteners, Nuts, Bolts & Hardware'
    },
    {
        id: 9,
        name: 'Angle & Tool Steel',
        image: resolveImagePath('/products/roxy/ss_angle.jpg'),
        category: 'Structural Shapes, Tool Steels & Engineering Bars'
    },
    {
        id: 10,
        name: 'Hastelloy & Monel',
        image: resolveImagePath('/products/roxy/about_1.jpg'),
        category: 'Nickel Alloys & High-Performance Superalloys'
    }
];

const OfferSection = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        if (category) {
            navigate(`/product?category=${encodeURIComponent(category)}`);
        } else {
            navigate('/product');
        }
    };

    return (
        <div className="w-full py-50 overflow-hidden">
            <div className="grid-cols-2 sm-grid-cols-1 gap-12">
                {offerBanners.map((banner) => (
                    <div
                        key={banner.id}
                        style={{
                            backgroundColor: banner.bgColor,
                        }}
                        className='flex items-center gap-12 p-25 sm-p-16 rounded-10 cursor-pointer transition-transform hover:shadow-md'
                        onClick={() => handleCategoryClick(banner.category)}
                    >
                        <div className='w-55'>
                            <h2 className='text-dark head-text font-600 m-0'>
                                {banner.title}
                            </h2>
                            <p className='small-text mt-8 text-gray leading-relaxed m-0'>
                                {banner.description}
                            </p>
                            <Button
                                text={banner.buttonText}
                                version="v2"
                                bg="dark"
                                color="white"
                                className="rounded-30 mt-20"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCategoryClick(banner.category);
                                }}
                            />
                        </div>
                        <div className='relative w-45'>
                            <div className='absolute top-0 right-0 rounded-full z-10 flex items-center justify-center m-10 shadow-sm'
                                style={{
                                    width: '76px',
                                    height: '76px',
                                    backgroundColor: banner.badgeBg,
                                    color: banner.badgeColor,
                                }}
                            >
                                <div className='text-center'>
                                    <p className='mini-text text-white m-0' style={{ fontSize: '11px' }}>
                                        {banner.discountLabel}
                                    </p>
                                    <p className='small-text text-white font-600 m-0'>
                                        {banner.discountPercent}
                                    </p>
                                </div>
                            </div>
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                className='w-full h-220 sm-h-180 object-contain flex rounded-10 bg-white p-6'
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                }}
                className='flex items-center gap-12 mt-30 overflow-auto pb-6'
            >
                {categoryPills.map((item, idx) => (
                    <div
                        key={`${item.id}-${idx}`}
                        className='flex items-center gap-10 cursor-pointer bg-white p-9 rounded-30 border-ec'
                        style={{ minWidth: '200px' }}
                        onClick={() => handleCategoryClick(item.category)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#141414';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#EAEAEA';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <Image
                            src={item.image}
                            alt={item.name}
                            width='30px'
                            height='30px'
                            className='rounded-full object-contain flex bg-forth'
                        />
                        <p className='small-text font-500 text-dark'>
                            {item.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(OfferSection);