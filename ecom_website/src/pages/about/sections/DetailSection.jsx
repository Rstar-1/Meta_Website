import React from "react";
import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";

const DetailSection = () => {
    const colors = {
        orange: "#ff5e14",
        navy: "#001d3d",
        text: "#555555",
        border: "#eeeeee",
        lightBg: "#f9f9f9",
    };
    const iconCircle = {
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        backgroundColor: colors.lightBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "15px",
        color: colors.orange,
        fontSize: "18px",
    };

    const sectionsData = [
        {
            title: "E-commerce Operations",
            icon: "📈",
            delay: 400,
            points: [
                "Dynamic catalog & category systems",
                "Real-time inventory management",
                "Custom B2B client portal solutions",
                "Automated order processing pipelines",
                "24/7 dedicated customer care desk",
                "Multi-channel marketing coordination",
            ],
        },
        {
            title: "Digital Marketing & SEO",
            icon: "🎯",
            delay: 550,
            points: [
                "SEO optimization for all product lines",
                "High-converting social ad campaigns",
                "B2B lead generation & email marketing",
                "Targeted search engine visibility",
                "Google Analytics & performance audits",
                "Content marketing and blog architecture",
            ],
        },
        {
            title: "Ecommerce Tech Stack",
            icon: "💻",
            delay: 700,
            points: [
                "Fast, responsive React single page app",
                "Secure shopping cart & checkout flows",
                "Centralized category & search filtering",
                "Optimized database for new additions",
                "Highly secure cloud infrastructure",
            ],
        },
        {
            title: "Wholesale Fulfillment",
            icon: "🚚",
            delay: 850,
            points: [
                "Strict quality check for all products",
                "Vetted manufacturers and distributors",
                "100% genuine product guarantee",
                "Optimized B2B shipping & bulk logistics",
                "Eco-friendly packaging options",
            ],
        },
    ];

    return (
        <Container className="bg-forth">
            <Fade direction="none" className="py-60 sm-py-40 w-full" threshold={0.15}>
                {(isVisible) => (
                    <div className="grid-cols-4 sm-grid-cols-1 md-grid-cols-2 items-start gap-12 sm-px-12">
                        {sectionsData.map((section, idx) => (
                            <div key={idx} className="info-col">
                                <div
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        transform: isVisible ? "translateX(0)" : "translateX(-30px)",
                                        transition: "opacity 800ms cubic-bezier(0.215, 0.61, 0.355, 1), transform 800ms cubic-bezier(0.215, 0.61, 0.355, 1)",
                                        transitionDelay: `${section.delay}ms`,
                                    }}
                                >
                                    <h2 className="title-text text-dark font-600 uppercase">
                                        {section.title}
                                    </h2>
                                    <hr
                                        className="border-0 bg-warning mx-1 mt-8 col-hr"
                                        style={{ width: "80px", height: "5px" }}
                                    />
                                </div>
                                {section.points.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center p-8 bordb w-max info-item"
                                        style={{
                                            opacity: isVisible ? 1 : 0,
                                            transform: isVisible ? "translateY(0)" : "translateY(30px)",
                                            transition: "opacity 800ms cubic-bezier(0.215, 0.61, 0.355, 1), transform 800ms cubic-bezier(0.215, 0.61, 0.355, 1)",
                                            transitionDelay: `${section.delay + 150 + i * 80}ms`,
                                        }}
                                    >
                                        <p style={iconCircle}>{section.icon}</p>
                                        <p className="text-gray font-400 small-text">{item}</p>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </Fade>
        </Container>
    );
};

export default DetailSection;
