import React, { memo, useState, useCallback } from 'react';

import Image from '../../../../components/common/Image';
import Fields from '../../../../components/forms/Fields';
import Button from '../../../../components/common/Button';
import Icon from '../../../../components/common/Icon';
import Modal from '../../../../components/common/Modal';
import { showToast } from '../../../../components/common/Toast';

const TrackSection = memo(() => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const handleInputChange = useCallback((val) => {
        const value = typeof val === 'object' && val?.target ? val.target.value : val;
        setTrackingNumber(value || '');
    }, []);

    const handleTrack = useCallback(
        (e) => {
            e?.preventDefault?.();
            const trimmed = trackingNumber.trim();
            if (!trimmed) {
                showToast('Please enter your tracking or order number.', 'warning');
                return;
            }
            showToast(`Tracking status retrieved for: ${trimmed}`, 'success');
        },
        [trackingNumber]
    );

    const handleOpenVideo = useCallback(() => setIsVideoOpen(true), []);
    const handleCloseVideo = useCallback(() => setIsVideoOpen(false), []);

    return (
        <div className="w-full py-40">
            <style>{`
                .track-input input {
                    background-color: transparent !important;
                    border: none !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.45) !important;
                    border-radius: 0 !important;
                    color: #ffffff !important;
                    padding: 10px 0 !important;
                    text-indent: 0 !important;
                    font-size: 15px !important;
                }
                .track-input input::placeholder {
                    color: rgba(255, 255, 255, 0.75) !important;
                }
                .track-input input:focus {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.9) !important;
                }
            `}</style>

            {/* Top Video Banner */}
            <div
                className="relative rounded-20 overflow-hidden w-full h-420 sm-h-240 cursor-pointer group"
                onClick={handleOpenVideo}
            >
                <Image
                    src="https://madebydesignesia.com/themes/logixpress/images/background/2.webp"
                    alt="Cargo Port Container Shipping"
                    className="w-full h-full object-cover flex group-hover:scale-105 transition-transform"
                    loading="lazy"
                />

                <div className="absolute inset-0 bg-dark opacity-25 group-hover:opacity-35 transition-opacity" />

                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <div
                        className="w-70 h-70 sm-w-50 sm-h-50 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-all shadow-2xl"
                        style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.85)',
                            backdropFilter: 'blur(6px)',
                        }}
                    >
                        <Icon
                            name="Play"
                            width="22"
                            height="22"
                            fill="var(--white)"
                            stroke="var(--white)"
                            style={{ marginLeft: '4px' }}
                        />
                    </div>
                </div>
            </div>

            {/* Video Modal Popup */}
            {isVideoOpen && (
                <Modal
                    isOpen={isVideoOpen}
                    onClose={handleCloseVideo}
                    size="lg"
                    title="Logistics Operations"
                >
                    <div className="w-full overflow-hidden rounded-10 aspect-video">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/FikkQTfbaOs?autoplay=1"
                            title="Logistics Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ border: 'none', minHeight: '360px' }}
                        />
                    </div>
                </Modal>
            )}

            {/* Bottom 2 Columns Grid */}
            <div className="grid-cols-2 sm-grid-cols-1 gap-12 mt-20 items-stretch">
                {/* Left Card: Quick Tracking */}
                <div
                    className="rounded-20 p-40 sm-p-24 relative overflow-hidden justify-between text-white h-full"
                    style={{
                        backgroundColor: 'var(--primary, #ff6b00)',
                        minHeight: '480px',
                    }}
                >
                    <div className="relative z-10">
                        <p className="mini-text uppercase tracking-wider font-500 text-white text-opacity-90 mb-6">
                            Track Your Package
                        </p>
                        <h3 className="large-text sm-large-text font-700 text-white leading-tight">
                            Quick Tracking
                        </h3>

                        {/* Tracking Form with Fields & Button */}
                        <form onSubmit={handleTrack} className="flex items-center gap-12 mt-28 w-full">
                            <div className="flex-1 track-input">
                                <Fields
                                    type="text"
                                    value={trackingNumber}
                                    onChange={handleInputChange}
                                    placeholder="enter your order number here..."
                                    outline={false}
                                    border={false}
                                    className="w-full text-white"
                                />
                            </div>
                            <Button
                                type="submit"
                                text="Track It"
                                version="v1"
                                bg="white"
                                color="dark"
                                className="rounded-30 font-600 flex-shrink-0"
                                style={{ padding: '10px 24px', fontSize: '14px' }}
                            />
                        </form>
                    </div>

                    {/* Dotted World Map Graphic */}
                    <Image
                        src="https://madebydesignesia.com/themes/logixpress/images/misc/c2.webp"
                        alt="Global Coverage Map"
                        className="absolute bottom-0 right-0 pointer-events-none flex"
                        style={{ width: '55%', opacity: 0.28, zIndex: 1 }}
                        loading="lazy"
                    />

                    {/* Bottom Explanatory Paragraph */}
                    <p
                        className="small-text text-white text-opacity-95 font-400 mt-40 max-w-md relative z-10 leading-relaxed"
                        style={{ maxWidth: '420px' }}
                    >
                        Track your package with our trusted logistics service. From pickup to delivery, we provide updates, secure handling, and visibility so your shipment arrives safely and on time.
                    </p>
                </div>

                {/* Right Card: Customer Testimonial */}
                <div
                    className="rounded-20 overflow-hidden relative w-full h-full justify-end"
                    style={{ minHeight: '480px' }}
                >
                    <Image
                        src="https://madebydesignesia.com/themes/logixpress/images/misc/s5.webp"
                        alt="Happy Customer with Package"
                        className="absolute inset-0 w-full h-full object-cover flex"
                        loading="lazy"
                    />

                    {/* Translucent Overlaid Testimonial Card */}
                    <div
                        className="relative z-10 m-20 sm-m-12 p-24 sm-p-16 rounded-16 text-white"
                        style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.85)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255, 255, 255, 0.12)',
                        }}
                    >
                        <p className="mini-text text-white text-opacity-90 leading-relaxed font-400 mb-18">
                            &ldquo;We&apos;ve trusted this logistics company for years, and they never disappoint. Every shipment is handled with care, delivered on time, and supported with clear tracking. Their team makes global shipping simple, reliable, and stress-free for our business.&rdquo;
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-12">
                                <Image
                                    src="https://madebydesignesia.com/themes/logixpress/images/testimonial/1.webp"
                                    alt="Sarah Johnson"
                                    width="42px"
                                    height="42px"
                                    className="rounded-full object-cover border border-white border-opacity-30 flex-shrink-0"
                                    style={{ width: '42px', height: '42px' }}
                                />
                                <div>
                                    <h5 className="headmini-text font-600 text-white leading-none">
                                        Sarah Johnson
                                    </h5>
                                    <p className="mini-text text-gray font-400 mt-4">
                                        Store Owner
                                    </p>
                                </div>
                            </div>

                            <span
                                style={{
                                    fontSize: '32px',
                                    color: 'var(--primary, #ff6b00)',
                                    lineHeight: 0.5,
                                    fontFamily: 'serif',
                                    fontWeight: 'bold',
                                    letterSpacing: '-2px',
                                }}
                            >
                                &rdquo;&rdquo;
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

TrackSection.displayName = 'TrackSection';

export default TrackSection;
