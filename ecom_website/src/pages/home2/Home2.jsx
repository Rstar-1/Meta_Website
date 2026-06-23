import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "./sections/Hero";
import ScrollingMarquee from "./sections/ScrollingMarquee";
import About from "./sections/About";
import Facts from "./sections/Facts";
import Projects from "./sections/Projects";
import Team from "./sections/Team";
import Process from "./sections/Process";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";
import Brands from "./sections/Brands";

const Home2 = () => {
  const navigate = useNavigate();

  // States for interactive components
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);

  // Track scroll position for sticky header & back-to-top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    "Home", "About Us", "Portfolio", "Pricing", "Contact", "Careers", "Case Studies", "FAQs"
  ];

  // Custom styling objects
  const styles = {
    container: {
      backgroundColor: "#FFFFFF",
      color: "#0C0C0F",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      overflowX: "hidden",
      position: "relative",
    },
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 5%",
      zIndex: 1000,
      transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
      backgroundColor: isHeaderSticky ? "rgba(255, 255, 255, 0.95)" : "transparent",
      borderBottom: isHeaderSticky ? "1px solid rgba(12, 12, 15, 0.08)" : "1px solid transparent",
      backdropFilter: isHeaderSticky ? "blur(10px)" : "none",
    },
    navLinks: {
      display: "flex",
      gap: "30px",
      alignItems: "center",
    },
    navLink: {
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "15px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
    },
    ctaButton: {
      backgroundColor: "#FF5A36",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "30px",
      padding: "12px 28px",
      fontWeight: "600",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease",
    },
    footerSection: {
      padding: "100px 5% 40px",
      backgroundColor: "#F4F4F5",
      color: "#0C0C0F",
      borderTop: "1px solid rgba(12, 12, 15, 0.08)",
      position: "relative",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "50px",
      marginBottom: "60px",
    },
    footerHeading: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "36px",
      fontWeight: "800",
      textTransform: "uppercase",
      lineHeight: "1.1",
      margin: "0 0 24px 0",
      letterSpacing: "-0.5px",
    },
    footerSocialGroup: {
      display: "flex",
      gap: "12px",
    },
    footerSocialCircle: {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "1px solid rgba(12, 12, 15, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textDecoration: "none",
      color: "#0C0C0F",
      transition: "all 0.2s ease",
      fontWeight: "bold",
    },
    footerLinksTitle: {
      fontSize: "12px",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "rgba(12, 12, 15, 0.4)",
      letterSpacing: "1px",
      marginBottom: "20px",
    },
    footerLinksGrid: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    },
    footerPillLink: {
      fontSize: "13px",
      color: "#0C0C0F",
      border: "1px solid rgba(12, 12, 15, 0.1)",
      borderRadius: "20px",
      padding: "8px 18px",
      textDecoration: "none",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
    footerBottom: {
      borderTop: "1px solid rgba(12, 12, 15, 0.08)",
      paddingTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
      fontSize: "14px",
      color: "rgba(12, 12, 15, 0.6)",
    },
    backToTopBtn: {
      position: "fixed",
      bottom: "30px",
      right: "30px",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "#FF5A36",
      color: "#FFFFFF",
      border: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      zIndex: 999,
      transition: "all 0.3s ease",
      fontWeight: "bold",
      fontSize: "18px",
    },
  };

  return (
    <div style={styles.container}>
      {/* 🚀 Dynamic Styles Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        
        /* Continuous scrolling marquee animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        /* Custom scrollbar for premium aesthetic */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #FFFFFF;
        }
        ::-webkit-scrollbar-thumb {
          background: #E4E4E7;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FF5A36;
        }

        .nav-link-item {
          color: ${isHeaderSticky ? "#0C0C0F" : "#FFFFFF"};
          transition: color 0.3s ease;
        }
        .nav-link-item:hover {
          color: #FF5A36 !important;
        }
        .brand-logo {
          color: ${isHeaderSticky ? "#0C0C0F" : "#FFFFFF"};
          transition: color 0.3s ease;
        }
        .brand-logo:hover {
          opacity: 0.8;
        }
      `}</style>

      {/* 🧭 Transparent-to-Solid Sticky Navigation */}
      <header style={styles.header}>
        <div
          onClick={() => navigate("/")}
          className="brand-logo"
          style={{ fontSize: "24px", fontWeight: "800", fontFamily: "'Syne', sans-serif", letterSpacing: "-1px", cursor: "pointer" }}
        >
          THEMEDOX<span style={{ color: "#FF5A36" }}>.</span>
        </div>

        <nav style={styles.navLinks}>
          <a href="#hero" className="nav-link-item" style={styles.navLink}>Home</a>
          <a href="#about" className="nav-link-item" style={styles.navLink}>About Us</a>
          <a href="#portfolio" className="nav-link-item" style={styles.navLink}>Portfolio</a>
          <a href="#team" className="nav-link-item" style={styles.navLink}>Team</a>
          <a href="#process" className="nav-link-item" style={styles.navLink}>Process</a>
          <a href="#contact" className="nav-link-item" style={styles.navLink}>Contact Us</a>
        </nav>

        <button
          style={styles.ctaButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#E04F2E";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#FF5A36";
            e.currentTarget.style.transform = "translateY(0)";
          }}
          onClick={() => navigate("/connect")}
        >
          Start a Project <span>↗</span>
        </button>
      </header>

      {/* ⚡ SECTION 1: HERO */}
      <Hero navigate={navigate} />

      {/* 🎪 SECTION 2: SCROLLING MARQUEE */}
      <ScrollingMarquee />

      {/* 🧑‍💼 SECTION 3: ABOUT STATS */}
      <About />

      {/* 📊 SECTION 5: FUN FACTS */}
      <Facts />

      {/* 🖼️ SECTION 7: FEATURED PROJECTS */}
      <Projects
        navigate={navigate}
        hoveredProject={hoveredProject}
        setHoveredProject={setHoveredProject}
      />

      <Brands />

      {/* 👥 SECTION 8: TEAM GRID */}
      <Team
        hoveredTeam={hoveredTeam}
        setHoveredTeam={setHoveredTeam}
      />

      {/* 🧠 SECTION 9: DESIGN THINKING PROCESS */}
      <Process />

      {/* 💬 SECTION 10: TESTIMONIALS */}
      <Testimonials />

      {/* 📞 SECTION 11: CONTACT */}
      <Contact />

      {/* 🦶 SECTION 12: FOOTER */}
      <footer style={styles.footerSection}>
        <div style={styles.footerGrid}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <h3 style={styles.footerHeading}>
              Helping start-ups scale & grow.
            </h3>
            <div style={styles.footerSocialGroup}>
              <a href="#" style={styles.footerSocialCircle} onMouseEnter={(e) => e.currentTarget.style.borderColor = "#FF5A36"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(12, 12, 15, 0.1)"}>In</a>
              <a href="#" style={styles.footerSocialCircle} onMouseEnter={(e) => e.currentTarget.style.borderColor = "#FF5A36"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(12, 12, 15, 0.1)"}>Tw</a>
              <a href="#" style={styles.footerSocialCircle} onMouseEnter={(e) => e.currentTarget.style.borderColor = "#FF5A36"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(12, 12, 15, 0.1)"}>Fb</a>
            </div>
          </div>

          <div>
            <h5 style={styles.footerLinksTitle}>Quick Navigation</h5>
            <div style={styles.footerLinksGrid}>
              {quickLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={`#${link.toLowerCase().replace(" ", "")}`}
                  style={styles.footerPillLink}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#FF5A36";
                    e.currentTarget.style.color = "#FF5A36";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(12, 12, 15, 0.1)";
                    e.currentTarget.style.color = "#0C0C0F";
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h5 style={styles.footerLinksTitle}>Connect Details</h5>
            <p style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>
              support@themedox.com
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "rgba(12, 12, 15, 0.6)" }}>
              Telegram: @themedox_support
            </p>
            <p style={{ margin: 0, fontSize: "14px", color: "rgba(12, 12, 15, 0.6)" }}>
              128 Design District, Suite 400<br />
              San Francisco, CA 94103
            </p>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={{ margin: 0 }}>© {new Date().getFullYear()} ThemeDox. All rights reserved.</p>
          <p style={{ margin: 0, cursor: "pointer", textDecoration: "underline" }} onClick={() => navigate("/connect")}>Privacy Policy & Terms</p>
        </div>

        {/* 🔝 Back to Top Float Action */}
        {isHeaderSticky && (
          <button
            onClick={scrollToTop}
            style={styles.backToTopBtn}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#E04F2E";
              e.currentTarget.style.transform = "translateY(-4px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#FF5A36";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            title="Back to top"
          >
            ▲
          </button>
        )}
      </footer>
    </div>
  );
};

export default Home2;
