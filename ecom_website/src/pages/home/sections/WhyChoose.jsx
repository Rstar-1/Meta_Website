import React from "react";
import Container from "../../../components/common/Container";
import Image from "../../../components/common/Image";
import Icon from "../../../components/common/Icon";

const WhyChoose = () => {
  const features = [
    {
      icon: "TrendingUp",
      title: "Financial Solution",
      description: "From startups established corporations, we offer tailored advice and services designed to navigate."
    },
    {
      icon: "Settings",
      title: "Financial Solution",
      description: "From startups established corporations, we offer tailored advice and services designed to navigate."
    }
  ];

  return (
    <Container style={{ background: 'var(--forth)' }}>
      <div className="grid-cols-2 sm-grid-cols-1 gap-12 items-center py-50 sm-py-40 w-full">
        {/* Left Content Column */}
        <div className="pr-15 sm-pr-1">
          <p className="bg-light-primary text-primary small-text px-16 py-5 font-500 rounded-5 w-max">About Us</p>
          <h2 className="head-text text-dark font-600 pt-16">
            Know Your Trusted Partner in Business and Finance
          </h2>
          <p className="small-text text-gray font-400 mt-13">
            We believe that every business deserves a strong financial foundation.
            With decades of experience in the industry, our team is dedicated to providing
            personalized, strategic financial solutions that help our clients thrive.
          </p>

          <div className="grid-cols-1 gap-12 mt-19">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-tertiary p-18 rounded-5">
                <div className="flex sm-grid-cols-1 items-center gap-12">
                  <div className="bg-primary flex items-center justify-center rounded-5" style={{ width: '50px', height: '50px' }}>
                    <Icon name={feature.icon} width="18" height="18" strokeWidth="2" stroke="white" />
                  </div>
                  <div className="w-80 sm-w-full ml-4 sm-ml-1">
                    <h4 className="mid-text text-dark font-600">{feature.title}</h4>
                    <p className="small-text text-gray font-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Collage Column */}
        <div className="pl-15 sm-pl-1">
          <div className="grid-cols-2 gap-12">
            <Image
              className="w-full h-300 sm-h-150 rounded-5 object-cover flex"
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop"
              alt="Analyzing financial documents"
            />
            <Image
              className="w-full h-300 sm-h-150 rounded-5 object-cover flex"
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop"
              alt="Business partners vertical profile"
              style={{ filter: "grayscale(100%)" }}
            />
          </div>
          <div className="mt-15">
            <Image
              className="w-full h-200 sm-h-150 rounded-5 object-cover flex"
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=500&auto=format&fit=crop"
              alt="Businessman working on laptop"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WhyChoose;