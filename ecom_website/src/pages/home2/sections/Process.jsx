import { useState, useEffect } from "react";
import Fade from "../../../components/common/Fade";

const Process = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const processList = [
    {
      num: "01",
      title: "User Research & Analysis",
      desc: "We dive deep into target user psychology, hold interviews, gather feedback patterns, and outline core buyer personas for design direction."
    },
    {
      num: "02",
      title: "Define Problems & Scope",
      desc: "Listen to product stakeholders to outline friction points, establish exact project parameters, and establish visual milestones."
    },
    {
      num: "03",
      title: "Design & High-Fi Prototyping",
      desc: "Produce design libraries, style tokens, user flow guides, high-fidelity responsive layouts, and interactive motion prototypes."
    },
    {
      num: "04",
      title: "Evaluation & User Testing",
      desc: "Conduct detailed A/B tests, review accessibility standards, test responsiveness thresholds, and iterate designs for final dev transfer."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const cardElements = document.querySelectorAll(".process-scroll-card");
      let currentActive = 0;
      let minDistance = Infinity;
      const viewportCenter = window.innerHeight / 2;

      cardElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        // Calculate the distance of the card's vertical center from the viewport center
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (distance < minDistance) {
          minDistance = distance;
          currentActive = idx;
        }
      });

      setActiveIndex(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Call once initially to set active state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const styles = {
    processSection: {
      padding: "140px 5%",
      backgroundColor: "#FFFFFF",
      gap: "80px",
    },
    processStickyLeft: {
      flex: "1 1 450px",
      position: "sticky",
      top: "120px",
      gap: "20px",
    },
    processRightScroll: {
      flex: "1 1 500px",
      gap: "30px",
    },
    processCard: {
      backgroundColor: "#F4F4F5",
      borderRadius: "28px",
      border: "1px solid rgba(0, 0, 0, 0.05)",
      transition: "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      cursor: "pointer",
    },
    processCardTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "24px",
      color: "#0C0C0F",
      margin: 0,
      transition: "color 0.3s ease",
    },
    processCardDesc: {
      fontSize: "15px",
      color: "#4B5563",
      lineHeight: "1.6",
      margin: 0,
    },
    sectionSubtitle: {
      display: "flex",
      alignItems: "center",
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
      margin: 0,
      letterSpacing: "-1px",
    },
  };

  return (
    <section id="process" style={styles.processSection} className="flex flex-row items-start justify-between flex-wrap relative">
      {/* Left Column: Sticky Title */}
      <div style={styles.processStickyLeft} className="flex flex-column">
        <Fade version="v2" direction="up" duration={900}>
          <div style={styles.sectionSubtitle} className="font-700 uppercase">
            <span className="rounded-full" style={{ width: "8px", height: "8px", backgroundColor: "#FF5A36" }}></span>
            HOW WE WORK
          </div>
          <h2 style={{ ...styles.sectionTitle, fontSize: "56px", lineHeight: "1.0" }} className="font-800">
            OUR DESIGN THINKING PROCESS
          </h2>
          <p style={{ color: "#4B5563", fontSize: "16px", lineHeight: "1.6", marginTop: "30px" }} className="m-0">
            We work transparently to discover key bottlenecks, structure solution modules, build responsive high-fidelity blueprints, and launch successfully.
          </p>
        </Fade>
      </div>

      {/* Right Column: Process Cards List */}
      <div style={styles.processRightScroll} className="flex flex-column">
        {processList.map((step, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={idx}
              style={{
                ...styles.processCard,
                borderColor: isActive ? "#FF5A36" : "rgba(0, 0, 0, 0.05)",
                transform: isActive ? "translateX(10px)" : "translateX(0)",
                padding: isActive ? "45px 40px" : "30px 40px",
              }}
              className="process-scroll-card flex flex-row items-start relative"
              onClick={() => setActiveIndex(idx)}
            >
              {/* Left design number inside card */}
              <div className="flex flex-column items-center mr-25">
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: "48px",
                    fontWeight: "800",
                    lineHeight: "1",
                    color: isActive ? "#FF5A36" : "rgba(12, 12, 15, 0.15)",
                    transition: "color 0.4s ease",
                  }}
                >
                  {step.num}
                </span>
              </div>

              {/* Right text layout */}
              <div className="flex flex-column flex-1">
                <h3
                  style={{
                    ...styles.processCardTitle,
                    color: isActive ? "#FF5A36" : "#0C0C0F",
                  }}
                  className="font-800"
                >
                  {step.title}
                </h3>
                <div
                  style={{
                    maxHeight: isActive ? "200px" : "0px",
                    opacity: isActive ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease",
                  }}
                >
                  <p style={{ ...styles.processCardDesc, marginTop: "12px" }}>{step.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Process;
