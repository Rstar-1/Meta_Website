import React, { useState, useMemo, useCallback, memo } from "react";
import Button from "../../../../components/common/Button";
import Fields from "../../../../components/forms/Fields";
import Tab from "../../../../components/common/Tab";

// ----------------------------------------------------
// Constants & Static Data
// ----------------------------------------------------
const COLS = [
    { n: "Natural white", h: "#e9ecef" },
    { n: "Black", h: "#2b2e35" },
    { n: "Blue", h: "#2368d6" },
    { n: "Red", h: "#d63a32" },
    { n: "Green", h: "#2a9d62" },
    { n: "Yellow", h: "#f2c230" },
    { n: "Orange", h: "#f2812c" },
    { n: "Grey", h: "#8a93a1" },
];

const GK = [
    { k: "epdm", n: "EPDM", h: "#2a2d34" },
    { k: "nbr", n: "NBR", h: "#5b3a28" },
    { k: "fkm", n: "FKM", h: "#2f6b45" },
    { k: "pe", n: "PE foam", h: "#f1efe8" },
];

const LIQ = [
    { n: "Water", r: [2, 2, 2, 2] },
    { n: "Engine oil", r: [0, 2, 2, 2] },
    { n: "Diesel and petrol", r: [0, 2, 2, 1] },
    { n: "Acetone and ketones", r: [2, 0, 0, 1] },
    { n: "Aromatic solvents", r: [0, 0, 2, 0] },
    { n: "Dilute acid", r: [2, 1, 2, 2] },
    { n: "Strong alkali", r: [2, 1, 0, 2] },
    { n: "Fertilizer solution", r: [2, 2, 1, 2] },
    { n: "Edible oil", r: [0, 2, 2, 2] },
];

const TYPES = {
    bung: {
        n: "Bungs",
        cat: "Drums and barrels",
        sizes: [['2" bung', 1, "G 2 BSP"], ['3/4" bung', 0.62, "G 3/4 BSP"]],
        fits: "200 L steel and plastic drums",
        ctx: "drum",
        sub: "A threaded plug with grip ribs. It screws into a flanged bung body fitted in the drum head, and a gasket seals the joint.",
        parts: ["Bung plug", "Gasket", "Bung body"],
    },
    cap: {
        n: "Caps and Closures",
        cat: "Canisters",
        sizes: [["38 mm cap", 0.8, "38 mm neck"], ["48 mm cap", 0.9, "48 mm neck"], ["61 mm cap", 1.05, "61 mm neck"]],
        fits: "5 to 35 L jerry cans",
        ctx: "can",
        sub: "A ribbed screw cap for jerry cans, with a liner and a foil seal that keeps product in until first use.",
        parts: ["Screw cap", "Liner", "Foil seal"],
    },
    insert: {
        n: "Inserts",
        cat: "Drums and barrels",
        sizes: [['2" insert', 1, "G 2 BSP"], ['3/4" insert', 0.62, "G 3/4 BSP"]],
        fits: "Drum bung holes",
        ctx: "drum",
        sub: "A pouring insert that fits the drum opening. The flip lid closes the spout between uses.",
        parts: ["Flip lid", "Pouring spout", "Insert body"],
    },
    dispense: {
        n: "Dispensing Solutions",
        cat: "IBC",
        sizes: [['2" valve', 0.82, "2 in outlet"], ['3" valve', 1.05, "3 in outlet"]],
        fits: "1000 L IBC outlets",
        ctx: "ibc",
        sub: "A ball valve with a screw coupling for IBC outlets. A dust cap keeps the outlet clean.",
        parts: ["Dust cap", "Ball valve", "Gasket", "Coupling"],
    },
    vent: {
        n: "Accessories",
        cat: "Drums and IBC",
        sizes: [['2" vent plug', 1, "G 2 BSP"], ['3/4" vent plug', 0.62, "G 3/4 BSP"]],
        fits: "Drums and IBC",
        ctx: "drum",
        sub: "A vent plug with a membrane. It lets air in and out while keeping liquid inside.",
        parts: ["Vent cap", "Membrane", "Plug body"],
    },
};

