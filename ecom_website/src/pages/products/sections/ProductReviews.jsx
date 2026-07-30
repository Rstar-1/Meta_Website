import { useState } from 'react';
import Container from '../../../components/common/Container';
import Modal from '../../../components/common/Modal';
import FormBuilder from '../../../components/common/FormBuilder';
import Button from '../../../components/common/Button';
import Icon from '../../../components/common/Icon';

const StarRating = ({ rating, color = "var(--warning)", size = 16 }) => {
  const stars = [];
  const rounded = Math.round(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        name="Star"
        width={size.toString()}
        height={size.toString()}
        fill={i <= rounded ? color : "none"}
        stroke={color}
        strokeWidth="2"
        style={{ display: 'inline-block', marginRight: '2px' }}
      />
    );
  }
  return <div style={{ display: 'inline-flex', alignItems: 'center' }}>{stars}</div>;
};

const reviewFields = [
  {
    name: "name",
    type: "text",
    label: "Your Name",
    placeholder: "Enter your name",
    validation: { required: true, minLength: 2 },
  },
  {
    name: "rating",
    type: "rating",
    label: "Your Rating",
    defaultValue: 5,
    validation: { required: true },
  },
  {
    name: "comment",
    type: "textarea",
    label: "Your Review",
    placeholder: "Write your review comment here...",
    validation: { required: true, minLength: 10 },
  },
];

