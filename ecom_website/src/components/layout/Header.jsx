import { memo, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import Icon from "../common/Icon";
import { header as headerData, products as productsData, categories as categoryData } from "../../utils/apiData";
import Fields from "../common/Fields";

const logoImg = "/sobo_logo.webp";

// Custom SVG Icons matching the screenshot
const CategoryIcons = {
  Sheets: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="7" y1="7" x2="17" y2="7"></line>
      <line x1="7" y1="12" x2="13" y2="12"></line>
    </svg>
  ),
  Rolls: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="12" cy="6" rx="8" ry="3"></ellipse>
      <path d="M4 6v12c0 1.66 3.58 3 8 3s8-1.34 8-3V6"></path>
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"></path>
    </svg>
  ),
  Layers: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  ),
  GridDots: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <circle cx="5" cy="6" r="2" />
      <circle cx="12" cy="6" r="2" />
      <circle cx="19" cy="6" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="12" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
    </svg>
  ),
  Building: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
      <path d="M6 12H4a2 2 0 0 0-2 2v8h4"></path>
      <path d="M18 9h2a2 2 0 0 1 2 2v11h-4"></path>
      <path d="M10 6h4"></path>
      <path d="M10 10h4"></path>
      <path d="M10 14h4"></path>
      <path d="M10 18h4"></path>
    </svg>
  ),
  Media: (props) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2z"></path>
      <rect x="6" y="6" width="5" height="5"></rect>
      <line x1="14" y1="6" x2="18" y2="6"></line>
      <line x1="14" y1="10" x2="18" y2="10"></line>
      <line x1="6" y1="15" x2="18" y2="15"></line>
      <line x1="6" y1="18" x2="18" y2="18"></line>
    </svg>
  )
};