const TORDER = ["bung", "cap", "insert", "dispense", "vent"];
const INDS = [
    { n: "Chemicals", t: "dispense", s: 0, c: 2, l: 5 },
    { n: "Fertilizers", t: "cap", s: 2, c: 4, l: 7 },
    { n: "Industrial Packaging", t: "bung", s: 0, c: 7, l: 0 },
    { n: "Pharmaceuticals", t: "cap", s: 0, c: 0, l: 0 },
    { n: "Engine Oils", t: "cap", s: 1, c: 5, l: 1 },
    { n: "Petroleum", t: "bung", s: 0, c: 3, l: 2 },
    { n: "Paints", t: "cap", s: 2, c: 6, l: 4 },
    { n: "Cosmetics", t: "insert", s: 1, c: 0, l: 0 },
    { n: "F&B", t: "dispense", s: 1, c: 0, l: 8 },
    { n: "FMCG", t: "cap", s: 1, c: 2, l: 0 },
];

const QTY = [1000, 5000, 10000, 25000];
const numFormat = new Intl.NumberFormat("en-IN");

// ----------------------------------------------------
// Color & SVG Helpers
// ----------------------------------------------------
const rgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (h, t, to) => "#" + rgb(h).map((v) => ("0" + Math.round(v + (to - v) * t).toString(16)).slice(-2)).join("");
const lt = (h, t) => mix(h, t, 255);
const dk = (h, t) => mix(h, t, 0);
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const HOLE_Y = 296;

