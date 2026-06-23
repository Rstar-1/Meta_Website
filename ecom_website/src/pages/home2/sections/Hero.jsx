import Fade from "../../../components/common/Fade";
import leviMockup from "../../../assets/levi_colwill_mockup.png";
import bgWrap from "../../../assets/bg-wrap-2.jpg";

const Hero = ({ navigate }) => {
  const styles = {
    heroSection: {
      minHeight: "70vh",
      padding: "160px 5% 100px",
      backgroundImage: `url(${bgWrap})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      gap: "40px",
    },
    heroLeft: {
      flex: "1 1 950px",
    },
    heroRight: {
      flex: "1 1 250px",
      maxWidth: "250px",
      gap: "25px",
    },
    heroHeading: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "calc(3rem + 7vw)",
      lineHeight: "0.85",
      letterSpacing: "-4px",
      color: "#FFFFFF",
    },
    heroTextPill: {
      display: "inline-block",
      width: "180px",
      height: "90px",
      borderRadius: "100px",
      backgroundImage: `url(${leviMockup})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      transform: "translateY(-4px)",
      verticalAlign: "middle",
      marginRight: "20px",
    },
    heroDesc: {
      fontSize: "13px",
      color: "#D1D5DB",
      lineHeight: "1.4",
      maxWidth: "240px",
    },
    quoteCardWrapper: {
      width: "100%",
      maxWidth: "320px",
      position: "relative",
    },
    quoteCardMain: {
      backgroundColor: "#F5F5F7",
      color: "#0C0C0F",
      borderRadius: "36px 36px 0 36px",
      padding: "30px 30px 24px 30px",
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      marginBottom: "64px",
    },
    quoteCardTab: {
      position: "absolute",
      right: 0,
      bottom: 0,
      width: "155px",
      height: "64px",
      backgroundColor: "#F5F5F7",
      borderRadius: "0 0 36px 36px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    quoteCardArrowContainer: {
      position: "absolute",
      left: "22px",
      bottom: "10px",
      width: "48px",
      height: "48px",
    },
    quoteLine: {
      left: "-40px",
      top: "50%",
      width: "40px",
      height: "1px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    quoteDot: {
      left: "-44px",
      top: "calc(50% - 4px)",
      width: "8px",
      height: "8px",
      backgroundColor: "#FFFFFF",
    },
    avatar: {
      width: "36px",
      height: "36px",
      border: "2px solid #F5F5F7",
      marginLeft: "-12px",
    },
    quoteText: {
      fontSize: "17px",
      lineHeight: "1.45",
      fontWeight: "500",
      fontStyle: "italic",
      color: "#0C0C0F",
    }
  };

  return (
    <section id="hero" style={styles.heroSection} className="flex flex-row flex-wrap items-center justify-between relative">
      <div style={styles.heroLeft}>
        <Fade version="v1" direction="up" delay={100} duration={900}>
          <h1 style={styles.heroHeading} className="m-0 relative font-800 uppercase">
            DIGITAL<br />
            <span style={styles.heroTextPill} className="inline-block mr-20 vertical-align-middle"></span>SERVICE<br />
            EXPERIENCE
          </h1>
        </Fade>
      </div>

      <div style={styles.heroRight} className="flex flex-column items-start">
        {/* Top text + Arrow */}
        <Fade version="v1" direction="up" delay={300} duration={900}>
          <div className="flex justify-between items-start w-full pb-25 mb-5" style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.15)" }}>
            <p style={styles.heroDesc} className="m-0">
              Hey! is the ultimate Digital Agency for professionals service in the design industry.
            </p>
            <span className="font-300 cursor-pointer" style={{ fontSize: "28px", marginTop: "-5px", color: "#FFFFFF" }} onClick={() => navigate("/products")}>↗</span>
          </div>
        </Fade>

        {/* Card with connecting line */}
        <Fade version="v1" direction="up" delay={500} duration={900} className="w-full">
          <div className="flex items-center w-full relative">
            <div style={styles.quoteLine} className="absolute"></div>
            <div style={styles.quoteDot} className="absolute rounded-full"></div>

            <div style={styles.quoteCardWrapper}>
              <div style={styles.quoteCardMain}>
                <div className="flex items-center gap-12">
                  <div className="flex items-center">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&auto=format&fit=crop" alt="avatar" className="rounded-full object-cover" style={{ ...styles.avatar, marginLeft: 0 }} />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop" alt="avatar" className="rounded-full object-cover" style={styles.avatar} />
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop" alt="avatar" className="rounded-full object-cover" style={styles.avatar} />
                  </div>
                  <div className="ml-12">
                    <h5 className="m-0 font-700" style={{ fontSize: "15px", color: "#0C0C0F", fontFamily: "'Syne', sans-serif" }}>Juan Mauel</h5>
                  </div>
                </div>
                <p style={styles.quoteText} className="m-0">
                  “The depth of exploration and quality of the work was great”
                </p>
              </div>

              {/* Tab containing the "More" button and the concave curve SVG */}
              <div style={styles.quoteCardTab}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", left: "-36px", top: "-36px" }}>
                  <path d="M 36 36 L 36 0 A 36 36 0 0 0 0 36 Z" fill="#F5F5F7" />
                </svg>
                <button
                  className="cursor-pointer"
                  style={{
                    backgroundColor: "#0C0C0F",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "24px",
                    padding: "10px 24px",
                    fontSize: "13px",
                    transition: "all 0.2s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF5A36";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#0C0C0F";
                  }}
                  onClick={() => navigate("/about")}
                >
                  <span className="font-700">More</span>
                </button>
              </div>

              {/* Arrow button inside the cut-out */}
              <div style={styles.quoteCardArrowContainer}>
                <button
                  className="cursor-pointer flex items-center justify-center"
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    border: "none",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#FF5A36";
                    const path = e.currentTarget.querySelector("path");
                    if (path) path.setAttribute("stroke", "#FFFFFF");
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#FFFFFF";
                    const path = e.currentTarget.querySelector("path");
                    if (path) path.setAttribute("stroke", "#0C0C0F");
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transition: "transform 0.2s ease" }}>
                    <path d="M13 1L1 13M1 13H11M1 13V3" stroke="#0C0C0F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default Hero;
