const ScrollingMarquee = () => {
  const styles = {
    marqueeContainer: {
      whiteSpace: "nowrap",
      backgroundColor: "#FF5A36",
      padding: "22px 0",
      transform: "rotate(-1.5deg) scale(1.02)",
      marginTop: "-30px",
    },
    marqueeInner: {
      display: "inline-flex",
      animation: "marquee 22s linear infinite",
    },
    marqueeText: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "24px",
      color: "#FFFFFF",
      letterSpacing: "1px",
      paddingRight: "50px",
      gap: "15px",
    },
  };

  return (
    <div style={styles.marqueeContainer} className="overflow-hidden w-full z-10 relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div style={styles.marqueeInner}>
        {Array(4).fill([
          "DIGITAL SOLUTION",
          "BUSINESS GROWTH",
          "WEB DEVELOPMENT",
          "IT COMPANY",
          "SEO AGENCY",
          "BRAND CONSULTING"
        ]).flat().map((phrase, idx) => (
          <span key={idx} style={styles.marqueeText} className="flex items-center uppercase font-800">
            {phrase} <span style={{ color: "#0C0C0F" }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ScrollingMarquee;
