import express from "express";
import { getAllOrderCTL, getOrderCTL, createOrderCTL, updateOrderCTL, deleteOrderCTL } from "./controller.js";
import { validateOrder, validateOrderItem } from "../../middlewares/validators.js";

const router = express.Router();

router.get("/", getAllOrderCTL);
router.get("/:id", getOrderCTL);
router.post("/", validateOrder, createOrderCTL);
router.put("/:id", validateOrder, updateOrderCTL);
router.delete("/:id", deleteOrderCTL);

export default router;
