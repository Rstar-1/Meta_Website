import React from "react";

const CartSidebar = ({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(8px)",
      zIndex: 2000,
      opacity: isOpen ? 1 : 0,
      visibility: isOpen ? "visible" : "hidden",
      transition: "opacity 0.4s ease, visibility 0.4s ease",
    },
    sidebar: {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      width: "100%",
      maxWidth: "460px",
      backgroundColor: "#0C0C0F",
      color: "#FFFFFF",
      borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
      zIndex: 2001,
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
      transition: "transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.5)",
    },
    header: {
      padding: "24px 30px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    title: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "22px",
      fontWeight: "800",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      margin: 0,
    },
    closeBtn: {
      background: "none",
      border: "none",
      color: "rgba(255, 255, 255, 0.6)",
      fontSize: "24px",
      cursor: "pointer",
      padding: "5px",
      transition: "color 0.2s ease, transform 0.2s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    itemList: {
      flex: 1,
      overflowY: "auto",
      padding: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    itemCard: {
      display: "flex",
      gap: "16px",
      paddingBottom: "20px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      position: "relative",
    },
    itemImage: {
      width: "80px",
      height: "80px",
      objectFit: "cover",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backgroundColor: "#1A1A22",
    },
    itemInfo: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    itemName: {
      fontSize: "15px",
      fontWeight: "600",
      color: "#FFFFFF",
      margin: "0 0 4px 0",
      lineHeight: "1.3",
    },
    itemMeta: {
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.4)",
      margin: "0 0 8px 0",
    },
    quantitySelector: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      backgroundColor: "#16161D",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "20px",
      padding: "4px 12px",
      width: "fit-content",
    },
    qtyBtn: {
      background: "none",
      border: "none",
      color: "#FFFFFF",
      fontSize: "14px",
      cursor: "pointer",
      padding: "2px 6px",
      fontWeight: "bold",
    },
    qtyVal: {
      fontSize: "13px",
      fontWeight: "600",
      minWidth: "16px",
      textAlign: "center",
    },
    itemRight: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
    itemPrice: {
      fontSize: "15px",
      fontWeight: "700",
      color: "#10B981",
    },
    removeBtn: {
      background: "none",
      border: "none",
      color: "rgba(255, 255, 255, 0.4)",
      cursor: "pointer",
      fontSize: "12px",
      textDecoration: "underline",
      padding: "2px",
      transition: "color 0.2s ease",
    },
    footer: {
      padding: "30px",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)",
      backgroundColor: "#121218",
    },
    summaryRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    summaryLabel: {
      fontSize: "15px",
      color: "rgba(255, 255, 255, 0.6)",
    },
    summaryValue: {
      fontSize: "20px",
      fontWeight: "800",
      color: "#FFFFFF",
      fontFamily: "'Syne', sans-serif",
    },
    checkoutBtn: {
      width: "100%",
      backgroundColor: "#10B981",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "30px",
      padding: "16px 24px",
      fontSize: "15px",
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
    },
    emptyState: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      color: "rgba(255, 255, 255, 0.4)",
      gap: "16px",
    },
    emptyIcon: {
      fontSize: "48px",
    },
    emptyText: {
      fontSize: "16px",
      fontWeight: "500",
    },
  };

  return (
    <>
      {/* Sidebar Backdrop Overlay */}
      <div 
        style={styles.overlay} 
        onClick={onClose} 
        aria-hidden="true"
      />

      {/* Cart Drawer Panel */}
      <div style={styles.sidebar}>
        <div style={styles.header}>
          <h3 style={styles.title}>Shopping Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
          <button 
            style={styles.closeBtn} 
            onClick={onClose}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
              e.currentTarget.style.transform = "rotate(90deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255, 255, 255, 0.6)";
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          >
            ✕
          </button>
        </div>

        <div style={styles.itemList}>
          {cart.length === 0 ? (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🛒</div>
              <div style={styles.emptyText}>Your cart is currently empty.</div>
              <button 
                onClick={onClose}
                style={{
                  backgroundColor: "transparent",
                  color: "#10B981",
                  border: "1px solid #10B981",
                  borderRadius: "20px",
                  padding: "8px 20px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#10B981";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#10B981";
                }}
              >
                Keep Shopping
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div style={styles.itemCard} key={`${item.id}-${item.color}-${item.size}`}>
                <img src={item.image} alt={item.name} style={styles.itemImage} />
                <div style={styles.itemInfo}>
                  <h4 style={styles.itemName}>{item.name}</h4>
                  <p style={styles.itemMeta}>
                    {item.color} / {item.size}
                  </p>
                  <div style={styles.quantitySelector}>
                    <button 
                      style={styles.qtyBtn} 
                      onClick={() => onUpdateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                    >
                      －
                    </button>
                    <span style={styles.qtyVal}>{item.quantity}</span>
                    <button 
                      style={styles.qtyBtn} 
                      onClick={() => onUpdateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                    >
                      ＋
                    </button>
                  </div>
                </div>
                <div style={styles.itemRight}>
                  <span style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                  <button 
                    style={styles.removeBtn} 
                    onClick={() => onRemoveItem(item.id, item.color, item.size)}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#FF3366"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.4)"}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.summaryRow}>
              <span style={styles.summaryLabel}>Subtotal</span>
              <span style={styles.summaryValue}>${subtotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.4)", margin: "0 0 20px 0", lineHeight: "1.4" }}>
              Shipping, taxes, and discounts calculated at checkout. Free shipping active for orders over $150.
            </p>
            <button 
              style={styles.checkoutBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#0F9F70";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#10B981";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              onClick={() => alert("Checkout initiated! Total order value: $" + subtotal.toFixed(2))}
            >
              Secure Checkout 🔒
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
