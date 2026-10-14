import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '../../../../components/common/Container';
import Icon from '../../../../components/common/Icon';
import Image from '../../../../components/common/Image';
import Heading from '../../../../components/layout/generic/Heading';

import { configData } from '../../../../utils/apiData';
import { resolveImagePath } from '../../../../utils/imageResolver';

const categories = [
    {
        id: 1,
        name: "Round Bars",
        title: "Round Bars",
        image: "/metal/round-bars.jpg",
        icon: "/metal/round-bars.jpg",
        iconName: "Layers",
        bgColor: "#EFF6FF",
        accentColor: "#2563EB",
        description: "ASTM A276 centerless ground and bright drawn round bars in SS 304, 316L, Duplex 2205, and Inconel 625 for precision machining."
    },
    {
        id: 2,
        name: "Forged Fittings",
        title: "Forged Fittings",
        image: "/metal/forged-fittings.jpg",
        icon: "/metal/forged-fittings.jpg",
        iconName: "Shield",
        bgColor: "#F0FDF4",
        accentColor: "#16A34A",
        description: "ASME B16.11 Class 3000# and 6000# high pressure socket weld and threaded (NPT/BSPT) elbows, tees, unions, and couplings."
    },
    {
        id: 3,
        name: "Stainless Steel Pipes & Tubes",
        title: "Pipes & Tubes",
        image: "/metal/card_ss_pipes.jpg",
        icon: "/metal/card_ss_pipes.jpg",
        iconName: "Grid",
        bgColor: "#F8FAFC",
        accentColor: "#0284C7",
        description: "ASTM A312 / A213 seamless and welded stainless steel process pipes from 1/8\" NB to 24\" NB in Sch 5S to XXS."
    },
    {
        id: 4,
        name: "Stainless Steel Flanges",
        title: "SS Flanges",
        image: "/metal/card_ss_flanges.jpg",
        icon: "/metal/card_ss_flanges.jpg",
        iconName: "Sliders",
        bgColor: "#FEF2F2",
        accentColor: "#DC2626",
        description: "ASME B16.5 heavy forged Slip On (SORF), Weld Neck (WNRF), and Blind (BLRF) flanges from Class 150# to 2500#."
    },
    {
        id: 5,
        name: "Stainless Steel Pipe Fittings",
        title: "Buttweld Fittings",
        image: "/metal/card_ss_pipe_fittings.jpg",
        icon: "/metal/card_ss_pipe_fittings.jpg",
        iconName: "RotateCcw",
        bgColor: "#FFFBEB",
        accentColor: "#D97706",
        description: "ASME B16.9 seamless 90° and 45° elbows, equal tees, concentric/eccentric reducers, and dished caps."
    },
    {
        id: 6,
        name: "Stainless Steel Fasteners",
        title: "Fasteners",
        image: "/metal/card_ss_fasteners.jpg",
        icon: "/metal/card_ss_fasteners.jpg",
        iconName: "Box",
        bgColor: "#F5F3FF",
        accentColor: "#7C3AED",
        description: "DIN 933 hex head bolts, DIN 934 nuts, and ASTM A193 B8/B8M full thread stud bolts in A2-70 and A4-80."
    },
    {
        id: 7,
        name: "Duplex & Super Duplex",
        title: "Duplex 2205",
        image: "/metal/pipe-tubes.jpg",
        icon: "/metal/pipe-tubes.jpg",
        iconName: "Zap",
        bgColor: "#ECFDF5",
        accentColor: "#059669",
        description: "UNS S31803 / S32205 and S32750 pipes, round bars, and flanges engineered for high chloride offshore service."
    },
    {
        id: 8,
        name: "Inconel & Nickel Alloys",
        title: "Nickel Alloys",
        image: "/metal/flanges.jpg",
        icon: "/metal/flanges.jpg",
        iconName: "Sun",
        bgColor: "#FFF1F2",
        accentColor: "#E11D48",
        description: "High performance Inconel 600/625, Monel 400, and Hastelloy C276 piping materials for severe thermal service."
    },
    {
        id: 9,
        name: "Sheets, Plates & Shims",
        title: "Sheets & Plates",
        image: "/metal/slide-no3.jpg",
        icon: "/metal/slide-no3.jpg",
        iconName: "Layers",
        bgColor: "#F1F5F9",
        accentColor: "#475569",
        description: "ASTM A240 cold rolled and hot rolled stainless steel sheets, coils, cut plates, and high precision shims."
    },
    {
        id: 10,
        name: "Titanium & Exotic Metals",
        title: "Titanium Products",
        image: "/metal/fastners.jpg",
        icon: "/metal/fastners.jpg",
        iconName: "Plus",
        bgColor: "#FDF2F8",
        accentColor: "#DB2777",
        description: "Grade 2 and Grade 5 titanium bars, fasteners, and custom flanges for aerospace and chlor-alkali reactors."
    },
    {
        id: 11,
        name: "Precision Shims & Foils",
        title: "Precision Shims",
        image: "/metal/special-features.png",
        icon: "/metal/special-features.png",
        iconName: "Sliders",
        bgColor: "#FEF3C7",
        accentColor: "#B45309",
        description: "High tolerance SS 304 and SS 316 shim foils and pre-cut slotted alignment shims for rotary machinery."
    },
    {
        id: 12,
        name: "Socket Weld & Threaded",
        title: "Branch Outlets",
        image: "/metal/pipe-fittings.jpg",
        icon: "/metal/pipe-fittings.jpg",
        iconName: "Grid",
        bgColor: "#EFF6FF",
        accentColor: "#1D4ED8",
        description: "High integrity Weldolets, Sockolets, Threadolets, and Nipolets manufactured to MSS SP-97 standards."
    }
];

