import Fade from "../../../components/common/Fade";

const Projects = ({ navigate, hoveredProject, setHoveredProject }) => {
  const projectList = [
    {
      title: "Tourex - Tour & Travel Agency Portal",
      tag: "Travel & Leisure",
      img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Gerow Business Consulting",
      tag: "Fintech & Audit",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Optech IT Solutions Platform",
      tag: "SaaS Systems",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Educve LMS - Education Management",
      tag: "EdTech Interface",
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const styles = {
    projectsSection: {
      padding: "140px 5%",
      backgroundColor: "#FFFFFF",
      gap: "60px",
    },
    projectsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px",
    },
    projectCard: {
      borderRadius: "28px",
      border: "1px solid rgba(0,0,0,0.06)",
    },
    projectImg: {
      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    },
    projectOverlay: {
      padding: "30px",
      gap: "10px",
      transition: "background 0.5s ease",
    },
    projectTag: {
      alignSelf: "flex-start",
      padding: "5px 12px",
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      color: "#FFFFFF",
      fontSize: "11px",
      letterSpacing: "1px",
      backdropFilter: "blur(5px)",
    },
    projectTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "20px",
      color: "#FFFFFF",
      lineHeight: "1.2",
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
    <section id="portfolio" style={styles.projectsSection} className="flex flex-column">
      <div className="flex justify-between items-end flex-wrap" style={{ gap: "20px" }}>
        <Fade version="v2" direction="up" duration={900}>
          <div>
            <div style={styles.sectionSubtitle} className="font-700 uppercase">
              <span className="rounded-full" style={{ width: "8px", height: "8px", backgroundColor: "#FF5A36" }}></span>
              OUR PORTFOLIO
            </div>
            <h2 style={styles.sectionTitle} className="font-800">
              Featured Projects
            </h2>
          </div>
        </Fade>
        <button
          className="cursor-pointer font-600"
          style={{
            backgroundColor: "transparent",
            color: "#0C0C0F",
            border: "1px solid rgba(12,12,15,0.15)",
            borderRadius: "30px",
            padding: "12px 28px",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#FF5A36";
            e.currentTarget.style.color = "#FF5A36";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(12,12,15,0.15)";
            e.currentTarget.style.color = "#0C0C0F";
          }}
          onClick={() => navigate("/products")}
        >
          All Portfolios ↗
        </button>
      </div>

      <div style={styles.projectsGrid} className="w-full">
        {projectList.map((project, idx) => {
          const isHovered = hoveredProject === idx;
          const cardHeight = "480px";
          return (
            <div
              key={idx}
              className="relative overflow-hidden cursor-pointer"
              style={{ ...styles.projectCard, height: cardHeight }}
              onMouseEnter={() => setHoveredProject(idx)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => navigate("/product-detail")}
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{
                  ...styles.projectImg,
                  transform: isHovered ? "scale(1.06)" : "scale(1.0)",
                }}
              />
              <div
                className="absolute left-0 right-0 bottom-0 flex flex-column"
                style={{
                  ...styles.projectOverlay,
                  background: isHovered
                    ? "linear-gradient(to top, rgba(255, 90, 54, 0.95) 0%, rgba(255, 90, 54, 0.6) 60%, rgba(255, 90, 54, 0) 100%)"
                    : "linear-gradient(to top, rgba(12,12,15,0.95) 0%, rgba(12,12,15,0.4) 60%, rgba(12,12,15,0) 100%)",
                }}
              >
                <span style={styles.projectTag} className="rounded-20 font-700 uppercase">{project.tag}</span>
                <h3 style={styles.projectTitle} className="m-0 font-800">{project.title}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
