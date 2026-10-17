import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: 'Stainless Steel Seamless Pipes',
        image: resolveImagePath('/products/roxy/ss_pipe.jpg'),
        category: 'Pipes & Tubes (Seamless, ERW, Welded)'
    },
    {
        id: 2,
        title: 'Industrial & Boiler Quality Plates',
        image: resolveImagePath('/products/roxy/ss_plate.jpg'),
        category: 'Industrial Plates & Sheets'
    },
    {
        id: 3,
        title: 'High-Pressure Butt-Weld Fittings',
        image: resolveImagePath('/products/roxy/pipe_fittings.jpg'),
        category: 'Pipe Fittings & Butt-Weld Fittings'
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="ISO 9001:2015 & EN 10204 Certified"
                        icon="Shield"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-8">
                        Where Strength Meets Precision in Steel & Nickel Alloys.
                    </h2>

                    <p className="para-text text-gray font-400 mt-6 leading-relaxed">
                        Roxy Enterprises is a premier Exporter, Stockiest, and Supplier of industrial Stainless Steel, Nickel Alloys, Alloy Steel, and Carbon Steel. Headquartered in Mumbai with prompt stockyard dispatches, we serve critical applications across Oil & Gas, Petrochemicals, Fertilizers, Power Generation, and Heavy Engineering worldwide with 100% 3.1 & 3.2 Mill Test Certificates.
                    </p>

                    <div className="grid-cols-3 gap-12 mt-30 w-95">
                        {thumbnails.map((item) => (
                            <div
                                key={item.id}
                                className='w-full h-200 overflow-hidden cursor-pointer'
                                onClick={() => navigate(`/product?category=${encodeURIComponent(item.category)}`)}
                                title={item.title}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-150 object-cover flex"
                                />
                                <p className="mini-text font-500 text-dark text-center mt-6 line-clamp-1">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-550 sm-h-350 rounded-10 overflow-hidden shadow-md">
                    <Image
                        src={resolveImagePath('/products/roxy/about_1.jpg')}
                        alt="Roxy Enterprises Steel Warehousing & Stockyard Facility"
                        className="w-full h-full object-cover flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
