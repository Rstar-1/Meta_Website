import React from "react";
import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";

const Timeline = () => {
    const historyData = [
        {
            id: 1,
            year: "Since 1990",
            title: "Since Founding",
            desc: "Started as a small engineering firm focusing on local industrial solutions.",
        },
        {
            id: 2,
            year: "Since 2012",
            title: "Regional Expansion",
            desc: "Expanded operations to cover major industrial zones across the country.",
        },
        {
            id: 3,
            year: "Since 2023",
            title: "First History",
            desc: "Reached a milestone of 100+ successful projects in the manufacturing sector.",
        },
        {
            id: 4,
            year: "Since 2025",
            title: "Digital Integration",
            desc: "Integrated AI and IoT solutions into our core industrial service offerings.",
        },
    ];

    return (
        <Container>
            <Fade direction="none" className="py-80 w-full" threshold={0.2}>
                {(isVisible) => (
                    <>
                        <p className="headpara-text text-warning font-500 text-center capitalize">
                            What We Offer
                        </p>
                        <h2 className="head-text text-dark font-600 capitalize text-center pt-10">
                            Service Expertise Your Business
                        </h2>
                        <div className="mt-40">
                            <hr
                                className="bg-warning border-0 timeline-line"
                                style={{
                                    height: "3px",
                                    transformOrigin: "left center",
                                    transition: "transform 1.2s cubic-bezier(0.445, 0.05, 0.55, 0.95)",
                                    transform: isVisible ? "scaleX(1)" : "scaleX(0)"
                                }}
                            />
                            <div className="grid-cols-4 gap-4 relative">
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
                                            className="py-10 timeline-content"
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

