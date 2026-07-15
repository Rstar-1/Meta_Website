import { memo, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import Icon from "../common/Icon";
import headerData from "../../data/header.json";
import { products as productsData, categories as categoryData } from "../../utils/productsData";
import Fields from "../common/Fields";
const logoImg = "/sobo_logo.webp";

const ProductsMenu = ({ onItemClick, productsData, categoriesData }) => (
  <>
    <style>{`
      .mega-menu-item {
        padding: 10px 0px;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .mega-menu-item:hover {
        background-color: var(--tertiary) !important;
        transform: translateX(3px);
      }
      .mega-menu-item:hover p {
        color: var(--primary) !important;
      }
      .mega-menu-link:hover {
        color: var(--primary) !important;
      }
      .arrow-icon {
        font-size: 0.8rem;
        color: var(--gray);
        opacity: 0;
        transform: translateX(-5px);
        transition: all 0.2s ease;
        padding-right: 15px;
      }
      .mega-menu-item:hover .arrow-icon {
        opacity: 1;
        transform: translateX(0);
        color: var(--primary) !important;
      }
    `}</style>
    <div className="bg-tertiary p-18">
      <Image
        src={headerData.productsMenu.bannerImage}
        alt="Products"
        className="flex w-full h-200 object-cover rounded-5"
      />
      <h4 className="mid-text text-dark font-500 pt-20">{headerData.productsMenu.bannerTitle}</h4>
      <p className="small-text text-gray font-400 mt-6">
        {headerData.productsMenu.bannerDesc}
      </p>
      <p className="small-text text-secondary font-400 mt-6 cursor-pointer mega-menu-link flex items-center gap-4" onClick={() => onItemClick()}>
        {headerData.productsMenu.bannerLinkText} <Icon name="ArrowRight" width="12" height="12" stroke="currentColor" />
      </p>
    </div>
    {['cat-pvc-sheet', 'cat-pvc-roll'].map((cat, idx) => {
      const items = (productsData || []).filter((p) => p.category === cat).slice(0, 5);
      if (items.length === 0) return null;
      return (
        <div key={idx} className="p-18">
          <p className="text-gray uppercase mini-text font-500">
            {(categoriesData || []).find((c) => c.id === cat)?.name || cat}
          </p>
          <div className="grid grid-cols-1 gap-8 mt-8">
            {items.map((product) => (
              <div
                key={product.id}
                className="mega-menu-item"
                onClick={() => onItemClick(product.id)}
              >
                <p className="text-dark small-text font-500 px-10" style={{ margin: 0 }}>
                  {product.name}
                </p>
                <span className="arrow-icon">
                  <Icon name="ArrowRight" width="12" height="12" stroke="currentColor" />
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </>
);
const MegaMenuContent = memo(({ label, onItemClick, navigate, productsData, categoriesData }) => {
  switch (label) {
    case "Products":
      return <ProductsMenu onItemClick={onItemClick} navigate={navigate} productsData={productsData} categoriesData={categoriesData} />;
    default:
      return null;
  }
});

const Header = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuData] = useState({ products: productsData, categories: categoryData });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };
    updateCount();
    window.addEventListener('cart-updated', updateCount);
    return () => {
      window.removeEventListener('cart-updated', updateCount);
    };
  }, []);

  const handleItemClick = (productId, categoryName) => {
    setActiveMenu(null);
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
    <div style={{ backgroundColor: "#020712", borderBottom: "1px solid rgba(255, 255, 255, 0.08)", position: "sticky", top: 0, zIndex: 100 }}>
      <Container className="navbar">
        <div className="flex items-center justify-between w-full" style={{ height: "65px" }}>
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
              <Image
                src={logoImg}
                alt="SOBO Marketing Solution Logo"
                width="128"
                height="42"
                style={{
                  maxHeight: '42px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)'
                }}
              />
            </NavLink>

            <div className="flex sm-hidden md-hidden items-center h-full ml-40">
              {headerData.navLinks?.map((item, i) => (
                <div
                  key={i}
                  className="relative flex items-center"
                  onMouseEnter={() =>
                    item?.hasMegaMenu && setActiveMenu(item?.label)
                  }
                  onMouseLeave={() => setActiveMenu(null)}
                  style={{ height: "65px", display: "flex", alignItems: "center" }}
                >
                  {!item?.hasMegaMenu ? (
                    <NavLink
                      to={item?.href}
                      className="small-text font-500 px-20 py-6 cursor-pointer text-white hover:text-primary transition-all"
                      style={{ textDecoration: "none" }}
                    >
                      {item?.label}
                    </NavLink>
                  ) : (
                    <p className="small-text text-white hover:text-primary font-500 px-20 py-6 cursor-pointer" style={{ margin: 0 }}>
                      {item?.label}
                    </p>
                  )}

                  {item?.hasMegaMenu && activeMenu === item?.label && (
                    <div
                      className="absolute z-50 bg-white border-ec"
                      style={{
                        top: "65px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        maxWidth: "90vw",
                      }}
                    >
                      {menuData.products.length > 0 ? (
                        <div
                          className={`grid ${item?.cols} items-start`}
                          style={{ width: item?.width, maxWidth: "100%" }}
                        >
                          <MegaMenuContent
                            label={item?.label}
                            onItemClick={handleItemClick}
                            navigate={navigate}
                            productsData={menuData.products}
                            categoriesData={menuData.categories}
                          />
                        </div>
                      ) : (
                        <div className="p-20 text-center small-text text-gray" style={{ width: "200px" }}>
                          Loading Menu...
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>

          <div className="flex items-center gap-12 sm-gap-1">
            {/* Desktop Search Toggle Icon */}
            <div 
              className="relative flex items-center justify-center cursor-pointer text-white hover:text-primary transition-all p-8 sm-hidden md-hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              title="Search"
            >
              <Icon name="Search" width="22" height="22" stroke="#ffffff" />
            </div>

            {/* User Profile Link */}
            <Icon
              name="Users"
              width="22"
              height="22"
              stroke="#ffffff"
              className="cursor-pointer hover:text-primary transition-all mr-6 sm-hidden md-hidden"
              onClick={() => navigate("/dashboard")}
              title="User Dashboard"
            />

            {/* Cart Link with Badge */}
            <NavLink
              to="/cart"
              className="relative flex items-center justify-center cursor-pointer text-white hover:text-primary transition-all"
              style={{ padding: '8px', textDecoration: 'none' }}
              title="View Cart"
            >
              <Icon name="Cart" width="22" height="22" stroke="#ffffff" />
              {cartCount > 0 && (
                <span
                  className="absolute bg-danger text-white rounded-full flex items-center justify-center font-700"
                  style={{
                    top: '-2px',
                    right: '-2px',
                    fontSize: '10px',
                    width: '16px',
                    height: '16px',
                    minWidth: '16px'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </NavLink>

            <div className="sm-hidden md-hidden">
              <Button
                text="Get Quote"
                version="v2"
                bg="primary"
                onClick={() => navigate("/connect")}
              />
            </div>

            {/* Hamburger Menu Toggle Button for Mobile/Tablet Devices */}
            <Button
              className="hidden md-block sm-block cursor-pointer"
              onClick={() => {
                setIsMobileOpen(!isMobileOpen);
                setOpenMobileMenu(null);
              }}
              style={{ border: "none", color: "#ffffff" }}
              icon={isMobileOpen ? "Close" : "Menu"}
              iconWidth="24"
              iconHeight="24"
              iconStrokeWidth="2"
              bg="transparent"
            />
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div
          className="mobile-drawer px-24 py-20"
          style={{ backgroundColor: "#020712", borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <div className="grid-cols-1">
            {/* Mobile Search Bar */}
            <div className="mb-20">
              <Fields
                type="text"
                placeholder="Search products..."
                icon="Search"
                iconPosition="right"
                value={searchQuery}
                onChange={setSearchQuery}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  color: "#ffffff",
                  height: "36px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  width: "100%",
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setIsMobileOpen(false);
                    navigate(`/products?search=${searchQuery}`);
                  }
                }}
              />
            </div>

            {headerData.navLinks.map((item, i) => {
              const isExpanded = openMobileMenu === item.label;
              const hasMega = item.hasMegaMenu;
              return (
                <div key={i} className="bordb py-12" style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}>
                  {hasMega ? (
                    <>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenMobileMenu(isExpanded ? null : item.label)}
                      >
                        <p className="para-text font-500 text-white" style={{ margin: 0 }}>
                          {item.label}
                        </p>
                        <span
                          className="text-white flex items-center justify-center"
                          style={{
                            transition: "transform 0.2s ease",
                            transform: isExpanded ? "rotate(90deg)" : "none",
                            display: "inline-block"
                          }}
                        >
                          <Icon name="ChevronRight" width="14" height="14" stroke="currentColor" />
                        </span>
                      </div>
                      {isExpanded && (
                        <div className="mt-12 bg-white rounded-5 border-ec grid grid-cols-1 gap-16 overflow-hidden">
                          {menuData.products.length > 0 ? (
                            <MegaMenuContent
                              label={item.label}
                              onItemClick={(productId, categoryName) => {
                                setIsMobileOpen(false);
                                setOpenMobileMenu(null);
                                handleItemClick(productId, categoryName);
                              }}
                              navigate={navigate}
                              productsData={menuData.products}
                              categoriesData={menuData.categories}
                            />
                          ) : (
                            <div className="p-15 text-center small-text text-gray">
                              Loading...
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.href || "/products"}
                      onClick={() => setIsMobileOpen(false)}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="para-text font-500 text-white" style={{ margin: 0 }}>
                        {item.label}
                      </p>
                    </NavLink>
                  )}
                </div>
              );
            })}
            <Button
              text="Get Quote"
              version="v3"
              bg="primary"
              onClick={() => {
                setIsMobileOpen(false);
                navigate("/connect");
              }}
              className="mt-3"
            />
          </div>
        </div>
      )}

      {/* Desktop Search Dropdown */}
      {isSearchOpen && (
        <div 
          className="absolute bg-white p-12 shadow-md rounded-5 z-99 border-ec sm-hidden md-hidden" 
          style={{ 
            top: "65px", 
            right: "220px", 
            width: "300px" 
          }}
        >
          <Fields
            type="text"
            placeholder="Search products..."
            icon="Search"
            iconPosition="right"
            value={searchQuery}
            onChange={setSearchQuery}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #ececec",
              color: "#333333",
              height: "36px",
              borderRadius: "6px",
              fontSize: "13px",
              outline: "none",
              width: "100%",
            }}
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
    </div>
  );
};

export default Header;
