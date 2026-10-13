import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: 'Non-Woven Dilour Carpet',
        image: resolveImagePath('/products/dilour_car.jpg')
    },
    {
        id: 2,
        title: 'Heavy Duty Ribs Carpet',
        image: resolveImagePath('/products/ribs_car.jpg')
    },
    {
        id: 3,
        title: '1800 GSM Poly Shrink Rug',
        image: resolveImagePath('/products/rugs/poly_shrink_p1_1.webp')
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="Carpet Collections"
                        icon="Layers"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-8">
                        Crafting Luxury Carpets & Rugs.
                    </h2>

                    <p className="para-text text-gray font-400 mt-6">
                        United Brothers is Ahmedabad's premier manufacturer of high-density Dilour non-woven rolls, heavy-duty Ribs carpets, and 1800 GSM New Poly Shrink luxury woven rugs.
                    </p>

                    <div className="grid-cols-3 gap-12 mt-30 w-95">
                        {thumbnails.map((item) => (
                            <div
                                key={item.id}
                                className='w-full h-250 rounded-5 bg-forth overflow-hidden cursor-pointer'
                                onClick={() => navigate('/product')}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover flex hover:scale-105 transition-transform"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-550 sm-h-350 rounded-10 overflow-hidden">
                    <Image
                        src={resolveImagePath('/products/spaces/living_room.webp')}
                        alt="United Brothers Carpet Showcase"
                        className="w-full h-full object-cover flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
