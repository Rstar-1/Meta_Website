import React, { useState, useCallback, memo } from 'react';
import Button from '../../../components/common/Button';

const DEFAULT_PARAGRAPHS = [
    "From classic wood and metal to contemporary acrylic and glass, each material brings unique advantages to furniture design. Wood offers timeless strength and natural warmth, while metal adds resilience and industrial charm. Acrylic and glass, on the other hand, bring a modern touch, providing sleek, versatile options for contemporary spaces. The choice of material is not just about appearance; it defines durability and functionality, ensuring each piece serves its purpose beautifully.",
    "When selecting furniture, it's important to think beyond aesthetics. The right pieces create a cohesive atmosphere that balances beauty, practicality, and longevity. Minimalist designs, with their clean lines and simplicity, appeal to those who value modern elegance. However, traditional styles like Victorian, Art Deco, or Mid-Century Modern continue to inspire with their intricate details and timeless craftsmanship, offering a sense of history and character that enriches any living space."
];


const SpecifyContent = memo(({ title, paragraphs, isExpanded, onToggleExpand }) => (
    <div>
        <h3 className="title-text text-dark font-600">{title}</h3>
        <p className={`${isExpanded ? '' : 'line-clamp4'} text-gray small-text font-400 mt-5`}>
            {paragraphs[0]}
        </p>
        {isExpanded && paragraphs[1] && (
            <p className="text-gray small-text font-400 mt-10">
                {paragraphs[1]}
            </p>
        )}
        <Button
            text={isExpanded ? 'View Less' : 'View More'}
            icon={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            variant="outline"
            color="dark"
            border="dark"
            version="v0"
            className="rounded-20 mt-14"
            onClick={onToggleExpand}
        />
    </div>
));

SpecifyContent.displayName = 'SpecifyContent';


const SpecifySection = ({
    title = "About Garage",
    contentParagraphs = DEFAULT_PARAGRAPHS
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    return (
        <div className="w-full pb-60">
            <div className="bg-forth p-40 sm-p-18 rounded-10">
                <SpecifyContent
                    title={title}
                    paragraphs={contentParagraphs}
                    isExpanded={isExpanded}
                    onToggleExpand={handleToggleExpand}
                />
            </div>
        </div>
    );
};

export default memo(SpecifySection);