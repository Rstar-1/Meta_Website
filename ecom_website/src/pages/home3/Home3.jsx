import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🧩 Import Ecommerce Sections
import Hero from "./sections/Hero";
import Categories from "./sections/Categories";
import FeaturedProducts from "./sections/FeaturedProducts";
import AIRecommendations from "./sections/AIRecommendations";
import CustomerReviews from "./sections/CustomerReviews";
import RecentlyViewed from "./sections/RecentlyViewed";
import TrustBadges from "./sections/TrustBadges";
import CartSidebar from "./sections/CartSidebar";
import QuickViewModal from "./sections/QuickViewModal";

// 📦 Import Product Mock Database
import { products } from "./data/products";

const Home3 = () => {
  const navigate = useNavigate();

  // 🛒 Cart and Wishlist States
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [reviews, setReviews] = useState([
    {
      id: "rev-1",
      name: "Sarah Jenkins",
      rating: 5,
      title: "Amazing sound isolation!",
      comment: "The Zenith ANC Headphones are an absolute game changer for my open-office setup. Noise cancelling is dead silent and the sound profile is extremely flat and detailed.",
      date: "May 24, 2026",
      helpful: 12,
      verified: true
    },
    {
      id: "rev-2",
      name: "Alex Mercer",
      rating: 5,
      title: "A masterpiece of a keyboard",
      comment: "I bought the Keychron Artisan Keyboard with Linear switches. The metal weight is robust, keys sound thick and creamy, and hot-swap worked perfectly with my customized keycaps.",
      date: "Jun 02, 2026",
      helpful: 8,
      verified: true
    },
    {
      id: "rev-3",
      name: "Maya Lin",
      rating: 4,
      title: "Stunning ambient light, short cable",
      comment: "The Horizon Smart Bar looks gorgeous synced behind my ultrawide screen. Renders colors with zero delay. Only minor issue is the USB-C cable was a bit tight for my desk path.",
      date: "Jun 11, 2026",
      helpful: 3,
      verified: true
    }
  ]);

  // 🎛️ Interaction Control States
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Track scroll position for sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsHeaderSticky(true);
      } else {
        setIsHeaderSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🍞 Toast Notifications Dispatcher
  const triggerToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // ➕ Add To Cart Logic
  const handleAddToCart = (product, color, size, qty) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.id === product.id && item.color === color && item.size === size
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += qty;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color,
            size,
            quantity: qty,
          },
        ];
      }
    });

    triggerToast(`Added ${qty}x ${product.name} (${color} / ${size}) to cart!`);
    trackViewedProduct(product.id);
  };

  // 📝 Update Cart Item Quantities
  const handleUpdateQuantity = (productId, color, size, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, color, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.color === color && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  // 🗑️ Remove Cart Item
  const handleRemoveItem = (productId, color, size) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.color === color && item.size === size)
      )
    );
    triggerToast("Item removed from cart.", "info");
  };

  // ❤️ Toggle Wishlist Logic
  const handleToggleWishlist = (productId) => {
    const product = products.find((p) => p.id === productId);
    setWishlist((prevList) => {
      if (prevList.includes(productId)) {
        triggerToast(`Removed ${product?.name || "item"} from Wishlist.`, "info");
        return prevList.filter((id) => id !== productId);
      } else {
        triggerToast(`Added ${product?.name || "item"} to Wishlist!`, "success");
        return [...prevList, productId];
      }
    });
  };

  // 👁️ Quick View Handler
  const handleQuickViewLaunch = (product) => {
    setActiveQuickViewProduct(product);
    trackViewedProduct(product.id);
  };

  // 🕵️ Track Recently Viewed History
  const trackViewedProduct = (productId) => {
    setRecentlyViewed((prev) => {
      // Remove duplication and place the newest at the start
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, 4); // Limit to last 4 items
    });
  };

  // ✍️ Submit Customer Review
  const handleAddReview = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    triggerToast("Thank you! Your review has been published.", "success");
  };

  const scrollToShop = () => {
    const shopSection = document.getElementById("shop");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const styles = {
    pageWrapper: {
      backgroundColor: "#0C0C0F",
      color: "#FFFFFF",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
    },
    header: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "80px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 8%",
      zIndex: 1000,
      transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
      backgroundColor: isHeaderSticky ? "rgba(12, 12, 15, 0.92)" : "transparent",
      borderBottom: isHeaderSticky ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid transparent",
      backdropFilter: isHeaderSticky ? "blur(12px)" : "none",
    },
    logo: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "24px",
      fontWeight: "800",
      letterSpacing: "-1px",
      cursor: "pointer",
      color: "#FFFFFF",
      textDecoration: "none",
    },
    navLinks: {
      display: "flex",
      gap: "30px",
      alignItems: "center",
    },
    navLink: {
      color: "rgba(255, 255, 255, 0.6)",
      textDecoration: "none",
      fontWeight: "600",
      fontSize: "14px",
      textTransform: "uppercase",
      letterSpacing: "1px",
      cursor: "pointer",
      transition: "color 0.2s ease",
    },
    iconArea: {
      display: "flex",
      alignItems: "center",
      gap: "24px",
    },
    iconButton: {
      background: "none",
      border: "none",
      color: "#FFFFFF",
      cursor: "pointer",
      position: "relative",
      fontSize: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "6px",
    },
    iconBadge: {
      position: "absolute",
      top: "-2px",
      right: "-2px",
      backgroundColor: "#10B981",
      color: "#FFFFFF",
      fontSize: "9px",
      fontWeight: "800",
      borderRadius: "50%",
      width: "16px",
      height: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
    },
    // Floating Toasts Stack
    toastsStack: {
      position: "fixed",
      bottom: "30px",
      left: "30px",
      zIndex: 5000,
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    toastCard: {
      backgroundColor: "#111116",
      color: "#FFFFFF",
      borderLeft: "4px solid #10B981",
      borderTop: "1px solid rgba(255, 255, 255, 0.08)",
      borderRight: "1px solid rgba(255, 255, 255, 0.08)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
      borderRadius: "0 8px 8px 0",
      padding: "16px 24px",
      fontSize: "14px",
      fontWeight: "600",
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.4)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      animation: "toastIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards",
      maxWidth: "340px",
    },
    // Footer Section
    footer: {
      backgroundColor: "#08080A",
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      padding: "100px 8% 40px",
    },
    footerGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "50px",
      marginBottom: "60px",
    },
    footerBrandColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    footerLogo: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "28px",
      fontWeight: "800",
      letterSpacing: "-1px",
      color: "#FFFFFF",
    },
    footerText: {
      fontSize: "13px",
      color: "rgba(255, 255, 255, 0.5)",
      lineHeight: "1.6",
      margin: 0,
    },
    footerTitle: {
      fontFamily: "'Syne', sans-serif",
      fontSize: "14px",
      fontWeight: "800",
      textTransform: "uppercase",
      color: "rgba(255, 255, 255, 0.4)",
      letterSpacing: "1px",
      marginBottom: "20px",
    },
    footerLinks: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    footerLink: {
      color: "rgba(255, 255, 255, 0.6)",
      textDecoration: "none",
      fontSize: "14px",
      transition: "color 0.2s",
      cursor: "pointer",
    },
    footerBottom: {
      borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      paddingTop: "30px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
      fontSize: "12px",
      color: "rgba(255, 255, 255, 0.4)",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      {/* 🚀 CSS Animation Definitions Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        
        /* Smooth Custom Scrollbars */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #0C0C0F;
        }
        ::-webkit-scrollbar-thumb {
          background: #24242A;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #10B981;
        }

        /* Nav link hover state */
        .header-nav-link:hover {
          color: #10B981 !important;
        }

        /* Toast entry keyframes */
        @keyframes toastIn {
          from { transform: translateX(-40px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* 🧭 Sticky Dark Header */}
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate("/")}>
          NEXTGEN<span style={{ color: "#10B981" }}>.</span>
        </div>

        <nav style={styles.navLinks}>
          <a href="#hero" className="header-nav-link" style={styles.navLink}>Home</a>
          <a href="#categories" className="header-nav-link" style={styles.navLink}>Collections</a>
          <a href="#shop" className="header-nav-link" style={styles.navLink}>Shop</a>
          <a href="#ai-rec" className="header-nav-link" style={styles.navLink}>AI Assist</a>
          <a href="#reviews" className="header-nav-link" style={styles.navLink}>Reviews</a>
        </nav>

        <div style={styles.iconArea}>
          {/* Wishlist Icon */}
          <button 
            style={styles.iconButton} 
            title="View Wishlist"
            onClick={() => {
              if (wishlist.length === 0) {
                triggerToast("Your Wishlist is currently empty.", "info");
              } else {
                triggerToast(`You have ${wishlist.length} item(s) saved in your Wishlist.`, "info");
              }
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#10B981"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#FFFFFF"}
          >
            ♡
            {wishlist.length > 0 && <span style={styles.iconBadge}>{wishlist.length}</span>}
          </button>

          {/* Cart Icon Drawer Trigger */}
          <button 
            style={styles.iconButton} 
            onClick={() => setIsCartOpen(true)}
            title="Open Cart"
            onMouseEnter={(e) => e.currentTarget.style.color = "#10B981"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#FFFFFF"}
          >
            🛒
            {cartCount > 0 && <span style={styles.iconBadge}>{cartCount}</span>}
          </button>
        </div>
      </header>

      {/* ⚡ HERO BANNER SLIDER */}
      <Hero onExploreClick={scrollToShop} />

      {/* 🎪 CATEGORY TILES SHOWCASE */}
      <Categories onSelectCategory={(slug) => {
        setSelectedCategory(slug);
        scrollToShop();
      }} />

      {/* 🛍️ FEATURED PRODUCTS GRID */}
      <FeaturedProducts 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        onQuickView={handleQuickViewLaunch}
        onAddToCart={handleAddToCart}
      />

      {/* 🧠 AI RECOMMENDATIONS ENGINE */}
      <AIRecommendations 
        onAddToCart={handleAddToCart}
        onQuickView={handleQuickViewLaunch}
      />

      {/* 💬 CUSTOMER REVIEWS FEEDBACK */}
      <CustomerReviews 
        reviews={reviews}
        onAddReview={handleAddReview}
      />

      {/* 🕵️ RECENTLY VIEWED / RECOMMENDATIONS SLIDER */}
      <RecentlyViewed 
        recentlyViewedIds={recentlyViewed}
        onQuickView={handleQuickViewLaunch}
        onAddToCart={handleAddToCart}
      />

      {/* 🛡️ SECURITY & TRUST GUARANTEES BADGES */}
      <TrustBadges />

      {/* 🦶 ELEGANT FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerGrid}>
          <div style={styles.footerBrandColumn}>
            <div style={styles.footerLogo}>NEXTGEN<span style={{ color: "#10B981" }}>.</span></div>
            <p style={styles.footerText}>
              Engineering high-fidelity hardware, audio gear, and automated tools for the modern workspace.
            </p>
          </div>

          <div>
            <h5 style={styles.footerTitle}>Collections</h5>
            <div style={styles.footerLinks}>
              <a href="#shop" style={styles.footerLink} className="header-nav-link" onClick={() => setSelectedCategory("premium-audio")}>Audio Gear</a>
              <a href="#shop" style={styles.footerLink} className="header-nav-link" onClick={() => setSelectedCategory("smart-tech")}>Smart Tech</a>
              <a href="#shop" style={styles.footerLink} className="header-nav-link" onClick={() => setSelectedCategory("workspace-gear")}>Workspace Tooling</a>
              <a href="#shop" style={styles.footerLink} className="header-nav-link" onClick={() => setSelectedCategory("minimalist-living")}>Lifestyles</a>
            </div>
          </div>

          <div>
            <h5 style={styles.footerTitle}>Support</h5>
            <div style={styles.footerLinks}>
              <a style={styles.footerLink} className="header-nav-link" onClick={() => triggerToast("Track order page is a demo link.", "info")}>Track Order</a>
              <a style={styles.footerLink} className="header-nav-link" onClick={() => triggerToast("Return portal is a demo link.", "info")}>Easy Returns</a>
              <a style={styles.footerLink} className="header-nav-link" onClick={() => triggerToast("Help center is a demo link.", "info")}>Help Center</a>
              <a style={styles.footerLink} className="header-nav-link" onClick={() => navigate("/connect")}>Connect Desk</a>
            </div>
          </div>

          <div>
            <h5 style={styles.footerTitle}>Newsletter</h5>
            <p style={{ ...styles.footerText, marginBottom: "16px" }}>Subscribe for product launches and secret discounts.</p>
            <div style={{ display: "flex", gap: "10px" }}>
              <input 
                type="email" 
                placeholder="Enter email" 
                style={{
                  backgroundColor: "#111116",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "20px",
                  padding: "10px 16px",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  flex: 1,
                  outline: "none"
                }} 
              />
              <button 
                style={{
                  backgroundColor: "#10B981",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "20px",
                  padding: "10px 16px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0F9F70"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#10B981"}
                onClick={() => triggerToast("Subscribed! Check your inbox soon.", "success")}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <span>© {new Date().getFullYear()} NextGen Inc. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => triggerToast("Privacy details are a mockup.", "info")}>Privacy</span>
            <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => triggerToast("Terms details are a mockup.", "info")}>Terms</span>
          </div>
        </div>
      </footer>

      {/* 🛒 CART DRAWER SIDEBAR */}
      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* 👁️ PRODUCT QUICK VIEW MODAL */}
      <QuickViewModal 
        product={activeQuickViewProduct}
        onClose={() => setActiveQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 🍞 FLOATING TOASTS NOTIFICATIONS */}
      <div style={styles.toastsStack}>
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            style={{
              ...styles.toastCard,
              borderLeftColor: toast.type === "success" ? "#10B981" : "#FBBF24"
            }}
          >
            <span>{toast.type === "success" ? "✓" : "🛈"}</span>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home3;
