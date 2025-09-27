import pool from "../../db.js";

export const getAllProduct = async () => {
  const [rows] = await pool.query(`
    SELECT p.id, p.name, p.price, p.status, p.category_id, c.name AS category_name,
            i.id AS image_id, i.image_url AS image_url
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN images i ON p.id = i.product_id
    ORDER BY p.id DESC
  `);
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    price: row.price,
    status: row.status,
    category_id: row.category_id,
    category_name: row.category_name,
    image: row.image_id ? { id: row.image_id, url: row.image_url} : null
  }));
};

export const getProduct = async (id) => {
  const [rows] = await pool.query(
    `SELECT p.id, p.name, p.price, p.status, p.category_id, c.name AS category_name,
            i.id AS image_id, i.image_url AS image_url
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN images i ON p.id = i.product_id
    WHERE p.id = ?
    ORDER BY p.id DESC`,
    [id]
  );
  
  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    id: row.id,
    name: row.name,
    price: row.price,
    status: row.status,
    category_id: row.category_id,
    category_name: row.category_name,
    image: row.image_id ? { id: row.image_id, url: row.image_url } : null
  };
};

export const getProductAvailable = async () => {
  const [rows] = await pool.query(`
    SELECT p.id, p.name, p.price, p.status AS product_status, p.category_id, c.name AS category_name,
            i.id AS image_id, i.image_url AS image_url
    FROM products p
    JOIN categories c ON p.category_id = c.id
    LEFT JOIN images i ON p.id = i.product_id
    WHERE status = 'available'
    ORDER BY p.id DESC
  `);
  return rows.map(row => ({
    id: row.id,
    name: row.name,
    price: row.price,
    status: row.product_status,
    category_id: row.category_id,
    category_name: row.category_name,
    image: row.image_id ? { id: row.image_id, url: row.image_url} : null
  }));
};

export const createProduct = async (name, price, status, category_id) => {
  const [result] = await pool.query( "INSERT INTO products (name, price, status, category_id) VALUES (?, ?, ?, ?)", [name, price, status, category_id] );
  return result.insertId;
};

export const updateProduct = async (id, name, price, category_id) => {
  const [result] = await pool.query( "UPDATE products SET name=?, price=?, category_id=? WHERE id=?", [name, price, category_id, id] );
  return result.affectedRows;
};

export const updateStatusProduct = async (id, status) => {
  const [ result ] = await pool.query("UPDATE products SET status = ? WHERE id = ?", [status, id] );
  return result.affectedRows;
};

export const deleteProduct = async (id) => {
  const [result] = await pool.query("DELETE FROM products WHERE id=?", [id]);
  return result.affectedRows;
};
