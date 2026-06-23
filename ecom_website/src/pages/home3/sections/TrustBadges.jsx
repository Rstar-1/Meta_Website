import React from "react";
import Fade from "../../../components/common/Fade";
import Container from "../../../components/common/Container";

const TrustBadges = () => {
  const badges = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13" />
          <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      ),
      title: "Free Express Shipping",
      desc: "Complementary shipping on all continental orders over $150."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      title: "100% Secure Checkout",
      desc: "Fully encrypted SSL connections with multi-layer token security."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
        </svg>
      ),
      title: "30-Day Easy Returns",
      desc: "Unhappy with your fit? Ship it back for a full refund or swap."
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: "Carbon Neutral Delivery",
      desc: "Every package offsets double its carbon footprint in green projects."
    }
  ];

  const styles = {
    section: {
      padding: "80px 0",
      backgroundColor: "#0C0C0F",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "40px",
      width: "100%",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
    },
    iconBox: {
      width: "64px",
      height: "64px",
      borderRadius: "50%",
      backgroundColor: "rgba(16, 185, 129, 0.05)",
      border: "1px solid rgba(16, 185, 129, 0.15)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "20px",
      boxShadow: "0 10px 20px rgba(16, 185, 129, 0.02)",
    },
    title: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "16px",
      fontWeight: "700",
      color: "#FFFFFF",
      margin: "0 0 10px 0",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    desc: {
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.5)",
      lineHeight: "1.5",
      margin: 0,
    },
  };

  return (
    <section style={styles.section}>
      <Container version="v1">
        <div style={styles.grid}>
          {badges.map((badge, idx) => (
            <Fade key={idx} version="v2" direction="up" delay={idx * 100} duration={800}>
              <div style={styles.card}>
                <div style={styles.iconBox}>
                  {badge.icon}
                </div>
                <h3 style={styles.title}>{badge.title}</h3>
                <p style={styles.desc}>{badge.desc}</p>
              </div>
            </Fade>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default TrustBadges;
