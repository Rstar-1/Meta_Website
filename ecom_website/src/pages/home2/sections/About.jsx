import React from "react";
import Container from "../../../components/common/Container";
import Fade from "../../../components/common/Fade";

const About = () => {
  return (
    <Container id="about">
      <div className="flex items-center justify-between gap-12 py-80">
        {/* Left Side: Image and Stats Card */}
        <div className="relative w-50 pr-10 sm-pr-1">
          <Fade version="v2" direction="left" duration={900}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
              alt="About us team"
              className="w-full h-500 object-cover rounded-10"
            />
            <div
              className="absolute p-15 rounded-10 bg-tertiary"
              style={{
                bottom: "-30px",
                right: "20px"
              }}
            >
              <h3 className="font-600 title-text text-warning">99%</h3>
              <p className="uppercase font-500 mini-text text-gray mt-5" style={{ lineHeight: "1.4" }}>
                Clients Satisfied & Repeating
              </p>
            </div>
          </Fade>
        </div>

        {/* Right Side: Content */}
        <div className="w-50 pl-10 sm-pl-1">
          <Fade version="v2" direction="right" duration={900}>
            <p className="font-500 text-gray mini-text flex items-center gap-5"><span className="dot flex bg-warning rounded-full"></span> ABOUT THEMEDOX</p>
            <h2 className="font-600 head-text text-dark pt-9 uppercase">
              We craft memorable digital interfaces.
            </h2>
            <p className="para-text text-gray font-400 mt-7">
              Our strategy-first team uses modern design principles and technical craftsmanship to help startups, scaling agencies, and enterprises create highly engaging products.
            </p>
            <div className="grid-cols-3 gap-12 mt-20">
              <div className="p-13 bg-tertiary rounded-5">
                <h4 className="font-500 title-text text-dark uppercase">120+</h4>
                <p className="small-text text-gray">Successful Projects</p>
              </div>
              <div className="p-13 bg-tertiary rounded-5">
                <h4 className="font-500 title-text text-dark uppercase">25+</h4>
                <p className="small-text text-gray">Agency Awards</p>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </Container>
  );
};

export default About;
