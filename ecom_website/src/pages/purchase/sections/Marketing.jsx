import React from 'react';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Button from '../../../components/common/Button';
import Image from '../../../components/common/Image';

const Marketing = () => {
    const phoneEnv = import.meta.env.VITE_PHONE || '8178638960';
    const formattedPhone = `+91 ${phoneEnv.slice(0, 5)} ${phoneEnv.slice(5)}`;

    return (
        <div className="">

            <Container version='v2' style={{
                background: 'linear-gradient(135deg, #041022 0%, #081a36 50%, #051329 100%)',
            }}>
                <div className="grid-cols-2 gap-12 items-center w-full py-30">
                    <div className="relative">
                        <h2 className="text-white font-700 uppercase large-text">
                            Find Responsive <br />
                            <span className='text-primary'>products</span> near you
                        </h2>

                        <p className="text-white font-400 mt-16 para-text">
                            Connect with our sales team to be routed to the nearest authorized dealer in your region – genuine products, verified partners.
                        </p>

                        {/* CTA Buttons using Button component */}
                        <div className="flex items-center gap-12 mt-32">
                            {/* WhatsApp Sales Button */}
                            <Button
                                icon="WhatsApp"
                                iconWidth="20"
                                iconHeight="20"
                                iconFill="var(--white)"
                                text="WhatsApp Sales"
                                version='v2'
                                bg='success'
                                color='white'
                                onClick={() => window.open(`https://wa.me/91${phoneEnv}?text=Hi,%20I%20am%20looking%20for%20an%20authorized%20dealer%20near%20me.`, '_blank')}
                            />

                            {/* Phone Sales Button */}
                            <Button
                                icon="Phone"
                                iconWidth="18"
                                iconHeight="18"
                                iconStroke="var(--white)"
                                text={formattedPhone}
                                version='v2'
                                bg='white'
                                onClick={() => window.location.href = `tel:+91${phoneEnv}`}
                                variant="outline"
                            />
                        </div>
                    </div>

                    <div>
                        <Image
                            src="/purchase_hero_bg.webp"
                            alt="Modern Interior Showroom"
                            className="w-full h-450 object-cover"

                        />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Marketing;