function generateSvgMarkup(st) {
    const defs = {};
    const G = (col) => {
        const id = "g" + col.slice(1);
        if (!defs[id]) {
            defs[id] = `<linearGradient id="${id}" x1="0" x2="1"><stop offset="0" stop-color="${dk(col, 0.32)}"/><stop offset=".3" stop-color="${lt(col, 0.12)}"/><stop offset=".55" stop-color="${col}"/><stop offset="1" stop-color="${dk(col, 0.4)}"/></linearGradient><radialGradient id="t${id}" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="${lt(col, 0.35)}"/><stop offset="1" stop-color="${dk(col, 0.05)}"/></radialGradient>`;
        }
        return id;
    };

    const cyl = (cx, cy, rx, ry, h, col, o = {}) => {
        const id = G(col);
        let s = `<path d="M${cx - rx} ${cy}V${cy + h}A${rx} ${ry} 0 0 0 ${cx + rx} ${cy + h}V${cy}Z" fill="url(#${id})" stroke="${dk(col, 0.45)}" stroke-opacity=".5" stroke-width=".8"/>`;

        if (o.ribs) {
            const n = Math.max(8, Math.round(rx / 3.2));
            for (let i = 0; i <= n; i++) {
                const a = -Math.PI / 2 + 0.12 + ((Math.PI - 0.24) * i) / n;
                const x = cx + rx * Math.sin(a);
                const y = cy + ry * Math.cos(a);
                s += `<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${x.toFixed(1)}" y2="${(y + h).toFixed(1)}" stroke="${dk(col, 0.5)}" stroke-opacity=".45" stroke-width="1.3"/><line x1="${(x + 1.3).toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + 1.3).toFixed(1)}" y2="${(y + h).toFixed(1)}" stroke="#fff" stroke-opacity=".28" stroke-width=".8"/>`;
            }
        }

        if (o.thread) {
            const n = Math.floor(h / 6.5);
            for (let i = 1; i <= n; i++) {
                const yy = cy + i * 6.5 - 3;
                s += `<path d="M${cx - rx} ${yy}A${rx} ${ry} 0 0 0 ${cx + rx} ${yy + 3.2}" fill="none" stroke="${dk(col, 0.5)}" stroke-opacity=".7" stroke-width="1.6"/><path d="M${cx - rx} ${yy + 1.6}A${rx} ${ry} 0 0 0 ${cx + rx} ${yy + 4.8}" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1"/>`;
            }
        }

        s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#t${id})" stroke="${lt(col, 0.35)}" stroke-opacity=".7" stroke-width=".9"/>`;
        if (o.hole) s += `<ellipse cx="${cx}" cy="${cy}" rx="${o.hole}" ry="${((o.hole * ry) / rx).toFixed(1)}" fill="#0a0c10" stroke="${dk(col, 0.4)}"/>`;
        if (o.ring) s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.78}" ry="${ry * 0.78}" fill="none" stroke="${dk(col, 0.35)}" stroke-opacity=".6"/>`;
        if (o.holes) {
            for (let i = 0; i < 6; i++) {
                const b = (i * Math.PI) / 3;
                s += `<ellipse cx="${(cx + rx * 0.5 * Math.cos(b)).toFixed(1)}" cy="${(cy + ry * 0.5 * Math.sin(b)).toFixed(1)}" rx="2.6" ry="1.2" fill="#0a0c10"/>`;
            }
        }
        if (o.text) {
            const fs = Math.min(rx * 0.42, (rx * 1.35) / Math.max(3, o.text.length));
            s += `<g transform="translate(${cx} ${cy}) scale(1 ${(ry / rx).toFixed(3)})"><text x="0.8" y="${(fs * 0.35 + 0.8).toFixed(1)}" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="${fs.toFixed(1)}" fill="${lt(col, 0.5)}" opacity=".7">${esc(o.text)}</text><text x="0" y="${(fs * 0.35).toFixed(1)}" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="${fs.toFixed(1)}" fill="${dk(col, 0.55)}" opacity=".9">${esc(o.text)}</text></g>`;
        }
        return s;
    };

    const bodyPart = (y, f, col) => `<g clip-path="url(#cut)">${cyl(200, y + 6, 32 * f, 8 * f, 38, col, { thread: true })}</g>` + cyl(200, y, 54 * f, 13 * f, 10, col, { ring: true });

    const ctxSvg = (kind) => {
        if (kind === "drum") {
            return `<defs><linearGradient id="steel" x1="0" x2="1"><stop offset="0" stop-color="#7f8a9a"/><stop offset=".4" stop-color="#d8dee8"/><stop offset="1" stop-color="#6f7a8a"/></linearGradient></defs><path d="M42 304V380H358V304A158 36 0 0 1 42 304Z" fill="url(#steel)"/><ellipse cx="200" cy="304" rx="158" ry="36" fill="#9aa5b5"/><ellipse cx="200" cy="302" rx="144" ry="31" fill="#c3ccd8" stroke="#8a95a6"/><ellipse cx="200" cy="302" rx="110" ry="22" fill="none" stroke="#9aa5b5" stroke-opacity=".8" stroke-width="3"/><ellipse cx="200" cy="296" rx="44" ry="10.5" fill="#0a0c10" stroke="#7f8a9a" stroke-width="2"/>`;
        } else if (kind === "can") {
            return `<defs><linearGradient id="canb" x1="0" x2="1"><stop offset="0" stop-color="#cfd6e0"/><stop offset=".45" stop-color="#f4f6f9"/><stop offset="1" stop-color="#b6bfcc"/></linearGradient></defs><path d="M56 380V318Q56 284 94 284H306Q344 284 344 318V380Z" fill="url(#canb)" stroke="#9aa5b5"/><rect x="92" y="300" width="216" height="3" fill="#9aa5b5" opacity=".5"/><path d="M300 292Q372 292 372 330V380" fill="none" stroke="#c3ccd8" stroke-width="10" stroke-linecap="round"/>${cyl(200, 262, 38, 9, 26, "#eef1f5", { thread: true })}`;
        }
        let s = `<defs><linearGradient id="ibcb" x1="0" x2="1"><stop offset="0" stop-color="#b9c3d1"/><stop offset=".5" stop-color="#e8edf3"/><stop offset="1" stop-color="#a9b4c3"/></linearGradient></defs><polygon points="30,380 30,316 110,282 290,282 370,316 370,380" fill="url(#ibcb)" stroke="#8d99aa"/>`;
        for (let i = 0; i < 9; i++) s += `<line x1="${60 + i * 35}" y1="${i < 3 || i > 5 ? 318 : 284}" x2="${60 + i * 35}" y2="380" stroke="#8d99aa" stroke-opacity=".7"/>`;
        return s + `<rect x="30" y="338" width="340" height="5" fill="#8d99aa" opacity=".6"/>` + cyl(200, 296, 44, 10, 24, "#dfe5ed", { thread: true });
    };

    const T = TYPES[st.t];
    const safeSizeIdx = Math.min(st.s, T.sizes.length - 1);
    const f = T.sizes[safeSizeIdx][1];
    const col = COLS[st.c]?.h || "#2368d6";
    const gk = GK[st.g] || GK[0];
    const e = st.ex / 100;
    const txt = (st.brand || "").trim();

    const partsMap = {
        bung: [
            { ya: 262, off: -170, f: (y) => cyl(200, y, 56 * f, 13 * f, 22, col, { ribs: true, text: txt, ring: true }) },
            { ya: 279, off: -102, f: (y) => cyl(200, y, 50 * f, 12 * f, 4, gk.h, { hole: 28 * f }) },
            { ya: 284, off: -52, f: (y) => bodyPart(y, f, col) },
        ],
        cap: [
            { ya: 236, off: -160, f: (y) => cyl(200, y, 48 * f, 12 * f, 38, col, { ribs: true, text: txt }) },
            { ya: 252, off: -92, f: (y) => cyl(200, y, 40 * f, 10 * f, 3, "#f3f1ea", { hole: 12 * f }) },
            { ya: 254, off: -52, f: (y) => cyl(200, y, 37 * f, 9 * f, 2, "#c9d0da") },
        ],
        insert: [
            { ya: 250, off: -170, f: (y) => cyl(200, y, 26 * f, 7 * f, 14, col, { ribs: true, text: txt }) },
            {
                ya: 266,
                off: -104,
                f: (y) => `<path d="M${200 - 20 * f} ${y}L${200 - 34 * f} ${y + 30}A${34 * f} ${8 * f} 0 0 0 ${200 + 34 * f} ${y + 30}L${200 + 20 * f} ${y}Z" fill="url(#${G(col)})" stroke="${dk(col, 0.45)}" stroke-opacity=".5"/>` + cyl(200, y, 20 * f, 5 * f, 2, col, { hole: 11 * f }),
            },
            { ya: 284, off: -46, f: (y) => bodyPart(y, f, col) },
        ],
        dispense: [
            { ya: 226, off: -176, f: (y) => cyl(200, y, 44 * f, 11 * f, 22, col, { ribs: true, text: txt }) },
            {
                ya: 250,
                off: -118,
                f: (y) => cyl(200, y, 30 * f, 8 * f, 42, "#8a93a1") + `<rect x="222" y="${y + 17}" width="${70 * f + 12}" height="12" rx="6" fill="${col}" stroke="${dk(col, 0.45)}" stroke-opacity=".6"/><circle cx="${232 + 70 * f}" cy="${y + 23}" r="9" fill="${dk(col, 0.1)}" stroke="${dk(col, 0.45)}"/>`,
            },
            { ya: 276, off: -62, f: (y) => cyl(200, y, 50 * f, 12 * f, 4, gk.h, { hole: 30 * f }) },
            { ya: 280, off: -24, f: (y) => cyl(200, y, 48 * f, 12 * f, 18, col, { thread: true, ring: true }) },
        ],
        vent: [
            { ya: 252, off: -170, f: (y) => cyl(200, y, 42 * f, 10 * f, 16, col, { ribs: true, holes: true }) },
            { ya: 272, off: -108, f: (y) => cyl(200, y, 30 * f, 7 * f, 2, "#f6f7f9") },
            { ya: 284, off: -52, f: (y) => bodyPart(y, f, col) },
        ],
    };

    const P = partsMap[st.t] || partsMap.bung;
    let parts = "";
    for (let i = P.length - 1; i >= 0; i--) parts += P[i].f(P[i].ya + P[i].off * e);

    const op = Math.max(0, Math.min(1, (e - 0.2) / 0.4));
    let labels = "";
    P.forEach((p, k) => {
        const y = p.ya + p.off * e + 4;
        labels += `<g opacity="${op.toFixed(2)}"><line x1="262" y1="${y.toFixed(1)}" x2="296" y2="${y.toFixed(1)}" stroke="#f0561d" stroke-width="1.2" stroke-dasharray="3 3"/><circle cx="262" cy="${y.toFixed(1)}" r="2.4" fill="#f0561d"/><text x="300" y="${(y + 4).toFixed(1)}" font-family="monospace" font-size="11" fill="#0e2740">${k + 1} ${T.parts[k]}</text></g>`;
    });

    return `<defs><clipPath id="cut"><rect x="0" y="0" width="400" height="${HOLE_Y + 2}"/></clipPath>${Object.values(defs).join("")}</defs>` + ctxSvg(T.ctx) + parts + labels;
}

