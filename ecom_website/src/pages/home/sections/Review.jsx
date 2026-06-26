import React from 'react';
import reviewsData from '../../../data/reviews.json';
import Container from '../../../components/common/Container';

const Review = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={i < rating ? "#facc15" : "none"}
        stroke={i < rating ? "#facc15" : "#ececec"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '2px' }}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ));
  };

  const renderPlatformLogo = (name) => {
    if (name === 'Google') {
      return (
        <div className="flex items-center gap-6">
          <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
          </svg>
          <span style={{ fontSize: '15px', fontWeight: '700', fontFamily: '"Poppins", sans-serif', color: '#5f6368', letterSpacing: '-0.3px' }}>
            <span style={{ color: '#4285F4' }}>G</span>
            <span style={{ color: '#EA4335' }}>o</span>
            <span style={{ color: '#FBBC05' }}>o</span>
            <span style={{ color: '#4285F4' }}>g</span>
            <span style={{ color: '#34A853' }}>l</span>
            <span style={{ color: '#EA4335' }}>e</span>
          </span>
        </div>
      );
    }
    if (name === 'Trustpilot') {
      return (
        <div className="flex items-center gap-4">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
            {/* Trustpilot Green Star */}
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#00b67a" />
          </svg>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#111314', letterSpacing: '-0.5px' }}>Trustpilot</span>
        </div>
      );
    }
    if (name === 'Justdial') {
      return (
        <span style={{ fontWeight: '800', fontStyle: 'italic', fontSize: '16px', letterSpacing: '-0.5px', flexShrink: 0 }}>
          <span style={{ color: '#0076f6' }}>Just</span>
          <span style={{ color: '#ff6f00' }}>dial</span>
        </span>
      );
    }
    if (name === 'Facebook') {
      return (
        <div className="flex items-center gap-6">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" style={{ flexShrink: 0 }}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#1877F2', letterSpacing: '-0.3px' }}>Facebook</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Container >
      <div className="w-full py-40">
        <div className="bg-white rounded-10">
          <div className="flex items-center gap-6">

            <div className='w-20 px-10'>
              <h3 className="title-text font-700 text-dark">
                What Our Users Say
              </h3>
              <p className="small-text text-gray mt-3">
                Real reviews from real users
              </p>
            </div>

            <div className="desktop-vertical-divider md-hidden" />

            <div className='w-20 px-10'>
              <div className="text-dark">
                <span className="large-text font-700" style={{ fontSize: '38px', lineHeight: '1' }}>
                  {reviewsData.overallRating}
                </span>
                <span className="text-gray mid-text font-500">
                  {' '}/{' '}{reviewsData.ratingScale}
                </span>
              </div>

              <div className="flex my-6">
                {renderStars(5)}
              </div>

              <p className="mini-text text-gray" style={{ margin: 0 }}>
                Based on {reviewsData.totalReviews} reviews
              </p>
            </div>

            <div className="desktop-vertical-divider md-hidden" />

            <div className="grid-cols-3 md-grid-cols-1 gap-12 w-70 px-10">
              {reviewsData.userReviews.map((rev) => (
                <div key={rev.id} className="">
                  <div className="flex items-center gap-12 mb-10">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      loading="lazy"
                      className="rounded-full object-cover"
                      style={{ width: '45px', height: '45px', flexShrink: 0 }}
                    />
                    <div>
                      <h4 className="mid-text font-600 text-dark">
                        {rev.name}
                      </h4>
                      <div className="flex items-center gap-6 mt-1">
                        <div className="flex">
                          {renderStars(rev.rating)}
                        </div>
                        <p className="mini-text text-gray font-300 mt-3">
                          {rev.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="mini-text text-gray font-400">
                    {rev.text}
                  </p>
                </div>
              ))}
            </div>

          </div>

          <div className="w-full my-24" style={{ height: '1px', backgroundColor: '#ececec' }} />

          <div className="grid-cols-4 gap-12">
            {reviewsData.platforms.map((plat) => (
              <div key={plat.name} className="flex items-center justify-center gap-12">
                {renderPlatformLogo(plat.name)}

                <div className="flex items-center gap-6" style={{ fontSize: '14px' }}>
                  <span className="font-700 text-dark">{plat.rating}</span>
                  <span className="text-gray mini-text" style={{ color: '#888' }}>
                    ({plat.reviews})
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </Container>
  );
};

export default Review;
