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

  return (
    <Container className='bg-forth'>
      <div className="w-full py-30">
        <div className='grid-cols-7 md-grid-cols-4 sm-grid-cols-2 gap-12'>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-20 bg-white rounded-10 cursor-pointer text-center"
              onClick={() => handleCategoryClick(cat.name)}
            >
              <div
                className="mb-12 rounded-full mx-auto flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: cat.color || '#f3f4f6',
                  width: '70px',
                  height: '70px',
                  transition: 'transform 0.25s ease',
                }}
              >
                {cat.icon && (cat.icon.startsWith('/') || cat.icon.startsWith('http')) ? (
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span style={{ fontSize: '32px' }}>{cat.icon}</span>
                )}
              </div>
              <span className="text-dark font-600 small-text text-center">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BrowseCategory;