// ----------------------------------------------------
// Subcomponents
// ----------------------------------------------------

// 1. Industry Selector
const IndustrySection = memo(({ selectedIndex, onSelect }) => {
    const tabs = useMemo(() => INDS.map((x, i) => ({ name: x.n, value: i })), []);
    return <div className="overflow-auto">
        <Tab version="v1" tabs={tabs} activeTab={selectedIndex} onChange={onSelect} className="w-full" />
    </div>;
});
IndustrySection.displayName = "IndustrySection";

// 2. SVG Exploded Stage View with Percentage Field from Fields.jsx
const ExplodedStage = memo(({ st, onExplodeChange }) => {
    const currentType = TYPES[st.t];
    const currentSize = currentType.sizes[Math.min(st.s, currentType.sizes.length - 1)];
    const svgInner = useMemo(() => generateSvgMarkup(st), [st]);

    const explodeLabel = useMemo(() => {
        if (st.ex < 8) return "Assembled";
        if (st.ex > 92) return "Fully exploded";
        return "Opening up";
    }, [st.ex]);

    const handlePercentChange = useCallback((val) => {
        const num = Number(val);
        if (!isNaN(num)) onExplodeChange(Math.min(100, Math.max(0, num)));
    }, [onExplodeChange]);

    return (
        <div className="w-full bg-white">
            <div
                className="relative overflow-hidden bg-forth"
            >
                <div className="absolute top-0 left-0 p-10 mini-text text-gray font-600 uppercase" style={{ pointerEvents: "none" }}>
                    FIG. {TORDER.indexOf(st.t) + 1} · {currentSize[0].toUpperCase()}
                </div>
                <svg
                    viewBox="0 56 400 324"
                    role="img"
                    className="w-full h-auto block"
                    aria-label="Exploded view of the selected closure"
                    dangerouslySetInnerHTML={{ __html: svgInner }}
                />
            </div>

            <div className="mt-20">
                <div className="flex items-center gap-8">
                    <h4 className="mid-text font-500 text-dark uppercase">{explodeLabel}</h4>
                    <span className="mini-text text-primary font-600 bg-light-primary px-8 py-2 rounded-20">{st.ex}%</span>
                </div>

                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={st.ex}
                    style={{ "--p": `${st.ex}%` }}
                    className="custom-range-slider w-full cursor-pointer"
                    aria-label="Exploded view slider"
                    onChange={(e) => onExplodeChange(Number(e.target.value))}
                />

                <div className="flex items-center justify-between mt-4">
                    <p className="mini-text text-gray font-500">Assembled (0%)</p>
                    <p className="mini-text text-gray font-500">Exploded (100%)</p>
                </div>
            </div>
        </div>
    );
});
ExplodedStage.displayName = "ExplodedStage";

