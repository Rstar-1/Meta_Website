import Fade from "../../../components/common/Fade";

const About = () => {
  const styles = {
    aboutSection: {
      padding: "140px 5%",
      backgroundColor: "#FFFFFF",
      gap: "80px",
    },
    aboutLeft: {
      flex: "1 1 500px",
    },
    aboutImgContainer: {
      height: "500px",
      borderRadius: "32px",
      border: "1px solid rgba(0,0,0,0.08)",
    },
    aboutStatsCard: {
      bottom: "-30px",
      right: "30px",
      backgroundColor: "#F4F4F5",
      borderRadius: "24px",
      maxWidth: "200px",
      border: "1px solid rgba(0,0,0,0.05)",
    },
    aboutRight: {
      flex: "1 1 450px",
      gap: "25px",
    },
    sectionSubtitle: {
      gap: "10px",
      fontSize: "12px",
      color: "#FF5A36",
      letterSpacing: "2px",
      marginBottom: "5px",
    },
    sectionTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "calc(1.8rem + 1.5vw)",
      lineHeight: "1.1",
      color: "#0C0C0F",
      letterSpacing: "-1px",
    },
  };

  return (
    <section id="about" style={styles.aboutSection} className="flex flex-row flex-wrap items-center justify-between">
      <div style={styles.aboutLeft} className="relative">
        <Fade version="v2" direction="left" duration={900}>
          <div style={styles.aboutImgContainer} className="w-full overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
              alt="About us team"
              className="w-full h-full object-cover"
            />
          </div>
          <div style={styles.aboutStatsCard} className="absolute py-24 px-30">
            <h3 className="m-0 font-800" style={{ fontFamily: "'Syne', sans-serif", fontSize: "38px", color: "#FF5A36" }}>99%</h3>
            <p className="m-0 uppercase font-600" style={{ marginTop: "5px", fontSize: "12px", color: "#71717A", letterSpacing: "1px" }}>
              Clients Satisfied & Repeating
            </p>
          </div>
        </Fade>
      </div>

      <div style={styles.aboutRight} className="flex flex-column">
        <Fade version="v2" direction="right" duration={900}>
          <div style={styles.sectionSubtitle} className="flex items-center font-700 uppercase">
            <span className="rounded-full" style={{ width: "8px", height: "8px", backgroundColor: "#FF5A36" }}></span>
            ABOUT THEMEDOX
          </div>
          <h2 style={styles.sectionTitle} className="m-0 font-800">
            We craft memorable digital interfaces.
          </h2>
          <p className="m-0" style={{ fontSize: "16px", color: "#4B5563", lineHeight: "1.6" }}>
            Our strategy-first team uses modern design principles and technical craftsmanship to help startups, scaling agencies, and enterprises create highly engaging products.
          </p>
          <div className="flex gap-10 mt-10" style={{ gap: "40px" }}>
            <div>
              <h4 className="m-0 font-700" style={{ fontSize: "24px", color: "#0C0C0F" }}>120+</h4>
              <p className="m-0" style={{ marginTop: "5px", fontSize: "13px", color: "#71717A" }}>Successful Projects</p>
            </div>
            <div>
              <h4 className="m-0 font-700" style={{ fontSize: "24px", color: "#0C0C0F" }}>25+</h4>
              <p className="m-0" style={{ marginTop: "5px", fontSize: "13px", color: "#71717A" }}>Agency Awards</p>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default About;
