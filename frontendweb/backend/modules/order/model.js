import pool from "../../db.js";

// orders
export const getAllOrder = async () => {
  const [rows] = await pool.query("SELECT * FROM orders");
  return rows;
};

export const getOrder = async (id) => {
  const [rows] = await pool.query("SELECT * FROM orders WHERE id=?", [id]);
  return rows[0];
};

export const createOrder = async (table_number, total, note, status) => {
  const [result] = await pool.query("INSERT INTO orders (table_number, total, note, status) VALUES (?, ?, ?, ?)", [table_number, total, note, status] );
  return result.insertId;
};

export const updateOrder = async (id, status, note) => {
  const [result] = await pool.query("UPDATE orders SET status=? WHERE id=?", [status, id] );
  return result.affectedRows;
};

export const deleteOrder = async (id) => {
  const [result] = await pool.query("DELETE FROM orders WHERE id=?", [id]);
  return result.affectedRows;
};

// order_items
export const getOrderItems = async (order_id) => {
  const [rows] = await pool.query(
    `SELECT oi.*, p.name 
     FROM order_items oi 
     JOIN products p ON oi.product_id = p.id 
     WHERE oi.order_id=?`,
    [order_id]
  );
  return rows;
};

export const addOrderItem = async (order_id, product_id, quantity, unit_price, subtotal) => {
  const [result] = await pool.query("INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)", [order_id, product_id, quantity, unit_price, subtotal] );
  return result.insertId;
};