// 3. Closure Configuration Controls
const ClosureControls = memo(({ st, onTypeChange, onFieldChange }) => {
    const currentType = TYPES[st.t];
    const safeSizeIdx = Math.min(st.s, currentType.sizes.length - 1);
    const currentSize = currentType.sizes[safeSizeIdx];
    const currentColor = COLS[st.c] || COLS[0];
    const currentGasket = GK[st.g] || GK[0];
    const currentLiquid = LIQ[st.l];
    const ratingText = ["is not suitable", "is limited", "suits"][currentLiquid.r[st.g]];

    const typeTabs = useMemo(() => TORDER.map((k) => ({ name: TYPES[k].n, value: k })), []);
    const sizeTabs = useMemo(() => currentType.sizes.map((z, i) => ({ name: z[0], value: i })), [currentType]);
    const gasketTabs = useMemo(
        () =>
            GK.map((g, i) => ({
                name: g.n,
                value: i,
                icon: (
                    <span
                        style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            display: "inline-block",
                            background: g.h,
                            border: "1px solid rgba(255,255,255,0.4)",
                        }}
                    />
                ),
                count: ["✕", "~", "✓"][currentLiquid.r[i]],
            })),
        [currentLiquid]
    );

    const specs = [
        ["Thread", currentSize[2]],
        ["Fits", currentType.fits],
        ["Body", "Injection-moulded plastic"],
        ["Seal", `${currentGasket.n} gasket`],
    ];

    return (
        <div className="w-full">
            <p className="mini-text font-600 text-primary uppercase">
                {currentType.cat} · {currentColor.n}
            </p>
            <h3 className="title-text font-700 text-dark uppercase mt-4 mb-6">{currentType.n}</h3>
            <p className="small-text text-gray font-400 mb-16">{currentType.sub}</p>

            <div className="mb-14 overflow-auto">
                <p className="mini-text font-600 text-gray uppercase mb-6">Closure type</p>
                <Tab version="v2" tabs={typeTabs} activeTab={st.t} onChange={onTypeChange} className="w-full" />
            </div>

            <div className="mb-14 overflow-auto">
                <p className="mini-text font-600 text-gray uppercase mb-6">Size</p>
                <Tab version="v2" tabs={sizeTabs} activeTab={safeSizeIdx} onChange={(val) => onFieldChange("s", val)} className="w-full" />
            </div>

            <div className="mb-14">
                <p className="mini-text font-600 text-gray uppercase mb-6">Colour</p>
                <div className="flex flex-wrap gap-8" role="group" aria-label="Colour">
                    {COLS.map((c, i) => (
                        <button
                            key={c.n}
                            type="button"
                            title={c.n}
                            aria-label={c.n}
                            aria-pressed={i === st.c}
                            className="rounded-5 cursor-pointer border-0"
                            style={{
                                width: 36,
                                height: 36,
                                background: c.h,
                                border: i === st.c ? "2px solid #000" : "1px solid #c4d3e3",
                                boxShadow: i === st.c ? "0 0 0 2px #fff inset" : "none",
                            }}
                            onClick={() => onFieldChange("c", i)}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-14">
                <p className="mini-text font-600 text-gray uppercase mb-6">Your brand on the cap</p>
                <div style={{ maxWidth: 260 }}>
                    <Fields
                        type="text"
                        value={st.brand}
                        onChange={(val) => onFieldChange("brand", (typeof val === "string" ? val : val?.target?.value || "").toUpperCase())}
                        maxLength={8}
                        version="v0"
                        className="font-600 uppercase mini-text"
                        style={{ letterSpacing: "0.12em" }}
                    />
                </div>
            </div>

            <div className="grid-cols-2 gap-12">
                {specs.map(([label, val]) => (
                    <div key={label} className="p-4 bordb">
                        <p className="mini-text font-500 text-gray uppercase">{label}</p>
                        <p className="small-text font-500 text-dark mt-2">{val}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});
ClosureControls.displayName = "ClosureControls";

// 4. Seal Check Matrix
const SealCheckMatrix = memo(({ st, onSelectLiquid, onSelectCell }) => {
    const currentLiquid = LIQ[st.l];
    const currentGasket = GK[st.g];

    const verdict = useMemo(() => {
        const r = currentLiquid.r;
        const good = GK.filter((_, k) => r[k] === 2).map((g) => g.n);
        const ok = GK.filter((_, k) => r[k] === 1).map((g) => g.n);
        const suitMsg = good.length === GK.length ? "Every gasket here suits." : good.length ? `Use ${good.join(" or ")}.` : "No gasket here is fully suitable.";
        const contactMsg = ok.length ? ` ${ok.join(" and ")} works for short contact only.` : "";
        const userGasketMsg = ["is not suitable.", "has limited use.", "is a good match."][r[st.g]];

        return {
            title: currentLiquid.n,
            suitMsg,
            contactMsg,
            choiceMsg: ` You have chosen ${currentGasket.n}, which ${userGasketMsg}`,
        };
    }, [currentLiquid, currentGasket, st.g]);

    return (
        <div className="bg-white">

            <div className="overflow-auto">
                <table className="w-full text-center" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th className="text-left py-8 px-6 mini-text font-600 text-gray uppercase">Liquid</th>
                            {GK.map((g) => (
                                <th key={g.k} className="py-8 px-6 mini-text font-600 text-gray uppercase">
                                    <span className="flex items-center justify-center gap-6">
                                        <i style={{ width: 10, height: 10, borderRadius: "50%", background: g.h, display: "inline-block" }} />
                                        {g.n}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {LIQ.map((l, li) => (
                            <tr key={l.n} className={li === st.l ? "bg-forth" : ""}>
                                <td className="text-left bordh">
                                    <button
                                        type="button"
                                        className="w-full text-left py-12 px-8 cursor-pointer font-600 small-text text-dark bg-transparent border-0"
                                        onClick={() => onSelectLiquid(li)}
                                    >
                                        {l.n}
                                    </button>
                                </td>
                                {l.r.map((v, gi) => (
                                    <td key={gi} className="bordh">
                                        <button
                                            type="button"
                                            className="w-full py-10 px-6 cursor-pointer bg-transparent border-0 flex items-center justify-center"
                                            aria-label={`${l.n}, ${GK[gi].n}: ${["avoid", "limited", "recommended"][v]}`}
                                            aria-pressed={li === st.l && gi === st.g}
                                            onClick={() => onSelectCell(li, gi)}
                                        >
                                            <span
                                                className="flex items-center justify-center font-800 mini-text rounded-full"
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                    backgroundColor: v === 2 ? "#1a9a5b" : v === 1 ? "#d98a00" : "#d63a32",
                                                    color: v === 1 ? "#1a1200" : "#fff",
                                                    boxShadow: li === st.l && gi === st.g ? "0 0 0 2px #fff, 0 0 0 4px #0e2740" : "none",
                                                    transform: li === st.l && gi === st.g ? "scale(1.1)" : "scale(1)",
                                                }}
                                            >
                                                {["✕", "~", "✓"][v]}
                                            </span>
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-wrap gap-12 mini-text text-gray mt-14">
                <span className="flex items-center gap-6">
                    <i style={{ width: 10, height: 10, borderRadius: "50%", background: "#1a9a5b", display: "inline-block" }} />
                    Recommended
                </span>
                <span className="flex items-center gap-6">
                    <i style={{ width: 10, height: 10, borderRadius: "50%", background: "#d98a00", display: "inline-block" }} />
                    Limited use
                </span>
                <span className="flex items-center gap-6">
                    <i style={{ width: 10, height: 10, borderRadius: "50%", background: "#d63a32", display: "inline-block" }} />
                    Avoid
                </span>
            </div>
        </div>
    );
});
SealCheckMatrix.displayName = "SealCheckMatrix";

// 5. Enquiry Sheet & Builder
const EnquirySection = memo(({ st, onQuantitySelect, onCopy, copyNote }) => {
    const currentType = TYPES[st.t];
    const currentSize = currentType.sizes[Math.min(st.s, currentType.sizes.length - 1)];
    const currentColor = COLS[st.c];
    const currentGasket = GK[st.g];
    const currentLiquid = LIQ[st.l];

    const sheetRows = useMemo(
        () => [
            ["Closure", currentType.n],
            ["Size", currentSize[0]],
            ["Colour", currentColor.n],
            ["Cap marking", st.brand.trim() || "None"],
            ["Gasket", currentGasket.n],
            ["Liquid", currentLiquid.n],
            ["Quantity", `${numFormat.format(st.q)} pieces`],
        ],
        [currentType, currentSize, currentColor, st.brand, currentGasket, currentLiquid, st.q]
    );

    const quantityTabs = useMemo(() => QTY.map((v) => ({ name: `${numFormat.format(v)} pcs`, value: v })), []);

    return (
        <div className="bg-white grid-cols-2 sm-grid-cols-1 gap-12 items-start">
            <div>
                <h3 className="title-text font-600 text-dark uppercase">Enquiry sheet</h3>
                <p className="small-text text-gray mt-6">
                    Your choices are collected here. Set a quantity and copy the enquiry to send to the sales team. Custom colours, branding and bespoke designs are handled on request.
                </p>

                <div className="mt-16 overflow-auto">
                    <p className="mini-text font-600 text-gray uppercase mb-6">Quantity</p>
                    <Tab version="v2" tabs={quantityTabs} activeTab={st.q} onChange={onQuantitySelect} className="w-full" />
                </div>

                <Button
                    onClick={onCopy}
                    text="Get A Quote"
                    version="v1"
                    bg="primary"
                    variant="outline"
                    color="white"
                    className='mt-14'
                />
            </div>

            <div className="rounded-5 rounded-5 py-10 px-20 bg-forth">
                {sheetRows.map(([lbl, val], idx) => (
                    <div key={lbl} className={`flex items-center justify-between py-10 gap-12 ${idx < sheetRows.length - 1 ? "bordb" : ""}`}>
                        <p className="small-text font-500 text-gray">{lbl}</p>
                        <p className="small-text font-600 text-dark text-right">{val}</p>
                    </div>
                ))}
            </div>
        </div>
    );
});
EnquirySection.displayName = "EnquirySection";

// ----------------------------------------------------
// Main DemoSection Component
// ----------------------------------------------------
const DemoSection = () => {
    const [st, setSt] = useState({
        t: "bung",
        s: 0,
        c: 2,
        g: 0,
        l: 0,
        ex: 60,
        brand: "BRAND",
        q: 5000,
        ind: -1,
    });
    const [copyNote, setCopyNote] = useState("");

    const updateField = useCallback((key, val) => setSt((p) => ({ ...p, [key]: val })), []);

    const handleIndustrySelect = useCallback((i) => {
        const x = INDS[i];
        const targetType = TYPES[x.t];
        const targetSize = Math.min(x.s, targetType.sizes.length - 1);
        const targetLiquid = LIQ[x.l];

        let bestRating = -1;
        let bestGasketIndex = 0;
        targetLiquid.r.forEach((v, k) => {
            if (v > bestRating) {
                bestRating = v;
                bestGasketIndex = k;
            }
        });

        setSt((prev) => ({
            ...prev,
            ind: i,
            t: x.t,
            s: targetSize,
            c: x.c,
            l: x.l,
            g: bestGasketIndex,
        }));
    }, []);

    const handleTypeChange = useCallback((k) => setSt((prev) => ({ ...prev, t: k, s: 0, ind: -1 })), []);
    const handleLiquidSelect = useCallback((lIdx) => {
        let bestRating = -1;
        let bestGasketIndex = 0;
        LIQ[lIdx].r.forEach((v, k) => {
            if (v > bestRating) {
                bestRating = v;
                bestGasketIndex = k;
            }
        });
        setSt((prev) => ({ ...prev, l: lIdx, g: bestGasketIndex }));
    }, []);

    const handleCellSelect = useCallback((lIdx, gIdx) => setSt((prev) => ({ ...prev, l: lIdx, g: gIdx })), []);
    const handleExplodeChange = useCallback((val) => updateField("ex", val), [updateField]);
    const handleQuantitySelect = useCallback((val) => updateField("q", val), [updateField]);

    const handleCopyEnquiry = useCallback(() => {
        const currentType = TYPES[st.t];
        const safeSizeIdx = Math.min(st.s, currentType.sizes.length - 1);
        const currentSize = currentType.sizes[safeSizeIdx];
        const brandStr = st.brand.trim() ? `, cap marked ${st.brand.trim()}` : "";
        const text = `Enquiry: ${numFormat.format(st.q)} x ${currentType.n}, ${currentSize[0]}, ${COLS[st.c].n}${brandStr}, ${GK[st.g].n} gasket, for ${LIQ[st.l].n.toLowerCase()}. Please share price and lead time.`;

        const onSuccess = () => setCopyNote(`Copied: ${text}`);
        const onFallback = () => setCopyNote(text);
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text).then(onSuccess, onFallback);
        } else {
            onFallback();
        }
    }, [st]);

    return (
        <div className="py-30 sm-py-20">
            <style>{`
                .custom-range-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 24px;
                    background: transparent;
                }
                .custom-range-slider::-webkit-slider-runnable-track {
                    height: 6px;
                    border-radius: 6px;
                    background: linear-gradient(90deg, #f0561d var(--p, 0%), #c4d3e3 var(--p, 0%));
                }
                .custom-range-slider::-moz-range-track {
                    height: 6px;
                    border-radius: 6px;
                    background: #c4d3e3;
                }
                .custom-range-slider::-moz-range-progress {
                    height: 6px;
                    border-radius: 6px;
                    background: #f0561d;
                }
                .custom-range-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 22px;
                    height: 22px;
                    border-radius: 6px;
                    background: #fff;
                    border: 3px solid #f0561d;
                    margin-top: -8px;
                }
                .custom-range-slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 6px;
                    background: #fff;
                    border: 3px solid #f0561d;
                }
            `}</style>

            <div className="grid-cols-1 gap-12">
                <IndustrySection selectedIndex={st.ind} onSelect={handleIndustrySelect} />

                <div className="grid-cols-2 sm-grid-cols-1 gap-12 items-start" aria-live="polite">
                    <ExplodedStage st={st} onExplodeChange={handleExplodeChange} />
                    <ClosureControls st={st} onTypeChange={handleTypeChange} onFieldChange={updateField} />
                </div>

                <div className="mt-8">
                    <SealCheckMatrix st={st} onSelectLiquid={handleLiquidSelect} onSelectCell={handleCellSelect} />
                </div>

                <div className="mt-8">
                    <EnquirySection st={st} onQuantitySelect={handleQuantitySelect} onCopy={handleCopyEnquiry} copyNote={copyNote} />
                </div>
            </div>
        </div>
    );
};

export default memo(DemoSection);
