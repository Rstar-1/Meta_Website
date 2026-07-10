import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";

const Projects = ({ navigate, hoveredProject, setHoveredProject }) => {
  const projectList = [
    {
      title: "Tourex Portal",
      tag: "Travel & Leisure",
      img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Gerow Consulting",
      tag: "Fintech & Audit",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Optech Platform",
      tag: "SaaS Systems",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: "Educve LMS",
      tag: "EdTech Interface",
      img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop"
    }
  ];

  const styles = {
    projectImg: {
      transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    },
    projectOverlay: {
      padding: "30px",
      gap: "10px",
      transition: "background 0.5s ease",
    }
  };

  return (
    <Container id="portfolio">
      <div className="py-40">
        <div className="flex justify-between items-center">
          <Fade version="v2" direction="up" duration={900}>
            <p className="font-500 text-gray mini-text flex items-center gap-5"><span className="dot flex bg-warning rounded-full"></span> OUR PORTFOLIO</p>
            <h2 className="font-600 head-text text-dark pt-4 uppercase">
              Featured Projects
            </h2>
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

        <div className="w-full grid-cols-4 gap-12 mt-40">
          {projectList.map((project, idx) => {
            const isHovered = hoveredProject === idx;
            return (
              <div
                key={idx}
                className="relative overflow-hidden cursor-pointer rounded-20 h-350"
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
                  className="absolute left-0 right-0 bottom-0 p-16"
                  style={{
                    ...styles.projectOverlay,
                    background: isHovered
                      ? "linear-gradient(to top, rgba(255, 90, 54, 0.95) 0%, rgba(255, 90, 54, 0.6) 60%, rgba(255, 90, 54, 0) 100%)"
                      : "linear-gradient(to top, rgba(12,12,15,0.95) 0%, rgba(12,12,15,0.4) 60%, rgba(12,12,15,0) 100%)",
                  }}
                >
                  <p className="font-500 mini-text uppercase text-white">{project.tag}</p>
                  <h3 className="font-600 title-text text-white pt-2">{project.title}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Projects;
