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
                .track-order-input input {
                    background-color: transparent !important;
                    border: none !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.7) !important;
                    border-radius: 0 !important;
                    color: #ffffff !important;
                    padding: 8px 0 !important;
                    text-indent: 0 !important;
                    font-size: 15px !important;
                    box-shadow: none !important;
                }
                .track-order-input input::placeholder {
                    color: rgba(255, 255, 255, 0.75) !important;
                }
                .track-order-input input:focus {
                    background-color: transparent !important;
                    color: #ffffff !important;
                    border-bottom: 1px solid #ffffff !important;
                    outline: none !important;
                    box-shadow: none !important;
                }
            `}</style>

            <div
                className="relative rounded-20 overflow-hidden w-full h-450 sm-h-250 cursor-pointer group"
                onClick={handleOpenVideo}
                role="button"
                tabIndex={0}
            >
                <Image
                    src="https://realrainwear.in/wp-content/uploads/2025/05/Best-Raincoats-Rainsuits-Manufacturer-in-India-scaled.jpg"
                    alt="Real Rainwear Manufacturing & Dispatch Hub"
                    className="w-full h-full object-cover flex filter-b4 transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                />

                <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center z-10">
                    <div
                        className="icon-lg bg-primary rounded-full"
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

            {isVideoOpen && (
                <Modal
                    isOpen={isVideoOpen}
                    onClose={handleCloseVideo}
                    size="lg"
                    title="Real Rainwear Manufacturing Showcase"
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

            <div className="grid-cols-2 sm-grid-cols-1 gap-12 mt-20">
                <div
                    className="rounded-10 relative overflow-hidden text-white bg-primary h-400"
                >
                    {/* Top Content: Headings & Form */}
                    <div className="relative z-10  p-30 sm-p-24">
                        <p className="small-text uppercase font-500 text-white">
                            Track Your Package
                        </p>
                        <h3 className="head-text font-600 text-white uppercase">
                            Quick Tracking
                        </h3>

                        <form onSubmit={handleTrack} className="flex items-center gap-14 mt-10 w-full gap-12">
                            <Fields
                                type="input"
                                value={trackingNumber}
                                onChange={handleInputChange}
                                placeholder="enter your order number here..."
                                outline={false}
                                border={false}
                                className="w-70"
                            />
                            <Button
                                type="submit"
                                text="Track It"
                                version="v2"
                                bg="white"
                                color="primary"
                                className="rounded-5 py-12 font-600 w-30"
                            />
                        </form>

                        <p className="para-text text-white font-400 mt-16">
                            Track your rainwear order with our expedited logistics network. Dispatched directly from our Mumbai manufacturing facility with live updates, secure waterproof packaging, and prompt doorstep delivery across India.
                        </p>
                    </div>

                    {/* Dotted World Map Graphic */}
                    <Image
                        src="https://realrainwear.in/wp-content/uploads/2023/06/footer-logo.webp"
                        alt="Real Rainwear Watermark"
                        className="absolute bottom-0 right-0 h-150 flex"
                        loading="lazy"
                    />
                </div>

                <div
                    className="rounded-10 relative overflow-hidden h-400"
                >
                    <Image
                        src="https://realrainwear.in/wp-content/uploads/2025/05/Untitled-design.jpg"
                        alt="Real Rainwear Monsoon Collection"
                        className="absolute inset-0 w-full h-full object-cover flex"
                        loading="lazy"
                    />

                    {/* Translucent Overlaid Testimonial Card */}
                    <div
                        className="relative z-10 m-20 sm-m-12 p-24 sm-p-16 text-white"
                        style={{
                            backgroundColor: 'rgba(15, 23, 42, 0.84)',
                            backdropFilter: 'blur(16px)',
                            WebkitBackdropFilter: 'blur(16px)',
                            border: '1px solid rgba(255, 255, 255, 0.14)',
                            borderRadius: '16px',
                        }}
                    >
                        <p className="para-text text-white font-400 mb-16">
                            &ldquo;We have sourced wholesale rain suits and raincoats from Real Rainwear for our retail outlets for years. The taped seam quality is 100% leak-proof, deliveries arrive ahead of the monsoon rush, and our customers always praise the durability.&rdquo;
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-12">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                                    alt="Devendra K. Patil"
                                    className="rounded-full object-cover border border-white border-opacity-30 flex-shrink-0"
                                    style={{ width: '42px', height: '42px' }}
                                />
                                <div>
                                    <h5 className="headmini-text font-600 text-white leading-none">
                                        Sarah Johnson
                                    </h5>
                                    <p className="mini-text font-400 mt-4 text-white opacity-70">
                                        Store Owner
                                    </p>
                                </div>
                            </div>

                            <span
                                style={{
                                    fontSize: '34px',
                                    color: '#ff5500',
                                    lineHeight: 0.5,
                                    fontFamily: 'serif',
                                    fontWeight: 'bold',
                                    letterSpacing: '-2px',
                                }}
                            >
                                &#8221;&#8221;
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
