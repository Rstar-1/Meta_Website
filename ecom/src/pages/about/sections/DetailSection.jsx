import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: '50mm Vented Drum Bungs',
        image: '/images/products/bung-50mm-vented.webp'
    },
    {
        id: 2,
        title: 'Tamper-Evident Screw Caps',
        image: '/images/products/screw-cap-red.webp'
    },
    {
        id: 3,
        title: 'IBC Dispensing Valves',
        image: 'https://vasujavalplastics.com/wp-content/uploads/2025/10/DN80-Integrated-Thread-Butterfly-Valve.png'
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="Precision Engineering"
                        icon="Settings"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-8">
                        High-Performance Industrial Closures & Hardware.
                    </h2>

                    <p className="para-text text-gray font-400 mt-6">
                        Vasu Javal Plastics specializes in precision injection-moulded packaging closures, bung plugs, vented screw caps, neck inserts, and IBC valves. Engineered with 100% virgin-grade polymers to deliver zero-leakage security across India's chemical, lubricant, paint, and agrochemical sectors.
                    </p>

                    <div className="grid-cols-3 gap-12 mt-30 w-95">
                        {thumbnails.map((item) => (
                            <div
                                key={item.id}
                                className='w-full h-250 rounded-5 bg-forth overflow-hidden cursor-pointer'
                                onClick={() => navigate('/products')}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover flex"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-550 sm-h-350 rounded-10 overflow-hidden">
                    <Image
                        src="https://vasujavalplastics.com/wp-content/uploads/2025/11/123.webp"
                        alt="Vasu Javal Plastics Industrial Packaging Closures"
                        className="w-full h-full object-cover flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
