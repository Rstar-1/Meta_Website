import React, { useState, useEffect, useRef } from "react";
import Container from "../../../components/common/Container";
import Review from "../../../data/testimonials.json";

const Testimonials = ({ quantity = true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = Review || [];
  const getDaysAgo = (dateString) => {
    const today = new Date();
    const pastDate = new Date(dateString);
    const diffTime = today - pastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const visibleTestimonials = quantity
    ? testimonials.slice(0, 3)
    : testimonials;

  return (
    <Container >
      <div className="py-60" ref={sectionRef}>
        <div className="flex items-center sm-block pb-50 sm-pb-40">
          <div
            className="w-50 sm-w-full pr-20 sm-pr-1"
            style={{
              transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
              transform: isVisible ? "scale(1)" : "scale(0.95)",
              opacity: isVisible ? 1 : 0
            }}
          >
            <div
              className="bg-dark w-full h-500 sm-h-450 relative overflow-hidden rounded-5"
              style={{
                backgroundImage:
                  'url("https://raw.githubusercontent.com/Rstar-1/generic/refs/heads/main/mayur/img/side1.png")',
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right bottom",
              }}
            >
              <img
                src="https://raw.githubusercontent.com/Rstar-1/generic/refs/heads/main/mayur/img/review1.png"
                alt="arrow"
                className="w-full absolute top-0 right-0 h-600 sm-h-500 object-contain flex"
              />
            </div>
          </div>
          <div className="w-50 sm-w-full pl-20 sm-pl-1 sm-mt-30">
            <p
              className="text-gray midpara-text"
              style={{
                transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0
              }}
            >
              Testimonial
            </p>
            <h4
              className="large-text text-dark font-600 w-90 pt-10"
              style={{
                transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "150ms"
              }}
            >
              Hear What They're Saying About Us
            </h4>
            <div
              className="flex items-center w-full gap-10 py-30 sm-py-24"
              style={{
                transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "300ms"
              }}
            >
              <img
                src="https://ex-coders.com/php-template/digtek/assets/img/testimonial/10.png"
                alt="testimonial"
                className="flex object-contain w-15 sm-w-20 rounded-5"
                style={{ height: "80px" }}
              />
              <div className="w-85 sm-w-80">
                <p className="small-text text-gray">3 days ago</p>
                <h5 className="title-text font-600 text-dark">Angela Jones</h5>
                <div className="flex items-center gap-6 mt-4">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="var(--warning)"
                      strokeWidth="2"
                      fill="var(--warning)"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            <h6
              className="title-text font-500 text-dark"
              style={{
                transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "450ms"
              }}
            >
              Outstanding Print Quality
            </h6>
            <p
              className="para-text text-gray w-90 mt-8"
              style={{
                transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: "600ms"
              }}
            >
              Scelerisque in dolor donec neque velit. Risus aenean integer
              elementum odio sed adipiscing. Sem id scelerisque nunc quis.
              Imperdiet nascetur consequat.
            </p>
          </div>
        </div>
        <div className="grid-cols-3 md-grid-cols-2 sm-grid-cols-1 gap-12">
          {visibleTestimonials?.map((item, i) => (
            <div
              key={item.id}
              className="bg-white rounded-5 w-full"
              style={{
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s",
                transform: isVisible ? "translateY(0)" : "translateY(50px)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${750 + i * 150}ms`
              }}
            >
              <div className="p-20">
                <div className="flex items-center w-full gap-12">
                  <img
                    src={item?.img}
                    alt="testimonial"
                    className="flex object-contain w-20 rounded-5"
                    style={{ height: "70px" }}
                  />
                  <div className="w-80">
                    <h5 className="title-text font-600 text-dark">
                      {item?.name}
                    </h5>
                    <div className="flex items-center gap-6 mt-4">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          stroke="var(--warning)"
                          strokeWidth="2"
                          fill="var(--warning)"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="para-text text-gray line-clamp3 mt-16">
                  “{item?.review}”
                </p>
                <p className="small-text text-gray mt-20">
                  {getDaysAgo(item?.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
