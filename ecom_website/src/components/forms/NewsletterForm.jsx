import React, { useState } from 'react';
import Icon from '../common/Icon';

const NewsletterForm = ({
  variant = 'card', // 'card' or 'footer'
  placeholder,
  buttonText = 'Subscribe',
  title = 'Subscribe to Our Newsletter',
  subtitle = 'Get the latest marketing insights and strategies straight to your inbox.',
  onSubscribe
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Email address is required');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    // Send SMS & Email notification
    const message = `Newsletter Subscription Request:\nEmail: ${trimmedEmail}`;
    const smsBody = encodeURIComponent(message);

    // Send background email via Formspree
    fetch("https://formspree.io/rajshetye.5855@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        email: trimmedEmail,
        message: message,
        subject: "New Newsletter Subscription"
      })
    }).catch(err => console.error("Formspree error:", err));

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const smsUrl = `sms:${import.meta.env.VITE_PHONE || '8779030638'}${isIOS ? '&' : '?'}body=${smsBody}`;

    window.location.href = smsUrl;

    if (onSubscribe) {
      onSubscribe(trimmedEmail);
    } else if (variant === 'footer') {
      alert('Subscribed!');
    }
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  if (variant === 'footer') {
    return (
      <div className="w-full">
        <form className="flex gap-8 mt-15" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder={placeholder || 'Corporate email...'}
            className="newsletter-input rounded-5 px-12 py-8 text-white"
            style={{ flex: 1, outline: 'none' }}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            required
          />
          <button
            type="submit"
            className="newsletter-btn bg-primary text-white border-0 px-14 py-8 rounded-5 font-600 cursor-pointer"
          >
            {buttonText}
          </button>
        </form>
        {error && (
          <small className="text-danger mt-6 block mini-text" style={{ color: '#ef4444' }}>
            {error}
          </small>
        )}
      </div>
    );
  }

  return (
    <div className="bg-dark text-white rounded-10 p-20 relative overflow-hidden">
      <Icon
        name="Send"
        width="42"
        height="42"
        className="absolute text-white"
        strokeWidth="1.5"
        style={{
          color: 'rgba(255, 255, 255, 0.05)',
          right: '15px',
          top: '15px',
          pointerEvents: 'none',
        }}
      />

      <h3 className="mid-text font-600 text-white">{title}</h3>
      <p className="mini-text text-white mt-5 mb-15">{subtitle}</p>

      {isSubscribed ? (
        <div className="p-10 bg-light-success text-success rounded-5 font-600 small-text text-center">
          ✓ Subscribed successfully!
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit} className="flex bg-white rounded-5 overflow-hidden">
            <input
              type="email"
              placeholder={placeholder || 'Enter your email'}
              className="h-input bg-white p-10 border-0"
              style={{ outline: 'none', fontSize: '13px', width: '100%' }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              required
            />
            <button
              type="submit"
              className="bg-primary text-white font-600 px-15 border-0 cursor-pointer mini-text"
            >
              {buttonText}
            </button>
          </form>
          {error && (
            <small className="text-danger mt-6 block mini-text" style={{ color: '#ef4444' }}>
              {error}
            </small>
          )}
        </div>
      )}
    </div>
  );
};

export default NewsletterForm;
