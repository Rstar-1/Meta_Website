import categories from '../../../data/homeCategories.json';
import Container from '../../../components/common/Container';

const BrowseCategory = ({ onSelectCategory }) => {
  return (
    <Container className='bg-forth'>
      <div className="w-full py-30">
        <div className='grid-cols-7 gap-12'>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-20 bg-white rounded-10 cursor-pointer text-center"
              onClick={() => onSelectCategory && onSelectCategory(cat.name)}
            >
              <div
                className="mb-12 rounded-full mx-auto flex items-center justify-center"
                style={{
                  backgroundColor: cat.color || '#f3f4f6',
                  width: '70px',
                  height: '70px',
                  fontSize: '32px',
                  transition: 'transform 0.25s ease',
                }}
              >
                {cat.icon}
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
