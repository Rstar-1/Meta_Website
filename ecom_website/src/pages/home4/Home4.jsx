import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// 🧩 Import Justdial UI Sections
import Header from './sections/Header';
import Hero from './sections/Hero';
import BrowseCategory from './sections/BrowseCategory';
import PopularProducts from './sections/PopularProducts';
import WhyChoose from './sections/WhyChoose';
import FeaturedBusinesses from './sections/FeaturedBusinesses';
import BusinessPromo from './sections/BusinessPromo';
import AppPromo from './sections/AppPromo';
import LatestArticles from './sections/LatestArticles';
import TopCities from './sections/TopCities';
import Footer from './sections/Footer';

// 🎨 Import Styles (SCSS)
import themeStyles from '../../styles/theme.scss?inline';
import structureStyles from '../../styles/structure.scss?inline';
import home4Styles from '../../styles/home4.scss?inline';

// 📦 Shadow DOM Container component to isolate the CSS completely
const ShadowContainer = ({ children, css }) => {
  const containerRef = useRef(null);
  const [shadowRoot, setShadowRoot] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      let root = containerRef.current.shadowRoot;
      if (!root) {
        try {
          root = containerRef.current.attachShadow({ mode: 'open' });
        } catch (e) {
          root = containerRef.current.shadowRoot;
        }
      }

      if (root) {
        let reactRoot = root.querySelector('.shadow-react-root');
        if (!reactRoot) {
          root.innerHTML = '';
          const styleEl = document.createElement('style');
          styleEl.textContent = css;
          root.appendChild(styleEl);

          reactRoot = document.createElement('div');
          reactRoot.className = 'shadow-react-root';
          reactRoot.style.display = 'contents';
          root.appendChild(reactRoot);
        } else {
          const styleEl = root.querySelector('style');
          if (styleEl) {
            styleEl.textContent = css;
          }
        }
        setShadowRoot(reactRoot);
      }
    }
  }, [css]);

  return (
    <div ref={containerRef} style={{ display: 'contents' }}>
      {shadowRoot && createPortal(children, shadowRoot)}
    </div>
  );
};

const Home4 = () => {
  const [activeSubNav, setActiveSubNav] = useState('home');
  const [toasts, setToasts] = useState([]);

  // Toast dispatcher
  const triggerToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  // Click & Action handlers
  const handleSearch = (searchData) => {
    const searchSummary = Object.entries(searchData)
      .filter(([_, val]) => val && val !== 'All')
      .map(([key, val]) => `${key}: "${val}"`)
      .join(', ');
    triggerToast(`Searching for: ${searchSummary || 'Everything'}`, 'success');
  };

  const handleSubNavSelect = (tabId) => {
    setActiveSubNav(tabId);
    triggerToast(`Navigating to category tab: ${tabId.toUpperCase()}`, 'info');
  };

  const handleCategorySelect = (catName) => {
    triggerToast(`Selected category card: ${catName}`, 'success');
  };

  const handleViewProduct = (product) => {
    triggerToast(`Viewing details for product: ${product.name}`, 'info');
  };

  const handleCallBusiness = (biz) => {
    triggerToast(`Dialing ${biz.name} (${biz.phone || '011-2334455'})...`, 'success');
  };

  // Register business
  const handleRegisterBusiness = () => {
    triggerToast('Redirecting to Business Registration portal...', 'success');
  };

  // Article click
  const handleArticleClick = (article) => {
    triggerToast(`Opening Article: "${article.title}"`, 'info');
  };

  // City click
  const handleCitySelect = (cityName) => {
    triggerToast(`Switched active discovery city to: ${cityName}`, 'success');
  };

  // Social click
  const handleSocialClick = (socialName) => {
    triggerToast(`Opening ${socialName} page...`, 'info');
  };

  return (
    <ShadowContainer css={`${themeStyles}\n${structureStyles}\n${home4Styles}`}>
      <div className="home4-wrapper">
        {/* 🧭 Header */}
        <Header
          onSearch={handleSearch}
          onCategorySelect={handleSubNavSelect}
          activeSubNav={activeSubNav}
        />

        {/* ⚡ Hero Banner */}
        <Hero onSearch={handleSearch} />

        {/* 📂 Category grid */}
        <BrowseCategory onSelectCategory={handleCategorySelect} />

        {/* 📦 Popular Products */}
        <PopularProducts onViewProduct={handleViewProduct} />

        {/* 🛡️ Value Propositions */}
        <WhyChoose />

        {/* 🏢 Featured Businesses */}
        <FeaturedBusinesses onCallBusiness={handleCallBusiness} />

        {/* 📈 Grow Business Promo */}
        <BusinessPromo onRegisterBusiness={handleRegisterBusiness} />

        {/* 📱 App Promo */}
        <AppPromo />

        {/* 📰 Latest Articles */}
        <LatestArticles onArticleClick={handleArticleClick} />

        {/* 📍 Top Cities Links */}
        <TopCities onCitySelect={handleCitySelect} />

        {/* 🦶 Footer */}
        <Footer onSocialClick={handleSocialClick} />

        {/* 🍞 Interactive Notification Toast Stack */}
        <div className="home4-toasts-stack">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`home4-toast-card ${toast.type === 'info' ? 'toast-info' : ''}`}
            >
              <span>{toast.type === 'success' ? '✓' : '🛈'}</span>
              <span>{toast.message}</span>
            </div>
          ))}
        </div>
      </div>
    </ShadowContainer>
  );
};

export default Home4;
