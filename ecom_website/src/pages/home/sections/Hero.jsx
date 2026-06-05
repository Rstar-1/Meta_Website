import React from "react";
import Container from "../../../components/common/Container";
import Button from "../../../components/common/Button";
import { ImageDiv } from "../../../components/common/Image";

const Hero = () => {
  return (
    <ImageDiv
      image="https://html.ditsolution.net/industry/indastre1/assets/images/slider/banner.jpg"
      className="h-650"
      innerClassName="animate-hero-bg"
    >
      <Container >
        <div className="w-full flex items-center h-650 animate-hero-content">
          <div className="w-50">
            <div className="flex items-center gap-9">
              <span className="dot bg-warning"></span>
              <p className="para-text text-white uppercase">
                Welcome to Industry
              </p>
            </div>
            <h1 className="large-text text-white font-600 uppercase pt-20">
              Solutions Industrial Market Values for Funding
            </h1>
            <Button
              text="Get Started Now"
              version="v1"
              bg="warning"
              className="mt-40"
            />
          </div>
        </div>
      </Container>
    </ImageDiv>
  );
};

export default Hero;
