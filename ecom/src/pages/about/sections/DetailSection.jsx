import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: 'SS Round Bars (ASTM A276 / Duplex)',
        category: 'Round Bars',
        image: resolveImagePath('/metal/round-bars.jpg')
    },
    {
        id: 2,
        title: 'Forged Fittings 3000# / 6000# (ASME B16.11)',
        category: 'Forged Fittings',
        image: resolveImagePath('/metal/forged-fittings.jpg')
    },
    {
        id: 3,
        title: 'Stainless Steel Flanges (ASME B16.5)',
        category: 'Stainless Steel Flanges',
        image: resolveImagePath('/metal/card_ss_flanges.jpg')
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="Certified Mill Stockist & Exporter"
                        icon="Layers"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-6">
                        Stainless Steel Round Bars, Forged Fittings &amp; Flanges.
                    </h2>

                    <p className="para-text text-gray font-400 mt-20">
                        Jubilant Metal And Alloys is Mumbai&apos;s premier stockholder and exporter of centerless ground stainless steel round bars (ASTM A276), Class 3000# &amp; 6000# forged fittings (ASME B16.11), precision flanges, and seamless piping solutions for petrochemical, refinery, and EPC engineering clients worldwide.
                    </p>

                </div>

                <div className="w-full h-600 sm-h-350 rounded-10 overflow-hidden">
                    <Image
                        src={resolveImagePath('/metal/special-features.png')}
                        alt="Jubilant Metal And Alloys Precision Scope"
                        className="w-full h-full object-contain flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
