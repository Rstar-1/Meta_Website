import React from "react";
import Fade from "../../../components/common/Fade";
import Container from "../../../components/common/Container";
import { categories } from "../data/products";

const Categories = ({ onSelectCategory }) => {
  // Exclude the 'All Products' category from visual showcase grid
  const showcaseCats = categories.filter(cat => cat.slug !== "all");

  const styles = {
    section: {
      padding: "100px 0",
      backgroundColor: "#0C0C0F",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "50px",
      flexWrap: "wrap",
      gap: "20px",
      width: "100%",
    },
    subTitle: {
      fontSize: "12px",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "#10B981",
      letterSpacing: "3px",
      marginBottom: "12px",
      display: "block",
    },
    title: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "36px",
      fontWeight: "800",
      color: "#FFFFFF",
      margin: 0,
      textTransform: "uppercase",
      letterSpacing: "-1px",
    },
    desc: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.5)",
      maxWidth: "380px",
      margin: 0,
      lineHeight: "1.5",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "30px",
      width: "100%",
    },
    card: {
      height: "380px",
      borderRadius: "20px",
      overflow: "hidden",
      position: "relative",
      cursor: "pointer",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      display: "flex",
      alignItems: "flex-end",
      padding: "30px",
      transition: "border-color 0.3s ease",
    },
    cardImage: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 1,
      transition: "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
    },
    cardOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: "linear-gradient(to top, rgba(12, 12, 15, 0.9) 10%, rgba(12, 12, 15, 0.2) 80%)",
      zIndex: 2,
    },
    cardContent: {
      position: "relative",
      zIndex: 3,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    countBadge: {
      display: "inline-block",
      width: "fit-content",
      padding: "4px 10px",
      borderRadius: "20px",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(6px)",
      fontSize: "11px",
      fontWeight: "600",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    cardName: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "22px",
      fontWeight: "800",
      color: "#FFFFFF",
      margin: 0,
      textTransform: "uppercase",
    },
    exploreLink: {
      fontSize: "12px",
      color: "#10B981",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      opacity: 0,
      transform: "translateY(10px)",
      transition: "all 0.3s ease",
    },
  };

  return (
    <section id="categories" style={styles.section}>
      <Container version="v1">
        <div style={{ width: "100%" }}>
          {/* Header Row */}
          <div style={styles.headerRow}>
            <Fade version="v2" direction="up" delay={50}>
              <div>
                <span style={styles.subTitle}>Curated Collections</span>
                <h2 style={styles.title}>Browse By Category</h2>
              </div>
            </Fade>
            <Fade version="v2" direction="up" delay={150}>
              <p style={styles.desc}>
                Explore our thoughtfully organized categories, specifically optimized for smart setups and sleek modern aesthetics.
              </p>
            </Fade>
          </div>

          {/* Grid Showcase */}
          <div style={styles.grid}>
            {showcaseCats.map((cat, idx) => (
              <Fade key={cat.id} version="v2" direction="up" delay={100 + idx * 100} duration={800}>
                <div 
                  style={styles.card}
                  onClick={() => onSelectCategory(cat.slug)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#10B981";
                    const img = e.currentTarget.querySelector(".cat-bg-img");
                    if (img) img.style.transform = "scale(1.1)";
                    const link = e.currentTarget.querySelector(".explore-link");
                    if (link) {
                      link.style.opacity = "1";
                      link.style.transform = "translateY(0)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                    const img = e.currentTarget.querySelector(".cat-bg-img");
                    if (img) img.style.transform = "scale(1)";
                    const link = e.currentTarget.querySelector(".explore-link");
                    if (link) {
                      link.style.opacity = "0";
                      link.style.transform = "translateY(10px)";
                    }
                  }}
                >
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="cat-bg-img" 
                    style={styles.cardImage} 
                  />
                  <div style={styles.cardOverlay} />
                  
                  <div style={styles.cardContent}>
                    <span style={styles.countBadge}>{cat.count} Products</span>
                    <h3 style={styles.cardName}>{cat.name}</h3>
                    <span className="explore-link" style={styles.exploreLink}>
                      Explore Room ↗
                    </span>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Categories;
