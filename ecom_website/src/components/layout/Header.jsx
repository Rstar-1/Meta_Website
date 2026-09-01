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

  return (
    <Container
      as="header"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        width: "100%",
        backgroundColor: isScrolled ? "#FFFFFF" : "transparent",
        borderBottom: isScrolled ? "1px solid #EAEAEA" : "1px solid rgba(255, 255, 255, 0.1)",
        transition: "background-color 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease"
      }}
    >
      <div
        className="flex items-center justify-between mx-auto w-full"
        style={{ height: "70px" }}
      >
        {/* Left Logo */}
        <NavLink to="/" className="flex items-center">
          <Image
            src={isScrolled ? "/sobo_logo.webp" : "/sobos.png"}
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

            {/* Phone Icon Button */}
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
            <button
              onClick={() => navigate("/connect")}
              className="flex items-center gap-8 font-700 mini-text px-24 py-10 cursor-pointer text-white whitespace-nowrap"
              style={{
                backgroundColor: "#FF5100",
                borderRadius: "50px",
                border: "none",
                boxShadow: "0 4px 15px rgba(255, 81, 0, 0.35)",
                transition: "all 0.3s ease"
              }}
            >
              Get In Touch
              <Icon name="ArrowUpRight" width="16" height="16" stroke="#FFFFFF" />
            </button>
          </div>

          {/* Hamburger Menu Toggle Button for Mobile/Tablet Devices */}
          <Button
            className="hidden md-block sm-block cursor-pointer"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{ border: "none", color: isMobileOpen ? "#FFFFFF" : (isScrolled ? "#161616" : "#FFFFFF") }}
            icon={isMobileOpen ? "Close" : "Menu"}
            iconWidth="24"
            iconHeight="24"
            iconStrokeWidth="2"
            version="v1"
            bg="forth"
          />
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed left-0 w-full flex flex-column justify-between px-24 py-20"
          style={{
            top: "70px",
            height: "calc(100vh - 70px)",
            backgroundColor: "rgba(17, 17, 17, 0.96)",
            backdropFilter: "blur(12px)",
            boxSizing: "border-box",
            overflowY: "auto",
            zIndex: 999
          }}
        >
          <div className="grid-cols-1 w-full">
            {headerData.navLinks.map((item, i) => {
              const isActive = location.pathname === item.href;
              return (
                <div key={i} className="py-16 bordb">
                  <NavLink
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="decoration-none flex items-center justify-between"
                  >
                    <span
                      className="para-text font-600 uppercase"
                      style={{
                        color: isActive ? "#FF5100" : "#FFFFFF",
                        letterSpacing: "0.03em"
                      }}
                    >
                      {item.label}
                    </span>
                    <Icon
                      name="ChevronRight"
                      width="18"
                      height="18"
                      stroke={isActive ? "#FF5100" : "rgba(255, 255, 255, 0.4)"}
                    />
                  </NavLink>
                </div>
              );
            })}
          </div>

          <div className="mt-30 w-full pb-20">
            <button
              onClick={() => {
                setIsMobileOpen(false);
                navigate("/connect");
              }}
              className="flex items-center justify-center gap-8 font-700 small-text py-14 w-full cursor-pointer text-white"
              style={{
                backgroundColor: "#FF5100",
                borderRadius: "50px",
                border: "none",
                boxShadow: "0 6px 20px rgba(255, 81, 0, 0.4)"
              }}
            >
              Get In Touch
              <Icon name="ArrowUpRight" width="18" height="18" stroke="#FFFFFF" />
            </button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Header;