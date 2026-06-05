import React from "react";
import Container from "../../../components/common/Container";
import Button from "../../../components/common/Button";

const PatchSection = () => {
    return (
        <div
            style={{
                background:
                    "url(https://html.ditsolution.net/industry/indastre1/assets/images/resource/call-action-bg.png)",
                backgroundSize: "cover",
            }}
        >
            <Container>
                <div className="flex items-center w-full py-80">
                    <div className="w-50">
                        <div className="flex items-center gap-9">
                            <span
                                style={{
                                    width: "30px",
                                    height: "2px",
                                    background: "var(--white)",
                                }}
                            ></span>
                            <p className="para-text text-white uppercase">Who we are</p>
                        </div>
                        <h2 className="head-text text-white font-600 uppercase pt-10">
                            Top Industries in Bangladesh
                        </h2>
                    </div>

                    <div className="w-50 flex justify-end">
                        <Button text="Get Enquiry" version="v1" bg="warning" />
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default PatchSection;
