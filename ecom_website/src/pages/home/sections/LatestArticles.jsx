import blogsData from '../../../data/blogs.json';
import Container from '../../../components/common/Container';
import CardLayout from '../../../components/layout/CardLayout';

const LatestArticles = ({ onArticleClick }) => {
  const articles = (blogsData || []).filter(item => item.isHome);

  return (
    <Container className="bg-forth">
      <div className="w-full pt-30 pb-20">
        <div className="flex justify-between items-center mb-24">
          <h2 className="title-text text-dark font-600">Latest from Justdial</h2>
          <p className="text-primary font-500 cursor-pointer small-text">
            View All Articles ➔
          </p>
        </div>

        {/* Articles Grid */}
        <CardLayout
          items={articles}
          cardType="article"
          cols="4"
          mdCols="2"
          smCols="1"
          gap="12"
          onCardClick={onArticleClick}
        />
      </div>
    </Container>
  );
};

export default LatestArticles;
