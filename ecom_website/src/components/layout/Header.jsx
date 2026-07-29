import { memo, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Dropdown from "../common/Dropdown";
import { products as productsData, categories as categoriesData } from "../../utils/apiData";
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
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  useEffect(() => {
    const updateCount = () => setCartCount(JSON.parse(localStorage.getItem('cart') || '[]').length);
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const closeMobile = () => { setIsMobileOpen(false); setActiveMobileSubmenu(null); };

  const handleProductClick = (productId, categoryName) => {
    setActiveMainNavMenu(null);
    setActiveTopDropdown(null);
    setIsSearchOpen(false);
    if (productId) navigate(`/product-detail/${productId}`);
    else if (categoryName) navigate("/products", { state: { category: categoryName } });
    else navigate("/products");
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
        <a key={sIdx} href={href} className="drop-item"><p className="mini-text font-500 px-6 py-2">{label}</p></a>
      ) : sub.type === "external" ? (
        <a key={sIdx} href={href} target="_blank" rel="noreferrer" className="drop-item"><p className="mini-text font-500 px-6 py-2">{label}</p></a>
      ) : (
        <NavLink key={sIdx} to={sub.path} className="drop-item"><p className="mini-text font-500 px-6 py-2">{label}</p></NavLink>
      );
    })
  );

  /* ── Shared TopNav item renderer (used for both left + right) ── */
  const renderTopNavItem = (item, idx, align) => (
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
          <Dropdown isOpen={activeTopDropdown === item.id} align={align}>
            {renderTopSubmenu(item.submenu)}
          </Dropdown>
        </div>
      ) : (
        <NavLink to={item.path} className="top-nav-link">{item.label}</NavLink>
      )}
    </div>
  );

  /* ── Mobile: generic row link ── */
  const MobileRow = ({ icon, label, onClick }) => (
    <div onClick={onClick} className="flex items-center justify-between py-16 px-20 bordb" style={{ cursor: "pointer" }}>
      <div className="flex items-center gap-12">
        <Icon name={icon} width="16" height="16" stroke="#1f2937" />
        <p className="small-text text-dark font-500">{label}</p>
      </div>
      <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
    </div>
  );

  /* ── Mobile: list submenu (corporate / resources) ── */
  const renderListSubmenu = (menuItem) => (
    <div>
      {menuItem.submenu.map((sub, idx) => (
        <div
          key={idx}
          onClick={() => { closeMobile(); navigate(sub.path); }}
          style={{ display: "flex", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }}
        >
          <div style={{
            width: "40px", height: "40px", borderRadius: "6px",
            backgroundColor: menuItem.badgeColor, display: "flex",
            alignItems: "center", justifyContent: "center", color: menuItem.badgeIconColor
          }}>
            <Icon name={sub.icon} width="18" height="18" stroke="currentColor" />
          </div>
          <span style={{ fontSize: "15px", fontWeight: "500", color: "#1f2937", marginLeft: "16px" }}>{sub.label}</span>
        </div>
      ))}
    </div>
  );

  /* ── Mobile: categories submenu (product image rows, NO collapse) ── */
  const renderCategoriesSubmenu = () => (
    <div>
      {categoriesData.map((cat) => {
        const catProducts = productsData.filter(p => p.category === cat.id);
        return (
          <div key={cat.id}>
            {/* Category header */}
            <div
              className="flex items-center justify-between py-14 px-20 bg-tertiary"
              style={{ borderBottom: "1px solid #e5e7eb", cursor: "pointer" }}
              onClick={() => { closeMobile(); navigate("/products", { state: { category: cat.id } }); }}
            >
              <div className="flex items-center gap-12">
                <Icon name={cat.iconName || "Grid"} width="18" height="18" stroke="#f25c2b" />
                <p className="small-text text-dark font-600" style={{ margin: 0 }}>{cat.name}</p>
              </div>
              <span className="text-primary font-500 flex items-center gap-4" style={{ fontSize: "11px" }}>
                View All <Icon name="ArrowRight" width="10" height="10" stroke="currentColor" />
              </span>
            </div>
            {/* Product rows with images */}
            {catProducts.length > 0 ? (
              catProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => { closeMobile(); navigate(`/product-detail/${prod.id}`); }}
                  style={{
                    display: "flex", alignItems: "center", padding: "12px 20px",
                    borderBottom: "1px solid #f3f4f6", cursor: "pointer"
                  }}
                >
                  <Image
                    src={resolveProductImage(prod)}
                    alt={prod.name}
                    width="48"
                    height="48"
                    style={{
                      width: "48px", height: "48px", borderRadius: "6px",
                      objectFit: "cover", backgroundColor: "#f3f4f6"
                    }}
                  />
                  <span style={{ fontSize: "14px", fontWeight: "500", color: "#1f2937", marginLeft: "14px" }}>
                    {prod.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="py-8 px-20 text-gray small-text">No products in this category.</div>
            )}
          </div>
        );
      })}
    </div>
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
          padding: 6px 5px;
          color: var(--gray);
          text-decoration: none;
          display: block;
          transition: all 0.15s ease;
        }
        .drop-item:hover {
          background-color: var(--forth);
          color: var(--primary);
          padding-left: 10px;
        }
        .header-search-input {
          height: 28px !important;
          border-radius: 6px !important;
          font-size: 12px !important;
        }
      `}</style>

      {/* DESKTOP HEADER - ROW 1 (NON-STICKY) */}
      <div className="sm-hidden md-hidden bg-white w-full">
        <Container
          as="header"
          className="bg-white bordb"
        >
          <div className="flex items-center w-full" style={{ minHeight: "52px" }}>

            <div className="flex items-center w-40">
              {headerConfig.topNav.left.map((item, idx) => renderTopNavItem(item, idx, "left"))}
            </div>

            <NavLink to={headerConfig.logo.path} className="flex items-center justify-center w-20">
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

            <div className="flex items-center justify-end w-40">
              {/* SEARCH INLINE UTILITY */}
              <div className="relative flex items-center" style={{ minWidth: isSearchOpen ? "210px" : "auto", transition: "all 0.2s ease" }}>
                {isSearchOpen ? (
                  <div className="relative flex items-center w-full">
                    <Fields
                      type="input"
                      placeholder="Search products"
                      value={searchQuery}
                      onChange={(val) => setSearchQuery(val)}
                      className="header-search-input"
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

              {headerConfig.topNav.right.map((item, idx) => renderTopNavItem(item, idx, "right"))}

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
      </div>

      {/* DESKTOP HEADER - ROW 2 (STICKY) */}
      <div className="sm-hidden md-hidden sticky top-0 z-99 bg-white w-full shadow-sm">
        <Container
          as="nav"
          className="bg-white bdrdh bordb"
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
                    minWidth="560px"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "12px"
                    }}
                  >
                    <div className="p-12">
                      <p className="text-dark font-500 mini-text uppercase tracking-wider mb-8">{item.dropdownTitle}</p>
                      {productsData.filter(p => p.category === item.category).slice(0, 5).map(prod => (
                        <p
                          key={prod.id}
                          className="drop-item rounded-5 mini-text cursor-pointer"
                          onClick={() => handleProductClick(prod.id)}
                        >
                          {prod.name}
                        </p>
                      ))}
                    </div>
                    <div className="bg-forth p-12 rounded-5">
                      <h6 className="text-dark font-500 headmini-text">{item.cardTitle}</h6>
                      <p className="text-gray mini-text mt-4">{item.cardDesc}</p>
                      <span
                        className="text-primary font-600 mini-text mt-12 cursor-pointer flex items-center gap-4"
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
      </div>

      {/* MOBILE HEADER BAR */}
      <div className="hidden md-block sm-block px-15 py-10 sticky top-0 left-0 z-99 bg-white">
        <div className="flex items-center justify-between w-full">
          <NavLink to="/" className="flex items-center">
            <Image
              src={headerConfig.logo.src}
              alt={headerConfig.logo.alt}
              width="150"
              height="40"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
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
              onClick={() => isMobileOpen ? closeMobile() : setIsMobileOpen(true)}
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
              <NavLink to="/" onClick={closeMobile}>
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
              onClick={closeMobile}
              icon="Close"
              iconWidth="18"
              iconHeight="18"
              version="icon"
              bg="dark"
            />
          </div>

          <div style={{ flex: 1, overflowY: "auto" }}>
            {!activeMobileSubmenu ? (
              // SCREEN 1: MAIN MENU — mapped from header.json mobileMenu
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
                        closeMobile();
                        navigate(`/products?search=${searchQuery}`);
                      }
                    }}
                  />
                </div>

                {/* ALL MENU ITEMS FROM JSON */}
                {headerConfig.mobileMenu.map((menuItem) => (
                  <MobileRow
                    key={menuItem.id}
                    icon={menuItem.icon}
                    label={menuItem.label}
                    onClick={() => {
                      if (menuItem.hasSubmenu) {
                        setActiveMobileSubmenu(menuItem);
                      } else {
                        closeMobile();
                        navigate(menuItem.path);
                      }
                    }}
                  />
                ))}
              </div>
            ) : (
              // SCREEN 2: SUBMENU VIEW
              <div>
                {activeMobileSubmenu.submenuType === "categories" && renderCategoriesSubmenu()}
                {activeMobileSubmenu.submenuType === "list" && renderListSubmenu(activeMobileSubmenu)}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default memo(Header);
