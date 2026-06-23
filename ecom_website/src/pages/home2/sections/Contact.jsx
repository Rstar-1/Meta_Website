import { useState } from "react";
import Fade from "../../../components/common/Fade";

const Contact = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", website: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  const styles = {
    contactSection: {
      padding: "140px 5%",
      backgroundColor: "#FFFFFF",
      gap: "80px",
    },
    contactLeft: {
      flex: "1 1 450px",
      gap: "30px",
    },
    contactRight: {
      flex: "1 1 500px",
      backgroundColor: "#F4F4F5",
      borderRadius: "32px",
      padding: "45px",
      border: "1px solid rgba(0, 0, 0, 0.05)",
    },
    sectionSubtitle: {
      gap: "10px",
      fontSize: "12px",
      color: "#FF5A36",
      letterSpacing: "2px",
      marginBottom: "5px",
    },
    sectionTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "calc(2.2rem + 1.5vw)",
      lineHeight: "1.1",
      color: "#0C0C0F",
      letterSpacing: "-1.5px",
    },
    infoItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "20px",
      padding: "20px 0",
      borderBottom: "1px dashed rgba(0, 0, 0, 0.12)",
    },
    infoIconWrapper: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      backgroundColor: "rgba(255, 90, 54, 0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FF5A36",
    },
    infoLabel: {
      fontSize: "13px",
      color: "#71717A",
      textTransform: "uppercase",
      letterSpacing: "1px",
      fontWeight: "600",
      margin: "0 0 4px 0",
    },
    infoValue: {
      fontSize: "18px",
      color: "#0C0C0F",
      fontWeight: "700",
      margin: 0,
      textDecoration: "none",
      transition: "color 0.2s ease",
    },
    inputField: {
      width: "100%",
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(12, 12, 15, 0.08)",
      borderRadius: "12px",
      textIndent: "20px",
      padding: "16px 0px",
      fontSize: "15px",
      color: "#0C0C0F",
      outline: "none",
      transition: "border-color 0.3s ease",
    },
    textareaField: {
      width: "100%",
      backgroundColor: "#FFFFFF",
      border: "1px solid rgba(12, 12, 15, 0.08)",
      borderRadius: "12px",
      padding: "16px 0px",
      fontSize: "15px",
      textIndent: "20px",
      color: "#0C0C0F",
      outline: "none",
      minHeight: "130px",
      resize: "vertical",
      fontFamily: "inherit",
      transition: "border-color 0.3s ease",
    },
    submitBtn: {
      backgroundColor: "#FF5A36",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "30px",
      padding: "16px 35px",
      fontWeight: "600",
      fontSize: "15px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      transition: "all 0.3s ease",
      marginTop: "10px",
    },
  };

  return (
    <section id="contact" style={styles.contactSection} className="flex flex-row flex-wrap items-center justify-between">
      {/* Left Column: Typography & Contact Details */}
      <div style={styles.contactLeft} className="flex flex-column">
        <Fade version="v2" direction="left" duration={900}>
          <div style={styles.sectionSubtitle} className="flex items-center font-700 uppercase">
            <span className="rounded-full" style={{ width: "8px", height: "8px", backgroundColor: "#FF5A36" }}></span>
            CONTACT US
          </div>
          <h2 style={styles.sectionTitle} className="m-0 font-800">
            Let's make your brand brilliant!
          </h2>
          <p className="m-0 mt-15" style={{ fontSize: "16px", color: "#4B5563", lineHeight: "1.6", maxWidth: "480px" }}>
            Get in touch with our strategy and development team to discuss your next project, integration, or custom setup.
          </p>

          <div className="flex flex-column mt-30" style={{ gap: "10px" }}>
            {/* Telegram */}
            <div style={styles.infoItem}>
              <div style={styles.infoIconWrapper}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
              <div>
                <p style={styles.infoLabel}>Call Us Directly</p>
                <a href="https://t.me/themedoxsupport" target="_blank" rel="noopener noreferrer" style={styles.infoValue} className="hover-orange">
                  @themedoxsupport
                </a>
              </div>
            </div>

            {/* Email */}
            <div style={styles.infoItem}>
              <div style={styles.infoIconWrapper}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p style={styles.infoLabel}>Need Support?</p>
                <a href="mailto:support@themedox.com" style={styles.infoValue} className="hover-orange">
                  support@themedox.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div style={{ ...styles.infoItem, borderBottom: "none" }}>
              <div style={styles.infoIconWrapper}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <p style={styles.infoLabel}>Our Location</p>
                <p style={styles.infoValue}>
                  36, Rokeya Mansion, Dhaka
                </p>
              </div>
            </div>
          </div>
        </Fade>
      </div>

      {/* Right Column: Clean Contact Form */}
      <div style={styles.contactRight} className="w-full">
        <Fade version="v2" direction="right" duration={900}>
          {success ? (
            <div className="text-center py-50 flex flex-column items-center justify-center" style={{ gap: "15px" }}>
              <div style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 208, 132, 0.1)",
                color: "#00D084",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                fontWeight: "bold"
              }}>
                ✓
              </div>
              <h3 className="m-0 font-800" style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", color: "#0C0C0F" }}>
                Message Sent!
              </h3>
              <p className="m-0" style={{ fontSize: "15px", color: "#4B5563", lineHeight: "1.6", maxWidth: "340px" }}>
                Thank you for reaching out. A representative will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-column" style={{ gap: "20px" }}>
              <h3 className="m-0 font-800 mb-5" style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", color: "#0C0C0F" }}>
                Get In Touch!
              </h3>

              <div className="grid-cols-2 md-grid-cols-1 sm-grid-cols-1" style={{ gap: "20px" }}>
                <input
                  type="text"
                  required
                  placeholder="Full name*"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={styles.inputField}
                  onFocus={(e) => e.target.style.borderColor = "#FF5A36"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(12, 12, 15, 0.08)"}
                />

                <input
                  type="email"
                  required
                  placeholder="Email address*"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={styles.inputField}
                  onFocus={(e) => e.target.style.borderColor = "#FF5A36"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(12, 12, 15, 0.08)"}
                />
              </div>

              <input
                type="url"
                placeholder="Website link"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                style={styles.inputField}
                onFocus={(e) => e.target.style.borderColor = "#FF5A36"}
                onBlur={(e) => e.target.style.borderColor = "rgba(12, 12, 15, 0.08)"}
              />

              <textarea
                required
                placeholder="How Can We Help You*"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={styles.textareaField}
                onFocus={(e) => e.target.style.borderColor = "#FF5A36"}
                onBlur={(e) => e.target.style.borderColor = "rgba(12, 12, 15, 0.08)"}
              />

              <button
                type="submit"
                style={styles.submitBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E04F2E";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF5A36";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Send Message <span>↗</span>
              </button>
            </form>
          )}
        </Fade>
      </div>

      <style>{`
        .hover-orange:hover {
          color: #FF5A36 !important;
        }
      `}</style>
    </section>
  );
};

export default Contact;
