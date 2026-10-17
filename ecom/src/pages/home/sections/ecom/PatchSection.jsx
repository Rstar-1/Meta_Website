import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import Badge from '../../../../components/common/Badge';
import Button from '../../../../components/common/Button';
import { patchCMS } from '../../../../utils/apiData';

const PatchSection = () => {
    const navigate = useNavigate();

    const stats = patchCMS?.stats || [
        {
            id: 1,
            value: "1800",
            symbol: "+",
            label: "Industrial plants, EPC contractors, refineries & fabricators supplied."
        },
        {
            id: 2,
            value: "40",
            symbol: "+",
            label: "Stainless steel, nickel alloy, carbon steel & tool steel grades."
        },
        {
            id: 3,
            value: "100",
            symbol: "%",
            label: "Mill test certified with prompt pan-India and international export dispatch."
        }
    ];

    return (
        <div className="w-full py-90 sm-py-40">
            <div className="w-75 sm-w-full">
                <Badge
                    text={patchCMS?.badge || "ROXY ENTERPRISES — MUMBAI STOCKYARD & EXPORT HUB"}
                    icon="Award"
                    bg="var(--primary)"
                    textColor="var(--white)"
                    iconColor="var(--white)"
                    size="lg"
                    shape="pill"
                />

                <h3 className="text-white large-text font-600 uppercase mt-15">
                    {patchCMS?.title || "Supplying Certified Stainless Steel, Nickel Alloys, Alloy Steel & Carbon Steel Worldwide."}
                </h3>

                <p className="text-white para-text font-400 mt-10">
                    {patchCMS?.description || "Roxy Enterprises combines vast stockyard inventory at 5th Kumbharwada, Mumbai, authentic 3.1/3.2 Mill Test Certificates, and competitive wholesale pricing to serve oil & gas, refinery, chemical, and engineering sectors globally."}
                </p>
            </div>
        </div>
    );
};

export default memo(PatchSection);