const CategoryVersion1 = React.memo(({ items, onCategoryClick }) => (
    <div className="grid-cols-6 sm-grid-cols-3 mt-30 border-ec">
        {items.map((item, index) => {
            const isLastInRow = (index + 1) % 6 === 0;
            const isTopRow = index < 6;
            return (
                <div
                    key={item.id}
                    onClick={() => onCategoryClick(item)}
                    style={{
                        borderRight: isLastInRow ? 'none' : '1px solid #EBEBEB',
                        borderBottom: isTopRow ? '1px solid #EBEBEB' : 'none'
                    }}
                    className="p-25 sm-p-14 grid-cols-1 cursor-pointer"
                >
                    <Image
                        src={resolveImagePath(item.image || item.icon)}
                        alt={item.title || item.name}
                        width="100px"
                        height="100px"
                        className="rounded-full object-cover flex mx-auto"
                    />
                    <p className="small-text text-center text-dark font-500 mt-16">
                        {item.title || item.name}
                    </p>
                </div>
            );
        })}
    </div>
));

const CategoryVersion2 = React.memo(({ items, onCategoryClick }) => (
    <div className="grid-cols-6 sm-grid-cols-3 mt-30 gap-12">
        {items?.slice(0, 6)?.map((cat, idx) => (
            <div
                key={cat.id}
                className="px-12 py-16 border-ec rounded-10 cursor-pointer text-center"
                onClick={() => onCategoryClick(cat)}
            >
                <div className="relative">
                    <Image
                        src={resolveImagePath(cat.icon || cat.image)}
                        alt={cat.name || cat.title}
                        width="110"
                        height="110"
                        loading={idx < 3 ? "eager" : "lazy"}
                        fetchPriority={idx < 3 ? "high" : undefined}
                        className="flex object-cover rounded-full mx-auto"
                    />
                </div>
                <p className="text-dark font-500 small-text text-center mt-18">
                    {cat.name || cat.title}
                </p>
            </div>
        ))}
    </div>
));

const CategoryVersion3 = React.memo(({ items, onCategoryClick }) => (
    <>
        <style>{`
            .category-card {
                transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .category-card:hover {
                transform: translateY(-2px);
            }
            .card-image-right {
                clip-path: polygon(18% 0, 100% 0, 100% 100%, 0% 100%);
                transition: clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .category-card:hover .card-image-right {
                clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
            }
        `}</style>
        <div className="grid-cols-3 sm-grid-cols-1 mt-30" style={{ gap: '20px' }}>
            {items?.slice(0, 3)?.map((cat) => (
                <div
                    key={cat.id}
                    className="category-card bg-forth rounded-5 overflow-hidden flex cursor-pointer relative"
                    onClick={() => onCategoryClick(cat)}
                >
                    <div className="w-50 sm-w-60 p-20">
                        <div>
                            <div
                                className="icon-lg rounded-5"
                                style={{ backgroundColor: cat.bgColor, color: cat.accentColor }}
                            >
                                <Icon name={cat.iconName} width="22" height="22" stroke={cat.accentColor} />
                            </div>
                            <h3 className="mid-text text-dark font-600 pt-8">{cat.name || cat.title}</h3>
                            <p className="text-gray mini-text line-clamp3 mt-4">
                                {cat.description}
                            </p>
                        </div>
                        <p className="mini-text font-500 mt-6 flex items-center gap-4" style={{ color: cat.accentColor }}>
                            Explore Products <Icon name="ArrowRight" width="13" height="13" stroke="currentColor" />
                        </p>
                    </div>

                    <div className="card-image-right w-50 sm-w-40 relative overflow-hidden rounded-5 h-200">
                        <Image
                            src={resolveImagePath(cat.icon || cat.image)}
                            alt={cat.name || cat.title}
                            className="card-image-element w-full h-full object-cover flex"
                            loading="lazy"
                        />
                        <div
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                width: '60px',
                                height: '60px',
                                background: cat.accentColor,
                                clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                                opacity: 0.85,
                                zIndex: 2
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    </>
));

const VERSION_COMPONENTS = {
    1: CategoryVersion1,
    2: CategoryVersion2,
    3: CategoryVersion3
};

const CategorySection = React.memo(() => {
    const navigate = useNavigate();
    const categoryVersion = configData?.Category?.[0]?.CategoryVersion ?? 1;

    const handleCategoryClick = useCallback((cat) => {
        const query = typeof cat === 'object' ? (cat.name || cat.title || cat.id) : cat;
        navigate(`/product?category=${encodeURIComponent(query)}`);
    }, [navigate]);

    const ActiveVersionComponent = VERSION_COMPONENTS[categoryVersion] || CategoryVersion1;

    return (
        <Container>
            <div className="w-full py-50">
                <Heading
                    version="v1"
                    tag="PRODUCT SCOPE"
                    title="Certified Exporter of Stainless Steel, Round Bars, Forged Fittings & Flanges"
                    subtitle="Direct mill stockholder and leading exporter of ASTM/ASME certified piping and machining solutions."
                />
                <ActiveVersionComponent items={categories} onCategoryClick={handleCategoryClick} />
            </div>
        </Container>
    );
});

export default CategorySection;
