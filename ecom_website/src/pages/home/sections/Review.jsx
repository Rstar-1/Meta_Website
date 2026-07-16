import React from 'react';
import reviewsData from '../../../data/reviews.json';
import Container from '../../../components/common/Container';
import Icon from '../../../components/common/Icon';
import Image from '../../../components/common/Image';

const Review = () => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Icon
        key={i}
        name="Star"
        width="14"
        height="14"
        fill={i < rating ? "#facc15" : "none"}
        stroke={i < rating ? "#facc15" : "#ececec"}
        strokeWidth="2"
        style={{ marginRight: '2px' }}
      />
    ));
  };

  const renderPlatformLogo = (name) => {
    if (name === 'Google') {
      return (
        <div className="flex items-center gap-6">
          <Icon name="Google" width="20" height="20" style={{ flexShrink: 0 }} />
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
          <Icon name="Trustpilot" width="20" height="20" fill="#00b67a" style={{ flexShrink: 0 }} />
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
          <Icon name="Facebook" width="20" height="20" fill="#1877F2" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#1877F2', letterSpacing: '-0.3px' }}>Facebook</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Container style={{ backgroundColor: "var(--forth)" }}>
      <div className="w-full py-40">
        <div className="rounded-10">
          <div className="flex md-flex-column sm-flex-column items-center gap-16">

            <div className='w-20 md-w-full sm-w-full px-10'>
              <h3 className="title-text font-700 text-dark">
                What Our Users Say
              </h3>
              <p className="small-text text-gray mt-3">
                Real reviews from real users
              </p>
            </div>

            <div className="desktop-vertical-divider md-hidden" />

            <div className='w-20 md-w-full sm-w-full px-10'>
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

            <div className="grid-cols-3 md-grid-cols-1 sm-grid-cols-1 gap-12 w-70 md-w-full sm-w-full px-10">
              {reviewsData.userReviews.map((rev) => (
                <div key={rev.id} className="">
                  <div className="flex items-center gap-12 mb-10">
                    <Image
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

          <div className="grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12">
            {reviewsData.platforms.map((plat) => (
              <div key={plat.name} className="flex items-center justify-center sm-justify-start gap-12">
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
