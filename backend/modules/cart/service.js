import { getCartByTable, createCartByTable, getCartByUser, createCartByUser, deleteCart, getCartItems, createCartItem, updateCartItem, deleteCartItem } from "./model.js";

// helper để format items gọn gàng
const mapCartItems = (rows) =>
  rows.map((r) => ({
    id: r.cart_item_id,
    quantity: r.quantity,
    product: {
      id: r.product_id,
      name: r.product_name,
      price: r.price,
      image_url: r.image_url,
      category: {
        id: r.category_id,
        name: r.category_name,
      },
    },
  }));

// khách theo bàn
export const getOrCreateCartByTableSV = async (table_number) => {
  let cart = await getCartByTable(table_number);
  if (!cart) {
    const id = await createCartByTable(table_number);
    cart = await getCartByTable(table_number);
  }
  const items = await getCartItems(cart.id);
  return { ...cart, items: mapCartItems(items) };
};

// nhân viên theo user_id
export const getOrCreateCartByUserSV = async (user_id) => {
  let cart = await getCartByUser(user_id);
  if (!cart) {
    const id = await createCartByUser(user_id);
    cart = await getCartByUser(user_id);
  }
  const items = await getCartItems(cart.id);
  return { ...cart, items: mapCartItems(items) };
};

export const deleteCartSV = (id) => deleteCart(id);

export const createCartItemSV = (cart_id, product_id, quantity) => createCartItem(cart_id, product_id, quantity);

export const updateCartItemSV = (id, quantity) => updateCartItem(id, quantity);

export const deleteCartItemSV = (id) => deleteCartItem(id);
