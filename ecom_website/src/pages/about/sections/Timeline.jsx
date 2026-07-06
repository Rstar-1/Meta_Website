import React from "react";
import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";

const Timeline = () => {
    const historyData = [
        {
            id: 1,
            year: "Step 01",
            title: "Multi-Channel Promotion",
            desc: "We deploy strategic SEO and targeted advertising campaigns for any product category, driving high-intent B2B traffic.",
        },
        {
            id: 2,
            year: "Step 02",
            title: "High-Converting Catalog",
            desc: "We design and run optimized e-commerce platforms featuring smooth search, shopping carts, and city-based filtering.",
        },
        {
            id: 3,
            year: "Step 03",
            title: "Fulfillment & Insights",
            desc: "We manage bulk order processing and supply chain logistics, backed by deep web analytics to continuously grow your sales.",
        },
    ];

    return (
        <Container>
            <Fade direction="none" className="py-60 sm-py-40 w-full" threshold={0.2}>
                {(isVisible) => (
                    <>
                        <style>{`
                          .timeline-container {
                            position: relative;
                          }
                          
                          @media (max-width: 912px) {
                            .timeline-line {
                              display: block !important;
                              width: 3px !important;
                              height: auto !important;
                              position: absolute !important;
                              left: 12px !important;
                              top: 24px !important;
                              bottom: 0px !important;
                              transform-origin: top center !important;
                              transform: scaleY(${isVisible ? 1 : 0}) !important;
                              transition: transform 1.2s cubic-bezier(0.445, 0.05, 0.55, 0.95) !important;
                            }
                            .timeline-grid {
                              display: flex !important;
                              flex-direction: column !important;
                              gap: 30px !important;
                              position: relative !important;
                              padding-left: 35px !important;
                            }
                            .timeline-item {
                              position: relative !important;
                            }
                            .timeline-dot {
                              position: absolute !important;
                              left: -26px !important;
                              top: 24px !important;
                              margin-top: 0 !important;
                              margin-left: 0 !important;
                            }
                            .timeline-content {
                              padding: 0 !important;
                            }
                          }
                        `}</style>

                        <p className="para-text text-warning font-500 text-center capitalize">
                            What We Offer
                        </p>
                        <h2 className="head-text text-dark font-600 capitalize text-center pt-10">
                            Service Expertise Your Business
                        </h2>
                        <div className="mt-40 relative timeline-container">
                            <hr
                                className="bg-warning border-0 timeline-line"
                                style={{
                                    height: "3px",
                                    transformOrigin: "left center",
                                    transition: "transform 1.2s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
                                    transform: isVisible ? "scaleX(1)" : "scaleX(0)"
                                }}
                            />
                            <div className="grid-cols-3 gap-4 relative timeline-grid">
                                {historyData?.map((item, index) => (
                                    <div key={item.id} className="timeline-item">
                                        <p
                                            className="dot timeline-dot bg-warning rounded-full"
                                            style={{
                                                marginTop: "-15px",
                                                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s",
                                                transform: isVisible ? "scale(1)" : "scale(0)",
                                                opacity: isVisible ? 1 : 0,
                                                transitionDelay: `${400 + index * 200}ms`
                                            }}
                                        ></p>
                                        <div
                                            className="px-18 py-12 timeline-content"
                                            style={{
                                                transition: "transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.5s",
                                                transform: isVisible ? "translateY(0)" : "translateY(25px)",
                                                opacity: isVisible ? 1 : 0,
                                                transitionDelay: `${600 + index * 200}ms`
                                            }}
                                        >
                                            <p className="text-warning mini-text font-400 mt-10">
                                                {item.year}
                                            </p>
                                            <h4 className="title-text text-dark font-600 pt-6">
                                                {item.title}
                                            </h4>
                                            <p className="mt-5 text-gray small-text">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </Fade>
        </Container>
    );
};

export default Timeline;

