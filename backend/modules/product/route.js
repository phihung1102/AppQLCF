import express from "express";
import { getAllProductCTL, getProductCTL, getProductAvailableCTL, createProductCTL, updateProductCTL, updateStatusProductCTL, deleteProductCTL } from "./controller.js";
import { validateProduct, validateProductStatus } from "../../middlewares/validators.js";

const router = express.Router();

router.get("/", getAllProductCTL);
router.get("/status", getProductAvailableCTL);
router.get("/:id", getProductCTL);
router.post("/", validateProduct, createProductCTL);
router.put("/:id", validateProduct, updateProductCTL);
router.put("/:id/status", validateProductStatus, updateStatusProductCTL);
router.delete("/:id", deleteProductCTL);

export default router;
