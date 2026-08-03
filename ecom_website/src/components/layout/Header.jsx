import { memo, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Dropdown from "../common/Dropdown";
import Modal from "../common/Modal";
import FormBuilder from "../common/FormBuilder";
import Steps from "../common/Steps";
import { products as productsData, categories as categoriesData } from "../../utils/apiData";
import headerConfig from "../../data/header.json";
import Fields from "../common/Fields";
import { resolveProductImage } from "../../utils/imageResolver";
import { config } from "../../config/env";
import { logout } from "../../feature/authSlice";
import { useLogin } from "../../hook/useLogin";
import { useRegister } from "../../hook/useRegister";
import { useVerifyOtp } from "../../hook/useVerifyOtp";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword, verifyForgotOtp, resetPassword } from "../../api/authApi";

/* ── Mobile: generic row link ── */
const MobileRow = ({ icon, label, onClick }) => (
  <div onClick={onClick} className="flex items-center justify-between py-16 px-20 bordb" style={{ cursor: "pointer" }}>
    <div className="flex items-center gap-12">
      <Icon name={icon} width="16" height="16" stroke="#1f2937" />
      <p className="small-text text-dark font-500" style={{ margin: 0 }}>{label}</p>
    </div>
    <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
  </div>
);

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
  const [activeMobileCategory, setActiveMobileCategory] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.auth) || {};
  const dispatch = useDispatch();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const verifyOtpMutation = useVerifyOtp();
  const [registerStep, setRegisterStep] = useState("form");
  const [formStep, setFormStep] = useState(1);
  const [registerFormData, setRegisterFormData] = useState({});
  const [tempRegisterData, setTempRegisterData] = useState(null);

  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(1);
  const [forgotPasswordError, setForgotPasswordError] = useState("");
  const [forgotPasswordFormData, setForgotPasswordFormData] = useState({});

  const forgotPasswordMutation = useMutation({
    mutationFn: forgotPassword
  });

  const verifyForgotOtpMutation = useMutation({
    mutationFn: verifyForgotOtp
  });

  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword
  });

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const userMenuItems = [
    { label: "My Profile", icon: "Users", path: "/profile", show: true },
    { label: "Admin Panel", icon: "Dashboard", path: "/admin", show: user?.role === "admin" },
    { label: "Logout", icon: "Logout", action: handleLogout, show: true, className: "text-danger" }
  ];

  const dropdownItems = isLoggedIn
    ? userMenuItems.filter((item) => item.show)
    : [
      { label: "Login", icon: "Login", action: () => setIsLoginModalOpen(true) },
      { label: "Register", icon: "Register", action: () => setIsRegisterModalOpen(true) }
    ];


  useEffect(() => {
    const updateCount = () => setCartCount(JSON.parse(localStorage.getItem('cart') || '[]').length);
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    return () => window.removeEventListener('cart-updated', updateCount);
  }, []);

  const closeMobile = () => {
    setIsMobileOpen(false);
    setActiveMobileSubmenu(null);
    setActiveMobileCategory(null);
  };

  const handleProductClick = (productId, categoryName) => {
    setActiveMainNavMenu(null);
    setActiveTopDropdown(null);
    setIsSearchOpen(false);
    if (productId) navigate(`/product-detail/${productId}`);
    else if (categoryName) navigate("/products", { state: { category: categoryName } });
    else navigate("/products");
  };

  const renderTopSubmenu = (submenu) =>
    submenu.map((sub, sIdx) => {
      let { label, href, path, type } = sub;
      const phoneEnv = config.phone;
      if (phoneEnv) {
        if (type === "tel") {
          label = `Call +91 ${phoneEnv.slice(0, 5)} ${phoneEnv.slice(5)}`;
          href = `tel:+91${phoneEnv}`;
        } else if (type === "external" && href?.includes("wa.me")) {
          href = `https://wa.me/91${phoneEnv}`;
        }
      }
      const isExt = type === "tel" || type === "external";
      const Tag = isExt ? "a" : NavLink;
      return (
        <Tag
          key={sIdx}
          {...(isExt ? { href, target: type === "external" ? "_blank" : undefined, rel: "noreferrer" } : { to: path })}
          className="drop-item"
        >
          <p className="mini-text font-500 px-6 py-2">{label}</p>
        </Tag>
      );
    });

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
  const renderCategoriesSubmenu = () => {
    if (!activeMobileCategory) {
      // LEVEL 2: List of Categories
      return (
        <div>
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setActiveMobileCategory(cat)}
              className="flex items-center justify-between py-18 px-20 bordb"
              style={{ cursor: "pointer", transition: "background-color 0.2s" }}
            >
              <div className="flex items-center gap-12">
                <Icon name={cat.iconName || "Grid"} width="18" height="18" stroke="#1f2937" />
                <p className="small-text text-dark font-500" style={{ margin: 0 }}>{cat.name}</p>
              </div>
              <Icon name="ChevronRight" width="16" height="16" stroke="#9ca3af" />
            </div>
          ))}
        </div>
      );
    }

    // LEVEL 3: List of Products under selected Category
    const catProducts = productsData.filter(p => p.category === activeMobileCategory.id);
    return (
      <div>
        {/* Category Header Banner with Orange Icon and View All link */}
        <div
          className="flex items-center justify-between py-14 px-20"
          style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}
        >
          <div className="flex items-center gap-8">
            <Icon name={activeMobileCategory.iconName || "Grid"} width="20" height="20" stroke="#f25c2b" fill="#f25c2b" />
            <p className="small-text text-dark font-500">
              {activeMobileCategory.name}
            </p>
          </div>
          <p
            className="mini-text text-gray font-500 flex items-center gap-4 cursor-pointer"
            onClick={() => {
              closeMobile();
              navigate("/products", { state: { category: activeMobileCategory.id } });
            }}
          >
            View All <Icon name="ArrowRight" width="12" height="12" stroke="currentColor" strokeWidth="2.5" />
          </p>
        </div>

        {/* Product Rows with rounded thumbnail images */}
        {catProducts.length > 0 ? (
          catProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                closeMobile();
                navigate(`/product-detail/${prod.id}`);
              }}
              className="flex gap-12 items-center py-16 px-20 bordb"
              style={{ cursor: "pointer", transition: "background-color 0.2s" }}
            >
              <Image
                src={resolveProductImage(prod)}
                alt={prod.name}
                width="40"
                height="40"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "6px",
                  objectFit: "cover",
                  backgroundColor: "#f1f5f9"
                }}
              />
              <p className="small-text text-dark font-500">
                {prod.name}
              </p>
            </div>
          ))
        ) : (
          <div className="py-20 px-20 text-gray small-text text-center">
            No products in this category.
          </div>
        )}
      </div>
    );
  };

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
                    className="top-nav-link flex items-center gap-4"
                    onClick={() => setIsSearchOpen(true)}
                  >
                    <Icon name="Search" width="14" height="14" stroke="currentColor" /> SEARCH
                  </div>
                )}
              </div>

              <div className="header-v-divider" />

              {headerConfig.topNav.right.map((item, idx) => renderTopNavItem(item, idx, "right"))}

              <div className="header-v-divider" />

              {/* ACCOUNT USER ICON */}
              <div
                className="relative flex items-center"
                onMouseEnter={() => setIsUserDropdownOpen(true)}
                onMouseLeave={() => setIsUserDropdownOpen(false)}
              >
                {isLoggedIn ? (
                  <div
                    className="top-nav-link p-4 cursor-pointer flex items-center"
                    title="User Account"
                  >
                    <Icon name="Users" width="17" height="17" stroke="#f25c2b" />
                  </div>
                ) : (
                  <div
                    className="top-nav-link p-4 cursor-pointer flex items-center"
                    title="Account Options"
                  >
                    <Icon name="Users" width="17" height="17" stroke="currentColor" />
                  </div>
                )}

                {isUserDropdownOpen && (
                  <Dropdown isOpen={isUserDropdownOpen} align="right" minWidth="200px">
                    <div className="p-12 bordb flex items-center gap-12">
                      {isLoggedIn ? (
                        <>
                          <div className="rounded-full bg-light-primary icon-lg text-primary">
                            <Icon name="Users" width="20" height="20" stroke="currentColor" />
                          </div>
                          <div>
                            <h4 className="font-600 text-dark headmini-text capitalize">{user?.fullname || "User"}</h4>
                            <p className="text-gray mini-text">{user?.role || "Customer"}</p>
                          </div>
                        </>
                      ) : (
                        <div>
                          <h4 className="font-600 text-dark headmini-text capitalize">Welcome Guest</h4>
                          <p className="text-gray mini-text">Manage your account</p>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      {dropdownItems.map((item, idx) => (
                        <p
                          key={idx}
                          className={`drop-item rounded-5 mini-text cursor-pointer p-10 flex items-center gap-8 ${item.className || ""}`}
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            item.action ? item.action() : navigate(item.path);
                          }}
                        >
                          {item.icon && (
                            <Icon
                              name={item.icon}
                              width="14"
                              height="14"
                              stroke="currentColor"
                            />
                          )}
                          <span>{item.label}</span>
                        </p>
                      ))}
                    </div>
                  </Dropdown>
                )}
              </div>

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
                  className="absolute text-white rounded-full flex items-center justify-center font-500"
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

          <div className="flex items-center gap-6">
            <NavLink to="/cart" className="relative p-6">
              <Icon name="Bag" width="20" height="20" stroke="#1e293b" />
              <span
                className="absolute text-white rounded-full flex items-center justify-center font-500"
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
            className="flex items-center justify-between p-12 bordb"
          >
            {activeMobileCategory ? (
              <Button
                onClick={() => setActiveMobileCategory(null)}
                icon="ChevronLeft"
                iconWidth="16"
                iconHeight="16"
                iconStrokeWidth="3"
                text="BACK"
                version="v0"
                bg="transparent"
                style={{ color: 'var(--gray)' }}
              />
            ) : activeMobileSubmenu ? (
              <Button
                onClick={() => setActiveMobileSubmenu(null)}
                icon="ChevronLeft"
                iconWidth="16"
                color="dark"
                iconHeight="16"
                iconStrokeWidth="3"
                text="BACK"
                version="v0"
                bg="transparent"
                style={{ color: 'var(--gray)' }}
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
              bg="forth"
              color="gray"
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
                {isLoggedIn ? (
                  <>
                    <div className="flex items-center justify-between py-16 px-20 bordb" style={{ backgroundColor: "#f0fdf4" }}>
                      <div className="flex items-center gap-12">
                        <Icon name="Users" width="16" height="16" stroke="#15803d" />
                        <p className="small-text font-600" style={{ color: "#15803d", margin: 0 }}>Logged in as {user?.fullname}</p>
                      </div>
                    </div>
                    <MobileRow
                      icon="Close"
                      label="Logout"
                      onClick={() => {
                        closeMobile();
                        handleLogout();
                      }}
                    />
                  </>
                ) : (
                  <>
                    <MobileRow
                      icon="Users"
                      label="Login"
                      onClick={() => {
                        closeMobile();
                        setIsLoginModalOpen(true);
                      }}
                    />
                    <MobileRow
                      icon="Users"
                      label="Register"
                      onClick={() => {
                        closeMobile();
                        setIsRegisterModalOpen(true);
                      }}
                    />
                  </>
                )}
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

      {/* LOGIN MODAL */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setLoginError("");
        }}
        title="Welcome Back"
        size="sm"
        footer={null}
      >
        <div className="py-10">
          {loginError && (
            <div className="p-12 mb-16 rounded-5 bg-light-danger">
              <p className="mini-text font-500 text-danger">{loginError}</p>
            </div>
          )}

          <FormBuilder
            key={isLoginModalOpen ? "open" : "closed"}
            fields={[
              {
                name: "mobile",
                type: "tel",
                label: "Mobile Number",
                placeholder: "Enter mobile number",
                validation: { required: true, mobile: true }
              },
              {
                name: "password",
                type: "password",
                label: "Password",
                placeholder: "Enter password",
                validation: { required: true }
              }
            ]}
            submitType="json"
            onSubmit={(formData) => {
              setLoginError("");
              loginMutation.mutate(formData, {
                onSuccess: () => {
                  setIsLoginModalOpen(false);
                },
                onError: (err) => {
                  setLoginError(err.response?.data?.message || err.message || "Invalid mobile or password.");
                }
              });
            }}
            buttonClassName="hidden"
          >
            <div className="flex justify-end mt-4">
              <span 
                className="mini-text text-primary cursor-pointer font-500"
                onClick={() => {
                  setIsLoginModalOpen(false);
                  setIsForgotPasswordModalOpen(true);
                }}
              >
                Forgot Password?
              </span>
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              bg="primary"
              color="white"
              version="v2"
              className="mt-20 w-full"
            >
              {loginMutation.isPending ? (
                "Logging in..."
              ) : (
                "Login"
              )}
            </Button>

            <div className="text-center mt-20">
              <p className="mini-text text-gray">
                Don't have an account?{" "}
                <span
                  className="text-primary font-600 cursor-pointer ml-4"
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsRegisterModalOpen(true);
                  }}
                >
                  Register here
                </span>
              </p>
            </div>
          </FormBuilder>
        </div>
      </Modal>

      {/* FORGOT PASSWORD MODAL */}
      <Modal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => {
          setIsForgotPasswordModalOpen(false);
          setForgotPasswordError("");
          setForgotPasswordStep(1);
          setForgotPasswordFormData({});
        }}
        title={
          forgotPasswordStep === 1
            ? "Forgot Password"
            : forgotPasswordStep === 2
            ? "Verify OTP"
            : "Reset Password"
        }
        size="sm"
        footer={null}
      >
        <div className="py-10">
          {forgotPasswordError && (
            <div className="p-12 mb-16 rounded-5 bg-light-danger">
              <p className="mini-text font-500 text-danger">{forgotPasswordError}</p>
            </div>
          )}

          {forgotPasswordStep === 1 ? (
            <FormBuilder
              key="forgot-password-step-1"
              fields={[
                {
                  name: "mobile",
                  type: "tel",
                  label: "Mobile Number",
                  placeholder: "Enter mobile number",
                  validation: { required: true, mobile: true }
                }
              ]}
              submitType="json"
              onSubmit={(formData) => {
                setForgotPasswordError("");
                forgotPasswordMutation.mutate(
                  { mobile: formData.mobile },
                  {
                    onSuccess: () => {
                      setForgotPasswordFormData({ mobile: formData.mobile });
                      setForgotPasswordStep(2);
                    },
                    onError: (err) => {
                      setForgotPasswordError(
                        err.response?.data?.message || err.message || "Failed to send OTP. Try again."
                      );
                    }
                  }
                );
              }}
              buttonClassName="hidden"
            >
              <div className="text-center mt-16">
                <div className="rounded-full bg-light-primary text-primary mx-auto flex items-center justify-center" style={{ height: '54px', width: '54px' }}>
                  <Icon name="Lock" width="23" height="23" stroke="currentColor" />
                </div>
                <h3 className="font-500 text-dark mid-text pt-8">Reset Password</h3>
                <p className="text-gray mini-text">Enter your mobile number to request an OTP code</p>
              </div>

              <Button
                type="submit"
                disabled={forgotPasswordMutation.isPending}
                bg="primary"
                color="white"
                version="v2"
                className="mt-20 w-full"
              >
                {forgotPasswordMutation.isPending ? "Sending OTP..." : "Send OTP"}
              </Button>

              <div className="text-center mt-20">
                <span
                  className="text-primary font-600 cursor-pointer ml-4 mini-text"
                  onClick={() => {
                    setIsForgotPasswordModalOpen(false);
                    setIsLoginModalOpen(true);
                  }}
                >
                  &larr; Back to Login
                </span>
              </div>
            </FormBuilder>
          ) : forgotPasswordStep === 2 ? (
            <FormBuilder
              key="forgot-password-step-2"
              fields={[
                {
                  name: "otp",
                  type: "text",
                  label: "OTP Code",
                  placeholder: "Enter verification OTP",
                  validation: { required: true }
                }
              ]}
              submitType="json"
              onSubmit={(formData) => {
                setForgotPasswordError("");
                verifyForgotOtpMutation.mutate(
                  {
                    mobile: forgotPasswordFormData.mobile,
                    otp: formData.otp
                  },
                  {
                    onSuccess: () => {
                      setForgotPasswordFormData(prev => ({ ...prev, otp: formData.otp }));
                      setForgotPasswordStep(3);
                    },
                    onError: (err) => {
                      setForgotPasswordError(
                        err.response?.data?.message || err.message || "Invalid OTP code."
                      );
                    }
                  }
                );
              }}
              buttonClassName="hidden"
            >
              <div className="text-center mt-16">
                <div className="rounded-full bg-light-primary text-primary mx-auto flex items-center justify-center" style={{ height: '54px', width: '54px' }}>
                  <Icon name="Mail" width="23" height="23" stroke="currentColor" />
                </div>
                <h3 className="font-500 text-dark mid-text pt-8">Verify OTP</h3>
                <p className="text-gray mini-text">Enter the OTP sent to {forgotPasswordFormData.mobile}</p>
              </div>

              <Button
                type="submit"
                disabled={verifyForgotOtpMutation.isPending}
                bg="primary"
                color="white"
                version="v2"
                className="mt-20 w-full"
              >
                {verifyForgotOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
              </Button>

              <div className="text-center mt-20">
                <span
                  className="text-gray cursor-pointer mini-text"
                  onClick={() => setForgotPasswordStep(1)}
                >
                  &larr; Change Mobile Number
                </span>
              </div>
            </FormBuilder>
          ) : (
            <FormBuilder
              key="forgot-password-step-3"
              fields={[
                {
                  name: "password",
                  type: "password",
                  label: "New Password",
                  placeholder: "Enter new password",
                  validation: { required: true }
                },
                {
                  name: "confirmPassword",
                  type: "password",
                  label: "Confirm Password",
                  placeholder: "Confirm new password",
                  validation: { required: true }
                }
              ]}
              submitType="json"
              onSubmit={(formData) => {
                setForgotPasswordError("");
                if (formData.password !== formData.confirmPassword) {
                  setForgotPasswordError("Passwords do not match.");
                  return;
                }
                resetPasswordMutation.mutate(
                  {
                    mobile: forgotPasswordFormData.mobile,
                    password: formData.password
                  },
                  {
                    onSuccess: () => {
                      alert("Password reset successfully! Please login with your new password.");
                      setIsForgotPasswordModalOpen(false);
                      setIsLoginModalOpen(true);
                      setForgotPasswordStep(1);
                      setForgotPasswordFormData({});
                    },
                    onError: (err) => {
                      setForgotPasswordError(
                        err.response?.data?.message || err.message || "Failed to reset password."
                      );
                    }
                  }
                );
              }}
              buttonClassName="hidden"
            >
              <div className="text-center mt-16">
                <div className="rounded-full bg-light-primary text-primary mx-auto flex items-center justify-center" style={{ height: '54px', width: '54px' }}>
                  <Icon name="Lock" width="23" height="23" stroke="currentColor" />
                </div>
                <h3 className="font-500 text-dark mid-text pt-8">Create New Password</h3>
                <p className="text-gray mini-text">Ensure your new password is secure</p>
              </div>

              <Button
                type="submit"
                disabled={resetPasswordMutation.isPending}
                bg="primary"
                color="white"
                version="v2"
                className="mt-20 w-full"
              >
                {resetPasswordMutation.isPending ? "Resetting Password..." : "Reset Password"}
              </Button>
            </FormBuilder>
          )}
        </div>
      </Modal>

      {/* REGISTER MODAL */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => {
          setIsRegisterModalOpen(false);
          setRegisterError("");
          setRegisterStep("form");
          setFormStep(1);
          setRegisterFormData({});
          setTempRegisterData(null);
        }}
        title={registerStep === "otp" ? "Verify OTP" : "Create an Account"}
        size="sm"
        footer={null}
      >
        <div className="py-10">
          {registerStep !== "otp" && (
            <Steps
              currentStep={formStep}
              steps={["Personal", "Contact", "Security", "Complete"]}
            />
          )}

          {registerError && (
            <div className="p-12 mb-16 rounded-5 bg-light-danger">
              <p className="mini-text font-500 text-danger">{registerError}</p>
            </div>
          )}

          {registerStep === "form" ? (
            formStep === 1 ? (
              <FormBuilder
                key="register-step-1"
                fields={[
                  {
                    name: "fullname",
                    type: "text",
                    label: "Full Name",
                    placeholder: "Enter your full name",
                    defaultValue: registerFormData.fullname || "",
                    validation: { required: true }
                  }
                ]}
                submitType="json"
                onSubmit={(formData) => {
                  setRegisterError("");
                  setRegisterFormData(formData);
                  setFormStep(2);
                }}
                buttonClassName="hidden"
              >
                <div className="text-center mt-16">
                  <div className="rounded-full bg-light-primary text-primary mx-auto flex items-center justify-center" style={{ height: '54px', width: '54px' }}>
                    <Icon name="Users" width="23" height="23" stroke="currentColor" />
                  </div>
                  <h3 className="font-500 text-dark mid-text pt-8">Let's start with your name</h3>
                  <p className="text-gray mini-text">Enter your full name to continue</p>
                </div>
                <div className="flex justify-end mt-20">
                  <Button
                    type="submit"
                    bg="primary"
                    color="white"
                    version="v2"
                  >
                    Next &rarr;
                  </Button>
                </div>
              </FormBuilder>
            ) : formStep === 2 ? (
              <FormBuilder
                key="register-step-2"
                fields={[
                  {
                    name: "email",
                    type: "email",
                    label: "Email Address",
                    placeholder: "Enter your email address",
                    defaultValue: registerFormData.email || "",
                    validation: { required: true, email: true }
                  },
                  {
                    name: "mobile",
                    type: "tel",
                    label: "Mobile Number",
                    placeholder: "Enter mobile number",
                    defaultValue: registerFormData.mobile || "",
                    validation: { required: true, mobile: true }
                  }
                ]}
                submitType="json"
                onSubmit={(formData) => {
                  setRegisterError("");
                  setRegisterFormData(prev => ({
                    ...prev,
                    email: formData.email,
                    mobile: formData.mobile
                  }));
                  setFormStep(3);
                }}
                buttonClassName="hidden"
              >
                <div className="flex items-center justify-between mt-20">
                  <Button
                    type="button"
                    onClick={() => setFormStep(1)}
                    bg="forth"
                    color="dark"
                    version="v2"
                  >
                    &larr; Back
                  </Button>
                  <Button
                    type="submit"
                    bg="primary"
                    color="white"
                    version="v2"
                  >
                    Next &rarr;
                  </Button>
                </div>
              </FormBuilder>
            ) : formStep === 3 ? (
              <FormBuilder
                key="register-step-3"
                fields={[
                  {
                    name: "password",
                    type: "password",
                    label: "Password",
                    placeholder: "Create password",
                    validation: { required: true }
                  },
                  {
                    name: "confirmPassword",
                    type: "password",
                    label: "Confirm Password",
                    placeholder: "Confirm password",
                    validation: { required: true }
                  }
                ]}
                submitType="json"
                onSubmit={(formData) => {
                  setRegisterError("");
                  if (formData.password !== formData.confirmPassword) {
                    setRegisterError("Passwords do not match.");
                    return;
                  }
                  setRegisterFormData(prev => ({
                    ...prev,
                    password: formData.password
                  }));
                  setFormStep(4);
                }}
                buttonClassName="hidden"
              >

                {/* Requirements list */}
                <div className="mt-12 mb-20 text-gray mini-text flex flex-column gap-6" style={{ paddingLeft: "4px" }}>
                  <div className="flex items-center gap-6">
                    <Icon name="Check" width="14" height="14" stroke="#10b981" strokeWidth="2.5" />
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <Icon name="Check" width="14" height="14" stroke="#10b981" strokeWidth="2.5" />
                    <span>Include a number or symbol</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <Icon name="Check" width="14" height="14" stroke="#10b981" strokeWidth="2.5" />
                    <span>Mix of uppercase and lowercase</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-20">
                  <Button
                    type="button"
                    onClick={() => setFormStep(2)}
                    bg="forth"
                    color="dark"
                    version="v2"
                  >
                    &larr; Back
                  </Button>
                  <Button
                    type="submit"
                    bg="primary"
                    color="white"
                    version="v2"
                  >
                    Next &rarr;
                  </Button>
                </div>
              </FormBuilder>
            ) : (
              <FormBuilder
                key="register-step-4"
                fields={[]}
                submitType="json"
                onSubmit={() => {
                  setRegisterError("");
                  registerMutation.mutate(registerFormData, {
                    onSuccess: () => {
                      setTempRegisterData(registerFormData);
                      setRegisterStep("otp");
                    },
                    onError: (err) => {
                      setRegisterError(err.response?.data?.message || err.message || "Registration failed. Try again.");
                    }
                  });
                }}
                buttonClassName="hidden"
              >
                <div className="flex flex-column items-center mb-24 text-center">
                  <div className="rounded-full flex items-center justify-center" style={{ width: "56px", height: "56px", backgroundColor: "#ffedd5", color: "#ea580c" }}>
                    <Icon name="Check" width="24" height="24" stroke="currentColor" />
                  </div>
                  <h3 className="font-600 text-dark mid-text pt-4">Review & Confirm</h3>
                  <p className="text-gray mini-text">Please review your details before creating your account</p>
                </div>

                <div className="grid-cols-1 gap-5">
                  <div className="flex items-center justify-between pb-8 border-b" style={{ borderColor: "#ececec" }}>
                    <p className="text-gray mini-text">Full Name</p>
                    <p className="text-dark font-600 headmini-text capitalize">{registerFormData.fullname}</p>
                  </div>
                  <div className="flex items-center justify-between pb-8 border-b" style={{ borderColor: "#ececec" }}>
                    <p className="text-gray mini-text">Email Address</p>
                    <p className="text-dark font-600 headmini-text">{registerFormData.email}</p>
                  </div>
                  <div className="flex items-center justify-between pb-8 border-b" style={{ borderColor: "#ececec" }}>
                    <p className="text-gray mini-text">Mobile Number</p>
                    <p className="text-dark font-600 headmini-text">{registerFormData.mobile}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-10">
                  <Button
                    type="button"
                    onClick={() => setFormStep(3)}
                    bg="forth"
                    color="dark"
                    version="v2"
                  >
                    &larr; Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={registerMutation.isPending}
                    bg="primary"
                    color="white"
                    version="v2"
                  >
                    {registerMutation.isPending ? "Registering..." : "Register"}
                  </Button>
                </div>
              </FormBuilder>
            )
          ) : (
            <FormBuilder
              key="otp-verification-form"
              fields={[
                {
                  name: "otp",
                  type: "text",
                  label: "OTP Code",
                  placeholder: "Enter the OTP sent to your phone",
                  validation: { required: true }
                }
              ]}
              submitType="json"
              onSubmit={(otpData) => {
                setRegisterError("");
                verifyOtpMutation.mutate(
                  {
                    mobile: tempRegisterData?.mobile,
                    otp: otpData.otp
                  },
                  {
                    onSuccess: () => {
                      // Automatically login the user once OTP is verified
                      loginMutation.mutate(
                        {
                          mobile: tempRegisterData?.mobile,
                          password: tempRegisterData?.password
                        },
                        {
                          onSuccess: () => {
                            setIsRegisterModalOpen(false);
                            setRegisterStep("form");
                            setFormStep(1);
                            setRegisterFormData({});
                            setTempRegisterData(null);
                          },
                          onError: (err) => {
                            setRegisterError(err.response?.data?.message || err.message || "OTP verified, but automatic login failed. Please login manually.");
                          }
                        }
                      );
                    },
                    onError: (err) => {
                      setRegisterError(err.response?.data?.message || err.message || "Invalid OTP code.");
                    }
                  }
                );
              }}
              buttonClassName="hidden"
            >
              <Button
                type="submit"
                disabled={verifyOtpMutation.isPending || loginMutation.isPending}
                bg="primary"
                color="white"
                version="v3"
                className="mt-12 w-full flex items-center justify-center gap-6"
              >
                {verifyOtpMutation.isPending ? (
                  <span className="flex items-center gap-4 justify-center">
                    <svg
                      className="animate-spin"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      style={{ animation: "spin 1s linear infinite" }}
                    >
                      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" />
                      <path d="M12 2a10 10 0 0 1 10 10" stroke="white" />
                    </svg>
                    Verifying...
                  </span>
                ) : loginMutation.isPending ? (
                  "Logging in..."
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </FormBuilder>
          )}
        </div>
      </Modal>
    </>
  );
};

export default memo(Header);
