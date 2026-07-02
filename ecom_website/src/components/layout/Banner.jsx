import React from "react";
import Container from "../common/Container";
import { ImageDiv } from "../common/Image";

const Banner = ({ title, img, desc, style }) => {
    return (
        <ImageDiv
            image={img}
            className="w-full h-450 bg-forth"
            innerClassName="animate-hero-bg"
            style={style}
        >
            <Container>
                <div className="w-full flex items-center h-450 animate-hero-content">
                    <div className="w-70">
                        <div className="flex items-center gap-9">
                            <span className="dot bg-warning"></span>
                            <p className="para-text text-white uppercase">{title}</p>
                        </div>
                        <h2 className="large-text text-white font-600 uppercase pt-20">
                            {desc}
                        </h2>
                    </div>
                </div>
            </Container>
        </ImageDiv>
    );
};

export default Banner;

