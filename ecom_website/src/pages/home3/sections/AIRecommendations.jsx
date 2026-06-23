import React, { useState } from "react";
import Fade from "../../../components/common/Fade";
import Container from "../../../components/common/Container";
import { products } from "../data/products";

const AIRecommendations = ({ onAddToCart, onQuickView }) => {
  const [selectedMood, setSelectedMood] = useState("developer");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const moods = [
    {
      id: "developer",
      name: "Pro Developer",
      icon: "💻",
      tagline: "Unleash maximum productivity with tactile feedback and focus tools.",
      productIds: ["h3-prod-2", "h3-prod-6"],
      reasons: {
        "h3-prod-2": "Mechanical switches reduce finger fatigue, while the 75% layout keeps your mouse close for ergonomic coding sessions.",
        "h3-prod-6": "Asymmetrical lighting eliminates screen glare, and the built-in Qi charger keeps your test devices charged without clutter."
      }
    },
    {
      id: "audiophile",
      name: "Audiophile",
      icon: "🎵",
      tagline: "Isolate distraction and bathe your room in high-fidelity acoustics.",
      productIds: ["h3-prod-1", "h3-prod-8"],
      reasons: {
        "h3-prod-1": "Lossless LDAC audio playback delivers master-tape quality sounds, perfectly paired with industry-leading hybrid ANC.",
        "h3-prod-8": "Immersive 360-degree acoustic diffuser fills your room evenly, avoiding hot spots and providing flat, clean bass."
      }
    },
    {
      id: "minimalist",
      name: "Minimalist",
      icon: "🪴",
      tagline: "Declutter your physical space to clarify your mental focus.",
      productIds: ["h3-prod-4", "h3-prod-5"],
      reasons: {
        "h3-prod-4": "Sleek lines and premium leather eliminate the need for secondary bags, fitting everything in a compact, elegant footprint.",
        "h3-prod-5": "Hand-blown geometric lines double as dining artwork, keeping you hydrated and focused with zero plastic waste."
      }
    },
    {
      id: "smarthome",
      name: "Smart Oasis",
      icon: "✨",
      tagline: "Synchronize your lifestyle and smart items with responsive control.",
      productIds: ["h3-prod-3", "h3-prod-7"],
      reasons: {
        "h3-prod-3": "16 million colors sync directly with screen frequencies, reducing eye strain and matching lighting to your circadian rhythm.",
        "h3-prod-7": "Biometric tracking without the blue-light distraction of standard smartwatches. Keeps you present and connected."
      }
    }
  ];

  const handleMoodSelect = (moodId) => {
    setIsAnalyzing(true);
    setSelectedMood(moodId);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  const currentMood = moods.find(m => m.id === selectedMood);
  const recommendedProducts = products.filter(p => currentMood.productIds.includes(p.id));

  const styles = {
    section: {
      padding: "100px 0",
      backgroundColor: "#111116",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
      position: "relative",
      overflow: "hidden",
    },
    orb: {
      position: "absolute",
      bottom: "-10%",
      left: "-5%",
      width: "500px",
      height: "500px",
      borderRadius: "50%",
      backgroundColor: "#10B981",
      filter: "blur(180px)",
      opacity: 0.08,
      pointerEvents: "none",
    },
    header: {
      maxWidth: "600px",
      marginBottom: "50px",
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
      margin: "0 0 16px 0",
      textTransform: "uppercase",
      letterSpacing: "-1px",
    },
    desc: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.5)",
      lineHeight: "1.6",
    },
    moodBar: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "16px",
      marginBottom: "50px",
      width: "100%",
    },
    moodCard: {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
      border: "1px solid rgba(255, 255, 255, 0.06)",
      borderRadius: "16px",
      padding: "20px",
      cursor: "pointer",
      textAlign: "center",
      transition: "all 0.3s ease",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    },
    moodIcon: {
      fontSize: "28px",
    },
    moodName: {
      fontSize: "15px",
      fontWeight: "700",
      color: "#FFFFFF",
      margin: 0,
    },
    recArea: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      width: "100%",
    },
    recTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "18px",
      fontWeight: "800",
      color: "rgba(255, 255, 255, 0.6)",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    aiBadge: {
      backgroundColor: "#10B981",
      color: "#FFFFFF",
      fontSize: "11px",
      fontWeight: "700",
      padding: "3px 8px",
      borderRadius: "6px",
    },
    resultsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
      gap: "30px",
      width: "100%",
      opacity: isAnalyzing ? 0.3 : 1,
      transform: isAnalyzing ? "translateY(10px)" : "translateY(0)",
      transition: "opacity 0.4s ease, transform 0.4s ease",
    },
    recCard: {
      backgroundColor: "#0C0C0F",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "20px",
      padding: "24px",
      display: "flex",
      gap: "20px",
      alignItems: "center",
    },
    recImg: {
      width: "120px",
      height: "120px",
      borderRadius: "12px",
      objectFit: "cover",
      backgroundColor: "#16161D",
      border: "1px solid rgba(255, 255, 255, 0.06)",
    },
    recDetails: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    recCategory: {
      fontSize: "10px",
      fontWeight: "700",
      color: "#10B981",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "4px",
    },
    recName: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#FFFFFF",
      margin: "0 0 6px 0",
    },
    reasonBox: {
      backgroundColor: "rgba(16, 185, 129, 0.04)",
      borderLeft: "2px solid #10B981",
      padding: "8px 12px",
      borderRadius: "0 8px 8px 0",
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: "1.4",
      marginBottom: "12px",
      fontStyle: "italic",
    },
    recPriceRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    recPrice: {
      fontSize: "16px",
      fontWeight: "800",
      color: "#FFFFFF",
    },
    recBtn: {
      backgroundColor: "transparent",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "20px",
      padding: "4px 12px",
      fontSize: "11px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s",
    },
  };

  return (
    <section id="ai-rec" style={styles.section}>
      <div style={styles.orb} />
      <Container version="v1">
        <div style={{ width: "100%" }}>
          <Fade version="v2" direction="up" delay={50}>
            <div style={styles.header}>
              <span style={styles.subTitle}>Personalized Shopping</span>
              <h2 style={styles.title}>AI Recommendation Engine</h2>
              <p style={styles.desc}>
                Select your lifestyle archetype and let our neural recommender pair the ultimate components for your environment.
              </p>
            </div>
          </Fade>

          {/* Mood/Lifestyle Selection Bar */}
          <Fade version="v2" direction="up" delay={100}>
            <div style={styles.moodBar}>
              {moods.map((mood) => {
                const isActive = selectedMood === mood.id;
                return (
                  <div
                    key={mood.id}
                    style={{
                      ...styles.moodCard,
                      backgroundColor: isActive ? "rgba(16, 185, 129, 0.05)" : "rgba(255, 255, 255, 0.01)",
                      borderColor: isActive ? "#10B981" : "rgba(255, 255, 255, 0.06)",
                      boxShadow: isActive ? "0 10px 20px rgba(16, 185, 129, 0.05)" : "none",
                    }}
                    onClick={() => handleMoodSelect(mood.id)}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.06)";
                    }}
                  >
                    <span style={styles.moodIcon}>{mood.icon}</span>
                    <h4 style={styles.moodName}>{mood.name}</h4>
                    <span style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.4)" }}>
                      {mood.id === "developer" ? "Efficiency" : mood.id === "audiophile" ? "Acoustics" : mood.id === "minimalist" ? "Decluttered" : "Interactive"}
                    </span>
                  </div>
                );
              })}
            </div>
          </Fade>

          {/* Recommendations Results Area */}
          <Fade version="v2" direction="up" delay={150}>
            <div style={styles.recArea}>
              <div style={styles.recTitle}>
                <span>Recommendations For You</span>
                <span style={styles.aiBadge}>AI Agent Active</span>
              </div>

              <div style={styles.resultsGrid}>
                {recommendedProducts.map((prod) => (
                  <div key={prod.id} style={styles.recCard}>
                    <img src={prod.image} alt={prod.name} style={styles.recImg} />
                    <div style={styles.recDetails}>
                      <div>
                        <span style={styles.recCategory}>{prod.category}</span>
                        <h4 style={styles.recName}>{prod.name}</h4>
                        
                        {/* AI Recommendation Reason */}
                        <div style={styles.reasonBox}>
                          "{currentMood.reasons[prod.id]}"
                        </div>
                      </div>

                      <div style={styles.recPriceRow}>
                        <span style={styles.recPrice}>${prod.price.toFixed(2)}</span>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button 
                            style={styles.recBtn}
                            onClick={() => onQuickView(prod)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.08)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                            }}
                          >
                            Quick View
                          </button>
                          <button 
                            style={{
                              ...styles.recBtn,
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
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </Container>
    </section>
  );
};

export default AIRecommendations;
