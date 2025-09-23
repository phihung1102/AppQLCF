import { getCart, createCart, deleteCart, getCartItems, createCartItem, updateCartItem, deleteCartItem } from "./model.js";

export const getCartSV = async (id) => {
  const cart = await getCart(id);
  if (cart) {
    cart.items = await getCartItems(id);
  }
  return cart;
};

export const createCartSV = (table_number) => createCart(table_number);
export const deleteCartSV = (id) => deleteCart(id);
export const createCartItemSV = (cart_id, product_id, quantity) => createCartItem(cart_id, product_id, quantity);
export const updateCartItemSV = (id, quantity) => updateCartItem(id, quantity);
export const deleteCartItemSV = (id) => deleteCartItem(id);
