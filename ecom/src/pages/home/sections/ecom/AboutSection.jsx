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
                        Your Trusted Shipping Partner
                    </p>

                    <h2 className="large-text font-700 text-dark uppercase">
                        Expert Ship Freight Services, Deliver Worldwide with Ease
                    </h2>
                    <p className="para-text text-gray font-400 mt-12">
                        We specialize in global ocean freight solutions, offering full container load, less than container load, and bulk cargo shipping. With our trusted carrier network and years of expertise, we guarantee smooth operations, reliable schedules, and cost-effective delivery for businesses of all sizes.
                    </p>

                    <Button
                        text="Get Started Now"
                        version="v1"
                        bg="primary"
                        color="white"
                        className="rounded-30 font-500 mt-36"
                        onClick={handleGetStarted}
                    />

                </div>

                <div className="relative rounded-10 overflow-hidden h-500 sm-h-360 w-full sm-mt-16">
                    <Image
                        src="https://madebydesignesia.com/themes/logixpress/images/misc/s3.webp"
                        alt="Ship Freight Services"
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
                        <span style={{ fontSize: '56px', fontWeight: '700', lineHeight: 1 }}>15</span>
                        <span className="font-500 small-text mt-8">Years of Excellence</span>
                    </div>
                </div>
            </div>
        </div>
    );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;