const Header = () => {
  const navigate = useNavigate();
  const [activeTopDropdown, setActiveTopDropdown] = useState(null);
  const [activeMainNavMenu, setActiveMainNavMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const searchToggleRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        searchToggleRef.current &&
        !searchToggleRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const updateCount = () => setCartCount(JSON.parse(localStorage.getItem('cart') || '[]').length);
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const handleProductClick = (productId, categoryName) => {
    setActiveMainNavMenu(null);
    setActiveTopDropdown(null);
    setIsSearchOpen(false);
    if (productId) {
      navigate(`/product-detail/${productId}`);
    } else if (categoryName) {
      navigate("/products", { state: { category: categoryName } });
    } else {
      navigate("/products");
    }
  };

  return (
    <>
      <style>{`
        .top-nav-link {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #1e293b;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 6px;
          transition: color 0.15s ease;
          cursor: pointer;
          font-family: inherit;
        }
        .top-nav-link:hover {
          color: #f25c2b !important;
        }
        .header-v-divider {
          width: 1px;
          height: 14px;
          background-color: #e2e8f0;
          margin: 0 12px;
          display: inline-block;
        }
        .cat-nav-link {
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #1e293b;
          text-decoration: none;
          padding: 14px 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          position: relative;
          cursor: pointer;
          white-space: nowrap;
        }
        .cat-nav-link:hover, .cat-nav-link.active {
          color: #f25c2b !important;
        }
        .cat-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #f25c2b;
          transition: all 0.2s ease;
          transform: translateX(-50%);
        }
        .cat-nav-link:hover::after, .cat-nav-link.active::after {
          width: 80%;
        }
        .drop-card {
          position: absolute;
          top: 100%;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
          border-radius: 6px;
          padding: 10px 0;
          min-width: 210px;
          z-index: 1000;
        }
        .drop-item {
          padding: 9px 16px;
          font-size: 12px;
          font-weight: 500;
          color: #334155;
          text-decoration: none;
          display: block;
          transition: all 0.15s ease;
        }
        .drop-item:hover {
          background-color: #f8fafc;
          color: #f25c2b;
          padding-left: 20px;
        }
      `}</style>

      {/* ROW 1: TOP MAIN HEADER BAR (LOGO & UTILITIES) */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #f1f5f9" }} className="sm-hidden md-hidden">
        <Container>
          <div className="flex items-center justify-between w-full" style={{ minHeight: "52px" }}>

            {/* LEFT: BRAND LOGO */}
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
                <Image
                  src={logoImg}
                  alt="SOBO Marketing Solution"
                  width="155"
                  height="46"
                  loading="eager"
                  style={{
                    maxHeight: '46px',
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                />
              </NavLink>
            </div>

            {/* MIDDLE LEFT LINKS */}
            <div className="flex items-center ml-20">
              {/* CORPORATE DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setActiveTopDropdown("corporate")}
                onMouseLeave={() => setActiveTopDropdown(null)}
              >
                <span className="top-nav-link">
                  CORPORATE <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                </span>
                {activeTopDropdown === "corporate" && (
                  <div className="drop-card" style={{ left: 0 }}>
                    <NavLink to="/about" className="drop-item">About SOBO Solutions</NavLink>
                    <NavLink to="/about" className="drop-item">Management Message</NavLink>
                    <NavLink to="/blog" className="drop-item">News &amp; Media</NavLink>
                  </div>
                )}
              </div>

              <div className="header-v-divider" />

              <NavLink to="/about" className="top-nav-link">
                INVESTOR RELATIONS
              </NavLink>

              <div className="header-v-divider" />

              {/* EXECUTED PROJECTS DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => setActiveTopDropdown("projects")}
                onMouseLeave={() => setActiveTopDropdown(null)}
              >
                <span className="top-nav-link">
                  EXECUTED PROJECTS <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                </span>
                {activeTopDropdown === "projects" && (
                  <div className="drop-card" style={{ left: 0 }}>
                    <NavLink to="/products" className="drop-item">Industrial Sheet Installations</NavLink>
                    <NavLink to="/products" className="drop-item">Cold Storage Enclosures</NavLink>
                    <NavLink to="/products" className="drop-item">Cleanroom Strip Curtains</NavLink>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT UTILITY LINKS */}
            <div className="flex items-center">
              {/* SEARCH */}
              <div
                ref={searchToggleRef}
                className="top-nav-link"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Icon name="Search" width="14" height="14" stroke="currentColor" /> SEARCH
              </div>

              <div className="header-v-divider" />

              {/* GET IN TOUCH */}
              <div
                className="relative"
                onMouseEnter={() => setActiveTopDropdown("touch")}
                onMouseLeave={() => setActiveTopDropdown(null)}
              >
                <span className="top-nav-link">
                  GET IN TOUCH <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                </span>
                {activeTopDropdown === "touch" && (
                  <div className="drop-card" style={{ right: 0 }}>
                    <NavLink to="/connect" className="drop-item">Submit RFQ Requirement</NavLink>
                    <a href="tel:+918779030638" className="drop-item">Call +91 87790 30638</a>
                    <a href="https://wa.me/918779030638" target="_blank" rel="noreferrer" className="drop-item">WhatsApp Support</a>
                  </div>
                )}
              </div>

              <div className="header-v-divider" />

              <NavLink to="/connect" className="top-nav-link">
                WHERE TO BUY
              </NavLink>

              <div className="header-v-divider" />

              {/* ACCOUNT USER ICON */}
              <NavLink to="/connect" className="top-nav-link p-4" title="User Account">
                <Icon name="Users" width="17" height="17" stroke="currentColor" />
              </NavLink>

              <div className="header-v-divider" />

              {/* SHOPPING BAG CART ICON WITH BLUE BADGE */}
              <NavLink
                to="/cart"
                className="relative top-nav-link"
                style={{ padding: "4px 8px" }}
                title="Enquiry Cart"
              >
                <Icon name="Bag" width="18" height="18" stroke="currentColor" />
                <span
                  className="absolute text-white rounded-full flex items-center justify-center font-700"
                  style={{
                    top: "-3px",
                    right: "-2px",
                    fontSize: "9px",
                    width: "16px",
                    height: "16px",
                    backgroundColor: "#0284c7"
                  }}
                >
                  {cartCount}
                </span>
              </NavLink>

            </div>
          </div>
        </Container>
      </header>

      {/* MOBILE HEADER BAR */}
      <div className="hidden md-block sm-block px-15 py-10" style={{ borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 999, backgroundColor: "#ffffff" }}>
        <div className="flex items-center justify-between w-full">
          <NavLink to="/" className="flex items-center">
            <Image
              src={logoImg}
              alt="SOBO Logo"
              width="120"
              height="36"
              style={{ maxHeight: "36px", objectFit: "contain" }}
            />
          </NavLink>

          <div className="flex items-center gap-12">
            <NavLink to="/cart" className="relative p-6">
              <Icon name="Bag" width="20" height="20" stroke="#1e293b" />
              <span
                className="absolute text-white rounded-full flex items-center justify-center font-700"
                style={{
                  top: "0px",
                  right: "0px",
                  fontSize: "9px",
                  width: "15px",
                  height: "15px",
                  backgroundColor: "#0284c7"
                }}
              >
                {cartCount}
              </span>
            </NavLink>

            <Button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              icon={isMobileOpen ? "Close" : "Menu"}
              iconWidth="24"
              iconHeight="24"
              version="v0"
              bg="transparent"
              style={{ color: "#1e293b", padding: "4px" }}
            />
          </div>
        </div>
      </div>

      {/* ROW 2: MAIN CATEGORY NAVIGATION BAR WITH ICONS - STICKY AT TOP */}
      <nav
        className="sm-hidden md-hidden"
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #f8fafc",
          borderBottom: "1px solid #e2e8f0",
          position: "sticky",
          top: 0,
          zIndex: 999,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}
      >
          <Container>
            <div className="flex items-center justify-between gap-8 w-full" style={{ minHeight: "48px" }}>

              {/* 1. PVC SHEETS & PANELS */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMainNavMenu("sheets")}
                onMouseLeave={() => setActiveMainNavMenu(null)}
              >
                <NavLink to="/products" className="cat-nav-link">
                  <CategoryIcons.Sheets /> PVC SHEETS &amp; PANELS <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                </NavLink>

                {activeMainNavMenu === "sheets" && (
                  <div
                    className="drop-card p-16"
                    style={{
                      left: 0,
                      width: "480px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px"
                    }}
                  >
                    <div>
                      <p className="text-gray font-700 mini-text uppercase tracking-wider mb-8">PVC Sheet Types</p>
                      {productsData.filter(p => p.category === 'cat-pvc-sheet').slice(0, 5).map(prod => (
                        <div
                          key={prod.id}
                          className="drop-item rounded-4 cursor-pointer"
                          onClick={() => handleProductClick(prod.id)}
                        >
                          {prod.name}
                        </div>
                      ))}
                    </div>
                    <div className="bg-tertiary p-12 rounded-6 flex flex-column justify-between">
                      <div>
                        <p className="text-dark font-600 small-text m-0">Industrial Grade PVC</p>
                        <p className="text-gray mini-text mt-4">100% Waterproof, Chemical Resistant Heavy-Duty Sheets.</p>
                      </div>
                      <span
                        className="text-primary font-600 mini-text mt-10 cursor-pointer flex items-center gap-4"
                        onClick={() => handleProductClick(null, 'cat-pvc-sheet')}
                      >
                        View All Sheets <Icon name="ArrowRight" width="10" height="10" stroke="currentColor" />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. PVC ROLLS & STRIP CURTAINS */}
              <div
                className="relative"
                onMouseEnter={() => setActiveMainNavMenu("rolls")}
                onMouseLeave={() => setActiveMainNavMenu(null)}
              >
                <NavLink to="/products" className="cat-nav-link">
                  <CategoryIcons.Rolls /> PVC ROLLS &amp; STRIP CURTAINS <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                </NavLink>

                {activeMainNavMenu === "rolls" && (
                  <div
                    className="drop-card p-16"
                    style={{
                      left: 0,
                      width: "480px",
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px"
                    }}
                  >
                    <div>
                      <p className="text-gray font-700 mini-text uppercase tracking-wider mb-8">Strip Curtains &amp; Rolls</p>
                      {productsData.filter(p => p.category === 'cat-pvc-roll').slice(0, 5).map(prod => (
                        <div
                          key={prod.id}
                          className="drop-item rounded-4 cursor-pointer"
                          onClick={() => handleProductClick(prod.id)}
                        >
                          {prod.name}
                        </div>
                      ))}
                    </div>
                    <div className="bg-tertiary p-12 rounded-6 flex flex-column justify-between">
                      <div>
                        <p className="text-dark font-600 small-text m-0">Cold Storage &amp; Anti-Insect</p>
                        <p className="text-gray mini-text mt-4">Ribbed &amp; Plain Strip Curtains with Stainless Steel Hangers.</p>
                      </div>
                      <span
                        className="text-primary font-600 mini-text mt-10 cursor-pointer flex items-center gap-4"
                        onClick={() => handleProductClick(null, 'cat-pvc-roll')}
                      >
                        View All Rolls <Icon name="ArrowRight" width="10" height="10" stroke="currentColor" />
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* 3. INDUSTRIAL MATERIALS */}
              <NavLink to="/products" className="cat-nav-link">
                <CategoryIcons.Layers /> INDUSTRIAL MATERIALS
              </NavLink>

              {/* 4. ALL PRODUCTS */}
              <NavLink to="/products" className="cat-nav-link">
                <CategoryIcons.GridDots /> ALL PRODUCTS
              </NavLink>

              {/* 5. ABOUT US */}
              <NavLink to="/about" className="cat-nav-link">
                <CategoryIcons.Building /> ABOUT US
              </NavLink>

              {/* 6. RESOURCES & MEDIA */}
              <NavLink to="/blog" className="cat-nav-link">
                <CategoryIcons.Media /> RESOURCES &amp; MEDIA
              </NavLink>

            </div>
          </Container>
        </nav>

        {/* SEARCH OVERLAY DROPDOWN */}
        {isSearchOpen && (
          <div
            ref={searchRef}
            className="absolute bg-white p-10 rounded-8 z-99 border-ec shadow-xl sm-hidden md-hidden"
            style={{
              top: "56px",
              right: "220px",
              width: "340px"
            }}
          >
            <Fields
              type="text"
              placeholder="Search products & solutions..."
              icon="Search"
              iconPosition="right"
              value={searchQuery}
              onChange={setSearchQuery}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsSearchOpen(false);
                  navigate(`/products?search=${searchQuery}`);
                }
              }}
              autoFocus
            />
          </div>
        )}

        {/* MOBILE DRAWER */}
        {isMobileOpen && (
          <div
            className="hidden md-block sm-block px-16 py-16 bg-white border-t"
            style={{
              maxHeight: "calc(100vh - 60px)",
              overflowY: "auto"
            }}
          >
            <div className="mb-14">
              <Fields
                type="text"
                placeholder="Search products..."
                icon="Search"
                iconPosition="right"
                value={searchQuery}
                onChange={setSearchQuery}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsMobileOpen(false);
                    navigate(`/products?search=${searchQuery}`);
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 gap-10">
              <NavLink
                to="/products"
                onClick={() => setIsMobileOpen(false)}
                className="py-10 border-b text-dark font-600 small-text flex items-center justify-between"
                style={{ textDecoration: 'none' }}
              >
                <span className="flex items-center gap-8"><CategoryIcons.Sheets /> PVC SHEETS &amp; PANELS</span>
                <Icon name="ChevronRight" width="14" height="14" stroke="currentColor" />
              </NavLink>
              <NavLink
                to="/products"
                onClick={() => setIsMobileOpen(false)}
                className="py-10 border-b text-dark font-600 small-text flex items-center justify-between"
                style={{ textDecoration: 'none' }}
              >
                <span className="flex items-center gap-8"><CategoryIcons.Rolls /> PVC ROLLS &amp; STRIP CURTAINS</span>
                <Icon name="ChevronRight" width="14" height="14" stroke="currentColor" />
              </NavLink>
              <NavLink
                to="/products"
                onClick={() => setIsMobileOpen(false)}
                className="py-10 border-b text-dark font-600 small-text flex items-center gap-8"
                style={{ textDecoration: 'none' }}
              >
                <CategoryIcons.Layers /> INDUSTRIAL MATERIALS
              </NavLink>
              <NavLink
                to="/products"
                onClick={() => setIsMobileOpen(false)}
                className="py-10 border-b text-dark font-600 small-text flex items-center gap-8"
                style={{ textDecoration: 'none' }}
              >
                <CategoryIcons.GridDots /> ALL PRODUCTS
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsMobileOpen(false)}
                className="py-10 border-b text-dark font-600 small-text flex items-center gap-8"
                style={{ textDecoration: 'none' }}
              >
                <CategoryIcons.Building /> ABOUT US
              </NavLink>
              <NavLink
                to="/connect"
                onClick={() => setIsMobileOpen(false)}
                className="py-10 border-b text-dark font-600 small-text flex items-center gap-8"
                style={{ textDecoration: 'none' }}
              >
                <CategoryIcons.Media /> RESOURCES &amp; MEDIA
              </NavLink>

              <Button
                text="Request Quote"
                version="v3"
                bg="primary"
                onClick={() => {
                  setIsMobileOpen(false);
                  navigate("/connect");
                }}
                className="mt-10"
              />
            </div>
          </div>
        )}

    </>
  );
};

export default Header;
