import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import Container from "../common/Container";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Button from "../common/Button";
import Modal from "../common/Modal";
import Dropdown from "../common/Dropdown";
import Badge from "../common/Badge";
import Fields from "../forms/Fields";

import { header, configData } from "../../utils/apiData";
import { resolveImagePath } from "../../utils/imageResolver";
import { useCart } from "../../context/CartContext";
import productsData from "../../data/product.json";
import categoriesData from "../../data/category.json";

const buildDynamicMegaMenu = () => {
  const menu = {};
  const realProducts = (productsData || []).filter((p) => !p.isBanner);

  (categoriesData || []).forEach((cat) => {
    const key = cat.megaMenuKey || cat.slug;
    const catProducts = realProducts.filter(
      (p) => p.categoryId === cat.id || p.category?.toLowerCase() === cat.name.toLowerCase() || p.megaMenuKey === key
    );

    const subCatMap = new Map();

    // Pre-register all defined subcategories from category.json
    if (cat.subCategories && cat.subCategories.length > 0) {
      cat.subCategories.forEach((sub) => {
        const subId = typeof sub === "string" ? sub.toLowerCase().replace(/[^a-z0-9]/g, "-") : sub.id;
        const subName = typeof sub === "string" ? sub : sub.name;
        subCatMap.set(subId, {
          id: subId,
          name: subName,
          badge: null,
          items: [],
        });
      });
    }

    // Attach matching products to subcategories
    catProducts.forEach((p) => {
      const subId =
        p.subCategoryId ||
        (p.subCategory
          ? p.subCategory.toLowerCase().replace(/[^a-z0-9]/g, "-")
          : "all");
      const subName = p.subCategory || p.category || cat.name;

      if (!subCatMap.has(subId)) {
        subCatMap.set(subId, {
          id: subId,
          name: subName,
          badge: p.badge?.text === "Coming Soon" ? "Coming Soon" : p.badge?.text || null,
          items: [],
        });
      }

      subCatMap.get(subId).items.push({
        id: p.id,
        title: p.name,
        name: p.name,
        image: resolveImagePath(p.image),
        href: `/product/${p.id}`,
        badge: p.badge?.text,
        price: p.priceFormatted || (p.price ? `$${p.price}` : null),
      });
    });

    // If any subcategory has no direct products, display category sample products
    const subCategoriesList = Array.from(subCatMap.values());
    subCategoriesList.forEach((sub) => {
      if (sub.items.length === 0) {
        sub.items = catProducts.slice(0, 4).map((p) => ({
          id: p.id,
          title: p.name,
          name: p.name,
          image: resolveImagePath(p.image),
          href: `/product/${p.id}`,
          badge: p.badge?.text,
          price: p.priceFormatted || (p.price ? `$${p.price}` : null),
        }));
      }
    });

    menu[key] = {
      id: cat.id,
      name: cat.name,
      categories: subCategoriesList,
    };
  });

  return menu;
};

const dynamicMegaMenu = buildDynamicMegaMenu();

const categoryMenuItems = [
  ...(categoriesData || []).map((cat) => ({
    label: cat.name || cat.title,
    href: `/product?category=${encodeURIComponent(cat.name || cat.title)}`,
    hasMegaMenu: true,
    megaMenuKey: cat.megaMenuKey || cat.slug,
    badge: cat.badge || null,
  })),
  ...(header.bottomBar?.menu || []),
];

const headerType = configData?.Header?.HeaderType ?? configData?.Header?.[0]?.HeaderType ?? 1;

const LogoClass = {
  1: "w-25 sm-w-85",
  2: "w-15 sm-w-85",
  3: "w-15 sm-w-85",
  4: "w-15 sm-w-85",
}[headerType] || "w-25 sm-w-85";

const NavigationClass = {
  1: "w-50 justify-center",
  2: "w-60 justify-start",
  3: "w-70 justify-end",
  4: "w-70 justify-end",
}[headerType] || "w-50 justify-center";

