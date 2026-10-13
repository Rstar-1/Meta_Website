import json
import os

products = [
    {
        "id": 101,
        "isBanner": True,
        "title": "UNITED BROTHERS FLOORING",
        "subtitle": "BETTER FLOORS BRIGHTER SPACES",
        "image": "/products/catalogue_full.png",
        "brand": "United Brothers"
    }
]

# -------------------------------------------------------------
# 1. DILOUR CARPETS (categoryId: 1)
# -------------------------------------------------------------
dilour_colors = [
    ("Black Dilour Carpet", "black", "#111827", ["#111827", "#374151"]),
    ("Grey Dilour Carpet", "grey", "#6b7280", ["#6b7280", "#9ca3af"]),
    ("Beige Dilour Carpet", "beige", "#d4b996", ["#d4b996", "#fef3c7"]),
    ("Brown Dilour Carpet", "brown", "#78350f", ["#78350f", "#92400e"]),
    ("Red Dilour Carpet", "red", "#b91c1c", ["#b91c1c", "#dc2626"]),
]

product_id = 1

for name, col_key, hex_col, color_arr in dilour_colors:
    img = f"/products/dilour_{col_key}.jpg"
    gallery = [img, "/products/dilour_car.jpg", "/products/dilour_swatches.jpg"]
    p = {
        "id": product_id,
        "name": name,
        "categoryId": 1,
        "category": "Dilour Carpets",
        "subCategory": "Automotive Dilour",
        "vendor": "United Brothers",
        "type": "Dilour Carpet",
        "price": 380,
        "priceFormatted": "₹350 - ₹420/sq mtr",
        "originalPrice": 480,
        "badge": {
            "text": "United Brothers",
            "color": "#2563eb"
        },
        "colors": color_arr,
        "image": img,
        "images": gallery,
        "inStock": True,
        "trending": product_id in [1, 2],
        "stockCount": 65,
        "description": f"High-quality non-woven {name} engineered for automotive interiors, trunk lining, and home flooring applications. Offers exceptional soft texture, long-lasting durability, acoustic sound absorption, and thermal insulation.",
        "brand": "United Brothers",
        "specifications": [
            {"name": "Material / Construction", "spec": "100% Non-Woven Synthetic Needle-Punch Dilour"},
            {"name": "Application", "spec": "Automotive Interiors, Boot Mats, Home & Office Flooring"},
            {"name": "Surface Finish", "spec": "Soft Velour / Dilour Cut-Pile Texture"},
            {"name": "Colour Shade", "spec": col_key.capitalize()},
            {"name": "Sound Insulation", "spec": "High Acoustic Absorption"},
            {"name": "Durability", "spec": "Heavy Duty Wear Resistant"},
            {"name": "Moisture & Stain Resistance", "spec": "Yes"},
            {"name": "Manufacturer", "spec": "United Brothers - Ahmedabad"},
            {"name": "Packaging Type", "spec": "Continuous Roll / Custom Cut"}
        ],
        "specs": [
            {"name": "Material / Construction", "spec": "100% Non-Woven Synthetic Needle-Punch Dilour"},
            {"name": "Application", "spec": "Automotive Interiors, Boot Mats, Home & Office Flooring"},
            {"name": "Surface Finish", "spec": "Soft Velour / Dilour Cut-Pile Texture"},
            {"name": "Colour Shade", "spec": col_key.capitalize()},
            {"name": "Sound Insulation", "spec": "High Acoustic Absorption"},
            {"name": "Durability", "spec": "Heavy Duty Wear Resistant"},
            {"name": "Moisture & Stain Resistance", "spec": "Yes"},
            {"name": "Manufacturer", "spec": "United Brothers - Ahmedabad"},
            {"name": "Packaging Type", "spec": "Continuous Roll / Custom Cut"}
        ]
    }
    products.append(p)
    product_id += 1

