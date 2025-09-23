import express from "express";
import { getAllCategoryCTL, getCategoryCTL, createCategoryCTL, updateCategoryCTL, deleteCategoryCTL } from "./controller.js";
import { validateCategory } from "../../middlewares/validators.js";

const router = express.Router();

router.get("/", getAllCategoryCTL);
router.get("/:id", getCategoryCTL);
router.post("/", validateCategory, createCategoryCTL);
router.put("/:id", validateCategory, updateCategoryCTL);
router.delete("/:id", deleteCategoryCTL);

export default router;
