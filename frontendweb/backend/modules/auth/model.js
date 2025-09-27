import pool from "../../db.js";

export const saveRTK = async (userId, token) => {
    await pool.query("INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)", [userId, token]);
};

export const findRTK = async (token) => {
    const [rows] = await pool.query("SELECT * FROM refresh_tokens WHERE token = ?", [token]);
    return rows.length ? rows[0] : null;
};

export const deleteRTK = async (token) => {
    await pool.query("DELETE FROM refresh_tokens WHERE token = ?", [token]);
};