# Additional Dilour Variants
dilour_extra = [
    ("Premium Automotive Interior Dilour Carpet", "Home & Commercial Dilour", "/products/dilour_car.jpg", ["/products/dilour_car.jpg", "/products/dilour_black.jpg", "/products/dilour_grey.jpg"], 420, "₹390 - ₹460/sq mtr", 520, ["#111827", "#4b5563"]),
    ("Non-Woven Acoustic Insulation Dilour Roll", "Non-Woven Carpets", "/products/dilour_grey.jpg", ["/products/dilour_grey.jpg", "/products/dilour_swatches.jpg", "/products/dilour_black.jpg"], 360, "₹340 - ₹400/sq mtr", 450, ["#6b7280", "#374151"]),
    ("Heavy Duty Trunk & Cabin Dilour Carpet", "Automotive Dilour", "/products/dilour_black.jpg", ["/products/dilour_black.jpg", "/products/dilour_car.jpg"], 450, "₹420 - ₹490/sq mtr", 560, ["#111827"]),
]

for name, sub, img, gallery, price, p_fmt, orig, cols in dilour_extra:
    products.append({
        "id": product_id,
        "name": name,
        "categoryId": 1,
        "category": "Dilour Carpets",
        "subCategory": sub,
        "vendor": "United Brothers",
        "type": "Dilour Carpet",
        "price": price,
        "priceFormatted": p_fmt,
        "originalPrice": orig,
        "badge": {"text": "United Brothers", "color": "#2563eb"},
        "colors": cols,
        "image": img,
        "images": gallery,
        "inStock": True,
        "trending": False,
        "stockCount": 48,
        "description": f"Superior {name} manufactured by United Brothers. Designed to provide comfortable padding, sound proofing, and aesthetic finish across automotive cabins and commercial environments.",
        "brand": "United Brothers",
        "specifications": [
            {"name": "Material", "spec": "High Grade Non-Woven Polypropylene / Polyester"},
            {"name": "Application", "spec": "Automotive Cabin, Floor Mats, Commercial Flooring"},
            {"name": "Texture", "spec": "Dense Dilour Soft Finish"},
            {"name": "Cleaning", "spec": "Easy Vacuum & Stain Resistant"},
            {"name": "Manufacturer", "spec": "United Brothers"}
        ],
        "specs": [
            {"name": "Material", "spec": "High Grade Non-Woven Polypropylene / Polyester"},
            {"name": "Application", "spec": "Automotive Cabin, Floor Mats, Commercial Flooring"},
            {"name": "Texture", "spec": "Dense Dilour Soft Finish"},
            {"name": "Cleaning", "spec": "Easy Vacuum & Stain Resistant"},
            {"name": "Manufacturer", "spec": "United Brothers"}
        ]
    })
    product_id += 1

# -------------------------------------------------------------
# 2. RIBS CARPETS (categoryId: 2)
# -------------------------------------------------------------
ribs_colors = [
    ("Black Ribs Carpet", "black", "#111827", ["#111827", "#374151"]),
    ("Grey Ribs Carpet", "grey", "#4b5563", ["#4b5563", "#9ca3af"]),
    ("Brown Ribs Carpet", "brown", "#78350f", ["#78350f", "#92400e"]),
    ("Red Ribs Carpet", "red", "#991b1b", ["#991b1b", "#dc2626"]),
]

