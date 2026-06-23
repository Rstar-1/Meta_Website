import React from 'react';

const BusinessPromo = ({ onRegisterBusiness }) => {
  return (
    <section className="home4-promo-banner-section">
      <div className="promo-banner-card">
        <div className="promo-text-side">
          <h2 className="promo-headline">
            Grow <span>Your Business</span><br />with Justdial
          </h2>
          <p className="promo-desc">
            Get more visibility, connect with more customers and grow your business fast.
          </p>
        </div>

        <div className="promo-action-side">
          <button 
            className="list-biz-btn"
            onClick={onRegisterBusiness}
          >
            List Your Business
          </button>
        </div>
      </div>
    </section>
  );
};

export default BusinessPromo;
