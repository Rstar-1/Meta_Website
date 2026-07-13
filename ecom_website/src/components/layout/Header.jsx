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

  const navLinks = (headerData.navLinks || []).filter(
    (item) => item.label !== "Products" && item.label !== "Industry"
  );

  return (
    <>
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
                  objectFit: 'contain'
                }}
              />
            </NavLink>

            <div className="flex sm-hidden md-hidden items-center h-full ml-40">
              {navLinks.map((item, i) => (
                <div
                  key={i}
                  className="relative flex items-center"
                  style={{ height: "65px", display: "flex", alignItems: "center" }}
                >
                  <NavLink
                    to={item.href}
                    className="small-text font-500 px-20 py-6 cursor-pointer text-dark"
                    style={{ textDecoration: "none" }}
                  >
                    {item.label}
                  </NavLink>
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
                <NavLink
                  to={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  style={{ textDecoration: "none" }}
                >
                  <p className="para-text font-500 text-dark" style={{ margin: 0 }}>
                    {item.label}
                  </p>
                </NavLink>
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
    </>
  );
};

export default Header;
