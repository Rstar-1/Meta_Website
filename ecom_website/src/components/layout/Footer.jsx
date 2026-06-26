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
    <footer ref={footerRef} className="bg-dark w-full py-50" style={{ backgroundColor: '#0f1623' }}>
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
              <h4 className="title-text font-700 text-white">{footerData.brand.name}</h4>
              <p className="small-text font-500 mt-8" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                {footerData.brand.description}
              </p>
              <div className="flex gap-12 mt-30">
                {footerData.brand.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="social-link center-div rounded-full"
                    style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', border: '1px solid rgba(255, 255, 255, 0.1)' }}
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
                <h3 className="text-white mid-text mb-20 font-600">{col.title}</h3>
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
              <h3 className="text-white mid-text mb-20 font-600">{footerData.newsletter.title}</h3>
              <p className="small-text" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                {footerData.newsletter.description}
              </p>
              <form className="flex gap-8 mt-15" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!') }}>
                <input
                  type="email"
                  placeholder={footerData.newsletter.placeholder}
                  className="newsletter-input rounded-5 px-12 py-8 text-white"
                  style={{ flex: 1, outline: 'none' }}
                  required
                />
                <button
                  type="submit"
                  className="newsletter-btn bg-primary text-white border-0 px-14 py-8 rounded-5 font-600 cursor-pointer"
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
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              gap: "15px",
              color: "rgba(255, 255, 255, 0.5)",
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