for name, col_key, hex_col, color_arr in ribs_colors:
    img = f"/products/ribs_{col_key}.jpg"
    gallery = [img, "/products/ribs_car.jpg", "/products/ribs_swatches.jpg"]
    p = {
        "id": product_id,
        "name": name,
        "categoryId": 2,
        "category": "Ribs Carpets",
        "subCategory": "Anti-Slip Ribbed",
        "vendor": "United Brothers",
        "type": "Ribs Carpet",
        "price": 320,
        "priceFormatted": "₹290 - ₹360/sq mtr",
        "originalPrice": 420,
        "badge": {
            "text": "United Brothers",
            "color": "#059669"
        },
        "colors": color_arr,
        "image": img,
        "images": gallery,
        "inStock": True,
        "trending": product_id in [9, 10],
        "stockCount": 70,
        "description": f"Durable {name} featuring a strong ribbed corrugated surface structure that provides superior grip, anti-slip safety, and easy cleaning. Engineered with heavy-duty backing for commercial floors, office entrances, and vehicle interiors.",
        "brand": "United Brothers",
        "specifications": [
            {"name": "Surface Pattern", "spec": "Ribbed Grooves for High Traction"},
            {"name": "Backing", "spec": "Anti-Slip Resin / Rubberized Backing"},
            {"name": "Application", "spec": "Automotive Footwells, Offices, Commercial Corridors"},
            {"name": "Colour Shade", "spec": col_key.capitalize()},
            {"name": "Cleaning", "spec": "Easy Wash & Vacuum Cleanable"},
            {"name": "Wear Resistance", "spec": "Heavy Foot Traffic Certified"},
            {"name": "Manufacturer", "spec": "United Brothers - Ahmedabad"}
        ],
        "specs": [
            {"name": "Surface Pattern", "spec": "Ribbed Grooves for High Traction"},
            {"name": "Backing", "spec": "Anti-Slip Resin / Rubberized Backing"},
            {"name": "Application", "spec": "Automotive Footwells, Offices, Commercial Corridors"},
            {"name": "Colour Shade", "spec": col_key.capitalize()},
            {"name": "Cleaning", "spec": "Easy Wash & Vacuum Cleanable"},
            {"name": "Wear Resistance", "spec": "Heavy Foot Traffic Certified"},
            {"name": "Manufacturer", "spec": "United Brothers - Ahmedabad"}
        ]
    }
    products.append(p)
    product_id += 1

# Additional Ribs Variants
ribs_extra = [
    ("Heavy Duty Commercial Anti-Slip Ribs Carpet", "Commercial Floor Ribs", "/products/ribs_car.jpg", ["/products/ribs_car.jpg", "/products/ribs_black.jpg"], 360, "₹330 - ₹410/sq mtr", 460, ["#111827", "#4b5563"]),
    ("High-Grip Automotive Ribbed Matting Carpet", "Automotive Ribs", "/products/ribs_black.jpg", ["/products/ribs_black.jpg", "/products/ribs_swatches.jpg", "/products/ribs_grey.jpg"], 340, "₹310 - ₹380/sq mtr", 440, ["#4b5563", "#78350f"]),
]

for name, sub, img, gallery, price, p_fmt, orig, cols in ribs_extra:
    products.append({
        "id": product_id,
        "name": name,
        "categoryId": 2,
        "category": "Ribs Carpets",
        "subCategory": sub,
        "vendor": "United Brothers",
        "type": "Ribs Carpet",
        "price": price,
        "priceFormatted": p_fmt,
        "originalPrice": orig,
        "badge": {"text": "United Brothers", "color": "#059669"},
        "colors": cols,
        "image": img,
        "images": gallery,
        "inStock": True,
        "trending": False,
        "stockCount": 55,
        "description": f"{name} by United Brothers offers extra traction, anti-slip security, and long-lasting performance for industrial and commercial environments.",
        "brand": "United Brothers",
        "specifications": [
            {"name": "Construction", "spec": "Heavy Ribbed Needle-Punch"},
            {"name": "Backing", "spec": "Anti-Slip Backing"},
            {"name": "Traffic Rating", "spec": "High Commercial Footfall"},
            {"name": "Manufacturer", "spec": "United Brothers"}
        ],
        "specs": [
            {"name": "Construction", "spec": "Heavy Ribbed Needle-Punch"},
            {"name": "Backing", "spec": "Anti-Slip Backing"},
            {"name": "Traffic Rating", "spec": "High Commercial Footfall"},
            {"name": "Manufacturer", "spec": "United Brothers"}
        ]
    })
    product_id += 1

