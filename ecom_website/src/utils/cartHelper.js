export const addToCart = (product) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const exists = cart.find(item => item.id === product.id);
  if (!exists) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cart-updated'));
  }
};

export const getCart = () => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};

export const removeFromCart = (productId) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updated = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(updated));
  window.dispatchEvent(new Event('cart-updated'));
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cart-updated'));
};
