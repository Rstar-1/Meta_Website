import React from 'react';
import { useNavigate } from 'react-router-dom';
import blogsData from '../../../data/blogs.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const LatestArticles = ({ onArticleClick }) => {
  const navigate = useNavigate();
  const articles = (blogsData || []).filter(item => item.isHome);

  const handleCardClick = (item) => {
    if (onArticleClick) {
      onArticleClick(item);
    } else if (item && item.id) {
      navigate(`/blog-detail/${item.id}`);
    }
  };

  return (
    <Container className="bg-forth">
      <div className="w-full pt-30 pb-20">
        <div className="flex justify-between items-center mb-24">
          <h2 className="title-text text-dark font-600">Latest from Justdial</h2>
          <p onClick={() => navigate('/blog')} className="text-primary font-500 cursor-pointer small-text">
            View All ➔
          </p>
        </div>

        {/* Articles Grid */}
        <CardLayout
          items={articles}
          cardType="article"
          isSlider={true}
          sliderSlidesPerView={1.2}
          sliderBreakpoints={{
            640: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 3.7,
            },
            1024: {
              slidesPerView: 4,
            }
          }}
          onCardClick={handleCardClick}
        />
      </div>
    </Container>
  );
};

export default LatestArticles;