const ActionClass = {
  1: "w-25 sm-w-15",
  2: "w-25 sm-w-15",
  3: "w-25 sm-w-15",
  4: "w-20 sm-w-15",
}[headerType] || "w-25 sm-w-15";

const CategoryClass = {
  1: "justify-between",
  2: "justify-start",
}[configData?.Header?.HeaderCategory] || "justify-between";

const HeaderTopBar = React.memo(() => {
  if (configData?.Header?.[0]?.HeaderTopBar === false) return null;

  const { location: loc, email, timing } = header.topBar || {};

  return (
    <Container style={{ background: "var(--primary)" }} className="sm-hidden md-hidden">
      <div className="py-4 w-full flex items-center justify-between mini-text text-white">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-6">
            <Icon name="MapPin" width="14" height="14" stroke="var(--white)" />
            <p>{loc || "Riverside Park EU-1001"}</p>
          </div>
          <span>|</span>
          <div className="flex items-center gap-6">
            <Icon name="Mail" width="14" height="14" stroke="var(--white)" />
            <a href={`mailto:${email || "hello@Infitech.com"}`} className="text-white">
              {email || "hello@Infitech.com"}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Icon name="Clock" width="14" height="14" stroke="var(--white)" />
          <p>{timing || "Mon–Fri 09:00 AM – 06:00 PM"}</p>
        </div>
      </div>
    </Container>
  );
});

const HeaderLogo = React.memo(({ isHeaderWhite, onCloseMobile }) => {
  const logoSrc =
    !configData?.Header?.HeaderSticky || isHeaderWhite
      ? "/src/assets/sobo_logo.webp"
      : "/src/assets/sobo_white.png";

  return (
    <NavLink to="/home" className={LogoClass} onClick={onCloseMobile}>
      <Image
        src={resolveImagePath(logoSrc)}
        alt="Infitech Logo"
        className="object-contain"
        style={{ width: "auto", height: "50px" }}
      />
    </NavLink>
  );
});

const HeaderNavigation = React.memo(
  ({ pathname, hoveredNav, activeMegaMenu, isHeaderWhite, onNavMouseEnter, onNavMouseLeave }) => {
    const isMegaOpen = Boolean(activeMegaMenu);

    return (
      <div className={`${NavigationClass} sm-hidden md-hidden flex items-center h-full gap-4`}>
        {header.navLinks?.map((item) => {
          const isActive = pathname === item.href;
          const isHovered = hoveredNav === (item.label || item.href);
          const isItemMegaActive = isMegaOpen && item.megaMenuKey === activeMegaMenu;

          const linkColor =
            isActive || isHovered || isItemMegaActive
              ? "var(--primary)"
              : configData?.Header?.HeaderSticky
                ? isHeaderWhite
                  ? "var(--dark)"
                  : "var(--white)"
                : "var(--dark)";

          return (
            <div
              key={item.href}
              onMouseEnter={() => onNavMouseEnter(item)}
              onMouseLeave={onNavMouseLeave}
              className="relative flex items-center h-full"
            >
              <NavLink
                to={item.href}
                className="font-500 para-text px-16 cursor-pointer flex items-center gap-6"
                style={{ color: linkColor }}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <Badge
                    text={item.badge}
                    color={item.badgeColor || item.badgeTheme}
                    size="xs"
                    shape="pill"
                  />
                )}
                {item.hasMegaMenu && (
                  <Icon
                    name="ChevronDown"
                    width="18"
                    height="18"
                    stroke={linkColor}
                    style={{
                      transition: "transform 0.2s ease",
                      transform: isItemMegaActive ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                )}
              </NavLink>
            </div>
          );
        })}
      </div>
    );
  }
);

