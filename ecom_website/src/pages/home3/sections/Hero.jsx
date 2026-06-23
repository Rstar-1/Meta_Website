import React, { useState } from "react";
import Fade from "../../../components/common/Fade";
import Container from "../../../components/common/Container";

const Hero = ({ onExploreClick }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      tag: "Limited Release v1.02",
      heading: "ELEVATE YOUR DIGITAL SPACE",
      desc: "Immerse yourself in our premium line of workspace gear, custom audio, and responsive smart home tech. Designed for those who seek perfection in form and function.",
      cta: "Explore Collection",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
      accent: "#10B981"
    },
    {
      tag: "Sound Redefined",
      heading: "ACOUSTIC PERFECTION AWAITS",
      desc: "Discover Zenith headphones, featuring advanced hybrid adaptive noise cancelling and premium beryllium drivers. True studio audio, wherever you wander.",
      cta: "Listen Now",
      image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop",
      accent: "#FBBF24"
    }
  ];

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[activeSlide];

  const styles = {
    section: {
      minHeight: "90vh",
      position: "relative",
      backgroundColor: "#0C0C0F",
      backgroundImage: `linear-gradient(to bottom, rgba(12, 12, 15, 0.4), rgba(12, 12, 15, 0.95)), url(${current.image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      alignItems: "center",
      padding: "120px 0 80px",
      transition: "background-image 0.8s ease-in-out",
      overflow: "hidden",
    },
    glowingOrbs: {
      position: "absolute",
      top: "10%",
      right: "5%",
      width: "400px",
      height: "400px",
      borderRadius: "50%",
      backgroundColor: current.accent,
      filter: "blur(180px)",
      opacity: 0.15,
      transition: "background-color 0.8s, opacity 0.8s",
      pointerEvents: "none",
      zIndex: 1,
    },
    contentWrapper: {
      position: "relative",
      zIndex: 2,
      maxWidth: "680px",
      width: "100%",
    },
    tag: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      borderRadius: "30px",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      color: "#FFFFFF",
      fontSize: "13px",
      fontWeight: "700",
      letterSpacing: "1.5px",
      textTransform: "uppercase",
      marginBottom: "24px",
    },
    tagDot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      backgroundColor: current.accent,
      boxShadow: `0 0 10px ${current.accent}`,
      transition: "background-color 0.8s",
    },
    heading: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "calc(2.5rem + 3.5vw)",
      fontWeight: "800",
      lineHeight: "1.05",
      color: "#FFFFFF",
      margin: "0 0 24px 0",
      letterSpacing: "-2px",
      textTransform: "uppercase",
    },
    desc: {
      fontSize: "16px",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: "1.6",
      marginBottom: "40px",
      maxWidth: "560px",
    },
    btnRow: {
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    ctaBtn: {
      backgroundColor: "#FFFFFF",
      color: "#0C0C0F",
      border: "none",
      borderRadius: "30px",
      padding: "16px 36px",
      fontSize: "14px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    },
    arrowBtn: {
      width: "52px",
      height: "52px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      color: "#FFFFFF",
      fontSize: "18px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.2s ease",
    },
    indicatorDot: {
      width: "30px",
      height: "3px",
      borderRadius: "2px",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  return (
    <section id="hero" style={styles.section}>
      {/* CSS Styles for Responsive absolute position alignment with Container padding */}
      <style>{`
        .hero-indicator-wrapper {
          position: absolute;
          bottom: 75px;
          left: 100px;
          display: flex;
          gap: 8px;
          z-index: 10;
        }
        .hero-nav-wrapper {
          position: absolute;
          bottom: 60px;
          right: 100px;
          display: flex;
          gap: 16px;
          z-index: 10;
        }
        @media (max-width: 1224px) and (min-width: 913px) {
          .hero-indicator-wrapper { left: 30px; }
          .hero-nav-wrapper { right: 30px; }
        }
        @media (max-width: 912px) and (min-width: 641px) {
          .hero-indicator-wrapper { left: 20px; }
          .hero-nav-wrapper { right: 20px; }
        }
        @media (max-width: 640px) {
          .hero-indicator-wrapper { left: 10px; }
          .hero-nav-wrapper { right: 10px; }
        }
      `}</style>

      {/* Dynamic Ambient Glowing Orb */}
      <div style={styles.glowingOrbs} />

      <Container version="v1" style={{ position: "relative", width: "100%", margin: "0 auto" }}>
        <div style={styles.contentWrapper}>
          <Fade version="v1" direction="up" delay={100} duration={800}>
            <div style={styles.tag}>
              <div style={styles.tagDot} />
              <span>{current.tag}</span>
            </div>
          </Fade>

          <Fade version="v1" direction="up" delay={250} duration={850}>
            <h1 style={styles.heading}>
              {current.heading}
            </h1>
          </Fade>

          <Fade version="v1" direction="up" delay={400} duration={900}>
            <p style={styles.desc}>
              {current.desc}
            </p>
          </Fade>

          <Fade version="v1" direction="up" delay={550} duration={950}>
            <div style={styles.btnRow}>
              <button
                style={styles.ctaBtn}
                onClick={onExploreClick}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = current.accent;
                  e.currentTarget.style.color = "#FFFFFF";
                  e.currentTarget.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.color = "#0C0C0F";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {current.cta} &nbsp; ↗
              </button>
            </div>
          </Fade>
        </div>

        {/* Slide Indicators */}
        <div className="hero-indicator-wrapper">
          {slides.map((_, idx) => (
            <div
              key={idx}
              style={{
                ...styles.indicatorDot,
                backgroundColor: activeSlide === idx ? "#FFFFFF" : "rgba(255, 255, 255, 0.2)",
                width: activeSlide === idx ? "45px" : "20px"
              }}
              onClick={() => setActiveSlide(idx)}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="hero-nav-wrapper">
          <button
            style={styles.arrowBtn}
            onClick={handlePrev}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.color = "#0C0C0F";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            title="Previous Slide"
          >
            ‹
          </button>
          <button
            style={styles.arrowBtn}
            onClick={handleNext}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFFFFF";
              e.currentTarget.style.color = "#0C0C0F";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
              e.currentTarget.style.color = "#FFFFFF";
            }}
            title="Next Slide"
          >
            ›
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
