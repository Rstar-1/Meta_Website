import { memo, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Dropdown from "../common/Dropdown";
import { products as productsData, categories as categoriesData, client as clientData } from "../../utils/apiData";
import headerConfig from "../../data/header.json";
import Fields from "../common/Fields";
import { resolveProductImage } from "../../utils/imageResolver";

const Header = () => {
  const navigate = useNavigate();
  const navItems = categoriesData.slice(0, 6).map(cat => ({
    id: cat.id,
    label: cat.name.toUpperCase(),
    icon: cat.iconName || "Grid",
    path: "/products",
    hasDropdown: true,
    category: cat.id,
    dropdownTitle: cat.name.toUpperCase(),
    cardTitle: cat.name,
    cardDesc: cat.description,
    cardLinkText: cat.name.toLowerCase().includes("curtain") ? "View All Curtains" :
      cat.name.toLowerCase().includes("sheet") ? "View All Sheets" :
        cat.name.toLowerCase().includes("roll") ? "View All Rolls" :
          cat.name.toLowerCase().includes("film") ? "View All Films" :
            `View All ${cat.name}`
  }));
  const [activeTopDropdown, setActiveTopDropdown] = useState(null);
  const [activeMainNavMenu, setActiveMainNavMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    if (!isMobileOpen) {
      setActiveMobileSubmenu(null);
      setExpandedCategory(null);
    }
  }, [isMobileOpen]);

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

  const renderTopSubmenu = (submenu) => (
    submenu.map((sub, sIdx) => {
      let label = sub.label;
      let href = sub.href;
      const phoneEnv = import.meta.env.VITE_PHONE;
      if (phoneEnv) {
        if (sub.type === "tel") {
          label = `Call +91 ${phoneEnv.slice(0, 5)} ${phoneEnv.slice(5)}`;
          href = `tel:+91${phoneEnv}`;
        } else if (sub.type === "external" && href.includes("wa.me")) {
          href = `https://wa.me/91${phoneEnv}`;
        }
      }
      return sub.type === "tel" ? (
        <a key={sIdx} href={href} className="drop-item">{label}</a>
      ) : sub.type === "external" ? (
        <a key={sIdx} href={href} target="_blank" rel="noreferrer" className="drop-item">{label}</a>
      ) : (
        <NavLink key={sIdx} to={sub.path} className="drop-item">{label}</NavLink>
      );
    })
  );

  return (
    <>
      <style>{`
        .top-nav-link {
          font-size: 11px;
          font-weight: 600;
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
          font-weight: 500;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: var(--dark);
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
      <Container
        as="header"
        className="sm-hidden md-hidden bg-white bordb"
      >
        <div className="flex items-center justify-between w-full" style={{ minHeight: "52px" }}>

          {/* LEFT: BRAND LOGO */}
          <div className="flex items-center gap-12">
            <NavLink to={headerConfig.logo.path} className="flex items-center" style={{ textDecoration: 'none' }}>
              <Image
                src={headerConfig.logo.src}
                alt={headerConfig.logo.alt}
                width="155"
                height="46"
                loading="eager"
                fetchPriority="high"
                decoding="sync"
                style={{ maxHeight: '46px', width: 'auto', objectFit: 'contain' }}
              />
            </NavLink>
            <div className="ml-30 flex items-center">
              {headerConfig.topNav.left.map((item, idx) => (
                <div key={item.id} className="flex items-center">
                  {idx > 0 && <div className="header-v-divider" />}
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveTopDropdown(item.id)}
                      onMouseLeave={() => setActiveTopDropdown(null)}
                    >
                      <span className="top-nav-link">
                        {item.label} <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                      </span>
                      <Dropdown isOpen={activeTopDropdown === item.id} align="left">
                        {renderTopSubmenu(item.submenu)}
                      </Dropdown>
                    </div>
                  ) : (
                    <NavLink to={item.path} className="top-nav-link">
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* RIGHT UTILITY LINKS */}
          <div className="flex items-center">
            {/* SEARCH INLINE UTILITY */}
            <div className="relative flex items-center" style={{ minWidth: isSearchOpen ? "210px" : "auto", transition: "all 0.2s ease" }}>
              {isSearchOpen ? (
                <div className="relative flex items-center w-full">
                  <Fields
                    type="input"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(val) => setSearchQuery(val)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setIsSearchOpen(false);
                        navigate(`/products?search=${searchQuery}`);
                      }
                    }}
                    onBlur={() => {
                      setTimeout(() => {
                        if (!searchQuery) setIsSearchOpen(false);
                      }, 200);
                    }}
                    autoFocus
                  />
                  <span
                    onClick={() => {
                      if (searchQuery) {
                        setIsSearchOpen(false);
                        navigate(`/products?search=${searchQuery}`);
                      } else {
                        setIsSearchOpen(false);
                      }
                    }}
                    style={{
                      position: "absolute",
                      right: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      color: "#64748b"
                    }}
                  >
                    <Icon name="Search" width="12" height="12" stroke="currentColor" />
                  </span>
                </div>
              ) : (
                <div
                  className="top-nav-link"
                  onClick={() => setIsSearchOpen(true)}
                  style={{ display: "flex", alignItems: "center", gap: "4px" }}
                >
                  <Icon name="Search" width="14" height="14" stroke="currentColor" /> SEARCH
                </div>
              )}
            </div>

            <div className="header-v-divider" />

            {headerConfig.topNav.right.map((item, idx) => (
              <div key={item.id} className="flex items-center">
                {idx > 0 && <div className="header-v-divider" />}
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveTopDropdown(item.id)}
                    onMouseLeave={() => setActiveTopDropdown(null)}
                  >
                    <span className="top-nav-link">
                      {item.label} <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                    </span>
                    <Dropdown isOpen={activeTopDropdown === item.id} align="right">
                      {renderTopSubmenu(item.submenu)}
                    </Dropdown>
                  </div>
                ) : (
                  <NavLink to={item.path} className="top-nav-link">
                    {item.label}
                  </NavLink>
                )}
              </div>
            ))}

            <div className="header-v-divider" />

            {/* ACCOUNT USER ICON */}
            <NavLink to="/connect" className="top-nav-link p-4" title="User Account">
              <Icon name="Users" width="17" height="17" stroke="currentColor" />
            </NavLink>

            <div className="header-v-divider" />

            {/* SHOPPING BAG CART ICON */}
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

      {/* MOBILE HEADER BAR */}
      <div className="hidden md-block sm-block px-15 py-10 sticky top-0 left-0 z-99 bg-white">
        <div className="flex items-center justify-between w-full">
          <NavLink to="/" className="flex items-center">
            <Image
              src={headerConfig.logo.src}
              alt={headerConfig.logo.alt}
              width="150"
              height="40"
              className="flex object-contain"
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
      <Container
        as="nav"
        className="sm-hidden md-hidden bg-white bdrdh bordb sticky top-0 z-99"
      >
        <div className="flex items-center justify-between gap-8 w-full" style={{ minHeight: "48px" }}>

          {navItems.map((item, index) => {
            if (!item.hasDropdown) {
              return (
                <Link key={item.id} to={item.path} className="cat-nav-link">
                  <Icon name={item.icon} width="16" height="16" /> {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveMainNavMenu(item.id)}
                onMouseLeave={() => setActiveMainNavMenu(null)}
              >
                <Link to={item.path} className="cat-nav-link">
                  <Icon name={item.icon} width="16" height="16" /> {item.label} <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                </Link>

                <Dropdown
                  isOpen={activeMainNavMenu === item.id}
                  align={index >= navItems.length - 3 ? "right" : "left"}
                  minWidth="480px"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px"
                  }}
                >
                  <div className="p-12">
                    <p className="text-gray font-700 mini-text uppercase tracking-wider mb-8">{item.dropdownTitle}</p>
                    {productsData.filter(p => p.category === item.category).slice(0, 5).map(prod => (
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
                      <p className="text-dark font-600 small-text m-0">{item.cardTitle}</p>
                      <p className="text-gray mini-text mt-4">{item.cardDesc}</p>
                    </div>
                    <span
                      className="text-primary font-600 mini-text mt-10 cursor-pointer flex items-center gap-4"
                      onClick={() => handleProductClick(null, item.category)}
                    >
                      {item.cardLinkText} <Icon name="ArrowRight" width="10" height="10" stroke="currentColor" />
                    </span>
                  </div>
                </Dropdown>
              </div>
            );
          })}

        </div>
      </Container>

      {/* MOBILE DRAWER */}
      {isMobileOpen && (
        <div
          className="hidden md-block sm-block fixed top-0 left-0 h-full overflow-auto z-99 bg-white w-full"
        >
          {/* DRAWER HEADER */}
          <div
            className="bg-white flex items-center justify-between p-12 bordb"
          >
            {activeMobileSubmenu ? (
              <Button
                onClick={() => setActiveMobileSubmenu(null)}
                icon="ChevronLeft"
                iconWidth="16"
                iconHeight="16"
                iconStrokeWidth="3"
                text="BACK"
                version="v0"
                bg="transparent"
                style={{
                  background: "none",
                  border: "none",
                  color: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  padding: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}
              />
            ) : (
              <NavLink to="/" onClick={() => { setIsMobileOpen(false); setActiveMobileSubmenu(null); }}>
                <Image
                  src={headerConfig.logo.src}
                  alt={headerConfig.logo.alt}
                  width="150"
                  height="40"
                  className="flex object-contain"
                />
              </NavLink>
            )}

            <Button
              onClick={() => { setIsMobileOpen(false); setActiveMobileSubmenu(null); }}
              icon="Close"
              iconWidth="18"
              iconHeight="18"
              version="icon"
              bg="dark"
            />
          </div>

          {/* DRAWER CONTENT */}
          <div style={{ flex: 1, overflowY: "auto" }}>
            {!activeMobileSubmenu ? (
              // SCREEN 1: MAIN MENU
              <div>
                {/* SEARCH BAR */}
                <div className="py-16 px-20 bordb">
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

                {/* EXPLORE PRODUCTS LINK */}
                <div
                  onClick={() => setActiveMobileSubmenu({ id: "categories", name: "Explore Products" })}
                  className="flex items-center justify-between py-16 px-20 bordb"
                >
                  <div className="flex items-center gap-12">
                    <Icon name="Product" width="16" height="16" stroke="#1f2937" />
                    <p className="small-text text-dark font-500">
                      Explore Products
                    </p>
                  </div>
                  <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
                </div>

                {/* CATEGORY LINK */}
                <div
                  onClick={() => {
                    setIsMobileOpen(false);
                    navigate("/category");
                  }}
                  className="flex items-center justify-between py-16 px-20 bordb"
                >
                  <div className="flex items-center gap-12">
                    <Icon name="Grid" width="16" height="16" stroke="#1f2937" />
                    <p className="small-text text-dark font-500">
                      Category
                    </p>
                  </div>
                  <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
                </div>

                {/* CORPORATE LINK */}
                <div
                  onClick={() => setActiveMobileSubmenu({ id: "corporate", name: "Corporate" })}
                  className="flex items-center justify-between py-16 px-20 bordb"
                >
                  <div className="flex items-center gap-12">
                    <Icon name="Award" width="16" height="16" stroke="#1f2937" />
                    <p className="small-text text-dark font-500">
                      Corporate
                    </p>
                  </div>
                  <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
                </div>

                {/* RESOURCES LINK */}
                <div
                  onClick={() => setActiveMobileSubmenu({ id: "resources", name: "Resources" })}
                  className="flex items-center justify-between py-16 px-20 bordb"
                >
                  <div className="flex items-center gap-12">
                    <Icon name="Layers" width="16" height="16" stroke="#1f2937" />
                    <p className="small-text text-dark font-500">
                      Resources
                    </p>
                  </div>
                  <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
                </div>

                {/* SUPPLIER LINK */}
                <div
                  onClick={() => {
                    setIsMobileOpen(false);
                    navigate("/supplier/Ashmita");
                  }}
                  className="flex items-center justify-between py-16 px-20 bordb"
                >
                  <div className="flex items-center gap-12">
                    <Icon name="Users" width="16" height="16" stroke="#1f2937" />
                    <p className="small-text text-dark font-500">
                      Supplier Detail
                    </p>
                  </div>
                  <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
                </div>

                {/* WHERE TO BUY */}
                <div
                  onClick={() => {
                    setIsMobileOpen(false);
                    navigate("/wheretobuy");
                  }}
                  className="flex items-center justify-between py-16 px-20 bordb"
                >
                  <div className="flex items-center gap-12">
                    <Icon name="MapPin" width="16" height="16" stroke="#1f2937" />
                    <p className="small-text text-dark font-500">
                      Where To Buy
                    </p>
                  </div>
                  <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
                </div>
              </div>
            ) : (
              // SCREEN 2: SUBMENU VIEW
              <div>
                {/* ALL CATEGORIES SUBMENU */}
                {activeMobileSubmenu.id === "categories" && (
                  <div>
                    {categoriesData.map((cat) => {
                      const isExpanded = expandedCategory === cat.id;
                      return (
                        <div key={cat.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                          <div
                            onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                            className={`flex items-center justify-between py-16 px-20 cursor-pointer ${isExpanded ? "bg-tertiary" : "bg-transparent"}`}

                          >
                            <div className="flex items-center gap-12">
                              <Icon name={cat.iconName || "Grid"} width="18" height="18" stroke={isExpanded ? "#f25c2b" : "#1f2937"} />
                              <p className="small-text text-dark font-500">
                                {cat.name}
                              </p>
                            </div>
                            <Icon name={isExpanded ? "ChevronDown" : "ChevronRight"} width="16" height="16" stroke={isExpanded ? "#f25c2b" : "#9ca3af"} />
                          </div>
                          {isExpanded && (
                            <div style={{ background: '#fafafa4b' }} className="px-16 py-5">
                              <p
                                onClick={() => {
                                  setIsMobileOpen(false);
                                  setActiveMobileSubmenu(null);
                                  setExpandedCategory(null);
                                  navigate("/products", { state: { category: cat.id } });
                                }}
                                className="font-400 text-primary small-text flex items-center gap-12 py-10"
                              >
                                View All {cat.name} <Icon name="ArrowRight" width="12" height="12" stroke="currentColor" />
                              </p>
                              {productsData.filter(p => p.category === cat.id).length > 0 ? (
                                productsData.filter(p => p.category === cat.id).map((prod) => (
                                  <p
                                    key={prod.id}
                                    onClick={() => {
                                      setIsMobileOpen(false);
                                      setActiveMobileSubmenu(null);
                                      setExpandedCategory(null);
                                      navigate(`/product-detail/${prod.id}`);
                                    }}
                                    className="text-gray font-400 text-gray small-text flex items-center gap-12 bordh py-10"
                                  >
                                    {prod.name}
                                  </p>
                                ))
                              ) : (
                                <div className="py-8 text-gray small-text">
                                  No products available in this category.
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* CATEGORY SUBMENU */}
                {activeMobileSubmenu.id.startsWith("cat-") && (
                  <div>
                    {productsData.filter(p => p.category === activeMobileSubmenu.id).length > 0 ? (
                      productsData.filter(p => p.category === activeMobileSubmenu.id).map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            setIsMobileOpen(false);
                            setActiveMobileSubmenu(null);
                            navigate(`/product-detail/${prod.id}`);
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "16px 20px",
                            borderBottom: "1px solid #f3f4f6",
                            cursor: "pointer"
                          }}
                        >
                          <Image
                            src={resolveProductImage(prod)}
                            alt={prod.name}
                            width="54"
                            height="54"
                            style={{
                              width: "54px",
                              height: "54px",
                              borderRadius: "6px",
                              objectFit: "cover",
                              backgroundColor: "#f3f4f6"
                            }}
                          />
                          <span style={{ fontSize: "15px", fontWeight: "500", color: "#1f2937", marginLeft: "16px" }}>
                            {prod.name}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: "30px", textAlign: "center", color: "#6b7280", fontSize: "14px" }}>
                        No products available in this category.
                      </div>
                    )}
                  </div>
                )}

                {/* CORPORATE SUBMENU */}
                {activeMobileSubmenu.id === "corporate" && (
                  <div>
                    {[
                      { label: "About SOBO Solutions", path: "/about" },
                      { label: "Management Message", path: "/about" },
                      { label: "News & Media", path: "/blog" }
                    ].map((sub, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setIsMobileOpen(false);
                          setActiveMobileSubmenu(null);
                          navigate(sub.path);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "18px 20px",
                          borderBottom: "1px solid #f3f4f6",
                          cursor: "pointer"
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "6px",
                            backgroundColor: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#1d4ed8"
                          }}
                        >
                          <Icon name={idx === 0 ? "Info" : idx === 1 ? "MessageSquare" : "FileText"} width="18" height="18" stroke="currentColor" />
                        </div>
                        <span style={{ fontSize: "15px", fontWeight: "500", color: "#1f2937", marginLeft: "16px" }}>
                          {sub.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* RESOURCES SUBMENU */}
                {activeMobileSubmenu.id === "resources" && (
                  <div>
                    {[
                      { label: "All Product Catalog", path: "/products" },
                      { label: "Blogs & Technical Insights", path: "/blog" },
                      { label: "Supplier Network", path: "/wheretobuy" }
                    ].map((sub, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          setIsMobileOpen(false);
                          setActiveMobileSubmenu(null);
                          navigate(sub.path);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "18px 20px",
                          borderBottom: "1px solid #f3f4f6",
                          cursor: "pointer"
                        }}
                      >
                        <div
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "6px",
                            backgroundColor: "#f0fdf4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#16a34a"
                          }}
                        >
                          <Icon name={idx === 0 ? "Grid" : idx === 1 ? "BookOpen" : "Layers"} width="18" height="18" stroke="currentColor" />
                        </div>
                        <span style={{ fontSize: "15px", fontWeight: "500", color: "#1f2937", marginLeft: "16px" }}>
                          {sub.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

    </>
  );
};

export default Header;
