import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Container from "../common/Container";
import Image from "../common/Image";
import Icon from "../common/Icon";
import Button from "../common/Button";
import headerData from "../../data/header.json";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = (isScrolled || isMobileOpen) ? "#FFFFFF" : "transparent";
  const headerBorder = (isScrolled || isMobileOpen) ? "1px solid #EAEAEA" : "1px solid rgba(255, 255, 255, 0.1)";

  return (
    <Container
      as="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: headerBg,
        borderBottom: headerBorder,
        transition: "background-color 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease"
      }}
    >
      <div
        className="flex items-center justify-between mx-auto w-full"
        style={{ height: "70px" }}
      >
        {/* Left Logo */}
        <NavLink to="/" className="flex items-center" onClick={() => setIsMobileOpen(false)}>
          <Image
            src={(isScrolled || isMobileOpen) ? "/sobo_logo.webp" : "/sobos.png"}
            alt="Infitech Logo"
            className="object-contain"
            style={{ width: "100%", height: "54px" }}
          />
        </NavLink>

        {/* Center Navigation Links */}
        <div className="sm-hidden md-hidden flex items-center h-full gap-4">
          {headerData.navLinks?.map((item, i) => {
            const isActive = location.pathname === item.href;
            const isHovered = hoveredNav === i;
            const linkColor = (isActive || isHovered)
              ? "#FF5100"
              : (isScrolled ? "#161616" : "#FFFFFF");

            return (
              <div
                key={i}
                onMouseEnter={() => setHoveredNav(i)}
                onMouseLeave={() => setHoveredNav(null)}
                className="relative flex items-center h-full"
              >
                <NavLink
                  to={item.href}
                  className="font-500 small-text px-14 py-6 cursor-pointer decoration-none"
                  style={{
                    color: linkColor,
                    transition: "color 0.2s ease"
                  }}
                >
                  {item.label}
                </NavLink>
              </div>
            );
          })}
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-12">
          <div className="sm-hidden md-hidden flex items-center gap-12">

            <a
              href="tel:+5284567592"
              aria-label="Call Us"
              onMouseEnter={() => setHoveredIcon("phone")}
              onMouseLeave={() => setHoveredIcon(null)}
              className="flex items-center justify-center cursor-pointer flex-shrink-0 transition-all decoration-none"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: hoveredIcon === "phone"
                  ? "1px solid #FF5100"
                  : (isScrolled ? "1px solid rgba(0, 0, 0, 0.2)" : "1px solid rgba(255, 255, 255, 0.25)"),
                backgroundColor: hoveredIcon === "phone"
                  ? (isScrolled ? "rgba(255, 81, 0, 0.08)" : "rgba(255, 255, 255, 0.1)")
                  : "transparent"
              }}
            >
              <Icon name="Phone" width="16" height="16" stroke="#FF5100" />
            </a>

            {/* CTA Orange Pill Button */}
            <Button
              onClick={() => navigate("/connect")}
              icon="ArrowUpRight"
              iconPosition="right"
              iconWidth="16"
              iconHeight="16"
              iconStroke="#FFFFFF"
              className="font-700 mini-text px-24 py-10 text-white whitespace-nowrap"
              style={{
                backgroundColor: "#FF5100",
                borderRadius: "50px",
                border: "none",
                boxShadow: "0 4px 15px rgba(255, 81, 0, 0.35)",
                transition: "all 0.3s ease"
              }}
            >
              Get In Touch
            </Button>
          </div>

          {/* Hamburger Menu Toggle Button */}
          <Button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="hidden md-flex sm-flex items-center justify-center rounded-6 p-8"
            style={{
              backgroundColor: (isScrolled || isMobileOpen) ? "#F4F1EA" : "rgba(255, 255, 255, 0.15)",
              border: (isScrolled || isMobileOpen) ? "1px solid #E0DCD3" : "1px solid rgba(255, 255, 255, 0.25)",
              transition: "all 0.25s ease"
            }}
            icon={isMobileOpen ? "Close" : "Menu"}
            iconWidth="24"
            iconHeight="24"
            iconStroke={(isScrolled || isMobileOpen) ? "#161616" : "#FFFFFF"}
            iconStrokeWidth="2.5"
            version="icon"
            bg="transparent"
          />
        </div>
      </div>

      {/* Mobile White-Theme Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed left-0 w-full px-24 py-20"
          style={{
            top: "70px",
            height: "calc(100vh - 70px)",
            backgroundColor: "#FFFFFF",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
            boxSizing: "border-box",
            overflowY: "auto",
            zIndex: 999
          }}
        >
          <div className="grid-cols-1 w-full">
            {headerData.navLinks.map((item, i) => {
              const isActive = location.pathname === item.href;
              return (
                <div
                  key={i}
                  className="py-16"
                  style={{ borderBottom: "1px solid #F0ECE6" }}
                >
                  <NavLink
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="decoration-none flex items-center justify-between"
                  >
                    <span
                      className="para-text font-600 uppercase"
                      style={{
                        color: isActive ? "#FF5100" : "#161616",
                        letterSpacing: "0.03em"
                      }}
                    >
                      {item.label}
                    </span>
                    <Icon
                      name="ChevronRight"
                      width="18"
                      height="18"
                      stroke={isActive ? "#FF5100" : "#999999"}
                    />
                  </NavLink>
                </div>
              );
            })}
          </div>

          <div className="w-full mt-40">
            <Button
              onClick={() => {
                setIsMobileOpen(false);
                navigate("/connect");
              }}
              icon="ArrowUpRight"
              iconPosition="right"
              iconWidth="18"
              iconHeight="18"
              iconStroke="#FFFFFF"
              className="font-700 small-text py-14 w-full text-white"
              style={{
                backgroundColor: "#FF5100",
                borderRadius: "50px",
                border: "none",
                boxShadow: "0 6px 20px rgba(255, 81, 0, 0.35)"
              }}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Header;