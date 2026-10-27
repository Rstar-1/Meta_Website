import React, { useState, useMemo, useCallback, memo } from "react";
import Button from "../../../../components/common/Button";
import Fields from "../../../../components/forms/Fields";
import Tab from "../../../../components/common/Tab";
import Icon from "../../../../components/common/Icon";
import { showToast } from "../../../../components/common/Toast";

// ----------------------------------------------------
// Chemical Categories & Compounds
// ----------------------------------------------------
const CHEMICAL_CATEGORIES = [
    { name: "Silyl Reagents", value: "silyl", icon: "Layers" },
    { name: "Triflic Compounds", value: "triflic", icon: "Zap" },
    { name: "Coupling Agents", value: "coupling", icon: "Shield" },
    { name: "Bulk Intermediates", value: "intermediate", icon: "Activity" },
    { name: "Speciality & Rare", value: "speciality", icon: "Globe" },
];

const CHEMICAL_COMPOUNDS = {
    silyl: [
        {
            id: "tms-n3",
            name: "Trimethylsilyl Azide (TMS-N3)",
            cas: "4648-54-8",
            formula: "C3H9N3Si",
            mw: "115.21 g/mol",
            bp: "95 - 96 °C",
            state: "Clear Liquid",
            defaultPurity: 98.8,
            color: "#0ea5e9",
            application: "Azidation & Tetrazole Synthesis in Pharma APIs",
            packaging: ["100g Glass Bottle", "2.5kg UN Bottle", "25kg Steel Drum"],
            structureType: "silyl"
        },
        {
            id: "tms-cn",
            name: "Trimethylsilyl Cyanide (TMS-CN)",
            cas: "7677-24-9",
            formula: "C4H9NSi",
            mw: "99.21 g/mol",
            bp: "117 - 119 °C",
            state: "Clear Liquid",
            defaultPurity: 98.5,
            color: "#06b6d4",
            application: "Cyanohydrin synthesis & nucleophilic cyanation",
            packaging: ["500g Glass Bottle", "5kg UN Canister", "25kg Steel Drum"],
            structureType: "silyl"
        },
        {
            id: "tms-i",
            name: "Trimethylsilyl Iodide (TMS-I)",
            cas: "16029-98-4",
            formula: "C3H9ISi",
            mw: "200.09 g/mol",
            bp: "106 °C",
            state: "Amber Liquid",
            defaultPurity: 97.5,
            color: "#f59e0b",
            application: "Cleavage of ethers, esters, and acetals",
            packaging: ["100g Amber Bottle", "1kg Amber Bottle", "10kg Carboy"],
            structureType: "silyl"
        }
    ],
    triflic: [
        {
            id: "tf2o",
            name: "Trifluoromethanesulfonic Anhydride",
            cas: "358-23-6",
            formula: "C2F6O5S2",
            mw: "282.14 g/mol",
            bp: "81 - 83 °C",
            state: "Fuming Liquid",
            defaultPurity: 99.2,
            color: "#6366f1",
            application: "Vinyl triflates & Suzuki cross-coupling activator",
            packaging: ["100g Bottle", "1kg Corrosion Bottle", "25kg Drum"],
            structureType: "triflic"
        },
        {
            id: "tfe-otf",
            name: "2,2,2-Trifluoroethyl Triflate",
            cas: "6226-25-1",
            formula: "C3H2F6O3S",
            mw: "232.10 g/mol",
            bp: "89 - 91 °C",
            state: "Colorless Liquid",
            defaultPurity: 98.6,
            color: "#8b5cf6",
            application: "Trifluoroethylation of amines and phenols",
            packaging: ["250g Glass Bottle", "1kg Bottle", "10kg Drum"],
            structureType: "triflic"
        },
        {
            id: "tfaa",
            name: "Trifluoroacetic Anhydride (TFAA)",
            cas: "407-25-0",
            formula: "C4F6O3",
            mw: "210.03 g/mol",
            bp: "39.5 - 40.5 °C",
            state: "Volatile Liquid",
            defaultPurity: 99.0,
            color: "#ec4899",
            application: "Swern oxidation, acylation & dehydration",
            packaging: ["500g Bottle", "2.5kg Carboy", "25kg HDPE Carboy"],
            structureType: "triflic"
        }
    ],
    coupling: [
        {
            id: "edc-hcl",
            name: "EDC HCl (Carbodiimide)",
            cas: "25952-53-8",
            formula: "C8H17N3·HCl",
            mw: "191.70 g/mol",
            bp: "Decomposes (MP 115°C)",
            state: "White Crystalline",
            defaultPurity: 99.4,
            color: "#10b981",
            application: "Water-soluble peptide coupling & bioconjugation",
            packaging: ["500g Bottle", "5kg Fiber Drum", "25kg Fiber Drum"],
            structureType: "coupling"
        },
        {
            id: "diethyl-bromomalonate",
            name: "Diethyl Bromomalonate",
            cas: "685-87-0",
            formula: "C7H11BrO4",
            mw: "239.06 g/mol",
            bp: "231 - 235 °C",
            state: "Pale Yellow Liquid",
            defaultPurity: 98.0,
            color: "#14b8a6",
            application: "Cyclopropanation & organic intermediate synthesis",
            packaging: ["500g Bottle", "2.5kg Carboy", "25kg Drum"],
            structureType: "coupling"
        }
    ],
    intermediate: [
        {
            id: "dfta",
            name: "DFTA (Fluconazole Intermediate)",
            cas: "86404-63-9",
            formula: "C13H12F2N6O",
            mw: "306.27 g/mol",
            bp: "Solid (MP 140°C)",
            state: "White Powder",
            defaultPurity: 99.6,
            color: "#3b82f6",
            application: "Penultimate bulk intermediate for Fluconazole API",
            packaging: ["1kg Bag", "10kg Fiber Drum", "25kg Fiber Drum"],
            structureType: "intermediate"
        },
        {
            id: "triazole",
            name: "4-Amino-1,2,4-Triazole",
            cas: "584-13-4",
            formula: "C2H4N4",
            mw: "84.08 g/mol",
            bp: "Solid (MP 86°C)",
            state: "White Needles",
            defaultPurity: 99.1,
            color: "#a855f7",
            application: "Heterocyclic building block & pharma intermediate",
            packaging: ["1kg Bag", "25kg Multi-layer Drum"],
            structureType: "intermediate"
        }
    ],
    speciality: [
        {
            id: "mom-cl",
            name: "Chloromethyl Methyl Ether (MOM-Cl)",
            cas: "107-30-2",
            formula: "C2H5ClO",
            mw: "80.51 g/mol",
            bp: "59 °C",
            state: "Clear Liquid",
            defaultPurity: 98.2,
            color: "#f97316",
            application: "Protecting group for alcohols (MOM ether)",
            packaging: ["1kg Canister", "5kg Canister", "25kg Steel Drum"],
            structureType: "speciality"
        },
        {
            id: "dbu",
            name: "1,8-Diazabicyclo[5.4.0]undec-7-ene (DBU)",
            cas: "6674-22-2",
            formula: "C9H16N2",
            mw: "152.24 g/mol",
            bp: "261 °C",
            state: "Viscous Liquid",
            defaultPurity: 99.2,
            color: "#84cc16",
            application: "Non-nucleophilic amidine superbase catalyst",
            packaging: ["1kg Bottle", "25kg Drum", "200kg Drum"],
            structureType: "speciality"
        },
        {
            id: "phenanthroline",
            name: "1,10-Phenanthroline Monohydrate AR",
            cas: "5144-89-8",
            formula: "C12H8N2·H2O",
            mw: "198.22 g/mol",
            bp: "Solid (MP 102°C)",
            state: "Needle Crystals",
            defaultPurity: 99.5,
            color: "#ef4444",
            application: "Analytical reagent, ligand & spectroscopic probe",
            packaging: ["25g Bottle", "100g Bottle", "1kg Amber Jar"],
            structureType: "speciality"
        }
    ]
};

