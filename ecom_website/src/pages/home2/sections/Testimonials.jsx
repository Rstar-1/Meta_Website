import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";

const Testimonials = () => {
  const testimonialList = [
    {
      name: "giuseppeizzo463",
      location: "Italy",
      quote: "I asked for help with the installation and configuration. They responded to me in 5 minutes by email and installed it in 5 minutes. Really professional and reliable.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
      isOrange: true,
      tilt: -1
    },
    {
      name: "dapurletter",
      location: "Indonesia",
      quote: "I really like the Gerow theme - Business Consulting WordPress theme. The design is modern, easy to use, and responsive. My suggestion is to expand headers options.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
      isOrange: false,
      tilt: 2
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
      tilt: 2
    }
  ];

  const styles = {
    testimonialCard: (tiltAngle = 0, isOrange = false) => ({
      backgroundColor: isOrange ? "#FF5A36" : "#FFFFFF",
      transform: `rotate(${tiltAngle}deg)`,
      transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.4s ease",
      border: isOrange ? "none" : "1px solid rgba(12, 12, 15, 0.05)",
    }),
    testimonialAvatar: {
      width: "48px",
      height: "48px",
      objectFit: "cover",
      border: "2px solid rgba(255, 255, 255, 0.2)",
    }
  };

  return (
    <Container className="bg-tertiary">
      <div className="py-60">
        <div className="text-center flex flex-column items-center justify-center">
          <p className="font-500 text-gray mini-text flex items-center gap-5"><span className="dot flex bg-warning rounded-full"></span> CLIENT FEEDBACK</p>
          <h2 className="font-600 head-text text-dark pt-4 uppercase">
            Review Sticky-Notes
          </h2>
        </div>

        <div className="grid-cols-4 w-full mt-40" style={{ gap: '20px' }}>
          {testimonialList.map((t, idx) => (
            <div
              key={idx}
              className="cursor-pointer p-20 rounded-10"
              style={styles.testimonialCard(t.tilt, t.isOrange)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.06) rotate(0deg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${t.tilt}deg)`;
              }}
            >
              <p
                className="small-text font-400"
                style={{
                  color: t.isOrange ? "var(--white)" : "var(--gray)",
                }}
              >
                "{t.quote}"
              </p>

              <div className="flex items-center mt-16 gap-12">
                <img src={t.avatar} alt={t.name} style={{ width: '45px', height: '45px' }} className="rounded-full object-cover flex" />
                <div>
                  <h5 className="mid-text font-500"
                    style={{
                      color: t.isOrange ? "var(--white)" : "var(--dark)",
                    }}>{t.name}</h5>
                  <p
                    className="mini-text font-400"
                    style={{
                      color: t.isOrange ? "var(--white)" : "var(--gray)",
                    }}
                  >
                    {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
