import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import headerData from "../../data/header.json";

const logoImg = "/sobo_logo.webp";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About Us" },
    { 
      label: "Blogs", 
      href: "/blog", 
      submenu: [
        { label: "All Blogs", href: "/blog" },
        { label: "Design & Branding", href: "/blog" },
        { label: "Development & Tech", href: "/blog" },
        { label: "Marketing Strategy", href: "/blog" }
      ] 
    },
    { href: "/services", label: "Services" },
    { href: "/connect", label: "Connect" }
  ];

  const handleNavClick = (e, href) => {
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      const currentPath = window.location.pathname;
      if (currentPath === path || (currentPath === '/' && path === '/home')) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="bg-white">
      <Container className="navbar">
        <div className="flex items-center justify-between w-full" style={{ height: "65px" }}>
          <div className="flex items-center gap-8">
            <NavLink to="/" className="flex items-center" style={{ textDecoration: 'none' }}>
              <Image
                src={logoImg}
                alt="SOBO Marketing Solution Logo"
                width="128"
                height="50"
                style={{
                  maxHeight: '50px',
                  width: 'auto',
                  objectFit: 'contain'
                }}
              />
            </NavLink>

            <div className="flex sm-hidden md-hidden items-center h-full ml-40">
              <style>{`
                .nav-item-container {
                  position: relative;
                  display: flex;
                  align-items: center;
                  height: 65px;
                }
                .submenu-container {
                  position: absolute;
                  top: 100%;
                  left: 50%;
                  transform: translateX(-50%) translateY(10px);
                  background: #ffffff;
                  min-width: 180px;
                  border-radius: 6px;
                  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
                  border: 1px solid #eeeeee;
                  padding: 10px 0;
                  visibility: hidden;
                  opacity: 0;
                  transition: all 0.2s ease;
                  z-index: 100;
                  display: flex;
                  flex-direction: column;
                }
                .nav-item-container:hover .submenu-container {
                  visibility: visible;
                  opacity: 1;
                  transform: translateX(-50%) translateY(0);
                }
                .submenu-link {
                  display: block;
                  padding: 10px 20px;
                  font-size: 14px;
                  font-weight: 500;
                  color: var(--dark) !important;
                  text-decoration: none !important;
                  transition: all 0.2s ease;
                  white-space: nowrap;
                  text-align: left;
                }
                .submenu-link:hover {
                  background: var(--forth);
                  color: var(--primary) !important;
                }
              `}</style>
              {navLinks.map((item, i) => (
                <div
                  key={i}
                  className="nav-item-container"
                >
                  <NavLink
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="small-text font-500 px-20 py-6 cursor-pointer text-dark"
                    style={{ textDecoration: "none" }}
                  >
                    {item.label}
                  </NavLink>

                  {item.submenu && (
                    <div className="submenu-container">
                      {item.submenu.map((sub, idx) => (
                        <NavLink
                          key={idx}
                          to={sub.href}
                          className="submenu-link"
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-12 sm-gap-1">
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
        <div className="mobile-drawer bg-forth px-24 py-20">
          <div className="grid-cols-1">
            {navLinks.map((item, i) => (
              <div key={i} className="bordb py-12">
                {item.submenu ? (
                  <div>
                    <p className="para-text font-500 text-dark mb-8" style={{ margin: 0 }}>
                      {item.label}
                    </p>
                    <div className="pl-12 flex flex-column gap-8 mt-8">
                      {item.submenu.map((sub, idx) => (
                        <NavLink
                          key={idx}
                          to={sub.href}
                          onClick={() => setIsMobileOpen(false)}
                          style={{ textDecoration: "none" }}
                          className="small-text font-400 text-gray"
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.href}
                    onClick={(e) => {
                      setIsMobileOpen(false);
                      handleNavClick(e, item.href);
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <p className="para-text font-500 text-dark" style={{ margin: 0 }}>
                      {item.label}
                    </p>
                  </NavLink>
                )}
              </div>
            ))}
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
    </div>
  );
};

export default Header;