const SOLVENTS = [
    { name: "DCM (Dichloromethane)", r: [2, 2, 2, 1, 2] },
    { name: "THF (Tetrahydrofuran)", r: [2, 1, 2, 2, 2] },
    { name: "Acetonitrile (ACN)", r: [2, 2, 2, 2, 2] },
    { name: "Toluene", r: [2, 1, 1, 1, 2] },
    { name: "DMF (Dimethylformamide)", r: [1, 2, 2, 2, 2] },
    { name: "Ethanol / Methanol", r: [0, 0, 1, 2, 1] },
    { name: "Water (Aqueous Phase)", r: [0, 0, 2, 1, 0] },
    { name: "Hexane / Heptane", r: [2, 1, 0, 0, 1] }
];

const BATCH_SCALES = [
    { name: "100 g (R&D)", value: 100 },
    { name: "1 kg (Pilot)", value: 1000 },
    { name: "25 kg (Trial)", value: 25000 },
    { name: "500 kg (Bulk)", value: 500000 },
    { name: "5 MT (Commercial)", value: 5000000 }
];

const INDUSTRIES = [
    { name: "Pharmaceutical APIs", category: "intermediate", defaultCompound: 0 },
    { name: "Custom Contract Synthesis", category: "silyl", defaultCompound: 0 },
    { name: "Agrochemicals & Fine Chem", category: "speciality", defaultCompound: 0 },
    { name: "Peptide & Biotech Labs", category: "coupling", defaultCompound: 0 },
    { name: "Rare R&D & Catalysis", category: "speciality", defaultCompound: 2 },
    { name: "Fluorinated Intermediates", category: "triflic", defaultCompound: 0 }
];

