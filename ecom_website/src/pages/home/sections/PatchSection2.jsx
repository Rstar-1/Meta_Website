import React, { useState, useEffect, useRef } from "react";
import Container from "../../../components/common/Container";

const PatchSection2 = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    const achievements = [
        {
            id: 1,
            count: "30+",
            label: "Expert Engineers",
            icon: "https://html.ditsolution.net/industry/indastre1/assets/images/resource/coun-icon1.png",
        },
        {
            id: 2,
            count: "100+",
            label: "Successful Projects",
            icon: "https://html.ditsolution.net/industry/indastre1/assets/images/resource/coun-icon1.png",
        }
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
        <Container>
            <div className="flex items-center w-full py-80" ref={sectionRef}>
                <div
                    className="w-50"
                    style={{
                        transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                        transform: isVisible ? "translateX(0)" : "translateX(-50px)",
                        opacity: isVisible ? 1 : 0
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
                        <p className="para-text text-warning uppercase">ACHIEVEMENTS</p>
                    </div>
                    <h2 className="head-text text-dark font-600 uppercase pt-10">
                        Company Top Achievements
                    </h2>
                </div>

                <div className="w-50 grid-cols-2 gap-12">
                    {achievements?.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white p-20 rounded-5"
                            style={{
                                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s",
                                transform: isVisible ? "scale(1)" : "scale(0.85)",
                                opacity: isVisible ? 1 : 0,
                                transitionDelay: `${200 + i * 200}ms`
                            }}
                        >
                            <div className="flex items-center gap-10">
                                <div className="w-25">
                                    <img
                                        src={item?.icon}
                                        alt={item?.label}
                                        className="object-contain"
                                    />
                                </div>
                                <div className="w-75">
                                    <h3 className="text-dark title-text font-600">
                                        {item?.count}
                                    </h3>
                                    <p className="text-gray para-text font-500 mt-3">
                                        {item?.label}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default PatchSection2;
