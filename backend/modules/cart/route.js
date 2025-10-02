import express from "express";
import { getOrCreateCartByTableCTL, getOrCreateCartByUserCTL, deleteCartCTL, createCartItemCTL, updateCartItemCTL, deleteCartItemCTL } from "./controller.js";
import { validateCart, validateCartItemCreate, validateCartItemUpdate } from "../../middlewares/validators.js";

const router = express.Router();


router.post("/table", validateCart, getOrCreateCartByTableCTL);
router.post("/user", getOrCreateCartByUserCTL);
router.delete("/:id", deleteCartCTL);

router.post("/items", validateCartItemCreate, createCartItemCTL);
router.put("/items/:id", validateCartItemUpdate, updateCartItemCTL);
router.delete("/items/:id", deleteCartItemCTL);

export default router;
