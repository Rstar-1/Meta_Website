import articles from '../../../data/homeArticles.json';
import Container from '../../../components/common/Container';

const LatestArticles = ({ onArticleClick }) => {


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
        <div className='grid-cols-4 md-grid-cols-2 sm-grid-cols-1 gap-12'>
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-5 overflow-hidden cursor-pointer"

            >
              {/* Image box */}
              <div className="overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-200 object-cover"

                />
              </div>

              {/* Details */}
              <div className="p-10">
                <p
                  className="px-12 py-5 rounded-5 font-600 mini-text mb-10 w-max bg-light-primary text-primary"
                >
                  {article.tag}
                </p>

                <h3
                  className="text-dark font-600 mid-text line-clamp1"
                >
                  {article.title}
                </h3>
                <p className='text-primary font-500 mini-text mt-3'>{article.date} • {article.readTime}</p>
                <p className='text-gray small-text line-clamp2 mt-7'>{article.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default LatestArticles;
