import React from 'react';

const Chart = ({
    items = [],
    label,
    percentage,
    color = 'var(--primary)',
    height = '6px',
    bgColor = '#e5e7eb',
    className = '',
}) => {
    const list = items.length > 0 ? items : label !== undefined ? [{ label, percentage, color }] : [];

    return (
        <div className={`w-full ${className}`}>
            {list.map((item, idx) => {
                const clr = item.color || color;
                return (
                    <div key={idx} className="w-full grid-cols-1 gap-12 mb-20">
                        <div className="flex justify-between items-center">
                            <p className="text-dark font-500 small-text">{item.label}</p>
                        </div>
                        <div
                            className="relative w-full"
                            style={{ height, backgroundColor: bgColor, borderRadius: '10px', overflow: 'visible' }}
                        >
                            {/* Progress Fill */}
                            <div
                                className="absolute left-0 top-0 h-full transition-all duration-1000 ease-out"
                                style={{ width: `${item.percentage}%`, backgroundColor: clr, borderRadius: '10px' }}
                            />

                            {/* Circle Indicator Handle */}
                            <div
                                className="absolute transition-all duration-1000 ease-out"
                                style={{
                                    left: `${item.percentage}%`,
                                    top: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: '18px',
                                    height: '18px',
                                    borderRadius: '50%',
                                    border: `3px solid ${clr}`,
                                    backgroundColor: '#ffffff',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                                    zIndex: 2
                                }}
                            />

                            {/* Floating Percentage Label */}
                            <p
                                className="absolute mini-text text-gray font-500"
                                style={{
                                    left: `${item.percentage}%`,
                                    bottom: '16px',
                                    transform: 'translateX(-50%)',
                                    color: '#000000',
                                    whiteSpace: 'nowrap',
                                    zIndex: 2
                                }}
                            >
                                {item.percentage}%
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Chart;