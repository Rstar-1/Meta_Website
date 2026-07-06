import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../common/Container'
import Image from '../common/Image'
import Icon from '../common/Icon'
import footerData from '../../data/footer.json'
import logoImg from '../../assets/sobo_logo.png'
import productsData from '../../data/products.json'
import NewsletterForm from '../forms/NewsletterForm'

const Footer = () => {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const footerRef = useRef(null)
  const popularProducts = productsData.filter(p => p.popular).slice(0, 4)

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
    <footer ref={footerRef} className="w-full py-50" style={{ backgroundColor: '#0f1623' }}>
      <Container>
        <div>
          <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 items-start gap-12">

            {/* Column 1: Brand Info */}
            <div
              className="grid-cols-1 pr-10 sm-pr-1"
              style={{
                transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s",
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                opacity: isVisible ? 1 : 0
              }}
            >
              <div className="mb-15 flex items-center">
                <Image
                  src={logoImg}
                  alt="SOBO Marketing Solution Logo"
                  style={{
                    maxHeight: '55px',
                    width: 'auto',
                    objectFit: 'contain',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>
              <p className="small-text font-200 mt-4 text-white">
                {footerData.brand.description}
              </p>
              <div className="flex gap-12 mt-30">
                {footerData.brand.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="social-link center-div rounded-full"
                    style={{
                      width: '36px',
                      height: '36px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      color: '#ffffff',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary)';
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <Icon name={social.iconName} width="16" height="16" stroke="currentColor" strokeWidth="2.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Popular Products */}
            <div
              className="grid-cols-1 pr-10 sm-pr-1"
              style={{
                transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s",
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "150ms"
              }}
            >
              <h3 className="text-white mid-text mb-12 font-600">Popular Products</h3>
              <ul className="list-none m-1 p-1">
                {popularProducts.map((prod) => (
                  <li key={prod.id} className="mb-12">
                    <span
                      onClick={() => navigate(`/product-detail/${prod.id}`)}
                      className="footer-link cursor-pointer small-text"
                    >
                      {prod.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Commissioning Support */}
            {footerData.columns[1] && (
              <div
                className="grid-cols-1 pr-10 sm-pr-1"
                style={{
                  transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s",
                  transform: isVisible ? "translateY(0)" : "translateY(40px)",
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: "300ms"
                }}
              >
                <h3 className="text-white mid-text mb-12 font-600">{footerData.columns[1].title}</h3>
                <ul className="list-none m-1 p-1">
                  {footerData.columns[1].links.map((link, linkIdx) => (
                    <li key={linkIdx} className="mb-12">
                      <span
                        onClick={() => navigate(link.path)}
                        className="footer-link cursor-pointer small-text"
                      >
                        {link.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Column 4: Newsletter */}
            <div
              className="grid-cols-1 pr-10 sm-pr-1"
              style={{
                transition: "transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 0.8s",
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "450ms"
              }}
            >
              <h3 className="text-white mid-text mb-12 font-600">{footerData.newsletter.title}</h3>
              <p className="small-text" style={{ color: "rgba(255, 255, 255, 0.6)" }}>
                {footerData.newsletter.description}
              </p>
              <NewsletterForm
                variant="footer"
                placeholder={footerData.newsletter.placeholder}
                buttonText={footerData.newsletter.buttonText}
              />
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
