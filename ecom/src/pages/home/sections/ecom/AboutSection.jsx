import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../../components/common/Image';
import Button from '../../../../components/common/Button';

const AVATARS = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
];

const AboutSection = memo(() => {
    const navigate = useNavigate();
    const handleGetStarted = useCallback(() => navigate('/connect'), [navigate]);

    return (
        <div className="w-full py-60">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12">
                {/* Left Content Column */}
                <div>
                    <p className="text-primary font-600 small-text uppercase mb-12">
                        India's Trusted Rainwear Manufacturer Since 1979
                    </p>

                    <h2 className="large-text font-700 text-dark uppercase">
                        Pioneering All-Weather Rainwear, Staying Dry in Style
                    </h2>
                    <p className="para-text text-gray font-400 mt-12">
                        Since 1979, Real Rainwear has firmly established itself as India's preeminent manufacturer and exporter of heavy-duty rain suits, trendy women's raincoats, and vibrant kids' rainwear. Meticulously designed with 100% waterproof taped seams and high-durability fabrics, we bring seamless protection and style for every rainy season.
                    </p>

                    <Button
                        text="Explore Collections"
                        version="v1"
                        bg="primary"
                        color="white"
                        className="rounded-30 font-500 mt-36"
                        onClick={handleGetStarted}
                    />

                </div>

                <div className="relative rounded-10 overflow-hidden h-500 sm-h-360 w-full sm-mt-16">
                    <Image
                        src="https://realrainwear.in/wp-content/uploads/2025/05/Untitled-design.jpg"
                        alt="Real Rainwear Monsoon Collection"
                        className="w-full h-full object-cover flex"
                        loading="eager"
                    />

                    <div
                        className="absolute bottom-20 right-20 z-10 bg-primary rounded-16 p-24 text-white flex flex-col justify-center"
                        style={{
                            minWidth: '150px',
                            boxShadow: '0 12px 32px rgba(255, 107, 0, 0.35)',
                        }}
                    >
                        <span style={{ fontSize: '56px', fontWeight: '700', lineHeight: 1 }}>45+</span>
                        <span className="font-500 small-text mt-8">Years of Rainwear Excellence</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
