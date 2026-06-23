import Fade from "../../../components/common/Fade";

const Team = ({ hoveredTeam, setHoveredTeam }) => {
  const teamList = [
    {
      name: "Sophia Carter",
      role: "Lead UI Designer",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Marcus Aurelius",
      role: "Solutions Architect",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Leona Vance",
      role: "Branding Specialist",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
    },
    {
      name: "Dimitri Volk",
      role: "Senior Developer",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const styles = {
    teamSection: {
      padding: "140px 5%",
      backgroundColor: "#F4F4F5",
    },
    teamSubtitleScribble: {
      color: "#FF5A36",
    },
    teamScribbleSVG: {
      bottom: "-8px",
      height: "8px",
    },
    teamGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "40px",
    },
    teamCard: {
      backgroundColor: "#FFFFFF",
      borderRadius: "24px",
      transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },
    teamImgBox: {
      height: "300px",
    },
    teamImg: {
      transition: "transform 0.5s ease",
    },
    teamSocialOverlay: {
      backgroundColor: "rgba(255, 90, 54, 0.85)",
      gap: "15px",
      transition: "opacity 0.4s ease",
    },
    teamSocialIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#FFFFFF",
      color: "#FF5A36",
      transition: "transform 0.3s ease, background-color 0.3s ease, color 0.3s ease",
    },
    teamName: {
      fontSize: "18px",
      color: "#0C0C0F",
      margin: "0 0 5px 0",
      fontFamily: "'Syne', sans-serif",
    },
    teamRole: {
      fontSize: "12px",
      color: "#4B5563",
      letterSpacing: "1px",
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
    <section id="team" style={styles.teamSection} className="flex flex-column">
      <Fade version="v2" direction="up" duration={900}>
        <div className="text-center mb-50">
          <div style={styles.sectionSubtitle} className="flex items-center font-700 uppercase justify-center">
            <span className="rounded-full" style={{ width: "8px", height: "8px", backgroundColor: "#FF5A36" }}></span>
            OUR BRAIN TRUST
          </div>
          <h2 style={styles.sectionTitle} className="font-800 text-center">
            Meet our talented{" "}
            <span style={styles.teamSubtitleScribble} className="relative inline-block">
              team
              <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={styles.teamScribbleSVG} className="absolute left-0 w-full">
                <path d="M0,7 C30,2 70,2 100,7" stroke="#00D084" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h2>
        </div>
      </Fade>

      <div style={styles.teamGrid} className="w-full mt-20">
        {teamList.map((member, idx) => {
          const isHovered = hoveredTeam === idx;
          return (
            <div
              key={idx}
              className="overflow-hidden"
              style={{
                ...styles.teamCard,
                transform: isHovered ? "translateY(-6px)" : "translateY(0)",
              }}
              onMouseEnter={() => setHoveredTeam(idx)}
              onMouseLeave={() => setHoveredTeam(null)}
            >
              <div style={styles.teamImgBox} className="w-full overflow-hidden relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  style={{
                    ...styles.teamImg,
                    transform: isHovered ? "scale(1.08)" : "scale(1.0)",
                  }}
                />
                {/* Social share overlap on hover */}
                <div
                  className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center"
                  style={{
                    ...styles.teamSocialOverlay,
                    opacity: isHovered ? 1 : 0,
                  }}
                >
                  <a href="#" style={styles.teamSocialIcon} className="rounded-full flex items-center justify-center font-700 decoration-none">In</a>
                  <a href="#" style={styles.teamSocialIcon} className="rounded-full flex items-center justify-center font-700 decoration-none">Tw</a>
                  <a href="#" style={styles.teamSocialIcon} className="rounded-full flex items-center justify-center font-700 decoration-none">Fb</a>
                </div>
              </div>
              <div style={styles.teamInfo} className="p-24 text-center">
                <h4 style={styles.teamName} className="font-800">{member.name}</h4>
                <p style={styles.teamRole} className="m-0 font-600 uppercase">{member.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Team;
