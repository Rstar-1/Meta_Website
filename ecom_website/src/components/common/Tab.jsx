import React, { useState } from "react";

const TabItem = ({ name, count, icon, isActive, onClick }) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            className={`px-20 py-9 cursor-pointer flex items-center gap-8 ${isActive
                ? "bg-white text-primary font-600"
                : `rounded-5 ${hovered ? "bg-forth text-dark font-500" : "text-gray font-500"}`
                }`}
            style={isActive ? { borderBottom: "2px solid var(--primary)" } : {}}
        >
            {icon && <span className="flex items-center justify-center">{icon}</span>}
            <p className="small-text">{name}</p>
            {count !== undefined && count !== null && (
                <p className={`px-9 py-3 rounded-20 mini-text ${isActive ? "bg-primary text-white font-600" : "bg-tertiary text-gray"
                    }`}>
                    {count}
                </p>
            )}
        </div>
    );
};

const Tab = ({ tabs, activeTab, onChange }) => {
    return (
        <div className="flex bordb gap-8">
            {tabs.map((tab, idx) => {
                const isObject = typeof tab === "object" && tab !== null;
                const name = isObject ? (tab.name || tab.label) : tab;
                const count = isObject ? tab.count : null;
                const icon = isObject ? tab.icon : null;
                const value = isObject ? (tab.value || tab.name || tab.label) : tab;

                return (
                    <TabItem
                        key={idx}
                        name={name}
                        count={count}
                        icon={icon}
                        isActive={activeTab === value}
                        onClick={() => onChange && onChange(value)}
                    />
                );
            })}
        </div>
    );
};

export default Tab;