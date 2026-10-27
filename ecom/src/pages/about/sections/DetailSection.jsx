import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: 'Silyl Reagents (TMS-N3)',
        image: '/images/chemicals/tms-azide.webp'
    },
    {
        id: 2,
        title: 'Triflic Anhydride & Fluoro Compounds',
        image: '/images/chemicals/triflic-anhydride.webp'
    },
    {
        id: 3,
        title: 'Bulk Drug Intermediates (DFTA)',
        image: '/images/chemicals/dfta-fluconazole.webp'
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="Custom Synthesis & Contract Mfg"
                        icon="Layers"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-8">
                        Advanced Bulk Drug Intermediates & Fine Chemicals.
                    </h2>

                    <p className="para-text text-gray font-400 mt-6">
                        Established in Mumbai in 2003, Global Chemie is a premier contract manufacturer, wholesaler, importer, and exporter of bulk drug intermediates, speciality chemicals, fine chemicals, and rare research compounds. With more than 2,500 products in ready stock offered in R&D, semi-bulk, and bulk commercial quantities, our products are processed using cutting-edge techniques by highly trained professionals.
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
                        src="/images/globalchemie/chemical-lab.jpg"
                        alt="Global Chemie Analytical Laboratory and Synthesis Facility"
                        className="w-full h-full object-cover flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
