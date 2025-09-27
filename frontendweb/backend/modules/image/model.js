import pool from "../../db.js";

export const getImageByProduct = async (productId) => {
    const [rows] = await pool.query("SELECT * FROM images WHERE product_id = ?", [productId] );
    return rows;
};

export const getImageById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM images WHERE id = ?", [id]);
    return rows[0];
}

export const createImage = async (productId, imageUrl) => {
    const [result] = await pool.query("INSERT INTO images (product_id, image_url) VALUES (?, ?)", [productId, imageUrl] );
    return result.insertId;
};

export const deleteImage = async (id) => {
    const [result] = await pool.query("DELETE FROM images WHERE id = ?", [id] );
    return result.affectedRows;
};