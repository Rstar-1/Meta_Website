import React from "react";
import Image from "../../../components/common/Image";
import Icon from "../../../components/common/Icon";
const WhyChoose = ({ cms }) => {
  if (!cms) return null;
  const features = cms.whyChoose.features;

  return (
    <div className="grid-cols-2 sm-grid-cols-1 gap-12 items-center py-50 sm-py-40 w-full">
      {/* Left Content Column */}
      <div className="pr-15 sm-pr-1">
        <p className="bg-light-primary text-primary small-text px-16 py-5 font-500 rounded-5 w-max">{cms.whyChoose.tag}</p>
        <h2 className="head-text text-dark font-600 pt-16">
          {cms.whyChoose.title}
        </h2>
        <p className="small-text text-gray font-400 mt-13">
          {cms.whyChoose.desc}
        </p>

        <div className="grid-cols-1 gap-12 mt-19 w-85 md-w-full sm-w-full">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-tertiary p-18 rounded-5">
              <div className="flex sm-grid-cols-1 items-center gap-12">
                <div className="bg-primary flex items-center justify-center rounded-5" style={{ width: '50px', height: '50px' }}>
                  <Icon name={feature.icon} width="22" height="22" strokeWidth="2" stroke="white" />
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
      <div className="pl-15 sm-pl-1 sm-mt-10">
        <div className="grid-cols-2 gap-12">
          <Image
            className="w-full h-300 sm-h-150 rounded-5 object-cover flex"
            src={cms.whyChoose.images[0].src}
            alt={cms.whyChoose.images[0].alt}
            width={250}
            height={300}
          />
          <Image
            className="w-full h-300 sm-h-150 rounded-5 object-cover flex"
            src={cms.whyChoose.images[1].src}
            alt={cms.whyChoose.images[1].alt}
            style={{ filter: "grayscale(100%)" }}
            width={250}
            height={300}
          />
        </div>
        <div className="mt-15">
          <Image
            className="w-full h-200 sm-h-150 rounded-5 object-cover flex"
            src={cms.whyChoose.images[2].src}
            alt={cms.whyChoose.images[2].alt}
            width={500}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;