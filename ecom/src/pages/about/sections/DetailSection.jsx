import React from 'react';
import { useNavigate } from 'react-router-dom';

import Image from '../../../components/common/Image';
import Badge from '../../../components/common/Badge';

import { resolveImagePath } from '../../../utils/imageResolver';

const thumbnails = [
    {
        id: 1,
        title: 'Hospital Holloware & Dressing Drums',
        image: resolveImagePath('/products/goonj/dressing_drum_jointed.jpg'),
        category: 'Hospital Holloware'
    },
    {
        id: 2,
        title: 'CE-Certified Industrial First Aid Kits',
        image: resolveImagePath('/products/shreehari/type_a_metal_box.jpg'),
        category: 'First Aid & Emergency Care'
    },
    {
        id: 3,
        title: 'Emergency Scoop & Spine Stretchers',
        image: resolveImagePath('/products/shreehari/scoop_stretcher_aluminium.jpg'),
        category: 'First Aid & Emergency Care'
    }
];

const DetailSection = React.memo(() => {
    const navigate = useNavigate();

    return (
        <div className="py-60 sm-py-40 w-full">
            <div className="grid-cols-2 sm-grid-cols-1 items-center gap-12 w-full">
                <div className="w-full pr-20 sm-pr-0">
                    <Badge
                        text="Certified Healthcare Manufacturing"
                        icon="Shield"
                        variant="outline"
                        color="white"
                        size="md"
                        shape="pill"
                        iconColor="var(--primary)"
                    />

                    <h2 className="large-text font-700 text-dark uppercase mt-8">
                        Excellence in Hospital Holloware, OT Lights & First Aid.
                    </h2>

                    <p className="para-text text-gray font-400 mt-6 leading-relaxed">
                        Goonj and Shreehari Surgicals are trusted Indian manufacturers of hospital-grade AISI 304 stainless steel holloware, shadowless cold-LED surgical lights, CE-certified emergency trauma stretchers, and Factory Act compliant industrial first aid stations.
                    </p>

                    <div className="grid-cols-3 gap-12 mt-30 w-95">
                        {thumbnails.map((item) => (
                            <div
                                key={item.id}
                                className='w-full h-220 rounded-8 bg-forth overflow-hidden cursor-pointer border-ec shadow-sm p-8 flex flex-column items-center justify-center transition-transform hover:scale-105'
                                onClick={() => navigate(`/product?category=${encodeURIComponent(item.category)}`)}
                                title={item.title}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-150 object-contain flex"
                                />
                                <p className="mini-text font-600 text-dark text-center mt-6 line-clamp-1">
                                    {item.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-550 sm-h-350 rounded-10 overflow-hidden shadow-md">
                    <Image
                        src={resolveImagePath('/products/spaces/hospital_ward.jpg')}
                        alt="Hospital Ward & Surgical Equipment Showcase"
                        className="w-full h-full object-cover flex"
                    />
                </div>
            </div>
        </div>
    );
});

DetailSection.displayName = 'DetailSection';

export default DetailSection;
