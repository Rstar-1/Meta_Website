// Import all local product images
import printerHp88a from '../assets/printer_hp_88a.webp';
import printerCanon74s from '../assets/printer_canon_74s.webp';
import printerCanon746 from '../assets/printer_canon_746.webp';
import printerEpson003 from '../assets/printer_epson_003.webp';
import printerBrotherTn2321 from '../assets/printer_brother_tn2321.webp';
import printerSamsungD111s from '../assets/printer_samsung_d111s.webp';
import ss304Sheets from '../assets/ss_304_sheets.webp';
import ss304Pipes from '../assets/ss_304_pipes.webp';
import ssCoils from '../assets/ss_coils.webp';
import ss316Rods from '../assets/ss_316_rods.webp';
import ssPlates from '../assets/ss_plates.webp';
import ssKitchen from '../assets/ss_kitchen.webp';
import ssFlanges from '../assets/ss_flanges.webp';
import ssAngleBars from '../assets/ss_angle_bars.webp';
import ssWireMesh from '../assets/ss_wire_mesh.webp';
import ssFasteners from '../assets/ss_fasteners.webp';
import pvcConduitPipe from '../assets/pvc_conduit_pipe.webp';
import pvcBallValve from '../assets/pvc_ball_valve.webp';

const assetMap = {
  '/src/assets/printer_hp_88a.webp': printerHp88a,
  '/src/assets/printer_canon_74s.webp': printerCanon74s,
  '/src/assets/printer_canon_746.webp': printerCanon746,
  '/src/assets/printer_epson_003.webp': printerEpson003,
  '/src/assets/printer_brother_tn2321.webp': printerBrotherTn2321,
  '/src/assets/printer_samsung_d111s.webp': printerSamsungD111s,
  '/src/assets/ss_304_sheets.webp': ss304Sheets,
  '/src/assets/ss_304_pipes.webp': ss304Pipes,
  '/src/assets/ss_coils.webp': ssCoils,
  '/src/assets/ss_316_rods.webp': ss316Rods,
  '/src/assets/ss_plates.webp': ssPlates,
  '/src/assets/ss_kitchen.webp': ssKitchen,
  '/src/assets/ss_flanges.webp': ssFlanges,
  '/src/assets/ss_angle_bars.webp': ssAngleBars,
  '/src/assets/ss_wire_mesh.webp': ssWireMesh,
  '/src/assets/ss_fasteners.webp': ssFasteners,
  '/src/assets/pvc_conduit_pipe.webp': pvcConduitPipe,
  '/src/assets/pvc_ball_valve.webp': pvcBallValve,
};

const idMap = {
  'printer-1': printerHp88a,
  'printer-2': printerCanon74s,
  'printer-3': printerCanon746,
  'printer-4': printerEpson003,
  'printer-5': printerBrotherTn2321,
  'printer-6': printerSamsungD111s,
  'printer-7': printerHp88a,
  'printer-8': printerCanon74s,
  'printer-9': printerBrotherTn2321,
  'printer-10': printerHp88a,
  'steel-1': ss304Sheets,
  'steel-2': ss304Pipes,
  'steel-3': ssCoils,
  'steel-4': ss316Rods,
  'steel-5': ssPlates,
  'steel-6': ssKitchen,
  'steel-7': ssFlanges,
  'steel-8': ssAngleBars,
  'steel-9': ssWireMesh,
  'steel-10': ssFasteners,
  'prod-7': pvcConduitPipe,
  'prod-31': pvcBallValve,
};

export const resolveProductImage = (product) => {
  if (!product) return '';
  // 1. Try mapping by product ID
  if (product.id && idMap[product.id]) {
    return idMap[product.id];
  }
  // 2. Try mapping by exact image path
  if (product.image && assetMap[product.image]) {
    return assetMap[product.image];
  }
  // 3. Fallback
  return product.image || '';
};

export const resolveImagePath = (path) => {
  if (!path) return '';
  if (assetMap[path]) {
    return assetMap[path];
  }
  return path;
};
