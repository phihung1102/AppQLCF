import pool from "../../db.js";

export const getAllProduct = async () => {
  const [rows] = await pool.query(
    `SELECT p.*, c.name AS category_name
     FROM products p
     JOIN categories c ON p.category_id = c.id`
  );
  return rows;
};

export const getProduct = async (id) => {
  const [rows] = await pool.query(
    `SELECT p.*, c.name AS category_name
     FROM products p
     JOIN categories c ON p.category_id = c.id
     WHERE p.id = ?`,
    [id]
  );
  return rows[0];
};

export const createProduct = async (name, price, status, category_id) => {
  const [result] = await pool.query( "INSERT INTO products (name, price, status, category_id) VALUES (?, ?, ?, ?)", [name, price, status, category_id] );
  return result.insertId;
};

export const updateProduct = async (id, name, price, status, category_id) => {
  const [result] = await pool.query( "UPDATE products SET name=?, price=?, status=?, category_id=? WHERE id=?", [name, price, status, category_id, id] );
  return result.affectedRows;
};

export const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id=?", [id]);
  return result.affectedRows;
};