# -------------------------------------------------------------
# 3. RUGS - NEW POLY SHRINK RUGS (categoryId: 3, 30 Designs)
# -------------------------------------------------------------
poly_shrink_designs = [
    ("Abstract Linear Striped", "Warm Sand & Grey Linear Ribs"),
    ("Honeycomb Hexagonal Geometric", "Modern Geometric Hexagon Tiles"),
    ("Distressed Vintage Medallion", "Classic Medallion with Modern Wash"),
    ("Vintage Classical Persian Wash", "Washed Floral Persian Pattern"),
    ("Concentric Stepped Border Frame", "Contemporary Frame Geometry"),
    ("Washed Ivory Slate Medallion", "Subtle Heritage Medallion"),
    ("Contemporary Abstract Patchwork", "Multi-Tone Weathered Blocks"),
    ("Distressed Abstract Marble", "Soft Veined Marble Texture"),
    ("Mineral Stone Multicolor Abstract", "Earthy Mineral Patch Pattern"),
    ("Weathered Timber Striped Abstract", "Rustic Grain Line Texture"),
    ("Cobblestone Organic Pebble Relief", "Nature Inspired Stone Contours"),
    ("Architectural Grid Abstract", "Modern Industrial Window Grid"),
    ("Bohemian Tribal Aztec Diamond", "Tribal Diamond Pattern Geometry"),
    ("Ornate Traditional Damask Gold", "Luxe Baroque Damask Motif"),
    ("Weathered Concrete Earth Multi", "Industrial Slate & Earth Blends"),
    ("Traditional Persian Floral Border", "Refined Classic Botanical Border"),
    ("Classic Oriental Botanical Charcoal", "Dark Contrast Floral Arabesque"),
    ("Distressed Masonry Blocks Earth", "Textured Stone Wall Abstract"),
    ("Textured Linear Minimalist Ribbed", "Zen Scandinavian Ribbed Tone"),
    ("Modern Arch Deco Curves Tan", "Soft Arch Art-Deco Curves"),
    ("Arch Deco Minimalist Pure Ivory", "Nordic Pure Line Arch Pattern"),
    ("Marble Vein Border Frame Gold", "Polished Marble Framing Border"),
    ("Greek Key Meander Geometric", "Hellenic Key Border Inlay"),
    ("Urban Grid Neutral Texture", "Minimalist Structural Weave"),
    ("Weathered Plaster Gold Cream", "Textured Venetian Plaster Finish"),
    ("Curved Palm Leaf Organic Relief", "Tropical Botanical Line Flow"),
    ("Chevron Herringbone Relief Sand", "Dynamic Zigzag Relief Pattern"),
    ("Framed Geometric Border Tan", "Modern Central Symmetry Field"),
    ("Chevron Maze Relief White Ivory", "Subtle High-Pile Geometric Maze"),
    ("Modern Horizontal Pinstripe Cream", "Calm Minimalist Horizontal Stripe"),
]

