import dotenv from "dotenv";
dotenv.config();

const getEnv = (key, defaultValue = undefined) => {
    const value = process.env[key] ?? defaultValue;
    if (value === undefined) { throw new Error(`❌ Missing environment variable: ${key}`); }
    return value;
};

//server
export const PORT = getEnv("PORT", 3000);
export const NODE_ENV = getEnv("NODE_ENV", "development");

// Database
export const DB_HOST = getEnv("DB_HOST");
export const DB_PORT = Number(getEnv("DB_PORT", 3306));
export const DB_USER = getEnv("DB_USER");
export const DB_PASS = getEnv("DB_PASS", ""); // cho phép rỗng
export const DB_NAME = getEnv("DB_NAME");

// JWT
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");