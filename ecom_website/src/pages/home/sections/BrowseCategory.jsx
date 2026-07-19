import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../../../utils/apiData';
import { resolveImagePath } from '../../../utils/imageResolver';
import Image from '../../../components/common/Image';

const BrowseCategory = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (cat) => {
    if (onSelectCategory) {
      onSelectCategory(cat.name);
    } else {
      navigate(`/products?category=${cat.id}`, { state: { category: cat.id } });
    }
  };

  // Limit homepage categories to 6
  const displayedCategories = [
    ...categories.slice(0, 6)
  ];

  return (
    <div className="w-full py-30">
      <div className='grid-cols-6 md-grid-cols-3 sm-grid-cols-2 gap-12'>
        {displayedCategories.map((cat) => (
          <div
            key={cat.id}
            className="px-10 py-20 bg-white rounded-10 cursor-pointer text-center"
            onClick={() => handleCategoryClick(cat)}
          >
            <div className='relative'>
              <Image
                src={resolveImagePath(cat.icon)}
                alt={cat.name}
                width="80"
                height="80"
                loading="lazy"
                className="flex object-cover rounded-full mx-auto"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <p className="text-gray font-500 mini-text text-center mt-18">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategory;
