import express from "express";
import { getCartCTL, createCartCTL, deleteCartCTL, createCartItemCTL, updateCartItemCTL, deleteCartItemCTL } from "./controller.js";
import { validateCart, validateCartItem } from "../../middlewares/validators.js";

const router = express.Router();

router.get("/:id", getCartCTL);
router.post("/", validateCart, createCartCTL);
router.delete("/:id", deleteCartCTL);

router.post("/items", validateCartItem, createCartItemCTL);
router.put("/items/:id", validateCartItem, updateCartItemCTL);
router.delete("/items/:id", deleteCartItemCTL);

export default router;
