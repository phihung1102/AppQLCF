import pool from "../../db.js";

export const getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM users WHERE role <> 'admin' ");
    return rows;
};

export const createUser = async (user) => {
    const {name, email, password, role} = user;
    const [result] = await pool.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [name, email, password, role]);
    return result.insertId;
};

export const updateUser = async (id, role) => {
    const [result] = await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    return result.affectedRows;
};

export const deleteUser = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
};

export const findByEmail = async (email) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows.length ? rows[0] : null;
};