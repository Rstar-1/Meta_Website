import React from 'react';
import Icon from '../../../../components/common/Icon';
import { patchCMS } from '../../../../utils/apiData';

const PatchSection = () => {
    return (
        <div className='w-full py-100 sm-py-50'>
            <div className="w-70 sm-w-full">
                <p className="mini-text text-dark bg-white w-max px-18 py-6 rounded-20 flex items-center gap-8 font-600 uppercase mb-18">
                    <Icon name="Settings" width="14" height="14" className="text-primary" />
                    {patchCMS?.badge || "INDIA'S LEADING PVC STRIP CURTAIN MANUFACTURER"}
                </p>
                <h3 className='text-white large-text font-600'>
                    {patchCMS?.title || 'Manufacturing High-Clarity PVC Strip Curtains for 1,000+ Facilities Across India.'}
                </h3>

                <p className='text-white para-text text-muted font-400 mt-18 sm-mt-6'>
                    {patchCMS?.description || 'We deliver durable, temperature-controlling, and dust-isolating PVC curtain solutions with fast dispatch and direct factory pricing.'}
                </p>
            </div>
        </div>
    );
};

export default React.memo(PatchSection);
