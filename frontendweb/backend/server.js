import { PORT } from "./utils/env.js";
import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import morgan from "morgan";
import path from"path";
import { fileURLToPath } from "url";
import http from "http";


import userRouter from "./modules/user/route.js";
import authRouter from "./modules/auth/route.js";
import imageRouter from "./modules/image/route.js";
import productRouter from "./modules/product/route.js";
import categoryRouter from "./modules/category/route.js";
import cartRouter from "./modules/cart/route.js";
import orderRouter from "./modules/order/route.js";

import { initSocket } from "./socket/index.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Tạo __dirname trong ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/image", imageRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

app.use(errorHandler);

const server = http.createServer(app);
initSocket(server);

process.on("unhandledRejection", (reason, promise) => {
    console.error("🚨 Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
    console.error("🚨 Uncaught Exception:", err);
    process.exit(1); // optional: restart server khi lỗi nghiêm trọng
});



server.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running at http://0.0.0.0:${PORT}`);
});