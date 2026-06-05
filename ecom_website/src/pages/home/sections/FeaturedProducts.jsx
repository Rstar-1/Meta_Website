import React, { useState, useEffect, useRef } from "react";
import Container from "../../../components/common/Container";

const FeaturedProducts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Industrial Engineering",
      icon: "https://html.ditsolution.net/industry/indastre6/assets/images/resource/service-icon1.png",
      description:
        "Temp incidunt ut labore et dolore magna aliqua uat enim ad minim veniama produce quis",
    },
    {
      id: 2,
      title: "Mechanical Engineering",
      icon: "https://html.ditsolution.net/industry/indastre6/assets/images/resource/service-icon2.png",
      description:
        "Competently develop accurate methods of empowerment through enterprise-wide action items.",
    },
    {
      id: 3,
      title: "Product Manufacturing",
      icon: "https://html.ditsolution.net/industry/indastre6/assets/images/resource/service-icon3.png",
      description:
        "Competently develop accurate methods of empowerment through enterprise-wide action items.",
    },
    {
      id: 4,
      title: "Power & Energy",
      icon: "https://html.ditsolution.net/industry/indastre6/assets/images/resource/service-icon1.png",
      description:
        "Temp incidunt ut labore et dolore magna aliqua uat enim ad minim veniama produce quis",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -25% 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Container
      style={{
        background:
          "url(https://html.ditsolution.net/industry/indastre5/assets/images/resource/testi_bg01.jpg)",
        backgroundSize: "cover",
      }}
    >
      <div className="py-60" ref={sectionRef}>
        <div>
          <p
            className="headpara-text text-warning font-500 text-center capitalize"
            style={{
              transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            What We Offer
          </p>
          <h2
            className="head-text text-dark font-600 capitalize text-center pt-10"
            style={{
              transition: "transform 1s cubic-bezier(0.215, 0.61, 0.355, 1), opacity 1s",
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              opacity: isVisible ? 1 : 0,
              transitionDelay: "100ms",
            }}
          >
            Service Expertise Your Business
          </h2>
        </div>

        <div className="grid-cols-4 gap-12 mt-50">
          {services?.map((service, i) => (
            <div
              key={i}
              className="bg-white p-26 rounded-5 mx-10"
              style={{
                transition: "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.8s",
                transform: isVisible ? "scale(1)" : "scale(0.85)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${200 + i * 100}ms`,
              }}
            >
              <img
                src={service?.icon}
                alt="service icon"
                className="object-contain"
              />
              <h3 className="mid-text text-dark font-600 pt-15">
                {service?.title}
              </h3>
              <p className="para-text text-gray font-500 mt-20">
                {service?.description}
              </p>
              <p className="mt-20 text-warning font-500 para-text">Read More</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeaturedProducts;
