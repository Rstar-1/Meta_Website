import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: "Men's Heavy-Duty Rainsuits",
        image: "https://realrainwear.in/wp-content/uploads/2025/05/TREX-_-GREY-4-600x799.jpg"
    },
    {
        id: 2,
        title: "Women's All-Weather Raincoats",
        image: "https://realrainwear.in/wp-content/uploads/2023/09/women-01.png"
    },
    {
        id: 3,
        title: "Kids Colourful Rainwear",
        image: "https://realrainwear.in/wp-content/uploads/2025/03/kid-bann.jpg"
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="Rainwear Heritage"
                        icon="Layers"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-8">
                        Crafting India's Finest Rainwear Since 1979.
                    </h2>

                    <p className="para-text text-gray font-400 mt-6">
                        Real Rainwear has revolutionized the rainwear industry and made staying dry an art form. Firmly established since 1979 as India's preeminent manufacturer and exporter, our collections deliver 100% waterproof protection, fully sealed taped seams, and durable style for the entire family.
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
                        src="https://realrainwear.in/wp-content/uploads/2025/05/Best-Raincoats-Rainsuits-Manufacturer-in-India-scaled.jpg"
                        alt="Real Rainwear Manufacturing Showcase"
                        className="w-full h-full object-cover flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
