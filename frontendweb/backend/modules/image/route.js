import express from "express";
import { getImageCTL, createImageCTL, deleteImageCTL } from "./controller.js";
import upload from "../../middlewares/upload.js";

const router = express.Router();

router.get("/:productId", getImageCTL);
router.post("/", upload.single("image"), createImageCTL);
router.delete("/:id", deleteImageCTL);

export default router;