const HeaderBottomBar = React.memo(
  ({ pathname, hoveredNav, activeMegaMenu, isHeaderWhite, onNavMouseEnter, onNavMouseLeave }) => {
    if (configData?.Header?.[0]?.HeaderBottomBar === false) return null;

    if (!categoryMenuItems.length) return null;

    const isMegaOpen = Boolean(activeMegaMenu);

    return (
      <div className="sm-hidden md-hidden w-full" style={{ borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
        <Container>
          <div className={`${CategoryClass} flex items-center w-full py-16 overflow-auto`} style={{ gap: "26px" }}>
            {categoryMenuItems.map((item, idx) => {
              const isActive = pathname === item.href;
              const isHovered = hoveredNav === (item.label || item.href);
              const isItemMegaActive = isMegaOpen && item.megaMenuKey && item.megaMenuKey === activeMegaMenu;

              const linkColor =
                isActive || isHovered || isItemMegaActive
                  ? "var(--primary)"
                  : configData?.Header?.HeaderSticky
                    ? isHeaderWhite
                      ? "var(--dark)"
                      : "var(--white)"
                    : "var(--dark)";

              return (
                <div
                  key={item.label || idx}
                  onMouseEnter={() => onNavMouseEnter(item)}
                  onMouseLeave={onNavMouseLeave}
                  className="relative flex items-center h-full"
                  style={{ minWidth: 'max-content' }}
                >
                  <NavLink
                    to={item.href || "/product"}
                    className="font-500 small-text capitalize cursor-pointer flex items-center gap-6"
                    style={{ color: linkColor }}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge
                        text={item.badge}
                        color={item.badgeColor || item.badgeTheme}
                        size="xs"
                        shape="pill"
                      />
                    )}
                    {item.hasMegaMenu && (
                      <Icon
                        name="ChevronDown"
                        width="20"
                        height="20"
                        stroke={linkColor}
                        style={{
                          transition: "transform 0.2s ease",
                          transform: isItemMegaActive ? "rotate(180deg)" : "rotate(0deg)",
                        }}
                      />
                    )}
                  </NavLink>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    );
  }
);

const CartSidebar = React.memo(
  ({
    cartItems,
    cartQty,
    subtotal,
    isCartOpen,
    isHeaderWhite,
    onOpenCart,
    onCloseCart,
    onRemove,
    onSetQuantity,
    onNavigate,
    isMobile = false,
  }) => {
    return (
      <Modal
        type="sidebar"
        placement="right"
        size="sm"
        title={
          <div className="flex items-center gap-8">
            <span>Your cart</span>
            <Badge
              text={cartQty}
              color={cartQty > 0 ? "primary" : "secondary"}
              size="sm"
              shape="pill"
            />
          </div>
        }
        footer={null}
        isOpen={isCartOpen}
        onClose={onCloseCart}
        trigger={
          isMobile ? (
            <div className="relative flex items-center justify-center">
              <Button
                aria-label="Cart"
                onClick={onOpenCart}
                icon="Bag"
                iconWidth="22"
                iconHeight="22"
                iconStrokeWidth="1.5"
                iconStroke={
                  configData?.Header?.HeaderSticky
                    ? isHeaderWhite
                      ? "#161616"
                      : "#FFFFFF"
                    : "#161616"
                }
                version="icon"
                bg="transparent"
              />
              {cartQty > 0 && (
                <p
                  className="absolute bg-primary text-white rounded-full flex items-center justify-center pointer-events-none"
                  style={{
                    top: "-2px",
                    right: "-2px",
                    width: "18px",
                    height: "18px",
                    fontSize: "10px",
                  }}
                >
                  {cartQty}
                </p>
              )}
            </div>
          ) : (
            <div className="relative">
              <Button
                aria-label="Cart"
                onClick={onOpenCart}
                icon="Bag"
                iconWidth="16"
                iconHeight="16"
                iconStrokeWidth="2"
                variant="outline"
                border={
                  configData?.Header?.HeaderSticky
                    ? isHeaderWhite
                      ? "primary"
                      : "white"
                    : "primary"
                }
                iconStroke={
                  configData?.Header?.HeaderSticky
                    ? isHeaderWhite
                      ? "var(--primary)"
                      : "var(--white)"
                    : "var(--primary)"
                }
                version="icon"
                bg="transparent"
                className="rounded-30 p-10"
              />
              {cartQty > 0 && (
                <p
                  className="absolute bg-primary text-white rounded-full flex items-center justify-center"
                  style={{
                    top: "-7px",
                    right: "-7px",
                    width: "20px",
                    height: "20px",
                    fontSize: "10px",
                  }}
                >
                  {cartQty}
                </p>
              )}
            </div>
          )
        }
      >
        <div className="grid-cols-1 items-start gap-12 pb-20 mb-100 h-500 overflow-auto">
          <div>
            {cartItems.length > 0 ? (
              <div className="grid-cols-1 gap-12 mt-10">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-12 items-center relative pb-20 bordb">
                    <div className="w-35 h-100px rounded-5 overflow-hidden">
                      <Image
                        src={resolveImagePath(item.image)}
                        alt={item.name}
                        className="flex w-full h-full object-cover"
                      />
                    </div>

                    <div className="w-65">
                      <p className="mini-text text-gray font-400">{item.category}</p>
                      <h4 className="headmini-text text-dark font-600">{item.name}</h4>

                      <div className="flex items-center justify-between mt-5">
                        <Fields
                          type="quantity"
                          value={item.quantity}
                          onChange={(value) => onSetQuantity(item.id, value)}
                        />
                        <p className="small-text font-600 text-dark">
                          ${((Number(item.price) || 0) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => onRemove(item.id)}
                      className="icon absolute top-0 right-0 cursor-pointer"
                    >
                      <Icon name="Close" width="16" height="16" stroke="var(--danger)" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-forth">
                <Icon
                  name="Bag"
                  width="48"
                  height="48"
                  stroke="var(--primary)"
                  className="mx-auto mb-10"
                />
                <p className="small-text font-500 capitalize text-gray">Your cart is empty</p>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-forth">
          <div className="p-15">
            <div className="flex items-end w-full">
              <div className="w-80">
                <h4 className="mid-text text-dark font-600">Estimated total</h4>
                <p className="mini-text text-gray">Taxes and shipping at checkout</p>
              </div>
              <p className="small-text text-dark font-600 w-20 text-right">${subtotal.toFixed(2)}</p>
            </div>
            <div className="grid-cols-2 gap-12 mt-12">
              <Button
                text="Explore More"
                onClick={() => {
                  onCloseCart();
                  onNavigate("/products");
                }}
                version="v3"
                bg="tertiary"
                color="dark"
                className="rounded-30 font-500"
              />
              <Button
                text="Send Enquiry"
                onClick={() => {
                  onCloseCart();
                  onNavigate("/connect");
                }}
                version="v3"
                bg="dark"
                color="white"
                className="rounded-30 font-500"
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
);

const HeaderActions = React.memo(
  ({ isHeaderWhite, isMobileOpen, setIsMobileOpen, cartSection, mobileCartSection, onNavigate }) => {
    return (
      <div className={`${ActionClass} flex justify-end`}>
        <div className="sm-hidden md-hidden flex items-center" style={{ gap: "14px" }}>
          <Button
            aria-label="Call Us"
            onClick={() => {
              window.location.href = "tel:+5284567592";
            }}
            icon="Phone"
            iconWidth="16"
            iconHeight="16"
            iconStrokeWidth="2"
            variant="outline"
            border={
              configData?.Header?.HeaderSticky
                ? isHeaderWhite
                  ? "primary"
                  : "white"
                : "primary"
            }
            iconStroke={
              configData?.Header?.HeaderSticky
                ? isHeaderWhite
                  ? "var(--primary)"
                  : "var(--white)"
                : "var(--primary)"
            }
            version="icon"
            bg="transparent"
            className="rounded-30 p-10"
          />

          {cartSection}

          <Button
            text="Get A Quote"
            onClick={() => onNavigate("/connect")}
            bg="primary"
            color="white"
            border="primary"
            icon={configData?.Header?.HeaderType === 4 ? "" : "ArrowRight"}
            iconPosition="right"
            iconWidth="16"
            iconHeight="16"
            version="v1"
            className="rounded-30"
          />
        </div>

        <div className="hidden md-flex sm-flex items-center">
          <Button
            aria-label="Call Us"
            onClick={() => {
              window.location.href = "tel:+5284567592";
            }}
            icon="Phone"
            iconWidth="22"
            iconHeight="22"
            iconStrokeWidth="1.5"
            iconStroke={
              configData?.Header?.HeaderSticky
                ? isHeaderWhite
                  ? "#161616"
                  : "#FFFFFF"
                : "#161616"
            }
            version="icon"
            bg="transparent"
          />

          {mobileCartSection || cartSection}
          <Button
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            icon={isMobileOpen ? "Close" : "Menu"}
            iconWidth="30"
            iconHeight="30"
            iconStrokeWidth="1.5"
            iconStroke={
              configData?.Header?.HeaderSticky
                ? isHeaderWhite
                  ? "#161616"
                  : "#FFFFFF"
                : "#161616"
            }
            version="icon"
            bg="transparent"
          />
        </div>
      </div>
    );
  }
);

const MegaMenu = React.memo(
  ({ activeMegaMenu, activeCategoryTab, setActiveCategoryTab, onClose, onMouseEnter, onMouseLeave }) => {
    const currentMenu = React.useMemo(() => {
      if (!activeMegaMenu) return null;
      return dynamicMegaMenu?.[activeMegaMenu] || null;
    }, [activeMegaMenu]);

    const categories = React.useMemo(() => {
      return currentMenu?.categories || [];
    }, [currentMenu]);

    const currentCategory = React.useMemo(() => {
      return categories.find((c) => c.id === activeCategoryTab) || categories[0];
    }, [categories, activeCategoryTab]);

    if (!currentMenu || !categories.length) return null;

    return (
      <Dropdown
        isOpen={Boolean(activeMegaMenu)}
        onClose={onClose}
        align="full"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="w-full bg-white bordh"
        style={{ marginTop: "-5px" }}
      >
        <Container>
          <div className="flex items-start gap-12 py-20 w-full">
            <div className="grid-cols-1 w-20">
              {categories.map((cat) => {
                const isActive = currentCategory?.id === cat.id;

                return (
                  <div
                    key={cat.id}
                    onMouseEnter={() => setActiveCategoryTab(cat.id)}
                    onClick={() => setActiveCategoryTab(cat.id)}
                    className="flex items-center justify-between p-12 rounded-5 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? "var(--forth)" : "transparent",
                      color: isActive ? "var(--dark)" : "#334155",
                    }}
                  >
                    <p className="small-text font-500">{cat.name}</p>
                    {cat.badge && (
                      <Badge
                        text={cat.badge}
                        color={cat.badgeColor || cat.badgeTheme}
                        size="xs"
                        shape="pill"
                        className="px-12 py-3"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="w-80">
              <div key={currentCategory?.id || "category-grid"} className="grid-cols-4 sm-grid-cols-2 gap-12">
                {currentCategory?.items?.map((item, idx) => (
                  <NavLink
                    key={`${currentCategory?.id || "cat"}-${item.title || item.href || idx}`}
                    to={item.href || "/products"}
                    onClick={onClose}
                  >
                    <div className="w-full rounded-5 overflow-hidden relative">
                      <Image
                        src={resolveImagePath(item.image)}
                        alt={item.title}
                        className="w-full h-150 object-cover flex hover:scale-105 transition-transform"
                      />
                      {item.badge && (
                        <div className="absolute top-8 left-8 z-2">
                          <Badge
                            text={item.badge}
                            color={item.badgeColor || item.badgeTheme}
                            size="xs"
                            shape="pill"
                          />
                        </div>
                      )}
                    </div>
                    <p className="small-text font-500 text-dark mt-6">{item.title}</p>
                    {item.price && <p className="mini-text text-danger font-600 mt-1">{item.price}</p>}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Dropdown>
    );
  }
);

const MobileMenu = React.memo(({ isMobileOpen, pathname, onClose, onNavigate }) => {
  const [menuView, setMenuView] = React.useState({ level: 0 });

  React.useEffect(() => {
    if (!isMobileOpen) {
      setMenuView({ level: 0 });
    }
  }, [isMobileOpen]);

  if (!isMobileOpen) return null;

  return (
    <div className="relative top-0 left-0 w-full bg-white h-400 bordb bordh pb-20 overflow-y-auto z-50 hidden sm-grid-cols-1">
      {menuView.level === 0 && (
        <div>
          <div className="grid-cols-1 px-14">
            {header.navLinks?.map((item) => {
              const isActive = pathname === item.href;
              const hasSubMenu =
                item.hasMegaMenu &&
                item.megaMenuKey &&
                dynamicMegaMenu?.[item.megaMenuKey]?.categories?.length > 0;

              return (
                <div key={item.href} className="py-13 bordb">
                  {hasSubMenu ? (
                    <div
                      onClick={() =>
                        setMenuView({
                          level: 1,
                          title: item.label,
                          megaKey: item.megaMenuKey,
                          categories: dynamicMegaMenu[item.megaMenuKey]?.categories || [],
                        })
                      }
                      className="flex items-center justify-between cursor-pointer"
                    >
                      <p
                        className="small-text font-500 uppercase"
                        style={{ color: isActive ? "var(--primary)" : "var(--dark)" }}
                      >
                        {item.label}
                      </p>
                      <Icon
                        name="ChevronRight"
                        width="18"
                        height="18"
                        stroke={isActive ? "var(--primary)" : "var(--dark)"}
                      />
                    </div>
                  ) : (
                    <NavLink
                      to={item.href}
                      onClick={onClose}
                      className="flex items-center justify-between"
                    >
                      <p
                        className="small-text font-500 uppercase"
                        style={{ color: isActive ? "var(--primary)" : "var(--dark)" }}
                      >
                        {item.label}
                      </p>
                      <Icon
                        name="ChevronRight"
                        width="18"
                        height="18"
                        stroke={isActive ? "var(--primary)" : "var(--dark)"}
                      />
                    </NavLink>
                  )}
                </div>
              );
            })}
          </div>

          {categoryMenuItems.length > 0 && (
            <div className="py-15 bg-forth px-14">
              {categoryMenuItems.map((item) => {
                const hasSubMenu =
                  item.hasMegaMenu &&
                  item.megaMenuKey &&
                  dynamicMegaMenu?.[item.megaMenuKey]?.categories?.length > 0;

                return (
                  <div key={item.label} className="py-16 px-14 bg-white mb-5 rounded-5">
                    {hasSubMenu ? (
                      <div
                        onClick={() =>
                          setMenuView({
                            level: 1,
                            title: item.label,
                            megaKey: item.megaMenuKey,
                            categories: dynamicMegaMenu[item.megaMenuKey]?.categories || [],
                          })
                        }
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <p className="small-text font-500 uppercase text-dark flex items-center gap-8">
                          {item.label}
                        </p>
                        <Icon name="ChevronRight" width="18" height="18" stroke="var(--gray)" />
                      </div>
                    ) : (
                      <NavLink
                        to={item.href || "/product"}
                        onClick={onClose}
                        className="flex items-center justify-between"
                      >
                        <p className="small-text font-500 uppercase text-dark flex items-center gap-8">
                          {item.label}
                        </p>
                        <Icon name="ChevronRight" width="18" height="18" stroke="var(--gray)" />
                      </NavLink>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div className="px-14 mt-15">
            <Button
              onClick={() => {
                onClose();
                onNavigate("/connect");
              }}
              icon="ArrowRight"
              iconPosition="right"
              iconWidth="18"
              iconHeight="18"
              iconStroke="var(--white)"
              version="v3"
              className="w-full justify-center"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      )}

      {menuView.level === 1 && (
        <div className="w-full">
          <div
            onClick={() => setMenuView({ level: 0 })}
            className="w-full flex items-center gap-4 p-16 bordb bg-forth cursor-pointer"
          >
            <Icon name="ChevronLeft" width="18" height="18" stroke="var(--dark)" />
            <p className="small-text font-500 text-dark">BACK</p>
          </div>

          <div className="px-18">
            {menuView.categories?.map((cat) => (
              <div
                key={cat.id || cat.name}
                onClick={() => {
                  if (cat.items && cat.items.length > 0) {
                    setMenuView({
                      level: 2,
                      title: cat.name,
                      items: cat.items,
                      parentCategories: menuView.categories,
                      megaKey: menuView.megaKey,
                    });
                  } else {
                    onClose();
                    onNavigate(cat.href || `/products?type=${cat.id}`);
                  }
                }}
                className="py-18 bordb flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-8">
                  <p className="small-text font-500 text-dark">{cat.name}</p>
                  {cat.badge && (
                    <Badge color="success" shape="pill" text={cat.badge} size="xs" />
                  )}
                </div>
                <Icon name="ChevronRight" width="18" height="18" stroke="var(--gray)" />
              </div>
            ))}
          </div>
        </div>
      )}

      {menuView.level === 2 && (
        <div className="w-full">
          <div
            onClick={() =>
              setMenuView({
                level: 1,
                title: menuView.title,
                megaKey: menuView.megaKey,
                categories: menuView.parentCategories,
              })
            }
            className="w-full flex items-center gap-4 p-16 bordb bg-forth cursor-pointer"
          >
            <Icon name="ChevronLeft" width="18" height="18" stroke="var(--dark)" />
            <p className="small-text font-500 text-dark">BACK</p>
          </div>

          <div className="px-18">
            {menuView.items?.map((item, idx) => (
              <div
                key={item.title || item.href || idx}
                onClick={() => {
                  onClose();
                  onNavigate(
                    item.href ||
                    `/products?type=${item.title?.toLowerCase().replace(/\s+/g, "-")}`
                  );
                }}
                className="py-18 bordb flex items-center gap-12 cursor-pointer"
              >
                {item.image && (
                  <Image
                    src={resolveImagePath(item.image)}
                    alt={item.title}
                    height="45px"
                    className="w-15 object-cover flex rounded-5"
                  />
                )}
                <div className="w-85">
                  <p className="small-text font-500 text-dark line-clamp2 capitalize">
                    {item.title}
                  </p>
                  {item.price && (
                    <p className="mini-text text-danger font-600 mt-1">{item.price}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredNav, setHoveredNav] = React.useState(null);
  const [activeMegaMenu, setActiveMegaMenu] = React.useState(null);
  const [activeCategoryTab, setActiveCategoryTab] = React.useState(null);

  const megaMenuTimerRef = React.useRef(null);

  const {
    cartItems,
    cartQty,
    subtotal,
    removeFromCart,
    updateQuantity,
    setExactQuantity = updateQuantity,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    setActiveMegaMenu(null);
    setHoveredNav(null);
    setIsMobileOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    return () => {
      if (megaMenuTimerRef.current) {
        clearTimeout(megaMenuTimerRef.current);
      }
    };
  }, []);

  const handleNavMouseEnter = React.useCallback((item) => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
    }

    setHoveredNav(item.label || item.href);

    const targetMegaKey =
      item.hasMegaMenu &&
        item.megaMenuKey &&
        dynamicMegaMenu?.[item.megaMenuKey]
        ? item.megaMenuKey
        : null;

    setActiveMegaMenu(targetMegaKey);

    if (
      targetMegaKey &&
      dynamicMegaMenu?.[targetMegaKey]?.categories?.[0]?.id
    ) {
      setActiveCategoryTab(
        dynamicMegaMenu[targetMegaKey].categories[0].id
      );
    }
  }, []);

  const handleNavMouseLeave = React.useCallback(() => {
    megaMenuTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredNav(null);
    }, 180);
  }, []);

  const handleMegaMenuMouseEnter = React.useCallback(() => {
    if (megaMenuTimerRef.current) {
      clearTimeout(megaMenuTimerRef.current);
    }
  }, []);

  const handleMegaMenuMouseLeave = React.useCallback(() => {
    megaMenuTimerRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
      setHoveredNav(null);
    }, 180);
  }, []);

  const isMegaOpen = Boolean(activeMegaMenu);
  const isHeaderWhite = isScrolled || isMobileOpen || isMegaOpen;
  const headerBg = isHeaderWhite ? "var(--white)" : "transparent";
  const headerBorder = isHeaderWhite ? "1px solid var(--white)" : "1px solid rgba(255, 255, 255, 0.1)";

  const handleCloseMobile = React.useCallback(() => {
    setIsMobileOpen(false);
  }, []);

  const handleOpenCart = React.useCallback(() => {
    setIsCartOpen(true);
  }, [setIsCartOpen]);

  const handleCloseCart = React.useCallback(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen]);

  const handleRemoveFromCart = React.useCallback((id) => {
    removeFromCart(id);
  }, [removeFromCart]);

  const handleSetQuantity = React.useCallback((id, value) => {
    const setQty = setExactQuantity || updateQuantity;
    if (typeof setQty === "function") {
      setQty(id, value);
    }
  }, [setExactQuantity, updateQuantity]);

  const handleNavigate = React.useCallback((path) => {
    navigate(path);
  }, [navigate]);

  const handleCloseMegaMenu = React.useCallback(() => {
    setActiveMegaMenu(null);
  }, []);

  return (
    <Container
      as="header"
      version="v0"
      style={{
        position: configData?.Header?.HeaderSticky ? "fixed" : "relative",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: configData?.Header?.HeaderSticky ? headerBg : "transparent",
        borderBottom: configData?.Header?.HeaderSticky ? headerBorder : "transparent",
        transition: "background-color 0.35s ease",
      }}
    >
      <div className="w-full relative">
        <HeaderTopBar />

        <Container>
          <div className="flex items-center w-full" style={{ height: "64px" }}>
            <HeaderLogo isHeaderWhite={isHeaderWhite} onCloseMobile={handleCloseMobile} />

            <HeaderNavigation
              pathname={location.pathname}
              hoveredNav={hoveredNav}
              activeMegaMenu={activeMegaMenu}
              isHeaderWhite={isHeaderWhite}
              onNavMouseEnter={handleNavMouseEnter}
              onNavMouseLeave={handleNavMouseLeave}
            />

            <HeaderActions
              isHeaderWhite={isHeaderWhite}
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
              onNavigate={handleNavigate}
              cartSection={
                <CartSidebar
                  cartItems={cartItems}
                  cartQty={cartQty}
                  subtotal={subtotal}
                  isCartOpen={isCartOpen}
                  isHeaderWhite={isHeaderWhite}
                  onOpenCart={handleOpenCart}
                  onCloseCart={handleCloseCart}
                  onRemove={handleRemoveFromCart}
                  onSetQuantity={handleSetQuantity}
                  onNavigate={handleNavigate}
                  isMobile={false}
                />
              }
              mobileCartSection={
                <CartSidebar
                  cartItems={cartItems}
                  cartQty={cartQty}
                  subtotal={subtotal}
                  isCartOpen={isCartOpen}
                  isHeaderWhite={isHeaderWhite}
                  onOpenCart={handleOpenCart}
                  onCloseCart={handleCloseCart}
                  onRemove={handleRemoveFromCart}
                  onSetQuantity={handleSetQuantity}
                  onNavigate={handleNavigate}
                  isMobile={true}
                />
              }
            />
          </div>
        </Container>

        <HeaderBottomBar
          pathname={location.pathname}
          hoveredNav={hoveredNav}
          activeMegaMenu={activeMegaMenu}
          isHeaderWhite={isHeaderWhite}
          onNavMouseEnter={handleNavMouseEnter}
          onNavMouseLeave={handleNavMouseLeave}
        />

        <MegaMenu
          activeMegaMenu={activeMegaMenu}
          activeCategoryTab={activeCategoryTab}
          setActiveCategoryTab={setActiveCategoryTab}
          onClose={handleCloseMegaMenu}
          onMouseEnter={handleMegaMenuMouseEnter}
          onMouseLeave={handleMegaMenuMouseLeave}
        />

        <MobileMenu
          isMobileOpen={isMobileOpen}
          pathname={location.pathname}
          onClose={handleCloseMobile}
          onNavigate={handleNavigate}
        />
      </div>
    </Container>
  );
};

export default React.memo(Header);