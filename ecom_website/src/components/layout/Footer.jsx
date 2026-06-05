import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../common/Container'
import footerData from '../../data/footer.json'

const Footer = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -5% 0px' }
    )
    if (footerRef.current) observer.observe(footerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <footer ref={footerRef} className="bg-white w-full py-60">
      <style>{`
        .footer-link {
          color: #6b6375 !important;
          transition: color 0.2s ease !important;
        }
        .footer-link:hover {
          color: var(--primary) !important;
        }
        .social-link {
          transition: all 0.2s ease !important;
        }
        .social-link:hover {
          background: var(--primary) !important;
          color: var(--white) !important;
          border-color: var(--primary) !important;
          transform: translateY(-2px) !important;
        }
        .newsletter-input:focus {
          border-color: var(--primary) !important;
        }
        .newsletter-btn:hover {
          background: var(--primary) !important;
          opacity: 0.9;
        }
      `}</style>

      <Container>
        <div>
          <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12">

            {/* Column 1: Brand Info */}
            <div
              className="flex flex-column"
              style={{
                transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s",
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                opacity: isVisible ? 1 : 0
              }}
            >
              <div className="flex items-center gap-6 mb-15">
                <span className='title-text'>{footerData.brand.logo}</span>
                <span className="title-text font-700 text-dark">{footerData.brand.name}</span>
              </div>
              <p className="para-text" style={{ color: "#6b6375" }}>
                {footerData.brand.description}
              </p>
              <div className="flex gap-12 mt-30">
                {footerData.brand.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="social-link center-div border-ec rounded-full"
                    style={{ width: '36px', height: '36px', backgroundColor: 'rgba(122, 27, 231, 0.05)', color: '#0f1623' }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Dynamic Columns 2 & 3 */}
            {footerData.columns.map((col, idx) => (
              <div
                key={idx}
                className="flex flex-column"
                style={{
                  transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s",
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${(idx + 1) * 150}ms`
                }}
              >
                <h3 className="text-dark mid-text mb-20 font-600">{col.title}</h3>
                <ul className="list-none" style={{ padding: 0, margin: 0 }}>
                  {col.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="mb-12">
                      <a
                        className="footer-link cursor-pointer small-text"
                        onClick={() => navigate(link.path)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Column 4: Newsletter */}
            <div
              className="flex flex-column"
              style={{
                transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s",
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${(footerData.columns.length + 1) * 150}ms`
              }}
            >
              <h3 className="text-dark mid-text mb-20 font-600">{footerData.newsletter.title}</h3>
              <p className="small-text" style={{ color: "#6b6375" }}>
                {footerData.newsletter.description}
              </p>
              <form className="flex gap-8 mt-15" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}>
                <input
                  type="email"
                  placeholder={footerData.newsletter.placeholder}
                  className="bg-white border-ec rounded-5 px-12 py-8 text-dark"
                  style={{ flex: 1, outline: 'none' }}
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-white border-0 px-14 py-8 rounded-5 font-600 cursor-pointer"
                >
                  {footerData.newsletter.buttonText}
                </button>
              </form>
            </div>

          </div>

          {/* Bottom Row */}
          <div
            className="flex justify-between items-center sm-flex-column sm-text-center mt-40 pt-25"
            style={{
              borderTop: "1px solid #e5e4e7",
              gap: "15px",
              color: "#6b6375",
              transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s",
              transform: isVisible ? "translateY(0)" : "translateY(30px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "500ms"
            }}
          >
            <div className="small-text">{footerData.bottom.copyright}</div>
            <div className="flex" style={{ gap: '15px' }}>
              {footerData.bottom.links.map((link, idx) => (
                <a key={idx} href={link.url} className="footer-link small-text">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </footer>
  )
}

export default Footer