for idx, (d_name, d_desc) in enumerate(poly_shrink_designs):
    page_num = idx + 1
    main_img = f"/products/rugs/poly_shrink_p{page_num}_1.webp"
    corner_img = f"/products/rugs/poly_shrink_p{page_num}_2.webp"
    back_img = f"/products/rugs/poly_shrink_p{page_num}_3.webp"
    gallery = [main_img, corner_img, back_img]

    products.append({
        "id": product_id,
        "name": f"New Age Poly Shrink Rug - {d_name}",
        "categoryId": 3,
        "category": "Rugs",
        "subCategory": "New Poly Shrink Rugs",
        "vendor": "United Brothers",
        "type": "Poly Shrink Rug",
        "price": 1250,
        "priceFormatted": "₹1,150 - ₹1,450/sq mtr",
        "originalPrice": 1650,
        "badge": {
            "text": "1800 GSM",
            "color": "#dc2626"
        },
        "colors": ["#f3f4f6", "#d1d5db", "#92400e"],
        "image": main_img,
        "images": gallery,
        "inStock": True,
        "trending": page_num in [1, 2, 5, 11, 20, 21],
        "stockCount": 40,
        "description": f"New Age High Pile Poly Shrink Woven Rug with Self Backing. Features {d_desc}. Crafted from 100% premium polyester with dense 1800 GSM construction, offering lush softness, dimensional high-low shrink relief, and superior durability for living rooms, master bedrooms, and luxury hospitality spaces.",
        "brand": "United Brothers",
        "specifications": [
            {"name": "Product Name", "spec": "New Age High Pile Poly Shrink Woven Rug"},
            {"name": "Weight / Density", "spec": "1800 GSM"},
            {"name": "Pile Material", "spec": "100% Polyester"},
            {"name": "Backing", "spec": "Self Backing (Integrated Non-Slip Weave)"},
            {"name": "Weave Technology", "spec": "Poly Shrink 3D High-Low Relief Woven"},
            {"name": "Design Pattern", "spec": d_name},
            {"name": "Design Detail", "spec": d_desc},
            {"name": "Touch & Feel", "spec": "Super Soft High-Pile Comfort"},
            {"name": "Maintenance", "spec": "Stain Resistant, Vacuum Friendly"},
            {"name": "Manufacturer", "spec": "United Brothers - Ahmedabad"}
        ],
        "specs": [
            {"name": "Product Name", "spec": "New Age High Pile Poly Shrink Woven Rug"},
            {"name": "Weight / Density", "spec": "1800 GSM"},
            {"name": "Pile Material", "spec": "100% Polyester"},
            {"name": "Backing", "spec": "Self Backing (Integrated Non-Slip Weave)"},
            {"name": "Weave Technology", "spec": "Poly Shrink 3D High-Low Relief Woven"},
            {"name": "Design Pattern", "spec": d_name},
            {"name": "Design Detail", "spec": d_desc},
            {"name": "Touch & Feel", "spec": "Super Soft High-Pile Comfort"},
            {"name": "Maintenance", "spec": "Stain Resistant, Vacuum Friendly"},
            {"name": "Manufacturer", "spec": "United Brothers - Ahmedabad"}
        ]
    })
    product_id += 1

