import pool from "../../db.js";

// Lấy tất cả order, có thể lọc table_number hoặc user_id
export const getAllOrder = async ({ table_number, user_id, fromDate, toDate }) => {
  let sql = `
    SELECT o.*, u.name AS user_name
    FROM orders o
    LEFT JOIN users u ON o.user_id = u.id
    WHERE 1
  `;
  const params = [];

  if (table_number) {
    sql += " AND o.table_number=?";
    params.push(table_number);
  }

  if (user_id) {
    sql += " AND o.user_id=?";
    params.push(user_id);
  }

  if (fromDate && toDate) {
    sql += " AND DATE(o.created_at) BETWEEN ? AND ?";
    params.push(fromDate, toDate);
  } else if (fromDate) {
    sql += " AND DATE(o.created_at) = ?";
    params.push(fromDate);
  }

  sql += " ORDER BY o.created_at DESC";

  const [rows] = await pool.query(sql, params);
  return rows;
};

// Lấy order theo table_number hoặc user_id, chỉ những order chưa completed hoặc cancelled
export const getNotCompletedOrCancelledOrders = async ({ table_number, user_id }) => {
  let sql = "SELECT * FROM orders WHERE status NOT IN ('completed','cancelled')";
  const params = [];

  if (table_number) {
    sql += " AND table_number=?";
    params.push(table_number);
  }
  if (user_id) {
    sql += " AND user_id=?";
    params.push(user_id);
  }
  sql += " ORDER BY created_at DESC";
  const [rows] = await pool.query(sql, params);
  return rows;
};

// Lấy 1 order theo id
export const getOrder = async (id) => {
  const [rows] = await pool.query("SELECT * FROM orders WHERE id=?", [id]);
  return rows[0];
};

// Tạo order mới
export const createOrder = async (table_number, user_id, total, note, status) => {
  const [result] = await pool.query(
    "INSERT INTO orders (table_number, user_id, total, note, status) VALUES (?, ?, ?, ?, ?)",
    [table_number, user_id, total, note, status]
  );
  return result.insertId;
};

// Cập nhật status
export const updateOrder = async (id, status, note, total = null) => {
  let sql = "UPDATE orders SET status=?, note=?";
  const params = [status, note];

  if (total !== null) {
    sql += ", total=?";
    params.push(total);
  }

  sql += " WHERE id=?";
  params.push(id);

  const [result] = await pool.query(sql, params);
  return result.affectedRows;
};

// Xóa order
export const deleteOrder = async (id) => {
  const [result] = await pool.query("DELETE FROM orders WHERE id=?", [id]);
  return result.affectedRows;
};

// Lấy items của order kèm ảnh sản phẩm
export const getOrderItems = async (order_id) => {
  const [rows] = await pool.query(
    `SELECT 
        oi.id AS order_item_id,
        oi.quantity,
        oi.unit_price,
        oi.subtotal,
        p.id AS product_id,
        p.name AS product_name,
        p.price AS product_price,
        p.category_id,
        (SELECT image_url FROM images WHERE product_id = p.id LIMIT 1) AS image_url
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [order_id]
  );

  // map lại thành đúng structure frontend cần
  return rows.map(r => ({
    id: r.order_item_id,
    quantity: r.quantity,
    unit_price: r.unit_price,
    subtotal: r.subtotal,
    product: {
      id: r.product_id,
      name: r.product_name,
      price: r.product_price,
      image_url: r.image_url || null
    }
  }));
};


// Thêm item vào order
export const addOrderItem = async (order_id, product_id, quantity, unit_price, subtotal) => {
  const [result] = await pool.query(
    "INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)",
    [order_id, product_id, quantity, unit_price, subtotal]
  );
  return result.insertId;
};
