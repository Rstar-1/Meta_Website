import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import { resolveImagePath } from '../../../../utils/imageResolver';

const trendingProducts = [
    {
        id: 1,
        title: 'Standard Clear Rolls',
        subtitle: '200mm / 300mm / 400mm Widths',
        image: resolveImagePath('Product4.jpg'),
    },
    {
        id: 2,
        title: 'Anti-Insect Amber Rolls',
        subtitle: 'UV Deterrent & Pest Control',
        image: resolveImagePath('Product5.jpg'),
    },
    {
        id: 3,
        title: 'Heavy Duty PVC Curtains',
        subtitle: 'Forklift & High-Traffic Traffic',
        image: resolveImagePath('Product3.jpg'),
    },
    {
        id: 4,
        title: 'SS 304 Mounting Tracks',
        subtitle: 'Quick Hook-On Installation',
        image: resolveImagePath('Product7.jpg'),
    }
];

const OfferSection = () => {
    const navigate = useNavigate();

    return (
        <div className='grid-cols-2 sm-grid-cols-1 gap-12 py-50 w-full'>
            <div className='overflow-hidden bg-forth rounded-10 relative sm-h-400' style={{ height: '612px' }}>    <Image
                src={resolveImagePath('blog/Blog2.jpg')}
                alt="PVC Strip Curtains"
                className='h-full w-full object-cover flex filter-b4'
            />
                <div className='absolute bottom-0 left-0 p-30 sm-py-30 sm-px-20'>
                    <h4 className='large-text text-white uppercase font-600'>
                        Engineered for Performance
                    </h4>
                    <p className='para-text text-white text-muted font-400 w-85 sm-w-full mt-5'>
                        High-clarity flexible PVC strip curtains designed for maximum energy savings, dust isolation, and industrial durability.
                    </p>

                    <Button
                        text="Explore Products"
                        version="v1"
                        bg="white"
                        color="dark"
                        className='mt-14 rounded-20 cursor-pointer'
                        onClick={() => navigate('/products')}
                    />
                </div>
            </div>

            <div className='grid-cols-2 gap-12'>
                {trendingProducts.map((item) => (
                    <div
                        className='h-300 sm-h-250 overflow-hidden bg-forth rounded-5 relative cursor-pointer hover:opacity-95 transition-opacity'
                        key={item.id}
                        onClick={() => navigate('/products')}
                    >    <Image
                            src={item.image}
                            alt={item.title}
                            className='h-full w-full object-contain flex'
                        />
                        <div className='absolute bottom-0 left-0 w-full text-center'>
                            <div className='p-14 sm-p-5'>
                                <h4 className='mid-text text-dark font-600 '>
                                    {item.title}
                                </h4>
                                <p className='mini-text text-gray font-400 mt-2'>
                                    {item.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default React.memo(OfferSection);
