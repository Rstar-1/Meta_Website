import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';
import Icon from '../../../../components/common/Icon';
import { resolveImagePath } from '../../../../utils/imageResolver';

const keyFeatures = [
    {
        title: 'EN 10204 3.1 & 3.2 Mill Certified',
        description: 'Complete metallurgical traceability with ultrasonic NDT, PMI spectro testing, and chemical analysis.'
    },
    {
        title: 'Comprehensive Metallurgy & Superalloys',
        description: 'Stainless Steel (304, 316L, 321, Duplex), Nickel Alloys (Inconel 625, Hastelloy C276, Monel 400), and Carbon Steel.'
    },
    {
        title: 'Vast Mumbai Stockyard Inventory',
        description: 'Massive stock of Seamless & ERW Pipes, Boiler Quality & Hardox Plates, Forged Flanges, and Butt-Weld Fittings.'
    },
    {
        title: 'Global Export & Fast Project Supply',
        description: 'Trusted supplier to Oil & Gas, Petrochemicals, Fertilizers, Power Generation, and Fabricators worldwide.'
    }
];

const AboutSection = memo(() => {
    const navigate = useNavigate();
    const handleExplore = useCallback(() => navigate('/product'), [navigate]);
    const handleEnquiry = useCallback(() => navigate('/connect'), [navigate]);

    return (
        <div className="w-full py-60">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12">
                <div>
                    <h2 className="large-text font-700 text-dark uppercase">
                        Where Strength Meets Precision in Steel & Nickel Alloy Solutions
                    </h2>

                    <p className="para-text text-gray font-400 mt-14 leading-relaxed">
                        Roxy Enterprises is a distinguished Exporter, Stockiest, and Supplier of industrial Stainless Steel, Nickel Alloy, Alloy Steel, and Carbon Steel. Headquartered in Mumbai with extensive stockyard facilities, we deliver high-integrity piping systems, pressure-vessel plates, precision CNC fittings, and heavy-duty fasteners tailored to demanding engineering requirements.
                    </p>

                    <div className="grid-cols-2 sm-grid-cols-1 gap-10 mt-20">
                        {keyFeatures.map((feat, idx) => (
                            <div key={idx} className="p-10 rounded-5 bg-white">
                                <div className="flex items-center gap-6">
                                    <Icon name="CheckCircle" width="16" height="16" stroke="var(--primary)" />
                                    <h4 className="headmini-text font-600 text-dark m-0">{feat.title}</h4>
                                </div>
                                <p className="mini-text text-gray mt-4 m-0 leading-tight">{feat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Image Column */}
                <div className="relative rounded-10 overflow-hidden h-500 sm-h-360 w-full sm-mt-12 shadow-sm">
                    <Image
                        src={resolveImagePath('/products/roxy/about_1.jpg')}
                        alt="Roxy Enterprises Industrial Steel Warehousing & Stockyard"
                        className="w-full h-full object-cover flex"
                        loading="eager"
                    />
                </div>
            </div>
        </div>
    );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;