import pool from "../../db.js";

// carts
export const getCart = async (id) => {
  const [rows] = await pool.query("SELECT * FROM carts WHERE id=?", [id]);
  return rows[0];
};

export const createCart = async (table_number) => {
  const [result] = await pool.query( "INSERT INTO carts (table_number) VALUES (?)", [table_number] );
  return result.insertId;
};

export const deleteCart = async (id) => {
  const [result] = await pool.query("DELETE FROM carts WHERE id=?", [id]);
  return result.affectedRows;
};

// cart_items
export const getCartItems = async (cart_id) => {
  const [rows] = await pool.query(
    `SELECT ci.*, p.name, p.price 
     FROM cart_items ci 
     JOIN products p ON ci.product_id = p.id 
     WHERE ci.cart_id = ?`,
    [cart_id]
  );
  return rows;
};

export const createCartItem = async (cart_id, product_id, quantity) => {
  const [result] = await pool.query( "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)", [cart_id, product_id, quantity] );
  return result.insertId;
};

export const updateCartItem = async (id, quantity) => {
  const [result] = await pool.query( "UPDATE cart_items SET quantity=? WHERE id=?", [quantity, id] );
  return result.affectedRows;
};

export const deleteCartItem = async (id) => {
  const [result] = await pool.query("DELETE FROM cart_items WHERE id=?", [id]);
  return result.affectedRows;
};
