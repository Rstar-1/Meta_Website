import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Badge from '../../../../components/common/Badge';
import Button from '../../../../components/common/Button';
import { patchCMS } from '../../../../utils/apiData';
import { carpetPatchBanner } from '../../../../utils/imageResolver';

const PatchSection = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full py-90 sm-py-40">
            <div className="w-75 sm-w-full">
                <Badge
                    text={patchCMS?.badge || "INDIA'S PREMIER RAINWEAR BRAND"}
                    icon="Award"
                    bg="var(--primary)"
                    textColor="var(--white)"
                    iconColor="var(--white)"
                    size="lg"
                    shape="pill"
                />

                <h3 className="text-white large-text font-600 uppercase mt-15">
                    {patchCMS?.title || "Pioneering All-Weather Rain Protection & Waterproof Gear Across India."}
                </h3>

                <p className="text-white para-text font-400 mt-18 leading-relaxed" style={{ opacity: 0.92 }}>
                    {patchCMS?.description || "Since 1979, Real Rainwear has firmly established itself as India's preeminent manufacturer and exporter of heavy-duty rain suits, trendy women's raincoats, and school-ready kids' rainwear with 100% heat-sealed taped seams and direct factory wholesale dispatch."}
                </p>
            </div>
        </div>
    );
};

export default memo(PatchSection);