// ----------------------------------------------------
// Sub-Components
// ----------------------------------------------------

// 1. Industry Presets
const IndustryPresets = memo(({ selectedIdx, onSelect }) => {
    return (
        <div className="bg-white rounded-10 p-16">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="title-text font-600 text-dark uppercase m-0">Chemical Application Preset</h3>
                    <p className="mini-text text-gray m-0 mt-2">Select your industrial domain to auto-configure standard synthesis parameters.</p>
                </div>
                <div className="rounded-20 px-10 py-4 bg-forth text-primary mini-text font-600">
                    2,500+ Stock Compounds
                </div>
            </div>
            <div className="flex flex-wrap gap-8">
                {INDUSTRIES.map((ind, idx) => {
                    const active = selectedIdx === idx;
                    return (
                        <button
                            key={ind.name}
                            type="button"
                            onClick={() => onSelect(idx)}
                            className={`px-14 py-8 rounded-20 cursor-pointer small-text font-500 transition-all ${active
                                ? "bg-primary text-white"
                                : "bg-forth text-dark hover:bg-light-primary"
                                }`}
                            style={{ border: "none" }}
                        >
                            {ind.name}
                        </button>
                    );
                })}
            </div>
        </div>
    );
});
IndustryPresets.displayName = "IndustryPresets";

