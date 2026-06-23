import React from 'react';

const AppPromo = () => {
  return (
    <section className="home4-app-promo-section">
      <div className="app-promo-banner">
        <div className="phone-img-side">
          <img 
            src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop" 
            alt="Mobile App Mockup" 
            loading="lazy"
          />
        </div>

        <div className="app-info-side">
          <h2 className="app-headline">Download the Justdial App</h2>
          <p className="app-desc">
            Search nearby, discover more! Access listings, products, services, and deals on the go.
          </p>
          
          <div className="download-row">
            <a href="#playstore">
              <img 
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                alt="Google Play" 
                className="store-badge"
                loading="lazy"
              />
            </a>
            <a href="#appstore">
              <img 
                src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg" 
                alt="App Store" 
                className="store-badge"
                loading="lazy"
              />
            </a>
          </div>
        </div>

        <div className="qr-code-side">
          <div className="qr-placeholder" aria-hidden="true"></div>
          <span className="qr-label">Scan to Download</span>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
