import pool from "../../db.js";

export const getAllCategory = async () => {
  const [rows] = await pool.query("SELECT * FROM categories");
  return rows;
};

export const getCategory = async (id) => {
  const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
  return rows[0];
};

export const createCategory = async (name) => {
  const [result] = await pool.query( "INSERT INTO categories (name) VALUES (?)", [name] );
  return result.insertId;
};

export const updateCategory = async (id, name) => {
  const [result] = await pool.query("UPDATE categories SET name = ? WHERE id = ?", [name, id] );
  return result.affectedRows;
};

export const deleteCategory = async (id) => {
  const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);
  return result.affectedRows;
};