# -------------------------------------------------------------
# 4. RUGS - SHALIMAR RUGS (categoryId: 3, Selection of Models)
# -------------------------------------------------------------
shalimar_models = [
    ("Shalimar Rug 24030 - Beige", "182 x 270 cm", "Beige", 1, 1, ["#d4b996", "#fef3c7"]),
    ("Shalimar Rug 24031 - Grey", "182 x 270 cm", "Grey", 1, 2, ["#6b7280", "#9ca3af"]),
    ("Shalimar Rug 24031 - Red", "182 x 270 cm", "Red", 1, 3, ["#991b1b", "#dc2626"]),
    ("Shalimar Rug 24031 - Steel Blue", "182 x 270 cm", "Steel Blue", 1, 4, ["#1e3a8a", "#3b82f6"]),
    ("Shalimar Rug 24032 - Red", "182 x 270 cm", "Red", 1, 5, ["#991b1b", "#7f1d1d"]),
    ("Shalimar Rug 24032 - Steel Blue", "182 x 270 cm", "Steel Blue", 1, 6, ["#1e3a8a", "#60a5fa"]),
    ("Shalimar Rug 24033 - Grey", "182 x 270 cm", "Grey", 1, 7, ["#4b5563", "#9ca3af"]),
    ("Shalimar Rug 24033 - Steel Blue", "182 x 270 cm", "Steel Blue", 1, 8, ["#1e40af", "#3b82f6"]),
    ("Shalimar Rug 24034 - Cream", "182 x 270 cm", "Cream", 1, 9, ["#fef3c7", "#e5e7eb"]),
    ("Shalimar Rug 24034 - Grey", "182 x 270 cm", "Grey", 1, 10, ["#4b5563", "#d1d5db"]),
    ("Shalimar Rug 24034 - Steel Blue", "182 x 270 cm", "Steel Blue", 1, 11, ["#1e3a8a", "#93c5fd"]),
    ("Shalimar Rug 24035 - Cream", "182 x 270 cm", "Cream", 1, 12, ["#fef3c7", "#f3f4f6"]),
    ("Shalimar Rug 24036 - Grey", "182 x 270 cm", "Grey", 1, 14, ["#374151", "#9ca3af"]),
    ("Shalimar Rug 24036 - Steel Blue", "182 x 270 cm", "Steel Blue", 1, 15, ["#1e3a8a", "#60a5fa"]),
    ("Shalimar Rug 24037 - Beige", "182 x 270 cm", "Beige", 1, 16, ["#d4b996", "#92400e"]),
    ("Shalimar Rug 24040 - Multi", "183 x 270 cm", "Multi Color", 2, 3, ["#b91c1c", "#1e3a8a", "#d97706"]),
    ("Shalimar Rug 24041 - Multi Bohemian", "180 x 270 cm", "Multi Color", 2, 4, ["#dc2626", "#2563eb", "#f59e0b"]),
    ("Shalimar Rug 24043 - Beige Triangle", "182 x 270 cm", "Beige", 2, 7, ["#d4b996", "#1e3a8a"]),
    ("Shalimar Rug 24044 - Red Contemporary", "182 x 270 cm", "Red", 2, 9, ["#991b1b", "#f3f4f6"]),
    ("Shalimar Rug 24048 - Cream Wave", "182 x 270 cm", "Cream", 2, 16, ["#fef3c7", "#374151"]),
    ("Shalimar Rug 24060 - Steel Blue Brick", "183 x 270 cm", "Steel Blue", 3, 5, ["#1e3a8a", "#d97706"]),
    ("Shalimar Rug 24062 - Cream Abstract", "183 x 270 cm", "Cream", 3, 7, ["#fef3c7", "#4b5563"]),
    ("Shalimar Rug 24065 - Multi Lattice", "183 x 270 cm", "Cream / Blue", 3, 16, ["#fef3c7", "#1e3a8a"]),
    ("Shalimar Rug 24066 - Modern Triangle", "183 x 270 cm", "Grey / Cream", 4, 3, ["#6b7280", "#d4b996"]),
    ("Shalimar Rug 24067 - Abstract Polygon", "183 x 270 cm", "Multi", 4, 6, ["#374151", "#2563eb", "#d4b996"]),
    ("Shalimar Rug 24068 - Linear Horizon", "183 x 270 cm", "Blue / Grey", 4, 11, ["#1e3a8a", "#9ca3af"]),
    ("Shalimar Rug 24071 - Vintage Distressed Frame", "183 x 270 cm", "Cream / Navy", 5, 2, ["#fef3c7", "#1e3a8a"]),
    ("Shalimar Rug 24072 - Moroccan Lattice", "183 x 270 cm", "Blue / Cream", 5, 6, ["#1e3a8a", "#fef3c7"]),
    ("Shalimar Rug 24073 - Grid Contemporary", "183 x 270 cm", "Steel Blue", 5, 10, ["#1e3a8a", "#9ca3af"]),
]

for name, size_dim, col, p_idx, s_idx, cols in shalimar_models:
    img = f"/products/shalimar/shalimar_p{p_idx}_{s_idx}.webp"
    gallery = [img, "/products/rugs_room.jpg"]
    products.append({
        "id": product_id,
        "name": name,
        "categoryId": 3,
        "category": "Rugs",
        "subCategory": "Shalimar Rugs",
        "vendor": "United Brothers",
        "type": "Shalimar Rug",
        "price": 8500,
        "priceFormatted": f"₹7,800 - ₹9,500/piece",
        "originalPrice": 11000,
        "badge": {
            "text": "Shalimar",
            "color": "#7c3aed"
        },
        "colors": cols,
        "image": img,
        "images": gallery,
        "inStock": True,
        "trending": product_id % 3 == 0,
        "stockCount": 25,
        "description": f"Exquisite {name} ({size_dim}) from the renowned Shalimar collection by United Brothers. Woven with precision yarn to deliver brilliant colorfastness, rich textural relief, and sophisticated design flair for discerning interiors.",
        "brand": "United Brothers",
        "specifications": [
            {"name": "Collection", "spec": "Shalimar Luxury Woven Rugs"},
            {"name": "Dimensions", "spec": size_dim},
            {"name": "Primary Shade", "spec": col},
            {"name": "Weave Type", "spec": "Fine Density Power-Loomed Jacquard"},
            {"name": "Pile Content", "spec": "Heat-Set Polypropylene & Poly Shrink Blend"},
            {"name": "Anti-Static & Colorfast", "spec": "Yes"},
            {"name": "Origin / Brand", "spec": "United Brothers - Ahmedabad"}
        ],
        "specs": [
            {"name": "Collection", "spec": "Shalimar Luxury Woven Rugs"},
            {"name": "Dimensions", "spec": size_dim},
            {"name": "Primary Shade", "spec": col},
            {"name": "Weave Type", "spec": "Fine Density Power-Loomed Jacquard"},
            {"name": "Pile Content", "spec": "Heat-Set Polypropylene & Poly Shrink Blend"},
            {"name": "Anti-Static & Colorfast", "spec": "Yes"},
            {"name": "Origin / Brand", "spec": "United Brothers - Ahmedabad"}
        ]
    })
    product_id += 1

