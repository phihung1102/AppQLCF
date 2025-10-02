import express from "express";
import {
  getAllOrderCTL,
  getNotCompletedOrCancelledOrdersCTL,
  getOrderCTL,
  createOrderCTL,
  updateOrderCTL,
  deleteOrderCTL
} from "./controller.js";

const router = express.Router();

router.get("/", getAllOrderCTL);         // lấy tất cả order, filter query ?table_number=&user_id=
router.get("/status", getNotCompletedOrCancelledOrdersCTL);
router.get("/:id", getOrderCTL);         // lấy 1 order chi tiết
router.post("/", createOrderCTL);        // tạo order
router.put("/:id", updateOrderCTL);      // update status hoặc note
router.delete("/:id", deleteOrderCTL);   // xóa order

export default router;
