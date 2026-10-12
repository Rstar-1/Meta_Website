import React, { useState, useCallback, useMemo, memo } from 'react';
import Button from '../../../components/common/Button';

const DEFAULT_PARAGRAPHS = [
    "PVC strip curtains are manufactured from premium-grade flexible polyvinyl chloride (PVC) engineered to form an effective thermal, environmental, and acoustic barrier across doorway openings. Designed with high optical clarity, UV resistance, and excellent tensile strength, these strip curtains minimize conditioned air loss in temperature-sensitive areas such as cold storages, blast freezers, warehouses, food processing units, and commercial spaces—reducing HVAC and refrigeration energy costs by up to 45% while facilitating unobstructed passage for personnel and motorized vehicles.",
    "In addition to exceptional thermal insulation, industrial PVC strip curtains effectively block airborne dust, dirt, pests, chemical fumes, and ambient noise to maintain strict workplace hygiene and safety standards. Available in versatile formulations including Standard Clear, Sub-Zero Polar Grade (-40°C), Anti-Insect Amber, and Heavy-Duty Ribbed profiles for high-traffic forklift bays, they integrate seamlessly with corrosion-resistant Stainless Steel (SS 304) hanging hardware for rapid installation, adjustable overlap configurations, and easy maintenance."
];

const SpecifyContent = memo(({ title, paragraphs, isExpanded, onToggleExpand }) => (
    <div>
        <h3 className="title-text text-dark font-600">{title}</h3>
        <p className={`${isExpanded ? '' : 'line-clamp4'} text-gray small-text font-400 mt-5`}>
            {paragraphs[0]}
        </p>
        {isExpanded && paragraphs.slice(1).map((paragraph, index) => (
            <p key={index} className="text-gray small-text font-400 mt-10">
                {paragraph}
            </p>
        ))}
        {paragraphs.length > 1 && (
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
        )}
    </div>
));

SpecifyContent.displayName = 'SpecifyContent';

const SpecifySection = ({
    title,
    contentParagraphs,
    currentProduct,
    category
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleExpand = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    const resolvedTitle = title || (currentProduct?.name ? `About ${currentProduct.name}` : "About PVC Strip Curtains");

    const paragraphs = useMemo(() => {
        if (contentParagraphs && contentParagraphs.length > 0) {
            return contentParagraphs;
        }
        if (currentProduct?.description) {
            return [
                currentProduct.description,
                ...DEFAULT_PARAGRAPHS.slice(1)
            ];
        }
        return DEFAULT_PARAGRAPHS;
    }, [contentParagraphs, currentProduct]);

    return (
        <div className="w-full pb-60">
            <div className="bg-forth p-40 sm-p-18 rounded-10">
                <SpecifyContent
                    title={resolvedTitle}
                    paragraphs={paragraphs}
                    isExpanded={isExpanded}
                    onToggleExpand={handleToggleExpand}
                />
            </div>
        </div>
    );
};

export default memo(SpecifySection);