# -------------------------------------------------------------
# 5. GENERAL CATALOGUE RUGS (Modern, Traditional, Shaggy, Geometric)
# -------------------------------------------------------------
catalog_rugs = [
    ("Modern Designer Area Rug", "Modern & Geometric", "/products/rugs_modern.jpg", ["/products/rugs_modern.jpg", "/products/rugs_room.jpg"], 4500, "₹4,200 - ₹5,400/piece", 6000, ["#374151", "#d1d5db"]),
    ("Traditional Royal Oriental Rug", "Traditional & Shaggy", "/products/rugs_traditional.jpg", ["/products/rugs_traditional.jpg", "/products/rugs_room.jpg"], 6200, "₹5,800 - ₹7,200/piece", 8000, ["#991b1b", "#d4b996"]),
    ("Plush Comfort Shaggy Rug", "Traditional & Shaggy", "/products/rugs_shaggy.jpg", ["/products/rugs_shaggy.jpg", "/products/rugs_room.jpg"], 4800, "₹4,400 - ₹5,800/piece", 6500, ["#fef3c7", "#d1d5db"]),
    ("Architectural Geometric Pattern Rug", "Modern & Geometric", "/products/rugs_geometric.jpg", ["/products/rugs_geometric.jpg", "/products/rugs_room.jpg"], 5200, "₹4,900 - ₹6,400/piece", 7000, ["#1e3a8a", "#6b7280"]),
]

for name, sub, img, gallery, price, p_fmt, orig, cols in catalog_rugs:
    products.append({
        "id": product_id,
        "name": name,
        "categoryId": 3,
        "category": "Rugs",
        "subCategory": sub,
        "vendor": "United Brothers",
        "type": "Area Rug",
        "price": price,
        "priceFormatted": p_fmt,
        "originalPrice": orig,
        "badge": {"text": "United Brothers", "color": "#059669"},
        "colors": cols,
        "image": img,
        "images": gallery,
        "inStock": True,
        "trending": True,
        "stockCount": 35,
        "description": f"{name} by United Brothers. Elegant and versatile design that adds warmth, texture, and prestige to living rooms, corporate reception areas, and luxury hotel suites.",
        "brand": "United Brothers",
        "specifications": [
            {"name": "Style", "spec": sub},
            {"name": "Application", "spec": "Home, Office & Hospitality Areas"},
            {"name": "Edge Binding", "spec": "Overlocked Heavy-Duty Stitching"},
            {"name": "Quality Guarantee", "spec": "United Brothers Verified"}
        ],
        "specs": [
            {"name": "Style", "spec": sub},
            {"name": "Application", "spec": "Home, Office & Hospitality Areas"},
            {"name": "Edge Binding", "spec": "Overlocked Heavy-Duty Stitching"},
            {"name": "Quality Guarantee", "spec": "United Brothers Verified"}
        ]
    })
    product_id += 1

out_path = "src/data/product.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {len(products)} products in {out_path}!")
