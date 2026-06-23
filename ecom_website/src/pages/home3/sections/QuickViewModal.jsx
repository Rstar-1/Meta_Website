import React, { useState, useEffect } from "react";

const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");

  // Update initial selected values when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors && product.colors.length > 0 ? product.colors[0] : "");
      setSelectedSize(product.sizes && product.sizes.length > 0 ? product.sizes[0] : "");
      setQuantity(1);
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(10px)",
      zIndex: 3000,
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
      maxWidth: "960px",
      maxHeight: "90vh",
      overflowY: "auto",
      position: "relative",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
      animation: "scaleIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
    },
    closeBtn: {
      position: "absolute",
      top: "20px",
      right: "20px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: "#16161D",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "20px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 10,
      transition: "all 0.2s ease",
    },
    imageSection: {
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      borderRight: "1px solid rgba(255, 255, 255, 0.08)",
    },
    mainImageWrapper: {
      width: "100%",
      height: "360px",
      borderRadius: "16px",
      overflow: "hidden",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      backgroundColor: "#16161D",
    },
    mainImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform 0.5s ease",
    },
    galleryWrapper: {
      display: "flex",
      gap: "12px",
    },
    galleryThumb: {
      width: "60px",
      height: "60px",
      borderRadius: "8px",
      objectFit: "cover",
      cursor: "pointer",
      border: "2px solid transparent",
      backgroundColor: "#16161D",
      transition: "all 0.2s",
    },
    infoSection: {
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    category: {
      fontSize: "12px",
      fontWeight: "700",
      textTransform: "uppercase",
      color: "#10B981",
      letterSpacing: "2px",
      margin: "0 0 10px 0",
    },
    title: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "28px",
      fontWeight: "800",
      margin: "0 0 12px 0",
      lineHeight: "1.2",
    },
    ratingRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "20px",
    },
    ratingStars: {
      color: "#FBBF24",
      fontSize: "14px",
    },
    ratingText: {
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.5)",
    },
    price: {
      fontSize: "26px",
      fontWeight: "800",
      color: "#FFFFFF",
      marginBottom: "20px",
      fontFamily: "'Syne', sans-serif",
    },
    desc: {
      fontSize: "14px",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: "1.6",
      marginBottom: "24px",
    },
    optionLabel: {
      fontSize: "13px",
      fontWeight: "700",
      color: "rgba(255, 255, 255, 0.5)",
      textTransform: "uppercase",
      letterSpacing: "1px",
      marginBottom: "10px",
      display: "block",
    },
    colorOptions: {
      display: "flex",
      gap: "10px",
      marginBottom: "24px",
    },
    colorPill: {
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.2s ease",
    },
    sizeOptions: {
      display: "flex",
      gap: "10px",
      marginBottom: "24px",
    },
    sizePill: {
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
      cursor: "pointer",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.2s ease",
    },
    purchaseRow: {
      display: "flex",
      gap: "16px",
      alignItems: "center",
      marginTop: "10px",
    },
    qtySelector: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#16161D",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "30px",
      padding: "8px 16px",
      gap: "14px",
    },
    qtyBtn: {
      background: "none",
      border: "none",
      color: "#FFFFFF",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },
    qtyVal: {
      fontSize: "14px",
      fontWeight: "600",
      minWidth: "20px",
      textAlign: "center",
    },
    addBtn: {
      flex: 1,
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
      boxShadow: "0 4px 15px rgba(16, 185, 129, 0.25)",
    },
    specsList: {
      marginTop: "24px",
      paddingTop: "24px",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    },
    specItem: {
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.6)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "8px",
    },
    specDot: {
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      backgroundColor: "#10B981",
    },
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <div 
        style={styles.modal} 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          style={styles.closeBtn} 
          onClick={onClose}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#FFFFFF";
            e.currentTarget.style.color = "#0C0C0F";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#16161D";
            e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
          }}
        >
          ✕
        </button>

        {/* Left: Images */}
        <div style={styles.imageSection}>
          <div style={styles.mainImageWrapper}>
            <img src={activeImage} alt={product.name} style={styles.mainImage} />
          </div>
          <div style={styles.galleryWrapper}>
            <img 
              src={product.image} 
              alt="primary" 
              style={{
                ...styles.galleryThumb,
                borderColor: activeImage === product.image ? "#10B981" : "transparent"
              }} 
              onClick={() => setActiveImage(product.image)}
            />
            {product.hoverImage && (
              <img 
                src={product.hoverImage} 
                alt="secondary" 
                style={{
                  ...styles.galleryThumb,
                  borderColor: activeImage === product.hoverImage ? "#10B981" : "transparent"
                }} 
                onClick={() => setActiveImage(product.hoverImage)}
              />
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div style={styles.infoSection}>
          <div>
            <span style={styles.category}>{product.category}</span>
            <h2 style={styles.title}>{product.name}</h2>
            
            <div style={styles.ratingRow}>
              <div style={styles.ratingStars}>
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
              </div>
              <span style={styles.ratingText}>
                {product.rating} ({product.reviewCount} verified reviews)
              </span>
            </div>

            <div style={styles.price}>${product.price.toFixed(2)}</div>
            
            <p style={styles.desc}>{product.description}</p>

            {/* Colors Option */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span style={styles.optionLabel}>Color: {selectedColor}</span>
                <div style={styles.colorOptions}>
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      style={{
                        ...styles.colorPill,
                        backgroundColor: selectedColor === color ? "#FFFFFF" : "transparent",
                        color: selectedColor === color ? "#0C0C0F" : "#FFFFFF",
                        borderColor: selectedColor === color ? "#FFFFFF" : "rgba(255, 255, 255, 0.2)",
                      }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes Option */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span style={styles.optionLabel}>Specification/Size: {selectedSize}</span>
                <div style={styles.sizeOptions}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      style={{
                        ...styles.sizePill,
                        backgroundColor: selectedSize === size ? "#FFFFFF" : "transparent",
                        color: selectedSize === size ? "#0C0C0F" : "#FFFFFF",
                        borderColor: selectedSize === size ? "#FFFFFF" : "rgba(255, 255, 255, 0.2)",
                      }}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {/* Purchase Row */}
            <div style={styles.purchaseRow}>
              <div style={styles.qtySelector}>
                <button 
                  style={styles.qtyBtn} 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  －
                </button>
                <span style={styles.qtyVal}>{quantity}</span>
                <button 
                  style={styles.qtyBtn} 
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  ＋
                </button>
              </div>

              <button 
                style={styles.addBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#0F9F70";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#10B981";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            {/* Key Specs */}
            {product.features && (
              <div style={styles.specsList}>
                <span style={styles.optionLabel}>Technical Specifications</span>
                {product.features.map((feature, idx) => (
                  <div key={idx} style={styles.specItem}>
                    <div style={styles.specDot} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
