import pool from "../../db.js";

// carts
export const getCartByTable = async (table_number) => {
  const [rows] = await pool.query(
    "SELECT * FROM carts WHERE table_number=? AND user_id IS NULL",
    [table_number]
  );
  return rows[0];
};

export const createCartByTable = async (table_number) => {
  const [result] = await pool.query(
    "INSERT INTO carts (table_number, user_id) VALUES (?, NULL)",
    [table_number]
  );
  return result.insertId;
};

export const getCartByUser = async (user_id) => {
  const [rows] = await pool.query(
    "SELECT * FROM carts WHERE user_id=? AND table_number IS NULL",
    [user_id]
  );
  return rows[0];
};

export const createCartByUser = async (user_id) => {
  const [result] = await pool.query(
    "INSERT INTO carts (table_number, user_id) VALUES (NULL, ?)",
    [user_id]
  );
  return result.insertId;
};

export const deleteCart = async (id) => {
  const [result] = await pool.query("DELETE FROM carts WHERE id=?", [id]);
  return result.affectedRows;
};

// cart_items (join luôn product + category)
export const getCartItems = async (cart_id) => {
  const [rows] = await pool.query(
    `
    SELECT 
        ci.id AS cart_item_id,
        ci.quantity,
        p.id AS product_id,
        p.name AS product_name,
        p.price,
        c.id AS category_id,
        c.name AS category_name,
        (
          SELECT i.image_url 
          FROM images i 
          WHERE i.product_id = p.id 
          ORDER BY i.id ASC 
          LIMIT 1
        ) AS image_url
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    JOIN categories c ON p.category_id = c.id
    WHERE ci.cart_id = ?
    `,
    [cart_id]
  );
  return rows;
};


export const createCartItem = async (cart_id, product_id, quantity) => {
  const [result] = await pool.query(
    "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)",
    [cart_id, product_id, quantity]
  );
  return result.insertId;
};

export const updateCartItem = async (id, quantity) => {
  const [result] = await pool.query(
    "UPDATE cart_items SET quantity=? WHERE id=?",
    [quantity, id]
  );
  return result.affectedRows;
};

export const deleteCartItem = async (id) => {
  const [result] = await pool.query("DELETE FROM cart_items WHERE id=?", [id]);
  return result.affectedRows;
};