const ProductReviews = ({
  reviews = [],
}) => {
  const [localReviews, setLocalReviews] = useState(reviews);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const actualReviews = Array.isArray(localReviews) ? localReviews : [];

  // Calculate total reviews count
  const displayCount = actualReviews.length;

  // Calculate average rating
  const displayRating = displayCount > 0
    ? parseFloat((actualReviews.reduce((sum, r) => sum + r.rating, 0) / displayCount).toFixed(1))
    : 0;

  // Count occurrences of each rating level
  const counts = { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 };
  actualReviews.forEach(r => {
    const key = Math.round(r.rating).toString();
    if (counts[key] !== undefined) {
      counts[key]++;
    }
  });

  // Calculate percentage distribution
  const dist = {
    "5": displayCount > 0 ? Math.round((counts["5"] / displayCount) * 100) : 0,
    "4": displayCount > 0 ? Math.round((counts["4"] / displayCount) * 100) : 0,
    "3": displayCount > 0 ? Math.round((counts["3"] / displayCount) * 100) : 0,
    "2": displayCount > 0 ? Math.round((counts["2"] / displayCount) * 100) : 0,
    "1": displayCount > 0 ? Math.round((counts["1"] / displayCount) * 100) : 0
  };

  const getAspectScoreColor = (score) => {
    return parseFloat(score) >= 4.0 ? '#16A34A' : '#1F2937';
  };

  const aspects = [
    { label: "Quality", score: Math.min(5.0, displayRating + 0.1).toFixed(1) },
    { label: "Performance", score: displayRating.toFixed(1) },
    { label: "Packaging", score: (displayRating - 0.1).toFixed(1) },
    { label: "Delivery", score: (displayRating - 0.2).toFixed(1) },
    { label: "Value", score: Math.min(5.0, displayRating + 0.1).toFixed(1) }
  ];

  const handleReviewSubmit = (formData) => {
    const newReview = {
      name: formData.name,
      rating: Number(formData.rating),
      comment: formData.comment,
      date: "Just now"
    };

    setLocalReviews(prev => [newReview, ...prev]);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <Container className="bg-forth">
      <div className="py-40 w-full">
        <div className="flex sm-grid-cols-1 gap-12 mb-15 border-ec rounded-5 p-20 bg-white">
          <div className="w-15 sm-w-full flex items-center justify-center">
            <div className='text-center'>
              <h2 className="large-text text-primary font-600">
                {displayRating.toFixed(1)}
              </h2>
              <div className="mt-6 mb-2">
                <StarRating rating={displayRating} size={22} color='var(--warning)' />
              </div>
              <p className="mini-text text-gray font-500">
                {displayCount} ratings
              </p>
            </div>
          </div>
          <div className="grid-cols-1 gap-12 w-85 sm-w-full">
            {[
              { label: '5.0', pct: dist["5"] },
              { label: '4.0', pct: dist["4"] },
              { label: '3.0', pct: dist["3"] },
              { label: '2.0', pct: dist["2"] },
              { label: '1.0', pct: dist["1"] }
            ].map((row, idx) => (
              <div key={idx} className="flex items-center gap-12 small-text">

                <div className="rounded-5 overflow-hidden sm-w-70" style={{ flex: 1, height: '18px', backgroundColor: 'var(--forth)' }}>
                  <div
                    style={{
                      width: `${row.pct}%`,
                      height: '100%',
                      backgroundColor: 'var(--primary)'
                    }}
                  ></div>
                </div>

                {/* Info labels on the right */}
                <div className="flex items-center gap-6 sm-w-30" style={{ width: '120px', justifyContent: 'flex-start' }}>
                  <p className="font-500 text-dark mini-text">{row.label}</p>
                  <p className="text-gray font-400 mini-text">
                    {counts[row.label.charAt(0)]} reviews
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center gap-12 mt-15 w-full">
          <div className="flex flex-wrap gap-12">
            {aspects.map((aspect, idx) => (
              <div
                key={idx}
                className="flex items-center gap-8 rounded-5 py-6 px-14 border-ec bg-white"
              >
                <p className='small-text font-500' style={{ color: getAspectScoreColor(aspect.score), fontWeight: '700' }}>
                  {aspect.score}
                </p>
                <span className="text-gray mini-text">
                  {aspect.label}
                </span>
              </div>
            ))}
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            version="v2"
            bg="primary"
          >
            Write a Review
          </Button>
        </div>

        <div className="grid-cols-1 gap-12 mt-20">
          {actualReviews.map((rev, index) => {
            const avatarBg = ['#E0F2FE', '#FEE2E2', '#FEF3C7', '#D1FAE5', '#EDE9FE'][index % 5];
            const avatarColor = ['#0369A1', '#B91C1C', '#B45309', '#047857', '#6D28D9'][index % 5];

            return (
              <div key={index} className="border-ec p-20 rounded-5 bg-white">

                {/* Header row */}
                <div className="flex justify-between items-start gap-12">
                  <div className="flex items-center gap-12">
                    <div
                      className="rounded-full flex items-center justify-center font-700"
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: avatarBg,
                        color: avatarColor,
                        fontSize: '15px'
                      }}
                    >
                      {rev.name ? rev.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <h2 className="headmini-text font-600 text-dark leading-5">{rev.name}</h2>
                      <p className="mini-text text-gray mt-2">{rev.date || '4 months ago'}</p>
                    </div>
                  </div>

                  {/* Rating value and stars */}
                  <div className="flex items-center gap-8">
                    <h3 className="headmini-text font-500 text-dark">{rev.rating.toFixed(1)}</h3>
                    <StarRating rating={rev.rating} size={15} color="var(--warning)" />
                  </div>
                </div>

                {/* Comment body */}
                <p className="mini-text text-gray font-400 mt-15">
                  {rev.comment}
                </p>

              </div>
            );
          })}
        </div>

      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Write a Review"
        size="sm"
        footer={null}
      >
        {isSubmitted ? (
          <div className="text-center py-20">
            <div className="rounded-full mx-auto bg-light-success text-success flex items-center justify-center" style={{ width: '60px', height: '60px', fontSize: '24px', fontWeight: 'bold' }}>
              ✓
            </div>
            <h4 className="title-text font-600 text-success pt-16">Review Submitted!</h4>
            <p className="small-text text-gray mt-6">Thank you for sharing your feedback.</p>
          </div>
        ) : (
          <FormBuilder
            fields={reviewFields}
            onSubmit={handleReviewSubmit}
            submitType="json"
            submitText="Submit Review"
            buttonVersion="v2"
            buttonBg="primary"
          />
        )}
      </Modal>

    </Container>
  );
};

export default ProductReviews;
