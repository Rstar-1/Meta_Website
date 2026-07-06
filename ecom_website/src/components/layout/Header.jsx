import { memo, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import Icon from "../common/Icon";
import headerData from "../../data/header.json";
import logoImg from "../../assets/sobo_logo.png";
import productsData from "../../data/products.json";
import categoriesData from "../../data/category.json";

const ProductsMenu = ({ onItemClick }) => (
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
    {[...new Set(productsData.filter((p) => p.type !== "general").map((p) => p.category))].map((cat, idx) => {
      const items = productsData.filter((p) => p.category === cat && p.type !== "general" && p.popular).slice(0, 5);
      if (items.length === 0) return null;
      return (
        <div key={idx} className="p-18">
          <p className="text-gray uppercase mini-text font-500">
            {categoriesData.find((c) => c.id === cat)?.name || cat}
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

const IndustryMenu = ({ onItemClick }) => {
  const categories = categoriesData.slice(0, 5).map((c) => c.name);
  return (
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
          src={headerData.industryMenu.bannerImage}
          alt="Industry"
          className="flex w-full h-200 object-cover rounded-5"
        />
        <h4 className="mid-text text-dark font-500 pt-20">{headerData.industryMenu.bannerTitle}</h4>
        <p className="small-text text-gray font-400 mt-6">
          {headerData.industryMenu.bannerDesc}
        </p>
        <p className="small-text text-secondary font-400 mt-6 cursor-pointer mega-menu-link flex items-center gap-4" onClick={() => onItemClick()}>
          {headerData.industryMenu.bannerLinkText} <Icon name="ArrowRight" width="12" height="12" stroke="currentColor" />
        </p>
      </div>
      <div className="p-18">
        <p className="text-gray uppercase small-text font-500">Product Categories</p>
        <div className="grid grid-cols-1 gap-8 mt-12">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="mega-menu-item"
              onClick={() => onItemClick(null, cat)}
            >
              <p className="text-dark small-text font-500 px-10" style={{ margin: 0 }}>{cat}</p>
              <span className="arrow-icon">
                <Icon name="ArrowRight" width="12" height="12" stroke="currentColor" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const MegaMenuContent = memo(({ label, onItemClick, navigate }) => {
  switch (label) {
    case "Products":
      return <ProductsMenu onItemClick={onItemClick} navigate={navigate} />;
    case "Industry":
      return <IndustryMenu onItemClick={onItemClick} navigate={navigate} />;
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
      <Container className="navbar">
        <div className="flex items-center justify-between w-full" style={{ height: "65px" }}>
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
              <Image
                src={logoImg}
                alt="SOBO Marketing Solution Logo"
                style={{
                  maxHeight: '42px',
                  width: 'auto',
                  objectFit: 'contain'
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
                      className="small-text font-500 px-20 py-6 cursor-pointer text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      {item?.label}
                    </NavLink>
                  ) : (
                    <p className="small-text text-dark font-500 px-20 py-6 cursor-pointer">
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
                      <div
                        className={`grid ${item?.cols} items-start`}
                        style={{ width: item?.width, maxWidth: "100%" }}
                      >
                        <MegaMenuContent
                          label={item?.label}
                          onItemClick={handleItemClick}
                          navigate={navigate}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-12 sm-gap-1">
            {/* Cart Link with Badge */}
            <NavLink
              to="/cart"
              className="relative flex items-center justify-center cursor-pointer text-dark hover:text-primary transition-all"
              style={{ padding: '8px', textDecoration: 'none' }}
              title="View Cart"
            >
              <Icon name="Cart" width="22" height="22" stroke="var(--dark)" />
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
                text="Talk to Engineer"
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
              style={{ border: "none", color: "var(--dark)" }}
              icon={isMobileOpen ? "Close" : "Menu"}
              iconWidth="24"
              iconHeight="24"
              iconStrokeWidth="2"
              bg="forth"
            />
          </div>
        </div>
      </Container>

      {isMobileOpen && (
        <div
          className="mobile-drawer bg-forth px-24 py-20"
        >
          <div className="grid-cols-1">
            {headerData.navLinks.map((item, i) => {
              const isExpanded = openMobileMenu === item.label;
              const hasMega = item.hasMegaMenu;
              return (
                <div key={i} className="bordb py-12">
                  {hasMega ? (
                    <>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setOpenMobileMenu(isExpanded ? null : item.label)}
                      >
                        <p className="para-text font-500 text-dark" style={{ margin: 0 }}>
                          {item.label}
                        </p>
                        <span
                          className="text-dark flex items-center justify-center"
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
                          <MegaMenuContent
                            label={item.label}
                            onItemClick={(productId, categoryName) => {
                              setIsMobileOpen(false);
                              setOpenMobileMenu(null);
                              handleItemClick(productId, categoryName);
                            }}
                            navigate={navigate}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <NavLink
                      to={item.href || "/products"}
                      onClick={() => setIsMobileOpen(false)}
                      style={{ textDecoration: "none" }}
                    >
                      <p className="para-text font-500 text-dark" style={{ margin: 0 }}>
                        {item.label}
                      </p>
                    </NavLink>
                  )}
                </div>
              );
            })}
            <Button
              text="Talk to Engineer"
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
    </>
  );
};

export default Header;
