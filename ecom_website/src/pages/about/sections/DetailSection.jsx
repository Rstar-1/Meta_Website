import React, { useState, useEffect } from "react";
import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";

const GaugeCard = ({ title, value, label, color, isVisible }) => {
    const [currentVal, setCurrentVal] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 1800; // 1.8 seconds
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function: easeOutQuad
            const ease = progress * (2 - progress);

            setCurrentVal(Math.round(ease * value));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, value]);

    return (
        <div className="border-ec p-20 rounded-5 gauge-card h-full">
            <h4 className="mid-text text-dark font-600 uppercase">
                {title}
            </h4>
            <div
                style={{
                    position: "relative",
                    height: "120px",
                    width: "120px",
                    margin: "auto",
                    border: `8px solid ${color}`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                className="mt-12"
            >
                <span className="font-bold text-dark" style={{ fontSize: "20px" }}>
                    {currentVal}%
                </span>
            </div>
            <p className="mini-text text-gray mt-20">{label}</p>
        </div>
    );
};

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

    return (
        <Container className="bg-forth">
            <div className="py-40 w-full">
                <div className="grid-cols-4 items-start gap-12">
                    <Fade direction="scale" duration={800}>
                        {(isVisible) => (
                            <GaugeCard
                                title="QUALIFICATIONS"
                                value={45}
                                label="Dip(Engg)"
                                color={colors.orange}
                                isVisible={isVisible}
                            />
                        )}
                    </Fade>
                    <Fade direction="scale" duration={800} delay={200}>
                        {(isVisible) => (
                            <GaugeCard
                                title="DISCIPLINES"
                                value={58}
                                label="Mechanical"
                                color={colors.navy}
                                isVisible={isVisible}
                            />
                        )}
                    </Fade>
                </div>
                
                <div className="grid-cols-3 items-start gap-12 mt-40">
                    {/* Management Team Column */}
                    <div className="info-col">
                        <Fade
                            direction="left"
                            delay={400}
                        >
                            <h2 className="title-text text-dark font-600 uppercase col-title">
                                Management Team
                            </h2>
                            <hr
                                className="border-0 bg-warning mx-1 mt-8 col-hr"
                                style={{ width: "80px", height: "5px" }}
                            />
                        </Fade>
                        {[
                            "Workstations with latest software",
                            "State of the Art secure office",
                            "4 Mbps online connectivity",
                            "FTP facility for individual customers",
                        ].map((item, i) => (
                            <Fade
                                key={i}
                                direction="up"
                                delay={550 + i * 80}
                                className="flex items-center p-8 bordb w-max info-item"
                            >
                                <p style={iconCircle}>🏢</p>
                                <p className="text-gray small-text">{item}</p>
                            </Fade>
                        ))}
                    </div>

                    {/* Service Network Column */}
                    <div className="info-col">
                        <Fade
                            direction="left"
                            delay={550}
                        >
                            <h2 className="title-text text-dark font-600 uppercase col-title">
                                Service Network
                            </h2>
                            <hr
                                className="border-0 bg-warning mx-1 mt-8 col-hr"
                                style={{ width: "80px", height: "5px" }}
                            />
                        </Fade>
                        {[
                            "100 dedicated service personnel",
                            "All trained at principals' works",
                            "Average of 15+ years experience",
                            "Mixed engineering disciplines",
                        ].map((item, i) => (
                            <Fade
                                key={i}
                                direction="up"
                                delay={700 + i * 80}
                                className="flex items-center p-8 bordb w-max info-item"
                            >
                                <p style={iconCircle}>✔</p>
                                <p className="text-gray small-text">{item}</p>
                            </Fade>
                        ))}
                    </div>

                    {/* Our People Column */}
                    <div className="info-col">
                        <Fade
                            direction="left"
                            delay={700}
                        >
                            <h2 className="title-text text-dark font-600 uppercase col-title">
                                Our People
                            </h2>
                            <hr
                                className="border-0 bg-warning mx-1 mt-8 col-hr"
                                style={{ width: "80px", height: "5px" }}
                            />
                        </Fade>
                        {[
                            "220 dedicated people",
                            "70 committed service experts",
                            "65 motivated sales personnel",
                        ].map((item, i) => (
                            <Fade
                                key={i}
                                direction="up"
                                delay={850 + i * 80}
                                className="flex items-center p-8 bordb w-max info-item"
                            >
                                <p style={iconCircle}>👤</p>
                                <p className="text-gray small-text">{item}</p>
                            </Fade>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default DetailSection;
