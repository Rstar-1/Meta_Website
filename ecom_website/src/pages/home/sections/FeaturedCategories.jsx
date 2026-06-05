import React, { useState, useEffect, useRef } from "react";
import Container from "../../../components/common/Container";

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Smart Factory Automation",
    category: "Industrial",
    image: "https://html.ditsolution.net/industry/indastre6/assets/images/resource/blog3.png",
  },
  {
    id: 2,
    title: "Eco-Friendly Manufacturing",
    category: "Engineering",
    image: "https://html.ditsolution.net/industry/indastre6/assets/images/resource/blog1.png",
  },
  {
    id: 3,
    title: "Advanced Robotics",
    category: "Technology",
    image: "https://html.ditsolution.net/industry/indastre6/assets/images/resource/blog2.png",
  },
  {
    id: 4,
    title: "Advanced Robotics",
    category: "Technology",
    image: "https://html.ditsolution.net/industry/indastre6/assets/images/resource/blog2.png",
  },
];

const FeaturedCategories = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  return (
    <Container className="bg-white">
      <div ref={sectionRef} className="py-80 w-full">
        <p className="headpara-text text-warning font-500 text-center uppercase">
          Our Portfolio
        </p>
        <h2 className="head-text text-dark font-600 capitalize text-center pt-10">
          Featured Projects Showcase
        </h2>

        <div className="grid-cols-4 gap-12 mt-50">
          {PROJECTS_DATA.map((project, i) => (
            <div
              key={i}
              className="rounded-5 overflow-hidden"
              style={{
                perspective: "1000px",
                transition: "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 1s",
                transform: isVisible ? "translateY(0) rotateX(0deg)" : "translateY(100px) rotateX(-15deg)",
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${i * 200}ms`
              }}
            >
              <div className="relative cursor-pointer overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-400 object-cover flex"
                  style={{ transition: "transform 0.5s ease" }}
                />
                <div
                  className="absolute bottom-0 left-0 w-full p-14 bg-tertiary z-99"
                >
                  <p className="text-warning font-500 small-text">{project.category}</p>
                  <h3 className="mid-text text-dark font-500 pt-1">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FeaturedCategories;
