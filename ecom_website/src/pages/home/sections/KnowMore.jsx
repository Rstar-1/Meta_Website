import React, { useState, useEffect, useRef } from "react";
import Container from "../../../components/common/Container";
import Button from "../../../components/common/Button";

const KnowMore = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const stats = [
        {
            id: 1,
            count: "30+",
            label: "Expert Engineers",
            icon: "https://html.ditsolution.net/industry/indastre1/assets/images/resource/coun-icon1.png",
        },
        {
            id: 2,
            count: "25+",
            label: "Years Experience",
            icon: "https://html.ditsolution.net/industry/indastre1/assets/images/resource/coun-icon1.png",
        },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -20% 0px" }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <Container >
            <div className="flex items-center gap-12 w-full py-80" ref={sectionRef}>
                <div
                    className="w-50 pr-10"
                    style={{
                        transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                        transform: isVisible ? "translateX(0)" : "translateX(-50px)",
                        opacity: isVisible ? 1 : 0
                    }}
                >
                    <img
                        src="https://html.ditsolution.net/industry/indastre1/assets/images/about/about-thumb.png"
                        alt="about company"
                        className="w-full h-600 object-cover flex rounded-5"
                    />
                </div>

                <div
                    className="w-50 pl-15"
                    style={{
                        transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                        transform: isVisible ? "translateX(0)" : "translateX(50px)",
                        opacity: isVisible ? 1 : 0,
                        transitionDelay: "200ms"
                    }}
                >
                    <div className="flex items-center gap-9">
                        <span
                            style={{
                                width: "30px",
                                height: "2px",
                                background: "var(--warning)",
                            }}
                        ></span>
                        <p className="headpara-text text-warning uppercase">About Us</p>
                    </div>

                    <h2 className="large-text text-dark font-600 capitalize pt-10">
                        Build Your Full Projects Management
                    </h2>

                    <p className="para-text text-gray font-500 mt-22">
                        Competently develop accurate methods of empowerment through
                        enterprise-wide action items. Monotonectally enhance seamless
                        meta-services after accurate e-markets. Distinctively extend
                        standardized channels.
                    </p>

                    <div className="mt-30 grid-cols-2 gap-12 w-90">
                        {stats?.map((item, i) => (
                            <div key={i} className="bg-white p-15 rounded-5">
                                <div className="flex items-center gap-10">
                                    <div className="w-25 flex justify-center">
                                        <img
                                            src={item?.icon}
                                            alt={item?.label}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div className="w-75">
                                        <h3 className="text-dark title-text font-600 leading-none">
                                            {item?.count}
                                        </h3>
                                        <p className="text-gray para-text font-600 mt-6">
                                            {item?.label}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-30">
                        <Button text="Learn More About Us" version="v1" bg="warning" />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default KnowMore;
