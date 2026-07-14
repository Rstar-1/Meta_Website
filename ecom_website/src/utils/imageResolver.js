export const resolveProductImage = (product) => {
  if (!product) return '';
  return product.image || '';
};

export const resolveImagePath = (path) => {
  return path || '';
};
