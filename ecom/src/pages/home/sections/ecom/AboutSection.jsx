import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../../components/common/Icon';
import Image from '../../../../components/common/Image';

import Heading from '../../../../components/layout/generic/Heading';

import { configData, aboutCMS } from '../../../../utils/apiData';
import { resolveImagePath } from '../../../../utils/imageResolver';

const defaultAboutData = {
    experienceYears: "25+",
    experienceTagline: "Years of PVC Extrusion & Manufacturing Excellence",
    description: "Ashmita Vinyls is a leading manufacturer of industrial PVC strip curtains, polar freezer rolls, and hanging hardware systems across India.",
    images: {
        team: resolveImagePath('blog/Blog9.jpg'),
        developer: resolveImagePath('blog/Blog10.jpg')
    }
};

export const AboutVersion1 = React.memo(({ aboutSide = 'left', onLearnMore, data = defaultAboutData }) => {
    const isRight = aboutSide === 'right';

    return (
        <div
            className={`flex sm-grid-cols-1 items-start mt-40 sm-mt-14 ${isRight ? 'flex-row-reverse' : ''}`}
            style={{ gap: '24px' }}
        >
            <div className="w-40 sm-w-full">
                <h4
                    className="largehead-text font-700 text-dark text-muted"
                    style={{ WebkitTextStroke: "1.5px black", WebkitTextFillColor: "transparent" }}
                >
                    {data.experienceYears}
                </h4>
                <p className="text-gray small-text font-400 mt-2">
                    {data.description}
                </p>
            </div>

            <div className="w-30 sm-w-full relative overflow-hidden rounded-5">
                <Image
                    src={resolveImagePath(data?.images?.team)}
                    alt="Team Collaboration"
                    className="w-full h-250 object-cover flex"
                />
                <div
                    className="absolute top-0 right-0 p-8 bg-white rounded-5 flex items-center gap-6 m-6"
                >
                    <Icon name="Star" width="14" height="14" fill="var(--warning)" stroke="var(--warning)" />
                    <p className="mini-text font-600 text-dark">4.9 / 5 Rating (1.2k+ Reviews)</p>
                </div>
            </div>

            <div className="w-40 sm-w-full relative overflow-hidden rounded-5">
                <Image
                    src={resolveImagePath(data?.images?.developer)}
                    alt="Developer working on code"
                    className="w-full h-350 object-cover flex"
                />
                <div
                    className="absolute bottom-0 right-0 p-10 m-6 bg-white rounded-5 text-white"
                    style={{ minWidth: '110px' }}
                >
                    <p className="title-text font-600 text-dark text-center">1.2K+</p>
                    <p className="mini-text text-gray font-400 text-center">Projects Shipped</p>
                </div>
            </div>
        </div>
    );
});

AboutVersion1.displayName = 'AboutVersion1';

const AboutSection = React.memo(() => {
    const navigate = useNavigate();
    const aboutConfig = Array.isArray(configData?.About) ? configData.About[0] : (configData?.About || {});
    const aboutSide = aboutConfig?.AboutSide || 'left';

    const handleLearnMore = React.useCallback(() => {
        navigate('/about');
    }, [navigate]);

    const headingTag = aboutCMS?.heading?.tag || "ABOUT US";
    const headingTitle = aboutCMS?.heading?.title || "Expert Innovative And Deliver Exceptional For NOT Solution Now.";

    return (
        <div className="w-full py-50">
            <Heading
                version="v1"
                tag={headingTag}
                title={headingTitle}
                align='left'
            />
            <AboutVersion1
                aboutSide={aboutSide}
                onLearnMore={handleLearnMore}
                data={defaultAboutData}
            />
        </div>
    );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;