import React from 'react';

import Badge from '../../../../components/common/Badge';

import { patchCMS } from '../../../../utils/apiData';

const PatchSection = () => {
    return (
        <div className='w-full py-100 sm-py-50'>
            <div className="w-70 sm-w-full">
                <Badge
                    text={patchCMS?.badge}
                    icon="Settings"
                    bg="var(--white)"
                    textColor="var(--dark)"
                    iconColor="var(--primary)"
                    size='lg'
                    className="mb-18 font-600 uppercase"
                />
                <h3 className='text-white large-text font-600 uppercase'>
                    {patchCMS?.title}
                </h3>

                <p className='text-white para-text text-muted font-400 mt-18 sm-mt-6'>
                    {patchCMS?.description}
                </p>
            </div>
        </div>
    );
};

export default React.memo(PatchSection);
