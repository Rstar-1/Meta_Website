import { useNavigate } from 'react-router-dom';
import categories from '../../../data/category.json';
import Container from '../../../components/common/Container';

const BrowseCategory = ({ onSelectCategory }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (name) => {
    if (onSelectCategory) {
      onSelectCategory(name);
    } else {
      navigate('/products');
    }
  };

  // Limit homepage categories to 7: first 6 actual categories + 1 custom "More" category
  const displayedCategories = [
    ...categories.slice(0, 7)
  ];

  return (
    <Container className='bg-forth'>
      <div className="w-full py-30">
        <div className='grid-cols-7 md-grid-cols-4 sm-grid-cols-2 gap-12'>
          {displayedCategories.map((cat) => (
            <div
              key={cat.id}
              className="px-10 py-20 bg-white rounded-10 cursor-pointer text-center"
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div className='relative'>
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="flex object-cover rounded-full mx-auto"
                  style={{ width: '80px', height: '80px' }}
                />
              </div>
              <p className="text-gray font-500 mini-text text-center mt-18">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BrowseCategory;
