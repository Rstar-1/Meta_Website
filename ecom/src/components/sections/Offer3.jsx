import React from 'react';

import Container from '../../../../components/common/Container';
import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';

const offerBanners = [
    {
        id: 1,
        title: 'Turn Chairs',
        description: 'Elevate your space with 40% off our timeless designs!',
        buttonText: 'Shop Now',
        discountLabel: 'Save',
        discountPercent: '40%',
        bgColor: '#F9EAE9',
        badgeBg: 'var(--primary)',
        badgeColor: '#000000',
        image: import.meta.env.VITE_IMAGE + "Speaker3.jpg",
    },
    {
        id: 2,
        title: 'Cross Chairs',
        description: "Get 30% off elegant, timeless seating miss out!",
        buttonText: 'Shop Now',
        discountLabel: 'Save',
        discountPercent: '30%',
        bgColor: '#E3EFE6',
        badgeBg: 'var(--warning)',
        badgeColor: '#FFFFFF',
        image: import.meta.env.VITE_IMAGE + "Speaker1.jpg",
    }
];

const categoryPills = [
    {
        id: 1,
        name: 'Living Room',
        image: import.meta.env.VITE_IMAGE + "Swipebanner1.jpg",
    },
    {
        id: 2,
        name: 'Planters',
        image: import.meta.env.VITE_IMAGE + "Swipebanner2.jpg",
    },
    {
        id: 3,
        name: 'Gravel Rug',
        image: import.meta.env.VITE_IMAGE + "Swipebanner3.jpg",
    },
    {
        id: 4,
        name: 'Table Mirror',
        image: import.meta.env.VITE_IMAGE + "Swipebanner4.jpg",
    },
    {
        id: 5,
        name: 'Table Wears',
        image: import.meta.env.VITE_IMAGE + "Swipebanner5.jpg",
    },
    {
        id: 6,
        name: 'Dining Decor',
        image: import.meta.env.VITE_IMAGE + "Swipebanner1.jpg",
    },
    {
        id: 7,
        name: 'Living Room',
        image: import.meta.env.VITE_IMAGE + "Swipebanner2.jpg",
    },
    {
        id: 8,
        name: 'Planters',
        image: import.meta.env.VITE_IMAGE + "Swipebanner3.jpg",
    },
    {
        id: 9,
        name: 'Gravel Rug',
        image: import.meta.env.VITE_IMAGE + "Swipebanner4.jpg",
    },
    {
        id: 10,
        name: 'Table Mirror',
        image: import.meta.env.VITE_IMAGE + "Swipebanner5.jpg",
    }
];

const OfferSection = () => {
    return (
        <Container>
            <div className="w-full py-50 overflow-hidden">
                <div className="grid-cols-2 sm-grid-cols-1 gap-12">
                    {offerBanners.map((banner) => (
                        <div
                            key={banner.id}
                            style={{
                                backgroundColor: banner.bgColor,
                            }}
                            className='flex items-center gap-12 p-25 sm-p-16 rounded-10'
                        >
                            <div className='w-50'>
                                <h2 className='text-dark head-text font-600'>
                                    {banner.title}
                                </h2>
                                <p className='small-text mt-4 text-gray'>
                                    {banner.description}
                                </p>
                                <Button
                                    text={banner.buttonText}
                                    version="v2"
                                    bg="dark"
                                    color="white"
                                    className="rounded-30 mt-20"
                                />
                            </div>
                            <div className='relative w-50'>
                                <div className='absolute top-0 right-0 rounded-full z-10 flex items-center justify-center m-10'
                                    style={{
                                        width: '76px',
                                        height: '76px',
                                        backgroundColor: banner.badgeBg,
                                        color: banner.badgeColor,
                                    }}
                                >
                                    <div className='text-center'>
                                        <p className='mini-text text-white'>
                                            {banner.discountLabel}
                                        </p>
                                        <p className='small-text text-white font-600'>
                                            {banner.discountPercent}
                                        </p>
                                    </div>
                                </div>
                                <Image
                                    src={banner.image}
                                    alt={banner.title}
                                    className='w-full h-250 sm-h-200 object-cover flex rounded-10'
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
                    className='flex items-center gap-12 mt-30 overflow-auto'
                >
                    {categoryPills.map((item, idx) => (
                        <div
                            key={`${item.id}-${idx}`}
                            className='flex items-center gap-10 cursor-pointer bg-white py-6 px-6 rounded-30 border-ec'
                            style={{ minWidth: '140px' }}
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
                                className='rounded-full object-cover flex'
                            />
                            <p className='mini-text font-500 text-dark'>
                                {item.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default React.memo(OfferSection);