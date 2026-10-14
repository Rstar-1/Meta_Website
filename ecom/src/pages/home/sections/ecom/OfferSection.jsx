import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import { resolveImagePath } from '../../../../utils/imageResolver';

const offerBanners = [
    {
        id: 1,
        title: 'First Aid Kits',
        description: 'Conform to Section 45 Factories Act with CE-certified Types A, B, and C emergency boxes.',
        buttonText: 'View First Aid Kits',
        discountLabel: 'Save up to',
        discountPercent: '30%',
        bgColor: '#FEF2F2',
        badgeBg: '#DC2626',
        badgeColor: '#FFFFFF',
        image: resolveImagePath('/products/enhanced/hd_first_aid_box.jpg'),
        category: 'First Aid & Emergency Care'
    },
    {
        id: 2,
        title: 'Hospital Holloware',
        description: 'Direct manufacturer rates on AISI 304 seamless dressing drums, instrument trays, and shadowless lights.',
        buttonText: 'Explore Hospital Equipment',
        discountLabel: 'Direct',
        discountPercent: 'Factory',
        bgColor: '#EFF6FF',
        badgeBg: '#2563EB',
        badgeColor: '#FFFFFF',
        image: resolveImagePath('/products/enhanced/hd_dressing_drum.jpg'),
        category: 'Hospital Holloware'
    }
];

const categoryPills = [
    {
        id: 1,
        name: 'First Aid Kits',
        image: resolveImagePath('/products/enhanced/hd_first_aid_box.jpg'),
        category: 'First Aid & Emergency Care'
    },
    {
        id: 2,
        name: 'Emergency Stretchers',
        image: resolveImagePath('/products/shreehari/scoop_stretcher_aluminium.jpg'),
        category: 'First Aid & Emergency Care'
    },
    {
        id: 3,
        name: 'Dressing Drums',
        image: resolveImagePath('/products/enhanced/hd_dressing_drum.jpg'),
        category: 'Hospital Holloware'
    },
    {
        id: 4,
        name: 'OT Surgical Lights',
        image: resolveImagePath('/products/enhanced/hd_ot_light.jpg'),
        category: 'O.T. & Examination Lights'
    },
    {
        id: 5,
        name: 'Steam Autoclaves',
        image: resolveImagePath('/products/enhanced/hd_autoclave.jpg'),
        category: 'Sterilization & Suction'
    },
    {
        id: 6,
        name: 'Crash Carts & Trolleys',
        image: resolveImagePath('/products/goonj/ssp_crash_cart.jpg'),
        category: 'Hospital Furniture'
    },
    {
        id: 7,
        name: 'Surgical Gowns & PPE',
        image: resolveImagePath('/products/goonj/disposable_sterile_gown.jpg'),
        category: 'Hospital Linen & Disposables'
    },
    {
        id: 8,
        name: 'Suction Apparatus',
        image: resolveImagePath('/products/goonj/electric_suction_apparatus.jpg'),
        category: 'Sterilization & Suction'
    },
    {
        id: 9,
        name: 'LED Phototherapy',
        image: resolveImagePath('/products/goonj/led_phototherapy_unit.jpg'),
        category: 'Diagnostic & Neonatal Care'
    },
    {
        id: 10,
        name: 'Bio-Medical Waste Bins',
        image: resolveImagePath('/products/goonj/biomedical_waste_bins_ss_frame_set.jpg'),
        category: 'Home Care & Clinical Waste'
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