import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Button from '../../../components/common/Button';
import Badge from '../../../components/common/Badge';
import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: 'Standard Clear PVC Roll',
        image: resolveImagePath('Product4.jpg')
    },
    {
        id: 2,
        title: 'Polar Anti-Insect Amber Roll',
        image: resolveImagePath('Product5.jpg')
    },
    {
        id: 3,
        title: 'Heavy Duty Ribbed Strip',
        image: resolveImagePath('Product3.jpg')
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="Feature Collections"
                        icon="Settings"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-8">
                        Delivering Innovative Businesses.
                    </h2>

                    <p className="para-text text-gray font-400 mt-6">
                        We are a results-driven team helping businesses unlock efficiency, scale operations, and improve customer experience.
                    </p>

                    <div className="grid-cols-3 gap-12 mt-20 w-90 sm-w-full">
                        {thumbnails.map((item) => (
                            <div
                                key={item.id}
                                className='w-full h-200 rounded-5 bg-forth overflow-hidden'
                                onClick={() => navigate('/products')}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-contain flex"
                                />
                            </div>
                        ))}
                    </div>

                    <Button
                        text="Shop Collection"
                        version="v1"
                        bg="dark"
                        color="white"
                        className="rounded-30 font-500 mt-28"
                        onClick={() => navigate('/products')}
                    />
                </div>

                <div className="w-full h-550 sm-h-350 rounded-10 overflow-hidden">
                    <Image
                        src={resolveImagePath('blog/Blog2.jpg')}
                        alt="Collection Showcase"
                        className="w-full h-full object-cover flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
