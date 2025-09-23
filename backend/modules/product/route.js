import express from "express";
import { getAllProductCTL, getProductCTL, createProductCTL, updateProductCTL, deleteProductCTL } from "./controller.js";
import { validateProduct } from "../../middlewares/validators.js";

const router = express.Router();

router.get("/", getAllProductCTL);
router.get("/:id", getProductCTL);
router.post("/", validateProduct, createProductCTL);
router.put("/:id", validateProduct, updateProductCTL);
router.delete("/:id", deleteProductCTL);

export default router;
