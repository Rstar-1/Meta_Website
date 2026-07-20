import { memo, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Dropdown from "../common/Dropdown";
import { products as productsData } from "../../utils/apiData";
import headerConfig from "../../data/header.json";
import Fields from "../common/Fields";

const Header = () => {
  const navigate = useNavigate();
  const [activeTopDropdown, setActiveTopDropdown] = useState(null);
  const [activeMainNavMenu, setActiveMainNavMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    submenu.map((sub, sIdx) => (
      sub.type === "tel" ? (
        <a key={sIdx} href={sub.href} className="drop-item">{sub.label}</a>
      ) : sub.type === "external" ? (
        <a key={sIdx} href={sub.href} target="_blank" rel="noreferrer" className="drop-item">{sub.label}</a>
      ) : (
        <NavLink key={sIdx} to={sub.path} className="drop-item">{sub.label}</NavLink>
      )
    ))
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
        style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #f1f5f9" }}
        className="sm-hidden md-hidden"
      >
        <div className="flex items-center justify-between w-full" style={{ minHeight: "52px" }}>

          {/* LEFT: BRAND LOGO */}
          <div className="flex items-center">
            <NavLink to={headerConfig.logo.path} className="flex items-center" style={{ textDecoration: 'none' }}>
              <Image
                src={headerConfig.logo.src}
                alt={headerConfig.logo.alt}
                width="155"
                height="46"
                loading="eager"
                style={{ maxHeight: '46px', width: 'auto', objectFit: 'contain' }}
              />
            </NavLink>
          </div>

          {/* MIDDLE LEFT LINKS */}
          <div className="flex items-center ml-20">
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

          {/* RIGHT UTILITY LINKS */}
          <div className="flex items-center">
            {/* SEARCH WITH DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => setIsSearchOpen(true)}
              onMouseLeave={() => setIsSearchOpen(false)}
            >
              <div
                className="top-nav-link"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Icon name="Search" width="14" height="14" stroke="currentColor" /> SEARCH <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
              </div>
              <Dropdown
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                align="right"
                minWidth="340px"
                padding="10px"
                style={{ top: "100%", zIndex: 1001 }}
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
              </Dropdown>
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
      <div className="hidden md-block sm-block px-15 py-10" style={{ borderBottom: "1px solid #e2e8f0", position: "sticky", top: 0, zIndex: 999, backgroundColor: "#ffffff" }}>
        <div className="flex items-center justify-between w-full">
          <NavLink to="/" className="flex items-center">
            <Image
              src={headerConfig.logo.src}
              alt={headerConfig.logo.alt}
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
      <Container
        as="nav"
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
        <div className="flex items-center justify-between gap-8 w-full" style={{ minHeight: "48px" }}>

          {headerConfig.mainNav.map((item) => {
            if (!item.hasDropdown) {
              return (
                <NavLink key={item.id} to={item.path} className="cat-nav-link">
                  <Icon name={item.icon} width="16" height="16" /> {item.label}
                </NavLink>
              );
            }

            return (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveMainNavMenu(item.id)}
                onMouseLeave={() => setActiveMainNavMenu(null)}
              >
                <NavLink to={item.path} className="cat-nav-link">
                  <Icon name={item.icon} width="16" height="16" /> {item.label} <Icon name="ChevronDown" width="10" height="10" stroke="currentColor" />
                </NavLink>

                <Dropdown
                  isOpen={activeMainNavMenu === item.id}
                  align="left"
                  minWidth="480px"
                  padding="16px"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px"
                  }}
                >
                  <div>
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
            {headerConfig.mainNav.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={() => setIsMobileOpen(false)}
                className="py-10 border-b text-dark font-600 small-text flex items-center justify-between"
                style={{ textDecoration: 'none' }}
              >
                <span className="flex items-center gap-8">
                  <Icon name={item.icon} width="16" height="16" /> {item.label}
                </span>
                {item.hasDropdown && <Icon name="ChevronRight" width="14" height="14" stroke="currentColor" />}
              </NavLink>
            ))}

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
