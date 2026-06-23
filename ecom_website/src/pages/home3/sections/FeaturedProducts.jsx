import React from "react";
import Fade from "../../../components/common/Fade";
import Container from "../../../components/common/Container";
import { products, categories } from "../data/products";

const FeaturedProducts = ({ 
  selectedCategory, 
  onSelectCategory, 
  wishlist, 
  onToggleWishlist, 
  onQuickView, 
  onAddToCart 
}) => {

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category.toLowerCase().replace(" ", "-") === selectedCategory);

  const styles = {
    section: {
      padding: "100px 0",
      backgroundColor: "#0C0C0F",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      marginBottom: "50px",
    },
    subTitle: {
      fontSize: "12px",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "#10B981",
      letterSpacing: "3px",
      marginBottom: "12px",
    },
    title: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "38px",
      fontWeight: "800",
      color: "#FFFFFF",
      margin: "0 0 20px 0",
      textTransform: "uppercase",
      letterSpacing: "-1px",
    },
    tabContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
      flexWrap: "wrap",
      marginBottom: "40px",
    },
    tabBtn: {
      backgroundColor: "transparent",
      color: "rgba(255, 255, 255, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "8px 20px",
      borderRadius: "30px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      gap: "40px",
    },
    card: {
      backgroundColor: "#111116",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      overflow: "hidden",
      position: "relative",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
    },
    imageArea: {
      position: "relative",
      height: "320px",
      overflow: "hidden",
      backgroundColor: "#16161D",
    },
    productImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s",
    },
    badge: {
      position: "absolute",
      top: "20px",
      left: "20px",
      padding: "6px 12px",
      borderRadius: "20px",
      backgroundColor: "#10B981",
      color: "#FFFFFF",
      fontSize: "10px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      zIndex: 5,
      boxShadow: "0 4px 10px rgba(16, 185, 129, 0.3)",
    },
    wishlistBtn: {
      position: "absolute",
      top: "20px",
      right: "20px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "rgba(12, 12, 15, 0.6)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(8px)",
      color: "#FFFFFF",
      fontSize: "16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 5,
      transition: "all 0.2s ease",
    },
    actionsOverlay: {
      position: "absolute",
      bottom: "20px",
      left: "20px",
      right: "20px",
      display: "flex",
      gap: "10px",
      zIndex: 5,
      transform: "translateY(80px)",
      opacity: 0,
      transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    },
    actionBtn: {
      flex: 1,
      backgroundColor: "#FFFFFF",
      color: "#0C0C0F",
      border: "none",
      borderRadius: "30px",
      padding: "12px 16px",
      fontSize: "12px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      cursor: "pointer",
      textAlign: "center",
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
      transition: "all 0.2s ease",
    },
    quickBtn: {
      width: "42px",
      height: "42px",
      borderRadius: "50%",
      backgroundColor: "#16161D",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "#FFFFFF",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "14px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
      transition: "all 0.2s ease",
    },
    infoArea: {
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    catName: {
      fontSize: "11px",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "rgba(255, 255, 255, 0.4)",
      letterSpacing: "1px",
      marginBottom: "8px",
    },
    prodName: {
      fontSize: "17px",
      fontWeight: "600",
      color: "#FFFFFF",
      margin: "0 0 12px 0",
      lineHeight: "1.3",
      cursor: "pointer",
      transition: "color 0.2s",
    },
    ratingRow: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      marginBottom: "16px",
    },
    ratingStars: {
      color: "#FBBF24",
      fontSize: "12px",
    },
    ratingText: {
      fontSize: "11px",
      color: "rgba(255, 255, 255, 0.4)",
    },
    priceRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "auto",
    },
    price: {
      fontSize: "19px",
      fontWeight: "800",
      color: "#FFFFFF",
      fontFamily: "'Syne', sans-serif",
    },
    buyBtn: {
      backgroundColor: "transparent",
      color: "#10B981",
      border: "1px solid #10B981",
      borderRadius: "20px",
      padding: "6px 16px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  return (
    <section id="shop" style={styles.section}>
      <Container version="v1">
        <div style={{ width: "100%" }}>
          <style>{`
            @media (max-width: 1200px) {
              .featured-products-grid {
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              }
            }
            @media (max-width: 900px) {
              .featured-products-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
            }
            @media (max-width: 600px) {
              .featured-products-grid {
                grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
              }
            }
          `}</style>
          <div style={styles.header}>
            <span style={styles.subTitle}>Featured Products</span>
            <h2 style={styles.title}>Engineered For Performance</h2>
          </div>

          {/* Category Tab Filters */}
          <div style={styles.tabContainer}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                style={{
                  ...styles.tabBtn,
                  backgroundColor: selectedCategory === cat.slug ? "#FFFFFF" : "transparent",
                  color: selectedCategory === cat.slug ? "#0C0C0F" : "rgba(255, 255, 255, 0.6)",
                  borderColor: selectedCategory === cat.slug ? "#FFFFFF" : "rgba(255, 255, 255, 0.1)",
                }}
                onClick={() => onSelectCategory(cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div style={styles.grid} className="featured-products-grid">
            {filteredProducts.map((prod, idx) => {
              const isWishlisted = wishlist.includes(prod.id);
              return (
                <Fade key={prod.id} version="v2" direction="up" delay={idx * 80} duration={700}>
                  <div 
                    style={styles.card}
                    className="product-card"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                      
                      const overlay = e.currentTarget.querySelector(".overlay-actions");
                      if (overlay) {
                        overlay.style.transform = "translateY(0)";
                        overlay.style.opacity = "1";
                      }

                      const primaryImg = e.currentTarget.querySelector(".primary-img");
                      if (primaryImg && prod.hoverImage) {
                        primaryImg.style.opacity = "0";
                        primaryImg.style.transform = "scale(1.05)";
                      }
                      const secondaryImg = e.currentTarget.querySelector(".secondary-img");
                      if (secondaryImg && prod.hoverImage) {
                        secondaryImg.style.opacity = "1";
                        secondaryImg.style.transform = "scale(1.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                      
                      const overlay = e.currentTarget.querySelector(".overlay-actions");
                      if (overlay) {
                        overlay.style.transform = "translateY(80px)";
                        overlay.style.opacity = "0";
                      }

                      const primaryImg = e.currentTarget.querySelector(".primary-img");
                      if (primaryImg) {
                        primaryImg.style.opacity = "1";
                        primaryImg.style.transform = "scale(1)";
                      }
                      const secondaryImg = e.currentTarget.querySelector(".secondary-img");
                      if (secondaryImg) {
                        secondaryImg.style.opacity = "0";
                        secondaryImg.style.transform = "scale(1)";
                      }
                    }}
                  >
                    {/* Image Area */}
                    <div style={styles.imageArea}>
                      {prod.badge && <span style={styles.badge}>{prod.badge}</span>}
                      
                      <button 
                        style={{
                          ...styles.wishlistBtn,
                          color: isWishlisted ? "#FF3366" : "#FFFFFF"
                        }}
                        onClick={() => onToggleWishlist(prod.id)}
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#FFFFFF";
                          if (!isWishlisted) e.currentTarget.style.color = "#FF3366";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "rgba(12, 12, 15, 0.6)";
                          e.currentTarget.style.color = isWishlisted ? "#FF3366" : "#FFFFFF";
                        }}
                      >
                        {isWishlisted ? "♥" : "♡"}
                      </button>

                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="primary-img"
                        style={styles.productImg} 
                      />
                      {prod.hoverImage && (
                        <img 
                          src={prod.hoverImage} 
                          alt={prod.name} 
                          className="secondary-img"
                          style={{
                            ...styles.productImg,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            opacity: 0,
                          }} 
                        />
                      )}

                      {/* Hover Actions Overlay */}
                      <div className="overlay-actions" style={styles.actionsOverlay}>
                        <button 
                          style={styles.actionBtn}
                          onClick={() => onAddToCart(prod, prod.colors?.[0] || "Default", prod.sizes?.[0] || "Standard", 1)}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#10B981"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#FFFFFF"}
                        >
                          Quick Add
                        </button>
                        <button 
                          style={styles.quickBtn}
                          onClick={() => onQuickView(prod)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#FFFFFF";
                            e.currentTarget.style.color = "#0C0C0F";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#16161D";
                            e.currentTarget.style.color = "#FFFFFF";
                          }}
                          title="Quick View"
                        >
                          👁
                        </button>
                      </div>
                    </div>

                    {/* Info Area */}
                    <div style={styles.infoArea}>
                      <span style={styles.catName}>{prod.category}</span>
                      <h3 
                        style={styles.prodName}
                        onClick={() => onQuickView(prod)}
                        onMouseEnter={(e) => e.currentTarget.style.color = "#10B981"}
                        onMouseLeave={(e) => e.currentTarget.style.color = "#FFFFFF"}
                      >
                        {prod.name}
                      </h3>
                      
                      <div style={styles.ratingRow}>
                        <div style={styles.ratingStars}>
                          {"★".repeat(Math.round(prod.rating))}
                          {"☆".repeat(5 - Math.round(prod.rating))}
                        </div>
                        <span style={styles.ratingText}>
                          ({prod.reviewCount})
                        </span>
                      </div>

                      <div style={styles.priceRow}>
                        <span style={styles.price}>${prod.price.toFixed(2)}</span>
                        <button 
                          style={styles.buyBtn}
                          onClick={() => onQuickView(prod)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#10B981";
                            e.currentTarget.style.color = "#FFFFFF";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.color = "#10B981";
                          }}
                        >
                          View Options
                        </button>
                      </div>
                    </div>
                  </div>
                </Fade>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
