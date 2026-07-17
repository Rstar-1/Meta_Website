export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');

const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
};

export const addToCart = (product, quantity = 1) => {
  const cart = getCart();
  const item = cart.find(i => i.id === product.id);
  if (item) item.quantity = (item.quantity || 1) + quantity;
  else cart.push({ ...product, quantity });
  saveCart(cart);
};

export const removeFromCart = (productId) => 
  saveCart(getCart().filter(item => item.id !== productId));

export const updateCartQuantity = (productId, quantity) => {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
    saveCart(cart);
  }
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  window.dispatchEvent(new Event('cart-updated'));
};
