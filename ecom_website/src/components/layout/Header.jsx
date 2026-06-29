import { memo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../common/Container";
import Button from "../common/Button";
import Image from "../common/Image";
import headerData from "../../data/header.json";

const ProductsMenu = ({ onItemClick }) => (
  <>
    <style>{`
      .mega-menu-item {
        padding: 10px 0px;
        cursor: pointer;
        border-radius: 5px;
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
        color: var(--warning) !important;
      }
      .mega-menu-link:hover {
        color: var(--warning) !important;
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
        color: var(--warning) !important;
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
      <p className="small-text text-secondary font-400 mt-6 cursor-pointer mega-menu-link" onClick={onItemClick}>
        {headerData.productsMenu.bannerLinkText} →
      </p>
    </div>
    {headerData.productsMenu.sections.map((section, idx) => (
      <div key={idx} className="p-18">
        <p className="text-gray uppercase small-text font-500">{section.title}</p>
        <div className="grid grid-cols-1 gap-8 mt-12">
          {section.items.map((item, index) => (
            <div
              key={index}
              className="mega-menu-item"
              onClick={onItemClick}
            >
              <p className="text-dark small-text font-500 px-10" style={{ margin: 0 }}>{item}</p>
              <span className="arrow-icon">➔</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);

const IndustryMenu = ({ onItemClick }) => (
  <>
    <style>{`
      .mega-menu-item {
        padding: 10px 0px;
        cursor: pointer;
        border-radius: 5px;
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
        color: var(--warning) !important;
      }
      .mega-menu-link:hover {
        color: var(--warning) !important;
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
        color: var(--warning) !important;
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
      <p className="small-text text-secondary font-400 mt-6 cursor-pointer mega-menu-link" onClick={onItemClick}>
        {headerData.industryMenu.bannerLinkText} →
      </p>
    </div>
    {headerData.industryMenu.sections.map((section, idx) => (
      <div key={idx} className="p-18">
        <p className="text-gray uppercase small-text font-500">{section.title}</p>
        <div className="grid grid-cols-1 gap-8 mt-12">
          {section.items.map((item, index) => (
            <div
              key={index}
              className="mega-menu-item"
              onClick={onItemClick}
            >
              <p className="text-dark small-text font-500 px-10" style={{ margin: 0 }}>{item}</p>
              <span className="arrow-icon">➔</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </>
);

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

  const handleItemClick = () => {
    setActiveMenu(null);
    navigate("/products");
  };

  return (
    <>
      <Container>
        <div className="flex items-center justify-between w-full" style={{ height: "65px" }}>
          <div className="flex items-center gap-8">
            <NavLink to="/">
              <p className="text-dark font-600 headpara-text">
                LUMINA<span className="text-warning">.PRO</span>
              </p>
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
                      className={({ isActive }) =>
                        `small-text font-500 px-20 py-6 cursor-pointer ${isActive ? "text-warning" : "text-dark hover:text-warning"
                        }`
                      }
                      style={{ textDecoration: "none" }}
                    >
                      {item?.label}
                    </NavLink>
                  ) : (
                    <p className="small-text text-dark font-500 px-20 py-6 cursor-pointer hover:text-warning mb-0" style={{ margin: 0 }}>
                      {item?.label}
                    </p>
                  )}

                  {item?.hasMegaMenu && activeMenu === item?.label && (
                    <div
                      className="absolute z-50 bg-white border rounded-5 shadow-lg"
                      style={{
                        top: "65px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        maxWidth: "90vw",
                      }}
                    >
                      <div
                        className={`${item?.cols} items-start`}
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

          <div className="flex items-center gap-20">
            <div className="sm-hidden md-hidden">
              <Button
                text="Talk to Engineer"
                version="v2"
                bg="warning"
                onClick={() => navigate("/connect")}
              />
            </div>

            {/* Hamburger Menu Toggle Button for Mobile/Tablet Devices */}
            <button
              className="hidden md-block sm-block cursor-pointer bg-transparent border-0 text-dark p-10 hover:text-warning"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{ fontSize: "1.6rem", border: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--warning)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--dark)"}
            >
              {isMobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </Container>

      {isMobileOpen && (
        <div
          className="mobile-drawer bg-white border-bottom py-20 px-30"
          style={{ borderBottom: "1px solid var(--tertiary)" }}
        >
          <div className="flex flex-column gap-15">
            {headerData.navLinks.map((item, i) => (
              <NavLink
                key={i}
                to={item.href || "/products"}
                onClick={() => setIsMobileOpen(false)}
                className="small-text font-600 text-dark hover:text-warning decoration-none py-6 block"
                style={{ textDecoration: "none" }}
              >
                {item.label}
              </NavLink>
            ))}
            <Button
              text="Talk to Engineer"
              version="v2"
              bg="warning"
              onClick={() => {
                setIsMobileOpen(false);
                navigate("/connect");
              }}
              style={{ width: "100%", marginTop: "10px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
