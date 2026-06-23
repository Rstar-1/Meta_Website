import React, { useState } from "react";
import Fade from "../../../components/common/Fade";
import Container from "../../../components/common/Container";

const CustomerReviews = ({ reviews, onAddReview }) => {
  const [showModal, setShowModal] = useState(false);
  const [ratingFilter, setRatingFilter] = useState(0); // 0 means all

  // Form states
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");

  // Track clicked helpful states locally
  const [helpfulIds, setHelpfulIds] = useState([]);

  // Calculate stats
  const totalReviews = reviews.length;
  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1);

  // Calculate star counts for breakdown
  const ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const rounded = Math.round(r.rating);
    if (ratingBreakdown[rounded] !== undefined) {
      ratingBreakdown[rounded]++;
    }
  });

  const handleHelpfulClick = (id) => {
    if (helpfulIds.includes(id)) return; // Only allow clicking helpful once per session
    setHelpfulIds(prev => [...prev, id]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName || !newTitle || !newComment) return;

    const newReview = {
      id: `rev-${Date.now()}`,
      name: newName,
      rating: newRating,
      title: newTitle,
      comment: newComment,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      helpful: 0,
      verified: true
    };

    onAddReview(newReview);
    setShowModal(false);
    
    // Reset fields
    setNewName("");
    setNewRating(5);
    setNewTitle("");
    setNewComment("");
  };

  const filteredReviews = ratingFilter === 0
    ? reviews
    : reviews.filter(r => Math.round(r.rating) === ratingFilter);

  const styles = {
    section: {
      padding: "100px 0",
      backgroundColor: "#0C0C0F",
      color: "#FFFFFF",
      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    },
    header: {
      marginBottom: "50px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
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
      margin: 0,
      textTransform: "uppercase",
      letterSpacing: "-1px",
    },
    writeBtn: {
      backgroundColor: "#FFFFFF",
      color: "#0C0C0F",
      border: "none",
      borderRadius: "30px",
      padding: "12px 28px",
      fontSize: "13px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    dashboard: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "50px",
      marginBottom: "60px",
      alignItems: "center",
    },
    scoreBox: {
      textAlign: "center",
      padding: "40px",
      backgroundColor: "#111116",
      borderRadius: "24px",
      border: "1px solid rgba(255, 255, 255, 0.06)",
    },
    scoreVal: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "64px",
      fontWeight: "800",
      lineHeight: "1",
      marginBottom: "12px",
      color: "#FFFFFF",
    },
    scoreStars: {
      color: "#FBBF24",
      fontSize: "20px",
      marginBottom: "8px",
    },
    scoreText: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.5)",
    },
    barsBox: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    barRow: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      cursor: "pointer",
      padding: "4px 8px",
      borderRadius: "8px",
      transition: "background-color 0.2s",
    },
    barStarText: {
      fontSize: "13px",
      fontWeight: "600",
      color: "rgba(255, 255, 255, 0.7)",
      width: "50px",
    },
    barTrack: {
      flex: 1,
      height: "6px",
      backgroundColor: "#16161D",
      borderRadius: "3px",
      overflow: "hidden",
    },
    barFill: {
      height: "100%",
      backgroundColor: "#10B981",
      borderRadius: "3px",
      transition: "width 0.8s ease",
    },
    barPercent: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.4)",
      width: "35px",
      textAlign: "right",
    },
    reviewsList: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    reviewCard: {
      backgroundColor: "#111116",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      borderRadius: "20px",
      padding: "30px",
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "16px",
      flexWrap: "wrap",
      gap: "12px",
    },
    cardStars: {
      color: "#FBBF24",
      fontSize: "13px",
      marginBottom: "6px",
    },
    cardName: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#FFFFFF",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    verifiedBadge: {
      fontSize: "10px",
      color: "#10B981",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      display: "flex",
      alignItems: "center",
      gap: "2px",
    },
    cardDate: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.4)",
    },
    cardTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#FFFFFF",
      margin: "0 0 10px 0",
    },
    cardComment: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: "1.6",
      margin: "0 0 20px 0",
    },
    cardFooter: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    helpfulBtn: {
      backgroundColor: "transparent",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.6)",
      borderRadius: "20px",
      padding: "6px 14px",
      fontSize: "12px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "all 0.2s ease",
    },
    // Modal Overlay styles
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(10px)",
      zIndex: 4000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    modal: {
      backgroundColor: "#0C0C0F",
      color: "#FFFFFF",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "24px",
      width: "100%",
      maxWidth: "520px",
      padding: "36px",
      position: "relative",
    },
    modalClose: {
      position: "absolute",
      top: "20px",
      right: "20px",
      background: "none",
      border: "none",
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "20px",
      cursor: "pointer",
    },
    formGroup: {
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "8px",
    },
    input: {
      backgroundColor: "#16161D",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: "12px 16px",
      color: "#FFFFFF",
      fontSize: "14px",
      outline: "none",
    },
    textarea: {
      backgroundColor: "#16161D",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: "12px 16px",
      color: "#FFFFFF",
      fontSize: "14px",
      outline: "none",
      minHeight: "100px",
      resize: "vertical",
    },
    submitBtn: {
      width: "100%",
      backgroundColor: "#10B981",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "30px",
      padding: "14px 24px",
      fontSize: "14px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
      transition: "all 0.2s ease",
      marginTop: "10px",
    },
  };

  return (
    <section id="reviews" style={styles.section}>
      <Container version="v1">
        <div style={{ width: "100%" }}>
          {/* Header Area */}
          <div style={styles.header}>
            <Fade version="v2" direction="up" delay={50}>
              <div>
                <span style={styles.subTitle}>Customer Feedback</span>
                <h2 style={styles.title}>Real Reviews From Real Users</h2>
              </div>
            </Fade>
            <Fade version="v2" direction="up" delay={150}>
              <button 
                style={styles.writeBtn}
                onClick={() => setShowModal(true)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#10B981";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                  e.currentTarget.style.color = "#0C0C0F";
                }}
              >
                Write a Review
              </button>
            </Fade>
          </div>

          {/* Ratings Dashboard */}
          <div style={styles.dashboard}>
            {/* Score Box */}
            <Fade version="v2" direction="up" delay={100} duration={800}>
              <div style={styles.scoreBox}>
                <div style={styles.scoreVal}>{averageRating}</div>
                <div style={styles.scoreStars}>
                  {"★".repeat(Math.round(parseFloat(averageRating)))}
                  {"☆".repeat(5 - Math.round(parseFloat(averageRating)))}
                </div>
                <div style={styles.scoreText}>Based on {totalReviews} global reviews</div>
              </div>
            </Fade>

            {/* Distribution Bars */}
            <Fade version="v2" direction="up" delay={200} duration={800}>
              <div style={styles.barsBox}>
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingBreakdown[stars];
                  const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                  const isFiltered = ratingFilter === stars;

                  return (
                    <div 
                      key={stars} 
                      style={{
                        ...styles.barRow,
                        backgroundColor: isFiltered ? "rgba(255, 255, 255, 0.05)" : "transparent"
                      }}
                      onClick={() => setRatingFilter(prev => prev === stars ? 0 : stars)}
                      title={`Filter by ${stars} stars`}
                    >
                      <span style={styles.barStarText}>{stars} Stars</span>
                      <div style={styles.barTrack}>
                        <div style={{ ...styles.barFill, width: `${percent}%` }} />
                      </div>
                      <span style={styles.barPercent}>{percent.toFixed(0)}%</span>
                    </div>
                  );
                })}
                {ratingFilter > 0 && (
                  <span 
                    style={{ fontSize: "12px", color: "#10B981", cursor: "pointer", textDecoration: "underline", alignSelf: "flex-end" }}
                    onClick={() => setRatingFilter(0)}
                  >
                    Clear Filter
                  </span>
                )}
              </div>
            </Fade>
          </div>

          {/* Reviews List */}
          <div style={styles.reviewsList}>
            {filteredReviews.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "rgba(255, 255, 255, 0.4)" }}>
                No reviews match this rating filter.
              </div>
            ) : (
              filteredReviews.map((rev, idx) => {
                const hasLiked = helpfulIds.includes(rev.id);
                return (
                  <Fade key={rev.id} version="v2" direction="up" delay={idx * 50} duration={700}>
                    <div style={styles.reviewCard}>
                      <div style={styles.cardHeader}>
                        <div>
                          <div style={styles.cardStars}>
                            {"★".repeat(rev.rating)}
                            {"☆".repeat(5 - rev.rating)}
                          </div>
                          <div style={styles.cardName}>
                            {rev.name}
                            {rev.verified && (
                              <span style={styles.verifiedBadge}>
                                ✓ Verified Buyer
                              </span>
                            )}
                          </div>
                        </div>
                        <span style={styles.cardDate}>{rev.date}</span>
                      </div>

                      <h4 style={styles.cardTitle}>{rev.title}</h4>
                      <p style={styles.cardComment}>{rev.comment}</p>

                      <div style={styles.cardFooter}>
                        <button 
                          style={{
                            ...styles.helpfulBtn,
                            backgroundColor: hasLiked ? "rgba(16, 185, 129, 0.1)" : "transparent",
                            borderColor: hasLiked ? "#10B981" : "rgba(255, 255, 255, 0.1)",
                            color: hasLiked ? "#10B981" : "rgba(255, 255, 255, 0.6)"
                          }}
                          onClick={() => handleHelpfulClick(rev.id)}
                        >
                          👍 Helpful ({rev.helpful + (hasLiked ? 1 : 0)})
                        </button>
                      </div>
                    </div>
                  </Fade>
                );
              })
            )}
          </div>
        </div>
      </Container>

      {/* Write Review Modal Overlay */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button style={styles.modalClose} onClick={() => setShowModal(false)}>✕</button>
            
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "24px", fontWeight: "800", textTransform: "uppercase", marginBottom: "24px" }}>
              Share Your Review
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", fontWeight: "700" }}>Your Name</label>
                <input 
                  type="text" 
                  style={styles.input} 
                  placeholder="e.g. Liam Henderson" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", fontWeight: "700" }}>Rating Stars</label>
                <div style={{ display: "flex", gap: "8px", fontSize: "24px", color: "#FBBF24" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span 
                      key={star} 
                      style={{ cursor: "pointer" }}
                      onClick={() => setNewRating(star)}
                    >
                      {star <= newRating ? "★" : "☆"}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", fontWeight: "700" }}>Review Headline</label>
                <input 
                  type="text" 
                  style={styles.input} 
                  placeholder="Summarize your experience..." 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.5)", textTransform: "uppercase", fontWeight: "700" }}>Detailed Comments</label>
                <textarea 
                  style={styles.textarea} 
                  placeholder="What did you like or dislike about the product?" 
                  value={newComment} 
                  onChange={(e) => setNewComment(e.target.value)} 
                  required 
                />
              </div>

              <button 
                type="submit" 
                style={styles.submitBtn}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0F9F70"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#10B981"}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default CustomerReviews;