// 2. Chemical Reactor & Percentage Stage
const ExplodedStage = memo(({ compound, purity, onPurityChange, temperature, onTemperatureChange }) => {
    const purityVal = parseFloat(purity) || 98.5;
    const progressWidth = Math.min(100, Math.max(0, ((purityVal - 90) / 10) * 100));

    return (
        <div className="bg-white rounded-10 p-16 h-full">
            <div className="flex items-center justify-between pb-10 bordb">
                <div>
                    <span className="mini-text font-600 text-primary uppercase">Lab Simulation & Reaction Vessel</span>
                    <h4 className="mid-text font-600 text-dark mt-2 m-0">{compound.name}</h4>
                </div>
                <div className="text-right">
                    <span className="mini-text text-gray">CAS Registry</span>
                    <p className="small-text font-700 text-dark m-0">{compound.cas}</p>
                </div>
            </div>

            {/* Interactive SVG Chemical Reactor */}
            <div
                className="relative rounded-10 mt-14 overflow-hidden flex items-center justify-center p-14"
                style={{
                    minHeight: "260px",
                    background: "linear-gradient(180deg, #0b1329 0%, #172554 100%)",
                }}
            >
                <svg width="220" height="220" viewBox="0 0 220 220" className="relative z-1">
                    {/* Condenser Column */}
                    <rect x="98" y="15" width="24" height="60" rx="3" fill="#38bdf8" fillOpacity="0.25" stroke="#7dd3fc" strokeWidth="1.5" />
                    <line x1="104" y1="25" x2="116" y2="25" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="2,2" />
                    <line x1="104" y1="45" x2="116" y2="45" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="2,2" />
                    <line x1="104" y1="65" x2="116" y2="65" stroke="#bae6fd" strokeWidth="1.5" strokeDasharray="2,2" />

                    {/* Jacketed Flask Neck */}
                    <rect x="94" y="70" width="32" height="25" rx="2" fill="#e0f2fe" fillOpacity="0.3" stroke="#93c5fd" strokeWidth="1.5" />

                    {/* Flask Body */}
                    <path
                        d="M 94 95 C 60 135, 45 175, 75 195 C 95 208, 125 208, 145 195 C 175 175, 160 135, 126 95 Z"
                        fill="rgba(255, 255, 255, 0.08)"
                        stroke="#93c5fd"
                        strokeWidth="2"
                    />

                    {/* Liquid Reaction Solution */}
                    <path
                        d="M 68 150 Q 110 142 152 150 C 168 178, 150 195, 110 197 C 70 195, 52 178, 68 150 Z"
                        fill={compound.color}
                        fillOpacity="0.75"
                    >
                        <animate
                            attributeName="d"
                            dur="3s"
                            repeatCount="indefinite"
                            values="
                                M 68 150 Q 110 142 152 150 C 168 178, 150 195, 110 197 C 70 195, 52 178, 68 150 Z;
                                M 68 148 Q 110 156 152 148 C 168 178, 150 195, 110 197 C 70 195, 52 178, 68 148 Z;
                                M 68 150 Q 110 142 152 150 C 168 178, 150 195, 110 197 C 70 195, 52 178, 68 150 Z
                            "
                        />
                    </path>

                    {/* Bubbling Active Particles */}
                    <circle cx="95" cy="170" r="3" fill="#ffffff" opacity="0.8">
                        <animate attributeName="cy" from="185" to="150" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.9" to="0" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="125" cy="175" r="4" fill="#ffffff" opacity="0.7">
                        <animate attributeName="cy" from="190" to="148" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.8" to="0" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="110" cy="180" r="2.5" fill="#ffffff" opacity="0.9">
                        <animate attributeName="cy" from="192" to="152" dur="1.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.9" to="0" dur="1.4s" repeatCount="indefinite" />
                    </circle>

                    {/* Magnetic Stirrer */}
                    <rect x="98" y="190" width="24" height="6" rx="3" fill="#ffffff" opacity="0.9" />

                    {/* Molecular Formula Badge inside vessel */}
                    <rect x="75" y="105" width="70" height="20" rx="4" fill="rgba(0,0,0,0.5)" />
                    <text x="110" y="119" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="600">
                        {compound.formula}
                    </text>
                </svg>
            </div>

            {/* Reaction Temperature Control */}
            <div className="mt-14 bg-forth p-12 rounded-8">
                <div className="flex items-center justify-between mb-8">
                    <label className="small-text font-600 text-dark">
                        Synthesis Temperature Control
                    </label>
                    <span className="small-text font-700 text-primary">
                        {temperature}°C &bull; {temperature <= 0 ? "Cryogenic" : temperature >= 80 ? "Exothermic Reflux" : "Ambient Stirring"}
                    </span>
                </div>

                <Fields
                    type="number"
                    value={temperature}
                    onChange={(val) => onTemperatureChange(val === "" ? "" : Number(val))}
                    min={-20}
                    max={140}
                    step={1}
                    version="v2"
                    placeholder="Enter temperature in °C (-20 to 140)"
                    icon="Sun"
                    iconPosition="right"
                    className="w-full"
                />

                <div className="flex items-center gap-8 mt-8">
                    {[-10, 25, 80, 110].map((presetTemp) => (
                        <button
                            key={presetTemp}
                            type="button"
                            onClick={() => onTemperatureChange(presetTemp)}
                            className={`px-8 py-4 rounded-4 mini-text font-500 cursor-pointer transition-all ${temperature === presetTemp
                                ? "bg-primary text-white"
                                : "bg-white text-dark hover:bg-light-primary"
                                }`}
                            style={{ border: "1px solid #e2e8f0" }}
                        >
                            {presetTemp}°C {presetTemp <= 0 ? "(Cryo)" : presetTemp >= 80 ? "(Reflux)" : "(RT)"}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});
ExplodedStage.displayName = "ExplodedStage";

// 3. Chemical Controls & Technical Specifications
const ChemicalControls = memo(({ activeCategory, onCategoryChange, selectedCompound, onSelectCompound }) => {
    const compounds = CHEMICAL_COMPOUNDS[activeCategory] || [];

    const categoryTabs = useMemo(() => {
        return CHEMICAL_CATEGORIES.map((c) => ({
            name: c.name,
            value: c.value,
            icon: c.icon
        }));
    }, []);

    return (
        <div className="bg-white rounded-10 p-16 h-full">
            <h3 className="title-text font-600 text-dark uppercase m-0">Chemical Selection & Route</h3>
            <p className="mini-text text-gray m-0 mt-2">Filter high-purity intermediates by synthesis family and chemical classification.</p>

            {/* Tab.jsx for Chemical Categories */}
            <div className="mt-12 overflow-x-auto">
                <Tab
                    version="v2"
                    tabs={categoryTabs}
                    activeTab={activeCategory}
                    onChange={onCategoryChange}
                    className="w-full"
                />
            </div>

            {/* Compound Selector List */}
            <div className="mt-14 grid-cols-1 gap-8 flex-1">
                {compounds.map((comp) => {
                    const isSelected = selectedCompound.id === comp.id;
                    return (
                        <div
                            key={comp.id}
                            onClick={() => onSelectCompound(comp)}
                            className={`p-12 rounded-8 cursor-pointer transition-all ${isSelected ? "bg-forth" : "bg-white hover:bg-forth"
                                }`}
                            style={{
                                border: isSelected ? "1.5px solid var(--primary)" : "1px solid #e2e8f0"
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <span
                                        className="rounded-full flex-shrink-0"
                                        style={{ width: "10px", height: "10px", background: comp.color }}
                                    />
                                    <h5 className="headmini-text font-600 text-dark m-0">{comp.name}</h5>
                                </div>
                                <span className="mini-text font-600 text-primary">CAS {comp.cas}</span>
                            </div>

                            <p className="mini-text text-gray m-0 mt-4 line-clamp1">{comp.application}</p>

                            <div className="flex items-center justify-between mt-6 pt-6 bordt mini-text">
                                <span className="text-dark font-500">MW: {comp.mw}</span>
                                <span className="text-gray">BP/MP: {comp.bp}</span>
                                <span className="font-600 text-success">≥ {comp.defaultPurity}% HPLC</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Technical Specifications Box */}
            <div className="mt-14 p-12 bg-forth rounded-8">
                <h5 className="headmini-text font-600 text-dark mb-6">Technical Specifications</h5>
                <div className="grid-cols-2 gap-6 mini-text">
                    <div>
                        <span className="text-gray">Molecular Formula:</span>
                        <p className="font-600 text-dark m-0">{selectedCompound.formula}</p>
                    </div>
                    <div>
                        <span className="text-gray">Molecular Weight:</span>
                        <p className="font-600 text-dark m-0">{selectedCompound.mw}</p>
                    </div>
                    <div>
                        <span className="text-gray">Physical Appearance:</span>
                        <p className="font-600 text-dark m-0">{selectedCompound.state}</p>
                    </div>
                    <div>
                        <span className="text-gray">Boiling / Melting:</span>
                        <p className="font-600 text-dark m-0">{selectedCompound.bp}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});
ChemicalControls.displayName = "ChemicalControls";

// 4. Solvent Compatibility Matrix
const SolventMatrix = memo(({ activeCategory }) => {
    const catIdxMap = { silyl: 0, triflic: 1, coupling: 2, intermediate: 3, speciality: 4 };
    const currentCatIdx = catIdxMap[activeCategory] || 0;

    const ratingStyles = {
        2: { label: "Optimal / High Yield", bg: "#dcfce7", color: "#166534" },
        1: { label: "Anhydrous Required", bg: "#fef3c7", color: "#92400e" },
        0: { label: "Incompatible / Hydrolysis", bg: "#fee2e2", color: "#991b1b" }
    };

    return (
        <div className="bg-white rounded-10 p-16">
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h3 className="title-text font-600 text-dark uppercase m-0">Solvent & Reaction Compatibility Matrix</h3>
                    <p className="mini-text text-gray m-0 mt-2">Verified compatibility for safe reaction execution and maximum synthetic conversion.</p>
                </div>
                <div className="flex items-center gap-12 mini-text">
                    <span className="flex items-center gap-4">
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#166534" }} />
                        Recommended
                    </span>
                    <span className="flex items-center gap-4">
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#92400e" }} />
                        Moisture-Free
                    </span>
                    <span className="flex items-center gap-4">
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#991b1b" }} />
                        Incompatible
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left mini-text" style={{ borderCollapse: "separate", borderSpacing: "0 6px" }}>
                    <thead>
                        <tr className="text-dark font-500 uppercase">
                            <th className="py-6 px-10">Solvent System</th>
                            <th className="py-6 px-10">Compatibility Status</th>
                            <th className="py-6 px-10">Trace Water Tolerance</th>
                            <th className="py-6 px-10">Recommended Reaction Atmosphere</th>
                        </tr>
                    </thead>
                    <tbody>
                        {SOLVENTS.map((sol) => {
                            const rating = sol.r[currentCatIdx];
                            const style = ratingStyles[rating] || ratingStyles[1];
                            return (
                                <tr key={sol.name} className="bg-forth rounded-6">
                                    <td className="py-12 px-10 font-600 text-dark rounded-l-6">{sol.name}</td>
                                    <td className="py-8 px-10">
                                        <span
                                            className="px-8 py-3 rounded-20 font-600 mini-text inline-block"
                                            style={{ backgroundColor: style.bg, color: style.color }}
                                        >
                                            {style.label}
                                        </span>
                                    </td>
                                    <td className="py-8 px-10 text-gray">
                                        {rating === 2 ? "< 500 ppm (Standard)" : rating === 1 ? "< 50 ppm (Dry / Sieves)" : "Dry / Water-free"}
                                    </td>
                                    <td className="py-8 px-10 text-dark font-500 rounded-r-6">
                                        {rating === 2 ? "Inert N2 / Ambient" : rating === 1 ? "Inert Argon Blanket" : "Avoid Reactivity"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
});
SolventMatrix.displayName = "SolventMatrix";

// 5. Enquiry & Batch Quotation Builder
const EnquirySection = memo(({ compound, purity, batchScale, onBatchScaleChange, selectedPackaging, onSelectPackaging }) => {
    const handleCopyEnquiry = useCallback(() => {
        const text = `Global Chemie Quote Request:\nProduct: ${compound.name} (CAS: ${compound.cas})\nTarget Purity: ${purity}% (HPLC Area)\nBatch Quantity: ${batchScale}g / ${(batchScale / 1000).toFixed(1)}kg\nPackaging: ${selectedPackaging}\n\nPlease share commercial quotation, Certificate of Analysis (COA), and dispatch lead time.`;

        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text);
            showToast("Enquiry specifications copied to clipboard!", "success");
        } else {
            showToast("Please copy your enquiry details below.", "info");
        }
    }, [compound, purity, batchScale, selectedPackaging]);

    const batchTabs = useMemo(() => {
        return BATCH_SCALES.map((b) => ({
            name: b.name,
            value: b.value
        }));
    }, []);

    return (
        <div className="bg-white rounded-10 p-16 grid-cols-2 sm-grid-cols-1 gap-16 items-start">
            <div>
                <h3 className="title-text font-600 text-dark uppercase m-0">Chemical Inquiry Sheet</h3>
                <p className="mini-text text-gray m-0 mt-4">
                    Your chemical configuration is compiled below. Select your required batch volume and packaging to request direct factory quotes and official COA sheets.
                </p>

                {/* Batch Scale Selector with Tab.jsx */}
                <div className="mt-14">
                    <p className="mini-text font-600 text-gray uppercase mb-6">Batch Volume Scale</p>
                    <Tab
                        version="v2"
                        tabs={batchTabs}
                        activeTab={batchScale}
                        onChange={onBatchScaleChange}
                        className="w-full"
                    />
                </div>

                {/* Packaging selection */}
                <div className="mt-14">
                    <p className="mini-text font-600 text-gray uppercase mb-6">UN-Certified Packaging</p>
                    <div className="flex flex-wrap gap-8">
                        {compound.packaging.map((pkg) => {
                            const isSelected = selectedPackaging === pkg;
                            return (
                                <button
                                    key={pkg}
                                    type="button"
                                    onClick={() => onSelectPackaging(pkg)}
                                    className={`px-12 py-6 rounded-6 mini-text font-500 cursor-pointer transition-all ${isSelected
                                        ? "bg-primary text-white"
                                        : "bg-forth text-dark hover:bg-light-primary"
                                        }`}
                                    style={{ border: "none" }}
                                >
                                    {pkg}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-18">
                    <Button
                        onClick={handleCopyEnquiry}
                        text="Request Quote & COA"
                        icon="Send"
                        iconPosition="right"
                        version="v1"
                        bg="primary"
                        color="white"
                    />
                </div>
            </div>

            {/* Summary Review Sheet */}
            <div className="rounded-8 p-16 bg-forth">
                <h5 className="headmini-text font-600 text-dark mb-10 pb-6 bordb">Batch Specification Summary</h5>
                <div className="grid-cols-1 gap-8 mini-text">
                    <div className="flex justify-between py-4 bordb">
                        <span className="text-gray">Chemical Compound:</span>
                        <span className="font-600 text-dark text-right">{compound.name}</span>
                    </div>
                    <div className="flex justify-between py-4 bordb">
                        <span className="text-gray">CAS Number:</span>
                        <span className="font-600 text-dark">{compound.cas}</span>
                    </div>
                    <div className="flex justify-between py-4 bordb">
                        <span className="text-gray">Target Assay Purity:</span>
                        <span className="font-700 text-success">{purity}% (HPLC/GC)</span>
                    </div>
                    <div className="flex justify-between py-4 bordb">
                        <span className="text-gray">Batch Scale:</span>
                        <span className="font-600 text-dark">
                            {batchScale >= 1000 ? `${batchScale / 1000} kg` : `${batchScale} g`}
                        </span>
                    </div>
                    <div className="flex justify-between py-4 bordb">
                        <span className="text-gray">Packaging Standard:</span>
                        <span className="font-600 text-dark">{selectedPackaging}</span>
                    </div>
                    <div className="flex justify-between py-4">
                        <span className="text-gray">Manufacturer / Sourcing:</span>
                        <span className="font-600 text-primary">Global Chemie (Mumbai)</span>
                    </div>
                </div>
            </div>
        </div>
    );
});
EnquirySection.displayName = "EnquirySection";

// ----------------------------------------------------
// Main DemoSection Component
// ----------------------------------------------------
const DemoSection = () => {
    const [selectedIndustry, setSelectedIndustry] = useState(0);
    const [activeCategory, setActiveCategory] = useState("silyl");
    const [selectedCompound, setSelectedCompound] = useState(CHEMICAL_COMPOUNDS.silyl[0]);
    const [purity, setPurity] = useState(98.8);
    const [temperature, setTemperature] = useState(25);
    const [batchScale, setBatchScale] = useState(1000);
    const [selectedPackaging, setSelectedPackaging] = useState(CHEMICAL_COMPOUNDS.silyl[0].packaging[0]);

    const handleIndustrySelect = useCallback((idx) => {
        setSelectedIndustry(idx);
        const preset = INDUSTRIES[idx];
        setActiveCategory(preset.category);
        const compounds = CHEMICAL_COMPOUNDS[preset.category] || [];
        const comp = compounds[preset.defaultCompound] || compounds[0];
        if (comp) {
            setSelectedCompound(comp);
            setPurity(comp.defaultPurity);
            setSelectedPackaging(comp.packaging[0]);
        }
    }, []);

    const handleCategoryChange = useCallback((catKey) => {
        setActiveCategory(catKey);
        const compounds = CHEMICAL_COMPOUNDS[catKey] || [];
        if (compounds.length > 0) {
            setSelectedCompound(compounds[0]);
            setPurity(compounds[0].defaultPurity);
            setSelectedPackaging(compounds[0].packaging[0]);
        }
    }, []);

    const handleSelectCompound = useCallback((comp) => {
        setSelectedCompound(comp);
        setPurity(comp.defaultPurity);
        setSelectedPackaging(comp.packaging[0]);
    }, []);

    const handlePurityChange = useCallback((val) => {
        setPurity(val);
    }, []);

    return (
        <div className="py-30 sm-py-20">
            <style>{`
                .custom-range-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 20px;
                    background: transparent;
                }
                .custom-range-slider::-webkit-slider-runnable-track {
                    height: 6px;
                    border-radius: 6px;
                    background: linear-gradient(90deg, #2563eb var(--p, 50%), #e2e8f0 var(--p, 50%));
                }
                .custom-range-slider::-moz-range-track {
                    height: 6px;
                    border-radius: 6px;
                    background: #e2e8f0;
                }
                .custom-range-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #ffffff;
                    border: 3px solid #2563eb;
                    margin-top: -6px;
                }
                .custom-range-slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #ffffff;
                    border: 3px solid #2563eb;
                }
            `}</style>

            <div className="grid-cols-1 gap-16">
                <IndustryPresets
                    selectedIdx={selectedIndustry}
                    onSelect={handleIndustrySelect}
                />

                <div className="grid-cols-2 sm-grid-cols-1 gap-16 items-start">
                    <ExplodedStage
                        compound={selectedCompound}
                        purity={purity}
                        onPurityChange={handlePurityChange}
                        temperature={temperature}
                        onTemperatureChange={setTemperature}
                    />
                    <ChemicalControls
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                        selectedCompound={selectedCompound}
                        onSelectCompound={handleSelectCompound}
                    />
                </div>

                <SolventMatrix
                    activeCategory={activeCategory}
                />

                {/* <EnquirySection
                    compound={selectedCompound}
                    purity={purity}
                    batchScale={batchScale}
                    onBatchScaleChange={setBatchScale}
                    selectedPackaging={selectedPackaging}
                    onSelectPackaging={setSelectedPackaging}
                /> */}
            </div>
        </div>
    );
};

export default memo(DemoSection);
