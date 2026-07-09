import { useNavigate } from 'react-router-dom';
import categories from '../../../data/category.json';
import Container from '../../../components/common/Container';
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

  return (
    <Container className="bg-white">
      <div className="w-full py-40">
        <div className="flex justify-between items-center mb-20">
          <h2 className="title-text text-dark font-600">Browse by Category</h2>
          <p
            className="text-primary font-500 cursor-pointer small-text"
            onClick={() => navigate('/products')}
          >
            View All ➔
          </p>
        </div>

        <div className="grid-cols-6 md-grid-cols-3 sm-grid-cols-2 gap-12">
          {categories?.slice(0, 6)?.map((cat) => (
            <div
              key={cat.id}
              className="cursor-pointer text-center group"
              onClick={() => handleCategoryClick(cat)}
            >
              <div
                className="relative rounded-5 flex items-center justify-center overflow-hidden"
                style={{
                  backgroundColor: cat.color || '#f3f4f6',
                  aspectRatio: '4/3'
                }}
              >
                <Image
                  src={resolveImagePath(cat.icon)}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-150 object-contain flex"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>
              <p className="text-dark font-400 mini-text mt-12">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BrowseCategory;
