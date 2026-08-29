import React from "react";
import Container from "../../../components/common/Container";
import Image from "../../../components/common/Image";
import Icon from "../../../components/common/Icon";

const DetailSection = () => {
  const features = [
    {
      icon: "TrendingUp",
      title: "Data-Driven Strategy & Attribution",
      description: "We combine deep demographic research, GA4 tracking, and multi-touch attribution modeling to guarantee maximum campaign ROI."
    },
    {
      icon: "Settings",
      title: "Custom Web Engineering & UX",
      description: "From modern React applications to bespoke brand platforms, we engineer scalable, lightning-fast digital user experiences."
    }
  ];

  return (
    <Container className="bg-white">
      <div className="grid-cols-2 sm-grid-cols-1 gap-12 items-center py-80 sm-py-40 w-full">
        {/* Left Content Column */}
        <div className="pr-15 sm-pr-1">
          <p className="bg-light-primary text-primary small-text px-16 py-5 font-500 rounded-5 w-max">About MetaTech</p>
          <h2 className="head-text text-dark font-600 pt-16">
            Your Trusted Growth Partner in Design & Technology
          </h2>
          <p className="small-text text-gray font-400 mt-13">
            We believe every ambitious business deserves a standout digital presence. With a team of veteran web engineers, UI/UX designers, and performance marketers, we deliver end-to-end digital solutions that convert prospects into brand advocates.
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
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80"
              alt="Digital Agency Strategy Meeting"
            />
            <Image
              className="w-full h-300 sm-h-150 rounded-5 object-cover flex"
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80"
              alt="UI UX Wireframing"
            />
          </div>
          <div className="mt-15">
            <Image
              className="w-full h-200 sm-h-150 rounded-5 object-cover flex"
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80"
              alt="Performance Marketing Dashboard"
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DetailSection;
