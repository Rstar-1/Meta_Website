import Fade from "../../../components/common/Fade";

const Testimonials = () => {
  const testimonialList = [
    {
      name: "giuseppeizzo463",
      location: "Italy",
      quote: "I asked for help with the installation and configuration. They responded to me in 5 minutes by email and installed it in 5 minutes. Really professional and reliable.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
      isOrange: true,
      tilt: -2
    },
    {
      name: "dapurletter",
      location: "Indonesia",
      quote: "I really like the Gerow theme - Business Consulting WordPress theme. The design is modern, easy to use, and responsive. My suggestion is to expand headers options.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
      isOrange: false,
      tilt: 3
    },
    {
      name: "matthewb174",
      location: "United Kingdom",
      quote: "The team has been so supportive. A couple of minor questions and a quick turn-around has ensured that I get the best performance from this excellent template. Well done!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
      isOrange: true,
      tilt: -1
    },
    {
      name: "richkayz",
      location: "Uganda",
      quote: "The display and features are top-notch. They are ready to keep updating. I highly recommend it to those who want clean, performant, and reliable website modules.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
      isOrange: false,
      tilt: 4
    }
  ];

  const styles = {
    testimonialsSection: {
      padding: "140px 5%",
      backgroundColor: "#F8F6F4",
      gap: "60px",
    },
    testimonialGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "35px",
    },
    testimonialCard: (tiltAngle = 0, isOrange = false) => ({
      backgroundColor: isOrange ? "#FF5A36" : "#FFFFFF",
      color: isOrange ? "#FFFFFF" : "#0C0C0F",
      borderRadius: "28px",
      transform: `rotate(${tiltAngle}deg)`,
      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease",
      minHeight: "280px",
      border: isOrange ? "none" : "1px solid rgba(12, 12, 15, 0.05)",
    }),
    testimonialHeader: {
      gap: "15px",
      marginTop: "30px",
    },
    testimonialAvatar: {
      width: "48px",
      height: "48px",
      objectFit: "cover",
      border: "2px solid rgba(255, 255, 255, 0.2)",
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
      color: "#FFFFFF",
      margin: 0,
      letterSpacing: "-1px",
    },
  };

  return (
    <section style={styles.testimonialsSection} className="flex flex-column">
      <Fade version="v2" direction="up" duration={900}>
        <div className="text-center">
          <div style={styles.sectionSubtitle} className="flex items-center font-700 uppercase justify-center">
            <span className="rounded-full" style={{ width: "8px", height: "8px", backgroundColor: "#FF5A36" }}></span>
            CLIENT FEEDBACK
          </div>
          <h2 style={{ ...styles.sectionTitle, color: "#0C0C0F" }} className="font-800 text-center">
            Review Sticky-Notes
          </h2>
        </div>
      </Fade>

      <div style={styles.testimonialGrid} className="w-full">
        {testimonialList.map((t, idx) => (
          <div
            key={idx}
            className="flex flex-column justify-between cursor-pointer py-35 px-30"
            style={styles.testimonialCard(t.tilt, t.isOrange)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.06) rotate(0deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = `rotate(${t.tilt}deg)`;
            }}
          >
            <p
              className="m-0 font-500"
              style={{
                fontSize: "15px",
                lineHeight: "1.6",
                fontStyle: "italic"
              }}
            >
              "{t.quote}"
            </p>

            <div style={styles.testimonialHeader} className="flex items-center">
              <img src={t.avatar} alt={t.name} style={styles.testimonialAvatar} className="rounded-full" />
              <div>
                <h5 className="m-0 font-700" style={{ fontSize: "14px" }}>{t.name}</h5>
                <p
                  className="m-0 font-600"
                  style={{
                    fontSize: "11px",
                    color: t.isOrange ? "rgba(255,255,255,0.7)" : "#A2A2A7",
                  }}
                >
                  {t.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
