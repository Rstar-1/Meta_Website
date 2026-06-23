import React from "react";
import Fade from "../../../components/common/Fade";
import Container from "../../../components/common/Container";
import { products } from "../data/products";

const RecentlyViewed = ({ recentlyViewedIds, onQuickView, onAddToCart }) => {
  // Find products matching the recently viewed IDs
  const viewedProducts = products.filter(p => recentlyViewedIds.includes(p.id));

  // If empty, show Staff Picks as recommendations
  const fallbackProducts = products.filter(p => p.badge === "Staff Pick" || p.badge === "Premium");

  const displayProducts = viewedProducts.length > 0 ? viewedProducts : fallbackProducts;
  const isFallback = viewedProducts.length === 0;

  const styles = {
    section: {
      padding: "100px 0",
      backgroundColor: "#111116",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "50px",
      flexWrap: "wrap",
      gap: "20px",
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
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gap: "30px",
    },
    card: {
      backgroundColor: "#0C0C0F",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      overflow: "hidden",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      transition: "all 0.3s ease",
    },
    imageArea: {
      position: "relative",
      height: "240px",
      overflow: "hidden",
      backgroundColor: "#16161D",
    },
    productImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    badge: {
      position: "absolute",
      top: "15px",
      left: "15px",
      padding: "4px 8px",
      borderRadius: "10px",
      backgroundColor: "#FBBF24",
      color: "#0C0C0F",
      fontSize: "9px",
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      zIndex: 2,
    },
    infoArea: {
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    prodName: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#FFFFFF",
      margin: "0 0 6px 0",
      lineHeight: "1.3",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    price: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#FFFFFF",
      fontFamily: "'Syne', sans-serif",
      marginBottom: "16px",
    },
    btnGroup: {
      display: "flex",
      gap: "10px",
      marginTop: "auto",
    },
    btnAction: {
      flex: 1,
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 0.7)",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      borderRadius: "20px",
      padding: "6px 12px",
      fontSize: "11px",
      fontWeight: "600",
      cursor: "pointer",
      textAlign: "center",
      transition: "all 0.2s",
    },
  };

  return (
    <section id="history" style={styles.section}>
      <Container version="v1">
        <div style={{ width: "100%" }}>
          <style>{`
            @media (max-width: 992px) {
              .recently-viewed-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
            }
            @media (max-width: 600px) {
              .recently-viewed-grid {
                grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
              }
            }
          `}</style>
          <div style={styles.headerRow}>
            <Fade version="v2" direction="up" delay={50}>
              <div>
                <span style={styles.subTitle}>
                  {isFallback ? "Curated Picks" : "Your Browsing History"}
                </span>
                <h2 style={styles.title}>
                  {isFallback ? "Staff Recommendations" : "Recently Viewed Items"}
                </h2>
              </div>
            </Fade>
            <Fade version="v2" direction="up" delay={150}>
              <p style={styles.desc}>
                {isFallback 
                  ? "Check out these top-rated picks curated by our hardware experts." 
                  : "Review the high-performance products you recently explored."}
              </p>
            </Fade>
          </div>

          <div style={styles.grid} className="recently-viewed-grid">
            {displayProducts.map((prod, idx) => (
              <Fade key={prod.id} version="v2" direction="up" delay={idx * 80} duration={700}>
                <div 
                  style={styles.card}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.borderColor = "#10B981";
                    const img = e.currentTarget.querySelector(".history-img");
                    if (img) img.style.transform = "scale(1.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                    const img = e.currentTarget.querySelector(".history-img");
                    if (img) img.style.transform = "scale(1)";
                  }}
                >
                  <div style={styles.imageArea}>
                    {prod.badge && <span style={styles.badge}>{prod.badge}</span>}
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="history-img"
                      style={styles.productImg} 
                    />
                  </div>

                  <div style={styles.infoArea}>
                    <h3 
                      style={styles.prodName}
                      onClick={() => onQuickView(prod)}
                      onMouseEnter={(e) => e.currentTarget.style.color = "#10B981"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "#FFFFFF"}
                    >
                      {prod.name}
                    </h3>
                    <div style={styles.price}>${prod.price.toFixed(2)}</div>
                    
                    <div style={styles.btnGroup}>
                      <button 
                        style={styles.btnAction}
                        onClick={() => onQuickView(prod)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        Quick View
                      </button>
                      <button 
                        style={{
                          ...styles.btnAction,
                          backgroundColor: "#10B981",
                          borderColor: "#10B981",
                          color: "#FFFFFF"
                        }}
                        onClick={() => onAddToCart(prod, prod.colors?.[0] || "Default", prod.sizes?.[0] || "Standard", 1)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#0F9F70";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#10B981";
                        }}
                      >
                        Add
                      </button>
                    </div>
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

export default RecentlyViewed;
