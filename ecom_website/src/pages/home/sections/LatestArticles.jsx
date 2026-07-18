import React from 'react';
import { useNavigate } from 'react-router-dom';
import { blogs as blogsData } from '../../../utils/apiData';
import CardLayout from '../../../components/layout/CardLayout';

const LatestArticles = ({ onArticleClick, cms }) => {
  const navigate = useNavigate();
  if (!cms) return null;
  const articles = (blogsData || []).filter(item => item.isHome);

  const handleCardClick = (item) => {
    if (onArticleClick) {
      onArticleClick(item);
    } else if (item && item.id) {
      navigate(`/blog-detail/${item.id}`);
    }
  };

  return (
    <div className='py-30'>
      <div className="flex justify-between items-center mb-24">
        <h2 className="title-text text-dark font-600">{cms.latestArticles.title}</h2>
        <p onClick={() => navigate('/blog')} className="text-primary font-500 cursor-pointer small-text">
          {cms.latestArticles.viewAll}
        </p>
      </div>

      {/* Articles Grid */}
      <CardLayout
        items={articles.slice(0, 4)}
        cardType="article"
        isSlider={false}
        cols="4"
        mdCols="2"
        smCols="1"
        onCardClick={handleCardClick}
      />
    </div>
  );
};

export default LatestArticles;
