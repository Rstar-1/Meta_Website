import React, { useState, useEffect, useRef } from "react";
import Container from "../../../components/common/Container";
import Button from "../../../components/common/Button";

const SlideSection = () => {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: "0px 0px -25% 0px" }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="relative overflow-hidden">
            {/* Parallax Background using CSS fixed attachment */}
            <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                    height: "100%",
                    background: "url('https://chimerical-gumption-fb54a4.netlify.app/static/media/banner.2d5ea0077210e67e5d6a.png') center/cover no-repeat fixed",
                    zIndex: -1
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}></div>
            </div>

            <Container className="relative z-10 text-center">
                <div className="w-70 mx-auto py-100">
                    <p
                        className="headpara-text text-warning font-500 uppercase"
                        style={{
                            transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                            transform: isVisible ? "translateY(0)" : "translateY(50px)",
                            opacity: isVisible ? 1 : 0
                        }}
                    >
                        Let's Work Together
                    </p>
                    <h2
                        className="large-text text-white font-700 pt-20 leading-tight"
                        style={{
                            transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                            transform: isVisible ? "translateY(0)" : "translateY(50px)",
                            opacity: isVisible ? 1 : 0,
                            transitionDelay: "200ms"
                        }}
                    >
                        Ready to Take Your Industrial Business to the Next Level?
                    </h2>
                    <p
                        className="para-text text-white font-400 mt-20"
                        style={{
                            transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                            transform: isVisible ? "translateY(0)" : "translateY(50px)",
                            opacity: isVisible ? 0.8 : 0,
                            transitionDelay: "400ms"
                        }}
                    >
                        Our expert team is ready to provide cutting-edge solutions tailored to your unique manufacturing needs.
                    </p>
                    <div
                        className="mt-40"
                        style={{
                            transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                            transform: isVisible ? "translateY(0)" : "translateY(50px)",
                            opacity: isVisible ? 1 : 0,
                            transitionDelay: "600ms"
                        }}
                    >
                        <Button text="Get a Free Quote" version="v1" bg="warning" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default SlideSection;
